import type { ReactNode } from "react";

interface RideStatProps {
  label: string;
  value: ReactNode;
}

export default function RideStat({ label, value }: RideStatProps) {
  return (
    <div className="rounded-xl bg-slate-50 p-2.5">
      <p className="text-[9px] text-slate-400">{label}</p>
      <p className="mt-1 text-xs font-bold text-slate-800">{value}</p>
    </div>
  );
}