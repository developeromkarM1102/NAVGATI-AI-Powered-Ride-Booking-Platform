"use client";

import { Phone, MessageCircle, ShieldCheck, Star, UserRound } from "lucide-react";
import type { Booking } from "../../../types/driver.types";

interface PassengerInfoProps {
    booking: Booking;
    showVerification?: boolean;
}

export default function PassengerInfo({
    booking,
    showVerification = false,
}: PassengerInfoProps) {
    const passenger = booking.passenger;

    const passengerName =
        passenger?.username || "Passenger";

    return (
        <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <UserRound size={21} />
            </div>

            {/* Passenger Details */}
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-bold text-slate-900">
                        {passengerName}
                    </h3>

                    {showVerification &&
                        passenger?.isVerified && (
                            <span className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-600">
                                <ShieldCheck size={11} />
                                Verified
                            </span>
                        )}
                </div>

                {passenger?.rating !== undefined && (
                    <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-slate-500">
                        <Star
                            size={11}
                            className="fill-amber-400 text-amber-400"
                        />

                        {passenger.rating}

                        {passenger?.totalRides !== undefined && (
                            <>
                                <span className="mx-1 text-slate-300">
                                    •
                                </span>

                                <span className="text-slate-400">
                                    {passenger.totalRides} trips
                                </span>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Contact Buttons */}
            {passenger?.phone && (
                <div className="flex shrink-0 gap-2">
                    <a
                        href={`tel:${passenger.phone}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-orange-50 hover:text-orange-500"
                        aria-label="Call passenger"
                    >
                        <Phone size={15} />
                    </a>

                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-orange-50 hover:text-orange-500"
                        aria-label="Message passenger"
                    >
                        <MessageCircle size={15} />
                    </button>
                </div>
            )}
        </div>
    );
}