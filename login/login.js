'use strict';

import { signIn } from "../auth.js";

const logIn = document.querySelector('.login-form');

logIn.addEventListener('submit', async function(event) {
    event.preventDefault()
    
const email = document.querySelector('#email').value;
const password = document.querySelector('#password').value;

try {
    const result = await signIn(email, password);
    window.location.href = "../movie-watchlist/index.html";
}catch (error) {
    console.log("Error:", error.message);
}

})