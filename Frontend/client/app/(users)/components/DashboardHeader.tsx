"use client";

import { useEffect, useState } from "react";
import { Bell, Menu, Search, MapPin, ChevronDown, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserGetMe } from "../../(auth)/Services/userAuth.api";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

interface User {
  name?: string;
  username?: string;
  email?: string;
  role?: string;
  profileImage?: string;
  authProvider?: "local" | "google";
}

interface UserGetMeResponse {
  success: boolean;
  user?: User;
}

export default function DashboardHeader({
  onMenuClick,
}: DashboardHeaderProps) {
  const [notificationOpen, setNotificationOpen] =
    useState<boolean>(false);

  const [user, setUser] = useState<User | null>(null);

  const [loadingUser, setLoadingUser] =
    useState<boolean>(true);

  const router = useRouter();

  /* 
     GET CURRENT USER
   */

  useEffect(() => {
    const getCurrentUser = async (): Promise<void> => {
      try {
        
        const response = (await UserGetMe()) as UserGetMeResponse;

        if (!response?.success || !response?.user) {
          router.push("/User/login");
          return;
        }

        setUser(response.user);
      } catch (error: unknown) {
        // console.error(
        //   "Failed to get current user:",
        //   error
        // );

        router.push("/User/login");
      } finally {
        setLoadingUser(false);
      }
    };

    void getCurrentUser();
  }, [router]);


  const displayName =
    user?.name?.trim() ||
    user?.username?.trim() ||
    "User";

  const avatarLetter =
    displayName.charAt(0).toUpperCase() || "U";

  /* 
     RENDER
   */

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="flex h-16 w-full items-center justify-between px-3 sm:h-[72px] sm:px-6 lg:px-8">

        {/* 
            LEFT SIDE
         */}

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">

          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() => onMenuClick?.()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500 active:scale-95 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={21} />
          </button>

          {/* GREETING */}

          <div className="min-w-0">
            <p className="text-[11px] font-medium text-slate-500 sm:text-sm">
              Welcome back 👋
            </p>

            <h1 className="max-w-[170px] truncate text-sm font-bold text-slate-900 sm:max-w-none sm:text-lg">
              {loadingUser
                ? "Loading..."
                : `Good morning, ${displayName}`}
            </h1>
          </div>
        </div>

        {/* 
            RIGHT SIDE
         */}

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3 lg:gap-4">

          {/* 
              CURRENT LOCATION
           */}

          <div className="hidden items-center gap-2 rounded-xl bg-orange-50 px-3 py-2 md:flex">

            <MapPin
              size={17}
              className="shrink-0 text-orange-500"
            />

            <div className="leading-tight">

              <p className="text-[10px] font-medium text-slate-400">
                Current location
              </p>

              <p className="max-w-[100px] truncate text-xs font-semibold text-slate-700">
                Your Location..
              </p>

            </div>

            <ChevronDown
              size={14}
              className="text-slate-400"
            />

          </div>

          {/* 
              NOTIFICATIONS
           */}

          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationOpen((previous) => !previous)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500 active:scale-95"
              aria-label="Notifications"
              aria-expanded={notificationOpen}
            >
              <Bell size={19} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white" />
            </button>

            {notificationOpen && (
              <>
                {/* BACKDROP */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setNotificationOpen(false)}
                  aria-hidden="true"
                />

                {/* NOTIFICATION PANEL */}
                <div
                  className="
          fixed left-1/2 top-[64px] z-50
          w-[calc(100vw-24px)] max-w-[360px]
          -translate-x-1/2
          overflow-hidden rounded-2xl
          border border-slate-200 bg-white shadow-xl

          sm:absolute sm:left-auto sm:right-0
          sm:top-12 sm:w-[320px]
          sm:translate-x-0
        "
                >
                  {/* HEADER */}
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <h3 className="text-sm font-bold text-slate-900">
                      Notifications
                    </h3>

                    <button
                      type="button"
                      onClick={() => setNotificationOpen(false)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label="Close notifications"
                    >
                      <X size={17} />
                    </button>
                  </div>

                  {/* NOTIFICATIONS */}
                  <div className="max-h-[60vh] overflow-y-auto">
                    <div className="p-4 pb-2">
                      <div className="rounded-xl bg-orange-50 p-3">
                        <p className="text-sm font-semibold text-slate-800">
                          Welcome to NavGati 🚕
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Book your next ride with our AI assistant.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-2">
                      <div className="rounded-xl bg-orange-50 p-3">
                        <p className="text-sm font-semibold text-slate-800">
                          Feature Coming Soon 🚕
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Schedule a ride with AI!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* VIEW ALL */}
                  <button
                    type="button"
                    className="w-full border-t border-slate-100 py-3 text-xs font-semibold text-orange-500 transition hover:bg-orange-50"
                  >
                    View all notifications
                  </button>
                </div>
              </>
            )}
          </div>

          {/* 
              USER PROFILE
           */}

          <button
            type="button"
            onClick={() => router.push("/Profile")}
            className="flex items-center gap-1.5 rounded-xl p-1 transition hover:bg-slate-50 active:scale-95 sm:gap-2 sm:p-1.5"
            aria-label="Open profile"
          >

            {/* AVATAR */}

            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={displayName}
                className="h-9 w-9 shrink-0 rounded-full object-cover shadow-sm"
              />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-sm font-bold text-white shadow-sm">
                {loadingUser
                  ? "..."
                  : avatarLetter}
              </div>
            )}

            {/* USER INFO */}

            <div className="hidden text-left sm:block">

              <p className="max-w-[110px] truncate text-xs font-bold text-slate-800">
                {loadingUser
                  ? "Loading..."
                  : displayName}
              </p>

              <p className="text-[10px] text-slate-400">
                {user?.role || "User"}
              </p>

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