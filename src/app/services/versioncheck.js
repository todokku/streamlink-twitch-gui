import { set } from "@ember/object";
import { default as Service, inject as service } from "@ember/service";
import semver from "semver";
import { update as updateConfig } from "config";
import { manifest } from "nwjs/App";
import { argv, ARG_VERSIONCHECK } from "nwjs/argv";


const { "check-again": checkAgain } = updateConfig;
const { version } = manifest;


export default class VersioncheckService extends Service {
	/** @type {ModalService} */
	@service modal;
	/** @type {DS.Store} */
	@service store;

	version = version;

	/** @type {Versioncheck} */
	model = null;
	/** @type {GithubReleases} */
	release = null;


	async check() {
		try {
			/** @type {Versioncheck} */
			const record = await this.store.findRecord( "versioncheck", 1 );
			// versioncheck record found: existing user
			set( this, "model", record );
			await this._notFirstRun();

		} catch ( e ) {
			// versioncheck record not found: new user
			await this._firstRun();
		}
	}

	async ignoreRelease() {
		const record = this.model;
		set( record, "checkagain", +new Date() + checkAgain );

		await record.save();
	}


	async _notFirstRun() {
		// is previous version string empty or lower than current version?
		if ( !this.model.version || semver.lt( this.model.version, this.version ) ) {
			// NEW version -> update record
			set( this.model, "version", this.version );
			await this.model.save();

			// don't show changelog modal if versioncheck is enabled
			// manual upgrades mean that the user has (most likely) seen the changelog already
			if ( !argv[ ARG_VERSIONCHECK ] ) {
				await this._openModalAndCheckForNewRelease( "changelog" );
				return;
			}
		}

		// go on with new version check if no modal was opened
		await this._checkForNewRelease();
	}

	async _firstRun() {
		// unload automatically created record and create a new one instead
		/** @type {Versioncheck} */
		let record = this.store.peekRecord( "versioncheck", 1 );
		/* istanbul ignore next */
		if ( record ) {
			this.store.unloadRecord( record );
		}

		record = this.store.createRecord( "versioncheck", {
			id: 1,
			version: this.version
		});
		await record.save();
		set( this, "model", record );

		// show first run modal dialog
		await this._openModalAndCheckForNewRelease( "firstrun" );
	}

	async _openModalAndCheckForNewRelease( name ) {
		await this.modal.openModal( name, this );
		this.modal.one( "close", ( modal, context ) => {
			/* istanbul ignore else */
			if ( context === this ) {
				this._checkForNewRelease();
			}
		});
	}

	async _checkForNewRelease() {
		// don't check for new releases if disabled or re-check threshold not yet reached
		if ( !argv[ ARG_VERSIONCHECK ] || +new Date() < this.model.checkagain ) { return; }

		/** @type {GithubReleases} */
		const release = await this.store.queryRecord( "github-releases", "latest" );
		set( this, "release", release );

		if ( semver.gte( this.version, release.version ) ) {
			return this.ignoreRelease();
		}

		await this.modal.openModal( "newrelease", this );
	}
}
