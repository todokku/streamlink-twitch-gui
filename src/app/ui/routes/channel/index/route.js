import { getOwner } from "@ember/application";
import Route from "@ember/routing/route";
import preload from "utils/preload";


export default class ChannelIndexRoute extends Route {
	async model() {
		const { stream, channel } = this.modelFor( "channel" );
		const name = channel.name;

		// panels are still referenced by channel name in the private API namespace
		const records = await this.store.query( "twitch-channel-panel", { channel: name } );
		const panels = await Promise.all( records
			.filterBy( "kind", "default" )
			.sortBy( "display_order" )
			// preload all panel images
			.map( panel => preload( panel, "image" ) )
		);

		return { stream, channel, panels };
	}

	refresh() {
		return getOwner( this ).lookup( "route:channel" ).refresh();
	}
}
