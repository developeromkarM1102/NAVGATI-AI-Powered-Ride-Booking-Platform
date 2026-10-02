"use client";

import { useState } from "react";
import DriverSidebar, { DriverSection } from "@/app/(drivers)/components/DriverSidebar";
import DriverDashboardHeader from "@/app/(drivers)/components/DriverDashboardHeader";
import DriverOverview from "@/app/(drivers)/components/DriverOverview/DriverOverview";
import RideRequest from "@/app/(drivers)/components/RideRequest/RideRequest";
import DriverEarnings from "@/app/(drivers)/components/DriverEarnings/DriverEarnings";
import DriverSafety from "@/app/(drivers)/components/DriverSafety";

export default function DriverDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeSection, setActiveSection] =
    useState<DriverSection>("dashboard");

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">

      <DriverSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <div className="min-w-0 lg:pl-[270px]">

        <DriverDashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="w-full p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">

            {activeSection === "dashboard" && (
              <div className="space-y-4 sm:space-y-6">
                <DriverOverview />

                <RideRequest />

              </div>
            )}

            {activeSection === "requests" && (
              <div className="w-full">
                <RideRequest />
              </div>
            )}

            {activeSection === "earnings" && (
              <div className="w-full">
                <DriverEarnings />
              </div>
            )}

            {activeSection === "history" && (
              <div className="w-full">
                <DriverEarnings />
              </div>
            )}

            {activeSection === "ratings" && (
              <RatingsSection />
            )}

            {activeSection === "safety" && (
              <div className="w-full">
                <DriverSafety />
              </div>
            )}

            {activeSection === "settings" && (
              <SettingsSection />
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

function RatingsSection() {
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">

      <p className="text-xs font-medium text-slate-400">
        Driver performance
      </p>

      <h2 className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
        Ratings & Reviews
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">

        <div className="rounded-xl bg-orange-50 p-4 sm:rounded-2xl sm:p-5">
          <p className="text-xs text-slate-500">
            Overall rating
          </p>

          <p className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            4.8 ⭐
          </p>
        </div>

        <div className="rounded-xl bg-emerald-50 p-4 sm:rounded-2xl sm:p-5">
          <p className="text-xs text-slate-500">
            Positive ratings
          </p>

          <p className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            96%
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 p-4 sm:rounded-2xl sm:p-5 sm:col-span-2 lg:col-span-1">
          <p className="text-xs text-slate-500">
            Total reviews
          </p>

          <p className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            1,284
          </p>
        </div>

      </div>
    </section>
  );
}

function SettingsSection() {
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">

      <p className="text-xs font-medium text-slate-400">
        Account preferences
      </p>

      <h2 className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
        Settings
      </h2>

      <div className="mt-5 space-y-3 sm:mt-6">

        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 xs:flex-row xs:items-center xs:justify-between sm:rounded-2xl">

          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-800">
              Ride request notifications
            </p>

            <p className="mt-1 text-[10px] leading-relaxed text-slate-400 sm:text-xs">
              Receive alerts for nearby ride requests.
            </p>
          </div>

          <div className="h-6 w-11 shrink-0 rounded-full bg-orange-500 p-1">
            <div className="ml-auto h-4 w-4 rounded-full bg-white shadow-sm" />
          </div>

        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 xs:flex-row xs:items-center xs:justify-between sm:rounded-2xl">

          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-800">
              Safety alerts
            </p>

            <p className="mt-1 text-[10px] leading-relaxed text-slate-400 sm:text-xs">
              Receive important safety notifications.
            </p>
          </div>

          <div className="h-6 w-11 shrink-0 rounded-full bg-orange-500 p-1">
            <div className="ml-auto h-4 w-4 rounded-full bg-white shadow-sm" />
          </div>

        </div>

      </div>
    </section>
  );
}