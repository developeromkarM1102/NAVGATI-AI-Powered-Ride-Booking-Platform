"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function RouteMap() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-[640px] w-[620px] overflow-hidden rounded-[36px] border border-white/60 bg-white shadow-2xl"
    >
      {/* Map */}
      <Image
        src="/map.png"
        alt="NavGati route map"
        fill
        priority
        quality={75}
        sizes="(min-width: 1024px) 620px, 90vw"
        className="object-cover opacity-90"
      />

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
                linear-gradient(to right,#d1d5db 1px,transparent 1px),
                linear-gradient(to bottom,#d1d5db 1px,transparent 1px)
            `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* SVG Route */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 620 640"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M130 520
               C180 470,
               230 450,
               280 390
               S350 260,
               410 220
               S470 170,
               520 120"
          fill="none"
          stroke="#FF6B00"
          strokeWidth="7"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      </svg>

      {/* Pickup Marker */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-24"
      >
        <div className="relative">
          <div className="h-6 w-6 rounded-full border-4 border-white bg-orange-500 shadow-lg" />

          <div className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/30 animate-ping" />
        </div>

        <div className="mt-3 rounded-2xl bg-white px-4 py-3 shadow-lg">
          <p className="text-xs text-orange-500">
            Pickup
          </p>

          <p className="font-semibold">
            Vashi Station
          </p>
        </div>
      </motion.div>

      {/* Destination */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute right-16 top-16"
      >
        <div className="relative">
          <div className="h-6 w-6 rounded-full border-4 border-white bg-orange-500 shadow-lg" />

          <div className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/30 animate-ping" />
        </div>

        <div className="mt-3 rounded-2xl bg-white px-4 py-3 shadow-lg">
          <p className="text-xs text-orange-500">
            Destination
          </p>

          <p className="font-semibold">
            TCS Mahape
          </p>
        </div>
      </motion.div>

      {/* Moving Car */}
      <motion.div
        className="absolute"
        initial={{
          left: 130,
          top: 520,
        }}
        animate={{
          left: [130, 200, 280, 360, 430, 510],
          top: [520, 470, 400, 300, 220, 140],
          rotate: [20, 10, 0, -10, -15, -20],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="rounded-full bg-white p-2 shadow-lg">
          🚗
        </div>
      </motion.div>

      {/* Floating Glow */}
      <div className="pointer-events-none absolute left-20 top-24 h-28 w-28 rounded-full bg-orange-300 opacity-20 blur-2xl" />

      <div className="pointer-events-none absolute bottom-16 right-20 h-24 w-24 rounded-full bg-orange-200 opacity-20 blur-2xl" />
    </motion.div>
  );
}