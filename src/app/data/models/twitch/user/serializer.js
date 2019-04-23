import TwitchSerializer from "data/models/twitch/serializer";


export default class TwitchUserSerializer extends TwitchSerializer {
	primaryKey = "id";

	modelNameFromPayloadKey = () => "twitch-user";

	normalizeResponse( store, primaryModelClass, payload, id, requestType ) {
		payload = {
			[ this.modelNameFromPayloadKey() ]: ( payload.users || [] ).map( user => ({
				[ this.primaryKey ]: user.name,
				channel: user._id,
				stream: user._id
			}) )
		};

		return super.normalizeResponse( store, primaryModelClass, payload, id, requestType );
	}
}
