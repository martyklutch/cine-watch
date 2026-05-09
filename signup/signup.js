'use strict';

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { signUp } from "../auth.js";

const signUpForm = document.querySelector('.signup-form');

signUpForm.addEventListener('submit', async function(event) {
    event.preventDefault()
    
const email = document.querySelector('#email').value;
const password = document.querySelector('#password').value;
const username = document.querySelector('#username').value;


try {
    const result = await signUp(email, password);
    const uid = result.user.uid;
    await setDoc(doc(db, "users", uid), {
        username: username,
        email: email,
    });
    window.location.href = "../movie-watchlist/index.html";
}catch (error) {
    console.log('Error:', error.message);
}

});