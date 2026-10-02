import { Car, IndianRupee, TrendingUp } from "lucide-react";
import type { OverviewData } from "../../../types/driver.types";
import { formatCurrency } from "../utils/overview.utils";

interface OverviewPerformanceProps {
    data: OverviewData;
}

export default function OverviewPerformance({ data }: OverviewPerformanceProps) {
    const acceptanceRate = Math.min(Math.max(Number(data.acceptanceRate || 0), 0), 100);

    const acceptanceLabel = acceptanceRate >= 80
        ? "Strong"
        : acceptanceRate >= 50
            ? "Moderate"
            : "Low";

    const acceptanceColor = acceptanceRate >= 80
        ? "text-emerald-600"
        : acceptanceRate >= 50
            ? "text-orange-500"
            : "text-red-500";

    return (
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
            {/* WEEKLY EARNINGS */}
            <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-5 text-white sm:p-6">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/10" />

                <div className="pointer-events-none absolute -bottom-20 right-24 h-48 w-48 rounded-full bg-orange-400/5" />

                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-medium text-slate-400">Earnings this week</p>

                            <div className="mt-2 flex items-baseline gap-1">
                                <IndianRupee size={20} />

                                <span className="text-3xl font-extrabold tracking-tight">
                                    {data.weeklyEarnings.toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-orange-400">
                            <TrendingUp size={19} />
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400">Completed rides this week</span>

                            <span className="text-[10px] font-bold text-white">{data.completedRides}</span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-orange-500 transition-all duration-500" style={{ width: data.completedRides > 0 ? "100%" : "0%" }} />
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <p className="text-[10px] text-slate-400">Average per ride</p>

                            <p className="text-[10px] font-bold text-white">
                                {formatCurrency(data.averagePerRide)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ACCEPTANCE RATE */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-medium text-slate-400">Acceptance rate</p>

                        <p className="mt-1 text-2xl font-extrabold text-slate-900">
                            {acceptanceRate}%
                        </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                        <Car size={18} />
                    </div>
                </div>

                <div className="mt-5">
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${acceptanceRate}%` }} />
                    </div>

                    <div className="mt-3 flex justify-between">
                        <span className="text-[10px] text-slate-400">Booking acceptance</span>

                        <span className={`text-[10px] font-bold ${acceptanceColor}`}>
                            {acceptanceLabel}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}