"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { UserLogin, UserGoogleLogin } from "../../Services/userAuth.api";
import { useRouter } from 'next/navigation'
import UserAuthRedirect from "../../hooks/UserAuthRedirect";

export default function LoginPage() {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()
    const checkingAuth = UserAuthRedirect();

    const handleLogin = async () => {
        try {
            const response = await UserLogin({
                email,
                password,
            });

            // console.log("Login response:", response);

            return response;
        } catch (error) {
            // console.error("Login error:", error);
            throw error;
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try {

            await handleLogin();

            setemail("");
            setpassword("");

            alert("Login successful!");

            router.push("/Dashboard")

        } catch (error) {
            // console.log("Login Error : ", error)
            alert("Login failed!");
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
                            <Sparkles size={24} />
                        </div>

                        <h1 className="mt-5 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                            Welcome Back
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Sign in to continue your smarter journey.
                        </p>
                    </div>

                    {/* Google */}
                    <button
                        type="button"
                        onClick={UserGoogleLogin}
                        className="mt-7 flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-green-400 hover:shadow-md"
                    >
                        <span className="text-lg font-bold">
                            G
                        </span>

                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-gray-200" />

                        <span className="text-xs text-gray-400">
                            OR CONTINUE WITH EMAIL
                        </span>

                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

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
                                    onChange={(e) => setemail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
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
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setpassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    required
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
                            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:scale-[1.02] hover:shadow-xl"
                        >
                            Sign In

                            <ArrowRight
                                size={18}
                                className="transition group-hover:translate-x-1"
                            />
                        </button>

                    </form>

                    {/* Register */}
                    <p className="mt-7 text-center text-sm text-gray-500">
                        Dont have an account?{" "}
                        <Link
                            href="/User/register"
                            className="font-semibold text-orange-500 hover:text-orange-600"
                        >
                            Create Account
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