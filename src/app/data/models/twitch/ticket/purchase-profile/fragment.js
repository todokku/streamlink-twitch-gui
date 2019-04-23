import attr from "ember-data/attr";
import Fragment from "ember-data-model-fragments/fragment";


export default class TwitchTicketPurchaseProfile extends Fragment {
	@attr( "number" )
	consecutive_months;
	@attr( "boolean" )
	expired;
	@attr( "date" )
	paid_on;
	@attr( "boolean" )
	refundable;
	@attr( "date" )
	renewal_date;
	@attr( "boolean" )
	will_renew;
}
