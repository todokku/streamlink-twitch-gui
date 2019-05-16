import Component from "@ember/component";
import { layout } from "@ember-decorators/component";
import { inject as service } from "@ember/service";
import template from "./template.hbs";


@layout( template )
export default class ModalServiceComponent extends Component {
	/** @type {ModalService} */
	@service modal;
}
