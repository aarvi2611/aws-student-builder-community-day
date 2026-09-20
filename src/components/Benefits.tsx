import React from 'react';
import { Boxes, Terminal, Sparkles, Users, FolderGit2, Award, CheckCircle } from 'lucide-react';
import { BENEFITS } from '../data/eventData';

export const Benefits: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Boxes,
    Terminal,
    Sparkles,
    Users,
    FolderGit2,
    Award
  };

  return (
    <section className="py-24 relative" id="benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aws-blue/10 border border-aws-blue/30 text-aws-brightBlue text-xs font-mono font-medium">
            <span>KEY TAKEAWAYS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why You Should <span className="text-gradient-aws">Be Here</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            This isn't a passive webinar or promotional presentation. It's a high-density, immersive builder workshop designed to give you tangible engineering advantages.
          </p>
        </div>

        {/* Varied Editorial Benefits Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, idx) => {
            const Icon = iconMap[benefit.icon] || Boxes;
            const isFeatured = idx === 0 || idx === 1;

            return (
              <div
                key={benefit.id}
                className={`relative rounded-2xl p-7 border transition-all duration-300 flex flex-col justify-between group ${
                  isFeatured
                    ? 'bg-gradient-to-b from-[#111923] to-[#0B1118] border-white/15 hover:border-aws-orange/40 shadow-xl'
                    : 'bg-surface/70 border-white/10 hover:border-white/20'
                }`}
              >
                {/* Top Badge & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-surface-light border border-white/10 flex items-center justify-center text-aws-orange group-hover:text-white group-hover:bg-aws-orange transition-all duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
                      {benefit.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight mb-1 group-hover:text-aws-brightBlue transition-colors">
                    {benefit.title}
                  </h3>
                  <div className="text-xs font-mono text-aws-orange mb-3">
                    {benefit.subtitle}
                  </div>

                  <p className="text-sm text-muted leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Bottom Verification Check */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-gray-400 font-mono">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Interactive & Verified Skill</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
