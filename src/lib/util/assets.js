import EmblemIron from '$assets/images/ranked-emblems/Emblem_Iron.png';
import EmblemBronze from '$assets/images/ranked-emblems/Emblem_Bronze.png';
import EmblemSilver from '$assets/images/ranked-emblems/Emblem_Silver.png';
import EmblemGold from '$assets/images/ranked-emblems/Emblem_Gold.png';
import EmblemPlatinum from '$assets/images/ranked-emblems/Emblem_Platinum.png';
import EmblemDiamond from '$assets/images/ranked-emblems/Emblem_Diamond.png';
import EmblemMaster from '$assets/images/ranked-emblems/Emblem_Master.png';
import EmblemGrandmaster from '$assets/images/ranked-emblems/Emblem_Grandmaster.png';
import EmblemChallenger from '$assets/images/ranked-emblems/Emblem_Challenger.png';
import EmblemUnranked from '$assets/images/ranked-emblems/Emblem_Unranked.png';
import champions from '$assets/json/champion.json';
import summonerSpells from '$assets/json/summoner.json';
import runes from '$assets/json/runesReforged.json';

const runeImages = import.meta.glob('/src/assets/images/perk-images/Styles/**/*.png');
const styleImages = import.meta.glob('/src/assets/images/perk-images/Styles/*.png');

export const getProfileIconUrl = (iconId) => {
	return `http://ddragon.leagueoflegends.com/cdn/12.3.1/img/profileicon/${iconId}.png`;
};

export const getRankedEmblemUrl = (tier) => {
	switch (tier?.toUpperCase() || 'UNRANKED') {
		case 'IRON':
			return EmblemIron;
		case 'BRONZE':
			return EmblemBronze;
		case 'SILVER':
			return EmblemSilver;
		case 'GOLD':
			return EmblemGold;
		case 'PLATINUM':
			return EmblemPlatinum;
		case 'DIAMOND':
			return EmblemDiamond;
		case 'MASTER':
			return EmblemMaster;
		case 'GRANDMASTER':
			return EmblemGrandmaster;
		case 'CHALLENGER':
			return EmblemChallenger;
		default:
			return EmblemUnranked;
	}
};

export const getChampionByKey = (key) => {
	return Object.values(champions.data).find((c) => c.key == key);
};

export const getChampionSquareImageUrl = (id) => {
	return `http://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${id}.png`;
};

export const getSummonerSpellByKey = (key) => {
	return Object.values(summonerSpells.data).find((s) => s.key == key);
};

export const getSummonerSpellImageUrl = (id) => {
	return `http://ddragon.leagueoflegends.com/cdn/12.3.1/img/spell/${id}.png`;
};

export const getRuneImageUrl = async (styleId, id) => {
	const style = runes.find((r) => r.id == styleId);

	if (!style) return null;

	const rune = style.slots
		.reduce((acc, curr) => acc.concat(curr.runes), [])
		.find((r) => r.id == id);

	const url = await runeImages[`/src/assets/images/${rune.icon}`]();

	return url.default;
};

export const getStyleImageUrl = async (id) => {
	const style = runes.find((r) => r.id == id);

	const url = await styleImages[`/src/assets/images/${style.icon}`]();

	return url.default;
};

export const getItemImageUrl = (id) => {
	return `http://ddragon.leagueoflegends.com/cdn/12.3.1/img/item/${id}.png`;
};
