let apiKey = '8c4b867188ee47a1d4e40854b27391ec';
let apiMovie = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey;
let apiTv = 'https://api.themoviedb.org/3/discover/tv?api_key=' + apiKey;
let apiMovieGenre = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey
let apiGuestSession = 'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=' + apiKey;

const myList = document.getElementById('myList');
const guest_logOut = document.getElementById('guest_logOut');
const addFavMovie = document.getElementById('addFavMovie');
const addFavSerie = document.getElementById('addFavSerie');
const removeFav = document.getElementById('removeFav');

// _________________________________________Hero banner background video_________________________________________

function loadPopularMedia() {
    
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
      .then(response => response.json())
      .then(data => loadTrailers(data.results, 'movie'))
      .catch(error => console.error('Error fetching popular movies: ', error));

  
  fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`)
      .then(response => response.json())
      .then(data => loadTrailers(data.results, 'tv'))
      .catch(error => console.error('Error fetching popular TV shows: ', error));
}

let trailers = [];

async function loadTrailers(mediaItems, type) {
  const trailerPromises = mediaItems.slice(0, 50).map(item => {
      const videoUrl = `https://api.themoviedb.org/3/${type}/${item.id}/videos?api_key=${apiKey}`;
      return fetch(videoUrl)
          .then(response => response.json())
          .then(videoData => {
              const trailer = videoData.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
              if (trailer) {
                  trailers.push(`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`);
              }
          })
          .catch(error => console.error(`Error fetching trailers for ${type}: `, error));
  });

  await Promise.all(trailerPromises);
  displayRandomTrailer(); 
}

function displayRandomTrailer() {
  if (trailers.length > 0) {
      const randomIndex = Math.floor(Math.random() * trailers.length);
      const trailerUrl = trailers[randomIndex];

      const videoElement = document.querySelector('.video-container');
      if (videoElement) {
          videoElement.innerHTML = `<iframe src="${trailerUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="absolute inset-0 w-full h-full"></iframe>`;
      }
  } else {
      console.log("No trailers available.");
  }
}

window.onload = function() {
  loadPopularMedia();
};

// _________________________________________Fetch Carousel Infos_________________________________________

const fetchApiMovie = async () => {
  try {
    const response = await fetch(apiMovie);
    const data = await response.json();
    
    if (data && data.results) {
      const movies = data.results;
      const genresMap = await fetchApiGenre();
      const carousselContainer = document.getElementById('caroussel-container-movie');
      
      movies.forEach(movie => {
        const carousselItem = document.createElement('div');
        carousselItem.classList.add('caroussel-item-movie');
        carousselItem.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
        carousselItem.innerHTML = `
        <h3 class="movieTitle">${movie.title}</h3>
          <div class="overlay">
            <div class="movie-info">
              <h3>${movie.title}</h3>
              <p class="releaseDate">Date de sortie: ${movie.release_date}</p>
              <p class="genres">${
                movie.genre_ids.map(genreId => genresMap[genreId]).filter(genre => genre).join(' · ')
              }</p>
              <i id='addFavMovie' class="ri-add-circle-line"></i>
            </div>
          </div>
        `;
        carousselContainer.appendChild(carousselItem);
      });
    } else {
      console.error('Aucun résultat trouvé.');
    }
  } catch (error) {
    console.error('Une erreur s\'est produite', error);
  }
};

