"use client";

import { NavHeader, NavLink, NavMenu } from "@/components/navbar.components";
import { useAuthContext } from "@/components/context/AuthContext";

export default function Navbar() {
    const { user } = useAuthContext();

    return (<div className="navbar bg-base-100 drop-shadow-md">
        <NavHeader href="/">Resume Builder</NavHeader>
        <NavMenu>
            <NavLink href="/about">About</NavLink>
            {user ? (
                <>
                    <NavLink href="/app">Dashboard</NavLink>
                    <NavLink href="/app/profile">Profile</NavLink>
                    <NavLink href="/app/logout">Logout</NavLink>
                </>
            ) : (
                <>
                    <NavLink href="/app/register">Register</NavLink>
                    <NavLink href="/app/login">Login</NavLink>
                </>
            )}
        </NavMenu>
    </div>)
}
