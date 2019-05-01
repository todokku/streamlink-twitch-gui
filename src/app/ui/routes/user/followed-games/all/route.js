import UserFollowedGamesIndexRoute from "../index/route";


export default class UserFollowedGamesAllRoute extends UserFollowedGamesIndexRoute {
	modelName = "twitch-game-followed";
	modelPreload = "game.box.large";
}
