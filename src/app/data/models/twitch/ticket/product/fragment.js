import attr from "ember-data/attr";
import Fragment from "ember-data-model-fragments/fragment";
import { fragmentArray } from "ember-data-model-fragments/attributes";
import { fragment } from "utils/decorators";


export default class TwitchTicketProduct extends Fragment {
	/** @type {TwitchTicketProductEmoticon[]} */
	@fragmentArray( "twitch-ticket-product-emoticon" )
	emoticons;
	/** @type {TwitchTicketProductFeatures} */
	@fragment( "twitch-ticket-product-features" )
	features;
	@attr( "number" )
	interval_number;
	@attr( "string" )
	name;
	@attr( "string" )
	owner_name;
	@attr( "string" )
	period;
	@attr( "string" )
	price;
	@attr( "boolean" )
	recurring;
	@attr( "string" )
	short_name;
	@attr( "string" )
	ticket_type;
}