const fetchApiSeries = async () => {
  try {
    const response = await fetch(apiTv);
    const data = await response.json();
    
    if (data && data.results) {
      const series = data.results;
      const randomSeries = getRandom(series, 20);
      const genresMap = await fetchApiGenre();
      const carousselSeriesContainer = document.getElementById('caroussel-container-series');
      
      randomSeries.forEach(serie => {
        const carousselItem = document.createElement('div');
        carousselItem.classList.add('caroussel-item-serie');
        carousselItem.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${serie.backdrop_path})`;
        carousselItem.innerHTML = `
        <h2 class="movieTitle">${serie.name}</h2>
        <div class="overlay">
          <div class="movie-info">
            <h2>${serie.name}</h2>
            <p class="releaseDate">Date de sortie: ${serie.first_air_date}</p>
            <p class="genres">${
              serie.genre_ids.map(genreId => genresMap[genreId]).filter(genre => genre).join(', ')
            }</p>
            <i id='addFavSerie' class="ri-add-circle-line"></i>
          </div>
        </div>
        `;
        carousselSeriesContainer.appendChild(carousselItem);
      });
    } else {
      console.error('Aucun résultat trouvé.');
    }
  } catch (error) {
    console.error('Une erreur s\'est produite', error);
  }
};

const displayFavoriteItems = () => {
  try {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const carousselFavoriteContainer = document.getElementById('caroussel-container-favorite');
    carousselFavoriteContainer.innerHTML = '';

    favorites.forEach(item => {
      const carousselItem = document.createElement('div');
      carousselItem.classList.add('caroussel-item-favorite');
      carousselItem.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${item.backdropPath})`;
      const content = `
        <h3 class="movieTitle">${item.title}</h3>
        <div class="overlay">
          <div class="movie-info">
            <h3>${item.title}</h3>
            <p class="releaseDate">Date de sortie: ${item.releaseDate}</p>
            <p class="genres">${item.genres}</p>
            <i id='removeFav' class="ri-checkbox-circle-line"></i>
          </div>
        </div>
      `;
      carousselItem.innerHTML = content;

      carousselFavoriteContainer.appendChild(carousselItem);
    });

  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'affichage des éléments favoris', error);
  }
};

window.addEventListener('load', displayFavoriteItems);


const fetchApiGenre = async () => {
  try {
    const response = await fetch(apiMovieGenre);
    const data = await response.json();
    const genres = data.genres;
    const genresMap = {};
      genres.forEach(genre => {
        genresMap[genre.id] = genre.name;
      });
    return genresMap;
  } catch (error) {
    console.error('Une erreur s\'est produite', error);
  }
};

const getRandom = (arr, num) => {
  const result = [];
  const arrCopy = [...arr];

  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * arrCopy.length);
    const random = arrCopy.splice(randomIndex, 1)[0];
    result.push(random);
  }
  return result;
};

window.addEventListener('load', fetchApiMovie);
window.addEventListener('load', fetchApiSeries);

// _________________________________________Carousel_________________________________________

const movieCaroussel = document.getElementById('caroussel-container-movie');
const seriesCaroussel = document.getElementById('caroussel-container-series');
const moviePrevBtn = document.getElementById('movie-prev');
const movieNextBtn = document.getElementById('movie-next');
const seriesPrevBtn = document.getElementById('series-prev');
const seriesNextBtn = document.getElementById('series-next');

const movieItemWidth = window.innerWidth * 0.8 * 0.11;
const seriesItemWidth = window.innerWidth * 0.8 * 0.11;

let movieScrollPos = 0;
let seriesScrollPos = 0;

movieNextBtn.addEventListener('click', () => {
    movieScrollPos += movieItemWidth;
    movieCaroussel.scrollTo({
        left: movieScrollPos,
        behavior: 'smooth'
    });
});

moviePrevBtn.addEventListener('click', () => {
    movieScrollPos -= movieItemWidth;
    movieCaroussel.scrollTo({
        left: movieScrollPos,
        behavior: 'smooth'
    });
});

seriesNextBtn.addEventListener('click', () => {
    seriesScrollPos += seriesItemWidth;
    seriesCaroussel.scrollTo({
        left: seriesScrollPos,
        behavior: 'smooth'
    });
});

