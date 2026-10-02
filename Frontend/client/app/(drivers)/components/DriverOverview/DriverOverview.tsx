"use client";

import { useDriverOverview } from "./hooks/useDriverOverview";

import OverviewState from "./components/OverviewState";
import OverviewHeader from "./components/OverviewHeader";
import OverviewStats from "./components/OverviewStats";
import OverviewPerformance from "./components/OverviewPerformance";

export default function DriverOverview() {
    const {
        data,
        loading,
        updatingStatus,
        error,
        setError,
        handleAvailabilityToggle,
    } = useDriverOverview();

    // LOADING
    if (loading) {
        return <OverviewState type="loading" />;
    }

    // ERROR
    if (error && !data) {
        return <OverviewState type="error" error={error} />;
    }

    // NO DATA
    if (!data) {
        return null;
    }

    return (
        <section>
            {/* INLINE ERROR */}
            {error && (
                <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                    <p className="text-xs font-medium text-red-600">{error}</p>

                    <button type="button" onClick={() => setError(null)} className="text-xs font-bold text-red-500 hover:text-red-700">
                        Dismiss
                    </button>
                </div>
            )}

            <OverviewHeader data={data} updatingStatus={updatingStatus} onToggleAvailability={handleAvailabilityToggle} />

            <OverviewStats data={data} />

            <OverviewPerformance data={data} />
        </section>
    );
}