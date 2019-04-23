import TwitchSerializer from "data/models/twitch/serializer";


export default class TwitchTicketSerializer extends TwitchSerializer {
	primaryKey = "id";

	modelNameFromPayloadKey = () => "twitch-ticket";

	normalize( modelClass, resourceHash ) {
		// copy the partner_login info from the product fragment to the ticket
		// EDMF doesn't support model relationships
		const product = resourceHash.product;
		resourceHash[ "partner_login" ] = product && product[ "partner_login" ];

		return super.normalize( ...arguments );
	}
}
