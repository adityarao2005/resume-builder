import { app } from "@/lib/firebase/";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);
export async function signOut() {
    let result = null,
        error = null;

    try {
        result = await auth.signOut();
    } catch (e) {
        error = e;
    }

    return { result, error };
}