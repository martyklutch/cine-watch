'use strict';

// import { auth } from "./firebase.js";
// import { logOut } from "./auth.js";
// import { onAuthStateChanged } from "firebase/auth";


// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         //someone is logged in
        
//         document.querySelector('#username-text').textContent = user.email;
//         document.querySelector('#signup-link').style.display = 'none';
//         document.querySelector('#log-in-link').style.display = 'none';
//         document.querySelector('#username-display').style.display = 'block';
        
        
//         const userDisplay = document.querySelector('#username-text');
//         const dropdownMenu = document.querySelector('#dropdown-menu');
//         const logOutbtn = document.querySelector('#logout-btn');
        
//         if(userDisplay && dropdownMenu) {
//             userDisplay.addEventListener('click', function() {
//                 dropdownMenu.classList.toggle('dropdown-hidden');
//             })
//             logOutbtn.addEventListener('click', function() {
//               logOut()  
//             })
//         }
        
        
        
//     }else {
//         // nobody is logged in
//         document.querySelector('#signup-link').style.display = 'block';
//         document.querySelector('#log-in-link').style.display = 'block';
//         document.querySelector('#username-display').style.display = 'none';
//     }
    
    
// })


