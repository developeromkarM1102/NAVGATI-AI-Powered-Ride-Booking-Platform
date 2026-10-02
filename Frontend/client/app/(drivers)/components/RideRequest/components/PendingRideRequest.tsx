"use client";

import { CheckCircle2, Clock3, Loader2, ShieldCheck, Sparkles, X } from "lucide-react";
import type { Booking } from "../../../types/driver.types";

import PassengerInfo from "./PassengerInfo";
import RouteDetails from "./RouteDetails";
import RideMetrics from "./RideMetrics";

interface PendingRideRequestProps {
    booking: Booking;

    actionLoading: boolean;
    actionError: string;

    onAccept: () => void;
    onReject: () => void;

    formatDistance: (distance: number) => string;
    formatDuration: (duration: number) => string;
}

export default function PendingRideRequest({
    booking,
    actionLoading,
    actionError,
    onAccept,
    onReject,
    formatDistance,
    formatDuration,
}: PendingRideRequestProps) {
    return (
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            {/* HEADER */}
            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">

                <div className="flex items-center gap-3">

                    <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                        <Sparkles size={20} />

                        <span className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-orange-500 ring-2 ring-white" />
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-lg font-bold text-slate-900">
                                New Ride Request
                            </h2>

                            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-orange-600">
                                AI Matched
                            </span>
                        </div>

                        <p className="mt-1 text-[11px] text-slate-500">
                            NavGati found a ride request for you.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2">
                    <Clock3
                        size={15}
                        className="text-orange-500"
                    />

                    <span className="text-[11px] font-bold text-orange-600">
                        New request
                    </span>
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-5 sm:p-6">

                <PassengerInfo
                    booking={booking}
                    showVerification
                />

                <RouteDetails
                    booking={booking}
                />

                <RideMetrics
                    booking={booking}
                    formatDistance={formatDistance}
                    formatDuration={formatDuration}
                    variant="pending"
                />

                {/* REQUEST DETAILS */}
                <div className="mt-5 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 p-4">
                    <div className="flex items-start gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
                            <Sparkles size={17} />
                        </div>

                        <div>
                            <p className="text-xs font-bold text-slate-800">
                                Ride request details
                            </p>

                            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                                {booking.rideType
                                    ? `${booking.rideType} ride · ${booking.passengers} passenger${booking.passengers !== 1 ? "s" : ""} · ${booking.luggage} luggage bag${booking.luggage !== 1 ? "s" : ""}.`
                                    : "Review the ride details before accepting."}
                            </p>
                        </div>

                    </div>
                </div>

                {/* PASSENGER INFORMATION */}
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-500">
                        <ShieldCheck size={17} />
                    </div>

                    <div>
                        <p className="text-xs font-bold text-emerald-800">
                            Passenger information available
                        </p>

                        <p className="mt-0.5 text-[10px] text-emerald-600">
                            Review the passenger details before accepting.
                        </p>
                    </div>

                </div>

                {/* ERROR */}
                {actionError && (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
                        {actionError}
                    </div>
                )}

                {/* ACTIONS */}
                <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row">

                    {/* DECLINE */}
                    <button
                        type="button"
                        onClick={onReject}
                        disabled={actionLoading}
                        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {actionLoading ? (
                            <Loader2
                                size={17}
                                className="animate-spin"
                            />
                        ) : (
                            <X size={17} />
                        )}

                        Decline
                    </button>

                    {/* ACCEPT */}
                    <button
                        type="button"
                        onClick={onAccept}
                        disabled={actionLoading}
                        className="flex h-12 flex-[2] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:from-orange-600 hover:to-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {actionLoading ? (
                            <>
                                <Loader2
                                    size={17}
                                    className="animate-spin"
                                />

                                Processing...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 size={17} />

                                Accept Ride
                            </>
                        )}
                    </button>

                </div>
            </div>
        </section>
    );
}