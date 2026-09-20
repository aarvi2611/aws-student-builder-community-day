import React, { useState } from 'react';
import {
  X,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Send,
  Sparkles,
  Info
} from 'lucide-react';
import { RegistrationRecord } from '../types';
import { EVENT_METADATA } from '../data/eventData';
import {
  generateEmailHtml,
  openMailClient,
  isEmailJsConfigured
} from '../lib/emailService';

interface EmailPreviewModalProps {
  record: RegistrationRecord;
  isOpen: boolean;
  onClose: () => void;
  onResend?: () => void;
  isResending?: boolean;
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  record,
  isOpen,
  onClose,
  onResend,
  isResending = false
}) => {
  const [copiedHtml, setCopiedHtml] = useState(false);
  const isLiveConfigured = isEmailJsConfigured();

  if (!isOpen) return null;

  const emailHtml = generateEmailHtml(record);

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(emailHtml);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#0B1118] border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0F172A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-aws-orange/10 border border-aws-orange/30 text-aws-orange flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Automated Confirmation Email Preview
                </h3>
                {isLiveConfigured ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    LIVE DISPATCH (EMAILJS)
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-aws-brightBlue/20 text-aws-brightBlue border border-aws-brightBlue/30">
                    DEMO / PREVIEW MODE
                  </span>
                )}
              </div>
              <p className="text-xs text-muted">
                Sent to: <span className="text-gray-200 font-mono">{record.email}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Metadata Details bar */}
        <div className="px-6 py-3 bg-[#05070A] border-b border-white/5 text-xs grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <span className="text-muted font-mono">FROM: </span>
            <span className="text-gray-200 font-semibold">{EVENT_METADATA.name} &lt;{EVENT_METADATA.organizerEmail}&gt;</span>
          </div>
          <div>
            <span className="text-muted font-mono">SUBJECT: </span>
            <span className="text-gray-200 font-semibold truncate">Your Builder Pass [{record.ticketId}]</span>
          </div>
          <div>
            <span className="text-muted font-mono">STATUS: </span>
            <span className="text-emerald-400 font-semibold">Delivered to Inbox</span>
          </div>
        </div>

        {/* Interactive Email HTML Render in Iframe */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#05070A]/50">
          <div className="border border-white/10 rounded-xl overflow-hidden shadow-inner bg-black">
            <iframe
              srcDoc={emailHtml}
              title="Confirmation Email"
              className="w-full h-[450px] sm:h-[500px] border-0"
              sandbox="allow-same-origin allow-popups"
            />
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#0F172A] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Info className="w-4 h-4 text-aws-orange shrink-0" />
            <span>Responsive HTML template optimized for Gmail, Apple Mail, and Outlook.</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => openMailClient(record)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
              title="Open draft in default desktop/mobile email client"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Mail App</span>
            </button>

            <button
              onClick={handleCopyHtml}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
            >
              {copiedHtml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedHtml ? 'Copied HTML!' : 'Copy Raw HTML'}</span>
            </button>

            {onResend && (
              <button
                onClick={onResend}
                disabled={isResending}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-aws-orange text-black text-xs font-bold hover:bg-aws-orangeHover transition-all disabled:opacity-50"
              >
                <Send className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                <span>{isResending ? 'Sending...' : 'Resend Email'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

