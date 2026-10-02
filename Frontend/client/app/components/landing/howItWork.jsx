"use client";

import { motion } from "framer-motion";
import { MessageSquareText, BrainCircuit, CarFront, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: MessageSquareText,
        title: "Tell Us Your Journey",
        description:
            "Simply describe where you want to go, when you want to travel, and any preferences in your own words.",
        example: '"Vashi to TCS Mahape tomorrow at 9 AM"',
    },
    {
        number: "02",
        icon: BrainCircuit,
        title: "AI Understands Your Trip",
        description:
            "NavGati AI extracts your pickup, destination, date, time, and travel requirements automatically.",
        example: "Pickup ✓  Destination ✓  Time ✓",
    },
    {
        number: "03",
        icon: CarFront,
        title: "Compare The Best Rides",
        description:
            "Get intelligent ride recommendations with estimated fares, arrival times, traffic conditions, and more.",
        example: "Bike ₹120  •  Mini ₹180  •  Sedan ₹260",
    },
    {
        number: "04",
        icon: CheckCircle2,
        title: "Choose & Book",
        description:
            "Pick the ride that works best for you and complete your booking in just a few clicks.",
        example: "Your perfect ride is ready 🚗",
    },
];

export default function HowItWorks() {
    return (
        <section id="howItWorks" className="relative overflow-hidden bg-[#F8FAFC] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

            {/* Background Glow */}
            <div className="absolute -left-40 top-20 h-72 w-72 rounded-full bg-orange-100/60 blur-[120px] sm:h-96 sm:w-96" />

            <div className="absolute -right-40 bottom-20 h-72 w-72 rounded-full bg-orange-50 blur-[120px] sm:h-96 sm:w-96" />

            {/* Container */}
            <div className="relative mx-auto max-w-7xl">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    {/* Badge */}
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-medium text-orange-600 sm:text-sm">
                        <BrainCircuit size={15} />
                        How NavGati Works
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl font-blackops leading-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                        Your Ride.
                        <br />
                        <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                            One Simple Conversation.
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="mt-5 font-playfair text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:text-lg">
                        Forget complicated booking forms. Tell NavGati where you
                        want to go and let AI handle the rest.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative mt-16 sm:mt-20 lg:mt-24">

                    {/* Connecting Line - Desktop */}
                    <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-px bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 lg:block" />

                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">

                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <motion.div
                                    key={step.number}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.15,
                                    }}
                                    className="group relative"
                                >

                                    {/* Step Number + Icon */}
                                    <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-orange-200 bg-white shadow-lg shadow-orange-100 transition duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-orange-200">
                                        
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white">
                                            <Icon size={23} />
                                        </div>

                                        {/* Number */}
                                        <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white">
                                            {step.number}
                                        </span>
                                    </div>

                                    {/* Card */}
                                    <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-5 text-center shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl sm:p-6">

                                        <h3 className="text-lg font-blackops text-gray-900 sm:text-xl">
                                            {step.title}
                                        </h3>

                                        <p className="mt-3 text-sm font-playfair leading-6 text-gray-500">
                                            {step.description}
                                        </p>

                                        {/* Example */}
                                        <div className="mt-5 rounded-2xl bg-orange-50 px-3 py-3 text-xs font-medium leading-5 text-orange-600">
                                            {step.example}
                                        </div>
                                    </div>

                                    {/* Mobile Arrow */}
                                    {index < steps.length - 1 && (
                                        <div className="mt-5 flex justify-center lg:hidden">
                                            <ArrowRight className="rotate-90 text-orange-300 sm:rotate-90" size={22} />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}

                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-14 text-center sm:mt-16"
                >
                    <p className="text-sm text-gray-500">
                        From your words to your ride in seconds.
                    </p>

                    <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:scale-105">
                        Try NavGati AI
                        <ArrowRight size={16} />
                    </button>
                </motion.div>

            </div>
        </section>
    );
}