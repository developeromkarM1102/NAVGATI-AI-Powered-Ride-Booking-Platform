import { ArrowDownRight, ArrowUpRight, Car, Clock3, IndianRupee, Star } from "lucide-react";
import type { OverviewData } from "../../../types/driver.types";
import { formatCurrency } from "../utils/overview.utils";

interface OverviewStatsProps {
    data: OverviewData;
}

export default function OverviewStats({ data }: OverviewStatsProps) {
    const weeklyChange = Number(data.weeklyChange || 0);
    const isPositive = weeklyChange >= 0;

    return (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {/* TODAY */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
                <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                        <IndianRupee size={18} />
                    </div>

                    {weeklyChange !== 0 && (
                        isPositive ? (
                            <ArrowUpRight size={15} className="text-emerald-400" />
                        ) : (
                            <ArrowDownRight size={15} className="text-red-400" />
                        )
                    )}
                </div>

                <div className="mt-5">
                    <p className="text-[10px] font-medium text-slate-400 sm:text-xs">Todays earnings</p>

                    <p className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                        {formatCurrency(data.todayEarnings)}
                    </p>
                </div>

                <div className="mt-2 flex items-center gap-1.5">
                    {weeklyChange !== 0 && (
                        <span className={`flex items-center gap-0.5 rounded-md px-1.5 py-1 text-[9px] font-bold ${isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                            {isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                            {Math.abs(weeklyChange)}%
                        </span>
                    )}

                    <span className="text-[9px] text-slate-400">vs previous week</span>
                </div>
            </div>

            {/* COMPLETED RIDES */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
                <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500 transition group-hover:bg-blue-500 group-hover:text-white">
                        <Car size={18} />
                    </div>

                    <span className="text-[9px] font-bold text-slate-400">Completed</span>
                </div>

                <div className="mt-5">
                    <p className="text-[10px] font-medium text-slate-400 sm:text-xs">Completed rides</p>

                    <p className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                        {data.completedRides}
                    </p>
                </div>

                <div className="mt-2">
                    <span className="text-[9px] text-slate-400">{data.totalRides} total rides</span>
                </div>
            </div>

            {/* DRIVER STATUS */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
                <div className="flex items-start justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${data.isAvailable ? "bg-emerald-50 text-emerald-500" : "bg-slate-100 text-slate-500"}`}>
                        <Clock3 size={18} />
                    </div>

                    <span className={`rounded-md px-1.5 py-1 text-[9px] font-bold ${data.isAvailable ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                        {data.isAvailable ? "Online" : "Offline"}
                    </span>
                </div>

                <div className="mt-5">
                    <p className="text-[10px] font-medium text-slate-400 sm:text-xs">Driver status</p>

                    <p className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                        {data.isAvailable ? "Online" : "Offline"}
                    </p>
                </div>

                <div className="mt-2">
                    <span className="text-[9px] text-slate-400">Live availability status</span>
                </div>
            </div>

            {/* RATING */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
                <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 text-yellow-500">
                        <Star size={18} fill="currentColor" />
                    </div>

                    <span className="text-[9px] font-bold text-slate-400">Driver rating</span>
                </div>

                <div className="mt-5">
                    <p className="text-[10px] font-medium text-slate-400 sm:text-xs">Rating</p>

                    <p className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                        {data.rating > 0 ? data.rating.toFixed(1) : "N/A"}
                    </p>
                </div>

                <div className="mt-2">
                    <span className="text-[9px] text-slate-400">Based on your driver profile</span>
                </div>
            </div>
        </div>
    );
}