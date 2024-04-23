const carouselInner = document.querySelector(".carousel-inner");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

async function fetchData() {
    try {
        const data = await fetchApiMovie();
        const results = data.results;
        for (const movie of results) {
            const index = results.indexOf(movie);
            const id = movie.id;
            const backdrop = movie.backdrop_path;
            const originalLanguage = movie.original_language;
            const originalTitle = movie.original_title;
            const overview = movie.overview;
            const popularity = movie.popularity;
            const posterPath = movie.poster_path;
            const releaseDate = movie.release_date;
            const voteAverage = movie.vote_average;
            const voteCount = movie.vote_count;

            if(index > -1){
                const movie = document.createElement("div")
                movie.className = "movie";
                movie.style.backgroundImage = `url("https://image.tmdb.org/t/p/w500${backdrop}")`;
                const divDescription = document.createElement("div");
                divDescription.className = "divDescription";
                const title = document.createElement("h4");
                const paraOverview = document.createElement("p");
                title.textContent = originalTitle;
                paraOverview.textContent = overview;
                carouselInner.appendChild(movie);
                movie.appendChild(divDescription);
                divDescription.appendChild(title);
                divDescription.appendChild(paraOverview);
            }
      }
    } catch (error) {
      console.error('Une erreur s\'est produite', error);
    }
  }
  
  fetchData();

let translateX = 0;

nextBtn.addEventListener("click", () => {
    translateX -= 27;
    carouselInner.style.transform = `translateX(${translateX}vw)`;
});

prevBtn.addEventListener("click", () => {
    translateX += 27;
    carouselInner.style.transform = `translateX(${translateX}vw)`;
});