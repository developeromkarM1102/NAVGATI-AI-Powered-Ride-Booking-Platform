"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import FeatureCard from "@/app/components/Features/FeatureCard";
import { features } from "@/app/components/Features/FeatureData";
import CTA from "@/app/components/Features/CTA";

export default function Features() {
  return (
    <>
      <section id="features" className="relative overflow-hidden bg-[#F8FAFC] py-24 lg:py-32">

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">

          <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-orange-200/30 blur-[140px]" />

          <div className="absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-orange-100/40 blur-[140px]" />

          <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-100/30 blur-[120px]" />

        </div>

        <div className="container mx-auto max-w-screen px-6 -mt-18">

          {/* Heading */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-2 shadow-sm">

              <Sparkles
                size={16}
                className="text-orange-500"
              />

              <span className="font-medium text-orange-600">
                Why Choose NavGati..?
              </span>

            </div>

            <h2 className="mt-8 text-4xl font-blackops leading-tight text-gray-900 sm:text-5xl lg:text-6xl">

              Everything You Need For

              <span className="block bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Smarter AI Travel
              </span>

            </h2>

            <p className="mx-auto font-playfair mt-6 max-w-2xl text-lg leading-8 text-gray-600">

              NavGati transforms the way you travel. Simply describe your
              journey naturally and let AI understand your destination,
              estimate fares, analyze traffic, and recommend the perfect ride
              within seconds.

            </p>

          </motion.div>

          {/* Features Grid */}
          <div className="flex justify-center mt-10">
            <div className="flex items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-2 shadow-sm">
              <Sparkles
                size={16}
                className="text-orange-500"
              />

              <span className="font-medium text-orange-600">
                Features we Provide..
              </span>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
              />
            ))}

          </div>

        </div>

      </section>

      {/* CTA Section */}

      <CTA />

    </>
  );
}