import Helper from "@ember/component/helper";
import { inject as service } from "@ember/service";
import { observes } from "@ember-decorators/object";
import formatTitle from "services/hotkey/title";


export const helper = class HotkeyTitleHelper extends Helper {
	/** @type {I18nService} */
	@service i18n;

	compute( [ keyTitle, hotkey ], properties ) {
		const i18n = this.i18n;
		const title = i18n.t( keyTitle, properties ).toString();

		return formatTitle( i18n, title, hotkey );
	}

	@observes( "i18n.locale" )
	_localeObserver() {
		this.recompute();
	}
};
