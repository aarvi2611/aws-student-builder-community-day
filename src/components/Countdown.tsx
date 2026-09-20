import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { EVENT_METADATA } from '../data/eventData';

export const Countdown: React.FC = () => {
  const targetDate = EVENT_METADATA.eventTimestamp;

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, hasStarted: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      hasStarted: false
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="py-6 px-4 sm:px-6 rounded-2xl bg-gradient-to-r from-surface-light via-[#0B1118] to-surface-light border border-white/10 shadow-xl backdrop-blur-md max-w-4xl mx-auto my-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left Label */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-aws-orange/15 border border-aws-orange/30 text-aws-orange flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-mono font-bold text-aws-orange uppercase tracking-wider">
              <span>COUNTDOWN TO BUILD DAY</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              19 October 2026 • 10:00 AM IST
            </h3>
          </div>
        </div>

        {/* Countdown Digits */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 shrink-0">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-[#05070A] border border-white/10 min-w-[62px] sm:min-w-[72px] shadow-inner"
            >
              <span className="text-xl sm:text-2xl font-black text-white font-mono leading-none tracking-tight">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-muted tracking-wider mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
