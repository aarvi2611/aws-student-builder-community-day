import React from 'react';
import { ArrowUp, Sparkles, Heart, Search } from 'lucide-react';
import { EVENT_METADATA } from '../data/eventData';
import { GitHubIcon, LinkedInIcon, XTwitterIcon, InstagramIcon } from './SocialIcons';

interface FooterProps {
  onOpenTicketLookup?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTicketLookup }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Speakers', href: '#speakers' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Challenge', href: '#challenge' },
    { label: 'Register', href: '#registration' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <footer className="bg-[#030407] border-t border-white/10 pt-16 pb-12 text-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#111923] to-[#0B1118] border border-white/10 flex items-center justify-center p-2 shadow-inner">
                <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
                  <path
                    d="M6 19C10 23.5 22 23.5 26 19"
                    stroke="#FF9900"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="11" r="2.2" fill="#38BDF8" />
                  <circle cx="16" cy="9" r="2.2" fill="#FF9900" />
                  <circle cx="22" cy="11" r="2.2" fill="#146EB4" />
                </svg>
              </div>

              <div>
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  AWS Student Builder Community Day
                </span>
                <p className="text-xs text-aws-brightBlue font-mono">
                  @ Rungta University, Bhilai
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted max-w-md leading-relaxed">
              Empowering student builders with cloud literacy, hands-on serverless engineering, foundation model workflows, and peer community collaboration.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/aarvi2611"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-surface-light border border-white/10 flex items-center justify-center text-muted hover:text-white hover:border-aws-orange/40 transition-colors hover:scale-105"
                aria-label="Hariom Sharan GitHub Profile"
                title="Hariom Sharan GitHub"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/hariomsharan2611/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-surface-light border border-white/10 flex items-center justify-center text-muted hover:text-white hover:border-aws-orange/40 transition-colors hover:scale-105"
                aria-label="Hariom Sharan LinkedIn Profile"
                title="Hariom Sharan LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/sharan.hariom_/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-surface-light border border-white/10 flex items-center justify-center text-muted hover:text-white hover:border-aws-orange/40 transition-colors hover:scale-105"
                aria-label="Hariom Sharan Instagram Profile"
                title="Hariom Sharan Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              EVENT NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-aws-orange transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Attendee Tools */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              ATTENDEE SERVICES
            </h4>
            <div className="space-y-2.5">
              {onOpenTicketLookup && (
                <button
                  onClick={onOpenTicketLookup}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-surface-light hover:bg-surface-lighter border border-white/10 text-xs text-gray-200 hover:text-white transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-aws-brightBlue" />
                    <span>Find My Ticket Pass</span>
                  </span>
                  <span className="text-[10px] font-mono text-muted group-hover:text-aws-brightBlue">Retrieve →</span>
                </button>
              )}

              <div className="pt-2 text-xs text-gray-400 space-y-1">
                <p className="font-medium text-gray-300">Venue & Inquiries:</p>
                <p>AWS Student Builder Community</p>
                <p className="text-muted">Rungta Educational Complex, Bhilai, Chhattisgarh</p>
                <p className="text-aws-brightBlue font-mono text-[11px] pt-0.5">awscommunity@rungta.ac.in</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© 2026 AWS Student Builder Community Day — Rungta University.</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="text-gray-300">
              Built by{' '}
              <a
                href="https://www.linkedin.com/in/hariomsharan2611/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-aws-orange hover:text-white font-semibold transition-colors underline-offset-2 hover:underline"
              >
                Hariom Sharan
              </a>
              {' '}(
              <a href="https://github.com/aarvi2611" target="_blank" rel="noopener noreferrer" className="text-aws-brightBlue hover:underline">GitHub</a>
              {' '}&bull;{' '}
              <a href="https://www.instagram.com/sharan.hariom_/" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">Instagram</a>
              )
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-light hover:bg-surface-lighter text-gray-300 hover:text-white border border-white/10 transition-colors text-xs font-mono"
            aria-label="Back to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-aws-orange" />
          </button>
        </div>

      </div>
    </footer>
  );
};
