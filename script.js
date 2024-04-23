const apiKey = '8c4b867188ee47a1d4e40854b27391ec';
const apiMovie = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey;
const apiTv = 'https://api.themoviedb.org/3/discover/tv?api_key=' + apiKey;


const fetchApiMovie = fetch(apiMovie)
.then(response => response.json())
.then(data => {
    console.log(data)
})
.catch(error => {
    console.error('Une erreur s\'est produit', error);
});

const fetchApiTv = fetch(apiTv)
.then(response => response.json())
.then(data => {
    console.log(data)
})
.catch(error => {
    console.error('Une erreur s\'est produit', error);
});



