const apiKey = '8c4b867188ee47a1d4e40854b27391ec';
const apiMovie = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey;
const apiTv = 'https://api.themoviedb.org/3/discover/tv?api_key=' + apiKey;
const apiGuestSession = 'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=' + apiKey;
const apiDeleteSession = 'https://api.themoviedb.org/3/authentication/session?api_key=' + apiKey;

async function fetchApi(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Une erreur s\'est produite:', error);
    }
}

async function fetchAllApis() {
    await fetchApi(apiTv);
    await fetchApi(apiMovie);
    await fetchApi(apiGuestSession);
    await fetchApi(apiDeleteSession);
}

fetchAllApis();







