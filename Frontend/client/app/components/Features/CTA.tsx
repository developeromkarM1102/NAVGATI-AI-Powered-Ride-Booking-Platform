"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";

export default function CTA() {

  const router = useRouter();

  return (
    <section className="relative overflow-visible bg-[#F8FAFC] py-24 -mt-20">

      <div className="relative mx-auto max-w-screen px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[40px] border border-white/20 shadow-2xl"
        >

          {/* Gradient Background (Only Inside Card) */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

          {/* Decorative Blurs */}
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          {/* Content */}
          <div className="relative px-8 py-16 text-center md:px-16 lg:px-24 -mt-5">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-white backdrop-blur-xl">
              <Sparkles size={16} />
              <span>AI Powered Ride Booking</span>
            </div>

            {/* Heading */}
            <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-blackops leading-tight text-white md:text-5xl lg:text-6xl">
              Ready to Experience the Future
              <br />
              <span className="text-yellow-200">
                of Ride Booking?
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto font-playfair mt-8 max-w-2xl text-lg leading-8 text-orange-50">
              Describe your destination naturally, let AI understand your
              journey, compare ride options, predict fares, and book the
              perfect ride in just a few seconds.
            </p>

            {/* Buttons */}
            <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">

              <button
              onClick={() => router.push("/Dashboard")}
              className="group flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-5 text-lg font-semibold text-orange-600 shadow-xl transition-all duration-300 hover:scale-105">
                Book with AI
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button 
              onClick={() => router.push("/#demo")}
              className="flex items-center justify-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-8 py-5 text-lg font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20">
                <PlayCircle size={20} />
                Watch Demo
              </button>

            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">

              <div>
                <h3 className="text-4xl font-bold text-white">50K+</h3>
                <p className="mt-2 text-orange-100">AI Bookings</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-white">4.9★</h3>
                <p className="mt-2 text-orange-100">User Rating</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-white">&lt;5s</h3>
                <p className="mt-2 text-orange-100">AI Response</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-white">99.9%</h3>
                <p className="mt-2 text-orange-100">AI Accuracy</p>
              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}