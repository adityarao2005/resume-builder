"use client";

import { useSearchParams } from "next/navigation";
import { NavHeader, NavLink, NavMenu } from "@/components/navbar.components";

function useAuthorized() {
    const params = useSearchParams();

    const test = params.get("test");

    if (test === "true") {
        return true;
    }

    return false;
}

export default function Navbar() {
    // TODO - Test hook for now, change later once authentication is created
    const isAuthorized = useAuthorized();

    return (<div className="navbar bg-base-100 drop-shadow-md">
        <NavHeader href="/">Resume Builder</NavHeader>
        <NavMenu>
            <NavLink href="/about">About</NavLink>
            {isAuthorized ? (
                <>
                    <NavLink href="/app">Dashboard</NavLink>
                    <NavLink href="/app/profile">Profile</NavLink>
                    <NavLink href="/logout">Logout</NavLink>
                </>
            ) : (
                <>
                    <NavLink href="/register">Register</NavLink>
                    <NavLink href="/login">Login</NavLink>
                </>
            )}
        </NavMenu>
    </div>)
}
