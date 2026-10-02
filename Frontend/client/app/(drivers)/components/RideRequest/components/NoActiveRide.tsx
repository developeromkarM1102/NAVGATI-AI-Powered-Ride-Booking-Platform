import { Car } from "lucide-react";

import type { RideStatus } from "../../../types/driver.types";

interface NoActiveRideProps {
    status: RideStatus;
    actionError: string;
}

export default function NoActiveRide({
    status,
    actionError,
}: NoActiveRideProps) {
    const cancelled = status === "cancelled";

    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Car size={24} />
            </div>

            <p className="mt-3 text-sm font-bold text-slate-700">
                {cancelled
                    ? "Ride cancelled"
                    : "No active ride requests"}
            </p>

            <p className="mt-1 text-xs text-slate-400">
                {cancelled
                    ? "The passenger cancelled this ride."
                    : "New ride requests will appear here."}
            </p>

            {cancelled && actionError && (
                <div className="mx-auto mt-4 max-w-md rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
                    {actionError}
                </div>
            )}

        </section>
    );
}