import {
    ArrowDownRight,
    ArrowUpRight,
    Car,
    TrendingUp,
} from "lucide-react";

import type {
    EarningsSummary,
    WeeklyChartItem,
} from "../../../types/driver.types";

import { formatCurrency } from "../utils/earnings.utils";

interface WeeklyAnalyticsProps {
    summary: EarningsSummary;
    weeklyChart: WeeklyChartItem[];
}

export default function WeeklyAnalytics({ summary, weeklyChart }: WeeklyAnalyticsProps) {
    const weeklyChange = Number(summary.weeklyChange || 0);
    const isPositive = weeklyChange >= 0;

    const maxWeeklyEarning = Math.max(
        ...weeklyChart.map((item) => Number(item.earnings || 0)),
        1
    );

    return (
        <div className="grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
            {/* WEEKLY PERFORMANCE */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-medium text-slate-400">Weekly performance</p>

                        <div className="mt-1 flex items-baseline gap-2">
                            <h3 className="text-2xl font-extrabold text-slate-900">
                                {formatCurrency(summary.weeklyEarnings)}
                            </h3>

                            {weeklyChange !== 0 && (
                                <span className={`flex items-center gap-1 text-[10px] font-bold ${isPositive ? "text-emerald-600" : "text-red-500"}`}>
                                    {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                    {Math.abs(weeklyChange)}%
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                        <TrendingUp size={17} />
                    </div>
                </div>

                {/* WEEKLY CHART */}
                <div className="mt-7 flex h-36 items-end gap-2 sm:gap-4">
                    {weeklyChart.map((item) => {
                        const value = Number(item.earnings || 0);

                        const height = value > 0
                            ? Math.max((value / maxWeeklyEarning) * 100, 8)
                            : 3;

                        return (
                            <div key={item.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                                <div className="relative flex w-full flex-1 items-end justify-center">
                                    {value > 0 && (
                                        <span className="absolute -top-5 whitespace-nowrap text-[8px] font-semibold text-slate-400">
                                            {formatCurrency(value)}
                                        </span>
                                    )}

                                    <div className="w-full max-w-[42px] rounded-t-lg bg-orange-100 transition-all duration-300 hover:bg-orange-300" style={{ height: `${height}%` }} title={`${item.day}: ${formatCurrency(value)}`} />
                                </div>

                                <span className="text-[9px] font-medium text-slate-400">{item.day}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* WEEKLY SUMMARY */}
            <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-sm sm:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-medium text-slate-400">This week</p>

                        <p className="mt-2 text-2xl font-extrabold">
                            {formatCurrency(summary.weeklyEarnings)}
                        </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-orange-400">
                        <TrendingUp size={18} />
                    </div>
                </div>

                <div className="mt-7">
                    <div className="flex justify-between text-[10px]">
                        <span className="text-slate-400">Completed rides</span>
                        <span className="font-bold text-white">{summary.completedRides}</span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-orange-500 transition-all duration-500" style={{ width: summary.completedRides > 0 ? "100%" : "0%" }} />
                    </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                        <Car size={14} />
                    </div>

                    <p className="text-[10px] leading-relaxed text-slate-400">
                        {summary.completedRides > 0
                            ? `You've completed ${summary.completedRides} ride${summary.completedRides === 1 ? "" : "s"} this week.`
                            : "No completed rides this week yet."}
                    </p>
                </div>
            </div>
        </div>
    );
}