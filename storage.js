'use strict';


export function loadList(key) {
    const raw = localStorage.getItem(key)
    if(raw === null) {
        return []
    } else {
        return JSON.parse(raw)
    }
};


export function saveList(key, list) {
    localStorage.setItem(key, JSON.stringify(list))
    
    
}