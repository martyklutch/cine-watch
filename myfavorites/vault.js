'use strict';

import { auth } from "../firebase.js";
import { db } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

import { toggleFavorite, syncHeart } from "../movies.js";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";


const modalOverview = document.querySelector("#movie-overview");
const modalBackDrop = document.querySelector("#movie-backdrop");
const modalMovieCardMini = document.querySelector("#movie-card-mini");
const modalMovieTitle = document.querySelector("#movie-title");
const modalContainer = document.querySelector("#modal-container");

const closeButton = document.querySelector(".close-button");
const modalfaveHeartBtn = document.querySelector("#fave-heart");

onAuthStateChanged(auth, async(user) => {
    try {
        
    if(user) {
        const uid = user.uid
           const userDoc = await getDoc(doc(db, "users", uid));
            
            // get the data
            const data = userDoc.data();
            
            // get favorites array
            const favorites = data.favorites || [];
            
            displayFavorites(favorites);
    }else {
        
        window.location.href = "/movie-watchlist/index.html";
    }
    
} catch (error) {
    
    console.log("Error:", error.message);
}
});


function displayFavorites(favorites) {
    const container = document.querySelector('#favorites-Results');
    
        favorites.forEach((movie) => {
        
            
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
            
            container.appendChild(movieCard);
            
            
                const movieHeart = movieCard.querySelector(".heart-favorite");
                movieHeart.classList.add("heart-active");
                movieHeart.textContent = "❤️";
                
                movieCard.addEventListener("click", function () {
                    modalContainer.classList.remove("modal-hidden");
                    modalContainer.classList.add("modal-active");
                    
                    // Removes the old listener so it does not stack and fight each other
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