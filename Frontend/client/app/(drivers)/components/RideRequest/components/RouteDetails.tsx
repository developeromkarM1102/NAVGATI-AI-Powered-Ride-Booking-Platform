import { MapPin,Navigation } from "lucide-react";
import { Booking } from "../../../types/driver.types";

interface RouteDetailsProps {
    booking: Booking;
}

export default function RouteDetails({
    booking,
}: RouteDetailsProps) {
    return (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex gap-3">

                <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                        <MapPin size={17} />
                    </div>

                    <div className="h-10 border-l border-dashed border-slate-300" />

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                        <Navigation size={17} />
                    </div>
                </div>

                <div className="min-w-0 flex-1">

                    <div>
                        <p className="text-[9px] font-medium uppercase tracking-wide text-slate-400">
                            Pickup
                        </p>

                        <p className="mt-1 break-words text-sm font-bold text-slate-800">
                            {booking.pickup.address}
                        </p>
                    </div>

                    <div className="mt-5">
                        <p className="text-[9px] font-medium uppercase tracking-wide text-slate-400">
                            Destination
                        </p>

                        <p className="mt-1 break-words text-sm font-bold text-slate-800">
                            {booking.destination.address}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}