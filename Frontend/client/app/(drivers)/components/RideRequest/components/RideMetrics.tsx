"use client";

import { Clock3, IndianRupee, Luggage, Route, Star, UserRound } from "lucide-react";
import type { Booking } from "../../../types/driver.types";
import Metric from "./Metric";

interface RideMetricsProps {
    booking: Booking;
    formatDistance: (distance: number) => string;
    formatDuration: (duration: number) => string;
    variant?: "active" | "pending";
}

export default function RideMetrics({
    booking,
    formatDistance,
    formatDuration,
    variant = "pending",
}: RideMetricsProps) {
    if (variant === "active") {
        return (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Metric
                    icon={<Route size={15} />}
                    label="Distance"
                    value={formatDistance(booking.distance)}
                />

                <Metric
                    icon={<Clock3 size={15} />}
                    label="Estimated time"
                    value={formatDuration(
                        booking.estimatedDuration
                    )}
                />

                <Metric
                    icon={<Luggage size={15} />}
                    label="Luggage"
                    value={`${booking.luggage || 0} bags`}
                />

                <Metric
                    icon={<IndianRupee size={15} />}
                    label="Estimated fare"
                    value={`₹${Number(
                        booking.fare || 0
                    ).toLocaleString("en-IN")}`}
                />
            </div>
        );
    }

    return (
        <>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Metric
                    icon={<IndianRupee size={15} />}
                    label="Estimated fare"
                    value={`₹${Number(
                        booking.fare || 0
                    ).toLocaleString("en-IN")}`}
                />

                <Metric
                    icon={<Route size={15} />}
                    label="Trip distance"
                    value={formatDistance(booking.distance)}
                />

                <Metric
                    icon={<Clock3 size={15} />}
                    label="Trip time"
                    value={formatDuration(
                        booking.estimatedDuration
                    )}
                />

                <Metric
                    icon={<Star size={15} />}
                    label="Passenger"
                    value={
                        booking.passenger?.rating !==
                        undefined
                            ? `${booking.passenger.rating} ⭐`
                            : "N/A"
                    }
                />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
                <Metric
                    icon={<UserRound size={15} />}
                    label="Passengers"
                    value={String(
                        booking.passengers || 0
                    )}
                />

                <Metric
                    icon={<Luggage size={15} />}
                    label="Luggage"
                    value={`${booking.luggage || 0} bags`}
                />
            </div>
        </>
    );
}