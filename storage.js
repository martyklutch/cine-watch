'use strict';


export class storageError extends Error {
    constructor(message, key) {
        super(message);
        this.name = "StorageError:";
        this.key = key;
    }
}

export function loadList(key) {
    const raw = localStorage.getItem(key)
    if(raw === null) return [];
    
    
    try {
        return JSON.parse(raw);
    } catch (error) {
        throw new StorageError(`Failed to parse list "${key}`, key);
    }
        
};


export function saveList(key, list) {
    localStorage.setItem(key, JSON.stringify(list))
    
    
}