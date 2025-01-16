'use client'

import { useAuthContext } from "@/components/context/AuthContext";
import { signOut } from "@/lib/firebase/signOut";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
    const { user } = useAuthContext();
    const router = useRouter();

    if (user) {
        signOut();
    }

    router.push("/app/login");
}