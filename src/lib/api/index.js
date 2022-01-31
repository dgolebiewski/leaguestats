//TODO: move to an env variable
const API_KEY = 'RGAPI-f781027f-e967-48b8-93cc-8430366bb14e';
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
