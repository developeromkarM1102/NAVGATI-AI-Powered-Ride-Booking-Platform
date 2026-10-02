"use client";

import { useEffect, useRef, useState } from "react";

export default function AIdemo() {
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: "400px",
                threshold: 0.01,
            }
        );

        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    const handleVideoClick = async () => {
        const video = videoRef.current;

        if (!video || !isLoaded) return;

        try {
            if (video.paused) {
                await video.play();
                setIsPlaying(true);
            } else {
                video.pause();
                setIsPlaying(false);
            }
        } catch (error) {
            // console.log("Video play failed:", error);
        }
    };

    return (
        <section ref={containerRef} id="demo" className="relative w-full overflow-hidden bg-[#fffaf5] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-32 top-20 h-64 w-64 rounded-full bg-orange-300/10 blur-3xl sm:h-80 sm:w-80" />
                <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-blue-300/10 blur-3xl sm:h-96 sm:w-96" />
            </div>

            <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">

                <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10 md:mb-12 lg:mb-14">

                    <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 sm:mb-5 sm:px-4 sm:py-2">
                        <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-orange-500 sm:h-2 sm:w-2" />
                        <span className="whitespace-nowrap text-[11px] font-semibold text-orange-600 sm:text-xs md:text-sm">
                            See NavGati in Action
                        </span>
                    </div>

                    <h2 className="text-3xl font-blackops font-black leading-[1.08] tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                        See How NavGati Turns
                        <span className="mt-1 block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent sm:mt-2">
                            <span className="text-blue-400">Words & Voice</span>
                            <br />
                            Into a Journey.
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl px-2 font-playfair text-sm leading-6 text-slate-500 sm:mt-5 sm:px-0 sm:text-base sm:leading-7 md:max-w-2xl md:text-lg">
                        Experience how NavGati uses AI to understand your trip, find the right ride, and get you moving smarter and faster.
                    </p>
                </div>

                <div onClick={handleVideoClick} className="group relative mx-auto w-full max-w-6xl cursor-pointer overflow-hidden rounded-xl border border-slate-200/70 bg-slate-950 shadow-[0_20px_60px_rgba(0,0,0,0.14)] transition-transform duration-500 hover:shadow-[0_25px_80px_rgba(0,0,0,0.18)] sm:rounded-2xl md:rounded-3xl">

                    {!isLoaded && (
                        <div className="absolute inset-0 z-40 flex min-h-[220px] items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 sm:min-h-[300px] md:min-h-[400px] lg:min-h-0">
                            <div className="flex flex-col items-center gap-3 px-4 text-center sm:gap-4">
                                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-orange-500 sm:h-10 sm:w-10" />
                                <p className="text-[10px] font-medium tracking-wide text-white/60 sm:text-xs">
                                    Loading NavGati Demo...
                                </p>
                            </div>
                        </div>
                    )}

                    {isVisible && (
                        <video
                            ref={videoRef}
                            className={`block aspect-video h-auto w-full object-cover transition-opacity duration-700 ease-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
                            src="/NavGatiDemo.mp4"
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            controls={false}
                            onLoadedData={() => setIsLoaded(true)}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        />
                    )}

                    <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/30 via-transparent to-black/5" />

                    {isLoaded && !isPlaying && (
                        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/90 shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24">
                                <div className="ml-1 h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-orange-500 sm:border-y-[10px] sm:border-l-[16px] md:border-y-[12px] md:border-l-[19px]" />
                            </div>
                        </div>
                    )}

                    <div className="pointer-events-none absolute bottom-3 left-3 z-30 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-2.5 py-1.5 backdrop-blur-md sm:bottom-4 sm:left-4 sm:gap-2 sm:px-3 sm:py-1.5 md:left-6 md:top-6 md:bottom-auto md:px-4 md:py-2">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500 sm:h-2 sm:w-2" />
                        <span className="text-[9px] font-semibold text-white sm:text-xs md:text-sm">
                            AI-Powered Mobility
                        </span>
                    </div>

                    {isLoaded && !isPlaying && (
                        <div className="pointer-events-none absolute bottom-3 right-3 z-30 rounded-full bg-black/35 px-2.5 py-1.5 text-[9px] font-medium text-white/80 backdrop-blur-md sm:bottom-4 sm:right-4 sm:text-[10px] md:hidden">
                            Tap to play
                        </div>
                    )}
                </div>

                <div className="mt-5 flex flex-col items-center justify-center gap-2 text-center sm:mt-6 sm:flex-row sm:gap-3">
                    <span className="text-[11px] font-medium text-slate-400 sm:text-xs">
                        AI understands your request
                    </span>

                    <span className="hidden text-slate-300 sm:block">•</span>

                    <span className="text-[11px] font-medium text-slate-400 sm:text-xs">
                        Recommends the right ride
                    </span>

                    <span className="hidden text-slate-300 sm:block">•</span>

                    <span className="text-[11px] font-medium text-slate-400 sm:text-xs">
                        Gets you moving
                    </span>
                </div>
            </div>
        </section>
    );
}