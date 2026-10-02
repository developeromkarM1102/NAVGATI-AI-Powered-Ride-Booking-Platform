"use client";

import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function MovingCar() {
    return (
        <div className="pointer-events-none absolute bottom-6 left-0 z-10 w-full overflow-hidden">
            <motion.div
                initial={{ x: "110vw" }}
                animate={{ x: "-30vw" }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="h-40 w-36 sm:h-40 sm:w-44 md:h-40 md:w-52 lg:h-40 lg:w-60"
            >
                <DotLottieReact
                    src="https://lottie.host/16bcf1d4-bccd-460c-add9-987d33d4ecee/xXI3RINoi9.lottie"
                    autoplay
                    loop
                />
            </motion.div>
        </div>
    );
}