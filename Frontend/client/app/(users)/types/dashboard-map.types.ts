import type { Icon } from "leaflet";

export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

export interface LiveLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface Vehicle {
  type: string;
  brand: string;
  model: string;
  registrationNumber: string;
}

export interface Driver {
  username: string;
  vehicle?: Vehicle;
}

export type BookingStatus = "requested" | "accepted" | "ongoing" | "rejected" | "cancelled" | "completed" | string;

export interface Booking {
  _id: string;
  pickup: Location;
  destination: Location;
  route?: {
    distance: number;
    duration: number;
  };
  distance: number;
  estimatedDuration: number;
  fare: number;
  status: BookingStatus;
  driver?: Driver;
}

export interface DashboardMapProps {
  booking?: Booking | null;
}

export interface DriverLocationEvent extends LiveLocation {
  bookingId?: string;
  userType?: "driver" | "user" | string;
}

export interface BookingStatusResponse {
  success?: boolean;
  booking?: Booking;
  message?: string;
}

export interface LeafletIcons {
  pickupIcon: Icon;
  destinationIcon: Icon;
  userLocationIcon: Icon;
  driverLocationIcon: Icon;
}