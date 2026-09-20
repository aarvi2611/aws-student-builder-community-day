import React from 'react';
import { Rocket, Lightbulb, Compass, Code2, Globe2, Trophy, ArrowRight, Zap, Terminal } from 'lucide-react';
import { CHALLENGE_STEPS } from '../data/eventData';

interface ChallengeProps {
  onReadyToBuildClick: () => void;
}

export const Challenge: React.FC<ChallengeProps> = ({ onReadyToBuildClick }) => {
  const stepIcons = [Lightbulb, Compass, Code2, Globe2, Trophy];

  return (
    <section className="py-24 relative overflow-hidden" id="challenge">
      {/* Background glowing energy */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-aws-orange/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-aws-brightBlue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Card Container */}
        <div className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-[#111923] via-[#0B1118] to-[#05070A] border border-aws-orange/30 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Radial Arc */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-aws-orange/15 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aws-orange/20 border border-aws-orange/40 text-aws-orange text-xs font-mono font-bold tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>75-MINUTE HACK SPRINT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Your Challenge: <br />
              <span className="text-gradient-aws">Build Something Real</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Teams will transform a problem idea into a working, deployed cloud prototype in real time. Mentors provide architectural feedback, sandbox cloud credits are provisioned, and live demos wrap up the sprint.
            </p>
          </div>

          {/* 5-Stage Visual Workflow Pipeline */}
          <div className="mt-14">
            <div className="text-xs font-mono text-muted uppercase tracking-wider mb-6 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-aws-orange" />
              <span>THE 5-STAGE SPRINT LIFECYCLE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {CHALLENGE_STEPS.map((step, idx) => {
                const Icon = stepIcons[idx];

                return (
                  <div
                    key={step.step}
                    className="p-5 rounded-xl bg-black/40 border border-white/10 hover:border-aws-orange/50 transition-all duration-300 flex flex-col justify-between group relative"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-surface-light border border-white/10 flex items-center justify-center text-aws-orange group-hover:bg-aws-orange group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs font-bold text-muted/80">
                          {step.step}
                        </span>
                      </div>

                      <div className="font-mono text-[11px] font-bold tracking-wider text-aws-brightBlue uppercase mb-1">
                        {step.name}
                      </div>

                      <div className="text-sm font-bold text-white mb-2">
                        {step.title}
                      </div>

                      <p className="text-xs text-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {idx < CHALLENGE_STEPS.length - 1 && (
                      <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-muted/40 font-mono text-sm">
                        →
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to Action Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sandbox AWS credits provided • Teams of 1–3 members • Mentorship on standby</span>
            </div>

            <button
              onClick={onReadyToBuildClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-base text-white bg-gradient-to-r from-aws-orange to-[#F59E0B] shadow-xl shadow-aws-orange/30 hover:shadow-aws-orange/50 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shrink-0 group"
            >
              <span>I'm Ready to Build</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
