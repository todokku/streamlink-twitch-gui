import Controller from "@ember/controller";
import SettingsStreams from "data/models/settings/streams/fragment";
import { isDarwin } from "utils/node/platform";


const {
	contentName: contentStreamsName,
	info: contentStreamsInfo,
	click: contentStreamsClick
} = SettingsStreams;


export default class SettingsListsController extends Controller {
	contentStreamsName = contentStreamsName;
	contentStreamsInfo = contentStreamsInfo;
	contentStreamsClick = contentStreamsClick;
	isDarwin = isDarwin;
}
