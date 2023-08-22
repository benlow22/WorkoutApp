const API_ENDPOINT = `https://amiiboapi.com/`;

export const amiiboFetchApi = async () => {
	const response = await fetch(API_ENDPOINT + `api/amiibo/`);
	console.log("AMIIBO GET response", response.json());
	return response;
};
