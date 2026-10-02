"use client";

import { useDriverEarnings } from "./hooks/useDriverEarnings";

import EarningsState from "./components/EarningsState";
import EarningsOverview from "./components/EarningsOverview";
import WeeklyAnalytics from "./components/WeeklyAnalytics";
import RideHistory from "./components/RideHistory";

export default function DriverEarnings() {
    const { earnings, loading, error } = useDriverEarnings();

    // LOADING
    if (loading) {
        return <EarningsState type="loading" />;
    }

    // ERROR
    if (error) {
        return <EarningsState type="error" error={error} />;
    }

    // SAFE DATA
    const summary = earnings?.summary || {
        todayEarnings: 0,
        weeklyEarnings: 0,
        completedRides: 0,
        averagePerRide: 0,
        weeklyChange: 0,
    };

    const weeklyChart = earnings?.weeklyChart || [];
    const recentRides = earnings?.recentRides || [];

    // EXPORT
    const handleExport = () => {
        if (!recentRides.length) {
            return;
        }

        const headers = [
            "Passenger",
            "Pickup",
            "Destination",
            "Distance",
            "Duration",
            "Fare",
            "Time",
            "Status",
        ];

        const rows = recentRides.map((ride) => [
            ride.passenger,
            ride.pickup,
            ride.destination,
            ride.distance,
            ride.duration,
            ride.fare,
            ride.time,
            ride.status,
        ]);

        const csv = [
            headers.join(","),
            ...rows.map((row) =>
                row
                    .map((value) => `"${String(value).replace(/"/g, '""')}"`)
                    .join(",")
            ),
        ].join("\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "navgati-driver-earnings.csv";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    return (
        <section className="space-y-5">
            <EarningsOverview summary={summary} />

            <WeeklyAnalytics summary={summary} weeklyChart={weeklyChart} />

            <RideHistory rides={recentRides} onExport={handleExport} />
        </section>
    );
}