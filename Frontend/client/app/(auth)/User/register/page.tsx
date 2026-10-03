"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, LockKeyhole, Mail, Phone, Sparkles, User } from "lucide-react";
import { useState, type FormEvent } from "react";
import { UserRegister } from "../../Services/userAuth.api";
import { useRouter } from 'next/navigation'
import UserAuthRedirect from "../../hooks/UserAuthRedirect";

export default function RegisterPage() {

    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const router = useRouter()
    const checkingAuth = UserAuthRedirect();

    const handleRegister = async () => {
        try {

            const result = await UserRegister({
                name,
                email,
                password,
                phone
            });

            if (!result.success) {
                // console.error("Registration failed:", result.error);
                return;
            }
            // console.log("Registration successful:", result);

        } catch (error) {
            // console.error("Registration failed:", error);
            throw error;
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try {

            await handleRegister();

            setname("");
            setEmail("");
            setPassword("");
            setPhone("");
            alert("Registration successful!");
            router.push("/Dashboard")

        } catch (error) {
            alert("Registration failed!");
            // console.log("Registration err : ", error);
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

            {/* Register Card */}
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
                            Create Your Account
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Start your smarter journey with NavGati.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-gray-200" />

                        <span className="text-xs text-gray-400">
                            SIGN UP TO START THE JOURNEY.
                        </span>

                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Full Name
                            </label>

                            <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">
                                <User
                                    size={18}
                                    className="shrink-0 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setname(e.target.value)}
                                    required
                                    placeholder="Enter your Name"
                                    className="w-full bg-transparent px-3 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                />
                            </div>
                        </div>

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
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@example.com"
                                    className="w-full bg-transparent px-3 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Phone Number
                            </label>

                            <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">
                                <Phone
                                    size={18}
                                    className="shrink-0 text-gray-400"
                                />

                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+91 12345 67890"
                                    className="w-full bg-transparent px-3 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Password
                            </label>

                            <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">
                                <LockKeyhole
                                    size={18}
                                    className="shrink-0 text-gray-400"
                                />

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a password"
                                    className="w-full bg-transparent px-3 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                />

                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-2 pt-1">
                            <input
                                type="checkbox"
                                id="terms"
                                className="mt-1 h-4 w-4 rounded border-gray-300 accent-orange-500"
                            />

                            <label
                                htmlFor="terms"
                                className="text-xs leading-5 text-gray-500"
                            >
                                I agree to NavGatis{" "}
                                <Link
                                    href="/terms"
                                    className="font-semibold text-orange-500"
                                >
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                    href="/privacy"
                                    className="font-semibold text-orange-500"
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </label>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:scale-[1.02] hover:shadow-xl"
                        >
                            Create Account

                            <ArrowRight
                                size={18}
                                className="transition group-hover:translate-x-1"
                            />
                        </button>
                    </form>

                    {/* Login */}
                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link
                            href="/User/login"
                            className="font-semibold text-orange-500 hover:text-orange-600"
                        >
                            Sign In
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