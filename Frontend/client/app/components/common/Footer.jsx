"use client";

import { MapPin, Phone, Mail, ArrowRight, } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Footer() {

  const pathname = usePathname();

  const isDriveDash = pathname === "/DriveDash";
  const isDashboard = pathname === "/Dashboard";
  const isUserLogin = pathname === "/User/login";
  const isDriverLogin = pathname === "/Driver/login";
  const isUserRegister = pathname === "/User/register";
  const isDriverRegister = pathname === "/Driver/register";

  if (isDashboard | isDriveDash | isUserLogin | isDriverLogin | isUserRegister | isDriverRegister) {
    return null;
  }

  return (
    <footer className="bg-[#0B1220] text-white">
      {/* Top Section */}
      <div className="max-w-screen mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Logo */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold">
            <span className="text-orange-500">Nav</span>Gati
          </h1>

          <p className="mt-5 text-gray-400 leading-7">
            AI-powered ride booking platform that understands your journey
            through natural language. Simply describe where you want to go,
            and let NavGati handle the rest.
          </p>

          <div className="flex gap-4 mt-8">
            <a className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition">
              <FaFacebookF size={20} />
            </a>

            <a className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition">
              <FaInstagram size={20} />
            </a>

            <a className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition">
              <FaLinkedinIn size={20} />
            </a>

          </div>
        </div>

        {/* Product */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Product</h2>

          <ul className="space-y-4 text-gray-400">
            <li><a href="#">Book Ride</a></li>
            <li><a href="#">AI Trip Planner</a></li>
            <li><a href="#">Ride Sharing</a></li>
            <li><a href="#">Safety</a></li>
            <li><a href="#">Pricing</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Company</h2>

          <ul className="space-y-4 text-gray-400">
            <li><a href="#">About</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blogs</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Contact</h2>

          <div className="space-y-5 text-gray-400">

            <div className="flex gap-3">
              <MapPin className="text-orange-500 mt-1" size={18} />
              <span>Mumbai, Maharashtra, India</span>
            </div>

            <div className="flex gap-3">
              <Phone className="text-orange-500 mt-1" size={18} />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex gap-3">
              <Mail className="text-orange-500 mt-1" size={18} />
              <span>support@navgati.ai</span>
            </div>

          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-white/10">
        <div className="max-w-screen mx-auto px-6 lg:px-8 py-10 flex flex-col lg:flex-row justify-between items-center gap-8">

          <div>
            <h2 className="text-2xl font-bold">
              Stay Updated 🚖
            </h2>

            <p className="text-gray-400 mt-2">
              Subscribe to receive product updates and AI travel tips.
            </p>
          </div>

          <div className="flex w-full lg:w-auto">

            <input
              type="email"
              placeholder="Enter your email..."
              className="w-full lg:w-80 px-5 py-3 rounded-l-xl bg-white text-gray-900 outline-none"
            />

            <button className="bg-orange-500 hover:bg-orange-600 px-6 rounded-r-xl flex items-center gap-2 transition">
              Subscribe
              <ArrowRight size={18} />
            </button>

          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-400 text-sm">
            © 2026 NavGati. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-400">

            <a href="#" className="hover:text-orange-500">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-orange-500">
              Terms & Conditions
            </a>

            <a href="#" className="hover:text-orange-500">
              Cookies
            </a>

          </div>

        </div>
      </div>
    </footer>
  );
}