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

export const getProfileIconUrl = (iconId) => {
	return `http://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/${iconId}.png`;
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
