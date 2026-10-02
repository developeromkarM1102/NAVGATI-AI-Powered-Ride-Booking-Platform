"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Plus, Minus, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "How does AI booking work?",
    answer:
      "Simply describe your trip in natural language like 'Take me from Vashi to TCS Mahape tomorrow at 9 AM.' NavGati AI understands your request, predicts fares, compares ride options, and prepares your booking within seconds.",
  },
  {
    question: "Can I book rides using voice commands?",
    answer:
      "Yes. Tap the microphone icon and speak naturally. NavGati converts your voice into a complete trip request without requiring manual form filling.",
  },
  {
    question: "How accurate are the fare predictions?",
    answer:
      "Our AI analyzes real-time traffic, demand, weather, and historical ride data to provide highly accurate fare estimates before booking.",
  },
  {
    question: "Can I schedule rides in advance?",
    answer:
      "Absolutely. You can book rides instantly or schedule trips for later. NavGati also recommends the best departure time based on traffic predictions.",
  },
  {
    question: "Which ride options are available?",
    answer:
      "Choose from Bike, Auto, Mini, Sedan, SUV, Premium, and EV rides. NavGati compares prices, arrival times, and comfort to recommend the best option.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "Yes. Your trip details, personal information, and payment data are encrypted using modern security standards to ensure complete privacy.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes. Before your driver arrives, you can modify pickup, destination, ride type, or cancel your booking directly from the app.",
  },
  {
    question: "Does NavGati support live traffic updates?",
    answer:
      "Yes. Live traffic monitoring helps NavGati recommend the fastest routes and provide accurate ETAs throughout your journey.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#F8FAFC] py-24"
    >
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-orange-100 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-orange-200/40 blur-[120px]" />

      <div className="relative mx-auto max-w-screen px-6">

        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-2 shadow-sm">
            <Sparkles
              size={16}
              className="text-orange-500"
            />
            <span className="font-medium text-orange-600">
              Frequently Asked Questions
            </span>
          </div>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto mt-8 max-w-3xl text-center text-4xl font-blackops text-gray-900 md:text-5xl"
        >
          Everything You Need to Know About{" "}
          <span className="bg-linear-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
            NavGati AI
          </span>
        </motion.h2>

        <p className="mx-auto font-playfair mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Have questions? We've answered the most common ones to help
          you get started with AI-powered ride booking.
        </p>

        {/* FAQ */}
        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-lg"
              >
                <button
                  onClick={() =>
                    setOpen(isOpen ? -1 : index)
                  }
                  className="flex w-full items-center justify-between px-7 py-6 text-left cursor-pointer"
                >
                  <h3 className="text-lg font-playfair text-gray-900">
                    {faq.question}
                  </h3>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                    {isOpen ? (
                      <Minus size={20} />
                    ) : (
                      <Plus size={20} />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                    >
                      <div className="border-t border-orange-100 px-7 pb-6 pt-5">
                        <p className="leading-8 text-gray-600">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.3,
          }}
          className="mt-20 rounded-[32px] bg-linear-to-r from-orange-500 to-amber-400 p-10 text-center text-white shadow-2xl"
        >
          <MessageCircle
            size={44}
            className="mx-auto"
          />

          <h3 className="mt-5 text-3xl font-bold">
            Still Have Questions?
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-orange-100">
            Our AI assistant is available 24/7 to help you understand
            features, compare rides, and book your perfect journey.
          </p>

          <button className="mt-8 rounded-full bg-white px-8 py-4 font-semibold text-orange-500 shadow-lg transition hover:scale-105">
            Chat With AI Assistant
          </button>
        </motion.div>

      </div>
    </section>
  );
}