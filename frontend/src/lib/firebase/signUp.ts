import { app } from "@/lib/firebase/";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(app)

export async function signUp(email: string, password: string) {
    let result = null, error = null;

    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error }
}