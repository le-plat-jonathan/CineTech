const apiKey = '8c4b867188ee47a1d4e40854b27391ec';
const apiMovie = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey;
const apiTv = 'https://api.themoviedb.org/3/discover/tv?api_key=' + apiKey;
const token = localStorage.getItem('token');

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

fetchApiMovie();
fetchApiTv();

const guest = document.getElementById('guest');

guest.addEventListener('click', async function() {
  try {
    const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=' + apiKey);
    const data = await response.json();
    localStorage.setItem('token', data.guest_session_id);
    console.log(data);
} catch (error) {
    console.error('Une erreur s\'est produite', error);
}
});