'use strict';

// import { auth, db } from "./firebase.js";
// import { onAuthStateChanged } from "firebase/auth";

import { loadList, saveList } from "./storage.js";


// export async function toggleFavorite(heartElement, movie) {
//     if(!auth.currentUser) return;
//         heartElement.classList.toggle("heart-active");
//         if (heartElement.classList.contains("heart-active")) {
//         heartElement.textContent = "❤️";  // filled
//         } else {
//         heartElement.textContent = "♡";  // empty
//         }
//         try {
//             const uid = auth.currentUser.uid;
//         if (heartElement.classList.contains("heart-active")) {
//         await updateDoc(doc(db, "users", uid), {
//             favorites: arrayUnion(movie)
//         });
//         } else {
//         await updateDoc(doc(db, "users", uid), {
//             favorites: arrayRemove(movie)
//         });
//         }

//         }catch (error) {
//             console.log("Error:", error.message);
//         }
// }

// checks to see if faovites is synced 
// export async function syncHeart(heartElement, movie) {
//     // check if currentUser exist - if not return early
//     if(!auth.currentUser) return;
    
//     // get uid
//     const uid = auth.currentUser.uid;
    
//    try { 
//     // get the users document using getDoc 
//     const userDoc = await getDoc(doc(db, "users", uid));
    
//     // get the data
//     const data = userDoc.data();
    
//     // get favorites array
//     const favorites = data.favorites || [];
    
//     // check if movie is in favorites
//     const isFavorite = favorites.find(f => f.id === movie.id);
    
//     if(isFavorite) {
//         // takes the element and displays if favorite
//         heartElement.classList.add("heart-active")
//         heartElement.textContent = "❤️";
//     }else {
//         // removes from favorite if user unlikes
//         heartElement.classList.remove("heart-active")
//         heartElement.textContent = "♡";
//     } 
    
// } catch (error) {
//         console.log("Error:", error.message);
//     }
    
// }


export function toggleList(button, movie, listConfig) {
    const list = loadList(listConfig.key);
    
    const isInList = list.find(item => item.id === movie.id);
    
    let updatedList;
    
    if(isInList) {
        updatedList = list.filter(item => item.id !== movie.id);
        button.classList.remove(listConfig.activeClass);
        
    } else {
        updatedList = [...list, movie];
        button.classList.add(listConfig.activeClass);
    }
    
    saveList(listConfig.key, updatedList);
}

export function syncListButton (button, movie, listConfig) {
    const list = loadList(listConfig.key);
    
    const isInList = list.find(item => item.id === movie.id);
    
    if(isInList) {
        button.classList.add(listConfig.activeClass);
    
    } else {
        button.classList.remove(listConfig.activeClass);
    }
    
}