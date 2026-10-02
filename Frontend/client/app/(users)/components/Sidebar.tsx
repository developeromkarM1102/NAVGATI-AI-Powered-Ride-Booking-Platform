"use client";

import { useEffect, useState } from "react";
import { Home, Car, Clock3, CreditCard, Settings, User, LogOut, X, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserGetMe, UserLogout } from "../../(auth)/Services/userAuth.api";

const menuItems = [
    {
        label: "Home",
        icon: Home,
    },
    {
        label: "Book Ride",
        icon: Car,
    },
    {
        label: "Recent Trips",
        icon: Clock3,
    },
    {
        label: "Payments",
        icon: CreditCard,
    },
];

interface UserData {
    name?: string;
    username?: string;
    email?: string;
    profileImage?: string;
    role?: string;
}

export default function Sidebar({ isOpen, onClose }) {

    const router = useRouter();

    const [activeItem, setActiveItem] = useState("Dashboard");
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                
                const response = await UserGetMe();

                //console.log("Get Me Response:", response);

                if (!response?.success || response?.error) {
                    router.push("/User/login");
                    return;
                }

                setUser(response.user || response);
            } catch (error) {
                // console.error("Failed to get current user:", error);
                router.push("/User/login");
            } finally {
                setLoadingUser(false);
            }
        };

        getCurrentUser();
    }, [router]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleNavigation = (label) => {
        setActiveItem(label);
        onClose?.();

        if (label === "Home") {
            router.push("/")
        }

        if (label === "Book Ride") {
            router.push("/Dashboard/#BookRide");
        }

        if (label === "Recent Trips") {
            router.push("/Dashboard/#recent-trips");
        }

        if (label === "Saved Places") {
            router.push("/Dashboard");
        }

    };

    const handleLogout = async () => {
        try {
            setLoggingOut(true);

            const response = await UserLogout();

            // console.log("Logout Response:", response);

            if (response?.error) {
                // console.error("Logout failed:", response.error);
            }

            router.push("/User/login");
        } catch (error) {
            // console.error("Logout Error:", error);
            router.push("/User/login");
        } finally {
            setLoggingOut(false);
        }
    };

    const displayName = user?.name?.trim() || user?.username?.trim() || "User";
    const email = user?.email || "";
    const avatarLetter = displayName.charAt(0).toUpperCase();

    return (
        <>
            {isOpen && (
                <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden" />
            )}

            <aside className={`fixed left-0 top-0 z-[9999] flex h-[100dvh] w-[270px] max-w-[85vw] flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

                <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-slate-100 px-5">

                    <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-200">
                            <Sparkles size={20} className="text-white" />
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
                                Nav<span className="text-orange-500">Gati</span>
                            </h1>

                            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                Smart Mobility
                            </p>
                        </div>
                    </div>

                    <button type="button" onClick={onClose} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 active:scale-95 lg:hidden" aria-label="Close sidebar">
                        <X size={20} />
                    </button>
                </div>

                <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-6">

                    <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                        Main Menu
                    </p>

                    <div className="space-y-1.5">

                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const active = activeItem === item.label;

                            return (
                                <button
                                    key={item.label}
                                    type="button"
                                    onClick={() => handleNavigation(item.label)}
                                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${active ? "bg-orange-50 text-orange-600" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                                >
                                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${active ? "bg-orange-500 text-white shadow-md shadow-orange-200" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"}`}>
                                        <Icon size={18} />
                                    </div>

                                    <span className="truncate">
                                        {item.label}
                                    </span>

                                    {active && (
                                        <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                        Account
                    </p>

                    <div className="space-y-1.5">

                        <button
                            type="button"
                            onClick={() => {
                                onClose?.();
                                router.push("/Profile");
                            }}
                            className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                        >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 group-hover:bg-slate-200">
                                <User size={18} />
                            </div>

                            <span>Profile</span>
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                        >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 group-hover:bg-slate-200">
                                <Settings size={18} />
                            </div>

                            <span>Settings</span>
                        </button>
                    </div>
                </nav>

                <div className="shrink-0 px-4 pb-4">

                    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-4 text-white shadow-lg shadow-orange-200">

                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
                            <Sparkles size={18} />
                        </div>

                        <h3 className="text-sm font-bold">
                            Ride smarter with AI
                        </h3>

                        <p className="mt-1 text-[11px] leading-relaxed text-orange-50">
                            Let NavGati find the best ride, route and fare for you.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setActiveItem("Book Ride");
                                onClose?.();
                                router.push("/Dashboard");
                            }}
                            className="mt-3 rounded-lg bg-white px-3 py-2 text-xs font-bold text-orange-600 transition hover:bg-orange-50 active:scale-95"
                        >
                            Book with AI
                        </button>
                    </div>
                </div>

                <div className="shrink-0 border-t border-slate-100 p-4">

                    <div className="flex items-center gap-3">

                        {/* PROFILE IMAGE */}

                        {user?.profileImage ? (
                            <img
                                src={user.profileImage}
                                alt={displayName}
                                className="h-10 w-10 shrink-0 rounded-full object-cover shadow-sm"
                            />
                        ) : (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-sm font-bold text-white">
                                {loadingUser ? "..." : avatarLetter}
                            </div>
                        )}

                        {/* USER INFO */}

                        <div className="min-w-0 flex-1">

                            <p className="truncate text-sm font-bold text-slate-800">
                                {loadingUser
                                    ? "Loading..."
                                    : displayName}
                            </p>

                            <p className="truncate text-[11px] text-slate-400">
                                {loadingUser
                                    ? "Please wait..."
                                    : email}
                            </p>

                        </div>

                        {/* LOGOUT */}

                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={loggingOut}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                            title="Logout"
                            aria-label="Logout"
                        >
                            {loggingOut ? (
                                <span className="text-xs">
                                    ...
                                </span>
                            ) : (
                                <LogOut size={17} />
                            )}
                        </button>

                    </div>

                </div>
            </aside>
        </>
    );
}