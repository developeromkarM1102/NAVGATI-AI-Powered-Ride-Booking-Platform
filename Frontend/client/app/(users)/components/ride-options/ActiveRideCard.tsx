"use client";

import { Car, CheckCircle2, Clock3, MapPin, Navigation, ShieldCheck, Star, XCircle } from "lucide-react";
import RideStat from "./RideStat";
import type { ActiveRideCardProps } from "../../types/ride-options.types";

export default function ActiveRideCard({
    bookingStatus,
    activeBooking,
    acceptedDriver,
    pickup,
    destination,
    rideType,
    driverLocation,
    passengerLocation,
    formatFare,
    formatDistance,
    formatDuration,
    onCancel,
}: ActiveRideCardProps) {
    if (
        !activeBooking ||
        bookingStatus === "completed" ||
        bookingStatus === "cancelled" ||
        bookingStatus === "rejected"
    ) {
        return null;
    }

    const rideInProgress = bookingStatus === "ongoing";

    return (
        <section className="overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-sm">
            <div className="border-b border-emerald-100 bg-emerald-50 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white">
                        {rideInProgress ? (
                            <Navigation size={21} />
                        ) : (
                            <CheckCircle2 size={21} />
                        )}
                    </div>

                    <div>
                        <h2 className="text-sm font-bold text-emerald-800">
                            {rideInProgress
                                ? "Ride In Progress"
                                : "Ride Accepted"}
                        </h2>

                        <p className="mt-0.5 text-[11px] text-emerald-600">
                            {rideInProgress
                                ? "Your ride is currently in progress."
                                : "Your driver has accepted your ride request."}
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                        <Car size={22} />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-bold text-slate-900">
                                {acceptedDriver?.username ||
                                    acceptedDriver?.name ||
                                    "Your Driver"}
                            </h3>

                            {acceptedDriver?.isVerified && (
                                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-600">
                                    <ShieldCheck size={11} />
                                    Verified
                                </span>
                            )}
                        </div>

                        {acceptedDriver?.vehicle && (
                            <p className="mt-1 text-[11px] text-slate-500">
                                {acceptedDriver.vehicle.brand}{" "}
                                {acceptedDriver.vehicle.model} ·{" "}
                                {acceptedDriver.vehicle.color}
                            </p>
                        )}

                        {acceptedDriver?.vehicle?.registrationNumber && (
                            <p className="mt-1 text-[10px] text-slate-400">
                                {acceptedDriver.vehicle.registrationNumber}
                            </p>
                        )}

                        {acceptedDriver?.rating !== undefined && (
                            <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-slate-500">
                                <Star
                                    size={11}
                                    className="fill-amber-400 text-amber-400"
                                />
                                {acceptedDriver.rating}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                                <MapPin size={17} />
                            </div>

                            <div className="h-10 border-l border-dashed border-slate-300" />

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                                <Navigation size={17} />
                            </div>
                        </div>

                        <div className="min-w-0 flex-1">
                            <div>
                                <p className="text-[9px] font-medium uppercase tracking-wide text-slate-400">
                                    Pickup
                                </p>

                                <p className="mt-1 break-words text-sm font-bold text-slate-800">
                                    {activeBooking.pickup?.address || pickup}
                                </p>
                            </div>

                            <div className="mt-5">
                                <p className="text-[9px] font-medium uppercase tracking-wide text-slate-400">
                                    Destination
                                </p>

                                <p className="mt-1 break-words text-sm font-bold text-slate-800">
                                    {activeBooking.destination?.address ||
                                        destination}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <RideStat
                        label="Fare"
                        value={formatFare(activeBooking.fare)}
                    />

                    <RideStat
                        label="Distance"
                        value={formatDistance(activeBooking.distance)}
                    />

                    <RideStat
                        label="ETA"
                        value={formatDuration(
                            activeBooking.estimatedDuration
                        )}
                    />

                    <RideStat
                        label="Ride Type"
                        value={
                            activeBooking.rideType ||
                            rideType ||
                            "Ride"
                        }
                    />
                </div>

                <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-500">
                            <Navigation size={17} />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-blue-800">
                                {driverLocation
                                    ? "Driver location is live"
                                    : "Waiting for driver location"}
                            </p>

                            <p className="mt-0.5 text-[10px] text-blue-600">
                                Driver and passenger locations are shared
                                in real time.
                            </p>
                        </div>

                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                        <div className="rounded-lg bg-white px-3 py-2">
                            <p className="text-slate-400">Driver</p>
                            <p className="font-bold text-slate-700">
                                {driverLocation ? "Live" : "Waiting..."}
                            </p>
                        </div>

                        <div className="rounded-lg bg-white px-3 py-2">
                            <p className="text-slate-400">Your location</p>
                            <p className="font-bold text-slate-700">
                                {passengerLocation ? "Live" : "Waiting..."}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-orange-500">
                            <MapPin size={17} />
                        </div>

                        <div>
                            <p className="text-xs font-bold text-slate-800">
                                Live map tracking
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-500">
                                Driver and passenger locations are visible
                                on the dashboard map.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4">
                    <button
                        type="button"
                        onClick={() => void onCancel()}
                        disabled={rideInProgress}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <XCircle size={16} />

                        {rideInProgress
                            ? "Ride In Progress"
                            : "Cancel Ride"}
                    </button>
                </div>
            </div>
        </section>
    );
}