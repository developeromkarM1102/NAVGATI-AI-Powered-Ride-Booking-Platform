"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
    { name: "Home", href: "#Home" },
    { name: "How It Work?", href: "#howItWorks" },
    { name: "Features", href: "#features" },
    { name: "AI Demo", href: "#demo" },
    { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const isDashboard = pathname === "/Dashboard";
    const isDriveDash = pathname === "/DriveDash";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    if (isDashboard || isDriveDash) {
        return null;
    }

    const getNavHref = (href) => {
        if (pathname === "/") {
            return href;
        }

        return `/${href}`;
    };

    const handleNavClick = (href) => {
        setMenuOpen(false);

        if (pathname === "/") {
            const id = href.replace("#", "");
            const element = document.getElementById(id);

            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            } else {
                window.location.hash = id;
            }

            return;
        }

        router.push(`/${href}`);
    };

    return (
        <header className="fixed left-0 top-0 z-50 w-full bg-transparent">
            <div className="mx-3 mt-2 max-w-screen rounded-full bg-gradient-to-r from-[#8ea5f6d0] via-[#aabefe] to-[#fb964e] px-4 sm:px-6 lg:mx-auto lg:px-10">
                <div className="flex h-16 items-center justify-between">

                    <button
                        type="button"
                        onClick={() => handleNavClick("#Home")}
                        className="flex items-center gap-1"
                    >
                        <Image
                            src="/logo.png"
                            alt="NavGati"
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                        />
                        <span className="bg-orange-500 bg-clip-text text-2xl font-blackops text-transparent">
                            Nav
                        </span>

                        <span className="text-2xl font-blackops text-gray-900">
                            Gati
                        </span>
                    </button>

                    <nav className="hidden items-center gap-10 lg:flex">
                        {navLinks.map((item) => (
                            <button
                                key={item.name}
                                type="button"
                                onClick={() => handleNavClick(item.href)}
                                className="font-medium text-gray-700 transition hover:border-b-2 hover:text-orange-500"
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-4 lg:flex">
                        <Link
                            href="/Dashboard"
                            className="flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
                        >
                            Try AI Booking
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        className="flex items-center justify-center rounded-lg p-2 lg:hidden"
                        aria-label="Open menu"
                    >
                        <Menu
                            size={30}
                            className="text-gray-800"
                        />
                    </button>
                </div>
            </div>

            <div
                className={`fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 ${menuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"}`}
                onClick={() => setMenuOpen(false)}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute right-0 top-0 h-full w-full bg-gradient-to-r from-[#8ea5f6d0] to-[#aabefe] text-center shadow-2xl transition-transform duration-300 sm:w-[380px] ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
                >

                    <div className="flex items-center justify-between bg-gradient-to-r from-[#8ea5f6d0] via-[#aabefe] to-[#fb964e] px-5 py-4">
                        <Image
                            src="/logo.png"
                            loading="eager"
                            alt="NavGati"
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                        />
                        <h2 className="text-2xl font-blackops">
                            <span className="text-orange-500">
                                Nav
                            </span>
                            Gati
                        </h2>

                        <button
                            type="button"
                            onClick={() => setMenuOpen(false)}
                            className="rounded-lg p-1 transition hover:bg-white/20"
                            aria-label="Close menu"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-6 p-6">
                        {navLinks.map((item) => (
                            <button
                                key={item.name}
                                type="button"
                                onClick={() => handleNavClick(item.href)}
                                className="font-playfair text-lg text-black transition hover:text-orange-500"
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    <div className="absolute bottom-8 left-6 right-6 font-playfair">
                        <button
                            type="button"
                            onClick={() => {
                                setMenuOpen(false);
                                router.push("/Dashboard");
                            }}
                            className="w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 py-3 text-white shadow-lg transition hover:scale-[1.02]"
                        >
                            Try AI Booking
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}