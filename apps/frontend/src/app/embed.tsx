'use client'
import { AuthContextProvider } from "@/components/context/AuthContext";
import Navbar from "@/components/navbar";

export default function Embed({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (<>
        {
            // This is the navbar
        }
        <AuthContextProvider>
            <Navbar />
            {children}
        </AuthContextProvider>
    </>)
}