import dotenv from 'dotenv';
import Prisma from '@prisma/client';

dotenv.config();

const API_BASE_URL = 'https://{region}.api.riotgames.com/lol';

const prisma = new Prisma.PrismaClient();

export const fetchRiotApi = async (endpoint, regionPrefix, params) => {
	let url = API_BASE_URL.replace('{region}', regionPrefix) + endpoint;

	if (params) {
		Object.keys(params).forEach((key) => {
			if (!url.includes('?')) {
				url += `?${key}=${encodeURIComponent(params[key])}`;
				return;
			}
			url += `&${key}=${encodeURIComponent(params[key])}`;
		});
	}

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'X-Riot-Token': process.env.RIOT_API_KEY
		}
	});

	const json = await response.json();

	return json;
};

export const fetchSummoner = async (region, summonerName) => {
	let summoner = await prisma.summoner.findFirst({
		where: {
			name: summonerName,
			region: region.platformPrefix
		}
	});

	if (!summoner) {
		summoner = await fetchRiotApi(
			`/summoner/v4/summoners/by-name/${summonerName}`,
			region.platformPrefix
		);

		if (summoner.status && summoner.status !== 200) {
			return null;
		}

		const rankedStats = await fetchRiotApi(
			`/league/v4/entries/by-summoner/${summoner.id}`,
			region.platformPrefix
		);

		summoner = await prisma.summoner.create({
			data: {
				summonerId: summoner.id,
				puuid: summoner.puuid,
				region: region.platformPrefix,
				name: summoner.name,
				profileIconId: summoner.profileIconId,
				summonerLevel: summoner.summonerLevel,
				rankedStats
			}
		});
	}

	return summoner;
};

export const fetchMatches = async (region, summonerName, options = {}) => {
	let query = {
		where: {
			name: summonerName,
			region: region.platformPrefix
		}
	};

	if (!options.refresh) {
		query = {
			...query,
			include: {
				matches: {
					include: {
						teams: true,
						participants: true
					},
					orderBy: {
						gameStart: 'asc'
					}
				}
			}
		};
	}

	let summoner = await prisma.summoner.findFirst(query);

	if (!summoner) {
		return [];
	}

	if (!options.refresh && summoner.matches.length > 0) {
		return summoner.matches;
	}

	await prisma.match.deleteMany({
		where: {
			summonerId: summoner.id
		}
	});

	const matchIds = await fetchRiotApi(
		`/match/v5/matches/by-puuid/${summoner.puuid}/ids`,
		region.regionPrefix,
		{
			start: options.start || 0,
			count: options.count || 10
		}
	);

	if (matchIds.status && matchIds.status !== 200) {
		return [];
	}

	const matchRequests = [];

	matchIds.forEach(async (matchId) => {
		matchRequests.push(fetchRiotApi(`/match/v5/matches/${matchId}`, region.regionPrefix));
	});

	let matches = await Promise.all(matchRequests);

	let _matches = matches.map(({ metadata, info }) => ({
		summonerId: summoner.id,
		matchId: metadata.matchId,
		gameStart: new Date(info.gameStartTimestamp),
		gameDuration: info.gameDuration,
		gameMode: info.gameMode,
		gameVersion: info.gameVersion,
		mapId: info.mapId,
		platformId: info.platformId,
		queueId: info.queueId
	}));

	await prisma.match.createMany({
		data: _matches
	});

	_matches = await prisma.match.findMany({
		where: {
			summonerId: summoner.id
		}
	});

	const teams = matches.reduce((acc, { metadata, info }) => {
		const match = _matches.find((m) => m.matchId === metadata.matchId);

		if (!match) {
			return acc;
		}

		acc = acc.concat(
			info.teams.map(({ bans, objectives, teamId, win }) => ({
				matchId: match.id,
				bans,
				objectives,
				teamId,
				win
			}))
		);

		return acc;
	}, []);

	const participants = matches.reduce((acc, { metadata, info }) => {
		const match = _matches.find((m) => m.matchId === metadata.matchId);

		if (!match) {
			return acc;
		}

		acc = acc.concat(
			info.participants.map((participant) => ({
				matchId: match.id,
				puuid: participant.puuid,
				summonerName: participant.summonerName,
				profileIconId: participant.profileIcon,
				kills: participant.kills,
				deaths: participant.deaths,
				assists: participant.assists,
				totalMinionsKilled: participant.totalMinionsKilled,
				challenges: participant.challenges,
				championId: participant.championId,
				championLevel: participant.champLevel,
				items: Array.from(Array(7).keys()).map((i) => participant[`item${i}`]),
				lane: participant.lane,
				teamId: participant.teamId,
				teamPosition: participant.teamPosition,
				summonerSpell1Id: participant.summoner1Id,
				summonerSpell2Id: participant.summoner2Id,
				perks: participant.perks,
				visionScore: participant.visionScore
			}))
		);

		return acc;
	}, []);

	await Promise.all([
		prisma.matchTeam.createMany({
			data: teams
		}),
		prisma.matchParticipant.createMany({
			data: participants
		})
	]);

	matches = await prisma.match.findMany({
		where: {
			summonerId: summoner.id
		},
		include: {
			teams: true,
			participants: true
		}
	});

	return matches;
};
