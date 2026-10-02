"use client";

import { useDriverRide } from "./hooks/useDriverRide";
import RideRequestLoading from "./components/RideRequestLoading";
import RideRequestError from "./components/RideRequestError";
import NoActiveRide from "./components/NoActiveRide";
import PendingRideRequest from "./components/PendingRideRequest";
import ActiveRide from "./components/ActiveRide";

export default function RideRequest() {
    const ride = useDriverRide();

    if (ride.loading) {
        return <RideRequestLoading />;
    }

    if (ride.error && !ride.booking) {
        return (
            <RideRequestError
                error={ride.error}
                onRetry={ride.fetchDriverBooking}
            />
        );
    }

    if (!ride.booking) {
        return (
            <NoActiveRide
                status={ride.status}
                actionError={ride.actionError}
            />
        );
    }

    if (
        ride.status === "accepted" ||
        ride.status === "ongoing"
    ) {
        return (
            <ActiveRide
                booking={ride.booking}
                status={ride.status}
                actionLoading={ride.actionLoading}
                actionError={ride.actionError}
                driverLocation={ride.driverLocation}
                passengerLocation={ride.passengerLocation}
                onStartNavigation={ride.handleStartNavigation}
                onCancelRide={ride.handleCancelRide}
                onCompleteRide={ride.handleCompleteRide}
                onStopLocationSharing={
                    ride.handleStopLocationSharing
                }
                formatDistance={ride.formatDistance}
                formatDuration={ride.formatDuration}
            />
        );
    }

    return (
        <PendingRideRequest
            booking={ride.booking}
            actionLoading={ride.actionLoading}
            actionError={ride.actionError}
            onAccept={ride.handleAccept}
            onReject={ride.handleReject}
            formatDistance={ride.formatDistance}
            formatDuration={ride.formatDuration}
        />
    );
}