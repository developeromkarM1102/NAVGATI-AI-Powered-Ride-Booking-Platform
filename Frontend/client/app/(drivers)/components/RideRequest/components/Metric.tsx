import type { ReactNode } from "react";

interface MetricProps {
    icon: ReactNode;
    label: string;
    value: string;
}

export default function Metric({
    icon,
    label,
    value,
}: MetricProps) {
    return (
        <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                {icon}
            </div>

            <p className="mt-3 text-[9px] text-slate-400">
                {label}
            </p>

            <p className="mt-1 break-words text-xs font-extrabold text-slate-900">
                {value}
            </p>
        </div>
    );
}