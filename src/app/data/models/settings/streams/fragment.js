import attr from "ember-data/attr";
import Fragment from "ember-data-model-fragments/fragment";
import { fragment } from "utils/decorators";


export const ATTR_STREAMS_NAME_CUSTOM = 1;
export const ATTR_STREAMS_NAME_ORIGINAL = 2;
export const ATTR_STREAMS_NAME_BOTH = ATTR_STREAMS_NAME_CUSTOM | ATTR_STREAMS_NAME_ORIGINAL;

export const ATTR_STREAMS_INFO_GAME = 0;
export const ATTR_STREAMS_INFO_TITLE = 1;

export const ATTR_STREAMS_CLICK_NOOP = 0;
export const ATTR_STREAMS_CLICK_LAUNCH = 1;
export const ATTR_STREAMS_CLICK_CHAT = 2;
export const ATTR_STREAMS_CLICK_CHANNEL = 3;
export const ATTR_STREAMS_CLICK_SETTINGS = 4;

export const DEFAULT_VODCAST_REGEXP
	= "\\b(not live|re-?(run|streaming)|(vod-?|re-?broad)cast(ing)?)\\b";


export default class SettingsStreams extends Fragment {
	static contentName = [
		{ id: ATTR_STREAMS_NAME_BOTH, label: "both" },
		{ id: ATTR_STREAMS_NAME_CUSTOM, label: "custom" },
		{ id: ATTR_STREAMS_NAME_ORIGINAL, label: "original" }
	];

	static filterLanguages = [
		{ id: false, label: "fade" },
		{ id: true, label: "filter" }
	];

	static info = [
		{ id: ATTR_STREAMS_INFO_GAME, label: "game" },
		{ id: ATTR_STREAMS_INFO_TITLE, label: "title" }
	];

	static click = [
		{ id: ATTR_STREAMS_CLICK_NOOP, label: "noop" },
		{ id: ATTR_STREAMS_CLICK_LAUNCH, label: "launch" },
		{ id: ATTR_STREAMS_CLICK_CHAT, label: "chat" },
		{ id: ATTR_STREAMS_CLICK_CHANNEL, label: "channel" },
		{ id: ATTR_STREAMS_CLICK_SETTINGS, label: "settings" }
	];

	@attr( "number", { defaultValue: ATTR_STREAMS_NAME_BOTH } )
	name;

	@attr( "boolean", { defaultValue: false } )
	modal_close_end;
	@attr( "boolean", { defaultValue: false } )
	modal_close_launch;

	@attr( "boolean", { defaultValue: false } )
	chat_open;
	@attr( "boolean", { defaultValue: false } )
	chat_open_context;
	@attr( "boolean", { defaultValue: false } )
	twitchemotes;

	@attr( "boolean", { defaultValue: true } )
	filter_vodcast;
	@attr( "string", { defaultValue: "" } )
	vodcast_regexp;

	@attr( "boolean", { defaultValue: false } )
	filter_languages;
	/** @type {SettingsStreamsLanguages} */
	@fragment( "settings-streams-languages" )
	languages;

	@attr( "boolean", { defaultValue: false } )
	show_flag;
	@attr( "boolean", { defaultValue: false } )
	show_info;
	@attr( "number", { defaultValue: ATTR_STREAMS_INFO_TITLE } )
	info;

	@attr( "number", { defaultValue: ATTR_STREAMS_CLICK_CHAT } )
	click_middle;
	@attr( "number", { defaultValue: ATTR_STREAMS_CLICK_SETTINGS } )
	click_modify;
}
