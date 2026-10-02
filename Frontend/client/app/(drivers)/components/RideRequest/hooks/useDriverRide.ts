"use client";

import { useCallback, useEffect, useState } from "react";
import { PendingBooking, CurrentBooking, AcceptBooking, StartBooking, RejectBooking, CancelBooking, CompleteBooking } from "@/app/(drivers)/Services/ai.api";
import { socket } from "@/app/lib/socket";
import type { Booking, RideStatus, DriverLocation, PassengerLocation, PassengerLocationEvent, RideStartedEvent } from "../../../types/driver.types";

export function useDriverRide() {
    // STATE
    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState("");
    const [actionError, setActionError] = useState("");
    const [status, setStatus] = useState<RideStatus>("pending");
    const [driverLocation, setDriverLocation] = useState<DriverLocation | null>(null);
    const [passengerLocation, setPassengerLocation] = useState<PassengerLocation | null>(null);
    const [navigationStarted, setNavigationStarted] = useState(false);

    // CLEAR BOOKING STATE
    const clearBookingState = useCallback((nextStatus: RideStatus = "pending") => {
        setBooking(null);
        setStatus(nextStatus);
        setNavigationStarted(false);
        setDriverLocation(null);
        setPassengerLocation(null);
    }, []);

    // JOIN DRIVER ROOM
    const joinDriverRoom = useCallback((bookingData: Booking) => {
        if (!bookingData?.driver) {
            return;
        }

        const driver = bookingData.driver;

        const driverId = typeof driver === "string" ? driver : driver?._id;

        if (!driverId) {
            return;
        }

        socket.emit("join-driver", {
            driverId: String(driverId),
        });

        // console.log("🚗 Joined driver room:", `driver_${driverId}`);
    }, []);

    // RESTORE BOOKING STATE
    const restoreBookingState = useCallback(
        (bookingData: Booking | null) => {
            if (!bookingData) {
                clearBookingState("pending");
                return;
            }

            joinDriverRoom(bookingData);

            const backendStatus = String(bookingData.status || "").toLowerCase();

            if (backendStatus === "ongoing") {
                setBooking(bookingData);
                setStatus("ongoing");
                setNavigationStarted(true);
                return;
            }

            if (backendStatus === "accepted") {
                setBooking(bookingData);
                setStatus("accepted");
                setNavigationStarted(false);
                return;
            }

            if (backendStatus === "requested") {
                setBooking(bookingData);
                setStatus("pending");
                setNavigationStarted(false);
                return;
            }

            if (backendStatus === "cancelled" || backendStatus === "canceled") {
                clearBookingState("cancelled");
                return;
            }

            if (backendStatus === "rejected" || backendStatus === "declined") {
                clearBookingState("declined");
                return;
            }

            if (backendStatus === "completed") {
                clearBookingState("pending");
                return;
            }

            clearBookingState("pending");
        },
        [clearBookingState, joinDriverRoom]
    );

    // EXTRACT BOOKING FROM API RESPONSE
    const extractBooking = useCallback((response: unknown): Booking | null => {
        const data = response as {
            booking?: Booking;
            data?: { booking?: Booking } | Booking | Booking[];
            bookings?: Booking[];
        };

        const responseData = data?.data;

        const bookingData =
            data?.booking ||
            (responseData && !Array.isArray(responseData) && "booking" in responseData ? responseData.booking : null) ||
            (Array.isArray(data?.bookings) ? data.bookings[0] : null) ||
            (Array.isArray(responseData) ? responseData[0] : null) ||
            (responseData && !Array.isArray(responseData) ? responseData : null);

        if (!bookingData) {
            return null;
        }

        const normalizedBooking: Booking = {
            ...bookingData,
            passenger: bookingData.passenger || bookingData.user || undefined,
        };

        return normalizedBooking;
    }, []);

    // FETCH DRIVER BOOKING
    const fetchDriverBooking = useCallback(async () => {
        try {
            setError("");

            const pendingResponse = await PendingBooking();

            // console.log("Pending driver bookings:", pendingResponse);

            if (pendingResponse?.error || pendingResponse?.success === false) {
                setError(pendingResponse?.error || pendingResponse?.message || "Failed to fetch pending ride requests.");
                return;
            }

            const pendingBooking = extractBooking(pendingResponse);

            if (pendingBooking && String(pendingBooking.status).toLowerCase() === "requested") {
                restoreBookingState(pendingBooking);
                return;
            }

            if (status === "accepted" || status === "ongoing") {
                return;
            }

            const currentResponse = await CurrentBooking();

            // console.log("Current driver booking:", currentResponse);

            if (currentResponse?.error || currentResponse?.success === false) {
                if (!booking) {
                    clearBookingState("pending");
                }
                return;
            }

            const currentBooking = extractBooking(currentResponse);

            if (currentBooking) {
                restoreBookingState(currentBooking);
                return;
            }

            clearBookingState("pending");
        } catch (error) {
            // console.error("Fetch driver booking error:", error);

            if (!booking) {
                setError("Failed to fetch ride requests.");
            }
        }
    }, [booking, status, clearBookingState, extractBooking, restoreBookingState]);

    // INITIAL BOOKING LOAD
    useEffect(() => {
        let cancelled = false;

        const loadDriverBooking = async () => {
            try {
                setLoading(true);
                setError("");
                setActionError("");

                const pendingResponse = await PendingBooking();

                if (cancelled) {
                    return;
                }

                // console.log("Initial pending driver bookings:", pendingResponse);

                if (pendingResponse?.error || pendingResponse?.success === false) {
                    setError(pendingResponse?.error || pendingResponse?.message || "Failed to fetch pending ride requests.");
                    clearBookingState("pending");
                    return;
                }

                const pendingBooking = extractBooking(pendingResponse);

                if (pendingBooking && String(pendingBooking.status).toLowerCase() === "requested") {
                    restoreBookingState(pendingBooking);
                    return;
                }

                const currentResponse = await CurrentBooking();

                if (cancelled) {
                    return;
                }

                // console.log("Initial current driver booking:", currentResponse);

                if (currentResponse?.error || currentResponse?.success === false) {
                    clearBookingState("pending");
                    return;
                }

                const currentBooking = extractBooking(currentResponse);

                restoreBookingState(currentBooking);
            } catch (error) {
                if (cancelled) {
                    return;
                }

                // console.error("Initial driver booking fetch error:", error);

                setError("Failed to fetch ride requests.");
                clearBookingState("pending");
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void loadDriverBooking();

        return () => {
            cancelled = true;
        };
    }, [clearBookingState, extractBooking, restoreBookingState]);

    // POLL FOR NEW RIDE REQUESTS
    useEffect(() => {
        if (status === "accepted" || status === "ongoing") {
            return;
        }

        const interval = window.setInterval(() => {
            void fetchDriverBooking();
        }, 3000);

        return () => {
            window.clearInterval(interval);
        };
    }, [fetchDriverBooking, status]);

    // JOIN DRIVER PERSONAL ROOM
    useEffect(() => {
        if (!booking?.driver) {
            return;
        }

        const driver = booking.driver;

        const driverId = typeof driver === "string" ? driver : driver?._id;

        if (!driverId) {
            return;
        }

        socket.emit("join-driver", {
            driverId: String(driverId),
        });

        // console.log("🚗 Driver room joined:", `driver_${driverId}`);
    }, [booking?.driver]);

    // LISTEN FOR PASSENGER CANCELLATION
    useEffect(() => {
        const handleRideCancelled = (data: { bookingId?: string; reason?: string }) => {
            if (!data?.bookingId) {
                return;
            }

            if (booking?._id && String(data.bookingId) !== String(booking._id)) {
                return;
            }

            // console.log("🚫 Passenger cancelled ride:", data);

            setActionLoading(false);
            setNavigationStarted(false);
            setDriverLocation(null);
            setPassengerLocation(null);
            setBooking(null);
            setStatus("cancelled");

            setActionError(data.reason || "The passenger cancelled this ride.");
        };

        socket.on("ride-cancelled", handleRideCancelled);

        return () => {
            socket.off("ride-cancelled", handleRideCancelled);
        };
    }, [booking?._id]);

    // SHARE DRIVER GPS LOCATION
    useEffect(() => {
        if (status !== "accepted" && status !== "ongoing") {
            return;
        }

        if (!booking?._id) {
            return;
        }

        if (!navigator.geolocation) {
            setActionError("Your browser does not support location tracking.");
            return;
        }

        const bookingId = booking._id;

        socket.emit("join-booking", {
            bookingId,
        });

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const accuracy = position.coords.accuracy;

                setDriverLocation({
                    latitude,
                    longitude,
                });

                socket.emit("location-update", {
                    bookingId,
                    userType: "driver",
                    latitude,
                    longitude,
                    accuracy,
                });
            },
            (geoError) => {
                // console.error("Driver GPS error:", geoError);

                if (geoError.code === geoError.PERMISSION_DENIED) {
                    setActionError("Location permission denied. Please allow location access.");
                } else {
                    setActionError("Unable to get your live location.");
                }
            },
            {
                enableHighAccuracy: true,
                maximumAge: 3000,
                timeout: 10000,
            }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);

            socket.emit("leave-booking", {
                bookingId,
            });
        };
    }, [status, booking?._id]);

    // LISTEN FOR PASSENGER LOCATION AND RIDE START
    useEffect(() => {
        if (status !== "accepted" && status !== "ongoing") {
            return;
        }

        if (!booking?._id) {
            return;
        }

        const bookingId = booking._id;

        const handlePassengerLocation = (location: PassengerLocationEvent) => {
            if (location.userType !== "user") {
                return;
            }

            if (location.bookingId && location.bookingId !== bookingId) {
                return;
            }

            setPassengerLocation({
                latitude: location.latitude,
                longitude: location.longitude,
            });
        };

        const handleRideStarted = (data: RideStartedEvent) => {
            if (data?.bookingId && data.bookingId !== bookingId) {
                return;
            }

            setNavigationStarted(true);
            setStatus("ongoing");

            setBooking((previous) =>
                previous
                    ? {
                          ...previous,
                          status: "ongoing",
                      }
                    : null
            );
        };

        socket.on("location-update", handlePassengerLocation);
        socket.on("ride-started", handleRideStarted);

        return () => {
            socket.off("location-update", handlePassengerLocation);
            socket.off("ride-started", handleRideStarted);
        };
    }, [status, booking?._id]);

    // ACCEPT RIDE
    const handleAccept = async () => {
        if (!booking?._id) {
            return;
        }

        try {
            setActionLoading(true);
            setActionError("");

            const response = await AcceptBooking({
                bookingID: booking._id,
            });

            // console.log("Accept booking response:", response);

            if (response?.error || response?.success === false) {
                setActionError(response?.error || response?.message || "Unable to accept ride.");
                return;
            }

            const updatedBooking =
                response?.booking ||
                response?.data?.booking ||
                response?.data ||
                null;

            if (updatedBooking && typeof updatedBooking === "object") {
                const normalizedBooking: Booking = {
                    ...booking,
                    ...updatedBooking,
                    passenger: updatedBooking.passenger || updatedBooking.user || booking.passenger,
                    status: updatedBooking.status || "accepted",
                };

                restoreBookingState(normalizedBooking);
            } else {
                setStatus("accepted");

                setBooking((previous) =>
                    previous
                        ? {
                              ...previous,
                              status: "accepted",
                          }
                        : null
                );
            }
        } catch (error) {
            // console.error("Accept booking failed:", error);
            setActionError("Unable to accept ride.");
        } finally {
            setActionLoading(false);
        }
    };

    // START NAVIGATION
    const handleStartNavigation = async () => {
        if (!booking?._id || status !== "accepted") {
            return;
        }

        try {
            setActionLoading(true);
            setActionError("");

            const response = await StartBooking({
                bookingID: booking._id,
            });

            // console.log("Start booking response:", response);

            if (response?.error || response?.success === false) {
                setActionError(response?.error || response?.message || "Unable to start ride.");
                return;
            }

            const updatedBooking =
                response?.booking ||
                response?.data?.booking ||
                response?.data ||
                null;

            const startedBooking: Booking = {
                ...booking,
                ...(updatedBooking && typeof updatedBooking === "object" ? updatedBooking : {}),
                status: "ongoing",
                passenger: updatedBooking?.passenger || updatedBooking?.user || booking.passenger,
            };

            setBooking(startedBooking);
            setStatus("ongoing");
            setNavigationStarted(true);

            socket.emit("ride-started", {
                bookingId: booking._id,
            });

            const { latitude, longitude } = booking.pickup;

            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;

            window.open(mapsUrl, "_blank", "noopener,noreferrer");
        } catch (error) {
            // console.error("Start navigation failed:", error);

            setActionError("Unable to start ride.");
            setNavigationStarted(false);
            setStatus("accepted");
        } finally {
            setActionLoading(false);
        }
    };

    // COMPLETE RIDE
    const handleCompleteRide = async () => {
        if (!booking?._id || status !== "ongoing") {
            return;
        }

        try {
            setActionLoading(true);
            setActionError("");

            const response = await CompleteBooking({
                bookingID: booking._id,
            });

            // console.log("Complete booking response:", response);

            if (response?.error || response?.success === false) {
                setActionError(response?.error || response?.message || "Unable to complete ride.");
                return;
            }

            socket.emit("ride-completed", {
                bookingId: booking._id,
            });

            socket.emit("leave-booking", {
                bookingId: booking._id,
            });

            setNavigationStarted(false);
            setDriverLocation(null);
            setPassengerLocation(null);
            setBooking(null);
            setStatus("pending");
        } catch (error) {
            // console.error("Complete ride failed:", error);
            setActionError("Unable to complete ride. Please try again.");
        } finally {
            setActionLoading(false);
        }
    };

    // STOP LOCATION SHARING
    const handleStopLocationSharing = () => {
        if (!booking?._id) {
            return;
        }

        socket.emit("leave-booking", {
            bookingId: booking._id,
        });

        setNavigationStarted(false);
    };

    // REJECT RIDE
    const handleReject = async () => {
        if (!booking?._id) {
            return;
        }

        try {
            setActionLoading(true);
            setActionError("");

            const response = await RejectBooking({
                bookingID: booking._id,
            });

            if (response?.error || response?.success === false) {
                setActionError(response?.error || response?.message || "Unable to decline ride.");
                return;
            }

            socket.emit("leave-booking", {
                bookingId: booking._id,
            });

            setStatus("declined");
            setBooking(null);
            setDriverLocation(null);
            setPassengerLocation(null);
            setNavigationStarted(false);
        } catch (error) {
            // console.error("Reject booking failed:", error);
            setActionError("Unable to decline ride.");
        } finally {
            setActionLoading(false);
        }
    };

    // CANCEL ACCEPTED RIDE
    const handleCancelRide = async () => {
        if (!booking?._id || status !== "accepted") {
            return;
        }

        const confirmed = window.confirm("Are you sure you want to cancel this ride?");

        if (!confirmed) {
            return;
        }

        try {
            setActionLoading(true);
            setActionError("");

            const bookingId = booking._id;

            const response = await CancelBooking({
                bookingID: bookingId,
            });

            if (response?.error || response?.success === false) {
                setActionError(response?.error || response?.message || "Unable to cancel ride.");
                return;
            }

            socket.emit("leave-booking", {
                bookingId,
            });

            setNavigationStarted(false);
            setStatus("cancelled");
            setBooking(null);
            setDriverLocation(null);
            setPassengerLocation(null);
        } catch (error) {
            // console.error("Cancel ride failed:", error);
            setActionError("Unable to cancel ride. Please try again.");
        } finally {
            setActionLoading(false);
        }
    };

    // FORMAT DISTANCE
    const formatDistance = (distance: number) => {
        const numericDistance = Number(distance || 0);

        if (numericDistance < 1000) {
            return `${Math.round(numericDistance)} m`;
        }

        return `${(numericDistance / 1000).toFixed(1)} km`;
    };

    // FORMAT DURATION
    const formatDuration = (duration: number) => {
        const numericDuration = Number(duration || 0);

        const minutes = Math.round(numericDuration / 60);

        if (minutes < 60) {
            return `${minutes} min`;
        }

        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        return remainingMinutes > 0 ? `${hours} hr ${remainingMinutes} min` : `${hours} hr`;
    };

    // RETURN
    return {
        booking,
        loading,
        actionLoading,
        error,
        actionError,
        status,
        driverLocation,
        passengerLocation,
        navigationStarted,
        fetchDriverBooking,
        handleAccept,
        handleReject,
        handleCancelRide,
        handleStartNavigation,
        handleCompleteRide,
        handleStopLocationSharing,
        formatDistance,
        formatDuration,
    };
}