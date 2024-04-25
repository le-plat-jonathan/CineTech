const carouselInner = document.querySelector(".carousel-inner");
const carouselInner1 = document.querySelector(".carousel-inner1");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const prevBtn1 = document.querySelector(".prev-btn1");
const nextBtn1 = document.querySelector(".next-btn1");

async function fetchDataMovie() {
    try {
        const data = await fetchApiMovie();
        const genresMap = await fetchApiMovieGenre();
        const results = data.results;
        for (const movie of results) {
            const index = results.indexOf(movie);
            const id = movie.id;
            const backdropPath = movie.backdrop_path;
            const genreIds = movie.genre_ids;
            const originalLanguage = movie.original_language;
            const originalTitle = movie.original_title;
            const overview = movie.overview;
            const popularity = movie.popularity;
            const posterPath = movie.poster_path;
            const releaseDate = movie.release_date;
            const voteAverage = movie.vote_average;
            const voteCount = movie.vote_count;

            if(index > -1){
                const movie = document.createElement("div");
                const backdrop = document.createElement("div");
                movie.className = "movie";
                backdrop.className = "backdrop";
                backdrop.style.backgroundImage = `url("https://image.tmdb.org/t/p/w500${backdropPath}")`;
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
                movie.appendChild(backdrop);
                movie.appendChild(divDescription);
                divDescription.appendChild(title);
                divDescription.appendChild(genresContainer);
            }

            if(index > -1){
                const movie = document.createElement("div");
                movie.className = "movie";
                movie.style.backgroundImage = `url("https://image.tmdb.org/t/p/w500${backdropPath}")`;
                const divDescription = document.createElement("div");
                divDescription.className = "divDescription";
                const title = document.createElement("h4");
                title.textContent = originalTitle;
                const genresContainer = document.createElement("div");
                genresContainer.className = "genres";
                genreIds.forEach(genreId => {
                    const genreName = genresMap[genreId];
                    // const genreNameTables = array.from(genreName);
                    // console.log(genreNameTables);
                    if (genreName) {
                        const genreElement = document.createElement("span");
                        genreElement.textContent = genreName;
                        genresContainer.appendChild(genreElement);
                    }
                });
                carouselInner1.appendChild(movie);
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

// __________________________ Carousel _________________________

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

nextBtn1.addEventListener("click", () => {
    if (translateX > maxTranslateX) {
        translateX -= movieWidth;
        carouselInner1.style.transform = `translateX(${translateX}vw)`;
    }
});

prevBtn1.addEventListener("click", () => {
    if (translateX < 0) {
        translateX += movieWidth;
        carouselInner1.style.transform = `translateX(${translateX}vw)`;
    }
});