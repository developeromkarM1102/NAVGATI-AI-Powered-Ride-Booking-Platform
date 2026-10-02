import { ArrowUpRight, Car, Clock3, Download, Route } from "lucide-react";
import type { RecentRide } from "../../../types/driver.types";
import { formatCurrency, formatDistance, formatTime } from "../utils/earnings.utils";

interface RideHistoryProps {
    rides: RecentRide[];
    onExport: () => void;
}


export default function RideHistory({ rides, onExport }: RideHistoryProps) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* HEADER */}
            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
                <div>
                    <h3 className="text-sm font-bold text-slate-900">
                        Recent rides
                    </h3>

                    <p className="mt-1 text-[10px] text-slate-400">
                        Your latest completed trips
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onExport}
                    disabled={!rides.length}
                    className="flex w-fit items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-semibold text-slate-500 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <Download size={13} />
                    Export
                </button>
            </div>

            {/* EMPTY STATE */}
            {rides.length === 0 && (
                <div className="flex min-h-[220px] items-center justify-center px-5 text-center">
                    <div>
                        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                            <Car size={20} />
                        </div>

                        <p className="mt-3 text-sm font-semibold text-slate-700">
                            No completed rides yet
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Your completed rides will appear here.
                        </p>
                    </div>
                </div>
            )}

            {/* DESKTOP TABLE */}
            {rides.length > 0 && (
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/70">
                                <th className="px-5 py-3 text-left text-[9px] font-bold uppercase tracking-wide text-slate-400">
                                    Ride
                                </th>

                                <th className="px-5 py-3 text-left text-[9px] font-bold uppercase tracking-wide text-slate-400">
                                    Route
                                </th>

                                <th className="px-5 py-3 text-left text-[9px] font-bold uppercase tracking-wide text-slate-400">
                                    Distance
                                </th>

                                <th className="px-5 py-3 text-left text-[9px] font-bold uppercase tracking-wide text-slate-400">
                                    Time
                                </th>

                                <th className="px-5 py-3 text-right text-[9px] font-bold uppercase tracking-wide text-slate-400">
                                    Earnings
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {rides.map((ride) => (
                                <tr
                                    key={ride.id}
                                    className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50/70"
                                >
                                    {/* RIDE */}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                                                <Car size={15} />
                                            </div>

                                            <div>
                                                <p className="text-xs font-bold text-slate-800">
                                                    {ride.name ||
                                                        ride.passenger ||
                                                        "Passenger"}

                                                        
                                                </p>

                                                <p className="mt-0.5 text-[9px] text-slate-400">
                                                    #{String(ride.id).slice(-6)}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* ROUTE */}
                                    <td className="max-w-[250px] px-5 py-4">
                                        <p className="truncate text-[10px] font-semibold text-slate-700">
                                            {ride.pickup}
                                        </p>

                                        <p className="mt-1 truncate text-[10px] text-slate-400">
                                            → {ride.destination}
                                        </p>
                                    </td>

                                    {/* DISTANCE */}
                                    <td className="px-5 py-4">
                                        <p className="text-[10px] font-semibold text-slate-700">
                                            {formatDistance(ride.distance)}
                                        </p>
                                    </td>

                                    {/* TIME */}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <Clock3
                                                size={13}
                                                className="text-slate-400"
                                            />

                                            <span className="text-[10px] text-slate-500">
                                                {formatTime(ride.time)}
                                            </span>
                                        </div>
                                    </td>

                                    {/* EARNINGS */}
                                    <td className="px-5 py-4 text-right">
                                        <p className="text-xs font-extrabold text-slate-900">
                                            {formatCurrency(ride.fare)}
                                        </p>

                                        <span className="text-[9px] font-semibold capitalize text-emerald-500">
                                            {ride.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* MOBILE CARDS */}
            {rides.length > 0 && (
                <div className="divide-y divide-slate-100 md:hidden">
                    {rides.map((ride) => (
                        <div key={ride.id} className="p-4">
                            <div className="flex items-start gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                                    <Car size={15} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-xs font-bold text-slate-800">
                                                {ride.name ||
                                                    ride.passenger ||
                                                    "Passenger"}
                                            </p>

                                            <p className="mt-0.5 text-[9px] text-slate-400">
                                                #{String(ride.id).slice(-6)} ·{" "}
                                                {formatTime(ride.time)}
                                            </p>
                                        </div>

                                        <p className="text-sm font-extrabold text-slate-900">
                                            {formatCurrency(ride.fare)}
                                        </p>
                                    </div>

                                    <div className="mt-3">
                                        <p className="truncate text-[10px] font-semibold text-slate-700">
                                            {ride.pickup}
                                        </p>

                                        <p className="mt-1 truncate text-[10px] text-slate-400">
                                            → {ride.destination}
                                        </p>
                                    </div>

                                    <div className="mt-3 flex items-center gap-4">
                                        <span className="flex items-center gap-1 text-[9px] text-slate-400">
                                            <Route size={11} />
                                            {formatDistance(ride.distance)}
                                        </span>

                                        <span className="flex items-center gap-1 text-[9px] text-emerald-500">
                                            <ArrowUpRight size={11} />
                                            {ride.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

