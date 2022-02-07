import { getChampionByKey } from './assets';

export const getSummonerStats = (summoner) => {
	const stats = {
		wins: 0,
		losses: 0,
		total: 0,
		winrate: 0
	};

	summoner.matches.forEach((match) => {
		const participant = match.participants.find((p) => p.puuid === summoner.puuid);

		if (!participant) {
			return;
		}

		const team = match.teams.find((t) => t.teamId === participant.teamId);

		if (!team) {
			return;
		}

		if (team.win) {
			stats.wins++;
		} else {
			stats.losses++;
		}

		stats.total = stats.wins + stats.losses;
		stats.winrate = (stats.wins / stats.total) * 100;
	});

	return stats;
};

export const getSummonerRecentChampions = (summoner, maxCount = 3) => {
	const recentChamps = [];

	summoner.matches.forEach((match) => {
		const participant = match.participants.find((p) => p.puuid === summoner.puuid);
		if (!participant) {
			return;
		}

		let champStats = recentChamps.find((c) => c.champion.key == participant.championId);

		if (!champStats) {
			if (recentChamps.length >= maxCount) {
				return;
			}

			champStats = {
				champion: getChampionByKey(participant.championId),
				gameCount: 1,
				wins: participant.win ? 1 : 0,
				kills: participant.kills,
				deaths: participant.deaths,
				assists: participant.assists
			};

			recentChamps.push(champStats);
		} else {
			champStats.gameCount += 1;
			champStats.wins += participant.win ? 1 : 0;
			champStats.kills += participant.kills;
			champStats.deaths += participant.deaths;
			champStats.assists += participant.assists;
		}
	});

	return recentChamps;
};
