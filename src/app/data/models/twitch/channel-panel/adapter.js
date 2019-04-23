import TwitchAdapter from "data/models/twitch/adapter";
import { urlFragments } from "utils/decorators";


@urlFragments({
	channel( type, id, data ) {
		return data.channel;
	}
})
export default class TwitchChannelPanelAdapter extends TwitchAdapter {
	query( store, type, query ) {
		const url = this.buildURL( type, null, null, "query", query );

		return this.ajax( url, "GET", { data: {} } );
	}

	urlForQuery( query, type ) {
		return this._buildURL( type, null, query );
	}
}
