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
  } catch (error) {
      console.error('Une erreur s\'est produite', error);
  }
};


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



fetchApiMovie();
fetchApiTv();