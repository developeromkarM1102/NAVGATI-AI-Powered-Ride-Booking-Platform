import { AlertCircle, Loader2 } from "lucide-react";

interface EarningsStateProps {
    type: "loading" | "error";
    error?: string;
}

export default function EarningsState({ type, error }: EarningsStateProps) {
    if (type === "loading") {
        return (
            <section className="flex min-h-[400px] items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 size={28} className="animate-spin text-orange-500" />
                    <p className="text-sm font-medium text-slate-500">Loading your earnings...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="flex min-h-[400px] items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-500">
                    <AlertCircle size={20} />
                </div>

                <p className="mt-3 text-sm font-bold text-red-600">Unable to load earnings</p>

                <p className="mt-1 text-xs leading-relaxed text-red-500">{error}</p>
            </div>
        </section>
    );
}