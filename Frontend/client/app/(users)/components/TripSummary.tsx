"use client";

import { ArrowRight, Car, Clock3, Luggage, MapPin, Navigation, Users } from "lucide-react";
import { Requirements, RouteData } from "../types/ride.types";

interface TripSummaryProps {
  requirements: Requirements;
  route: RouteData;
}

export default function TripSummary({
  requirements,
  route,
}: TripSummaryProps) {

  const formatDistance = (meters: number) => {
    return `${(meters / 1000).toFixed(1)} km`;
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.round(seconds / 60);

    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;

    return remaining
      ? `${hours} hr ${remaining} min`
      : `${hours} hr`;
  };

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

      {/* Route */}

      <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">

        <Location
          icon={<MapPin size={18} />}
          title="Pickup"
          value={requirements.pickup}
          orange
        />

        <div className="hidden h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 lg:flex">
          <ArrowRight size={16} />
        </div>

        <Location
          icon={<Navigation size={18} />}
          title="Destination"
          value={requirements.destination}
        />

      </div>

      {/* Details */}

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-200 pt-5 sm:grid-cols-4">

        <Detail
          icon={<Clock3 size={15} />}
          label="Time"
          value={`${requirements.date} · ${requirements.time}`}
        />

        <Detail
          icon={<Users size={15} />}
          label="Passengers"
          value={requirements.passengers}
        />

        <Detail
          icon={<Luggage size={15} />}
          label="Luggage"
          value={
            requirements.luggage
              ? "Required"
              : "No luggage"
          }
        />

        <Detail
          icon={<Car size={15} />}
          label="Ride"
          value={requirements.rideType}
        />

      </div>

      {/* Route info */}

      <div className="mt-3 grid grid-cols-2 gap-3">

        <div className="rounded-xl bg-white p-3">
          <p className="text-[10px] text-slate-400">
            Distance
          </p>

          <p className="mt-1 text-xs font-bold text-slate-800">
            {formatDistance(route.distance)}
          </p>
        </div>

        <div className="rounded-xl bg-white p-3">
          <p className="text-[10px] text-slate-400">
            Journey duration
          </p>

          <p className="mt-1 text-xs font-bold text-slate-800">
            {formatDuration(route.duration)}
          </p>
        </div>

      </div>

      {/* Preferences */}

      {requirements.preferences.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">

          <span className="text-[10px] font-semibold text-slate-400">
            Preferences:
          </span>

          {requirements.preferences.map((preference) => (
            <span
              key={preference}
              className="rounded-full bg-orange-50 px-3 py-1 text-[10px] font-semibold capitalize text-orange-600"
            >
              {preference}
            </span>
          ))}

        </div>
      )}

    </div>
  );
}

function Location({
  icon,
  title,
  value,
  orange = false,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  orange?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">

      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          orange
            ? "bg-orange-50 text-orange-500"
            : "bg-emerald-50 text-emerald-500"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[10px] font-medium text-slate-400">
          {title}
        </p>

        <p className="truncate text-sm font-bold text-slate-800">
          {value}
        </p>

      </div>

    </div>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white p-3">

      <div className="flex items-center gap-2 text-orange-500">
        {icon}

        <span className="text-[10px] text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-2 text-xs font-bold capitalize text-slate-800">
        {value}
      </p>

    </div>
  );
}