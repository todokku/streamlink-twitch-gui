import { alias } from "@ember/object/computed";
import { computed } from "@ember/object";
import attr from "ember-data/attr";
import Model from "ember-data/model";
import { belongsTo } from "ember-data/relationships";
import Moment from "moment";
import { fragment, name } from "utils/decorators";


@name( "api/users/:user_name/tickets" )
export default class TwitchTicket extends Model {
	/** @type {TwitchTicketProduct} */
	@fragment( "twitch-ticket-product" )
	product;
	/** @type {TwitchTicketPurchaseProfile} */
	@fragment( "twitch-ticket-purchase-profile" )
	purchase_profile;

	/** @type {PromiseObject<TwitchUser>} */
	@belongsTo( "twitch-user", { async: true } )
	partner_login;

	@attr( "date" )
	access_end;
	@attr( "date" )
	access_start;
	@attr( "boolean" )
	expired;
	@attr( "boolean" )
	is_gift;

	/** @type {PromiseObject<TwitchChannel>} */
	@alias( "partner_login.channel" )
	channel;


	// load the chained PromiseProxy
	async loadChannel() {
		const user = this.partner_login;
		await user.promise;
		const channel = user.content.channel;
		await channel.promise;

		return channel.content;
	}


	get hasEnded() {
		const access_end = this.access_end;

		return access_end && new Date() > access_end;
	}

	get ends() {
		const access_end = this.access_end;

		return new Moment().to( access_end );
	}


	@computed( "access_start", "purchase_profile.consecutive_months" )
	get subbedFor() {
		const purchase_profile = this.purchase_profile;
		if ( purchase_profile ) {
			const months = purchase_profile.consecutive_months;
			if ( Number.isInteger( months ) && months > 0 ) {
				return months;
			}
		}

		const started = this.access_start;
		if ( started ) {
			const diff = new Moment().diff( new Moment( started ), "months", true );

			return Math.ceil( diff );
		}

		return 1;
	}
}
