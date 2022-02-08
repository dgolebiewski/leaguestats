export const getWinrateTextColor = (winrate) => {
	if (winrate < 25) return 'text-defeat-red';
	if (winrate < 50) return 'text-orange-600';
	if (winrate < 75) return 'text-emerald-500';

	return 'text-victory-blue';
};
