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