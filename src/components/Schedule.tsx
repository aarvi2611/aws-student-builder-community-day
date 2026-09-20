import React, { useState } from 'react';
import { Clock, MapPin, User, Tag, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { SCHEDULE } from '../data/eventData';

export const Schedule: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterOptions = [
    { label: 'All Sessions', value: 'all' },
    { label: 'Keynotes & Talks', value: 'talks' },
    { label: 'Hands-on Labs', value: 'labs' },
    { label: 'Build Challenge', value: 'challenge' },
    { label: 'Networking', value: 'networking' },
  ];

  const filteredSchedule = SCHEDULE.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'talks') return item.type === 'keynote' || item.type === 'fundamentals' || item.type === 'ai';
    if (activeFilter === 'labs') return item.type === 'hands-on';
    if (activeFilter === 'challenge') return item.type === 'challenge' || item.type === 'showcase';
    if (activeFilter === 'networking') return item.type === 'networking' || item.type === 'wrapup';
    return true;
  });

  return (
    <section className="py-24 relative overflow-hidden" id="schedule">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-aws-blue/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aws-blue/10 border border-aws-blue/30 text-aws-brightBlue text-xs font-mono font-medium">
            <span>FULL AGENDA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            A Day Built Around <span className="text-gradient-aws">Learning</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            From morning architectural fundamentals to afternoon generative AI pipelines and a rapid prototype challenge, every minute is structured for builder momentum.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveFilter(opt.value)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
                activeFilter === opt.value
                  ? 'bg-aws-orange text-white border-aws-orange shadow-md shadow-aws-orange/20 font-semibold'
                  : 'bg-surface/70 border-white/10 text-muted hover:text-white hover:border-white/20'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Timeline Component */}
        <div className="mt-14 max-w-4xl mx-auto relative">
          
          {/* Vertical Progress Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-aws-orange via-aws-brightBlue to-aws-blue opacity-30 -translate-x-1/2" />

          <div className="space-y-6 relative">
            {filteredSchedule.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } group`}
                >
                  {/* Center Node Marker */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-6 z-10 w-4 h-4 rounded-full bg-[#05070A] border-2 border-aws-orange group-hover:border-aws-brightBlue group-hover:scale-125 transition-all shadow-md shadow-aws-orange/40" />

                  {/* Spacer for other half on desktop */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Content Card */}
                  <div
                    className={`ml-10 sm:ml-0 sm:w-1/2 ${
                      isEven ? 'sm:pr-10' : 'sm:pl-10'
                    } w-[calc(100%-2.5rem)]`}
                  >
                    <div className="p-6 rounded-2xl bg-surface/80 border border-white/10 hover:border-aws-orange/40 transition-all duration-300 shadow-xl group-hover:-translate-y-0.5 backdrop-blur-md">
                      
                      {/* Top Time & Track Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-aws-orange bg-aws-orange/10 px-2.5 py-1 rounded-md border border-aws-orange/20">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{item.time}</span>
                          {item.endTime && <span className="text-muted font-normal">– {item.endTime}</span>}
                        </div>

                        {item.trackBadge && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-aws-brightBlue">
                            {item.trackBadge}
                          </span>
                        )}
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-aws-brightBlue transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                        {item.description}
                      </p>

                      {/* Speaker & Location Footer */}
                      <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
                        {item.speaker ? (
                          <div className="flex items-center gap-1.5 text-gray-300">
                            <User className="w-3.5 h-3.5 text-aws-orange" />
                            <span className="font-medium">{item.speaker}</span>
                            {item.speakerRole && <span className="text-muted text-[11px]">({item.speakerRole})</span>}
                          </div>
                        ) : (
                          <span className="text-muted italic text-[11px]">Open Community Format</span>
                        )}

                        <div className="flex items-center gap-1.5 text-muted font-mono text-[11px]">
                          <MapPin className="w-3 h-3 text-aws-brightBlue" />
                          <span>{item.location}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
