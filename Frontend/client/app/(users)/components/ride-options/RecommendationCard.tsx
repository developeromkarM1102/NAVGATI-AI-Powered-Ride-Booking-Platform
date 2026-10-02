"use client";

import { Car, Loader2, ShieldCheck, Star, Clock3 } from "lucide-react";
import RideStat from "./RideStat";
import RideTag from "./RideTag";
import type { Recommendation } from "../../types/ride.types";

interface RecommendationCardProps {
  recommendation: Recommendation;
  isBooking: boolean;
  isThisBooking: boolean;
  bookingStatus: string | null;
  onBook: (recommendation: Recommendation) => Promise<void>;
  formatFare: (fare?: number) => string;
  formatDistance: (distance?: number) => string;
  formatDuration: (duration?: number) => string;
}

export default function RecommendationCard({ recommendation, isBooking, isThisBooking, bookingStatus, onBook, formatFare, formatDistance, formatDuration }: RecommendationCardProps) {
  const driver = recommendation.driver.driver;
  const vehicle = driver.vehicle;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
            <Car size={20} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-bold text-slate-900">{driver.username}</p>

              {driver.isVerified && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-600">
                  <ShieldCheck size={11} />
                  Verified
                </span>
              )}
            </div>

            <p className="mt-0.5 text-[11px] text-slate-500">{vehicle.brand} {vehicle.model} · {vehicle.color}</p>
            <p className="mt-1 text-[10px] text-slate-400">{vehicle.registrationNumber}</p>
          </div>
        </div>

        <div className="sm:text-right">
          <p className="text-lg font-extrabold text-slate-900">{formatFare(recommendation.fare)}</p>
          <p className="text-[10px] text-slate-400">Estimated fare</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 sm:grid-cols-4">
        <RideStat label="ETA" value={`${recommendation.eta} min`} />

        <RideStat label="Rating" value={<span className="flex items-center gap-1"><Star size={12} className="fill-current text-amber-500" />{driver.rating}</span>} />

        <RideStat label="Safety" value={<span className="flex items-center gap-1"><ShieldCheck size={12} className="text-emerald-500" />{driver.safetyScore}/5</span>} />

        <RideStat label="Rides" value={driver.totalRides} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <RideTag text={vehicle.type} />
        <RideTag text={`${vehicle.seats} seats`} />
        <RideTag text={formatDistance(recommendation.driver.distance)} />
        <RideTag text={formatDuration(recommendation.driver.duration)} />
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <button type="button" onClick={() => void onBook(recommendation)} disabled={isBooking || bookingStatus === "requested"} className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-xs font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70">
          {isBooking ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Booking...
            </>
          ) : bookingStatus === "requested" && isThisBooking ? (
            <>
              <Clock3 size={15} />
              Waiting for Driver
            </>
          ) : (
            "Book Ride"
          )}
        </button>
      </div>
    </div>
  );
}