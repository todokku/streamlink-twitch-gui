import attr from "ember-data/attr";
import Model from "ember-data/model";
import { belongsTo } from "ember-data/relationships";
import { name } from "utils/decorators";


@name( "api/users/:user_name/follows/games/live" )
export default class TwitchGameFollowedLive extends Model {
	@attr( "number" )
	channels;
	/** @type {TwitchGameFollowed} */
	@belongsTo( "twitch-game-followed", { async: false } )
	game;
	@attr( "number" )
	viewers;
}
