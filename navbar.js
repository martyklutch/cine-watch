'use strict';

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const signupLink = document.querySelector('#signup-link');
const logInLink = document.querySelector('#log-in-link');
const usernameDisplay = document.querySelector('#username-display');
const usernameText = document.querySelector('#username-text');
const dropdownMenu = document.querySelector('#dropdown-menu');
const logoutBtn = document.querySelector('#logout-btn');
const loggedInItems = document.querySelectorAll('.logged-in-only');

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(docRef);
        const userData = userDoc.data();

        const username = userData?.username || user.email.split('@')[0];

        if (usernameText) usernameText.textContent = `Welcome, ${username}!`;
        if (usernameDisplay) usernameDisplay.style.display = 'block';
        if (signupLink) signupLink.closest('li').style.display = 'none';
        if (logInLink) logInLink.closest('li').style.display = 'none';
        loggedInItems.forEach(item => item.style.display = 'list-item');

        if (dropdownMenu) {
            usernameText.addEventListener('click', () => {
                dropdownMenu.classList.toggle('dropdown-hidden');
            });
        }
    } else {
        if (usernameDisplay) usernameDisplay.style.display = 'none';
    }
});

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        logOut();
        window.location.href = '../movie-watchlist/index.html';
    });
}
