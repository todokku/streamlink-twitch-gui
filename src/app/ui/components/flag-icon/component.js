import Component from "@ember/component";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import { attribute, className, classNames, tagName } from "@ember-decorators/component";
import { langs as langsConfig } from "config";
import "./styles.less";


@tagName( "i" )
@classNames( "flag-icon-component" )
export default class FlagIconComponent extends Component {
	/** @type {I18nService} */
	@service i18n;

	lang;
	type;
	withTitle = true;

	@className( "", "no-cursor" )
	withCursor = true;

	@className
	@computed( "lang" )
	get flag() {
		const code = langsConfig[ this.lang ];

		return code
			? `flag-${code.flag}`
			: null;
	}

	@attribute
	@computed( "withTitle", "lang" )
	get title() {
		if ( !this.withTitle ) { return ""; }

		const i18n = this.i18n;
		const type = this.type;
		const path = `languages.${this.lang}`;

		if ( type !== "channel" && type !== "broadcaster" || !i18n.exists( path ) ) {
			return "";
		}

		return i18n.t( `components.flag-icon.${type}`, {
			lang: i18n.t( path ).toString()
		}).toString();
	}
}
