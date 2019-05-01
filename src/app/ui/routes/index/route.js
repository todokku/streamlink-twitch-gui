import { action } from "@ember/object";
import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";


export default class IndexRoute extends Route {
	/** @type {RouterService} */
	@service router;

	beforeModel( transition ) {
		// access to this route is restricted
		// but don't block the initial transition
		if ( transition.sequence > 0 ) {
			transition.abort();
		}
	}

	@action
	didTransition() {
		this.router.homepage( true );
	}
}
