import React, { PropsWithChildren } from 'react';
import {
    onAuthStateChanged,
    getAuth,
    User,
} from 'firebase/auth';
import { app } from '@/lib/firebase/';

// Gets the Firebase Auth instance
const auth = getAuth(app);

// Creates AuthContext with user state
export const AuthContext = React.createContext<{ user?: User }>({});
// Custom hook to use AuthContext
export const useAuthContext = () => React.useContext(AuthContext);

// AuthContextProvider component
export function AuthContextProvider({ children }: PropsWithChildren<{}>) {
    // State to hold user and loading status
    const [user, setUser] = React.useState<User>();
    const [loading, setLoading] = React.useState(true);

    // Effect to subscribe to auth state changes
    React.useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            // If the user exists, set the user state, otherwise set it to undefined
            if (user) {
                setUser(user);
            } else {
                setUser(undefined);
            }
            // Set loading to false after checking auth state
            setLoading(false);
        });

        // Unsubscribe from the listener on unmount
        return () => unsubscribe();
    }, []);

    // Provide user state and loading status to children
    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading ...</div> : children}
        </AuthContext.Provider>
    );
};