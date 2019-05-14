import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { classNames, layout, tagName } from "@ember-decorators/component";
import EmbeddedHtmlLinksComponent from "ui/components/link/embedded-html-links/component";
import template from "./template.hbs";
import "./styles.less";


@layout( template )
@tagName( "li" )
@classNames( "channel-panel-item-component" )
export default class ChannelPanelItemComponent extends EmbeddedHtmlLinksComponent {
	/** @type {NwjsService} */
	@service nwjs;
	/** @type {RouterService} */
	@service router;

	/**
	 * @param {MouseEvent} event
	 */
	contextMenu( event ) {
		const target = event.target;
		if ( target.tagName === "IMG" && target.classList.contains( "withLink" ) ) {
			return this.linkContentMenu( event, this.panel.link );
		}
		if ( target.tagName === "A" && target.classList.contains( "external-link" ) ) {
			return this.linkContentMenu( event, target.href );
		}
	}

	linkContentMenu( event, url ) {
		this.nwjs.contextMenu( event, [
			{
				label: [ "contextmenu.open-in-browser" ],
				click: () => this.nwjs.openBrowser( url )
			},
			{
				label: [ "contextmenu.copy-link-address" ],
				click: () => this.nwjs.clipboard.set( url )
			}
		]);
	}

	@action
	openBrowser( url ) {
		this.router.openBrowserOrTransitionToChannel( url );
	}
}
