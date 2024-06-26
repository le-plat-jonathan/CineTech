let apiKey = '8c4b867188ee47a1d4e40854b27391ec';
let apiMovie = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey;
let apiTv = 'https://api.themoviedb.org/3/discover/tv?api_key=' + apiKey;
let apiGuestSession = 'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=' + apiKey;
let apiDeleteSession = 'https://api.themoviedb.org/3/authentication/session?api_key=' + apiKey;

const token = localStorage.getItem('token');
const logOutBtn = document.getElementById('logOut');
const guest = document.getElementById('guest');

const fetchApiMovie = async () => {
  try {
      const response = await fetch(apiMovie);
      const data = await response.json();
      console.log(data);
  } catch (error) {
      console.error('Une erreur s\'est produite', error);
  }
};

const fetchApiTv = async () => {
  try {
      const response = await fetch(apiTv);
      const data = await response.json();
      console.log(data);
    } catch (error) {
        console.error('Une erreur s\'est produite', error);
    }
};
