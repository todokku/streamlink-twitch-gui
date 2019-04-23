import TwitchSerializer from "data/models/twitch/serializer";


export default class TwitchGameFollowedLiveSerializer extends TwitchSerializer {
	modelNameFromPayloadKey = () => "twitch-game-followed-live";

	attrs = {
		game: { deserialize: "records" }
	};

	normalize( modelClass, resourceHash, prop ) {
		const foreignKey = this.store.serializerFor( "twitch-game" ).primaryKey;

		// fix payload format
		resourceHash.game = { game: resourceHash.game };

		// get the id of the embedded TwitchGame record and apply it here
		resourceHash[ this.primaryKey ] = resourceHash.game.game[ foreignKey ];

		return super.normalize( modelClass, resourceHash, prop );
	}
}
