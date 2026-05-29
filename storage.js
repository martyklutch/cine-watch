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
        throw new storageError(`Failed to parse list "${key}"`, key);
    }
        
}


export function saveList(key, list) {
    localStorage.setItem(key, JSON.stringify(list))
    
    
}


export function signUp(username, email, password) {
    const users = loadList('users');
    if (users.find(user => user.email === email)) {
        alert("Email already in use");
        return;
    }

    const user = { uid: crypto.randomUUID(), username, email, password };
    users.push(user);
    saveList('users', users);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
}

export function signIn(email, password) {
    const users = loadList('users');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid email or password');
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
}

export function logOut() {
    localStorage.removeItem('currentUser');
}

