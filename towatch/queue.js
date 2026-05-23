'use strict';

import { toggleList, syncListButton } from "/movies.js";
import { loadList, saveList } from "../../storage.js";


const API_KEY = "e813d920b5cf8168d2b4e0ac6dcc031e";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const searchInput = document.getElementById("searchInput");
const searchButton = document.querySelector("#searchButton");
const qContainer = document.querySelector("#searchResults");
const modalOverview = document.querySelector("#movie-overview");
const modalBackDrop = document.querySelector("#movie-backdrop");
const modalMovieCardMini = document.querySelector("#movie-card-mini");
const modalMovieTitle = document.querySelector("#movie-title");
const modalContainer = document.querySelector("#modal-container");

const closeButton = document.querySelector(".close-button");



const VAULT = {
    key: 'vault',
    activeClass: 'vault-active',
}

const WATCHING = {
    key: 'watching',
    activeClass: 'watch-active',
}

const QUEUE = {
    key: 'queue',
    activeClass: 'queue-active',
}

let timer;

searchInput.addEventListener('input', (e) => {
    clearTimeout(timer);
    const query = searchInput.value.trim();
    timer = setTimeout(async () => {
        if (query) {
            const movies = await searchMovies(query);
            displayQueue(movies);
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



function displayQueue(movies) {
    const queue = loadList('queue');
    qContainer.innerHTML = "";
    
    if(queue.length === 0) {
        qContainer.innerHTML = "<p> Your watch is empty</p>";
        return;
    }
    
    movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
                <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">
                <div class="movie-info">
                    <div class="list-menu">
                    <button class="toggle-menu">+</button>
                        <div class="list-options">
                            <button class="add-vault">The Vault</button>
                            <button class="add-watch">Watching Now</button>
                            <button class="add-queue">My Queue</button>
                        </div>
                    </div>        
                    <h3>${movie.title}</h3>
                    <p>${movie.release_date ? movie.release_date.split("-")[0] : "Unknown"} </p>
                </div>
            `;
    
    
    
    const toggleMenu = movieCard.querySelector(".toggle-menu");
    const listMenu = movieCard.querySelector('.list-menu');
    const vaultBtn = movieCard.querySelector(".add-vault");
    syncListButton(vaultBtn, movie, VAULT);
    const watchBtn = movieCard.querySelector(".add-watch");
    syncListButton(watchBtn, movie, WATCHING);
    const queueBtn = movieCard.querySelector(".add-queue");
    syncListButton(queueBtn, movie, QUEUE);
    
    toggleMenu.addEventListener('click', function(event) {
        event.stopPropagation();
        listMenu.classList.toggle('open');
    })
    
    vaultBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleList(vaultBtn, movie, VAULT);
        console.log(`Added ${movie.title} to your vault`);
    })
    
        watchBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleList(watchBtn, movie, WATCHING);
        console.log(`Added ${movie.title} to your watching now list`);
    })
    
        queueBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleList(queueBtn, movie, QUEUE);
        console.log(`Added ${movie.title} to your queue`);
    })
    
    movieCard.addEventListener("click", function () {
        modalContainer.classList.remove("modal-hidden");
        modalContainer.classList.add("modal-active");

        modalMovieTitle.textContent = `${movie.title}`;
        modalBackDrop.src = `${IMAGE_BASE_URL}${movie.backdrop_path}`;
        modalOverview.textContent = `${movie.overview}`;

    });

    qContainer.appendChild(movieCard);
    
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

displayQueue(loadList('queue'));