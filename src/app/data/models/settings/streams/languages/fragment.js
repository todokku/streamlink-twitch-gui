import { defineProperty } from "@ember/object";
import attr from "ember-data/attr";
import Fragment from "ember-data-model-fragments/fragment";
import { langs as langsConfig } from "config";


class SettingsStreamsLanguages extends Fragment {}

for ( const [ code, { disabled } ] of Object.entries( langsConfig ) ) {
	if ( disabled ) { continue; }
	const prop = attr( "boolean", { defaultValue: false } );
	defineProperty( SettingsStreamsLanguages.prototype, code, prop );
}


export default SettingsStreamsLanguages;
