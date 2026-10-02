import { Loader2 } from "lucide-react";

export default function RideRequestLoading() {
    return (
        <section className="flex min-h-[250px] items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                <Loader2
                    size={18}
                    className="animate-spin"
                />

                Loading ride...
            </div>
        </section>
    );
}