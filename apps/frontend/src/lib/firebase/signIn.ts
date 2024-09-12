import { app } from "@/lib/firebase";
import { signInWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function signInCredentials(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function signInGooglePopup() {
    let result = null,
        error = null;
    try {
        result = await signInWithPopup(auth, provider);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function signInGoogleRedirect() {
    await signInWithRedirect(auth, provider);
}