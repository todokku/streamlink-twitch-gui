import TwitchSerializer from "data/models/twitch/serializer";


export default class TwitchGameFollowedSerializer extends TwitchSerializer {
	modelNameFromPayloadKey = () => "twitch-game-followed";

	attrs = {
		game: { deserialize: "records" }
	};

	normalizeArrayResponse( store, primaryModelClass, payload, id, requestType ) {
		// fix payload format
		payload[ this.modelNameFromPayloadKey() ] = ( payload.follows || [] )
			.map( game => ({ game }) );
		delete payload.follows;

		return super.normalizeArrayResponse( store, primaryModelClass, payload, id, requestType );
	}

	normalizeSingleResponse( store, primaryModelClass, payload, id, requestType ) {
		// fix payload format
		payload = {
			[ this.modelNameFromPayloadKey() ]: { game: payload }
		};

		return super.normalizeSingleResponse( store, primaryModelClass, payload, id, requestType );
	}

	normalize( modelClass, resourceHash, prop ) {
		const foreignKey = this.store.serializerFor( "twitch-game" ).primaryKey;

		// get the id of the embedded TwitchGame record and apply it here
		resourceHash[ this.primaryKey ] = resourceHash.game[ foreignKey ];

		return super.normalize( modelClass, resourceHash, prop );
	}
}
