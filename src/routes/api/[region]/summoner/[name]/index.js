import { fetchMatches, fetchSummoner } from '$lib/api';
import { REGIONS } from '$lib/util/consts';

export const get = async ({ params, url }) => {
	const region = REGIONS.find((r) => r.platformPrefix == params.region);

	if (!region) {
		return {
			status: 404
		};
	}

	let summoner = await fetchSummoner(region, params.name, !!url.searchParams.get('refresh'));

	if (!summoner) {
		return {
			status: 404
		};
	}

	summoner.matches = await fetchMatches(region, params.name);

	return {
		body: {
			summoner
		}
	};
};
