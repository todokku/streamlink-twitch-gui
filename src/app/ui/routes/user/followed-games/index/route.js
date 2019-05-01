import UserIndexRoute from "../../index/route";
import InfiniteScrollOffsetMixin from "ui/routes/-mixins/routes/infinite-scroll/offset";
import RefreshRouteMixin from "ui/routes/-mixins/routes/refresh";


export default class UserFollowedGamesIndexRoute
extends UserIndexRoute.extend( InfiniteScrollOffsetMixin, RefreshRouteMixin ) {
	itemSelector = ".game-item-component";
	modelName = "twitch-game-followed-live";
	modelPreload = "game.game.box.large";
}
