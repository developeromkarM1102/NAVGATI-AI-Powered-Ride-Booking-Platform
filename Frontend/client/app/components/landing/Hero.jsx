"use client";

import { motion } from "framer-motion";
import { Sparkles, Mic, ArrowRight, Play, Clock3, IndianRupee, CloudSun, Route } from "lucide-react";
import { useRouter } from "next/navigation";
import RouteMap from "@/app/components/HeroSection/RouteMap";
import RideCard from "@/app/components/HeroSection/RideCard";
import InfoCard from "@/app/components/HeroSection/InfoCard";
import AIStatusCard from "@/app/components/HeroSection/AIStatusCard";
import MovingCar from "@/app/components/HeroSection/MovingCar";

export default function Hero() {

    const router = useRouter();

    return (
        <section id="Home" className="relative overflow-hidden bg-[#F8FAFC]">

            {/* BACKGROUND BLUR */}

            <div className="pointer-events-none absolute -left-40 h-[500px] w-[500px] rounded-full bg-orange-200/40 blur-[120px]" />

            <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-orange-100 blur-[120px]" />


            {/* MAIN CONTAINER */}

            <div className="relative mx-auto flex min-h-screen max-w-screen flex-col items-center justify-between gap-12 px-4 pb-16 pt-24 sm:gap-14 sm:px-6 sm:pb-20 sm:pt-28 lg:flex-row lg:gap-18 lg:px-7 lg:pb-24 lg:pt-24">


                {/* LEFT SIDE */}

                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative z-40 mb-12 w-full px-2 sm:mb-16 sm:px-6 md:px-8 lg:mb-20 lg:w-[42%] lg:px-0"
                >

                    {/* AI BADGE */}

                    <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1.5 shadow-sm sm:px-4 sm:py-2">

                        <Sparkles
                            size={14}
                            className="shrink-0 text-orange-500 sm:h-4 sm:w-4"
                        />

                        <span className="text-xs font-medium text-orange-600 sm:text-sm">
                            AI Powered Ride Booking
                        </span>

                    </div>


                    {/* HEADING */}

                    <h1 className="mt-6 text-center font-blackops text-4xl font-black leading-[1.15] tracking-tight text-gray-900 sm:mt-8 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">

                        Describe Your{" "}

                        <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text font-playfair text-5xl text-transparent sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                            Journey.
                        </span>

                        <br />

                        We'll Find the

                        <br />

                        <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text font-playfair text-4xl text-transparent sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                            Perfect Ride.
                        </span>

                    </h1>


                    {/* MOVING CAR */}

                    <div className="relative z-20 w-full overflow-visible pointer-events-none">
                        <MovingCar />
                    </div>


                    {/* AI SEARCH */}

                    <div className="relative z-40 mt-7 flex w-full items-center rounded-2xl border border-orange-200 bg-white p-2 shadow-xl shadow-orange-100 sm:mt-10 sm:rounded-3xl sm:p-3">

                        <Sparkles
                            className="ml-2 shrink-0 text-orange-500 sm:ml-3"
                            size={17}
                        />

                        <input
                            type="text"
                            placeholder="Let AI know the trip Details..!"
                            className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 sm:px-4 sm:py-2 sm:text-base"
                        />

                        <button
                            type="button"
                            className="flex h-11 cursor-pointer w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white transition duration-300 hover:scale-105 sm:h-14 sm:w-14 sm:rounded-2xl"
                        >
                            <Mic size={19} />
                        </button>

                    </div>


                    {/* DESCRIPTION */}

                    <p className="mt-5 max-w-xl font-playfair text-sm leading-6 text-gray-600 sm:mt-6 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">

                        Skip traditional booking forms. Simply tell NavGati where you want to
                        go in your own words, and our AI instantly understands your trip,
                        fares, & recommends the best ride.

                    </p>


                    {/* BUTTONS */}

                    <div className="relative z-50 mt-6 flex flex-col gap-3 font-playfair sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">

                        {/* Book MY RIDE */}

                        <button
                            type="button"
                            onClick={() => router.push("/Dashboard")}
                            className="group relative z-50 flex w-full items-center cursor-pointer justify-center gap-1 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition duration-300 hover:scale-105 sm:w-auto sm:px-8 sm:py-4"
                        >
                            Book My Ride

                            <ArrowRight
                                size={18}
                                className="transition group-hover:translate-x-1"
                            />

                        </button>

                        {/* Drive First RIDE */}

                        <button
                            type="button"
                            onClick={() => router.push("/DriveDash")}
                            className="group relative z-50 flex w-full items-center cursor-pointer justify-center gap-1 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition duration-300 hover:scale-105 sm:w-auto sm:px-8 sm:py-4"
                        >
                            Drive First Ride

                            <ArrowRight
                                size={18}
                                className="transition group-hover:translate-x-1"
                            />

                        </button>


                        {/* WATCH DEMO */}

                        <button
                            type="button"
                            onClick={() => router.push("/#demo")}
                            className="relative z-50 flex w-full items-center cursor-pointer justify-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-800 shadow-sm transition hover:shadow-lg sm:w-auto sm:px-8 sm:py-4"
                        >

                            <Play
                                size={18}
                                fill="black"
                            />

                            Watch Demo

                        </button>

                    </div>

                </motion.div>


                {/* RIGHT SIDE */}

                <div className="relative z-10 mb-32 flex w-full items-center justify-center sm:mb-40 lg:mb-50 lg:mr-5 lg:w-[48%]">


                    {/* BACKGROUND GLOW */}

                    <div className="pointer-events-none absolute h-[300px] w-[300px] rounded-full bg-orange-200 opacity-40 blur-[100px] sm:h-[450px] sm:w-[450px] sm:blur-[120px] lg:h-[650px] lg:w-[650px] lg:blur-[150px]" />


                    {/* MAP */}

                    <div className="relative z-10">
                        <RouteMap />
                    </div>


                    {/* AI CARD */}

                    <div className="pointer-events-none absolute left-0 top-0 z-20 sm:-left-4 sm:-top-2 lg:-left-12 lg:-top-3">
                        <AIStatusCard />
                    </div>


                    {/* RIDE CARDS */}

                    <div className="pointer-events-none absolute right-0 top-20 z-20 flex scale-75 flex-col gap-3 sm:right-0 sm:top-28 sm:scale-90 sm:gap-4 lg:-right-10 lg:top-45 lg:scale-100 lg:gap-5">

                        <RideCard
                            title="Bike"
                            price="₹120"
                            time="12 mins"
                            image="/motorbike.png"
                        />

                        <RideCard
                            title="Mini"
                            price="₹180"
                            time="10 mins"
                            image="/mini.png"
                            active
                        />

                        <RideCard
                            title="Sedan"
                            price="₹260"
                            time="9 mins"
                            image="/sedan.png"
                        />

                    </div>


                    {/* BOTTOM INFO CARDS */}

                    <div className="pointer-events-none absolute -bottom-20 left-1/2 z-20 flex w-max -translate-x-1/2 scale-75 gap-2 sm:-bottom-24 sm:scale-90 sm:gap-3 lg:-bottom-25 lg:gap-4 lg:pr-10 lg:scale-100">

                        <InfoCard
                            title="ETA"
                            value="10 min"
                            subtitle="Fastest Route"
                            color="orange"
                            icon={<Clock3 size={20} />}
                        />

                        <InfoCard
                            title="Traffic"
                            value="Light"
                            subtitle="Live Update"
                            color="blue"
                            icon={<Route size={20} />}
                        />

                        <InfoCard
                            title="AI Fare"
                            value="₹180"
                            subtitle="Predicted"
                            color="green"
                            icon={<IndianRupee size={20} />}
                        />

                        <InfoCard
                            title="Weather"
                            value="28°C"
                            subtitle="Sunny"
                            color="purple"
                            icon={<CloudSun size={20} />}
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}