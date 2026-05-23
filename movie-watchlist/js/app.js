'use strict';

import { IMAGE_BASE_URL, searchMovies, fetchPopularMovies } from "../../api.js";
import { displayMovies } from "../../ui.js";


const movieContainer = document.querySelector('#searchResults');
const searchInput = document.getElementById("searchInput");

let timer;

searchInput.addEventListener('input', (e) => {
    clearTimeout(timer);
    const query = searchInput.value.trim();
    timer = setTimeout(async () => {
        if (query) {
            const movies = await searchMovies(query);
            displayMovies(movies, movieContainer);
        } else {
            const movies = await fetchPopularMovies();
            displayMovies(movies, movieContainer);
        }
    }, 300);
});


(async () => {
    const movies = await fetchPopularMovies();
    displayMovies(movies, movieContainer);
})();
