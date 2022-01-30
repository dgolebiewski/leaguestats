import { fetchRiotApi } from '$lib/api';
import { REGIONS } from '$lib/util/consts';

export const get = async ({ params, url }) => {
	const region = REGIONS.find((r) => r.platformPrefix == params.region);

	if (!region) {
		return {
			status: 404
		};
	}

	const summoner = await fetchRiotApi(
		`/summoner/v4/summoners/by-name/${params.name}`,
		region.platformPrefix
	);

	if (summoner.status && summoner.status !== 200) {
		return {
			status: 404
		};
	}

	const matchIds = await fetchRiotApi(
		`/match/v5/matches/by-puuid/${summoner.puuid}/ids`,
		region.regionPrefix,
		{
			start: params.start || 0,
			count: params.count || 10
		}
	);

	if (matchIds.status && matchIds.status !== 200) {
		return {
			status: 404
		};
	}

	const matchRequests = [];

	matchIds.forEach(async (matchId) => {
		matchRequests.push(fetchRiotApi(`/match/v5/matches/${matchId}`, region.regionPrefix));
	});

	summoner.matches = await Promise.all(matchRequests);

	summoner.rankedStats = await fetchRiotApi(
		`/league/v4/entries/by-summoner/${summoner.id}`,
		region.platformPrefix
	);

	summoner.stats = {
		wins: 0,
		losses: 0,
		total: 0,
		winrate: 0
	};

	summoner.matches.forEach((match) => {
		const _summoner = match.info.participants.find((p) => p.puuid === summoner.puuid);

		if (!_summoner) {
			return;
		}

		if (_summoner.win) {
			summoner.stats.wins++;
		} else {
			summoner.stats.losses++;
		}

		summoner.stats.total = summoner.stats.wins + summoner.stats.losses;
		summoner.stats.winrate = (summoner.stats.wins / summoner.stats.total) * 100;
	});

	return {
		body: {
			summoner
		}
	};
};
