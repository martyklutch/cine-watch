'use strict';

import { auth } from "../../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase.js";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";

import { toggleFavorite, syncHeart } from "/movies.js";


let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
    }else {
        currentUser = null;
    }
})



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
