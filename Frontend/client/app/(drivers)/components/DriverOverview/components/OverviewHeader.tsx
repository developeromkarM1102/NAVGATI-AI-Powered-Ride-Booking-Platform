import type { OverviewData } from "../../../types/driver.types";

interface OverviewHeaderProps {
    data: OverviewData;
    updatingStatus: boolean;
    onToggleAvailability: () => void;
}

export default function OverviewHeader({ data, updatingStatus, onToggleAvailability }: OverviewHeaderProps) {
    return (
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
                <p className="text-xs font-medium text-slate-400">Your driving summary</p>

                <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                    Todays Overview
                </h2>
            </div>

            <div className="flex items-center gap-2">
                <div className={`flex items-center gap-2 rounded-xl px-3 py-2 ${data.isAvailable ? "bg-emerald-50" : "bg-slate-100"}`}>
                    <span className={`h-2 w-2 rounded-full ${data.isAvailable ? "bg-emerald-500" : "bg-slate-400"}`} />

                    <span className={`text-[11px] font-semibold ${data.isAvailable ? "text-emerald-600" : "text-slate-500"}`}>
                        {data.isAvailable ? "You're online" : "You're offline"}
                    </span>
                </div>

                <button type="button" onClick={onToggleAvailability} disabled={updatingStatus} className={`rounded-xl px-3 py-2 text-[11px] font-bold transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 ${data.isAvailable ? "bg-red-50 text-red-500 hover:bg-red-100" : "bg-emerald-500 text-white shadow-sm shadow-emerald-200 hover:bg-emerald-600"}`}>
                    {updatingStatus ? "Updating..." : data.isAvailable ? "Go Offline" : "Go Online"}
                </button>
            </div>
        </div>
    );
}