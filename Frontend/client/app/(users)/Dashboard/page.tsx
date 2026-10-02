"use client";

import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import DashboardMap from "../components/DashboardMap";
import AIBooking from "../components/AIBooking";
import RecentTrips from "../components/RecentTrips";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:ml-[270px]">

        <DashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="w-full p-3 sm:p-4 md:p-6 lg:p-8">

          <div className="mx-auto w-full max-w-[1600px] space-y-4 sm:space-y-5 lg:space-y-6">

            <section className="w-full">
              <AIBooking />
            </section>

            <section className="w-full">
              <DashboardMap />
            </section>

            <section className="w-full lg:grid-cols-2 lg:gap-6">

              <div className="min-w-0">
                <RecentTrips />
              </div>

            </section>

          </div>

        </main>
      </div>
    </div>
  );
}