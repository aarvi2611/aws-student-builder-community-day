import React from 'react';
import { Calendar, MapPin, Clock, Ticket, Sparkles } from 'lucide-react';
import { EVENT_METADATA } from '../data/eventData';

export const EventInfo: React.FC = () => {
  const highlights = [
    {
      icon: Calendar,
      label: 'DATE',
      value: EVENT_METADATA.date,
      subtext: 'Monday • Fall 2026',
      color: 'text-aws-orange',
      bgGlow: 'group-hover:border-aws-orange/40'
    },
    {
      icon: MapPin,
      label: 'VENUE',
      value: 'Rungta University',
      subtext: 'Bhilai Campus • Central Hall',
      color: 'text-aws-brightBlue',
      bgGlow: 'group-hover:border-aws-brightBlue/40'
    },
    {
      icon: Clock,
      label: 'TIMINGS',
      value: '10:00 AM – 5:00 PM',
      subtext: 'Check-in begins 09:30 AM',
      color: 'text-amber-400',
      bgGlow: 'group-hover:border-amber-400/40'
    },
    {
      icon: Ticket,
      label: 'ADMISSION',
      value: 'Free Registration',
      subtext: 'Includes Access & Kit',
      color: 'text-emerald-400',
      bgGlow: 'group-hover:border-emerald-400/40'
    }
  ];

  return (
    <section className="relative -mt-6 sm:-mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-[#0B1118]/90 border border-white/15 p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`group pt-4 sm:pt-0 sm:px-4 first:pt-0 first:pl-0 last:pr-0 transition-all duration-200 flex items-center gap-4`}
              >
                <div className={`p-3 rounded-xl bg-surface-light border border-white/10 ${item.bgGlow} transition-colors shrink-0`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-mono tracking-wider text-muted font-semibold uppercase">
                    {item.label}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {item.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
