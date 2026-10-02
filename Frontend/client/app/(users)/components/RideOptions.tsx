"use client";

import { Car } from "lucide-react";
import type { RideOptionsProps } from "../types/ride.types";
import { useRideBooking } from "./ride-options/hooks/useRideBooking";
import ActiveRideCard from "./ride-options/ActiveRideCard";
import BookingStatusCard from "./ride-options/BookingStatusCard";
import RecommendationCard from "./ride-options/RecommendationCard";

export default function RideOptions({ recommendations, pickup, destination, rideType, passengers, luggage, pickupCoordinates, destinationCoordinates, onBookingAccepted }: RideOptionsProps) {
  
  const { bookingDriverId, bookingStatus, bookingError, activeBooking, acceptedDriver, driverLocation, passengerLocation, handleBookRide, handleCancelBooking, clearBooking, showActiveRide } = useRideBooking({
    recommendations,
    pickup,
    destination,
    rideType,
    passengers,
    luggage,
    pickupCoordinates,
    destinationCoordinates,
    onBookingAccepted,
  });

  const formatDistance = (meters?: number): string => {
    if (meters === undefined || meters === null || !Number.isFinite(meters)) return "—";
    return `${(meters / 1000).toFixed(1)} km`;
  };

  const formatDuration = (seconds?: number): string => {
    if (seconds === undefined || seconds === null || !Number.isFinite(seconds)) return "—";

    const minutes = Math.round(seconds / 60);

    if (minutes < 60) return `${minutes} min`;

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return remainingMinutes > 0 ? `${hours} hr ${remainingMinutes} min` : `${hours} hr`;
  };

  const formatFare = (fare?: number): string => {
    if (fare === undefined || fare === null || !Number.isFinite(fare)) return "—";
    return `₹${fare.toLocaleString("en-IN")}`;
  };

  return (
    <div className="mt-6">
      {showActiveRide ? (
        <ActiveRideCard bookingStatus={bookingStatus} activeBooking={activeBooking} acceptedDriver={acceptedDriver} pickup={pickup} destination={destination} rideType={rideType} driverLocation={driverLocation} passengerLocation={passengerLocation} formatFare={formatFare} formatDistance={formatDistance} formatDuration={formatDuration} onCancel={handleCancelBooking} />
      ) : (
        <>
          <BookingStatusCard status={bookingStatus} bookingError={bookingError} onCancel={handleCancelBooking} onClear={clearBooking} />

          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recommended rides</h3>
              <p className="mt-1 text-[11px] text-slate-500">Based on your trip requirements and preferences.</p>
            </div>

            <span className="w-fit rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">{recommendations.length} available</span>
          </div>

          {recommendations.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
              <Car size={25} className="mx-auto text-slate-400" />
              <p className="mt-2 text-xs font-semibold text-slate-600">No rides available</p>
              <p className="mt-1 text-[10px] text-slate-400">Try changing your trip requirements.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recommendations.map((recommendation) => {
                const driver = recommendation.driver.driver;
                const isBooking = bookingDriverId === driver._id;

                return (
                  <RecommendationCard
                    key={driver._id}
                    recommendation={recommendation}
                    isBooking={isBooking}
                    isThisBooking={isBooking}
                    bookingStatus={bookingStatus}
                    onBook={handleBookRide}
                    formatFare={formatFare}
                    formatDistance={formatDistance}
                    formatDuration={formatDuration}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}