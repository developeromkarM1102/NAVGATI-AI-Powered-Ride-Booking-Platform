"use client";

import { useEffect, useState } from "react";
import { Bell, Menu, MapPin, ChevronDown, X, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { DriverGetMe } from "../../(auth)/Services/driverAuth.api";
import {DriverDashboardHeaderProps, DriverData} from "../types/driver.types"

export default function DriverDashboardHeader({
  onMenuClick,
}: DriverDashboardHeaderProps) {

  const router = useRouter();

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [driver, setDriver] = useState<DriverData | null>(null);
  const [loadingDriver, setLoadingDriver] = useState(true);

  // GET CURRENT DRIVER

  useEffect(() => {
    const getCurrentDriver = async () => {
      try {
        const response = await DriverGetMe();

        // console.log("Driver Header GetMe:", response);

        // Driver is not authenticated
        if (!response?.success) {
          router.push("/Driver/login");
          return;
        }

        setDriver(response.driver || response);
      } catch (error) {
        // console.error(
        //   "Failed to get current driver:",
        //   error
        // );

        // Unauthorized
        if (error) {
          router.push("/Driver/login");
          return;
        }

        router.push("/Driver/login");
      } finally {
        setLoadingDriver(false);
      }
    };

    getCurrentDriver();
  }, [router]);

  // DRIVER DATA

  const username = driver?.username || "Driver";

  const avatarLetter = username
    .charAt(0)
    .toUpperCase();

  // UI

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
      <div className="flex h-[72px] items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LEFT */}

        <div className="flex items-center gap-3">

          {/* Mobile menu */}

          <button
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={21} />
          </button>

          {/* Welcome */}

          <div>
            <p className="text-xs font-medium text-slate-400 sm:text-sm">
              Have a Great Ride Today !👋
            </p>

            <h1 className="text-base font-bold text-slate-900 sm:text-lg">
              {loadingDriver
                ? "Loading..."
                : `Ready to drive, ${username}?`}
            </h1>
          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-2 sm:gap-4">

          {/* Driver status */}

          <div className="hidden items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 md:flex">

            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>

            <span className="text-xs font-bold text-emerald-600">
              Online
            </span>

          </div>

          {/* Location */}

          <div className="hidden items-center gap-2 rounded-xl bg-orange-50 px-3 py-2 md:flex">

            <MapPin
              size={16}
              className="text-orange-500"
            />

            <div className="leading-tight">

              <p className="text-[9px] font-medium text-slate-400">
                Current area
              </p>

              <p className="max-w-[110px] truncate text-xs font-bold text-slate-700">
                Navi Mumbai
              </p>

            </div>

            <ChevronDown
              size={14}
              className="text-slate-400"
            />

          </div>

          {/* Notifications */}

          <div className="relative">

            <button
              onClick={() =>
                setNotificationsOpen(
                  !notificationsOpen
                )
              }
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
              aria-label="Notifications"
            >
              <Bell size={19} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white" />
            </button>

            {/* Notification dropdown */}

            {notificationsOpen && (
              <div className="absolute right-0 top-12 w-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">

                  <h3 className="text-sm font-bold text-slate-900">
                    Notifications
                  </h3>

                  <button
                    onClick={() =>
                      setNotificationsOpen(false)
                    }
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X size={17} />
                  </button>

                </div>

                <div className="p-4">

                  <div className="rounded-xl bg-orange-50 p-3">

                    <p className="text-sm font-semibold text-slate-800">
                      New ride requests 🚗
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      You have nearby ride opportunities
                      waiting.
                    </p>

                  </div>
                  <div className="rounded-xl bg-orange-50 p-3">

                    <p className="text-sm font-semibold text-slate-800">
                      Feature Coming Soon...
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      Schedule a Ride with AI !! Stay Tune...
                    </p>

                  </div>

                </div>

              </div>
            )}

          </div>

          {/* DRIVER PROFILE */}

          <button
            onClick={() => router.push("/DriverProfile")}
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50"
          >

            {/* Avatar */}

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-sm font-bold text-white">
              {loadingDriver
                ? "..."
                : avatarLetter}
            </div>

            {/* Driver name */}

            <div className="hidden text-left sm:block">

              <p className="text-xs font-bold text-slate-800">
                {loadingDriver
                  ? "Loading..."
                  : username}
              </p>

              {/* Verified */}

              <div className="flex items-center gap-1">

                <ShieldCheck
                  size={11}
                  className="text-emerald-500"
                />

                <p className="text-[10px] text-slate-400">
                  Verified
                </p>

              </div>

            </div>

            <ChevronDown
              size={15}
              className="hidden text-slate-400 sm:block"
            />

          </button>

        </div>
      </div>
    </header>
  );
}