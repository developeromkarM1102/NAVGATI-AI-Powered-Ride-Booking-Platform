"use client";

import { CheckCircle2 } from "lucide-react";

import type {
    Booking,
    DriverLocation,
    PassengerLocation,
} from "../../../types/driver.types";

import PassengerInfo from "./PassengerInfo";
import RouteDetails from "./RouteDetails";
import RideMetrics from "./RideMetrics";
import LiveLocationStatus from "./LiveLocationStatus";
import RideActions from "./RideActions";

interface ActiveRideProps {
    booking: Booking;

    status: "accepted" | "ongoing";

    actionLoading: boolean;
    actionError: string;

    driverLocation: DriverLocation | null;
    passengerLocation: PassengerLocation | null;

    onStartNavigation: () => void;
    onCancelRide: () => void;
    onCompleteRide: () => void;
    onStopLocationSharing: () => void;

    formatDistance: (distance: number) => string;
    formatDuration: (duration: number) => string;
}

export default function ActiveRide({
    booking,
    status,
    actionLoading,
    actionError,
    driverLocation,
    passengerLocation,
    onStartNavigation,
    onCancelRide,
    onCompleteRide,
    onStopLocationSharing,
    formatDistance,
    formatDuration,
}: ActiveRideProps) {
    const isOngoing = status === "ongoing";

    return (
        <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">

            {/* HEADER */}
            <div className="border-b border-emerald-100 bg-emerald-50 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
                        <CheckCircle2 size={20} />
                    </div>

                    <div>
                        <h2 className="text-sm font-bold text-emerald-800">
                            {isOngoing
                                ? "Ride in progress"
                                : "Ride accepted"}
                        </h2>

                        <p className="mt-0.5 text-[11px] text-emerald-600">
                            {isOngoing
                                ? "You are currently navigating to the passenger."
                                : "Navigate to the passenger pickup location."}
                        </p>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-5 sm:p-6">

                <PassengerInfo
                    booking={booking}
                />

                <RouteDetails
                    booking={booking}
                />

                <RideMetrics
                    booking={booking}
                    formatDistance={formatDistance}
                    formatDuration={formatDuration}
                    variant="active"
                />

                <LiveLocationStatus
                    status={status}
                    driverLocation={driverLocation}
                    passengerLocation={passengerLocation}
                />

                {/* ACTION ERROR */}
                {actionError && (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
                        {actionError}
                    </div>
                )}

                <RideActions
                    status={status}
                    actionLoading={actionLoading}
                    onStartNavigation={onStartNavigation}
                    onCancelRide={onCancelRide}
                    onCompleteRide={onCompleteRide}
                    onStopLocationSharing={
                        onStopLocationSharing
                    }
                />
            </div>
        </section>
    );
}