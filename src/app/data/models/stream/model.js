import { set, computed } from "@ember/object";
import { alias, not } from "@ember/object/computed";
import { run } from "@ember/runloop";
import { inject as service } from "@ember/service";
import attr from "ember-data/attr";
import Model from "ember-data/model";
import { belongsTo } from "ember-data/relationships";
import { observes } from "@ember-decorators/object";
import { twitch as twitchConfig } from "config";
import qualitiesStreamlink from "./-qualities/streamlink";
import qualitiesLivestreamer from "./-qualities/livestreamer";
import { name } from "utils/decorators";


const {
	"stream-url": twitchStreamUrl,
	oauth: {
		"client-id": clientId
	}
} = twitchConfig;


const STATUS_PREPARING = 0;
const STATUS_ABORTED = 1;
const STATUS_LAUNCHING = 2;
const STATUS_WATCHING = 3;
const STATUS_COMPLETED = 4;


const { hasOwnProperty } = {};


const createPresetObj = ( presets, preset ) => {
	presets[ preset.id ] = preset;
	return presets;
};
const qualitiesByIdStreamlink = qualitiesStreamlink.reduce( createPresetObj, {} );
const qualitiesByIdLivestreamer = qualitiesLivestreamer.reduce( createPresetObj, {} );


const computedStatus = status => computed( "status", {
	get() {
		return this.status === status;
	},
	set( value ) {
		if ( value ) {
			set( this, "status", status );
			return true;
		}
	}
});


export {
	qualitiesStreamlink as qualities,
	qualitiesStreamlink,
	qualitiesLivestreamer
};


@name( "Stream" )
export default class Stream extends Model {
	/** @type {AuthService} */
	@service auth;
	/** @type {SettingsService} */
	@service settings;
	/** @type {StreamingService} */
	@service streaming;

	/** @type {TwitchStream} */
	@belongsTo( "twitch-stream", { async: false } )
	stream;
	/** @type {TwitchChannel} */
	@belongsTo( "twitch-channel", { async: false } )
	channel;
	@attr( "string" )
	quality;
	@attr( "boolean" )
	chat_open;
	@attr( "date" )
	started;


	// let Streamlink/Livestreamer use the GUI's client-id
	clientID = `Client-ID=${clientId}`;

	// passthrough type (twitch streams are HLS)
	playerInputPassthrough = "hls";

	/** @type {boolean} */
	strictQuality = false;

	/** @type {number} */
	status = STATUS_PREPARING;

	/** @type {ChildProcess} */
	spawn = null;

	/** @type {Error} */
	error = null;
	warning = false;

	/** @type {Object[]} */
	log = null;
	showLog = false;

	/** @type {Auth} */
	@alias( "auth.session" )
	session;


	@computedStatus( STATUS_PREPARING )
	isPreparing;
	@computedStatus( STATUS_ABORTED )
	isAborted;
	@computedStatus( STATUS_LAUNCHING )
	isLaunching;
	@computedStatus( STATUS_WATCHING )
	isWatching;
	@computedStatus( STATUS_COMPLETED )
	isCompleted;

	@computed( "status", "error" )
	get hasEnded() {
		return !!this.error
		    || this.status === STATUS_ABORTED
		    || this.status === STATUS_COMPLETED;
	}


	@not( "isStreamlink" )
	isLivestreamer;
	@alias( "settings.content.streaming.isStreamlink" )
	isStreamlink;


	get customParameters() {
		const { provider, providers } = this.settings.content.streaming;

		return hasOwnProperty.call( providers, provider )
			? providers[ provider ].params || ""
			: "";
	}


	kill() {
		if ( this.spawn ) {
			this.spawn.kill( "SIGTERM" );
		}
	}

	pushLog( type, line ) {
		this.log.pushObject({ type, line });
	}


	@observes( "quality" )
	qualityObserver() {
		// the StreamingService knows that it has to spawn a new child process
		this.kill();
	}


	// get the default quality object of the selected quality and streaming provider
	@computed( "quality", "isStreamlink" )
	get streamQualityPreset() {
		const qualities = this.isStreamlink
			? qualitiesByIdStreamlink
			: qualitiesByIdLivestreamer;

		return qualities[ this.quality ]
		    || qualities[ "source" ];
	}

	// get the --stream-sorting-excludes parameter value (Streamlink)
	@computed( "streamQualityPreset", "settings.content.streaming.qualities" )
	get streamQualitiesExclude() {
		const { id, exclude } = this.streamQualityPreset;
		const custom = this.settings.content.streaming.qualities.toJSON();

		return hasOwnProperty.call( custom, id )
		    && String( custom[ id ][ "exclude" ] || "" ).trim().length > 0
			? custom[ id ][ "exclude" ]
			: exclude;
	}

	// get the stream quality selection (for both Streamlink and Livestreamer)
	@computed(
		"streamQualityPreset",
		"settings.content.streaming.qualities",
		"settings.content.streaming.qualitiesOld",
		"isStreamlink"
	)
	get streamQuality() {
		const { id, quality } = this.streamQualityPreset;

		if ( this.isStreamlink ) {
			const custom = this.settings.content.streaming.qualities.toJSON();

			// get the quality attribute of the streamlink quality fragment
			return hasOwnProperty.call( custom, id )
			    && String( custom[ id ][ "quality" ] || "" ).trim().length > 0
				? custom[ id ][ "quality" ]
				: quality;

		} else {
			const custom = this.settings.content.streaming.qualitiesOld.toJSON();

			// get the value of the livestreamer quality attribute
			return hasOwnProperty.call( custom, id )
			    && String( custom[ id ] || "" ).trim().length > 0
				? custom[ id ]
				: quality;
		}
	}

	@computed( "channel.name" )
	get streamUrl() {
		return twitchStreamUrl.replace( "{channel}", this.channel.name );
	}

	async destroyStream() {
		// TODO: wait for ED fix that unloads records after destroying them
		await run( () => this.destroyRecord() );
		run( () => this.unloadRecord() );
	}
}
