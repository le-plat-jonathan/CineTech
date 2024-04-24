const myList = document.getElementById('myList');
const guest_logOut = document.getElementById('guest_logOut');
const apiGuestSession = 'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=' + apiKey;

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
  if(!token) {
    try {
      const response = await fetch(apiGuestSession);
      const data = await response.json();
      localStorage.setItem('token', data.guest_session_id);
      console.log(data);
      displayBtn();
    } catch (error) {
        console.error('Une erreur s\'est produite', error);
    }
  } else {
    localStorage.removeItem('token');
  displayBtn();
  }
});

