import React, { useState, useEffect, useRef } from 'react';
import { STATS } from '../data/eventData';
import { Sparkles, TrendingUp } from 'lucide-react';

export const Stats: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters
          const duration = 1600; // ms
          const frameRate = 30;
          const totalFrames = Math.round(duration / (1000 / frameRate));
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = Math.min(frame / totalFrames, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts(
              STATS.map((stat) => Math.round(stat.value * easeOut))
            );

            if (frame >= totalFrames) {
              clearInterval(timer);
              setCounts(STATS.map((stat) => stat.value));
            }
          }, 1000 / frameRate);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-20 relative" id="stats">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0B1118] via-[#111923] to-[#0B1118] border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
            <div className="flex items-center gap-2 font-mono text-xs text-aws-brightBlue uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-aws-orange" />
              <span>COMMUNITY PARTICIPATION TARGETS</span>
            </div>
            <span className="text-xs font-mono text-muted">Rungta University 2026</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {STATS.map((stat, idx) => (
              <div
                key={stat.id}
                className="pt-6 sm:pt-0 sm:px-6 first:pt-0 first:pl-0 last:pr-0 space-y-2 group"
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-mono">
                    {hasAnimated ? counts[idx] : stat.value}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-aws-orange font-mono">
                    {stat.suffix}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-200 tracking-tight">
                  {stat.label}
                </h3>

                <p className="text-xs text-muted leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[11px] text-gray-400 font-mono">
              Registrations handled on a first-confirmed basis. Seats allocated across Auditorium A and Cloud Labs.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
