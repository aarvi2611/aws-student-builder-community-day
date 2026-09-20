import React, { useState } from 'react';
import { BookOpen, Hammer, Rocket, Share2, CheckCircle2, ArrowRight, Code, Server, Cpu } from 'lucide-react';
import { WORKFLOW_STAGES } from '../data/eventData';

export const About: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const stageIcons = [BookOpen, Hammer, Rocket, Share2];

  const focusAreas = [
    { title: "Cloud Computing & AWS", desc: "Foundational infrastructure, high-availability architecture, and cost-effective scaling." },
    { title: "Generative AI & Bedrock", desc: "Prompt engineering, embeddings, vector indexing, and foundation model orchestration." },
    { title: "Serverless Microservices", desc: "Event-driven systems using Lambda, DynamoDB, and API Gateway with zero server maintenance." },
    { title: "DevOps & CI/CD Pipelines", desc: "Automated container builds, GitHub Actions deployments, and declarative infrastructure code." },
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="about">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-aws-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aws-orange/10 border border-aws-orange/30 text-aws-orange text-xs font-mono font-medium">
            <span>ABOUT THE COMMUNITY DAY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Build What’s <span className="text-gradient-aws">Next</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            A student-centric day constructed to bridge classroom theory and actual cloud engineering. We believe that true technical mastery begins when you open a terminal, configure infrastructure, and deploy code that serves live traffic.
          </p>
        </div>

        {/* The 4-Step Interactive Visual: Learn -> Build -> Deploy -> Share */}
        <div className="mt-16 bg-surface/80 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
              The Builder Lifecycle
            </h3>
            <p className="text-sm text-muted mt-1">
              Every participant follows a curated learning progression engineered for maximum retention
            </p>
          </div>

          {/* Workflow Stepper Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative">
            {WORKFLOW_STAGES.map((stage, idx) => {
              const Icon = stageIcons[idx];
              const isCurrent = activeStage === idx;

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  className={`text-left p-5 rounded-xl border transition-all duration-300 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-aws-orange ${
                    isCurrent
                      ? 'bg-surface-light border-aws-orange/60 shadow-lg shadow-aws-orange/10 scale-[1.02]'
                      : 'bg-[#0B1118]/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        isCurrent
                          ? 'bg-aws-orange text-white'
                          : 'bg-white/5 text-muted group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-muted/80">0{idx + 1}</span>
                  </div>

                  <div className="text-lg font-bold text-white">{stage.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5 line-clamp-1">{stage.tagline}</div>

                  {/* Active Indicator Line */}
                  {isCurrent && (
                    <div className="absolute -bottom-[1px] left-4 right-4 h-0.5 bg-gradient-to-r from-aws-orange to-aws-brightBlue" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Expanded Stage Detail */}
          <div className="mt-8 p-6 rounded-xl bg-surface-light/70 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-in fade-in duration-300">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-aws-orange font-bold uppercase tracking-wider">
                  STAGE 0{activeStage + 1} HIGHLIGHT
                </span>
                <span className="text-xs text-muted">•</span>
                <span className="text-xs text-aws-brightBlue font-mono">
                  {WORKFLOW_STAGES[activeStage].tagline}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white">
                {WORKFLOW_STAGES[activeStage].title}: Hands-on Experience
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                {WORKFLOW_STAGES[activeStage].description}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <button
                onClick={() => setActiveStage((prev) => (prev + 1) % WORKFLOW_STAGES.length)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-mono text-gray-200 border border-white/10 transition-colors flex items-center gap-2"
              >
                <span>Next Stage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusAreas.map((area, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-surface/60 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1 group"
            >
              <div className="w-2 h-2 rounded-full bg-aws-orange mb-4 group-hover:scale-150 transition-transform" />
              <h3 className="text-base font-bold text-white tracking-tight mb-2">
                {area.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {area.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
