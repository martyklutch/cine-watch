

import type {Movie} from "../types.ts";

export class StorageError extends Error {
    constructor(message: string, key: string) {
        super(message);
        this.name = "StorageError";
        this.stack = key;
    }
}

export function loadList(key: string) {
    const raw = localStorage.getItem(key)
    if(raw === null) return [];
    
    
    try {
        return JSON.parse(raw) as Movie[];
    } catch (error) {
        throw new StorageError(`Failed to parse list ${key}`, key);
    }
        
}


export function saveList(key: string, list: Movie[]) {
    localStorage.setItem(key, JSON.stringify(list))
    
    
}