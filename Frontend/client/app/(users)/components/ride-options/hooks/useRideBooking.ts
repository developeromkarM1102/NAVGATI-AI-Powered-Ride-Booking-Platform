"use client";

import { useEffect, useState } from "react";
import {
  BookRide,
  GetBookingStatus,
  cancelBooking,
} from "../../../Services/ai.api";
import { socket } from "@/app/lib/socket";

import type {
  BookingStatus,
  Recommendation,
  RideOptionsProps,
} from "../../../types/ride.types";

import type {
  ActiveRideBooking,
  BookingApiResponse,
  LocationPoint,
  RideDriver,
  SocketLocationEvent,
  RideStartedEvent,
  UseRideBookingProps,
  UseRideBookingResult,
} from "../../../types/ride-options.types";

export function useRideBooking({
  recommendations,
  pickup,
  destination,
  rideType,
  passengers,
  luggage,
  pickupCoordinates,
  destinationCoordinates,
  onBookingAccepted,
}: Pick<
  RideOptionsProps,
  | "recommendations"
  | "pickup"
  | "destination"
  | "rideType"
  | "passengers"
  | "luggage"
  | "pickupCoordinates"
  | "destinationCoordinates"
> &
  UseRideBookingProps): UseRideBookingResult {
  const [bookingDriverId, setBookingDriverId] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [activeBooking, setActiveBooking] =
    useState<ActiveRideBooking | null>(null);
  const [activeDriver, setActiveDriver] = useState<RideDriver | null>(null);
  const [driverLocation, setDriverLocation] =
    useState<LocationPoint | null>(null);
  const [passengerLocation, setPassengerLocation] =
    useState<LocationPoint | null>(null);
  const [rideStarted, setRideStarted] = useState<boolean>(false);

  const clearPersistedBooking = (): void => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem("navgati_active_booking");
    localStorage.removeItem("navgati_active_booking_id");
    localStorage.removeItem("navgati_active_driver_id");
    localStorage.removeItem("navgati_booking_status");
  };

  const saveBooking = (booking: ActiveRideBooking): void => {
    if (typeof window === "undefined" || !booking?._id) {
      return;
    }

    localStorage.setItem(
      "navgati_active_booking",
      JSON.stringify(booking)
    );

    localStorage.setItem(
      "navgati_active_booking_id",
      booking._id
    );

    localStorage.setItem(
      "navgati_booking_status",
      booking.status
    );

    if (
      booking.driver &&
      typeof booking.driver === "object" &&
      booking.driver._id
    ) {
      localStorage.setItem(
        "navgati_active_driver_id",
        booking.driver._id
      );
    }
  };

  const applyBooking = (booking: ActiveRideBooking): void => {
    if (!booking?._id) {
      return;
    }

    const normalizedStatus: BookingStatus = booking.status;

    const normalizedBooking: ActiveRideBooking = {
      ...booking,
      status: normalizedStatus,
    };

    setBookingId(normalizedBooking._id);
    setBookingStatus(normalizedStatus);
    setActiveBooking(normalizedBooking);
    setRideStarted(normalizedStatus === "ongoing");

    if (
      normalizedBooking.driver &&
      typeof normalizedBooking.driver === "object"
    ) {
      setActiveDriver(normalizedBooking.driver);
      setBookingDriverId(
        normalizedBooking.driver._id || null
      );
    }

    saveBooking(normalizedBooking);
  };

  const handleFinalBookingState = (
    status: BookingStatus,
    currentBookingId: string
  ): void => {
    socket.emit("leave-booking", {
      bookingId: currentBookingId,
    });

    setActiveBooking(null);
    setActiveDriver(null);
    setBookingDriverId(null);
    setDriverLocation(null);
    setPassengerLocation(null);
    setRideStarted(false);
    setBookingStatus(status);

    clearPersistedBooking();

    setBookingId(null);
  };

  useEffect(() => {
    let cancelled = false;

    const restoreBooking = async (): Promise<void> => {
      if (typeof window === "undefined") {
        return;
      }

      const savedBooking = localStorage.getItem(
        "navgati_active_booking"
      );

      const savedBookingId = localStorage.getItem(
        "navgati_active_booking_id"
      );

      if (savedBooking) {
        try {
          const parsedBooking =
            JSON.parse(savedBooking) as ActiveRideBooking;

          if (parsedBooking?._id) {
            const savedStatus = String(
              parsedBooking.status || ""
            ).toLowerCase();

            if (
              savedStatus === "accepted" ||
              savedStatus === "ongoing"
            ) {
              applyBooking(parsedBooking);

              socket.emit("join-booking", {
                bookingId: parsedBooking._id,
              });

              if (savedStatus === "ongoing") {
                socket.emit("request-driver-location", {
                  bookingId: parsedBooking._id,
                });
              }
            }
          }
        } catch (error: unknown) {
          // console.error(
          //   "Failed to restore local booking:",
          //   error
          // );
        }
      }

      const bookingIdFromStorage = savedBookingId;

      if (!bookingIdFromStorage) {
        return;
      }

      try {
        const response = (await GetBookingStatus({
          bookingID: bookingIdFromStorage,
        })) as BookingApiResponse;

        if (cancelled) {
          return;
        }

        if (
          response?.error ||
          response?.success === false
        ) {
          // console.error(
          //   "Failed to sync booking:",
          //   response?.error ||
          //   response?.message
          // );
          return;
        }

        const latestBooking = response?.booking;

        if (!latestBooking?._id) {
          // console.warn(
          //   "Backend did not return the saved booking."
          // );
          return;
        }

        const status = String(
          latestBooking.status || ""
        ).toLowerCase() as BookingStatus;

        if (
          status === "accepted" ||
          status === "ongoing"
        ) {
          applyBooking(latestBooking);

          onBookingAccepted?.(latestBooking);

          window.dispatchEvent(
            new CustomEvent(
              "navgati-booking-accepted",
              {
                detail: latestBooking,
              }
            )
          );

          socket.emit("join-booking", {
            bookingId: latestBooking._id,
          });

          if (status === "ongoing") {
            socket.emit(
              "request-driver-location",
              {
                bookingId: latestBooking._id,
              }
            );
          }

          return;
        }

        if (
          status === "rejected" ||
          status === "cancelled" ||
          status === "completed"
        ) {
          handleFinalBookingState(
            status,
            latestBooking._id
          );
        }
      } catch (error: unknown) {
        if (cancelled) {
          return;
        }

        // console.error(
        //   "Failed to restore booking from backend:",
        //   error
        // );
      }
    };

    void restoreBooking();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!bookingId) {
      return;
    }

    if (
      bookingStatus !== "requested" &&
      bookingStatus !== "accepted" &&
      bookingStatus !== "ongoing"
    ) {
      return;
    }

    let stopped = false;

    const checkBookingStatus = async (): Promise<void> => {
      try {
        const response = (await GetBookingStatus({
          bookingID: bookingId,
        })) as BookingApiResponse;

        if (stopped) {
          return;
        }

        if (
          response?.error ||
          response?.success === false
        ) {
          // console.error(
          //   "Booking status error:",
          //   response?.error ||
          //   response?.message
          // );
          return;
        }

        const latestBooking = response?.booking;

        if (!latestBooking?._id) {
          return;
        }

        const status = String(
          latestBooking.status || ""
        ).toLowerCase() as BookingStatus;

        if (!status) {
          return;
        }

        if (
          status === "accepted" ||
          status === "ongoing"
        ) {
          applyBooking(latestBooking);

          setRideStarted(
            status === "ongoing"
          );

          onBookingAccepted?.(
            latestBooking
          );

          window.dispatchEvent(
            new CustomEvent(
              "navgati-booking-accepted",
              {
                detail: latestBooking,
              }
            )
          );

          socket.emit("join-booking", {
            bookingId: latestBooking._id,
          });

          if (status === "ongoing") {
            socket.emit(
              "request-driver-location",
              {
                bookingId: latestBooking._id,
              }
            );
          }

          return;
        }

        if (
          status === "rejected" ||
          status === "cancelled" ||
          status === "completed"
        ) {
          handleFinalBookingState(
            status,
            latestBooking._id
          );
        }
      } catch (error: unknown) {
        // console.error(
        //   "Failed to check booking status:",
        //   error
        // );
      }
    };

    void checkBookingStatus();

    const interval = setInterval(() => {
      void checkBookingStatus();
    }, 3000);

    return () => {
      stopped = true;
      clearInterval(interval);
    };
  }, [
    bookingId,
    bookingStatus,
    onBookingAccepted,
  ]);

  useEffect(() => {
    if (!bookingId) {
      return;
    }

    if (
      bookingStatus !== "accepted" &&
      bookingStatus !== "ongoing"
    ) {
      return;
    }

    const currentBookingId = bookingId;

    // console.log(
    //   "🔌 Joining booking room:",
    //   currentBookingId
    // );

    socket.emit("join-booking", {
      bookingId: currentBookingId,
    });

    const handleDriverLocation = (
      location: SocketLocationEvent
    ): void => {
      if (location.userType !== "driver") {
        return;
      }

      if (
        location.bookingId &&
        String(location.bookingId) !==
        String(currentBookingId)
      ) {
        return;
      }

      setDriverLocation({
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
      });
    };

    const handlePassengerLocation = (
      location: SocketLocationEvent
    ): void => {
      if (location.userType !== "user") {
        return;
      }

      if (
        location.bookingId &&
        String(location.bookingId) !==
        String(currentBookingId)
      ) {
        return;
      }

      setPassengerLocation({
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
      });
    };

    const handleDriverCurrentLocation = (
      location: SocketLocationEvent
    ): void => {
      if (
        location.bookingId &&
        String(location.bookingId) !==
        String(currentBookingId)
      ) {
        return;
      }

      setDriverLocation({
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
      });
    };

    const handleRideStarted = (
      data: RideStartedEvent
    ): void => {
      if (
        data?.bookingId &&
        String(data.bookingId) !==
        String(currentBookingId)
      ) {
        return;
      }

      // console.log(
      //   "🚘 Socket: ride started"
      // );

      setRideStarted(true);
      setBookingStatus("ongoing");

      setActiveBooking((previous) => {
        if (!previous) {
          return previous;
        }

        const updatedBooking: ActiveRideBooking = {
          ...previous,
          status: "ongoing",
        };

        saveBooking(updatedBooking);

        return updatedBooking;
      });

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "navgati_booking_status",
          "ongoing"
        );
      }

      socket.emit(
        "request-driver-location",
        {
          bookingId: currentBookingId,
        }
      );
    };

    const handleRideCancelled = (data: {
      bookingId?: string;
      reason?: string;
    }): void => {
      if (
        data?.bookingId &&
        String(data.bookingId) !==
        String(currentBookingId)
      ) {
        return;
      }

      // console.log(
      //   "🚫 Ride cancelled:",
      //   data
      // );

      setBookingError(
        data?.reason ||
        "The driver cancelled the ride."
      );

      setActiveBooking(null);
      setActiveDriver(null);
      setBookingDriverId(null);
      setDriverLocation(null);
      setPassengerLocation(null);
      setRideStarted(false);
      setBookingStatus("cancelled");
      setBookingId(null);

      clearPersistedBooking();

      socket.emit("leave-booking", {
        bookingId: currentBookingId,
      });
    };

    const handleRideCompleted = (data: {
      bookingId?: string;
      message?: string;
    }): void => {
      if (
        data?.bookingId &&
        String(data.bookingId) !==
        String(currentBookingId)
      ) {
        return;
      }

      // console.log(
      //   "✅ Ride completed by driver:",
      //   data
      // );

      setBookingStatus("completed");

      setBookingError(
        data?.message ||
        "Your ride has been completed."
      );

      setActiveBooking(null);
      setActiveDriver(null);
      setBookingDriverId(null);
      setDriverLocation(null);
      setPassengerLocation(null);
      setRideStarted(false);

      if (typeof window !== "undefined") {
        localStorage.removeItem(
          "navgati_active_booking"
        );

        localStorage.removeItem(
          "navgati_active_booking_id"
        );

        localStorage.removeItem(
          "navgati_active_driver_id"
        );

        localStorage.setItem(
          "navgati_booking_status",
          "completed"
        );
      }

      socket.emit("leave-booking", {
        bookingId: currentBookingId,
      });

      setBookingId(null);

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    };

    socket.on(
      "location-update",
      handleDriverLocation
    );

    socket.on(
      "location-update",
      handlePassengerLocation
    );

    socket.on(
      "driver-current-location",
      handleDriverCurrentLocation
    );

    socket.on(
      "ride-started",
      handleRideStarted
    );

    socket.on(
      "ride-cancelled",
      handleRideCancelled
    );

    socket.on(
      "ride-completed",
      handleRideCompleted
    );

    return () => {
      socket.off(
        "location-update",
        handleDriverLocation
      );

      socket.off(
        "location-update",
        handlePassengerLocation
      );

      socket.off(
        "driver-current-location",
        handleDriverCurrentLocation
      );

      socket.off(
        "ride-started",
        handleRideStarted
      );

      socket.off(
        "ride-cancelled",
        handleRideCancelled
      );

      socket.off(
        "ride-completed",
        handleRideCompleted
      );

      socket.emit("leave-booking", {
        bookingId: currentBookingId,
      });
    };
  }, [bookingId, bookingStatus]);

  useEffect(() => {
    if (!bookingId) {
      return;
    }

    if (
      bookingStatus !== "accepted" &&
      bookingStatus !== "ongoing"
    ) {
      return;
    }

    if (!navigator.geolocation) {
      setBookingError(
        "Your browser does not support live location sharing."
      );
      return;
    }

    const currentBookingId = bookingId;

    const watchId =
      navigator.geolocation.watchPosition(
        (position: GeolocationPosition) => {
          const latitude =
            position.coords.latitude;

          const longitude =
            position.coords.longitude;

          const accuracy =
            position.coords.accuracy;

          setPassengerLocation({
            latitude,
            longitude,
            accuracy,
          });

          socket.emit(
            "location-update",
            {
              bookingId:
                currentBookingId,
              userType: "user",
              latitude,
              longitude,
              accuracy,
            }
          );
        },
        (error: GeolocationPositionError) => {
          // console.error(
          //   "Passenger location error:",
          //   error
          // );
        },
        {
          enableHighAccuracy: true,
          maximumAge: 3000,
          timeout: 10000,
        }
      );

    return () => {
      navigator.geolocation.clearWatch(
        watchId
      );
    };
  }, [bookingId, bookingStatus]);

  const handleBookRide = async (
    recommendation: Recommendation
  ): Promise<void> => {
    const driver =
      recommendation.driver.driver;

    try {
      setBookingDriverId(driver._id);
      setBookingError(null);
      setActiveDriver(driver);

      const selectedRideType =
        rideType.toLowerCase() === "any"
          ? driver.vehicle.type.toLowerCase()
          : rideType.toLowerCase();

      const response =
        (await BookRide({
          driverId: driver._id,
          pickup,
          destination,
          rideType: selectedRideType,
          passengers,
          luggage,
          distance:
            recommendation.driver.distance,
          estimatedDuration:
            recommendation.driver.duration,
          fare: recommendation.fare,
          status: "requested",
          pickupCoordinates,
          destinationCoordinates,
        })) as BookingApiResponse;

      if (
        response?.error ||
        response?.success === false
      ) {
        setBookingError(
          response?.error ||
          response?.message ||
          "Unable to book ride."
        );

        setBookingDriverId(null);
        setActiveDriver(null);

        return;
      }

      const newBookingId =
        response?.booking?._id;

      if (!newBookingId) {
        setBookingError(
          "Booking created but booking ID was not received."
        );

        setBookingDriverId(null);
        setActiveDriver(null);

        return;
      }

      const initialBooking: ActiveRideBooking = {
        ...(response.booking || {}),
        _id: newBookingId,

        driver:
          response.booking?.driver ||
          driver,

        pickup:
          response.booking?.pickup || {
            address: pickup,
            latitude:
              pickupCoordinates.latitude,
            longitude:
              pickupCoordinates.longitude,
          },

        destination:
          response.booking?.destination || {
            address: destination,
            latitude:
              destinationCoordinates.latitude,
            longitude:
              destinationCoordinates.longitude,
          },

        rideType: selectedRideType,
        passengers,
        luggage,
        fare: recommendation.fare,
        distance:
          recommendation.driver.distance,
        estimatedDuration:
          recommendation.driver.duration,
        status: "requested",
      };

      setActiveBooking(initialBooking);
      setBookingId(newBookingId);
      setBookingStatus("requested");

      saveBooking(initialBooking);

      socket.emit("join-booking", {
        bookingId: newBookingId,
      });
    } catch (error: unknown) {
      // console.error(
      //   "Booking failed:",
      //   error
      // );

      setBookingError(
        "Unable to book ride. Please try again."
      );

      setActiveDriver(null);
    } finally {
      setBookingDriverId(null);
    }
  };

  const handleCancelBooking =
    async (): Promise<void> => {
      if (!bookingId) {
        setBookingError(
          "No active booking found."
        );
        return;
      }

      if (bookingStatus === "ongoing") {
        setBookingError(
          "You cannot cancel a ride that has already started."
        );
        return;
      }

      try {
        setBookingError(null);

        const currentBookingId =
          bookingId;

        const response =
          (await cancelBooking({
            bookingId:
              currentBookingId,
          })) as BookingApiResponse;

        if (
          response?.error ||
          response?.success === false
        ) {
          setBookingError(
            response?.error ||
            response?.message ||
            "Unable to cancel the ride."
          );
          return;
        }

        setBookingStatus("cancelled");
        setActiveBooking(null);
        setActiveDriver(null);
        setDriverLocation(null);
        setPassengerLocation(null);
        setRideStarted(false);
        setBookingDriverId(null);
        setBookingId(null);

        clearPersistedBooking();

        socket.emit(
          "leave-booking",
          {
            bookingId:
              currentBookingId,
          }
        );
      } catch (error: unknown) {
        // console.error(
        //   "Cancel booking failed:",
        //   error
        // );

        setBookingError(
          "Unable to cancel the ride. Please try again."
        );
      }
    };

  const clearBooking = (): void => {
    if (bookingId) {
      socket.emit(
        "leave-booking",
        {
          bookingId,
        }
      );
    }

    setBookingId(null);
    setBookingStatus(null);
    setBookingDriverId(null);
    setActiveBooking(null);
    setActiveDriver(null);
    setDriverLocation(null);
    setPassengerLocation(null);
    setRideStarted(false);
    setBookingError(null);

    clearPersistedBooking();
  };

  const showActiveRide =
    bookingStatus === "accepted" ||
    bookingStatus === "ongoing";

  const acceptedDriver: RideDriver | null =
    activeBooking?.driver &&
      typeof activeBooking.driver === "object"
      ? activeBooking.driver
      : activeDriver;

  return {
    bookingDriverId,
    bookingId,
    bookingStatus,
    bookingError,
    activeBooking,
    activeDriver,
    driverLocation,
    passengerLocation,
    rideStarted,
    handleBookRide,
    handleCancelBooking,
    clearBooking,
    showActiveRide,
    acceptedDriver,
  };
}