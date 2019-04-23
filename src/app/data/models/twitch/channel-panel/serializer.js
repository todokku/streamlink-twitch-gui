import TwitchSerializer from "data/models/twitch/serializer";


export default class TwitchChannelPanelSerializer extends TwitchSerializer {
	modelNameFromPayloadKey = () => "twitch-channel-panel";

	normalizeResponse( store, primaryModelClass, payload, id, requestType ) {
		// fix payload format
		payload = {
			[ this.modelNameFromPayloadKey() ]: payload
		};

		return super.normalizeResponse( store, primaryModelClass, payload, id, requestType );
	}

	normalize( modelClass, resourceHash, prop ) {
		const data = resourceHash.data;
		if ( data ) {
			resourceHash.title = data.title;
			resourceHash.image = data.image;
			resourceHash.link = data.link;
		}

		return super.normalize( modelClass, resourceHash, prop );
	}
}
