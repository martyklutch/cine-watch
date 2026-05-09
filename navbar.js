'use strict';

import { auth } from "./firebase.js";
import { logOut } from "./auth.js";
import { onAuthStateChanged } from "firebase/auth";


onAuthStateChanged(auth, (user) => {
    if (user) {
        //someone is logged in
        document.querySelector('#username-display').textContent = user.email;
        document.querySelector('#signup-link').style.display = 'none';
        document.querySelector('#log-in-link').style.display = 'none';
        document.querySelector('#username-display').style.display = 'block';
    }else {
        // nobody is logged in
        document.querySelector('#signup-link').style.display = 'block';
        document.querySelector('#log-in-link').style.display = 'block';
        document.querySelector('#username-display').style.display = 'none';
    }
})