seriesPrevBtn.addEventListener('click', () => {
    seriesScrollPos -= seriesItemWidth;
    seriesCaroussel.scrollTo({
        left: seriesScrollPos,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', function() {
  let navbar = document.getElementById('navbarScroll');
  if (window.scrollY === 0) {
      navbar.classList.remove('bg-black');
  } else {
      navbar.classList.add('bg-black');
  }
});

window.addEventListener('load', function(){
  let navbar = document.getElementById('navbarScroll');
  if (window.scrollY === 0) {
      navbar.classList.remove('bg-black');
  } else {
      navbar.classList.add('bg-black');
  }
});

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

// --------------------------------------- Log In & Out --------------------------------------- //

guest_logOut.addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    try {
      const response = await fetch(apiGuestSession);
      const data = await response.json();
      console.log(data);
      localStorage.setItem('token', data.guest_session_id);
      displayBtn();
    } catch (error) {
      console.error('Une erreur s\'est produite', error);
    }
  } else {
    localStorage.removeItem('token');
    displayBtn();
  }
});

// --------------------------------------- AddFav functions --------------------------------------- //

document.addEventListener('DOMContentLoaded', function() {

  function updateFavoriteClass() {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites.forEach(fav => {
          const elements = document.querySelectorAll(`.caroussel-item-${fav.type}`);
          elements.forEach(element => {
              const titleElement = element.querySelector('.movieTitle');
              if (titleElement && titleElement.textContent === fav.title) {
                  const targetElement = element.querySelector('.ri-add-circle-line');
                  if (targetElement) {
                      targetElement.className = "ri-checkbox-circle-line";
                  }
              }
          });
      });
  }
  async function awaitFetchBeforeUpdating() {
    await fetchApiMovie();
    await fetchApiSeries();
    updateFavoriteClass();
  }
  awaitFetchBeforeUpdating();
});

document.addEventListener('click', function(event) {
  if (event.target && (event.target.id === 'addFavMovie' || event.target.id === 'addFavSerie')) {
      const isMovie = event.target.id === 'addFavMovie';
      const itemInfo = isMovie ? getMovieInfo(event.target) : getSeriesInfo(event.target);
      toggleFavorite(itemInfo, isMovie, event.target);
  }
});

document.addEventListener('click', function(event) {
  if (event.target && (event.target.id === 'removeFav')) {
    removeFavoriteItem(event.target);
  }
});

function removeFavoriteItem(targetElement) {
  try {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    const itemTitle = targetElement.closest('.caroussel-item-favorite').querySelector('.movieTitle').textContent;
    const index = favorites.findIndex(fav => fav.title === itemTitle);
    
    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      displayFavoriteItems();
    } 
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la suppression de l\'élément favori', error);
  }
}


function toggleFavorite(item, isMovie, targetElement) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const index = favorites.findIndex(fav => (isMovie ? fav.title === item.title : fav.title === item.title));

  if (index !== -1) {
    favorites.splice(index, 1);
    targetElement.className = "ri-add-circle-line";
  } else {
    favorites.push(item);
    targetElement.className = "ri-checkbox-circle-line";
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
}


function getMovieInfo(target) {
  const movieContainer = target.closest('.caroussel-item-movie');
  const movieTitle = movieContainer.querySelector('.movieTitle').textContent;
  const releaseDate = movieContainer.querySelector('.releaseDate').textContent;
  const genres = movieContainer.querySelector('.genres').textContent;
  const backdropPath = movieContainer.style.backgroundImage.replace('url("', '').replace('")', '');

  return {
      type: 'movie',
      title: movieTitle,
      releaseDate: releaseDate,
      genres: genres,
      backdropPath: backdropPath
  };
}

function getSeriesInfo(target) {
  const serieContainer = target.closest('.caroussel-item-serie');
  const serieTitle = serieContainer.querySelector('.movieTitle').textContent;
  const releaseDate = serieContainer.querySelector('.releaseDate').textContent;
  const genres = serieContainer.querySelector('.genres').textContent;
  const backdropPath = serieContainer.style.backgroundImage.replace('url("', '').replace('")', '');

  return {
      type: 'series',
      title: serieTitle,
      releaseDate: releaseDate,
      genres: genres,
      backdropPath: backdropPath
  };
}
