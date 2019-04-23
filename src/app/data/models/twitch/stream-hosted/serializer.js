import TwitchSerializer from "data/models/twitch/serializer";


export default class TwitchStreamHostedSerializer extends TwitchSerializer {
	primaryKey = "id";

	modelNameFromPayloadKey = () => "twitch-stream-hosted";

	normalize( modelClass, resourceHash, prop ) {
		// get the target _id property and use it as key for the twitchStream relation
		resourceHash.target = resourceHash.target._id;

		return super.normalize( modelClass, resourceHash, prop );
	}
}
