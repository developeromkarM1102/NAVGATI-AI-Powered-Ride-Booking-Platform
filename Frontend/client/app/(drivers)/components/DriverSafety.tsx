"use client";

import { useState } from "react";
import { ShieldCheck, UserCheck, Car, Phone, Share2, AlertTriangle, CheckCircle2, LockKeyhole, Eye, MapPin, ChevronRight, X, Siren } from "lucide-react";

const safetyItems = [
  {
    title: "Passenger verified",
    description: "Passenger identity has been verified.",
    icon: UserCheck,
    status: "Verified",
  },
  {
    title: "Vehicle protection",
    description: "Your vehicle and trip are registered.",
    icon: Car,
    status: "Active",
  },
  {
    title: "Trip tracking",
    description: "Your live location is being tracked.",
    icon: MapPin,
    status: "Active",
  },
  {
    title: "Emergency protection",
    description: "Emergency assistance is available.",
    icon: ShieldCheck,
    status: "Ready",
  },
];

export default function DriverSafety() {
  const [showSOS, setShowSOS] = useState(false);
  const [tripShared, setTripShared] = useState(false);

  return (
    <section className="space-y-5">

      {/*
          HEADER
      */}

      <div>
        <p className="text-xs font-medium text-slate-400">
          Your protection matters
        </p>

        <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
          Safety Center
        </h2>

        <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500">
          Manage your safety tools and see the protection available
          during your NavGati trips.
        </p>
      </div>

      {/*
          SAFETY STATUS
      */}

      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-5 text-white sm:p-6">

        {/* Decorative circles */}

        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-emerald-500/10" />

        <div className="pointer-events-none absolute -bottom-24 left-20 h-48 w-48 rounded-full bg-orange-500/5" />

        <div className="relative">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <ShieldCheck size={28} />
              </div>

              <div>

                <div className="flex flex-wrap items-center gap-2">

                  <h3 className="text-base font-bold">
                    Youre protected
                  </h3>

                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    ACTIVE
                  </span>

                </div>

                <p className="mt-1 max-w-md text-[11px] leading-relaxed text-slate-400">
                  Your current ride is protected with live trip
                  tracking and emergency assistance.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3">

              <LockKeyhole
                size={15}
                className="text-emerald-400"
              />

              <span className="text-[10px] font-semibold text-slate-300">
                Protected connection
              </span>

            </div>

          </div>

        </div>
      </div>

      {/*
          SAFETY CHECKS
      */}

      <div className="grid gap-3 sm:grid-cols-2">

        {safetyItems.map((item) => {

          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500 transition group-hover:bg-emerald-500 group-hover:text-white">
                  <Icon size={18} />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-center justify-between gap-2">

                    <h3 className="text-xs font-bold text-slate-800">
                      {item.title}
                    </h3>

                    <CheckCircle2
                      size={15}
                      className="shrink-0 text-emerald-500"
                    />

                  </div>

                  <p className="mt-1 text-[10px] leading-relaxed text-slate-400">
                    {item.description}
                  </p>

                  <span className="mt-2 inline-block text-[9px] font-bold text-emerald-600">
                    {item.status}
                  </span>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/*
          SAFETY ACTIONS
      */}

      <div className="grid gap-4 lg:grid-cols-3">

        {/* Share Trip */}

        <button
          onClick={() => setTripShared(!tripShared)}
          className={`rounded-2xl border p-5 text-left transition ${
            tripShared
              ? "border-emerald-200 bg-emerald-50"
              : "border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/40"
          }`}
        >

          <div className="flex items-center justify-between">

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                tripShared
                  ? "bg-emerald-500 text-white"
                  : "bg-orange-50 text-orange-500"
              }`}
            >
              <Share2 size={18} />
            </div>

            {tripShared && (
              <CheckCircle2
                size={17}
                className="text-emerald-500"
              />
            )}

          </div>

          <h3 className="mt-4 text-sm font-bold text-slate-800">
            {tripShared
              ? "Trip is being shared"
              : "Share live trip"}
          </h3>

          <p className="mt-1 text-[10px] leading-relaxed text-slate-400">
            Share your live location and trip details with
            someone you trust.
          </p>

        </button>

        {/* Emergency Contact */}

        <button className="rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-orange-200 hover:bg-orange-50/40">

          <div className="flex items-center justify-between">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
              <Phone size={18} />
            </div>

            <ChevronRight
              size={16}
              className="text-slate-300"
            />

          </div>

          <h3 className="mt-4 text-sm font-bold text-slate-800">
            Emergency contacts
          </h3>

          <p className="mt-1 text-[10px] leading-relaxed text-slate-400">
            Quickly contact your saved emergency contacts
            during a trip.
          </p>

        </button>

        {/* SOS */}

        <button
          onClick={() => setShowSOS(true)}
          className="rounded-2xl border border-red-100 bg-red-50 p-5 text-left transition hover:bg-red-100"
        >

          <div className="flex items-center justify-between">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-red-500 shadow-sm">
              <Siren size={18} />
            </div>

            <AlertTriangle
              size={16}
              className="text-red-400"
            />

          </div>

          <h3 className="mt-4 text-sm font-bold text-red-700">
            Emergency SOS
          </h3>

          <p className="mt-1 text-[10px] leading-relaxed text-red-500">
            Get immediate assistance if you feel unsafe or
            encounter an emergency.
          </p>

        </button>

      </div>

      {/*
          DRIVER VERIFICATION
      */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <Eye size={20} />
            </div>

            <div>

              <h3 className="text-sm font-bold text-slate-800">
                Driver verification
              </h3>

              <p className="mt-1 text-[10px] text-slate-400">
                Your NavGati driver profile is fully verified.
              </p>

            </div>

          </div>

          <div className="flex flex-wrap gap-2">

            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-bold text-emerald-600">
              <CheckCircle2 size={12} />
              Identity
            </span>

            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-bold text-emerald-600">
              <CheckCircle2 size={12} />
              Vehicle
            </span>

            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-bold text-emerald-600">
              <CheckCircle2 size={12} />
              Documents
            </span>

          </div>

        </div>

      </div>

      {/*
          SAFETY TIPS
      */}

      <div className="rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 p-5">

        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
            <ShieldCheck size={18} />
          </div>

          <div>

            <h3 className="text-xs font-bold text-slate-800">
              NavGati safety reminder
            </h3>

            <p className="mt-1 text-[10px] leading-relaxed text-slate-500">
              Never share sensitive account information with
              passengers. Keep your phone accessible and follow
              traffic and safety regulations while driving.
            </p>

          </div>

        </div>

      </div>

      {/*
          SOS MODAL
      */}

      {showSOS && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <Siren size={20} />
                </div>

                <div>

                  <h3 className="text-sm font-bold text-slate-900">
                    Emergency SOS
                  </h3>

                  <p className="text-[10px] text-slate-400">
                    Are you in immediate danger?
                  </p>

                </div>

              </div>

              <button
                onClick={() => setShowSOS(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={17} />
              </button>

            </div>

            {/* Content */}

            <div className="p-5">

              <div className="rounded-2xl bg-red-50 p-4">

                <div className="flex items-start gap-3">

                  <AlertTriangle
                    size={18}
                    className="mt-0.5 shrink-0 text-red-500"
                  />

                  <p className="text-[11px] leading-relaxed text-red-600">
                    Use SOS only during a genuine emergency.
                    Your current trip details and location can
                    be shared with emergency support.
                  </p>

                </div>

              </div>

              <button
                onClick={() => setShowSOS(false)}
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-500 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-600"
              >
                <Siren size={17} />
                Activate Emergency SOS
              </button>

              <button
                onClick={() => setShowSOS(false)}
                className="mt-2 h-11 w-full rounded-xl text-xs font-semibold text-slate-500 transition hover:bg-slate-50"
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}