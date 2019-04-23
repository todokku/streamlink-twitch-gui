import attr from "ember-data/attr";
import Model from "ember-data/model";
import { name } from "utils/decorators";


@name( "api/channels/:channel/panels" )
export default class TwitchChannelPanel extends Model {
	@attr( "number" )
	display_order;
	@attr( "string" )
	html_description;
	@attr( "string" )
	image;
	@attr( "string" )
	kind;
	@attr( "string" )
	link;
	@attr( "string" )
	title;
}
