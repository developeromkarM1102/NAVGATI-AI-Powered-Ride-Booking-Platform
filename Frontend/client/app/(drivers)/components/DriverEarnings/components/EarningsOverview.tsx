import { ArrowDownRight, ArrowUpRight, CalendarDays, Car, ChevronRight, IndianRupee, Route, TrendingUp } from "lucide-react";
import type { EarningsSummary } from "../../../types/driver.types";
import { formatCurrency } from "../utils/earnings.utils";

interface EarningsOverviewProps {
    summary: EarningsSummary;
}

export default function EarningsOverview({ summary }: EarningsOverviewProps) {
    const weeklyChange = Number(summary.weeklyChange || 0);
    const isPositive = weeklyChange >= 0;

    return (
        <>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <p className="text-xs font-medium text-slate-400">Track your income</p>

                    <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                        Earnings & History
                    </h2>

                    <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-500">
                        Monitor your earnings, completed rides and driving performance.
                    </p>
                </div>

                <button type="button" className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500">
                    <CalendarDays size={15} />
                    This week
                    <ChevronRight size={14} />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {/* TODAY */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                            <IndianRupee size={18} />
                        </div>

                        {weeklyChange !== 0 && (
                            <span className={`flex items-center gap-0.5 text-[10px] font-bold ${isPositive ? "text-emerald-600" : "text-red-500"}`}>
                                {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {Math.abs(weeklyChange)}%
                            </span>
                        )}
                    </div>

                    <p className="mt-5 text-[10px] font-medium text-slate-400">Todays earnings</p>

                    <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                        {formatCurrency(summary.todayEarnings)}
                    </p>
                </div>

                {/* WEEKLY */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                            <TrendingUp size={18} />
                        </div>

                        {weeklyChange !== 0 && (
                            <span className={`flex items-center gap-0.5 text-[10px] font-bold ${isPositive ? "text-emerald-600" : "text-red-500"}`}>
                                {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {Math.abs(weeklyChange)}%
                            </span>
                        )}
                    </div>

                    <p className="mt-5 text-[10px] font-medium text-slate-400">This week</p>

                    <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                        {formatCurrency(summary.weeklyEarnings)}
                    </p>
                </div>

                {/* COMPLETED RIDES */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                            <Car size={18} />
                        </div>

                        <span className="text-[10px] font-bold text-slate-400">Completed</span>
                    </div>

                    <p className="mt-5 text-[10px] font-medium text-slate-400">Completed rides</p>

                    <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                        {summary.completedRides}
                    </p>
                </div>

                {/* AVERAGE */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-500">
                            <Route size={18} />
                        </div>

                        <span className="text-[10px] font-bold text-slate-400">Per ride</span>
                    </div>

                    <p className="mt-5 text-[10px] font-medium text-slate-400">Avg. per ride</p>

                    <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                        {formatCurrency(summary.averagePerRide)}
                    </p>
                </div>
            </div>
        </>
    );
}