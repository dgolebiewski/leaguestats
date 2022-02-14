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
		if (!participant) return;

		const team = match.teams.find((t) => t.teamId === participant.teamId);

		if (!team) return;

		let champStats = recentChamps.find((c) => c.champion.key == participant.championId);

		if (!champStats) {
			champStats = {
				champion: getChampionByKey(participant.championId),
				gameCount: 1,
				wins: team.win ? 1 : 0,
				kills: participant.kills,
				deaths: participant.deaths,
				assists: participant.assists
			};

			recentChamps.push(champStats);
		} else {
			champStats.gameCount += 1;
			champStats.wins += team.win ? 1 : 0;
			champStats.kills += participant.kills;
			champStats.deaths += participant.deaths;
			champStats.assists += participant.assists;
		}
	});

	recentChamps.sort((a, b) => b.gameCount - a.gameCount);

	return recentChamps.slice(0, maxCount);
};

export const getSummonerRecentTeammates = (summoner) => {
	let teammates = [];

	summoner.matches.forEach((match) => {
		const participant = match.participants.find((p) => p.puuid === summoner.puuid);
		if (!participant) return;

		const team = match.teams.find((t) => t.teamId === participant.teamId);
		if (!team) return;
		const _teammates = match.participants.filter(
			(p) => p.teamId === participant.teamId && p.puuid !== summoner.puuid
		);
		_teammates.forEach((teammate) => {
			const existing = teammates.find((t) => t.puuid === teammate.puuid);
			if (!existing) {
				teammates.push({
					puuid: teammate.puuid,
					name: teammate.summonerName,
					profileIconId: teammate.profileIconId,
					gameCount: 1,
					wins: team.win ? 1 : 0
				});
			} else {
				existing.gameCount++;
				existing.wins += team.win ? 1 : 0;
			}
		});
	});

	teammates = teammates.filter((t) => t.gameCount > 1);
	teammates.sort((a, b) => b.gameCount - a.gameCount);

	return teammates.slice(0, 3);
};
