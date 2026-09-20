import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import { SPEAKERS } from '../data/eventData';
import { GitHubIcon, LinkedInIcon } from './SocialIcons';

export const Speakers: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="speakers">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-aws-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aws-orange/10 border border-aws-orange/30 text-aws-orange text-xs font-mono font-medium">
            <span>MENTORS & INSTRUCTORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Learn from Seasoned <span className="text-gradient-aws">Builders</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Hands-on guidance from engineers, cloud specialists, and community leaders specializing in cloud infrastructure, generative AI, full-stack edge delivery, and modern DevOps.
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPEAKERS.map((speaker) => (
            <div
              key={speaker.id}
              className="group relative rounded-2xl bg-surface/80 border border-white/10 overflow-hidden hover:border-aws-orange/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-aws-orange/10"
            >
              {/* Speaker Visual Header */}
              <div className="p-6 pb-4">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-5 bg-[#05070A] border border-white/10 group-hover:border-white/20 transition-all flex items-center justify-center">
                  
                  {/* Dynamic Abstract Tech Avatar Background */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${speaker.avatarGradient} opacity-30 group-hover:opacity-40 transition-opacity`} />
                  
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-surface-light/90 border border-white/15 flex items-center justify-center text-2xl font-extrabold text-white font-mono shadow-2xl group-hover:scale-105 group-hover:border-aws-orange/50 transition-all">
                      {speaker.initials}
                    </div>
                    <span className="mt-2 text-[10px] font-mono tracking-widest uppercase text-aws-brightBlue bg-black/60 px-2 py-0.5 rounded border border-white/10">
                      SPEAKER & MENTOR
                    </span>
                  </div>

                  {/* Top Track Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-aws-brightBlue">
                      {speaker.tag}
                    </span>
                  </div>
                </div>

                {/* Speaker Identity */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-aws-brightBlue transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="text-xs font-medium text-aws-orange">
                    {speaker.role}
                  </p>
                  <p className="text-[11px] text-muted font-mono">
                    {speaker.organization}
                  </p>
                </div>

                {/* Session Topic */}
                <div className="mt-4 pt-3 border-t border-white/5 space-y-1">
                  <div className="text-[10px] font-mono text-muted uppercase tracking-wider">
                    SESSION TOPIC
                  </div>
                  <div className="text-xs font-semibold text-gray-200 line-clamp-2">
                    "{speaker.topic}"
                  </div>
                </div>

                {/* Bio */}
                <p className="mt-3 text-xs text-muted leading-relaxed line-clamp-3">
                  {speaker.bio}
                </p>
              </div>

              {/* Bottom Social / Track Bar */}
              <div className="px-6 py-3.5 bg-surface-light/60 border-t border-white/10 flex items-center justify-between text-xs text-muted">
                <span className="text-[11px] font-mono text-gray-400">Community Mentor</span>
                <div className="flex items-center gap-2">
                  <a
                    href={speaker.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    aria-label={`${speaker.name} GitHub profile`}
                  >
                    <GitHubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    aria-label={`${speaker.name} LinkedIn profile`}
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
