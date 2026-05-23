'use strict';



import { loadList, saveList } from "./storage.js";



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