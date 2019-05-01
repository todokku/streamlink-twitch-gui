import UserIndexRoute from "../index/route";
import InfiniteScrollOffsetMixin from "ui/routes/-mixins/routes/infinite-scroll/offset";
import RefreshRouteMixin from "ui/routes/-mixins/routes/refresh";
import preload from "utils/preload";


export default class UserHostedStreamsRoute
extends UserIndexRoute.extend( InfiniteScrollOffsetMixin, RefreshRouteMixin ) {
	itemSelector = ".stream-item-component";
	modelName = "twitch-stream-hosted";

	async model() {
		const records = await super.model();
		await Promise.all( records
			.mapBy( "target" )
			.uniqBy( "id" )
			.map( /** @param {PromiseObject<TwitchStream>} streamPromise */ async streamPromise => {
				await streamPromise.promise;
				const stream = streamPromise.content;
				if ( stream.isLoading ) {
					await streamPromise;
				} else {
					await stream.reload();
				}
				await preload( stream, "preview.mediumLatest" );
			})
		);

		return records;
	}
}
