import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventInfo } from './components/EventInfo';
import { Countdown } from './components/Countdown';
import { About } from './components/About';
import { Benefits } from './components/Benefits';
import { Speakers } from './components/Speakers';
import { Schedule } from './components/Schedule';
import { Tracks } from './components/Tracks';
import { Challenge } from './components/Challenge';
import { Community } from './components/Community';
import { Stats } from './components/Stats';
import { Registration } from './components/Registration';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { TicketLookup } from './components/TicketLookup';

export const App: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<string>('AWS Cloud');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isTicketLookupOpen, setIsTicketLookupOpen] = useState<boolean>(false);

  // URL-based Admin Detection: accessible via /admin, #admin, #/admin, or ?admin
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      if (
        path === '/admin' ||
        path.startsWith('/admin/') ||
        hash === '#admin' ||
        hash === '#/admin' ||
        search.includes('admin=true') ||
        search.includes('portal=admin')
      ) {
        setIsAdminOpen(true);
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    // Reset URL to base / without refreshing
    if (window.location.pathname.toLowerCase().includes('/admin') || window.location.hash.includes('admin')) {
      window.history.pushState({}, '', '/');
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSelectTrackForRegistration = (trackName: string) => {
    let mappedInterest = 'AWS Cloud';
    if (trackName.includes('AI') || trackName.includes('Generative')) mappedInterest = 'Generative AI';
    else if (trackName.includes('DevOps')) mappedInterest = 'DevOps';
    else if (trackName.includes('Full-Stack')) mappedInterest = 'Full Stack Development';

    setSelectedTrack(mappedInterest);
    scrollToSection('registration');
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-primary flex flex-col font-sans selection:bg-aws-orange/30 selection:text-white">
      {/* Sticky Navbar (Admin button removed; public attendee view only) */}
      <Navbar
        onRegisterClick={() => scrollToSection('registration')}
        onOpenTicketLookup={() => setIsTicketLookupOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero
          onRegisterClick={() => scrollToSection('registration')}
          onExploreScheduleClick={() => scrollToSection('schedule')}
        />
        
        {/* Quick Highlight Strip */}
        <EventInfo />

        {/* Live Countdown Timer to Event Day */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-4">
          <Countdown />
        </div>

        <About />
        <Benefits />
        <Speakers />
        <Schedule />
        <Tracks onSelectTrackForRegistration={handleSelectTrackForRegistration} />
        <Challenge onReadyToBuildClick={() => scrollToSection('registration')} />
        <Community />
        <Stats />
        <Registration
          initialTrackInterest={selectedTrack}
          onOpenTicketLookup={() => setIsTicketLookupOpen(true)}
        />
        <FAQ />
      </main>

      {/* Footer (Admin button removed; attendee services only) */}
      <Footer
        onOpenTicketLookup={() => setIsTicketLookupOpen(true)}
      />

      {/* Organizer Admin Portal (Only accessed via URL /admin with ID & Password gate) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
      />

      {/* Attendee Ticket Lookup Modal */}
      <TicketLookup
        isOpen={isTicketLookupOpen}
        onClose={() => setIsTicketLookupOpen(false)}
        onGoToRegister={() => scrollToSection('registration')}
      />
    </div>
  );
};

export default App;
