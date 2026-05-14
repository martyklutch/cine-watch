const API_KEY = "e813d920b5cf8168d2b4e0ac6dcc031e";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const searchInput = document.getElementById("searchInput");
const searchButton = document.querySelector("#searchButton");
const moviesContainer = document.getElementById("searchResults");
const modalOverview = document.querySelector("#movie-overview");
const modalBackDrop = document.querySelector("#movie-backdrop");
const modalMovieCardMini = document.querySelector("#movie-card-mini");
const modalMovieTitle = document.querySelector("#movie-title");
const modalContainer = document.querySelector("#modal-container");

const closeButton = document.querySelector(".close-button");
const modalfaveHeartBtn = document.querySelector("#fave-heart");

let timer;

searchInput.addEventListener('input', (e) => {
    clearTimeout(timer);
    const query = searchInput.value.trim();
    timer = setTimeout(async () => {
        if (query) {
            const movies = await searchMovies(query);
            displayMovies(movies);
        }else {
            fetchPopularMovies()
        }
    }, 300);
});


async function searchMovies(query) {
    try {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
    );
    const data = await response.json();
    return data.results;
    } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
    }
}


function toggleFavorite(heartElement, movie) {
        heartElement.classList.toggle("heart-active");
        if (heartElement.classList.contains("heart-active")) {
        heartElement.textContent = "❤️";  // filled
        } else {
        heartElement.textContent = "♡";  // empty
        }
        // Adding favorites to a local storage
        // getting information from favorites array - check if its empty
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        
        // looks inside the array to see if theres a movie id - 
        // if its not in favorites add it
        const favoriteMovies = favorites.find(f => f.id === movie.id)
        if(!favoriteMovies) {
            favorites.push(movie)
            localStorage.setItem("favorites", JSON.stringify(favorites))
            // if it is remove it
        }else {
            const updatedFavorites = favorites.filter(f => f.id !== movie.id)  
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        }
        
}

// checks to see if faovites is synced 
const syncHeart = (heartElement, movie) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorite = favorites.find(f => f.id === movie.id);
    
    if(isFavorite) {
        // takes the element and displays if favorite
        heartElement.classList.add("heart-active")
        heartElement.textContent = "❤️";
    }else {
        // removes from favorite if user unlikes
        heartElement.classList.remove("heart-active")
        heartElement.textContent = "♡";
    };
}

function displayMovies(movies) {
    moviesContainer.innerHTML = "";
    if (movies.length === 0) {
    moviesContainer.innerHTML = "<p>No movies found.</p>";
    return;
    }
    movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
                <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">
                <div class="movie-info">
                    <span class = "heart-favorite">&#9825;</span>
                    <h3>${movie.title}</h3>
                    <p>${movie.release_date ? movie.release_date.split("-")[0] : "Unknown"} </p>
                </div>
            `;
    
    const movieHeart = movieCard.querySelector(".heart-favorite");
    
    movieCard.addEventListener("click", function () {
        modalContainer.classList.remove("modal-hidden");
        modalContainer.classList.add("modal-active");
        
        // REmoves the old listener so it does not stack and fight each other
        modalfaveHeartBtn.removeEventListener("click", modalfaveHeartBtn.handleModalHeart);
        
        // creates function and stores favorite on button itself
        modalfaveHeartBtn.handleModalHeart = function() {
            toggleFavorite(modalfaveHeartBtn, movie);
            syncHeart(movieHeart, movie);
            }
            
            // adds fresh listener for the current movie
        modalfaveHeartBtn.addEventListener("click", modalfaveHeartBtn.handleModalHeart);

        modalMovieTitle.textContent = `${movie.title}`;
        modalBackDrop.src = `${IMAGE_BASE_URL}${movie.backdrop_path}`;
        modalOverview.textContent = `${movie.overview}`;
        
        // syncs heart on movieCard and modal
        syncHeart(modalfaveHeartBtn, movie);
    });
    
    movieHeart.addEventListener("click", function(event) {
        event.stopPropagation();
        toggleFavorite(movieHeart, movie);    
    })
    
    moviesContainer.appendChild(movieCard);
    
    });
}             

closeButton.addEventListener("click", function () {
    modalContainer.classList.add("modal-hidden");
    modalContainer.classList.remove("modal-active");

    console.log(closeButton);
});

modalContainer.addEventListener("click", function (event) {
    if (event.target === modalContainer) {
    modalContainer.classList.add("modal-hidden");
    modalContainer.classList.remove("modal-active");
    }
});

async function fetchPopularMovies() {
    try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`,
    );
    const data = await response.json();
    const sorted = data.results.sort((a, b) => a.title.localeCompare(b.title));
    displayMovies(sorted);
    } catch (error) {
    console.error("Error fetching popular movies:", error);
    }
}

fetchPopularMovies();
