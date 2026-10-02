"use client";

import { useEffect, useState } from "react";
import { DriverGetMe } from "../Services/driverAuth.api";
import { useRouter } from "next/navigation";

export default function useDriverAuthRedirect() {
    
    const router = useRouter();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await DriverGetMe();

                if (response?.success && response?.driver) {
                    router.replace("/DriveDash");
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