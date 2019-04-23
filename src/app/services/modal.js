import { getOwner } from "@ember/application";
import { setProperties } from "@ember/object";
import { notEmpty } from "@ember/object/computed";
import Evented from "@ember/object/evented";
import Service from "@ember/service";


const reModalName = /[A-Z]/g;
const fnModalName = name => `-${name.toLowerCase()}`;


export default class ModalService extends Service.extend( Evented ) {
	modal = null;
	context = null;

	@notEmpty( "modal" )
	isModalOpened;


	/**
	 * @param {string} modal
	 * @param {Object?} context
	 * @param {Object?} data
	 */
	openModal( modal, context, data ) {
		const opened = this.modal;
		if ( opened ) {
			this.trigger( "close", opened, this.context );
		}

		const name = modal.replace( reModalName, fnModalName );
		modal = `modal-${name}`;

		if ( !getOwner( this ).hasRegistration( `component:${modal}` ) ) {
			throw new Error( `Modal component '${modal}' does not exist` );
		}

		context = context || null;
		if ( context && data ) {
			setProperties( context, data );
		}

		setProperties( this, { modal, context } );
		this.trigger( "open", modal, context );
	}

	/**
	 * @param {Object} context
	 * @param {boolean?} force
	 */
	closeModal( context, force ) {
		const _context = this.context;

		if ( force || _context === context && _context !== null ) {
			this.trigger( "close", this.modal, _context );

			setProperties( this, {
				modal: null,
				context: null
			});
		}
	}
}
