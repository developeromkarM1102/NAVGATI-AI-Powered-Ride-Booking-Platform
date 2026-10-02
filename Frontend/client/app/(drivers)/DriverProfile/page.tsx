"use client";

import { useEffect, useState } from "react";
import { UserRound, Car, ShieldCheck, Star, Phone, Mail, Pencil, CheckCircle2, Clock3, Save, X, CreditCard, CalendarDays, Hash, Palette, Users, CircleDot, LogOut, BadgeCheck } from "lucide-react";
import { DriverGetMe, DriverLogout } from "../../(auth)/Services/driverAuth.api";
import { Vehicle, Driver, DriverResponse } from "../../(drivers)/types/driver.types";

export default function DriverProfilePage() {
  const [driver, setDriver] = useState<Driver | null>(null);

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        setLoading(true);
        setError("");

        const response: DriverResponse = await DriverGetMe();

        if (response.success && response.driver) {
          const driverData = response.driver;

          setDriver(driverData);
          setName(driverData.username);
          setPhone(driverData.phone);
          setEmail(driverData.email);
        } else {
          setError("Failed to load driver profile.");
        }
      } catch (err) {
        // console.error("Failed to fetch driver profile:", err);
        setError("Failed to load driver profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchDriver();
  }, []);

  const handleSave = () => {
    if (!driver) return;

    setDriver({
      ...driver,
      username: name,
      phone,
      email,
    });

    setEditing(false);
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await DriverLogout();

      window.location.href = "/Driver/login";
    } catch (error) {
      // console.error("Driver logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatVehicleType = (type: string) => {
    if (!type) return "Vehicle";

    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const formatRegistration = (registration: string) => {
    if (!registration) return "Not available";

    return registration.replace(
      /^([A-Z]{2})(\d{2})([A-Z]{2})(\d{4})$/,
      "$1 $2 $3 $4"
    );
  };

  if (loading) {
    return (
      <section className=" mt-5 flex min-h-[500px] items-center justify-center bg-slate-50 p-4">
        <div className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
            <UserRound size={24} />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-600">
            Loading driver profile...
          </p>
        </div>
      </section>
    );
  }

  if (error || !driver) {
    return (
      <section className="flex min-h-[500px] items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            <X size={20} />
          </div>

          <p className="mt-4 text-sm font-bold text-red-600">
            {error || "Driver profile not found."}
          </p>
        </div>
      </section>
    );
  }

  const driverSince = new Date(driver.createdAt).getFullYear();

  return (
    <section className="mt-20 min-h-screen w-full bg-blue-50 px-3 pb-10 pt-4 sm:px-5 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-5">

        {/* PAGE HEADER */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-500">
              Driver Account
            </p>

            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              My Profile
            </h1>

            <p className="mt-1 text-xs text-slate-400">
              Manage your NavGati driver account and vehicle information.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-fit items-center gap-2 rounded-xl border border-red-100 bg-white px-4 py-2.5 text-xs font-bold text-red-500 transition hover:border-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut size={14} />

            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>

        {/* PROFILE HERO */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* COVER */}
          <div className="relative h-32 overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 sm:h-40">
            <div className="absolute -right-10 -top-20 h-52 w-52 rounded-full bg-white/10" />

            <div className="absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-white/10" />

            <div className="absolute bottom-4 left-5">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-bold text-white backdrop-blur-sm">
                NavGati Driver
              </span>
            </div>
          </div>

          {/* PROFILE CONTENT */}
          <div className="relative px-4 pb-6 sm:px-6">

            <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              {/* DRIVER */}
              <div className="flex min-w-0 items-end gap-4">

                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-br from-orange-400 to-orange-600 text-4xl font-extrabold uppercase text-white shadow-lg">
                  {driver.username?.charAt(0) || "D"}
                </div>

                <div className="min-w-0 pb-1">

                  <div className="flex flex-wrap items-center gap-2">

                    <h2 className="break-all text-xl font-extrabold text-slate-900">
                      {driver.username}
                    </h2>

                    {driver.isVerified && (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600">
                        <CheckCircle2 size={11} />
                        Verified
                      </span>
                    )}

                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-3">

                    <span className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Star
                        size={11}
                        className="fill-amber-400 text-amber-400"
                      />

                      {Number(driver.rating || 0).toFixed(1)} rating
                    </span>

                    <span className="text-slate-300">
                      •
                    </span>

                    <span className="text-[10px] text-slate-400">
                      Driver since {driverSince}
                    </span>

                  </div>
                </div>
              </div>

              {/* EDIT */}
              <button
                type="button"
                onClick={() => setEditing(!editing)}
                className="flex w-fit shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
              >
                {editing ? (
                  <>
                    <X size={14} />
                    Cancel
                  </>
                ) : (
                  <>
                    <Pencil size={14} />
                    Edit Profile
                  </>
                )}
              </button>

            </div>
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

          <ProfileStat
            icon={<Star size={17} />}
            label="Rating"
            value={Number(driver.rating || 0).toFixed(1)}
          />

          <ProfileStat
            icon={<Car size={17} />}
            label="Total Rides"
            value={driver.totalRides.toLocaleString()}
          />

          <ProfileStat
            icon={<ShieldCheck size={17} />}
            label="Safety Score"
            value={driver.safetyScore.toString()}
          />

          <ProfileStat
            icon={<CircleDot size={17} />}
            label="Availability"
            value={driver.isAvailable ? "Online" : "Offline"}
          />

        </div>

        {/* PERSONAL INFORMATION */}
        <ProfileSection
          icon={<UserRound size={18} />}
          title="Personal Information"
          description="Your driver account details"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <ProfileField
              icon={<UserRound size={15} />}
              label="Username"
              value={name}
              editing={editing}
              onChange={setName}
            />

            <ProfileField
              icon={<Phone size={15} />}
              label="Phone Number"
              value={phone}
              editing={editing}
              onChange={setPhone}
            />

            <ProfileField
              icon={<Mail size={15} />}
              label="Email Address"
              value={email}
              editing={editing}
              onChange={setEmail}
            />

          </div>

          {editing && (
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="flex h-11 items-center gap-2 rounded-xl bg-orange-500 px-5 text-xs font-bold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600"
              >
                <Save size={15} />
                Save Changes
              </button>
            </div>
          )}
        </ProfileSection>

        {/* LICENSE */}
        <ProfileSection
          icon={<CreditCard size={18} />}
          title="Driving License"
          description="License information registered with NavGati"
          iconClass="bg-blue-50 text-blue-500"
        >
          <div className="grid gap-4 sm:grid-cols-2">

            <InfoField
              icon={<CreditCard size={15} />}
              label="License Number"
              value={driver.licenseNumber}
            />

            <InfoField
              icon={<CalendarDays size={15} />}
              label="License Expiry"
              value={formatDate(driver.licenseExpiry)}
            />

          </div>
        </ProfileSection>

        {/* VEHICLE */}
        <ProfileSection
          icon={<Car size={18} />}
          title="Vehicle Information"
          description="Vehicle registered with NavGati"
          iconClass="bg-blue-50 text-blue-500"
          action={
            driver.isVerified && (
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-bold text-emerald-600">
                <CheckCircle2 size={11} />
                Verified
              </span>
            )
          }
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

            <InfoField
              icon={<Car size={15} />}
              label="Vehicle Type"
              value={formatVehicleType(driver.vehicle.type)}
            />

            <InfoField
              icon={<Car size={15} />}
              label="Brand"
              value={driver.vehicle.brand}
            />

            <InfoField
              icon={<Car size={15} />}
              label="Model"
              value={driver.vehicle.model}
            />

            <InfoField
              icon={<Hash size={15} />}
              label="Registration Number"
              value={formatRegistration(
                driver.vehicle.registrationNumber
              )}
            />

            <InfoField
              icon={<Palette size={15} />}
              label="Color"
              value={driver.vehicle.color}
            />

            <InfoField
              icon={<Users size={15} />}
              label="Seats"
              value={`${driver.vehicle.seats} passengers`}
            />

          </div>
        </ProfileSection>

        {/* VERIFICATION */}
        <ProfileSection
          icon={<ShieldCheck size={18} />}
          title="Account & Verification"
          description="Current driver account status"
          iconClass="bg-emerald-50 text-emerald-500"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            <StatusField
              label="Verification Status"
              value={driver.isVerified ? "Verified" : "Not Verified"}
              active={driver.isVerified}
            />

            <StatusField
              label="Availability"
              value={driver.isAvailable ? "Available" : "Unavailable"}
              active={driver.isAvailable}
            />

            <StatusField
              label="Safety Score"
              value={`${driver.safetyScore}`}
              active={driver.safetyScore > 0}
            />

          </div>
        </ProfileSection>

        {/* ACCOUNT INFORMATION */}
        <ProfileSection
          icon={<Clock3 size={18} />}
          title="Account Information"
          description="Backend account record information"
          iconClass="bg-slate-100 text-slate-500"
        >
          <div className="grid gap-4 sm:grid-cols-2">

            <InfoField
              icon={<CalendarDays size={15} />}
              label="Account Created"
              value={formatDateTime(driver.createdAt)}
            />

            <InfoField
              icon={<Clock3 size={15} />}
              label="Last Updated"
              value={formatDateTime(driver.updatedAt)}
            />

          </div>
        </ProfileSection>

        {/* LOGOUT */}
        <div className="rounded-2xl border border-red-100 bg-white p-4 shadow-sm sm:p-6">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Sign out of NavGati
              </h3>

              <p className="mt-1 text-[10px] text-slate-400">
                End your current driver session on this device.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex w-fit items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut size={14} />

              {loggingOut
                ? "Logging out..."
                : "Logout"}
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}

/* PROFILE SECTION */

function ProfileSection({
  icon,
  title,
  description,
  children,
  iconClass = "bg-orange-50 text-orange-500",
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  iconClass?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div className="flex items-center gap-3">

          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
          >
            {icon}
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {title}
            </h3>

            <p className="mt-1 text-[10px] text-slate-400">
              {description}
            </p>
          </div>

        </div>

        {action}
      </div>

      <div className="mt-5">
        {children}
      </div>

    </div>
  );
}

/* PROFILE FIELD */

function ProfileField({
  icon,
  label,
  value,
  editing,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold text-slate-500">
        {label}
      </label>

      <div className="relative">

        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          disabled={!editing}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-11 w-full rounded-xl border pl-10 pr-3 text-xs outline-none transition ${editing
              ? "border-orange-300 bg-white text-slate-800 focus:ring-4 focus:ring-orange-50"
              : "border-slate-200 bg-slate-50 text-slate-600"
            }`}
        />

      </div>
    </div>
  );
}

/* INFO FIELD */

function InfoField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-orange-100 hover:bg-orange-50/30">

      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <p className="text-[9px] font-medium">
          {label}
        </p>
      </div>

      <p className="mt-2 break-all text-xs font-bold text-slate-800">
        {value}
      </p>

    </div>
  );
}

/* STATUS FIELD */

function StatusField({
  label,
  value,
  active,
}: {
  label: string;
  value: string;
  active: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${active
          ? "border-emerald-100 bg-emerald-50/50"
          : "border-slate-200 bg-slate-50"
        }`}
    >
      <p className="text-[9px] font-medium text-slate-400">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2">

        <span
          className={`h-2 w-2 rounded-full ${active
              ? "bg-emerald-500"
              : "bg-slate-400"
            }`}
        />

        <p
          className={`text-xs font-bold ${active
              ? "text-emerald-600"
              : "text-slate-600"
            }`}
        >
          {value}
        </p>

      </div>
    </div>
  );
}

/* PROFILE STAT */

function ProfileStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:shadow-md">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
        {icon}
      </div>

      <p className="mt-4 text-[10px] font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-all text-lg font-extrabold text-slate-900">
        {value}
      </p>

    </div>
  );
}