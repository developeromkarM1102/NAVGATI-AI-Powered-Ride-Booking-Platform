import type { BookingStatus } from "./ride.types";

export interface RideLocation {
  address: string;
  latitude: number;
  longitude: number;
}

export interface RideVehicle {
  type: string;
  brand: string;
  model: string;
  registrationNumber: string;
  color?: string;
  seats?: number;
}

export interface RideDriver {
  _id: string;
  username?: string;
  name?: string;
  email?: string;
  phone?: string;
  rating?: number;
  totalRides?: number;
  safetyScore?: number;
  isVerified?: boolean;
  isAvailable?: boolean;
  vehicle?: RideVehicle;
}

export interface ActiveRideBooking {
  _id: string;
  user?: string;
  driver?: RideDriver | string;
  pickup?: RideLocation;
  destination?: RideLocation;
  rideType?: string;
  passengers?: number;
  luggage?: boolean;
  distance?: number;
  estimatedDuration?: number;
  fare?: number;
  status: BookingStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface LocationPoint {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface SocketLocationEvent extends LocationPoint {
  bookingId?: string;
  userType?: "driver" | "user" | string;
}

export interface RideStartedEvent {
  bookingId?: string;
}

export interface BookingApiResponse {
  success?: boolean;
  error?: string;
  message?: string;
  booking?: ActiveRideBooking;
}

export interface UseRideBookingProps {
  onBookingAccepted?: (booking: ActiveRideBooking) => void;
}

export interface UseRideBookingResult {
  bookingDriverId: string | null;
  bookingId: string | null;
  bookingStatus: BookingStatus;
  bookingError: string | null;
  activeBooking: ActiveRideBooking | null;
  activeDriver: RideDriver | null;
  driverLocation: LocationPoint | null;
  passengerLocation: LocationPoint | null;
  rideStarted: boolean;
  handleBookRide: (recommendation: import("./ride.types").Recommendation) => Promise<void>;
  handleCancelBooking: () => Promise<void>;
  clearBooking: () => void;
  showActiveRide: boolean;
  acceptedDriver: RideDriver | null;
}

export interface ActiveRideCardProps {
    bookingStatus: BookingStatus;
    activeBooking: ActiveRideBooking | null;
    acceptedDriver: RideDriver | null;
    pickup: string;
    destination: string;
    rideType: string;
    driverLocation: LocationPoint | null;
    passengerLocation: LocationPoint | null;
    formatFare: (fare?: number) => string;
    formatDistance: (distance?: number) => string;
    formatDuration: (duration?: number) => string;
    onCancel: () => Promise<void>;
}