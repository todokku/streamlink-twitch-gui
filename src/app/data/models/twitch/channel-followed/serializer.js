import TwitchSerializer from "data/models/twitch/serializer";


export default class TwitchChannelFollowedSerializer extends TwitchSerializer {
	modelNameFromPayloadKey = () => "twitch-channel-followed";

	attrs = {
		channel: { deserialize: "records" }
	};

	normalizeSingleResponse( store, primaryModelClass, payload, id, requestType ) {
		// fix payload format
		payload = {
			[ this.modelNameFromPayloadKey() ]: payload
		};

		return super.normalizeSingleResponse( store, primaryModelClass, payload, id, requestType );
	}

	normalize( modelClass, resourceHash, prop ) {
		const foreignKey = this.store.serializerFor( "twitch-channel" ).primaryKey;

		// get the id of the embedded TwitchChannel record and apply it here
		resourceHash[ this.primaryKey ] = resourceHash.channel[ foreignKey ];

		return super.normalize( modelClass, resourceHash, prop );
	}
}
