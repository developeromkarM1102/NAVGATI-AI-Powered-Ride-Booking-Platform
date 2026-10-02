"use client";

import { motion } from "framer-motion";
import {
    Sparkles,
    MapPin,
    CalendarDays,
    Clock3,
    CheckCircle2,
} from "lucide-react";

export default function AIStatusCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
                opacity: 0.8,
                y: [0, -8, 0],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
            }}
            className="w-[230px] rounded-[22px] border border-white/60 bg-white/80 p-4 shadow-2xl backdrop-blur-xl sm:w-[260px] sm:rounded-[25px] sm:p-5 lg:w-[280px] lg:rounded-[28px] lg:p-6"
        >
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg sm:h-11 sm:w-11 sm:rounded-2xl lg:h-12 lg:w-12">
                    <Sparkles size={18} className="sm:h-5 sm:w-5 lg:h-[22px] lg:w-[22px]" />
                </div>

                <div className="min-w-0">
                    <h3 className="text-base font-bold text-gray-900 sm:text-lg lg:text-xl">
                        AI Understood
                    </h3>

                    <p className="text-[11px] text-gray-500 sm:text-xs lg:text-sm">
                        Trip analyzed successfully
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-gray-200 sm:my-5 lg:my-6" />

            {/* Pickup */}
            <div className="flex items-start gap-2.5 sm:gap-3">
                <div className="mt-1 shrink-0 rounded-full bg-orange-100 p-1.5 sm:p-2">
                    <MapPin className="text-orange-500" size={14} />
                </div>

                <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-gray-400 sm:text-xs">
                        Pickup
                    </p>

                    <p className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                        Vashi Station
                    </p>
                </div>
            </div>

            {/* Destination */}
            <div className="mt-4 flex items-start gap-2.5 sm:mt-5 sm:gap-3">
                <div className="mt-1 shrink-0 rounded-full bg-orange-100 p-1.5 sm:p-2">
                    <MapPin className="text-orange-500" size={14} />
                </div>

                <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-gray-400 sm:text-xs">
                        Destination
                    </p>

                    <p className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                        TCS Mahape
                    </p>
                </div>
            </div>

            {/* Date */}
            <div className="mt-4 flex items-start gap-2.5 sm:mt-5 sm:gap-3">
                <div className="mt-1 shrink-0 rounded-full bg-orange-100 p-1.5 sm:p-2">
                    <CalendarDays className="text-orange-500" size={14} />
                </div>

                <div>
                    <p className="text-[10px] uppercase tracking-wide text-gray-400 sm:text-xs">
                        Date
                    </p>

                    <p className="text-sm font-semibold text-gray-900 sm:text-base">
                        Tomorrow
                    </p>
                </div>
            </div>

            {/* Time */}
            <div className="mt-4 flex items-start gap-2.5 sm:mt-5 sm:gap-3">
                <div className="mt-1 shrink-0 rounded-full bg-orange-100 p-1.5 sm:p-2">
                    <Clock3 className="text-orange-500" size={14} />
                </div>

                <div>
                    <p className="text-[10px] uppercase tracking-wide text-gray-400 sm:text-xs">
                        Time
                    </p>

                    <p className="text-sm font-semibold text-gray-900 sm:text-base">
                        9:00 AM
                    </p>
                </div>
            </div>

            {/* Status */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="mt-5 flex items-center justify-between rounded-xl bg-gradient-to-r from-green-50 to-green-100 p-3 sm:mt-6 sm:rounded-2xl sm:p-4 lg:mt-7"
            >
                <div>
                    <p className="text-[10px] uppercase tracking-wide text-green-600 sm:text-xs">
                        Status
                    </p>

                    <p className="text-sm font-semibold text-green-700 sm:text-base">
                        Ready to Book
                    </p>
                </div>

                <CheckCircle2
                    className="shrink-0 text-green-600"
                    size={22}
                />
            </motion.div>
        </motion.div>
    );
}