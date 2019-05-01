import UserIndexRoute from "../index/route";
import InfiniteScrollOffsetMixin from "ui/routes/-mixins/routes/infinite-scroll/offset";
import RefreshRouteMixin from "ui/routes/-mixins/routes/refresh";


export default class UserFollowedStreamsRoute
extends UserIndexRoute.extend( InfiniteScrollOffsetMixin, RefreshRouteMixin ) {
	itemSelector = ".stream-item-component";
	modelName = "twitch-stream-followed";
	modelMapBy = "stream";
	modelPreload = "preview.mediumLatest";
}
