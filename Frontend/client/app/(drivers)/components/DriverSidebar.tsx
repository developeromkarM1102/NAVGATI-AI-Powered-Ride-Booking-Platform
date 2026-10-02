"use client";

import { useEffect, useState } from "react";
import { LayoutDashboard, Navigation, Wallet, History, Star, ShieldCheck, Settings, User, LogOut, X, Car } from "lucide-react";
import { useRouter } from "next/navigation";
import { DriverGetMe, DriverLogout } from "../../(auth)/Services/driverAuth.api";

export type DriverSection =
  | "dashboard"
  | "requests"
  | "earnings"
  | "history"
  | "ratings"
  | "safety"
  | "profile"
  | "settings";

interface DriverSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: DriverSection;
  onSectionChange: (section: DriverSection) => void;
}

interface DriverData {
  username?: string;
  email?: string;
}

const menuItems = [
  {
    label: "Dashboard",
    value: "dashboard" as DriverSection,
    icon: LayoutDashboard,
  },
  {
    label: "Ride Requests",
    value: "requests" as DriverSection,
    icon: Navigation,
  },
  {
    label: "Earnings",
    value: "earnings" as DriverSection,
    icon: Wallet,
  },
  {
    label: "Ride History",
    value: "history" as DriverSection,
    icon: History,
  },
  {
    label: "Ratings",
    value: "ratings" as DriverSection,
    icon: Star,
  },
];

export default function DriverSidebar({
  isOpen,
  onClose,
  activeSection,
  onSectionChange,
}: DriverSidebarProps) {
  const router = useRouter();

  const [driver, setDriver] = useState<DriverData | null>(null);
  const [loadingDriver, setLoadingDriver] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  // GET CURRENT DRIVER

  useEffect(() => {

    const getCurrentDriver = async () => {
      try {
        const response = await DriverGetMe();

        // console.log("Driver Get Me Response:", response);

        // Driver is not authenticated
        if (!response?.success) {
          router.push("/Driver/login");
          return;
        }

        // Store driver data
        setDriver(response.driver || response);
      } catch (error: any) {
        // console.error("Failed to get current driver:", error);

        // Unauthorized
        if (error?.response?.status === 401) {
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

  // LOGOUT DRIVER

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const response = await DriverLogout();

      // console.log("Driver Logout Response:", response);
    } catch (error) {
      // console.error("Driver Logout Error:", error);
    } finally {
      setLoggingOut(false);

      // Always redirect after logout attempt
      router.push("/Driver/login");
    }
  };

  // SECTION CHANGE

  const handleSectionChange = (section: DriverSection) => {
    onSectionChange(section);
    onClose();
  };

  // DRIVER DISPLAY
  const username = driver?.username || "Driver";

  const avatarLetter = username.charAt(0).toUpperCase();

  // UI
  return (
    <>
      {/* MOBILE OVERLAY */}

      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-[270px]
          flex-col border-r border-slate-200 bg-white
          transition-transform duration-300
          lg:translate-x-0
          ${isOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }
        `}
      >
        {/* LOGO */}

        <div className="flex h-[72px] items-center justify-between border-b border-slate-100 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-200">
              <Car size={20} />
            </div>

            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
                Nav<span className="text-orange-500">Gati</span>
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Driver Partner
              </p>
            </div>
          </div>

          {/* MOBILE CLOSE */}

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
            Driver Console
          </p>

          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active = activeSection === item.value;

              return (
                <button
                  key={item.value}
                  onClick={() =>
                    handleSectionChange(item.value)
                  }
                  className={`
                    group flex w-full items-center gap-3
                    rounded-xl px-3 py-3 text-sm font-medium
                    transition-all duration-200
                    ${active
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <div
                    className={`
                      flex h-9 w-9 items-center justify-center
                      rounded-lg
                      ${active
                        ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                      }
                    `}
                  >
                    <Icon size={18} />
                  </div>

                  <span>{item.label}</span>

                  {/* REQUEST COUNT */}

                  {item.value === "requests" && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-[9px] font-bold text-white">
                      2
                    </span>
                  )}

                  {/* ACTIVE DOT */}

                  {active && item.value !== "requests" && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-orange-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* SAFETY */}

          <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
            Safety
          </p>

          <button
            onClick={() =>
              handleSectionChange("safety")
            }
            className={`
              group flex w-full items-center gap-3 rounded-xl px-3 py-3
              text-sm font-medium transition
              ${activeSection === "safety"
                ? "bg-orange-50 text-orange-600"
                : "text-slate-600 hover:bg-slate-50"
              }
            `}
          >
            <div
              className={`
                flex h-9 w-9 items-center justify-center rounded-lg
                ${activeSection === "safety"
                  ? "bg-orange-500 text-white"
                  : "bg-emerald-50 text-emerald-500"
                }
              `}
            >
              <ShieldCheck size={18} />
            </div>

            <span>Safety Center</span>
          </button>

          {/* ACCOUNT */}

          <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
            Account
          </p>

          <div className="space-y-1.5">
            {/* PROFILE */}

            <button
              onClick={() =>
                router.push("/DriverProfile")
              }
              className={`
                flex w-full items-center gap-3 rounded-xl px-3 py-3
                text-sm font-medium transition
                ${activeSection === "profile"
                  ? "bg-orange-50 text-orange-600"
                  : "text-slate-600 hover:bg-slate-50"
                }
              `}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                <User size={18} />
              </div>

              <span>Profile</span>
            </button>

            {/* SETTINGS */}

            <button
              onClick={() =>
                handleSectionChange("settings")
              }
              className={`
                flex w-full items-center gap-3 rounded-xl px-3 py-3
                text-sm font-medium transition
                ${activeSection === "settings"
                  ? "bg-orange-50 text-orange-600"
                  : "text-slate-600 hover:bg-slate-50"
                }
              `}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                <Settings size={18} />
              </div>

              <span>Settings</span>
            </button>
          </div>
        </nav>

        {/* ONLINE STATUS */}

        <div className="px-4 pb-4">
          <div className="rounded-2xl bg-slate-900 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>

                <span className="text-xs font-bold">
                  Youre online
                </span>
              </div>

              <span className="text-[10px] text-slate-400">
                3h 42m
              </span>
            </div>

            <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
              Youre visible to nearby passengers.
            </p>
          </div>
        </div>

        {/* DRIVER */}

        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3">

            {/* AVATAR */}

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-sm font-bold text-white">
              {loadingDriver ? "..." : avatarLetter}
            </div>

            {/* DRIVER INFO */}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-800">
                {loadingDriver
                  ? "Loading..."
                  : username}
              </p>

              <p className="truncate text-[11px] text-slate-400">
                ⭐ 4.8 rating
              </p>
            </div>

            {/* LOGOUT */}

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              title="Logout"
            >
              {loggingOut ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-red-500" />
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