import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  AlertCircle,
  QrCode,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Shield,
  Download,
  Copy,
  Check,
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Send,
  Search,
  ExternalLink
} from 'lucide-react';
import { EVENT_METADATA } from '../data/eventData';
import { RegistrationFormData, RegistrationRecord } from '../types';
import { insertCloudRegistration, isSupabaseConfigured } from '../lib/supabase';
import {
  sendRegistrationEmail,
  openMailClient,
  isEmailJsConfigured,
  getGoogleCalendarUrl,
  getGmailComposeUrl
} from '../lib/emailService';
import { EmailPreviewModal } from './EmailPreviewModal';

interface RegistrationProps {
  initialTrackInterest?: string;
  onOpenTicketLookup?: () => void;
}

const STORAGE_KEY = 'aws_student_builder_registrations';

export const Registration: React.FC<RegistrationProps> = ({ initialTrackInterest, onOpenTicketLookup }) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    college: 'Rungta University, Bhilai',
    course: 'Computer Science & Engineering',
    yearOfStudy: '3rd Year',
    profileUrl: '',
    areaOfInterest: initialTrackInterest || 'AWS Cloud',
    agreeUpdates: true
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<RegistrationRecord | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isResendingEmail, setIsResendingEmail] = useState(false);

  useEffect(() => {
    if (initialTrackInterest) {
      setFormData((prev) => ({ ...prev, areaOfInterest: initialTrackInterest }));
    }
  }, [initialTrackInterest]);

  // Real-time validation
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.college.trim()) {
      newErrors.college = 'College/institution name is required';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course or branch is required';
    }

    if (!formData.yearOfStudy) {
      newErrors.yearOfStudy = 'Please select your year of study';
    }

    if (!formData.agreeUpdates) {
      newErrors.agreeUpdates = 'Please accept event updates to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error on edit
    if (errors[name as keyof RegistrationFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate authentic network latency
    setTimeout(() => {
      const uniqueNum = Math.floor(10000 + Math.random() * 90000);
      const ticketId = `RU-AWS-${uniqueNum}`;

      const newRecord: RegistrationRecord = {
        ...formData,
        id: `reg-${Date.now()}`,
        ticketId,
        registeredAt: new Date().toISOString(),
        isCheckedIn: false
      };

      // Save to localStorage
      try {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        existing.unshift(newRecord);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      } catch (err) {
        console.warn('Could not access localStorage:', err);
      }

      // Sync to Supabase Cloud Database if configured
      if (isSupabaseConfigured()) {
        insertCloudRegistration(newRecord).catch((err) => {
          console.warn('Supabase background sync notice:', err);
        });
      }

      setSubmittedRecord(newRecord);
      setIsSubmitting(false);

      // Automated Confirmation Email Dispatch
      setEmailStatus('sending');
      sendRegistrationEmail(newRecord)
        .then((result) => {
          setEmailStatus(result.success ? 'sent' : 'failed');
          setEmailMessage(result.message);
        })
        .catch((err) => {
          console.warn('Automated email dispatch error:', err);
          setEmailStatus('failed');
          setEmailMessage('Could not dispatch confirmation email automatically.');
        });

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF9900', '#38BDF8', '#146EB4', '#10B981']
        });
      } catch (err) {
        // Fallback gracefully
      }
    }, 800);
  };

  const handleResendEmail = async () => {
    if (!submittedRecord) return;
    setIsResendingEmail(true);
    try {
      const result = await sendRegistrationEmail(submittedRecord);
      setEmailStatus(result.success ? 'sent' : 'failed');
      setEmailMessage(result.message);
    } catch (err) {
      setEmailStatus('failed');
      setEmailMessage('Failed to resend confirmation email.');
    } finally {
      setIsResendingEmail(false);
    }
  };

  const handleCopyTicket = () => {
    if (submittedRecord) {
      navigator.clipboard.writeText(submittedRecord.ticketId);
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

  const handleResetForm = () => {
    setSubmittedRecord(null);
    setEmailStatus('idle');
    setEmailMessage('');
    setShowEmailModal(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      college: 'Rungta University, Bhilai',
      course: 'Computer Science & Engineering',
      yearOfStudy: '3rd Year',
      profileUrl: '',
      areaOfInterest: 'AWS Cloud',
      agreeUpdates: true
    });
    setErrors({});
  };

  return (
    <section className="py-24 relative overflow-hidden" id="registration">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-aws-orange/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-aws-blue/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aws-orange/10 border border-aws-orange/30 text-aws-orange text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JOIN THE BUILD DAY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Reserve Your <span className="text-gradient-aws">Spot</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Registration is free for all students. Bring your curiosity, your laptop, and your ambition to build.
          </p>

          {/* Quick Find Ticket Action */}
          {onOpenTicketLookup && (
            <div className="pt-1">
              <button
                onClick={onOpenTicketLookup}
                className="inline-flex items-center gap-1.5 text-xs text-aws-brightBlue hover:text-white font-mono transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Already registered? Look up your confirmed pass</span>
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          {/* Conditional Rendering: Success Screen vs Form */}
          {submittedRecord ? (
            /* ================= SUCCESS CONFIRMATION STATE ================= */
            <div className="rounded-3xl bg-gradient-to-br from-[#0B1118] via-[#111923] to-[#05070A] border border-emerald-500/40 p-8 sm:p-12 shadow-2xl animate-in zoom-in-95 duration-300">
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle className="w-9 h-9" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                    REGISTRATION CONFIRMED
                  </span>
                  <h3 className="text-3xl font-extrabold text-white tracking-tight">
                    You're In! 🎉
                  </h3>
                  <p className="text-sm text-gray-300">
                    Your official builder pass is secured. We look forward to building with you at Rungta University!
                  </p>
                </div>
              </div>

              {/* Digital Pass Ticket Card */}
              <div className="mt-8 rounded-2xl bg-[#05070A] border border-white/15 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                {/* Visual Watermark */}
                <div className="absolute right-4 -bottom-6 text-7xl font-mono font-black text-white/[0.03] select-none pointer-events-none">
                  AWS
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-dashed border-white/15">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-aws-orange font-bold">
                      OFFICIAL BUILDER PASS
                    </span>
                    <h4 className="text-xl font-black text-white tracking-tight mt-0.5">
                      AWS Student Builder Community Day
                    </h4>
                    <p className="text-xs text-aws-brightBlue font-mono">
                      @ Rungta University, Bhilai
                    </p>
                  </div>

                  {/* QR Box */}
                  <div className="p-2.5 rounded-xl bg-white flex flex-col items-center justify-center shrink-0 shadow-lg">
                    <QrCode className="w-14 h-14 text-black" />
                    <span className="text-[8px] font-mono text-black font-bold mt-1">
                      SCAN FOR ENTRY
                    </span>
                  </div>
                </div>

                {/* Ticket Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 text-left">
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase">ATTENDEE</div>
                    <div className="text-sm font-bold text-white truncate">{submittedRecord.fullName}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase">PASS ID</div>
                    <div className="text-sm font-mono font-bold text-aws-orange">{submittedRecord.ticketId}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase">STREAM</div>
                    <div className="text-sm font-bold text-gray-200 truncate">{submittedRecord.areaOfInterest}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase">DATE & TIME</div>
                    <div className="text-xs font-bold text-gray-200">19 Oct • 10 AM</div>
                  </div>
                </div>

                {/* Ticket Action Bar */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <button
                    onClick={handleCopyTicket}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light border border-white/10 text-gray-300 hover:text-white transition-colors"
                  >
                    {copiedTicket ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTicket ? 'Copied ID!' : 'Copy Pass ID'}</span>
                  </button>

                  <a
                    href={getGoogleCalendarUrl(submittedRecord)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 transition-all font-semibold shadow-sm"
                    title="Add reminder to your Google Calendar in 1 click"
                  >
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Add to Google Calendar</span>
                  </a>

                  <button
                    onClick={handleDownloadIcs}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light border border-white/10 text-gray-300 hover:text-white transition-colors"
                    title="Download .ics file for Apple Calendar or Microsoft Outlook"
                  >
                    <Download className="w-3.5 h-3.5 text-aws-brightBlue" />
                    <span>Apple / Outlook (.ics)</span>
                  </button>
                </div>
              </div>

              {/* Automated Confirmation Email Status Card */}
              <div className="mt-6 rounded-2xl bg-[#0B131F] border border-sky-500/30 p-5 sm:p-6 shadow-xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      emailStatus === 'sending'
                        ? 'bg-aws-orange/20 text-aws-orange animate-pulse'
                        : emailStatus === 'failed'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : isEmailJsConfigured()
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-aws-orange/20 text-aws-orange border border-aws-orange/30'
                    }`}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-white tracking-tight">
                          {emailStatus === 'sending' && 'Dispatching Confirmation Email...'}
                          {emailStatus === 'sent' && (
                            isEmailJsConfigured()
                              ? 'Live Confirmation Email Dispatched! ✉️'
                              : 'Confirmation Email Ready (Demo / Preview Mode)'
                          )}
                          {emailStatus === 'failed' && 'Email Dispatch Notice'}
                          {emailStatus === 'idle' && 'Confirmation Email Processed'}
                        </h4>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          isEmailJsConfigured()
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {isEmailJsConfigured() ? 'LIVE EMAILJS' : 'DEMO / PREVIEW MODE'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 mt-0.5">
                        {isEmailJsConfigured() ? (
                          <>Dispatched to <span className="text-aws-brightBlue font-mono font-medium">{submittedRecord.email}</span> with Pass ID, agenda highlights, and venue directions.</>
                        ) : (
                          <>EmailJS keys not configured in <code className="text-amber-300 font-mono text-[11px]">.env</code>. Click <strong>"Preview Email"</strong> or <strong>"Send via Gmail"</strong> to view/send now!</>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0 flex-wrap">
                    <button
                      onClick={() => setShowEmailModal(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light border border-white/15 text-xs font-semibold text-gray-200 hover:text-white transition-colors hover:border-aws-orange/50"
                      title="Preview rendered HTML email"
                    >
                      <Mail className="w-3.5 h-3.5 text-aws-orange" />
                      <span>Preview Email</span>
                    </button>

                    <a
                      href={getGmailComposeUrl(submittedRecord)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/30 text-xs font-semibold text-red-300 hover:bg-red-500/25 transition-colors"
                      title="Open Gmail with pre-filled pass and send to attendee"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                      <span>Send via Gmail</span>
                    </a>

                    <button
                      onClick={handleResendEmail}
                      disabled={isResendingEmail || emailStatus === 'sending'}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-aws-brightBlue/10 border border-aws-brightBlue/30 text-xs font-semibold text-aws-brightBlue hover:bg-aws-brightBlue/20 transition-colors disabled:opacity-50"
                    >
                      <Send className={`w-3.5 h-3.5 ${isResendingEmail ? 'animate-spin' : ''}`} />
                      <span>{isResendingEmail ? 'Sending...' : 'Resend'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Confirmation Notice */}
              <div className="mt-6 text-center text-xs text-gray-300 space-y-1">
                <p>
                  Your builder pass is confirmed. Please keep your Pass ID handy and bring your college student ID on event day.
                </p>
                <p className="text-[11px] text-aws-brightBlue font-mono">
                  Venue: Dr. A.P.J. Abdul Kalam Central Auditorium • Check-in starts 09:30 AM
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('hero');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-surface-light hover:bg-surface-lighter border border-white/10 transition-colors"
                >
                  Back to Event Top
                </button>

                <button
                  onClick={handleResetForm}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold text-aws-orange hover:text-white hover:bg-white/5 transition-colors"
                >
                  Register Another Attendee
                </button>
              </div>

            </div>
          ) : (
            /* ================= ACTIVE REGISTRATION FORM ================= */
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl bg-surface/90 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6"
            >
              
              {/* Form Intro Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono text-gray-300">Free Admission • Student Pass</span>
                </div>
                <span className="text-xs font-mono text-aws-orange">* Required Fields</span>
              </div>

              {/* Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Full Name */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="fullName" className="block text-xs font-semibold text-gray-200">
                    Full Name <span className="text-aws-orange">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#05070A] border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors ${
                      errors.fullName
                        ? 'border-red-500 focus:ring-red-500/30'
                        : 'border-white/15 focus:border-aws-orange focus:ring-aws-orange/20'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-200">
                    Email Address <span className="text-aws-orange">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@student.college.edu"
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#05070A] border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500/30'
                        : 'border-white/15 focus:border-aws-orange focus:ring-aws-orange/20'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-semibold text-gray-200">
                    Phone Number <span className="text-muted font-normal text-[11px]">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#05070A] border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-aws-orange focus:ring-2 focus:ring-aws-orange/20 transition-colors"
                  />
                </div>

                {/* College / Institution */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="college" className="block text-xs font-semibold text-gray-200">
                    College / Institution <span className="text-aws-orange">*</span>
                  </label>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    placeholder="e.g. Rungta College of Engineering & Technology, Bhilai"
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#05070A] border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors ${
                      errors.college
                        ? 'border-red-500 focus:ring-red-500/30'
                        : 'border-white/15 focus:border-aws-orange focus:ring-aws-orange/20'
                    }`}
                  />
                  {errors.college && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.college}</span>
                    </p>
                  )}
                </div>

                {/* Course / Branch */}
                <div className="space-y-1.5">
                  <label htmlFor="course" className="block text-xs font-semibold text-gray-200">
                    Course / Branch <span className="text-aws-orange">*</span>
                  </label>
                  <input
                    type="text"
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    placeholder="e.g. B.Tech Computer Science / IT"
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#05070A] border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors ${
                      errors.course
                        ? 'border-red-500 focus:ring-red-500/30'
                        : 'border-white/15 focus:border-aws-orange focus:ring-aws-orange/20'
                    }`}
                  />
                  {errors.course && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.course}</span>
                    </p>
                  )}
                </div>

                {/* Year of Study */}
                <div className="space-y-1.5">
                  <label htmlFor="yearOfStudy" className="block text-xs font-semibold text-gray-200">
                    Year of Study <span className="text-aws-orange">*</span>
                  </label>
                  <select
                    id="yearOfStudy"
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#05070A] border border-white/15 text-sm text-white focus:outline-none focus:border-aws-orange focus:ring-2 focus:ring-aws-orange/20 transition-colors"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* GitHub / LinkedIn */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="profileUrl" className="block text-xs font-semibold text-gray-200">
                    GitHub or LinkedIn Profile <span className="text-muted font-normal text-[11px]">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    id="profileUrl"
                    name="profileUrl"
                    value={formData.profileUrl}
                    onChange={handleInputChange}
                    placeholder="https://github.com/yourhandle or linkedin.com/in/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#05070A] border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-aws-orange focus:ring-2 focus:ring-aws-orange/20 transition-colors"
                  />
                </div>

                {/* Area of Interest */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="areaOfInterest" className="block text-xs font-semibold text-gray-200">
                    Primary Area of Interest <span className="text-aws-orange">*</span>
                  </label>
                  <select
                    id="areaOfInterest"
                    name="areaOfInterest"
                    value={formData.areaOfInterest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#05070A] border border-white/15 text-sm text-white focus:outline-none focus:border-aws-orange focus:ring-2 focus:ring-aws-orange/20 transition-colors"
                  >
                    <option value="AWS Cloud">AWS Cloud Architecture & Foundations</option>
                    <option value="Generative AI">Generative AI & Amazon Bedrock</option>
                    <option value="DevOps">DevOps, Containers & CI/CD</option>
                    <option value="Full Stack Development">Full Stack Cloud Applications</option>
                    <option value="Data & Analytics">Data Engineering & Analytics</option>
                    <option value="Cybersecurity">Cloud Security & IAM</option>
                    <option value="Other">Other Cloud Topics</option>
                  </select>
                </div>

              </div>

              {/* Checkbox: Agree to Updates */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreeUpdates"
                    checked={formData.agreeUpdates}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-[#05070A] text-aws-orange focus:ring-aws-orange focus:ring-offset-0 focus:ring-1 cursor-pointer"
                  />
                  <span className="text-xs text-gray-300 leading-relaxed">
                    I agree to receive event-related logistics, workshop preparation guides, and builder announcements for AWS Student Builder Community Day.
                  </span>
                </label>
                {errors.agreeUpdates && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1.5">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.agreeUpdates}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-base text-white bg-gradient-to-r from-aws-orange via-[#FF9900] to-[#E88B00] shadow-xl shadow-aws-orange/25 hover:shadow-aws-orange/40 hover:brightness-110 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating Builder Pass...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>

              {/* Attendee Help & Quick Lookup */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted border-t border-white/5">
                <span>Free pass covers auditorium sessions, cloud computing labs & networking lunch.</span>
                {onOpenTicketLookup && (
                  <button
                    type="button"
                    onClick={onOpenTicketLookup}
                    className="text-aws-brightBlue hover:text-white transition-colors underline font-mono text-[11px]"
                  >
                    Already registered? Find your pass →
                  </button>
                )}
              </div>

            </form>
          )}
        </div>

      </div>

      {submittedRecord && (
        <EmailPreviewModal
          record={submittedRecord}
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          onResend={handleResendEmail}
          isResending={isResendingEmail}
        />
      )}
    </section>
  );
};
