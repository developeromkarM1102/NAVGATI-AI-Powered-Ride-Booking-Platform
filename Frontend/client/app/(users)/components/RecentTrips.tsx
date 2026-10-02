"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Car, CheckCircle2, Clock3, MapPin, MoreHorizontal, RotateCcw, XCircle } from "lucide-react";
import { getMyBookings } from "../Services/ai.api";
import { LocationData, Booking } from "../types/ride.types";

export default function RecentTrips() {

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getMyBookings();

        //console.log("📦 My bookings:", response);

        if (response?.error) {
          setError(response.error);
          return;
        }

        setBookings(response?.bookings || []);
      } catch (error) {
        // console.error(
        //   "❌ Failed to fetch bookings:",
        //   error
        // );

        setError(
          "Unable to load your recent trips."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // DATE FORMATTER
  const formatDate = (date: string) => {
    if (!date) {
      return "Unknown";
    }

    const bookingDate = new Date(date);
    const now = new Date();

    const isToday =
      bookingDate.toDateString() ===
      now.toDateString();

    if (isToday) {
      return "Today";
    }

    const yesterday = new Date();

    yesterday.setDate(
      yesterday.getDate() - 1
    );

    const isYesterday =
      bookingDate.toDateString() ===
      yesterday.toDateString();

    if (isYesterday) {
      return "Yesterday";
    }

    return bookingDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
      }
    );
  };


  // TIME FORMATTER
  const formatTime = (date: string) => {
    if (!date) {
      return "--:--";
    }

    return new Date(date).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // RIDE TYPE FORMATTER
  const formatRideType = (
    rideType: string
  ) => {
    if (!rideType) {
      return "NavGati Ride";
    }

    return rideType
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (char) =>
        char.toUpperCase()
      );
  };

  // STATUS FORMATTER
  const formatStatus = (
    status: string
  ) => {
    switch (status) {
      case "completed":
        return "Completed";

      case "cancelled":
        return "Cancelled";

      case "rejected":
        return "Rejected";

      case "accepted":
        return "Accepted";

      case "ongoing":
        return "Ongoing";

      case "started":
        return "Started";

      case "requested":
        return "Requested";

      default:
        return status
          ? status.charAt(0).toUpperCase() +
              status.slice(1)
          : "Unknown";
    }
  };

  // STATUS COLOR
  const getStatusColor = (
    status: string
  ) => {
    switch (status) {
      case "completed":
        return "text-emerald-600";

      case "cancelled":
      case "rejected":
        return "text-red-500";

      case "accepted":
      case "ongoing":
      case "started":
        return "text-orange-500";

      case "requested":
        return "text-amber-500";

      default:
        return "text-slate-500";
    }
  };

