import { update as config } from "config";
import CustomRESTAdapter from "data/models/-adapters/custom-rest";


const { githubreleases: { host, namespace } } = config;


export default class GithubReleasesAdapter extends CustomRESTAdapter {
	host = host;
	namespace = namespace;
}
