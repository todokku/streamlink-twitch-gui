import { module, test } from "qunit";
import { buildOwner, runDestroy } from "test-utils";
import { setupStore, adapterRequest } from "store-utils";
import { FakeI18nService } from "i18n-utils";

import Service from "@ember/service";

import User from "data/models/twitch/user/model";
import UserAdapter from "data/models/twitch/user/adapter";
import UserSerializer from "data/models/twitch/user/serializer";
import Stream from "data/models/twitch/stream/model";
import StreamSerializer from "data/models/twitch/stream/serializer";
import Channel from "data/models/twitch/channel/model";
import ChannelSerializer from "data/models/twitch/channel/serializer";
import imageInjector from "inject-loader?config!data/models/twitch/image/model";
import ImageSerializer from "data/models/twitch/image/serializer";
import TwitchAdapter from "data/models/twitch/adapter";
import TwitchUserFixtures from "fixtures/data/models/twitch/user.json";
import TwitchChannelFixtures from "fixtures/data/models/twitch/channel.json";
import TwitchStreamFixtures from "fixtures/data/models/twitch/stream.json";


module( "data/models/twitch/user", function( hooks ) {
	const { default: TwitchImage } = imageInjector({
		config: {
			vars: {}
		}
	});

	hooks.beforeEach(function() {
		const owner = this.owner = buildOwner();

		owner.register( "service:auth", Service.extend() );
		owner.register( "service:i18n", FakeI18nService );
		owner.register( "service:settings", Service.extend() );
		owner.register( "model:twitch-user", User );
		owner.register( "adapter:twitch-user", UserAdapter );
		owner.register( "serializer:twitch-user", UserSerializer );
		owner.register( "model:twitch-channel", Channel );
		owner.register( "adapter:twitch-channel", TwitchAdapter.extend() );
		owner.register( "serializer:twitch-channel", ChannelSerializer );
		owner.register( "model:twitch-stream", Stream );
		owner.register( "adapter:twitch-stream", TwitchAdapter.extend() );
		owner.register( "serializer:twitch-stream", StreamSerializer );
		owner.register( "model:twitch-image", TwitchImage );
		owner.register( "serializer:twitch-image", ImageSerializer );

		this.env = setupStore( owner );
	});

	hooks.afterEach(function() {
		runDestroy( this.owner );
		this.owner = this.env = null;
	});


	test( "Adapter and Serializer", async function( assert ) {
		this.env.store.adapterFor( "twitch-user" ).ajax = ( url, method, query ) =>
			adapterRequest( assert, TwitchUserFixtures[ "by-id" ], url, method, query );

		this.env.store.adapterFor( "twitch-channel" ).ajax = ( url, method, query ) =>
			adapterRequest( assert, TwitchChannelFixtures[ "by-id" ], url, method, query );

		this.env.store.adapterFor( "twitch-stream" ).ajax = ( url, method, query ) =>
			adapterRequest( assert, TwitchStreamFixtures[ "single" ], url, method, query );

		/** @type {TwitchUser} */
		const record = await this.env.store.queryRecord( "twitch-user", "foo" );

		assert.deepEqual(
			record.toJSON({ includeId: true }),
			{
				id: "foo",
				channel: "1",
				stream: "1"
			},
			"Records have the correct id and attributes"
		);

		assert.ok(
			!this.env.store.hasRecordForId( "twitch-channel", 1 ),
			"Does not have a channel record registered in the data store"
		);

		assert.ok(
			!this.env.store.hasRecordForId( "twitch-stream", 1 ),
			"Does not have a stream record registered in the data store"
		);

		assert.ok(
			!this.env.store.hasRecordForId( "twitch-image", "stream/preview/1" ),
			"Does not have an image record registered in the data store"
		);

		await record.loadChannel();
		assert.ok(
			this.env.store.hasRecordForId( "twitch-channel", "1" ),
			"Store does have a channel record registered after accessing the channel"
		);

		await record.loadStream();
		assert.ok(
			this.env.store.hasRecordForId( "twitch-stream", "1" ),
			"Store does have a stream record registered after accessing the stream"
		);
		assert.ok(
			this.env.store.hasRecordForId( "twitch-channel", "1" ),
			"Store does have a channel record registered after accessing the channel"
		);
		assert.ok(
			this.env.store.hasRecordForId( "twitch-image", "stream/preview/1" ),
			"Store does have an image record registered after accessing the stream"
		);
	});

});
