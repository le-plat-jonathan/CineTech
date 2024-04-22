const apiKey = '8c4b867188ee47a1d4e40854b27391ec';
const apiMovie = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey;
const apiTv = 'https://api.themoviedb.org/3/discover/tv?api_key=' + apiKey;

const fetchApiMovie = fetch(apiMovie)
.then(response => response.json())
.then(data => {
    console.log(data)
})
.catch(error => {
    console.error('Une erreur s\'est produite', error);
});

const fetchApiTv = fetch(apiTv)
.then(response => response.json())
.then(data => {
    console.log(data)
})
.catch(error => {
    console.error('Une erreur s\'est produite', error);
});

const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const createAccount = 'https://api.themoviedb.org/3/authentication/session/new?api_key=' + apiKey;
    const isFormValid = () =>
      [
        "firstname",
        "lastname",
        "pseudo",
        "birth_date",
        "email",
        "password",
      ].every((input) => data.get(input));

    const response = await fetch(createAccount, {
      method: "POST",
      body: data,
    });

    const responseData = await response.json();

    if (!response.ok) {
        console.error(`Erreur`);
      } else {
        console.error(responseData);
      }
  };
