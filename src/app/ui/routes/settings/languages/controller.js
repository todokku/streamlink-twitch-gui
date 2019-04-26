import Controller from "@ember/controller";
import { get, set, computed, action } from "@ember/object";
import { langs as langsConfig } from "config";
import SettingsStreams from "data/models/settings/streams/fragment";


const { filterLanguages: contentStreamsFilterLanguages } = SettingsStreams;


export default class SettingsLanguagesController extends Controller {
	contentStreamsFilterLanguages = contentStreamsFilterLanguages;

	@computed()
	get languages() {
		return Object.keys( langsConfig )
			.filter( code => !langsConfig[ code ].disabled );
	}


	@action
	checkLanguages( all ) {
		const filters = get( this, "model.streams.languages" );
		const languages = this.languages;
		for ( const id of languages ) {
			set( filters, id, all );
		}
	}
}
