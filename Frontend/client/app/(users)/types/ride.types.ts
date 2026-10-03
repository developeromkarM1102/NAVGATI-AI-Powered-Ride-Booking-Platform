import type { ActiveRideBooking } from "./ride-options.types";

export interface Requirements {
  pickup: string;
  destination: string;

  pickupCoordinates?: {
    latitude: number;
    longitude: number;
  };

  destinationCoordinates?: {
    latitude: number;
    longitude: number;
  };

  date: string;
  time: string;
  passengers: number;
  luggage: boolean;
  rideType: string;
  preferences: string[];
}

export interface RouteData {
  distance: number;
  duration: number;
}

export interface Vehicle {
  type: string;
  brand: string;
  model: string;
  registrationNumber: string;
  color: string;
  seats: number;
}

export interface DriverDetails {
  _id: string;
  username: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  rating: number;
  totalRides: number;
  isAvailable: boolean;
  isVerified: boolean;
  safetyScore: number;
  vehicle: Vehicle;
}

export interface RecommendationDriver {
  driver: DriverDetails;
  fare: number;
  eta: number;
  distance: number;
  duration: number;
}

export interface Recommendation {
  driver: RecommendationDriver;
  fare: number;
  eta: number;
  score: number | null;
}

export interface ApiResponse {
  success: boolean;
  requirements: Requirements;
  route: RouteData;
  recommendations: Recommendation[];
}

export interface RideOptionsProps {
  recommendations: Recommendation[];

  pickup: string;
  destination: string;

  rideType: string;
  passengers: number;

  // FIXED: boolean, not number
  luggage: boolean;

  // FIXED: optional, same as Requirements
  pickupCoordinates?: {
    latitude: number;
    longitude: number;
  };

  // FIXED: optional, same as Requirements
  destinationCoordinates?: {
    latitude: number;
    longitude: number;
  };

  onBookingAccepted?: (booking: ActiveRideBooking) => void;
}

export interface LocationData {
  address: string;
  latitude: number;
  longitude: number;
}

export interface Booking {
  _id: string;

  user: string;

  driver?: string;

  pickup: LocationData;

  destination: LocationData;

  route?: {
    distance: number;
    duration: number;
  };

  rideType: string;

  passengers: number;

  luggage: boolean;

  distance: number;

  estimatedDuration: number;

  fare: number;

  status:
    | "requested"
    | "accepted"
    | "rejected"
    | "cancelled"
    | "ongoing"
    | "started"
    | "completed"
    | string;

  requestedAt?: string;

  createdAt: string;

  updatedAt?: string;
}

export type BookingStatus =
  | "requested"
  | "accepted"
  | "rejected"
  | "cancelled"
  | "ongoing"
  | "started"
  | "completed"
  | null;
