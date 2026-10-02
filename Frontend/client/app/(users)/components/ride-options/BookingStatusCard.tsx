"use client";

import { Clock3, Loader2, XCircle } from "lucide-react";

import type { BookingStatus } from "../../types/ride.types";

interface BookingStatusCardProps {
  status: BookingStatus;
  bookingError: string | null;
  onCancel: () => Promise<void>;
  onClear: () => void;
}

export default function BookingStatusCard({ status, bookingError, onCancel, onClear }: BookingStatusCardProps) {
  return (
    <>
      {status === "requested" && (
        <div className="mb-5 rounded-2xl border border-orange-200 bg-orange-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100">
              <Clock3 size={19} className="text-orange-500" />
            </div>

            <div>
              <p className="text-sm font-bold text-orange-700">Waiting for driver</p>
              <p className="mt-1 text-xs text-orange-600">Your ride request has been sent to the driver.</p>

              <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-orange-500">
                <Loader2 size={12} className="animate-spin" />
                Checking driver response...
              </div>

              <button type="button" onClick={() => void onCancel()} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-50">
                <XCircle size={15} />
                Cancel Ride
              </button>
            </div>
          </div>
        </div>
      )}

      {status === "rejected" && (
        <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <XCircle size={20} className="text-red-600" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-red-700">Ride Declined</p>
              <p className="mt-1 text-xs text-red-600">The driver declined your ride request.</p>

              <button type="button" onClick={onClear} className="mt-3 rounded-lg bg-red-600 px-3 py-2 text-[10px] font-bold text-white transition hover:bg-red-700">
                Find Another Ride
              </button>
            </div>
          </div>
        </div>
      )}

      {status === "cancelled" && (
        <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200">
              <XCircle size={20} className="text-slate-500" />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-700">Ride Cancelled</p>
              <p className="mt-1 text-xs text-slate-500">This booking has been cancelled. Please select another ride.</p>

              <button type="button" onClick={onClear} className="mt-3 rounded-lg bg-orange-500 px-3 py-2 text-[10px] font-bold text-white transition hover:bg-orange-600">
                Find Another Ride
              </button>
            </div>
          </div>
        </div>
      )}

      {bookingError && <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">{bookingError}</div>}
    </>
  );
}