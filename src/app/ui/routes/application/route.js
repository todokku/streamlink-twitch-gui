import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import { on } from "@ember-decorators/object";


export default class ApplicationRoute extends Route {
	/** @type {AuthService} */
	@service auth;
	/** @type {VersioncheckService} */
	@service versioncheck;

	@on( "init" )
	_autoLogin() {
		this.auth.autoLogin();
	}

	@on( "init" )
	_checkVersion() {
		this.versioncheck.check();
	}
}
