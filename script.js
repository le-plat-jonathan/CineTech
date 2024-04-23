const apiKey = '8c4b867188ee47a1d4e40854b27391ec';
const apiMovie = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey;
const apiTv = 'https://api.themoviedb.org/3/discover/tv?api_key=' + apiKey;
const apiGuestSession = 'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=' + apiKey;
const apiDeleteSession = 'https://api.themoviedb.org/3/authentication/session?api_key=' + apiKey;
const apiToken = 'https://api.themoviedb.org/3/authentication/token/new' + apiKey;

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

fetchApiMovie();
fetchApiTv();
displayBtn();

// --------------------------------------- Log In--------------------------------------- //

guest.addEventListener('click', async function() {
  try {
    const response = await fetch(apiGuestSession);
    const data = await response.json();
    localStorage.setItem('token', data.guest_session_id);
    console.log(data);
    displayBtn();
  } catch (error) {
      console.error('Une erreur s\'est produite', error);
  }
});

// --------------------------------------- Log Out --------------------------------------- //

logOutBtn.addEventListener('click', function() {
  localStorage.removeItem('token');
  displayBtn();
})

// --------------------------------------- Display Btn --------------------------------------- //

function displayBtn() {
  const token = localStorage.getItem('token');
  if(token) {
    guest.style.display = 'none';
    logOutBtn.style.display = 'block';
  } else {
    guest.style.display = 'block';
    logOutBtn.style.display = 'none';
  }
}
