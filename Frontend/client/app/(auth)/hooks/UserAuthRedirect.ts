"use client";

import { useEffect, useState } from "react";
import { UserGetMe } from "../Services/userAuth.api";
import { useRouter } from "next/navigation";

export default function useUserAuthRedirect() {
    
    const router = useRouter();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await UserGetMe();

                if (response?.success && response?.user) {
                    router.replace("/Dashboard");
                    return;
                }

                setCheckingAuth(false);
            } catch (error) {
                // console.error("Auth check error:", error);
                setCheckingAuth(false);
            }
        };

        checkAuth();
    }, [router]);

    return checkingAuth;
}