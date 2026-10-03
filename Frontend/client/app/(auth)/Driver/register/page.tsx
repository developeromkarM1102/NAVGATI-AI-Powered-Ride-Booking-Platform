"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CalendarDays, CarFront, IdCard, LockKeyhole, Mail, Palette, Phone, Sparkles, User, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import { DriverRegister } from "../../Services/driverAuth.api";
import DriverAuthRedirect from "../../hooks/DriverAuthRedirect";

export default function DriverRegisterPage() {
    
    const checkingAuth = DriverAuthRedirect();
    // Personal details
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    // License details
    const [licenseNumber, setLicenseNumber] = useState("");
    const [licenseExpiry, setLicenseExpiry] = useState("");

    // Vehicle details
    const [vehicleType, setVehicleType] = useState("car");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [vehicleColor, setVehicleColor] = useState("");
    const [seats, setSeats] = useState("");

    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {

        const response = await DriverRegister({
            username,
            email,
            password,
            phone,
            licenseNumber,
            licenseExpiry,

            vehicle: {
                type: vehicleType,
                brand,
                model,
                registrationNumber,
                color: vehicleColor,
                seats: Number(seats),
            },
        });

        // console.log("Driver registration successful:", response);

        return response;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try {

            setLoading(true);

            await handleRegister();

            // Clear form
            setUsername("");
            setEmail("");
            setPassword("");
            setPhone("");

            setLicenseNumber("");
            setLicenseExpiry("");

            setVehicleType("car");
            setBrand("");
            setModel("");
            setRegistrationNumber("");
            setVehicleColor("");
            setSeats("");

            alert("Driver registration successful!");

        } catch (error) {

            // console.error("Driver registration error:", error);

            alert(
                "Driver registration failed!"
            );

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
                className="relative z-10 w-full max-w-xl"
            >

                <div className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-2xl shadow-orange-100/50 backdrop-blur-xl sm:p-8">

                    {/* Header */}
                    <div className="text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-200">
                            <CarFront size={24} />
                        </div>

                        <h1 className="mt-5 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                            Become a NavGati Driver
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Register your vehicle and start driving with NavGati.
                        </p>

                    </div>

                    {/* Divider */}
                    <div className="my-7 flex items-center gap-4">
                        <div className="h-px flex-1 bg-gray-200" />

                        <span className="text-xs text-gray-400">
                            DRIVER REGISTRATION
                        </span>

                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* ================= PERSONAL DETAILS ================= */}

                        <div>

                            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                                <User size={19} className="text-orange-500" />
                                Personal Details
                            </h2>

                            <div className="space-y-4">

                                {/* Username */}
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
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                            required
                                            placeholder="Enter your name"
                                            className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
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
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                            placeholder="you@example.com"
                                            className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
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
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            required
                                            placeholder="+91 12345 67890"
                                            className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
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
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                            minLength={6}
                                            placeholder="Create a password"
                                            className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                        />

                                    </div>
                                </div>

                            </div>
                        </div>


                        {/* ================= LICENSE DETAILS ================= */}

                        <div>

                            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                                <IdCard
                                    size={19}
                                    className="text-orange-500"
                                />
                                Driving License
                            </h2>

                            <div className="space-y-4">

                                {/* License Number */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        License Number
                                    </label>

                                    <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">

                                        <IdCard
                                            size={18}
                                            className="shrink-0 text-gray-400"
                                        />

                                        <input
                                            type="text"
                                            value={licenseNumber}
                                            onChange={(e) =>
                                                setLicenseNumber(
                                                    e.target.value
                                                )
                                            }
                                            required
                                            placeholder="MH123456789"
                                            className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                        />

                                    </div>
                                </div>

                                {/* License Expiry */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        License Expiry Date
                                    </label>

                                    <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">

                                        <CalendarDays
                                            size={18}
                                            className="shrink-0 text-gray-400"
                                        />

                                        <input
                                            type="date"
                                            value={licenseExpiry}
                                            onChange={(e) =>
                                                setLicenseExpiry(
                                                    e.target.value
                                                )
                                            }
                                            required
                                            className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-800 outline-none"
                                        />

                                    </div>
                                </div>

                            </div>
                        </div>


                        {/* ================= VEHICLE DETAILS ================= */}

                        <div>

                            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                                <CarFront
                                    size={19}
                                    className="text-orange-500"
                                />
                                Vehicle Details
                            </h2>

                            <div className="space-y-4">

                                {/* Vehicle Type */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Vehicle Type
                                    </label>

                                    <select
                                        value={vehicleType}
                                        onChange={(e) =>
                                            setVehicleType(e.target.value)
                                        }
                                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                                    >
                                        <option value="car">Car</option>
                                        <option value="bike">Bike</option>
                                        <option value="auto">Auto</option>
                                        <option value="van">Van</option>
                                    </select>
                                </div>


                                {/* Brand + Model */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Vehicle Brand
                                        </label>

                                        <input
                                            type="text"
                                            value={brand}
                                            onChange={(e) =>
                                                setBrand(e.target.value)
                                            }
                                            required
                                            placeholder="Maruti"
                                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Vehicle Model
                                        </label>

                                        <input
                                            type="text"
                                            value={model}
                                            onChange={(e) =>
                                                setModel(e.target.value)
                                            }
                                            required
                                            placeholder="Swift"
                                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                                        />
                                    </div>

                                </div>


                                {/* Registration Number */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Registration Number
                                    </label>

                                    <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">

                                        <CarFront
                                            size={18}
                                            className="shrink-0 text-gray-400"
                                        />

                                        <input
                                            type="text"
                                            value={registrationNumber}
                                            onChange={(e) =>
                                                setRegistrationNumber(
                                                    e.target.value
                                                )
                                            }
                                            required
                                            placeholder="MH01AB1234"
                                            className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                        />

                                    </div>
                                </div>


                                {/* Color + Seats */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                    {/* Color */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Vehicle Color
                                        </label>

                                        <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4">

                                            <Palette
                                                size={18}
                                                className="shrink-0 text-gray-400"
                                            />

                                            <input
                                                type="text"
                                                value={vehicleColor}
                                                onChange={(e) =>
                                                    setVehicleColor(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                placeholder="White"
                                                className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                            />

                                        </div>
                                    </div>


                                    {/* Seats */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Number of Seats
                                        </label>

                                        <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4">

                                            <Users
                                                size={18}
                                                className="shrink-0 text-gray-400"
                                            />

                                            <input
                                                type="number"
                                                value={seats}
                                                onChange={(e) =>
                                                    setSeats(e.target.value)
                                                }
                                                required
                                                min="1"
                                                placeholder="4"
                                                className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                            />

                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>


                        {/* Terms */}
                        <div className="flex items-start gap-2 pt-1">

                            <input
                                type="checkbox"
                                id="terms"
                                required
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
                            disabled={loading}
                            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Creating Driver Account..."
                                : "Register as Driver"
                            }

                            {!loading && (
                                <ArrowRight
                                    size={18}
                                    className="transition group-hover:translate-x-1"
                                />
                            )}
                        </button>

                    </form>


                    {/* Login */}
                    <p className="mt-7 text-center text-sm text-gray-500">
                        Already have an account?{" "}

                        <Link
                            href="/Driver/login"
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