'use strict';


import { signIn, logOut } from "../auth.js";

document.querySelector('.login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    try {
        const user = await signIn(email, password);
        window.location.href = '../movie-watchlist/index.html';
        console.log(user);
    } catch (error) {
        console.error(error);
    }
})




const logoutBtn = document.querySelector('#logout-btn');
if(logoutBtn) logoutBtn.addEventListener('click', logOut);
