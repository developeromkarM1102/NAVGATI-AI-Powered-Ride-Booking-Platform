// TYPES
export interface EarningsSummary {
  todayEarnings: number;
  weeklyEarnings: number;
  completedRides: number;
  averagePerRide: number;
  weeklyChange: number;
}

export interface WeeklyChartItem {
  day: string;
  earnings: number;
}

export interface RecentRide {
  id: string;
  passenger: string;
  name : string;
  pickup: string;
  destination: string;
  distance: number;
  duration: number;
  fare: number;
  time: string;
  status: string;
}

export interface EarningsData {
  summary: EarningsSummary;
  weeklyChart: WeeklyChartItem[];
  recentRides: RecentRide[];
}

export interface DriverEarningsResponse {
  success?: boolean;
  data?: EarningsData;
  error?: string;
  message?: string;
}

export type OverviewData = {
  todayEarnings: number;
  weeklyEarnings: number;
  completedRides: number;
  averagePerRide: number;
  weeklyChange: number;

  rating: number;
  totalRides: number;
  acceptanceRate: number;
  isAvailable: boolean;
};

export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

export interface Passenger {
  _id?: string;
  username?: string;
  email?: string;
  phone?: string;
  rating?: number;
  totalRides?: number;
  isVerified?: boolean;
}

export interface Booking {
  _id: string;
  driver: string | { _id: string };
  passenger?: Passenger;
  user?: Passenger;
  pickup: Location;
  destination: Location;
  rideType: string;
  passengers: number;
  luggage: number;
  distance: number;
  estimatedDuration: number;
  fare: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  acceptedAt?: string;
  startedAt?: string;
}

export type RideStatus =
  | "pending"
  | "accepted"
  | "ongoing"
  | "started"
  | "cancelled"
  | "declined";

export interface DriverLocation {
  latitude: number;
  longitude: number;
}

export interface PassengerLocation {
  latitude: number;
  longitude: number;
}

export interface PassengerLocationEvent {
  bookingId?: string;
  userType: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface RideStartedEvent {
  bookingId?: string;
}

export interface DriverDashboardHeaderProps {
  onMenuClick?: () => void;
}

export interface DriverData {
  username?: string;
  email?: string;
  role?: string;
}

export interface Vehicle {
    type: string;
    brand: string;
    model: string;
    registrationNumber: string;
    color: string;
    seats: number;
}

export interface Driver {
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
    createdAt: string;
    updatedAt: string;
    __v: number;
    vehicle: Vehicle;
}

export interface DriverResponse {
    success: boolean;
    driver: Driver;
}
