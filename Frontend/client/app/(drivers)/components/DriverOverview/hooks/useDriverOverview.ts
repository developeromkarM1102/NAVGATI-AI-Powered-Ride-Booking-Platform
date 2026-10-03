"use client";

import { useEffect, useState } from "react";
import { getDriverEarnings, updateDriverAvailability } from "../../../Services/ai.api";
import type { OverviewData } from "../../../types/driver.types";

export function useDriverOverview() {
    const [data, setData] = useState<OverviewData | null>(null);
    const [loading, setLoading] = useState(true);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // FETCH OVERVIEW
    useEffect(() => {
        let cancelled = false;

        const fetchOverview = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getDriverEarnings();

                // console.log("Driver overview response:", response);

                if (!response?.success) {
                    throw new Error(response?.message || response?.error || "Failed to load driver overview");
                }

                const responseData = response?.summary;

                if (!responseData) {
                    throw new Error("Driver overview data not found");
                }

                const summary = responseData?.summary;
                const driver = responseData?.driver;

                if (!summary) {
                    throw new Error("Driver earnings summary not found");
                }

                const mappedData: OverviewData = {
                    todayEarnings: Number(summary.todayEarnings || 0),
                    weeklyEarnings: Number(summary.weeklyEarnings || 0),
                    completedRides: Number(summary.completedRides || 0),
                    averagePerRide: Number(summary.averagePerRide || 0),
                    weeklyChange: Number(summary.weeklyChange || 0),
                    rating: Number(driver?.rating || 0),
                    totalRides: Number(driver?.totalRides || 0),
                    acceptanceRate: Number(summary.acceptanceRate || 0),
                    isAvailable: Boolean(driver?.isAvailable),
                };

                if (!cancelled) {
                    setData(mappedData);
                }

                // console.log("Mapped overview data:", mappedData);
            } catch (error: unknown) {
                // console.error("Driver overview error:", error);

                if (!cancelled) {
                    setError(error instanceof Error ? error.message : "Failed to load driver overview");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void fetchOverview();

        return () => {
            cancelled = true;
        };
    }, []);

    // TOGGLE AVAILABILITY
    const handleAvailabilityToggle = async () => {
        if (!data || updatingStatus) {
            return;
        }

        const newStatus = !data.isAvailable;

        try {
            setUpdatingStatus(true);
            setError(null);

            const response = await updateDriverAvailability(newStatus);

            // console.log("Availability update response:", response);

            if (!response?.success) {
                throw new Error(response?.message || response?.error || "Failed to update availability");
            }

            setData((previous) => {
                if (!previous) {
                    return previous;
                }

                return {
                    ...previous,
                    isAvailable: Boolean(response?.data?.isAvailable ?? newStatus),
                };
            });
        } catch (error: unknown) {
            // console.error("Availability update error:", error);

            setError(error instanceof Error ? error.message : "Failed to update availability");
        } finally {
            setUpdatingStatus(false);
        }
    };

    return {
        data,
        loading,
        updatingStatus,
        error,
        setError,
        handleAvailabilityToggle,
    };
}