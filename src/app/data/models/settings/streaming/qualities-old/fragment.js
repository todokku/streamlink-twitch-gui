import { defineProperty } from "@ember/object";
import attr from "ember-data/attr";
import Fragment from "ember-data-model-fragments/fragment";
import { qualitiesLivestreamer } from "data/models/stream/model";


class SettingsStreamingQualitiesOld extends Fragment {}

for ( const { id } of qualitiesLivestreamer ) {
	const prop = attr( "string" );
	defineProperty( SettingsStreamingQualitiesOld.prototype, id, prop );
}


export default SettingsStreamingQualitiesOld;
