"use client";

import { motion } from "framer-motion";

export default function InfoCard({
    title,
    value,
    subtitle,
    icon,
    color = "orange",
}) {
    const colors = {
        orange: {
            bg: "bg-orange-50",
            border: "border-orange-200",
            text: "text-orange-600",
            shadow: "shadow-orange-100",
        },
        blue: {
            bg: "bg-sky-50",
            border: "border-sky-200",
            text: "text-sky-600",
            shadow: "shadow-sky-100",
        },
        green: {
            bg: "bg-emerald-50",
            border: "border-emerald-200",
            text: "text-emerald-600",
            shadow: "shadow-emerald-100",
        },
        purple: {
            bg: "bg-violet-50",
            border: "border-violet-200",
            text: "text-violet-600",
            shadow: "shadow-violet-100",
        },
    };

    const theme = colors[color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{
                opacity: 1,
                y: [0, -6, 0],
            }}
            whileHover={{
                y: -10,
                scale: 1.05,
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
            }}
            className={`h-32 w-[130px] rounded-2xl border ${theme.border} bg-white/80 p-3 shadow-xl ${theme.shadow} backdrop-blur-xl sm:h-36 sm:w-[145px] sm:rounded-3xl sm:p-4 lg:h-40 lg:w-[160px] lg:p-5`}
        >
            {/* Content */}
            <div>
                <p className="text-[10px] text-gray-500 sm:text-xs lg:text-sm">
                    {title}
                </p>

                <h3 className="mt-1 text-lg font-bold text-gray-900 sm:text-xl lg:mt-2 lg:text-2xl">
                    {value}
                </h3>

                <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs lg:mt-1 lg:text-sm">
                    {subtitle}
                </p>
            </div>

            {/* Icon */}
            <div
                className={`mt-3 flex h-9 w-9 items-center justify-center rounded-xl ${theme.bg} ${theme.text} sm:mt-4 sm:h-10 sm:w-10 sm:rounded-2xl lg:mt-5 lg:h-12 lg:w-12`}
            >
                {icon}
            </div>
        </motion.div>
    );
}