"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, CarFront } from "lucide-react";
import { useState, type FormEvent } from "react";
import { DriverLogin } from "../../Services/driverAuth.api";
import { useRouter } from "next/navigation";
import DriverAuthRedirect from "../../hooks/DriverAuthRedirect";

export default function DriverLoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const checkingAuth = DriverAuthRedirect();

    const handleLogin = async () => {

        const response = await DriverLogin({
            email,
            password,
        });

        // console.log("Driver login successful:", response);

        return response;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try {

            setLoading(true);

            await handleLogin();

            setEmail("");
            setPassword("");

            alert("Driver login successful!");

            router.push("/DriveDash");

        } catch (error) {

            // console.error("Driver login error:", error);

            alert("Driver login failed!");

        } finally {
            setLoading(false);
        }
    };

    if (checkingAuth) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Checking authentication...
            </div>
        );
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 mt-10">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md"
            >

                <div className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-2xl shadow-orange-100/50 backdrop-blur-xl sm:p-8">

                    {/* Header */}
                    <div className="text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-200">
                            <CarFront size={24} />
                        </div>

                        <h1 className="mt-5 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                            Driver Login
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Welcome back! Sign in to start your journey.
                        </p>

                    </div>


                    {/* Divider */}
                    <div className="my-7 flex items-center gap-4">

                        <div className="h-px flex-1 bg-gray-200" />

                        <span className="text-xs text-gray-400">
                            DRIVER ACCOUNT
                        </span>

                        <div className="h-px flex-1 bg-gray-200" />

                    </div>


                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Email Address
                            </label>

                            <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">

                                <Mail
                                    size={18}
                                    className="shrink-0 text-gray-400"
                                />

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                    placeholder="you@example.com"
                                    className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                />

                            </div>

                        </div>


                        {/* Password */}
                        <div>

                            <div className="mb-2 flex items-center justify-between">

                                <label className="text-sm font-semibold text-gray-700">
                                    Password
                                </label>

                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-semibold text-orange-500 hover:text-orange-600"
                                >
                                    Forgot Password?
                                </Link>

                            </div>


                            <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">

                                <LockKeyhole
                                    size={18}
                                    className="shrink-0 text-gray-400"
                                />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    placeholder="Enter your password"
                                    className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="text-gray-400 transition hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>

                            </div>

                        </div>


                        {/* Remember */}
                        <div className="flex items-center gap-2">

                            <input
                                type="checkbox"
                                id="remember"
                                className="h-4 w-4 rounded border-gray-300 accent-orange-500"
                            />

                            <label
                                htmlFor="remember"
                                className="text-sm text-gray-500"
                            >
                                Remember me
                            </label>

                        </div>


                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {loading
                                ? "Signing In..."
                                : "Sign In as Driver"
                            }

                            {!loading && (
                                <ArrowRight
                                    size={18}
                                    className="transition group-hover:translate-x-1"
                                />
                            )}

                        </button>

                    </form>


                    {/* Register */}
                    <p className="mt-7 text-center text-sm text-gray-500">

                        Dont have a driver account?{" "}

                        <Link
                            href="/Driver/register"
                            className="font-semibold text-orange-500 hover:text-orange-600"
                        >
                            Become a Driver
                        </Link>

                    </p>

                </div>


                {/* Footer */}
                <p className="mt-6 text-center text-xs text-gray-400">
                    © 2026 NavGati. Smarter rides, simpler journeys.
                </p>

            </motion.div>

        </main>
    );
}