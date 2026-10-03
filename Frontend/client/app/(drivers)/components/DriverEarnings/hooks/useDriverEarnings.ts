"use client";

import { useEffect, useState } from "react";
import { getDriverEarnings } from "../../../Services/ai.api";
import type {EarningsData } from "../../../types/driver.types";

export function useDriverEarnings() {
    const [earnings, setEarnings] = useState<EarningsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // FETCH EARNINGS
    useEffect(() => {
        let cancelled = false;

        const fetchEarnings = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getDriverEarnings();

                // console.log("Driver earnings response:", response);

                if (!response?.success) {
                    throw new Error(response?.message || response?.error || "Failed to fetch earnings");
                }

                const earningsData = response?.summary;

                if (!earningsData) {
                    throw new Error("Driver earnings data not found");
                }

                const summary = earningsData?.summary;

                if (!summary) {
                    throw new Error("Driver earnings summary not found");
                }

                const weeklyChart = earningsData?.weeklyChart || [];
                const recentRides = earningsData?.recentRides || [];

                const mappedData: EarningsData = {
                    summary: {
                        todayEarnings: Number(summary.todayEarnings || 0),
                        weeklyEarnings: Number(summary.weeklyEarnings || 0),
                        completedRides: Number(summary.completedRides || 0),
                        averagePerRide: Number(summary.averagePerRide || 0),
                        weeklyChange: Number(summary.weeklyChange || 0),
                    },
                    weeklyChart,
                    recentRides,
                };

                if (!cancelled) {
                    setEarnings(mappedData);
                }

                // console.log("Mapped earnings data:", mappedData);
            } catch (error: unknown) {
                // console.error("Fetch earnings error:", error);

                if (!cancelled) {
                    setError(error instanceof Error ? error.message : "Unable to load earnings");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void fetchEarnings();

        return () => {
            cancelled = true;
        };
    }, []);

    return {
        earnings,
        loading,
        error,
    };
}