import attr from "ember-data/attr";
import Fragment from "ember-data-model-fragments/fragment";
import { array } from "ember-data-model-fragments/attributes";


export default class TwitchTicketProductFeatures extends Fragment {
	@attr( "number" )
	base_emoticon_set_id;
	@array( "number" )
	emoticon_set_ids;
	@attr( "string" )
	tier;
}
