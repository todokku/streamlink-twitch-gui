import { get, computed } from "@ember/object";
import { streaming as streamingConfig } from "config";


const { providers } = streamingConfig;

/**
 * Can't use any of the settings-fragment's computed properties here
 * since the controller's model is an ObjectBuffer instance
 * @param {Function} fn
 * @returns {function(): PropertyDescriptor}
 */
function getProviderDecorator( fn ) {
	return () => computed( "model.streaming.provider", {
		get() {
			const provider = get( this, "model.streaming.provider" );

			return fn( providers[ provider ] );
		}
	});
}


export const providerName = getProviderDecorator( p => p[ "name" ] );

export const isStreamlink = getProviderDecorator( p => p[ "type" ] === "streamlink" );
