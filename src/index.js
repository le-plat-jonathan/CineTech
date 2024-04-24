const apiKey = '8c4b867188ee47a1d4e40854b27391ec';
const apiMovie = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey;
const apiTv = 'https://api.themoviedb.org/3/discover/tv?api_key=' + apiKey;



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




const fetchApiMovie = async () => {
  try {
    const response = await fetch(apiMovie);
    const data = await response.json();
    
    if (data && data.results) {
      const movies = data.results;
      const randomMovies = getRandom(movies, 20);
      const carousselContainer = document.getElementById('caroussel-container-movie');
      
      randomMovies.forEach(movie => {
        const carousselItem = document.createElement('div');
        carousselItem.classList.add('caroussel-item-movie');
        carousselItem.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
        carousselItem.innerHTML = `
        <h2 class="movieTitle">${movie.title}</h2>
        <span class="releaseDate">Sortie le: ${movie.release_date}</span>
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
      const carousselSeriesContainer = document.getElementById('caroussel-container-series');
      
      randomSeries.forEach(serie => {
        const carousselItem = document.createElement('div');
        carousselItem.classList.add('caroussel-item-serie');
        carousselItem.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${serie.backdrop_path})`;
        carousselItem.innerHTML = `
        <h2 class="movieTitle">${serie.name}</h2>
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


const carousels = document.querySelectorAll('.caroussel-container');

carousels.forEach(carousel => {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
});

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
})


const fetchApiMovies = async () => {
  try {
      const response = await fetch(apiMovie);
      const data = await response.json();
      console.log(data);
  } catch (error) {
      console.error('Une erreur s\'est produite', error);
  }
};

fetchApiMovies();