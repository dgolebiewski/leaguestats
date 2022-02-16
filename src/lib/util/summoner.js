import { getChampionByKey } from './assets';
import { formatTime } from './time';

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
	let recentChamps = [];

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
				assists: participant.assists,
				cs: participant.totalMinionsKilled + participant.neutralMinionsKilled,
				totalGameDuration: match.gameDuration
			};

			recentChamps.push(champStats);
		} else {
			champStats.gameCount += 1;
			champStats.wins += team.win ? 1 : 0;
			champStats.kills += participant.kills;
			champStats.deaths += participant.deaths;
			champStats.assists += participant.assists;
			champStats.cs += participant.totalMinionsKilled + participant.neutralMinionsKilled;
			champStats.totalGameDuration += match.gameDuration;
		}
	});

	recentChamps.sort((a, b) => b.gameCount - a.gameCount);

	recentChamps = recentChamps.slice(0, maxCount);

	recentChamps.forEach((champion) => {
		champion.stats = [
			{
				label: 'summoner.avgCs',
				value: Math.round((champion.cs / champion.gameCount) * 100) / 100
			},
			{
				label: 'summoner.avgCsm',
				value: Math.round((champion.cs / (champion.totalGameDuration / 60)) * 100) / 100
			},
			{
				label: 'summoner.avgKills',
				value: Math.round((champion.kills / champion.gameCount) * 100) / 100
			},
			{
				label: 'summoner.avgDeaths',
				value: Math.round((champion.deaths / champion.gameCount) * 100) / 100
			},
			{
				label: 'summoner.avgAssists',
				value: Math.round((champion.assists / champion.gameCount) * 100) / 100
			},
			{
				label: 'summoner.avgGameTime',
				value: formatTime(champion.totalGameDuration / champion.gameCount)
			}
		];
	});

	return recentChamps;
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
