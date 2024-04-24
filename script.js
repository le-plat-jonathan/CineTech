const apiKey = '8c4b867188ee47a1d4e40854b27391ec';
const apiMovie = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey;
const apiTv = 'https://api.themoviedb.org/3/discover/tv?api_key=' + apiKey;
const apiGuestSession = 'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=' + apiKey;
const apiDeleteSession = 'https://api.themoviedb.org/3/authentication/session?api_key=' + apiKey;
const apiToken = 'https://api.themoviedb.org/3/authentication/token/new?api_key=' + apiKey; // Corrected

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
      displayBtn();
    } catch (error) {
        console.error('Une erreur s\'est produite', error);
    }
};

const myList = document.getElementById('myList');
const guest_logOut = document.getElementById('guest_logOut');

// --------------------------------------- Display Btn --------------------------------------- //

function displayBtn() {
  const token = localStorage.getItem('token');
  if(token) {
    myList.style.display = 'block';
    guest_logOut.textContent = 'Déconnexion';
  } else {
    myList.style.display = 'none';
    guest_logOut.textContent = 'Connexion';
  }
}

displayBtn();

// --------------------------------------- Log In--------------------------------------- //

guest_logOut.addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    try {
      const response = await fetch(apiGuestSession);
      const data = await response.json();
      console.log(data);
      displayBtn();
    } catch (error) {
      console.error('Une erreur s\'est produite', error);
    }
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