'use strict'; 


import { toggleList, syncListButton } from "/movies.js";
import { loadList, saveList } from "../../storage.js";
import { IMAGE_BASE_URL } from "../../api.js";



const searchInput = document.getElementById("searchInput");
const searchButton = document.querySelector("#searchButton");
const container = document.getElementById("searchResults");
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



export function displayMovies(movies, container, emptyMessage = "No movies found.") {
    container.innerHTML = "";
    if (movies.length === 0) {
    container.innerHTML = `<p>${emptyMessage}</p>`;
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

    container.appendChild(movieCard);
    })
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


