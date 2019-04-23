import Model from "ember-data/model";
import { belongsTo } from "ember-data/relationships";
import { name } from "utils/decorators";


@name( "api/users/:user_name/follows/games" )
export default class TwitchGameFollowed extends Model {
	/** @type {TwitchGame} */
	@belongsTo( "twitch-game", { async: false } )
	game;
}
