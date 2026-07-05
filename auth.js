import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";



export async function signUp(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User created:", userCredential.user);
        return userCredential;
    } catch (error) {
        console.log("Error:", error.message);
    }
}

export async function signIn(email, password) {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", result.user);
        return result;
    } catch (error) {
        console.log("Error:", error.message);
    }
}

export async function logOut() {
    try {
        await signOut(auth);
        console.log("User signed out:");
    } catch (error) {
        console.log("Error:", error.message);
    }
}