const carouselInner = document.querySelector(".carousel-inner");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

async function fetchDataMovie() {
    try {
        const data = await fetchApiMovie();
        const genresMap = await fetchApiMovieGenre();
        const results = data.results;
        for (const movie of results) {
            const index = results.indexOf(movie);
            const id = movie.id;
            const backdrop = movie.backdrop_path;
            const genreIds = movie.genre_ids;
            const originalLanguage = movie.original_language;
            const originalTitle = movie.original_title;
            const overview = movie.overview;
            const popularity = movie.popularity;
            const posterPath = movie.poster_path;
            const releaseDate = movie.release_date;
            const voteAverage = movie.vote_average;
            const voteCount = movie.vote_count;
            console.log(index);
            console.log(genreIds);

            if(index > -1){
                const movie = document.createElement("div")
                movie.className = "movie";
                movie.style.backgroundImage = `url("https://image.tmdb.org/t/p/w500${backdrop}")`;
                const divDescription = document.createElement("div");
                divDescription.className = "divDescription";
                const title = document.createElement("h4");
                title.textContent = originalTitle;
                const genresContainer = document.createElement("div");
                genresContainer.className = "genres";
                genreIds.forEach(genreId => {
                    const genreName = genresMap[genreId];
                    if (genreName) {
                        const genreElement = document.createElement("span");
                        genreElement.textContent = genreName;
                        genresContainer.appendChild(genreElement);
                    }
                });
                carouselInner.appendChild(movie);
                movie.appendChild(divDescription);
                divDescription.appendChild(title);
                divDescription.appendChild(genresContainer);
            }
      }
    } catch (error) {
      console.error('Une erreur s\'est produite', error);
    }
}
  
  fetchDataMovie();

// __________________________ Carouselle _________________________

const movieWidth = 27;
const maxTranslateX = -400;
let translateX = 0;

nextBtn.addEventListener("click", () => {
    if (translateX > maxTranslateX) {
        translateX -= movieWidth;
        carouselInner.style.transform = `translateX(${translateX}vw)`;
    }
});

prevBtn.addEventListener("click", () => {
    if (translateX < 0) {
        translateX += movieWidth;
        carouselInner.style.transform = `translateX(${translateX}vw)`;
    }
});