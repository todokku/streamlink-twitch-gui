import TwitchSerializer from "data/models/twitch/serializer";


export default class TwitchUserSerializer extends TwitchSerializer {
	primaryKey = "id";

	modelNameFromPayloadKey = () => "twitch-user";

	normalizeResponse( store, primaryModelClass, payload, id, requestType ) {
		const users = payload.users /* istanbul ignore next */ || [];
		payload = {
			[ this.modelNameFromPayloadKey() ]: users.map( user => ({
				[ this.primaryKey ]: user.name,
				channel: user._id,
				stream: user._id
			}) )
		};

		return super.normalizeResponse( store, primaryModelClass, payload, id, requestType );
	}

	normalizeSingleResponse( store, primaryModelClass, payload, id, requestType ) {
		const key = this.modelNameFromPayloadKey();
		payload[ key ] = payload[ key ][0];

		return super.normalizeSingleResponse( store, primaryModelClass, payload, id, requestType );
	}
}
