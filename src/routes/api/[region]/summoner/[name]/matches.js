import { fetchMatches } from '$lib/api';
import { REGIONS } from '$lib/util/consts';

export const get = async ({ params, url }) => {
	const region = REGIONS.find((r) => r.platformPrefix == params.region);

	if (!region) {
		return {
			status: 404
		};
	}

	const matches = await fetchMatches(region, params.name, {
		start: parseInt(url.searchParams.get('start')) || 0
	});

	return {
		body: {
			matches
		}
	};
};
