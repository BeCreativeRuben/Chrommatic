/**
 * Launch Timer Overlay Component
 * Displays a countdown timer until website launch date
 */

import { useState, useEffect } from "react";
import { IMAGE_PATHS } from "../../utils/imagePaths";

// Launch date: February 28, 2026 at 16:00 UTC+1 (Brussels time)
// Convert to UTC: UTC+1 means UTC time is 15:00
const LAUNCH_DATE = new Date("2026-02-28T15:00:00Z"); // 16:00 UTC+1 = 15:00 UTC

function LaunchTimer({ onTimerComplete }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      // If timer has expired, call the completion callback
      if (remaining.total <= 0) {
        clearInterval(timer);
        if (onTimerComplete) {
          onTimerComplete();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimerComplete]);

  function calculateTimeLeft() {
    const now = new Date();
    const difference = LAUNCH_DATE - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      total: difference,
    };
  }

  // Format numbers with leading zeros
  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-b from-black via-black/98 to-black/95 backdrop-blur-lg flex items-center justify-center">
      <div className="text-center px-4 sm:px-6 md:px-8 w-full max-w-4xl">
        {/* Logo */}
        <div className="mb-8 sm:mb-12 animate-fade-in">
          <img
            src={IMAGE_PATHS.logo}
            alt="Chromattic logo"
            className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto mx-auto logo-metallic"
            loading="eager"
          />
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 uppercase tracking-widest font-display gradient-text animate-fade-in-delay">
          WEBSITE LAUNCH
        </h1>

        {/* Countdown Timer */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 mb-8 sm:mb-12 animate-fade-in-delay-2">
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-b from-red-900/50 to-black border border-red-900/50 rounded-sm px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 min-w-[60px] sm:min-w-[80px] md:min-w-[100px]">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white">
                {formatNumber(timeLeft.days)}
              </div>
            </div>
            <div className="mt-2 sm:mt-3 text-xs sm:text-sm uppercase tracking-widest text-gray-400">
              Dagen
            </div>
          </div>

          {/* Separator */}
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 self-center">
            :
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-b from-red-900/50 to-black border border-red-900/50 rounded-sm px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 min-w-[60px] sm:min-w-[80px] md:min-w-[100px]">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white">
                {formatNumber(timeLeft.hours)}
              </div>
            </div>
            <div className="mt-2 sm:mt-3 text-xs sm:text-sm uppercase tracking-widest text-gray-400">
              Uren
            </div>
          </div>

          {/* Separator */}
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 self-center">
            :
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-b from-red-900/50 to-black border border-red-900/50 rounded-sm px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 min-w-[60px] sm:min-w-[80px] md:min-w-[100px]">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white">
                {formatNumber(timeLeft.minutes)}
              </div>
            </div>
            <div className="mt-2 sm:mt-3 text-xs sm:text-sm uppercase tracking-widest text-gray-400">
              Minuten
            </div>
          </div>

          {/* Separator */}
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 self-center">
            :
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-b from-red-900/50 to-black border border-red-900/50 rounded-sm px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 min-w-[60px] sm:min-w-[80px] md:min-w-[100px]">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white">
                {formatNumber(timeLeft.seconds)}
              </div>
            </div>
            <div className="mt-2 sm:mt-3 text-xs sm:text-sm uppercase tracking-widest text-gray-400">
              Seconden
            </div>
          </div>
        </div>

        {/* Decorative line */}
        <div className="w-24 sm:w-32 md:w-40 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto animate-fade-in-delay-3"></div>
      </div>
    </div>
  );
}

export default LaunchTimer;
