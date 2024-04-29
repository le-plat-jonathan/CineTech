const divPosterPath = document.querySelector(".divPosterPath");
const detailDescription = document.querySelector(".detailDescription");
const detailsFilm = document.querySelector(".detailsFilm");

async function fetchDataMovie() {
    try {
        const data = await fetchApiMovie();
        const genresMap = await fetchApiMovieGenre();
        const results = data.results;

        console.log(results);

        let index = 0;

        for (const movie of results) {
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

            if (index === 0) {
                divPosterPath.style.backgroundImage = `url("https://image.tmdb.org/t/p/w500${posterPath}")`;
                const movieTitle = document.createElement("p");
                movieTitle.textContent = `Title: ${originalTitle}`;
                detailDescription.appendChild(movieTitle);
                const movieOverview = document.createElement("p");
                movieOverview.textContent = overview;
                detailDescription.appendChild(movieOverview);
                const moviePopularity = document.createElement("p");
                moviePopularity.textContent = `Popularity: ${popularity}`;
                detailDescription.appendChild(moviePopularity);
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
                detailDescription.appendChild(genresContainer);
            }
            index++;
        }
    } catch (error) {
      console.error('Une erreur s\'est produite', error);
    }
}
  
  fetchDataMovie();