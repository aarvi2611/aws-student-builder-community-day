import React, { useState } from 'react';
import { Search, X, QrCode, Calendar, MapPin, Download, Copy, Check, AlertCircle, ArrowRight, Mail } from 'lucide-react';
import { RegistrationRecord } from '../types';
import { EmailPreviewModal } from './EmailPreviewModal';
import { sendRegistrationEmail, getGoogleCalendarUrl } from '../lib/emailService';

interface TicketLookupProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToRegister: () => void;
}

const STORAGE_KEY = 'aws_student_builder_registrations';

export const TicketLookup: React.FC<TicketLookupProps> = ({
  isOpen,
  onClose,
  onGoToRegister
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundRecord, setFoundRecord] = useState<RegistrationRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isResending, setIsResending] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    setHasSearched(true);

    try {
      const stored: RegistrationRecord[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]'
      );

      const match = stored.find(
        (r) =>
          r.ticketId.toLowerCase() === query ||
          r.email.toLowerCase() === query ||
          r.fullName.toLowerCase().includes(query)
      );

      setFoundRecord(match || null);
    } catch (err) {
      console.warn('Error reading registrations:', err);
      setFoundRecord(null);
    }
  };

  const handleCopyTicket = () => {
    if (foundRecord) {
      navigator.clipboard.writeText(foundRecord.ticketId);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2000);
    }
  };

  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AWS Student Builder Community Day//Rungta University//EN',
      'BEGIN:VEVENT',
      'SUMMARY:AWS Student Builder Community Day @ Rungta University',
      'DESCRIPTION:Hands-on technology community day exploring AWS, AI, and cloud building.',
      'LOCATION:Rungta University, Bhilai, Chhattisgarh, India',
      'DTSTART:20261019T043000Z',
      'DTEND:20261019T113000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'AWS-Community-Day-Rungta.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0B1118] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-muted hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-aws-brightBlue uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" />
            <span>ATTENDEE PASS LOOKUP</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Find Your Builder Pass
          </h3>
          <p className="text-xs sm:text-sm text-muted">
            Enter your registration email or Ticket ID (e.g. RU-AWS-XXXXX) to view and download your pass.
          </p>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. RU-AWS-58291 or your email"
            className="flex-grow px-4 py-2.5 rounded-xl bg-[#05070A] border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-aws-orange focus:ring-1 focus:ring-aws-orange"
            autoFocus
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-aws-orange hover:bg-aws-orangeHover transition-colors shrink-0 flex items-center gap-1.5 shadow-md shadow-aws-orange/20"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </form>

        {/* Search Results */}
        {hasSearched && (
          <div>
            {foundRecord ? (
              <div className="rounded-2xl bg-[#05070A] border border-white/15 p-5 sm:p-6 space-y-4 shadow-xl animate-in zoom-in-95 duration-200">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-dashed border-white/15">
                  <div>
                    <span className="text-[10px] font-mono text-aws-orange uppercase tracking-wider font-bold">
                      VERIFIED ATTENDEE PASS
                    </span>
                    <h4 className="text-lg font-bold text-white tracking-tight mt-0.5">
                      {foundRecord.fullName}
                    </h4>
                    <p className="text-xs text-aws-brightBlue font-mono">
                      {foundRecord.ticketId}
                    </p>
                  </div>

                  <div className="p-2 rounded-lg bg-white flex flex-col items-center justify-center shrink-0">
                    <QrCode className="w-10 h-10 text-black" />
                    <span className="text-[7px] font-mono font-bold text-black mt-0.5">SCAN ENTRY</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-muted text-[10px] uppercase font-mono block">STREAM</span>
                    <span className="text-white font-semibold">{foundRecord.areaOfInterest}</span>
                  </div>
                  <div>
                    <span className="text-muted text-[10px] uppercase font-mono block">COLLEGE</span>
                    <span className="text-white font-semibold truncate block">{foundRecord.college}</span>
                  </div>
                  <div>
                    <span className="text-muted text-[10px] uppercase font-mono block">DATE</span>
                    <span className="text-gray-300">19 October 2026</span>
                  </div>
                  <div>
                    <span className="text-muted text-[10px] uppercase font-mono block">TIMING</span>
                    <span className="text-gray-300">10:00 AM – 5:00 PM</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={handleCopyTicket}
                    className="flex-1 py-2 px-2.5 rounded-lg bg-surface-light hover:bg-surface-lighter border border-white/10 text-gray-200 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copiedTicket ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTicket ? 'Copied' : 'Copy ID'}</span>
                  </button>

                  <button
                    onClick={() => setShowEmailModal(true)}
                    className="flex-1 py-2 px-2.5 rounded-lg bg-surface-light hover:bg-surface-lighter border border-white/10 text-gray-200 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-aws-orange" />
                    <span>Email Pass</span>
                  </button>

                  <a
                    href={getGoogleCalendarUrl(foundRecord)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center gap-1.5 transition-colors font-medium"
                    title="Add reminder to your Google Calendar"
                  >
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Google Cal</span>
                  </a>

                  <button
                    onClick={handleDownloadIcs}
                    className="flex-1 py-2 px-2.5 rounded-lg bg-surface-light hover:bg-surface-lighter border border-white/10 text-gray-200 flex items-center justify-center gap-1.5 transition-colors"
                    title="Download .ics for Apple/Outlook"
                  >
                    <Download className="w-3.5 h-3.5 text-aws-brightBlue" />
                    <span>.ics</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-surface-light/40 border border-white/10 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">No registration found</p>
                  <p className="text-xs text-muted">
                    We couldn't locate a confirmed pass matching "{searchQuery}". Please check for typos or reserve your spot now.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onGoToRegister();
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-aws-orange hover:bg-aws-orangeHover transition-colors shadow-md"
                >
                  <span>Go to Registration</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {foundRecord && (
        <EmailPreviewModal
          record={foundRecord}
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          onResend={async () => {
            setIsResending(true);
            try {
              await sendRegistrationEmail(foundRecord);
            } finally {
              setIsResending(false);
            }
          }}
          isResending={isResending}
        />
      )}
    </div>
  );
};
