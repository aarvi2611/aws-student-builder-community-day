import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Search } from 'lucide-react';

interface NavbarProps {
  onRegisterClick?: () => void;
  onOpenTicketLookup?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRegisterClick,
  onOpenTicketLookup
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['about', 'benefits', 'speakers', 'schedule', 'tracks', 'challenge', 'community', 'registration', 'faq'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Speakers', id: 'speakers' },
    { name: 'Schedule', id: 'schedule' },
    { name: 'Tracks', id: 'tracks' },
    { name: 'Challenge', id: 'challenge' },
    { name: 'FAQ', id: 'faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05070A]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Branding */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-aws-orange rounded-lg p-1"
            aria-label="AWS Student Builder Community Day Homepage"
          >
            {/* Custom AWS-inspired Logo Mark */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#111923] to-[#0B1118] border border-white/10 flex items-center justify-center p-2 group-hover:border-aws-orange/40 transition-colors shadow-inner">
              <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
                <path
                  d="M6 19C10 23.5 22 23.5 26 19"
                  stroke="#FF9900"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M22 17L26.5 19L23 22"
                  stroke="#FF9900"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="11" r="2.2" fill="#38BDF8" />
                <circle cx="16" cy="9" r="2.2" fill="#FF9900" />
                <circle cx="22" cy="11" r="2.2" fill="#146EB4" />
              </svg>
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#05070A] animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-1.5 font-bold tracking-tight text-white text-base sm:text-lg leading-tight">
                <span>AWS Student Builder</span>
                <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-aws-orange/15 text-aws-orange border border-aws-orange/30 font-mono font-medium">
                  2026
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted font-medium">
                <span className="text-aws-brightBlue font-mono">@</span>
                <span>Rungta University</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === link.id
                    ? 'text-white'
                    : 'text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-aws-orange to-aws-brightBlue rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {onOpenTicketLookup && (
              <button
                onClick={onOpenTicketLookup}
                className="px-3 py-2 text-xs font-mono text-gray-300 hover:text-white hover:bg-white/5 rounded-lg border border-white/10 flex items-center gap-1.5 transition-colors"
                title="Search and download your registered ticket pass"
              >
                <Search className="w-3.5 h-3.5 text-aws-brightBlue" />
                <span>My Pass</span>
              </button>
            )}

            <button
              onClick={() => scrollToSection('registration')}
              className="relative group inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-aws-orange to-[#F59E0B] rounded-lg shadow-md shadow-aws-orange/20 hover:shadow-aws-orange/30 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <span>Register Now</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => scrollToSection('registration')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-aws-orange rounded-md shadow-sm"
            >
              Register
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-muted hover:text-white rounded-lg hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-aws-orange"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-white/10 bg-[#0B1118]/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                  activeSection === link.id
                    ? 'text-aws-orange bg-aws-orange/10 font-semibold'
                    : 'text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.name}</span>
                <span className="text-xs text-muted/60">→</span>
              </button>
            ))}

            <div className="pt-2 border-t border-white/10 space-y-2">
              {onOpenTicketLookup && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTicketLookup();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono rounded-lg bg-surface-light border border-white/10 text-gray-200"
                >
                  <Search className="w-3 h-3 text-aws-brightBlue" />
                  <span>Look Up My Pass</span>
                </button>
              )}

              <button
                onClick={() => scrollToSection('registration')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-aws-orange to-[#F59E0B] rounded-lg shadow-md"
              >
                <span>Register for Event</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
