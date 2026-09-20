import React from 'react';
import { Cloud, Cpu, Layers, GitBranch, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TRACKS } from '../data/eventData';

interface TracksProps {
  onSelectTrackForRegistration?: (trackName: string) => void;
}

export const Tracks: React.FC<TracksProps> = ({ onSelectTrackForRegistration }) => {
  const trackIcons = [Cloud, Cpu, Layers, GitBranch];

  return (
    <section className="py-24 relative overflow-hidden" id="tracks">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aws-orange/10 border border-aws-orange/30 text-aws-orange text-xs font-mono font-medium">
            <span>SPECIALIZED STREAMS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Choose Your <span className="text-gradient-aws">Builder Path</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Whether you want to build rock-solid cloud infrastructure, orchestrate intelligent foundation models, construct full-stack apps, or automate production DevOps pipelines, pick your stream.
          </p>
        </div>

        {/* 4 Tracks Distinct Layout */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {TRACKS.map((track, idx) => {
            const Icon = trackIcons[idx];

            return (
              <div
                key={track.id}
                className="relative rounded-2xl p-7 sm:p-8 bg-surface/90 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-xl backdrop-blur-md hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-surface-light border border-white/10 flex items-center justify-center text-aws-orange group-hover:bg-aws-orange group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-md border ${track.accentColor}`}>
                      {track.badge}
                    </span>
                  </div>

                  {/* Track Title */}
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-1 group-hover:text-aws-brightBlue transition-colors">
                    {track.title}
                  </h3>
                  <div className="text-xs font-mono text-aws-orange mb-4">
                    {track.subtitle}
                  </div>

                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {track.description}
                  </p>

                  {/* Key Technologies Tags */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">
                      PRIMARY SERVICES & TOOLS
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {track.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Core Topics Covered */}
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">
                      WHAT YOU WILL BUILD & MASTER
                    </div>
                    <ul className="space-y-1.5">
                      {track.keyTopics.map((topic, kIdx) => (
                        <li key={kIdx} className="flex items-start gap-2 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-aws-brightBlue shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Audience Footer */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-muted">
                  <span className="italic truncate max-w-[280px]">Target: {track.targetAudience}</span>
                  {onSelectTrackForRegistration && (
                    <button
                      onClick={() => onSelectTrackForRegistration(track.title)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-aws-orange hover:text-white transition-colors"
                    >
                      <span>Pick Path</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
