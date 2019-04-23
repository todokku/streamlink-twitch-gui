import attr from "ember-data/attr";
import Model from "ember-data/model";
import { belongsTo } from "ember-data/relationships";
import { name } from "utils/decorators";


@name( "api/users/:user_name/followed/hosting" )
export default class TwitchStreamHosted extends Model {
	@attr( "string" )
	display_name;
	@attr( "string" )
	name;
	/** @type {PromiseObject<TwitchStream>} */
	@belongsTo( "twitch-stream", { async: true } )
	target;
}
