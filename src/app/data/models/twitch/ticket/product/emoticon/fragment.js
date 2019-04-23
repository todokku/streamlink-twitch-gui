import { computed } from "@ember/object";
import { equal } from "@ember/object/computed";
import attr from "ember-data/attr";
import Fragment from "ember-data-model-fragments/fragment";


export default class TwitchTicketProductEmoticon extends Fragment {
	@attr( "string" )
	regex;
	@attr( "string" )
	regex_display;
	@attr( "string" )
	state;
	@attr( "string" )
	url;

	@equal( "state", "active" )
	isActive;

	@computed( "regex", "regex_display" )
	get title() {
		return this.regex_display || this.regex;
	}
}
