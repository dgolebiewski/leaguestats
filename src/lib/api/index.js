//TODO: move to an env variable
const API_KEY = 'RGAPI-32f54e56-e562-4101-a4cf-98a5ee3cdb39';
const API_BASE_URL = 'https://{region}.api.riotgames.com/lol';

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
			'X-Riot-Token': API_KEY
		}
	});

	const json = await response.json();

	return json;
};
