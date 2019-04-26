import Controller from "@ember/controller";
import {
	qualities,
	qualitiesLivestreamer,
	qualitiesStreamlink
} from "data/models/stream/model";
import { DEFAULT_VODCAST_REGEXP } from "data/models/settings/streams/fragment";
import { isStreamlink } from "../-utils/streaming-provider";


export default class SettingsStreamsController extends Controller {
	qualitiesLivestreamer = qualitiesLivestreamer;
	qualitiesStreamlink = qualitiesStreamlink;
	contentStreamingQuality = qualities;

	DEFAULT_VODCAST_REGEXP = DEFAULT_VODCAST_REGEXP;

	@isStreamlink()
	isStreamlink;
}
