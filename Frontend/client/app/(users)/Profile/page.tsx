"use client";

import { useEffect, useState } from "react";
import {
    User,
    Mail,
    Phone,
    Shield,
    Calendar,
    MapPin,
    Pencil,
    LogOut,
    ChevronRight,
    Sparkles,
    Car,
    Wallet,
    Star,
    Loader2,
    CheckCircle2,
} from "lucide-react";

import {
    UserGetMe,
    UserLogout,
} from "../../(auth)/Services/userAuth.api";

interface UserData {
    _id: string;
    name?: string;
    username?: string;
    email: string;
    phone?: string;
    role: string;
    profileImage?: string;
    authProvider?: "local" | "google";
    createdAt: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await UserGetMe();

                if (response?.success) {
                    setUser(response.user);
                }
            } catch (error) {
                // console.error("Get User Error:", error);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);

    const handleLogout = async () => {
        if (loggingOut) return;

        try {
            setLoggingOut(true);

            const response = await UserLogout();

            if (response?.success) {
                window.location.href = "/";
            }
        } catch (error) {
            // console.error("Logout Error:", error);
        } finally {
            setLoggingOut(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                        <Loader2 size={22} className="animate-spin" />
                    </div>

                    <p className="text-sm font-medium text-slate-500">
                        Loading your profile...
                    </p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                        <User size={24} />
                    </div>

                    <h2 className="mt-4 text-lg font-bold text-slate-900">
                        Profile unavailable
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        We couldn't load your account information.
                    </p>
                </div>
            </div>
        );
    }

    const displayName =
        user.name ||
        user.username ||
        "NavGati User";

    const initials = displayName
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const isGoogleUser = user.authProvider === "google";

    return (
        <div className="min-h-screen bg-slate-50 px-4 pb-12 pt-24 md:px-8">
            <div className="mx-auto max-w-6xl">

                {/* HEADER */}
                <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-orange-500">
                            <Sparkles size={16} />

                            <span className="text-xs font-bold uppercase tracking-[0.18em]">
                                Account
                            </span>
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
                            My Profile
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage your NavGati account and preferences.
                        </p>
                    </div>

                    {/* LOGOUT */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="flex w-fit items-center gap-2 rounded-xl border border-red-100 bg-white px-4 py-2.5 text-sm font-semibold text-red-500 shadow-sm transition hover:border-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loggingOut ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <LogOut size={16} />
                        )}

                        {loggingOut ? "Logging out..." : "Logout"}
                    </button>
                </div>

                {/* PROFILE HERO */}
                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

                    {/* COVER */}
                    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600">
                        <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[45px] border-white/10" />

                        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-[55px] border-white/10" />

                        <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                            NavGati Member
                        </div>
                    </div>

                    {/* PROFILE CONTENT */}
                    <div className="px-5 pb-7 md:px-8">

                        {/* AVATAR + ACTION */}
                        <div className="-mt-16 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                            <div className="relative w-fit">
                                {user.profileImage ? (
                                    <img
                                        src={user.profileImage}
                                        alt={displayName}
                                        className="h-32 w-32 rounded-[28px] border-4 border-white object-cover shadow-xl"
                                    />
                                ) : (
                                    <div className="flex h-32 w-32 items-center justify-center rounded-[28px] border-4 border-white bg-gradient-to-br from-orange-400 to-orange-600 text-3xl font-extrabold text-white shadow-xl">
                                        {initials}
                                    </div>
                                )}

                                <div className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-emerald-500 text-white">
                                    <CheckCircle2 size={13} />
                                </div>
                            </div>

                            <button
                                type="button"
                                className="flex w-fit items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md"
                            >
                                <Pencil size={15} />
                                Edit Profile
                            </button>
                        </div>

                        {/* NAME */}
                        <div className="mt-5">
                            <div className="flex flex-wrap items-center gap-3">
                                <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
                                    {displayName}
                                </h2>

                                {isGoogleUser && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
                                        <CheckCircle2 size={12} />
                                        Google Account
                                    </span>
                                )}
                            </div>

                            <p className="mt-1 text-sm text-slate-400">
                                {user.email}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold capitalize text-orange-600">
                                    <Shield size={13} />
                                    {user.role}
                                </span>

                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                                    <CheckCircle2 size={13} />
                                    Active Account
                                </span>
                            </div>
                        </div>

                        {/* DETAILS */}
                        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                            <InfoCard
                                icon={<Mail size={18} />}
                                label="Email Address"
                                value={user.email}
                            />

                            <InfoCard
                                icon={<Phone size={18} />}
                                label="Phone Number"
                                value={user.phone || "Not added"}
                            />

                            <InfoCard
                                icon={<Calendar size={18} />}
                                label="Member Since"
                                value={new Date(
                                    user.createdAt
                                ).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            />

                            <InfoCard
                                icon={<MapPin size={18} />}
                                label="Saved Locations"
                                value="0 Locations"
                            />

                        </div>
                    </div>
                </div>

                {/* STATS */}
                <div className="mt-6 grid gap-4 sm:grid-cols-3">

                    <StatCard
                        icon={<Car size={20} />}
                        value="12"
                        label="Total Trips"
                    />

                    <StatCard
                        icon={<Star size={20} />}
                        value="4.9"
                        label="Average Rating"
                    />

                    <StatCard
                        icon={<Wallet size={20} />}
                        value="₹2,450"
                        label="Money Saved"
                    />

                </div>

                {/* SETTINGS */}
                <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-100 px-6 py-5">
                        <h3 className="text-lg font-bold text-slate-900">
                            Account Settings
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                            Manage your account preferences and security.
                        </p>
                    </div>

                    <div className="divide-y divide-slate-100">

                        <SettingButton
                            icon={<User size={18} />}
                            title="Personal Information"
                            description="Update your name, phone number and profile details."
                        />

                        <SettingButton
                            icon={<MapPin size={18} />}
                            title="Saved Locations"
                            description="Manage your home, work and favorite locations."
                        />

                        <SettingButton
                            icon={<Wallet size={18} />}
                            title="Payment Methods"
                            description="Manage your preferred payment methods."
                        />

                        <SettingButton
                            icon={<Shield size={18} />}
                            title="Privacy & Security"
                            description="Manage your account security and privacy settings."
                        />

                    </div>
                </div>

                {/* DANGER ZONE */}
                <div className="mt-6 rounded-[28px] border border-red-100 bg-red-50/50 p-6">

                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div>
                            <h3 className="text-sm font-bold text-red-700">
                                Sign out of NavGati
                            </h3>

                            <p className="mt-1 text-xs text-red-500/80">
                                Your current authentication session will be ended.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={loggingOut}
                            className="flex w-fit items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loggingOut ? (
                                <Loader2
                                    size={15}
                                    className="animate-spin"
                                />
                            ) : (
                                <LogOut size={15} />
                            )}

                            {loggingOut
                                ? "Signing out..."
                                : "Sign out"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

/* INFO CARD */

function InfoCard({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value?: string;
}) {
    return (
        <div className="group rounded-2xl border border-slate-200 bg-slate-50/40 p-4 transition hover:border-orange-200 hover:bg-orange-50/40">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
                {icon}
            </div>

            <p className="text-[11px] font-medium text-slate-400">
                {label}
            </p>

            <p className="mt-1 truncate text-sm font-bold text-slate-800">
                {value || "Not available"}
            </p>
        </div>
    );
}

/* SETTING BUTTON */

function SettingButton({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <button
            type="button"
            className="group flex w-full items-center gap-4 px-6 py-5 text-left transition hover:bg-orange-50/50"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-orange-100 group-hover:text-orange-500">
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-800">
                    {title}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                    {description}
                </p>
            </div>

            <ChevronRight
                size={18}
                className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-orange-500"
            />
        </button>
    );
}

/* STAT CARD */

function StatCard({
    icon,
    value,
    label,
}: {
    icon: React.ReactNode;
    value: string;
    label: string;
}) {
    return (
        <div className="group rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    {icon}
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                    NavGati
                </span>
            </div>

            <h2 className="mt-5 text-2xl font-extrabold text-slate-950">
                {value}
            </h2>

            <p className="mt-1 text-xs font-medium text-slate-400">
                {label}
            </p>
        </div>
    );
}