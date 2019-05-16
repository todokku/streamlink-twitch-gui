import Component from "@ember/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { className, classNames, layout, tagName } from "@ember-decorators/component";
import { on } from "@ember-decorators/object";
import HotkeyMixin from "ui/components/-mixins/hotkey";
import template from "./template.hbs";
import "./styles.less";


@layout( template )
@tagName( "section" )
@classNames( "modal-dialog-component" )
export default class ModalDialogComponent extends Component.extend( HotkeyMixin ) {
	/** @type {ModalService} */
	@service modal;

	@className
	class = "";

	hotkeys = [
		{
			key: [ "Escape", "Backspace" ],
			action: "close"
		}
	];

	/*
	 * This will be called synchronously, so we need to copy the element and animate it instead
	 */
	@on( "willDestroyElement" )
	_fadeOut() {
		const element = this.element;
		let clone = element.cloneNode( true );
		clone.classList.add( "fadeOut" );
		element.parentNode.appendChild( clone );
		clone.addEventListener( "webkitAnimationEnd", () => {
			clone.parentNode.removeChild( clone );
			clone = null;
		}, { once: true } );
	}


	@action
	close() {
		this.modal.closeModal( null, true );
	}
}
