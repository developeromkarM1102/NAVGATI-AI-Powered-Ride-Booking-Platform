"use client";

import {
    CheckCircle2,
    Loader2,
    Navigation,
    X,
} from "lucide-react";

interface RideActionsProps {
    status: "accepted" | "ongoing";
    actionLoading: boolean;

    onStartNavigation: () => void;
    onCancelRide: () => void;
    onCompleteRide: () => void;
    onStopLocationSharing: () => void;
}

export default function RideActions({
    status,
    actionLoading,
    onStartNavigation,
    onCancelRide,
    onCompleteRide,
    onStopLocationSharing,
}: RideActionsProps) {
    return (
        <>
            <div className="mt-5 flex w-full flex-col gap-3 sm:flex-row">

                {status === "accepted" && (
                    <>
                        {/* START NAVIGATION */}
                        <button
                            type="button"
                            onClick={onStartNavigation}
                            disabled={actionLoading}
                            className="flex h-12 w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-emerald-600 sm:flex-1"
                        >
                            {actionLoading ? (
                                <Loader2
                                    size={17}
                                    className="shrink-0 animate-spin"
                                />
                            ) : (
                                <Navigation
                                    size={17}
                                    className="shrink-0"
                                />
                            )}

                            <span className="truncate">
                                {actionLoading
                                    ? "Starting Ride..."
                                    : "Start Navigation"}
                            </span>
                        </button>

                        {/* CANCEL RIDE */}
                        <button
                            type="button"
                            onClick={onCancelRide}
                            disabled={actionLoading}
                            className="flex h-12 w-full min-w-0 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-bold text-red-600 transition hover:border-red-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1"
                        >
                            {actionLoading ? (
                                <Loader2
                                    size={17}
                                    className="shrink-0 animate-spin"
                                />
                            ) : (
                                <X
                                    size={17}
                                    className="shrink-0"
                                />
                            )}

                            <span className="truncate">
                                {actionLoading
                                    ? "Cancelling..."
                                    : "Cancel Ride"}
                            </span>
                        </button>
                    </>
                )}

                {status === "ongoing" && (
                    <button
                        type="button"
                        onClick={onCompleteRide}
                        disabled={actionLoading}
                        className="flex h-12 w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1"
                    >
                        {actionLoading ? (
                            <Loader2
                                size={17}
                                className="animate-spin"
                            />
                        ) : (
                            <CheckCircle2 size={17} />
                        )}

                        <span className="truncate">
                            {actionLoading
                                ? "Completing..."
                                : "Complete Ride"}
                        </span>
                    </button>
                )}
            </div>

            {status === "ongoing" && (
                <button
                    type="button"
                    onClick={onStopLocationSharing}
                    className="mt-3 w-full rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-slate-50"
                >
                    Stop Location Sharing
                </button>
            )}
        </>
    );
}