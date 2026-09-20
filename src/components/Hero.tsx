import React, { useState } from 'react';
import { ArrowRight, Calendar, MapPin, Sparkles, Terminal, ShieldCheck, Cpu, Database, Cloud, Zap, Layers } from 'lucide-react';
import { EVENT_METADATA } from '../data/eventData';

interface HeroProps {
  onRegisterClick: () => void;
  onExploreScheduleClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick, onExploreScheduleClick }) => {
  const [activeNode, setActiveNode] = useState<string | null>('bedrock');

  const architectureNodes = [
    {
      id: 'gateway',
      title: 'API Gateway',
      category: 'EDGE INGRESS',
      icon: Cloud,
      color: 'border-sky-500/40 text-sky-400 bg-sky-950/40',
      badge: 'HTTP / REST',
      metric: '0.8ms latency',
      coords: 'col-start-1 row-start-2',
      details: 'Decoupled entrypoint managing route validation, throttling, and TLS termination.'
    },
    {
      id: 'lambda',
      title: 'Lambda Core',
      category: 'SERVERLESS COMPUTE',
      icon: Zap,
      color: 'border-orange-500/40 text-aws-orange bg-amber-950/40',
      badge: 'Auto-scaling',
      metric: '100% On-Demand',
      coords: 'col-start-2 row-start-1',
      details: 'Microservice functions running code in sub-second response without provisioning servers.'
    },
    {
      id: 'bedrock',
      title: 'Amazon Bedrock',
      category: 'GENERATIVE AI',
      icon: Cpu,
      color: 'border-purple-500/40 text-purple-400 bg-purple-950/40',
      badge: 'Claude & Titan',
      metric: 'Vector RAG Active',
      coords: 'col-start-2 row-start-3',
      details: 'Unified API invoking leading foundation models with private data embeddings and guardrails.'
    },
    {
      id: 'dynamo',
      title: 'DynamoDB',
      category: 'DISTRIBUTED DATA',
      icon: Database,
      color: 'border-blue-500/40 text-blue-400 bg-blue-950/40',
      badge: 'Single-Digit MS',
      metric: 'Global Tables',
      coords: 'col-start-3 row-start-2',
      details: 'Ultra-fast NoSQL storage built for seamless burst capacity and multi-region synchronization.'
    }
  ];

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden" id="hero">
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      {/* Radial Light Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aws-blue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-aws-orange/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Top Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-light/80 border border-white/10 shadow-inner backdrop-blur-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-gray-300">
                Registrations Open • Free Student Pass
              </span>
            </div>

            {/* Main Headings */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                AWS Student Builder <br />
                <span className="text-gradient-aws">Community Day</span>
              </h1>
              
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xl sm:text-2xl font-semibold text-gray-200">
                <span className="text-aws-brightBlue font-mono font-normal">@</span>
                <span>Rungta University</span>
                <span className="text-muted text-sm sm:text-base font-normal">(Bhilai)</span>
              </div>
            </div>

            {/* Tagline & Humanized Description */}
            <div className="space-y-4">
              <p className="text-base sm:text-lg font-mono font-semibold tracking-wide text-aws-brightBlue uppercase">
                {EVENT_METADATA.tagline}
              </p>
              
              <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {EVENT_METADATA.shortDescription}
              </p>
            </div>

            {/* Quick Venue / Date Metadata Card */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-gray-300 font-mono">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface/80 border border-white/10">
                <Calendar className="w-4 h-4 text-aws-orange" />
                <span>{EVENT_METADATA.date}</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface/80 border border-white/10">
                <MapPin className="w-4 h-4 text-aws-brightBlue" />
                <span>Rungta University Campus, Bhilai</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface/80 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Free Student Pass</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onRegisterClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-base text-white bg-gradient-to-r from-aws-orange via-[#FF9900] to-[#E88B00] shadow-xl shadow-aws-orange/25 hover:shadow-aws-orange/40 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
              >
                <span>Register for the Event</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreScheduleClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-base text-gray-200 bg-surface-light/80 hover:bg-surface-light border border-white/15 hover:border-white/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group backdrop-blur-sm"
              >
                <span>Explore Schedule</span>
                <span className="text-xs text-muted group-hover:text-white transition-colors">↓</span>
              </button>
            </div>

            {/* Verification note */}
            <p className="text-xs text-muted/70 font-mono italic">
              Limited seats allocated on first-confirmed basis • Digital badge upon completion
            </p>
          </div>

          {/* Right Column: Custom Interactive Cloud Architecture Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer Decorative Glow Container */}
              <div className="relative rounded-2xl p-6 sm:p-8 bg-[#0B1118]/80 border border-white/15 shadow-2xl backdrop-blur-xl">
                
                {/* Circuit Grid Top Bar */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 text-xs font-mono text-gray-400">cloud-topology://builder-stack.live</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    READY
                  </span>
                </div>

                {/* Interactive Node Layout */}
                <div className="relative min-h-[300px] flex flex-col justify-between space-y-4">
                  
                  {/* Visual SVG Connecting Paths */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 400 300">
                    <defs>
                      <linearGradient id="grad-circuit" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#FF9900" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#146EB4" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 50 140 H 140 V 60 H 260 V 140 H 350"
                      fill="none"
                      stroke="url(#grad-circuit)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="animate-dash"
                    />
                    <path
                      d="M 140 140 V 220 H 260 V 140"
                      fill="none"
                      stroke="#FF9900"
                      strokeWidth="1.5"
                      strokeDasharray="6 6"
                    />
                  </svg>

                  {/* Architecture Node Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                    {architectureNodes.map((node) => {
                      const Icon = node.icon;
                      const isSelected = activeNode === node.id;

                      return (
                        <div
                          key={node.id}
                          onClick={() => setActiveNode(node.id)}
                          onMouseEnter={() => setActiveNode(node.id)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? `${node.color} ring-1 ring-white/20 shadow-lg scale-[1.02]`
                              : 'bg-surface-light/60 border-white/10 text-gray-300 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <h2 className="text-sm font-bold text-white leading-tight">{node.title}</h2>
                                <p className="text-[10px] font-mono tracking-wide uppercase text-gray-400">
                                  {node.category}
                                </p>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-gray-300">
                              {node.badge}
                            </span>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                            <span className="text-muted">STATUS</span>
                            <span className="text-emerald-400 font-semibold">{node.metric}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dynamic Info Panel for Selected Node */}
                  {activeNode && (
                    <div className="p-3.5 rounded-xl bg-surface/90 border border-white/10 text-xs font-mono text-gray-300 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 text-aws-brightBlue mb-1 font-semibold">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>NODE INSPECTION: {architectureNodes.find(n => n.id === activeNode)?.title}</span>
                      </div>
                      <p className="text-gray-400 leading-relaxed font-sans text-xs">
                        {architectureNodes.find(n => n.id === activeNode)?.details}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Tech Bar */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-muted font-mono">
                  <span>ARCHITECTURE: SERVERLESS + AI</span>
                  <span className="text-aws-orange">AWS CLOUD NATIVE</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
