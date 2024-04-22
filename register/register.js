$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
    var $this = $(this),
        label = $this.prev('label');
  
        if (e.type === 'keyup') {
              if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
          if( $this.val() === '' ) {
              label.removeClass('active highlight'); 
              } else {
              label.removeClass('highlight');   
              }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
              label.removeClass('highlight'); 
              } 
        else if( $this.val() !== '' ) {
              label.addClass('highlight');
              }
      }
  
  });
  
  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
  
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });

// REGISTER

const apiKey = '8c4b867188ee47a1d4e40854b27391ec';

function createUserAccount() {
  let firstName = document.querySelector('#signup input[placeholder="Prénom"]').value;
  let lastName = document.querySelector('#signup input[placeholder="Nom"]').value;
  let email = document.querySelector('#signup input[placeholder="Email"]').value;
  let password = document.querySelector('#signup input[placeholder="Mot de passe"]').value;

  if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '') {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=' + apiKey)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const requestToken = data.request_token;
        
        fetch('https://api.themoviedb.org/3/authentication/session/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            request_token: requestToken,
            first_name: firstName,
            last_name: lastName,
            username: email,
            password: password
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert("Compte créé avec succès !");
            document.querySelectorAll('#signup input').forEach(input => input.value = '');
          } else {
            alert("Erreur lors de la création de compte. Veuillez réessayer.");
          }
        })
        .catch(error => {
          console.error("Erreur lors de la création de compte:", error);
          alert("Erreur lors de la création de compte. Veuillez réessayer.");
        });
      } else {
        alert("Erreur lors de la création de compte. Veuillez réessayer.");
      }
    })
    .catch(error => {
      console.error("Erreur lors de la création de compte:", error);
      alert("Erreur lors de la création de compte. Veuillez réessayer.");
    });
}

document.querySelector('#signup form').addEventListener('submit', function(event) {
  event.preventDefault();
  createUserAccount();
});
