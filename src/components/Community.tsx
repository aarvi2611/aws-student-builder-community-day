import React from 'react';
import { Users, Code, Cpu, Network, Sparkles, MessageSquare, Terminal } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, InstagramIcon } from './SocialIcons';

export const Community: React.FC = () => {
  const personas = [
    { label: "Student Developers", tag: "Code & Ship", color: "border-sky-500/30 text-sky-400 bg-sky-950/30" },
    { label: "Cloud Enthusiasts", tag: "Infra & Scale", color: "border-orange-500/30 text-orange-400 bg-orange-950/30" },
    { label: "AI & ML Learners", tag: "LLMs & Vectors", color: "border-purple-500/30 text-purple-400 bg-purple-950/30" },
    { label: "Hackathon Competitors", tag: "Rapid Sprints", color: "border-emerald-500/30 text-emerald-400 bg-emerald-950/30" },
    { label: "Industry Mentors", tag: "Architecture Review", color: "border-blue-500/30 text-blue-400 bg-blue-950/30" },
    { label: "Startup Innovators", tag: "0 to 1 Launch", color: "border-amber-500/30 text-amber-400 bg-amber-950/30" },
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="community">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-aws-blue/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aws-blue/10 border border-aws-blue/30 text-aws-brightBlue text-xs font-mono font-medium">
            <Users className="w-3.5 h-3.5" />
            <span>CONNECTED NETWORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            More Than an Event. <br />
            <span className="text-gradient-aws">It's a Builder Community.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Technology improves when builders collaborate. Connect with peers across campus departments, learn from mentors with production scars, and find collaborators for your next big open-source project.
          </p>
        </div>

        {/* Visual Network Simulation with SVG Interconnects */}
        <div className="mt-16 relative bg-[#0B1118]/80 border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-xl shadow-2xl overflow-hidden">
          
          {/* Animated SVG Network Mesh */}
          <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="network-mesh" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#38BDF8" />
                <circle cx="80" cy="30" r="2.5" fill="#FF9900" />
                <circle cx="50" cy="80" r="2" fill="#146EB4" />
                <line x1="20" y1="20" x2="80" y2="30" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                <line x1="80" y1="30" x2="50" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                <line x1="50" y1="80" x2="20" y2="20" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#network-mesh)" />
          </svg>

          {/* Builder Persona Grid */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {personas.map((persona, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-surface-light/80 border border-white/10 hover:border-aws-orange/40 transition-all hover:scale-[1.02] shadow-lg group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-aws-orange group-hover:animate-ping" />
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${persona.color}`}>
                      {persona.tag}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-aws-brightBlue transition-colors">
                    {persona.label}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-muted flex items-center gap-1.5">
                  <Network className="w-3 h-3 text-gray-400" />
                  <span>Cross-Disciplinary Cohort</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Community Quote Card featuring Lead Organizer */}
          <div className="relative z-10 mt-10 p-6 rounded-2xl bg-black/50 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aws-orange via-[#FF9900] to-[#146EB4] p-0.5 shadow-lg shrink-0">
                <div className="w-full h-full bg-[#0B1118] rounded-[14px] flex items-center justify-center text-white font-mono font-extrabold text-lg">
                  HS
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-200 font-medium italic">
                  "The AWS Student Builder community is where I transitioned from following tutorials to building cloud architectures that actually scale."
                </p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-xs text-aws-orange font-bold">Hariom Sharan</span>
                  <span className="text-[11px] text-muted font-mono">— Student Community Lead &amp; Builder</span>
                </div>
              </div>
            </div>

            {/* Social Connection Badges */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://github.com/aarvi2611"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-surface-light border border-white/10 text-gray-300 hover:text-white hover:border-aws-orange/40 transition-colors"
                title="GitHub @aarvi2611"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/hariomsharan2611/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-surface-light border border-white/10 text-gray-300 hover:text-white hover:border-aws-orange/40 transition-colors"
                title="LinkedIn @hariomsharan2611"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/sharan.hariom_/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-surface-light border border-white/10 text-gray-300 hover:text-white hover:border-aws-orange/40 transition-colors"
                title="Instagram @sharan.hariom_"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
