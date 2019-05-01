import Controller from "@ember/controller";
import { computed } from "@ember/object";
import { main as config, locales as localesConfig } from "config";
import metadata from "metadata";
import { arch } from "utils/node/platform";
import "./styles.less";


const { urls: { release: releaseUrl } } = config;
const { package: { version }, dependencies } = metadata;


export default class AboutController extends Controller {
	metadata = metadata;
	config = config;
	localesConfig = localesConfig;

	arch = arch;

	@computed()
	get releaseUrl() {
		return releaseUrl.replace( "{version}", version );
	}

	@computed()
	get dependencies() {
		return Object.keys( dependencies ).map( key => ({
			title: key,
			version: dependencies[ key ]
		}) );
	}
}
