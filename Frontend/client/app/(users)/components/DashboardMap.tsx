"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Car, Clock3, LocateFixed, MapPin, Minus, Navigation, Plus, Radio } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { socket } from "@/app/lib/socket";
import { GetBookingStatus } from "../Services/ai.api";
import type { Icon } from "leaflet";
import type { Booking, BookingStatusResponse, DashboardMapProps, DriverLocationEvent, LeafletIcons, LiveLocation, Location } from "../types/dashboard-map.types";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

function createLeafletIcons(L: typeof import("leaflet")): LeafletIcons {
  const pickupIcon = L.divIcon({
    className: "",
    html: `<div style="width:40px;height:40px;border-radius:50%;background:white;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 15px rgba(0,0,0,0.25);border:3px solid #fed7aa;"><div style="width:28px;height:28px;border-radius:50%;background:#f97316;display:flex;align-items:center;justify-content:center;color:white;font-size:16px;">📍</div></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const destinationIcon = L.divIcon({
    className: "",
    html: `<div style="width:40px;height:40px;border-radius:50%;background:white;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 15px rgba(0,0,0,0.25);border:3px solid #d1fae5;"><div style="width:28px;height:28px;border-radius:50%;background:#10b981;display:flex;align-items:center;justify-content:center;color:white;font-size:16px;">📍</div></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const userLocationIcon = L.divIcon({
    className: "",
    html: `<div style="width:42px;height:42px;border-radius:50%;background:white;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 15px rgba(0,0,0,0.3);border:3px solid #3b82f6;"><div style="width:28px;height:28px;border-radius:50%;background:#3b82f6;display:flex;align-items:center;justify-content:center;color:white;font-size:15px;">👤</div></div>`,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
  });

  const driverLocationIcon = L.divIcon({
    className: "",
    html: `<div style="width:46px;height:46px;border-radius:50%;background:white;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 18px rgba(0,0,0,0.3);border:3px solid #f97316;"><div style="width:32px;height:32px;border-radius:50%;background:#f97316;display:flex;align-items:center;justify-content:center;color:white;font-size:17px;">🚗</div></div>`,
    iconSize: [46, 46],
    iconAnchor: [23, 23],
  });

  return {
    pickupIcon,
    destinationIcon,
    userLocationIcon,
    driverLocationIcon,
  };
}

const MapController = dynamic(
  () =>
    import("react-leaflet").then(({ useMap }) => {
      function Controller({ pickup, destination }: { pickup: Location; destination: Location }) {
        const map = useMap();

        useEffect(() => {
          if (!map) return;

          const bounds = [
            [pickup.latitude, pickup.longitude],
            [destination.latitude, destination.longitude],
          ] as [[number, number], [number, number]];

          map.fitBounds(bounds, {
            padding: [60, 60],
          });
        }, [map, pickup, destination]);

        return null;
      }

      return Controller;
    }),
  { ssr: false }
);

const CurrentLocationController = dynamic(
  () =>
    import("react-leaflet").then(({ useMap }) => {
      function Controller({ trigger, userLocation }: { trigger: number; userLocation: LiveLocation | null }) {
        const map = useMap();

        useEffect(() => {
          if (!trigger || !userLocation || !map) return;

          map.flyTo([userLocation.latitude, userLocation.longitude], 16, { duration: 1 });
        }, [trigger, userLocation, map]);

        return null;
      }

      return Controller;
    }),
  { ssr: false }
);

const ZoomControls = dynamic(
  () =>
    import("react-leaflet").then(({ useMap }) => {
      function Controls() {
        const map = useMap();

        return (
          <div className="absolute bottom-5 right-5 z-[1000] hidden flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg sm:flex">
            <button type="button" onClick={() => map.zoomIn()} className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:bg-orange-50 hover:text-orange-500" aria-label="Zoom in">
              <Plus size={18} />
            </button>

            <div className="h-px bg-slate-200" />

            <button type="button" onClick={() => map.zoomOut()} className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:bg-orange-50 hover:text-orange-500" aria-label="Zoom out">
              <Minus size={18} />
            </button>
          </div>
        );
      }

      return Controls;
    }),
  { ssr: false }
);

export default function DashboardMap({ booking }: DashboardMapProps) {
  const [leafletIcons, setLeafletIcons] = useState<LeafletIcons | null>(null);
  const [leafletReady, setLeafletReady] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<LiveLocation | null>(null);
  const [driverLocation, setDriverLocation] = useState<LiveLocation | null>(null);
  const [centerTrigger, setCenterTrigger] = useState<number>(0);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(booking ?? null);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(booking ?? null);

  useEffect(() => {
    if (!booking) return;

    setActiveBooking(booking);
    setCurrentBooking(booking);
  }, [booking]);

  useEffect(() => {
    const handleBookingAccepted = (event: Event): void => {
      const customEvent = event as CustomEvent<Booking>;
      const acceptedBooking = customEvent.detail;

      if (!acceptedBooking?._id) return;

      // console.log("DashboardMap received accepted booking:", acceptedBooking._id);

      setActiveBooking(acceptedBooking);
      setCurrentBooking(acceptedBooking);

      localStorage.setItem("navgati_active_booking", JSON.stringify(acceptedBooking));
      localStorage.setItem("navgati_active_booking_id", acceptedBooking._id);
    };

    window.addEventListener("navgati-booking-accepted", handleBookingAccepted);

    return () => {
      window.removeEventListener("navgati-booking-accepted", handleBookingAccepted);
    };
  }, []);

  useEffect(() => {
    if (booking) return;

    const savedBooking = localStorage.getItem("navgati_active_booking");

    if (!savedBooking) return;

    try {
      const parsedBooking = JSON.parse(savedBooking) as Booking;

      if (parsedBooking?._id && ["accepted", "ongoing"].includes(parsedBooking.status)) {
        setActiveBooking(parsedBooking);
        setCurrentBooking(parsedBooking);
      }
    } catch (error: unknown) {
      // console.error("Failed to restore saved booking:", error);
    }
  }, [booking]);

  useEffect(() => {
    if (booking || activeBooking) return;

    const savedBookingId = localStorage.getItem("navgati_active_booking_id");

    if (!savedBookingId) return;

    let cancelled = false;

    const restoreBooking = async (): Promise<void> => {
      try {
        const response = (await GetBookingStatus({ bookingID: savedBookingId })) as BookingStatusResponse;
        const restoredBooking = response?.booking;

        if (cancelled || !restoredBooking?._id) return;

        if (["accepted", "ongoing"].includes(restoredBooking.status)) {
          setActiveBooking(restoredBooking);
          setCurrentBooking(restoredBooking);

          localStorage.setItem("navgati_active_booking", JSON.stringify(restoredBooking));
        }
      } catch (error: unknown) {
        // console.error("Failed to restore active booking:", error);
      }
    };

    void restoreBooking();

    return () => {
      cancelled = true;
    };
  }, [booking, activeBooking]);

  useEffect(() => {
    let cancelled = false;

    import("leaflet")
      .then((module) => {
        if (cancelled) return;

        const L = module.default;

        delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;

        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        setLeafletIcons(createLeafletIcons(L));
        setLeafletReady(true);
      })
      .catch((error: unknown) => {
        // console.error("Failed to load Leaflet:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const pickup = currentBooking?.pickup;
  const destination = currentBooking?.destination;

  useEffect(() => {
    if (!currentBooking?._id || !["accepted", "ongoing"].includes(currentBooking.status)) return;

    if (!navigator.geolocation) {
      // console.error("Geolocation is not supported by this browser.");
      return;
    }

    const bookingId = currentBooking._id;

    socket.emit("join-booking", { bookingId });

    const watchId = navigator.geolocation.watchPosition(
      (position: GeolocationPosition): void => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        const location: LiveLocation = {
          latitude,
          longitude,
          accuracy,
        };

        setUserLocation(location);

        socket.emit("location-update", {
          bookingId,
          userType: "user",
          latitude,
          longitude,
          accuracy,
        });
      },
      (error: GeolocationPositionError): void => {
        // console.error("User location error:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 10000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.emit("leave-booking", { bookingId });
    };
  }, [currentBooking?._id, currentBooking?.status]);

  useEffect(() => {
    if (!currentBooking?._id || !["accepted", "ongoing"].includes(currentBooking.status)) return;

    const bookingId = currentBooking._id;

    const handleDriverLocation = (location: DriverLocationEvent): void => {
      if (location.userType !== "driver") return;
      if (location.bookingId && location.bookingId !== bookingId) return;

      // console.log("Driver location received:", location.latitude, location.longitude);

      setDriverLocation({
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
      });
    };

    socket.on("location-update", handleDriverLocation);

    return () => {
      socket.off("location-update", handleDriverLocation);
    };
  }, [currentBooking?._id, currentBooking?.status]);

  useEffect(() => {
    setUserLocation(null);
    setDriverLocation(null);
  }, [currentBooking?._id]);

  if (!currentBooking) {
    return (
      <section className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm sm:h-[480px] lg:h-[520px]">
        <div className="px-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
            <Navigation size={28} className="text-orange-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Your ride map</h3>
          <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">Enter your trip details and choose a driver to start your ride.</p>
        </div>
      </section>
    );
  }

  if (!pickup || !destination || pickup.latitude == null || pickup.longitude == null || destination.latitude == null || destination.longitude == null) {
    return (
      <section className="flex h-[420px] items-center justify-center rounded-3xl bg-slate-100 sm:h-[480px] lg:h-[520px]">
        <div className="text-center">
          <MapPin size={30} className="mx-auto mb-3 text-slate-400" />
          <p className="text-sm font-medium text-slate-600">Location data unavailable</p>
        </div>
      </section>
    );
  }

  if (!["accepted", "ongoing"].includes(currentBooking.status)) {
    return (
      <section className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm sm:h-[480px] lg:h-[520px]">
        <div className="px-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
            <Car size={28} className="text-orange-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Waiting for driver</h3>
          <p className="mt-1 text-sm text-slate-500">Your ride request has been sent to the driver.</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-orange-500 shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
            Waiting for acceptance
          </div>
        </div>
      </section>
    );
  }

  if (!leafletReady || !leafletIcons) {
    return (
      <section className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm sm:h-[480px] lg:h-[520px]">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-orange-500" />
          <p className="text-sm font-medium text-slate-600">Loading map...</p>
        </div>
      </section>
    );
  }

  const center: [number, number] = [pickup.latitude, pickup.longitude];

  return (
    <section className="relative h-[420px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm sm:h-[480px] lg:h-[520px]">
      <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapController pickup={pickup} destination={destination} />

        <CurrentLocationController trigger={centerTrigger} userLocation={userLocation} />

        <Marker position={[pickup.latitude, pickup.longitude]} icon={leafletIcons.pickupIcon}>
          <Popup>
            <strong>Pickup</strong>
            <br />
            {pickup.address}
          </Popup>
        </Marker>

        <Marker position={[destination.latitude, destination.longitude]} icon={leafletIcons.destinationIcon}>
          <Popup>
            <strong>Destination</strong>
            <br />
            {destination.address}
          </Popup>
        </Marker>

        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]} icon={leafletIcons.userLocationIcon}>
            <Popup>
              <strong>You</strong>
              <br />
              Live location
            </Popup>
          </Marker>
        )}

        {driverLocation && (
          <Marker position={[driverLocation.latitude, driverLocation.longitude]} icon={leafletIcons.driverLocationIcon}>
            <Popup>
              <strong>Driver</strong>
              <br />
              {currentBooking.driver?.username || "Your driver"}
              <br />
              <span>Live location</span>
            </Popup>
          </Marker>
        )}

        <ZoomControls />
      </MapContainer>

      <div className="absolute left-4 right-4 top-4 z-[1000] flex items-start justify-between sm:left-5 sm:right-5 sm:top-5">
        <div className="rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Navigation size={16} className="text-orange-500" />
            <span className="text-xs font-bold text-slate-800">Your route</span>
          </div>
          <p className="mt-1 max-w-[230px] text-[11px] text-slate-500 sm:max-w-none">{pickup.address} → {destination.address}</p>
        </div>

        <button type="button" onClick={() => setCenterTrigger((prev) => prev + 1)} disabled={!userLocation} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/70 bg-white/95 text-slate-600 shadow-lg backdrop-blur-md transition hover:bg-white hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Current location">
          <LocateFixed size={19} />
        </button>
      </div>

      <div className="absolute left-4 top-[105px] z-[1000] sm:left-5">
        <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-md">
          <Radio size={14} className={driverLocation ? "text-green-500" : "text-orange-500"} />
          <span className="text-[11px] font-bold text-slate-700">{driverLocation ? "Driver is live" : "Connecting to driver..."}</span>
        </div>
      </div>

      {currentBooking.driver && (
        <div className="absolute right-4 top-[105px] z-[1000] hidden rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md sm:block">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100">
              <Car size={18} className="text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">{currentBooking.driver.username}</p>
              <p className="text-[10px] text-slate-500">{currentBooking.driver.vehicle ? `${currentBooking.driver.vehicle.brand} ${currentBooking.driver.vehicle.model}` : "Your driver"}</p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 z-[1000] sm:bottom-5 sm:left-5 sm:right-auto">
        <div className="rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <Clock3 size={18} />
            </div>
            <div>
              <p className="text-[10px] font-medium text-slate-400">Estimated travel time</p>
              <p className="text-base font-extrabold text-slate-900">{currentBooking.estimatedDuration} min</p>
            </div>
            <div className="ml-2 h-8 w-px bg-slate-200" />
            <div>
              <p className="text-[10px] font-medium text-slate-400">Distance</p>
              <p className="text-sm font-bold text-slate-800">{currentBooking.distance} km</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}