"use client";

import { Sparkles } from "lucide-react";

export default function AIRecommendation() {
  return (
    <div className="mt-5 rounded-2xl border border-orange-100 bg-linear-to-r from-orange-50 to-amber-50 p-4">

      <div className="flex items-start gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
          <Sparkles size={17} />
        </div>

        <div>
          <p className="text-xs font-bold text-slate-800">
            NavGati found your best ride
          </p>

          <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
            Recommendations are based on your route, fare,
            driver availability, ETA, safety and preferences.
          </p>
        </div>

      </div>

    </div>
  );
}