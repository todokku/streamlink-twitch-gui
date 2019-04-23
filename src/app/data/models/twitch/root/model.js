import attr from "ember-data/attr";
import Model from "ember-data/model";
import { name } from "utils/decorators";


@name( "kraken/" )
export default class TwitchRoot extends Model {
	@attr( "date" )
	created_at;
	@attr( "" )
	scopes;
	@attr( "date" )
	updated_at;
	@attr( "number" )
	user_id;
	@attr( "string" )
	user_name;
	@attr( "boolean" )
	valid;
}