// STATUS ICON
  const getStatusIcon = (
    status: string
  ) => {
    switch (status) {
      case "completed":
        return (
          <CheckCircle2 size={11} />
        );

      case "cancelled":
      case "rejected":
        return (
          <XCircle size={11} />
        );

      default:
        return (
          <Clock3 size={11} />
        );
    }
  };


  // BOOK AGAIN
  const handleBookAgain = (
    booking: Booking
  ) => {
    // console.log(
    //   "🔄 Book again:",
    //   booking
    // );

    // console.log(
    //   "Pickup:",
    //   booking.pickup.address
    // );

    // console.log(
    //   "Destination:",
    //   booking.destination.address
    // );

    // console.log(
    //   "Ride type:",
    //   booking.rideType
    // );
  };


  // RENDER
  return (
    <section id="recent-trips" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-2">

            <h2 className="text-lg font-bold text-slate-900">
              Recent Trips
            </h2>

            {!loading && (
              <span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500 sm:block">
                {bookings.length} TRIPS
              </span>
            )}

          </div>

          <p className="mt-1 text-xs text-slate-500">
            Your latest journeys with NavGati.
          </p>

        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 text-xs font-bold text-orange-500 transition hover:text-orange-600"
        >
          View all
          <ArrowUpRight size={14} />
        </button>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="mt-6 space-y-3">

          {[1, 2, 3].map(
            (item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-2xl bg-slate-100"
              />
            )
          )}

        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4">

          <p className="text-xs font-semibold text-red-500">
            {error}
          </p>

        </div>
      )}

      {/* EMPTY */}

      {!loading &&
        !error &&
        bookings.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-8 text-center">

            <Car
              size={28}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm font-bold text-slate-700">
              No trips yet
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Your journeys will appear here
              once you book a ride.
            </p>

          </div>
        )}

      {/* TRIPS */}

      {!loading &&
        !error &&
        bookings.length > 0 && (

          <div className="mt-6 space-y-3">

            {bookings
              .slice(0, 4)
              .map((trip) => (

                <div
                  key={trip._id}
                  className="group rounded-2xl border border-slate-100 p-4 transition hover:border-orange-100 hover:bg-orange-50/30"
                >

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                    {/* RIDE ICON */}
                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                        <Car size={20} />
                      </div>

                      {/* Mobile information */}
                      <div className="sm:hidden">

                        <p className="text-sm font-bold text-slate-800">
                          {formatRideType(
                            trip.rideType
                          )}
                        </p>

                        <p className="text-[10px] text-slate-400">
                          {formatDate(
                            trip.createdAt
                          )}
                          {" · "}
                          {formatTime(
                            trip.createdAt
                          )}
                        </p>

                      </div>

                    </div>


                    {/* ROUTE */}
                    <div className="min-w-0 flex-1">

                      <div className="flex items-center gap-3">

                        {/* Route line */}
                        <div className="flex flex-col items-center">

                          <div className="h-2.5 w-2.5 rounded-full border-2 border-orange-500 bg-white" />

                          <div className="h-6 w-px border-l border-dashed border-slate-300" />

                          <MapPin
                            size={13}
                            className="text-emerald-500"
                          />

                        </div>

                        {/* Locations */}
                        <div className="min-w-0">

                          <p className="truncate text-sm font-bold text-slate-800">
                            {trip.pickup?.address ||
                              "Pickup location"}
                          </p>

                          <div className="h-5" />

                          <p className="truncate text-sm font-bold text-slate-800">
                            {trip.destination
                              ?.address ||
                              "Destination"}
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* DATE */}
                    <div className="hidden min-w-[110px] sm:block">

                      <div className="flex items-center gap-1.5">

                        <Clock3
                          size={14}
                          className="text-slate-400"
                        />

                        <span className="text-xs font-semibold text-slate-700">
                          {formatDate(
                            trip.createdAt
                          )}
                        </span>

                      </div>

                      <p className="mt-1 text-[10px] text-slate-400">
                        {formatTime(
                          trip.createdAt
                        )}
                      </p>

                    </div>


                    {/* RIDE TYPE */}
                    <div className="hidden min-w-[130px] lg:block">

                      <p className="text-[10px] text-slate-400">
                        Ride type
                      </p>

                      <p className="mt-1 text-xs font-bold text-slate-700">
                        {formatRideType(
                          trip.rideType
                        )}
                      </p>

                    </div>


                    {/* FARE + STATUS */}
                    <div className="flex items-center justify-between sm:block sm:min-w-[80px]">

                      {/* Mobile ride type */}
                      <div className="sm:hidden">

                        <p className="text-[10px] text-slate-400">
                          Ride
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-700">
                          {formatRideType(
                            trip.rideType
                          )}
                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-base font-extrabold text-slate-900">
                          ₹
                          {Number(
                            trip.fare || 0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </p>

                        <div
                          className={`mt-1 flex items-center justify-end gap-1 text-[9px] font-bold ${getStatusColor(
                            trip.status
                          )}`}
                        >

                          {getStatusIcon(
                            trip.status
                          )}

                          {formatStatus(
                            trip.status
                          )}

                        </div>

                      </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-2 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">

                      {/* Book Again */}
                      {trip.status ===
                        "completed" && (
                        <button
                          type="button"
                          onClick={() =>
                            handleBookAgain(
                              trip
                            )
                          }
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 sm:flex-none"
                        >
                          <RotateCcw
                            size={12}
                          />

                          Book again
                        </button>
                      )}

                      {/* More Options */}
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        aria-label="More options"
                      >
                        <MoreHorizontal
                          size={17}
                        />
                      </button>

                    </div>

                  </div>

                  {/* EXTRA TRIP INFO */}
                  <div className="mt-3 flex flex-wrap gap-3 border-t border-slate-100 pt-3 sm:ml-14">

                    <span className="text-[10px] font-medium text-slate-400">
                      {Number(
                        trip.distance || 0
                      ).toFixed(1)}{" "}
                      km
                    </span>

                    <span className="text-[10px] text-slate-300">
                      •
                    </span>

                    <span className="text-[10px] font-medium text-slate-400">
                      {trip.estimatedDuration ||
                        0}{" "}
                      min
                    </span>

                    <span className="text-[10px] text-slate-300">
                      •
                    </span>

                    <span className="text-[10px] font-medium text-slate-400">
                      {trip.passengers || 1}{" "}
                      passengers
                    </span>

                    {trip.luggage && (
                      <>
                        <span className="text-[10px] text-slate-300">
                          •
                        </span>

                        <span className="text-[10px] font-medium text-slate-400">
                          Luggage
                        </span>
                      </>
                    )}

                  </div>

                </div>

              ))}

          </div>
        )}

      {/* FOOTER */}
      {!loading &&
        !error &&
        bookings.length > 0 && (

          <div className="mt-5 border-t border-slate-100 pt-4">

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-xs font-bold text-slate-600 transition hover:bg-orange-50 hover:text-orange-600"
            >
              View complete trip history

              <ArrowUpRight
                size={14}
              />
            </button>

          </div>
        )}

    </section>
  );
}