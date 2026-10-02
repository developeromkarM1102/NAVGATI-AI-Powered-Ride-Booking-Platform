import { Loader2 } from "lucide-react";

interface OverviewStateProps {
    type: "loading" | "error";
    error?: string;
}

export default function OverviewState({ type, error }: OverviewStateProps) {
    if (type === "loading") {
        return (
            <section className="flex min-h-[300px] items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 size={28} className="animate-spin text-orange-500" />
                    <p className="text-sm font-medium text-slate-500">Loading your overview...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="flex min-h-[300px] items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
                <p className="text-sm font-bold text-red-600">Unable to load overview</p>
                <p className="mt-1 text-xs leading-relaxed text-red-500">{error}</p>
            </div>
        </section>
    );
}