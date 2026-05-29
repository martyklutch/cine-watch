'use strict';

import { signUp } from "../auth.js";

document.querySelector('.signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    try {
        const userCredential = await signUp(username, email, password);
        window.location.href = '../movie-watchlist/index.html';
        console.log(userCredential.user);
    } catch (error) {
        console.error(error);
    }
})
