import { set } from "@ember/object";
import attr from "ember-data/attr";
import Model from "ember-data/model";
import { on } from "@ember-decorators/object";
import { descriptor, fragment, name } from "utils/decorators";


@name( "Settings" )
export default class Settings extends Model {
	@attr( "boolean", { defaultValue: false } )
	advanced;
	/** @type {SettingsGui} */
	@fragment( "settings-gui" )
	gui;
	/** @type {SettingsStreaming} */
	@fragment( "settings-streaming" )
	streaming;
	/** @type {SettingsStreams} */
	@fragment( "settings-streams" )
	streams;
	/** @type {SettingsChat} */
	@fragment( "settings-chat" )
	chat;
	/** @type {SettingsNotification} */
	@fragment( "settings-notification" )
	notification;


	@descriptor({
		enumerable: false,
		writable: true,
		value: false
	})
	hasStreamsLanguagesSelection;

	@on( "ready", "didUpdate" )
	_hasStreamsLanguagesSelection() {
		let ret = false;

		const fragment = this.streams.languages;
		if ( fragment ) {
			const languages = fragment.toJSON();
			const keys = Object.entries( languages );
			if ( keys.length ) {
				let [ , previous ] = keys.shift();
				for ( const [ , key ] of keys ) {
					if ( previous !== key ) {
						ret = true;
						break;
					}
					previous = key;
				}
			}
		}

		return set( this, "hasStreamsLanguagesSelection", ret );
	}
}
