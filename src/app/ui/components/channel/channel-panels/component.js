import Component from "@ember/component";
import { action } from "@ember/object";
import { scheduleOnce } from "@ember/runloop";
import { inject as service } from "@ember/service";
import { classNames, layout, tagName } from "@ember-decorators/component";
import { on } from "@ember-decorators/object";
import Masonry from "masonry-layout";
import template from "./template.hbs";


@layout( template )
@tagName( "section" )
@classNames( "channel-panels-component" )
export default class ChannelPanelsComponent extends Component {
	/** @type {RouterService} */
	@service router;

	@on( "didInsertElement" )
	_masonry() {
		const container = this.element.querySelector( "ul" );
		scheduleOnce( "afterRender", function() {
			return new Masonry( container, {
				itemSelector: ".channel-panel-item-component",
				columnWidth: ".channel-panel-item-component",
				transitionDuration: 0
			});
		});
	}

	@action
	openBrowser( url ) {
		this.router.openBrowserOrTransitionToChannel( url );
	}
}
