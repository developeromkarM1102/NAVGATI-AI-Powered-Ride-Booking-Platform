"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Mic, MicOff, RotateCcw, Sparkles } from "lucide-react";
import { AnalyzeRide } from "../Services/ai.api";
import { ApiResponse } from "../types/ride.types";
import { SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from "../types/speech-recognition";
import TripSummary from "./TripSummary";
import RideOptions from "./RideOptions";
import AIRecommendation from "./AIRecommendation";

export default function AIBooking() {

  const [message, setMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tripData, setTripData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");

  const handleAnalyzeTrip = async () => {

    if (!message.trim()) return;

    setIsAnalyzing(true);
    setError("");

    try {

      const data = await AnalyzeRide({
        text: message.trim(),
      });



      if (data.error) {
        setError(data.error);
        return;
      }

      setTripData(data);

    } catch (error) {

      // console.error(
      //   "Analyze trip error:",
      //   error
      // );

      setError(
        "Unable to analyze your trip."
      );

    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setMessage("");
    setTripData(null);
    setError("");
  };

  const handleVoiceInput = () => {
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      setVoiceText(transcript);

      // console.log("Voice:", transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      // console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <section id="BookRide" className="relative overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">

      <div className="relative p-5 sm:p-6 lg:p-7">

        {/* HEADER */}

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

          <div className="flex items-start gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-200">
              <Sparkles size={21} />
            </div>

            <div>

              <div className="flex flex-wrap items-center gap-2">

                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Book with AI
                </h2>

                <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-600">
                  Smart Booking
                </span>

              </div>

              <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-500 sm:text-sm">
                Tell NavGati about your journey in your own words.
                Our AI will understand and optimize your trip.
              </p>

            </div>

          </div>

          <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">

            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

            <span className="text-[11px] font-semibold text-emerald-600">
              AI Online
            </span>

          </div>

        </div>


        {/* INPUT */}

        {!tripData && (
          <div className="mt-7">

            <label className="mb-2 block text-xs font-semibold text-slate-500">
              Tell us about your journey
            </label>

            <div className="relative">

              <Sparkles
                size={19}
                className="absolute left-4 top-4 text-orange-500"
              />

              <textarea
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value.slice(0, 500)
                  )
                }
                placeholder={`Try something like:
"I need to go from Andheri to Powai tomorrow at 7 PM. I have 3 passengers and luggage and want a safe, highly rated car."`}
                rows={5}
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-14 text-sm leading-relaxed text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-50"
              />

              <button
                type="button"
                onClick={handleVoiceInput}
                className={`absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-xl shadow-sm transition ${isListening
                    ? "bg-orange-500 text-white"
                    : "bg-white text-slate-500 hover:bg-orange-50 hover:text-orange-500"
                  }`}
              >
                {isListening ? (
                  <MicOff size={17} />
                ) : (
                  <Mic size={17} />
                )}
              </button>

            </div>

            <div className="mt-2 flex justify-end">
              <span className="text-[10px] text-slate-400">
                {message.length}/500
              </span>
            </div>

            {/* ERROR */}

            {error && (
              <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3 text-xs font-medium text-red-600">
                Due to Heavy request we are unable to book your Ride please try later.
              </div>
            )}


            {/* ACTION */}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-2 text-[10px] text-slate-400">

                <CheckCircle2
                  size={14}
                  className="text-emerald-500"
                />

                AI-powered trip understanding

              </div>

              <button
                type="button"
                onClick={handleAnalyzeTrip}
                disabled={
                  !message.trim() ||
                  isAnalyzing
                }
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 px-6 text-sm font-bold text-white shadow-lg shadow-orange-200 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-52.2"
              >

                {isAnalyzing ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Understanding trip...
                  </>
                ) : (
                  <>
                    <Sparkles size={17} />
                    Understand my trip
                    <ArrowRight size={16} />
                  </>
                )}

              </button>

            </div>

          </div>
        )}


        {/* RESULT */}

        {tripData && (
          <div className="mt-7">

            {/* RESULT HEADER */}

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                  <CheckCircle2 size={21} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                    I understood your trip
                  </h3>

                  <p className="text-[11px] text-slate-500">
                    Heres what NavGati extracted from your request.
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={handleReset}
                className="flex w-fit items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-semibold text-slate-500 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
              >
                <RotateCcw size={13} />
                Change request
              </button>

            </div>


            {/* TRIP SUMMARY */}

            <TripSummary
              requirements={
                tripData.requirements
              }
              route={tripData.route}
            />

            <RideOptions
              recommendations={tripData.recommendations}
              pickup={tripData.requirements.pickup}
              destination={tripData.requirements.destination}
              pickupCoordinates={tripData.requirements.pickupCoordinates}
              destinationCoordinates={tripData.requirements.destinationCoordinates}
              rideType={tripData.requirements.rideType}
              passengers={tripData.requirements.passengers}
              luggage={tripData.requirements.luggage}
            />


            {/* AI MESSAGE */}

            <AIRecommendation />


            {/* BOOK */}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-[10px] text-slate-400">
                You can review the recommendation before booking.
              </p>

            </div>

          </div>
        )}

      </div>

    </section>
  );
}