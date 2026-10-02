"use client";

import { Navigation } from "lucide-react";

import type {
    DriverLocation,
    PassengerLocation,
    RideStatus,
} from "../../../types/driver.types";

interface LiveLocationStatusProps {
    status: RideStatus;
    driverLocation: DriverLocation | null;
    passengerLocation: PassengerLocation | null;
}

export default function LiveLocationStatus({
    status,
    driverLocation,
    passengerLocation,
}: LiveLocationStatusProps) {
    const isOngoing = status === "ongoing";

    return (
        <>
            <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-500">
                        <Navigation size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-blue-800">
                            {isOngoing
                                ? "Ride is in progress"
                                : "Live location sharing active"}
                        </p>

                        <p className="mt-0.5 text-[10px] text-blue-600">
                            Driver and passenger locations are
                            shared in real time.
                        </p>
                    </div>

                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                    <div className="rounded-lg bg-white px-3 py-2">
                        <p className="text-slate-400">
                            Your location
                        </p>

                        <p className="font-bold text-slate-700">
                            {driverLocation
                                ? "Live"
                                : "Waiting..."}
                        </p>
                    </div>

                    <div className="rounded-lg bg-white px-3 py-2">
                        <p className="text-slate-400">
                            Passenger
                        </p>

                        <p className="font-bold text-slate-700">
                            {passengerLocation
                                ? "Live"
                                : "Waiting..."}
                        </p>
                    </div>
                </div>
            </div>

            {(driverLocation || passengerLocation) && (
                <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-[10px] text-slate-500">
                    {passengerLocation && (
                        <p>
                            Passenger:{" "}
                            {passengerLocation.latitude.toFixed(5)}
                            ,{" "}
                            {passengerLocation.longitude.toFixed(5)}
                        </p>
                    )}

                    {driverLocation && (
                        <p className="mt-1">
                            Driver:{" "}
                            {driverLocation.latitude.toFixed(5)}
                            ,{" "}
                            {driverLocation.longitude.toFixed(5)}
                        </p>
                    )}
                </div>
            )}
        </>
    );
}