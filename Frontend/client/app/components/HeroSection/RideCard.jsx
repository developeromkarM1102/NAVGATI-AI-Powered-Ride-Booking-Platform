"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function RideCard({
    image,
    title,
    price,
    time,
    active = false,
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{
                scale: 1.03,
                y: -5,
            }}
            transition={{ duration: 0.4 }}
            className={`w-[180px] cursor-pointer rounded-2xl border bg-white/85 p-3 shadow-xl backdrop-blur-xl transition-all sm:w-[220px] sm:rounded-3xl sm:p-4 lg:w-[280px] lg:p-5 ${active
                    ? "border-orange-400 ring-2 ring-orange-200"
                    : "border-white/70"
                }`}
        >
            {/* Card Content */}
            <div className="flex items-center justify-between gap-2 sm:gap-3 lg:gap-4">

                {/* Left */}
                <div className="flex min-w-0 items-center gap-2 sm:gap-3 lg:gap-4">

                    {/* Vehicle Image */}
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-14 sm:w-14 sm:rounded-2xl lg:h-16 lg:w-16">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            sizes="(min-width: 1024px) 64px, (min-width: 640px) 56px, 44px"
                            className="object-contain p-1.5 sm:p-2"
                        />
                    </div>

                    {/* Vehicle Details */}
                    <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-lg lg:text-xl">
                            {title}
                        </h3>

                        <p className="text-[10px] text-gray-500 sm:text-xs lg:text-sm">
                            {time}
                        </p>
                    </div>
                </div>

                {/* Right */}
                <div className="shrink-0 text-right">

                    <p className="text-base font-bold text-gray-900 sm:text-xl lg:text-2xl">
                        {price}
                    </p>

                    <span className="text-[8px] text-gray-400 sm:text-[10px] lg:text-xs">
                        Estimated
                    </span>

                </div>
            </div>
        </motion.div>
    );
}