import {
  Sparkles,
  Mic,
  IndianRupee,
  Route,
  ShieldCheck,
  CloudSun,
} from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  size: "large" | "wide" | "normal";
}

export const features: Feature[] = [
  {
    title: "AI Trip Planner",
    description:
      "Simply type or speak your destination in natural language. NavGati AI understands your pickup, destination, preferred time, and travel intent without requiring long booking forms.",
    icon: Sparkles,
    gradient: "from-orange-500 to-yellow-400",
    size: "wide",
  },

  {
    title: "Voice Ride Booking",
    description:
      "Book rides completely hands-free using natural voice commands. Fast, convenient, and perfect when you're on the move.",
    icon: Mic,
    gradient: "from-pink-500 to-orange-400",
    size: "normal",
  },

  {
    title: "AI Fare Prediction",
    description:
      "Get accurate fare estimates powered by AI before booking. We analyze distance, demand, traffic, and historical ride patterns.",
    icon: IndianRupee,
    gradient: "from-green-500 to-emerald-400",
    size: "normal",
  },

  
  {
      title: "Ride Safety Intelligence",
      description:
      "Trip monitoring, live ride tracking, emergency alerts, and trusted contact sharing for a safer travel experience.",
      icon: ShieldCheck,
      gradient: "from-violet-500 to-fuchsia-400",
      size: "normal",
    },
    
    {
        title: "Weather & Traffic Insights",
        description:
        "Receive weather forecasts and congestion alerts before your ride starts, helping you choose the best travel option.",
        icon: CloudSun,
        gradient: "from-yellow-400 to-orange-500",
        size: "normal",
    },
    
    {
      title: "Real-Time Smart Navigation",
      description:
        "AI continuously analyzes traffic conditions to recommend the fastest and safest route with live ETA updates.",
      icon: Route,
      gradient: "from-blue-500 to-cyan-400",
      size: "wide",
    }
];