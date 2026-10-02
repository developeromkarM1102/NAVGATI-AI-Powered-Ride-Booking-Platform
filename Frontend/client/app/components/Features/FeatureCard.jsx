"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  gradient,
  size = "normal",
}) {
  const sizeClasses = {
    large: "lg:col-span-2 lg:row-span-2 min-h-[420px]",
    wide: "lg:col-span-2 min-h-[220px]",
    normal: "min-h-[220px]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{
        duration: 0.45,
      }}
      className={`
      group
      relative
      overflow-hidden
      rounded-[32px]
      border
      border-white/60
      bg-white/80
      backdrop-blur-xl
      p-8
      shadow-xl
      transition-all
      duration-300
      hover:shadow-2xl
      ${sizeClasses[size]}
      `}
    >
      {/* Gradient Glow */}

      <div
        className={`absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-3xl transition-all duration-500 group-hover:scale-125`}
      />

      {/* Icon */}

      <div
        className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
      >
        <Icon size={30} />
      </div>

      {/* Title */}

      <h3 className="text-2xl font-playfair text-gray-900">
        {title}
      </h3>

      {/* Description */}

      <p className="mt-5 text-gray-600 leading-8">
        {description}
      </p>

      {/* Learn More */}

      <div className="mt-8 flex items-center gap-2 font-semibold text-orange-500 cursor-pointer">

        Learn More

        <ArrowUpRight
          size={18}
          className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
        />

      </div>

      {/* Hover Border */}

      <div className="absolute inset-0 rounded-[32px] border-2 border-transparent transition duration-300 group-hover:border-orange-200" />
    </motion.div>
  );
}