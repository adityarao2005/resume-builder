import React, { PropsWithChildren } from 'react';
import {
    onAuthStateChanged,
    getAuth,
    User,
} from 'firebase/auth';
import { app } from '@/lib/firebase/';

const auth = getAuth(app);

export const AuthContext = React.createContext<{ user?: User }>({});
export const useAuthContext = () => React.useContext(AuthContext);

export function AuthContextProvider({ children }: PropsWithChildren<{}>) {
    const [user, setUser] = React.useState<User>();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
                setUser(user);
            } else {
                setUser(undefined);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading ...</div> : children}
        </AuthContext.Provider>
    );
};