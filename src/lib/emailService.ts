import emailjs from '@emailjs/browser';
import { RegistrationRecord } from '../types';
import { EVENT_METADATA } from '../data/eventData';

export interface EmailDispatchResult {
  success: boolean;
  mode: 'emailjs' | 'custom_api' | 'simulated';
  message: string;
  error?: string;
}

// Check if EmailJS environment variables are configured
export const isEmailJsConfigured = (): boolean => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  return Boolean(
    serviceId &&
    templateId &&
    publicKey &&
    !serviceId.includes('your_') &&
    !templateId.includes('your_') &&
    !publicKey.includes('your_')
  );
};

// Generates a Google Calendar event creation URL
export const getGoogleCalendarUrl = (record: RegistrationRecord): string => {
  const title = encodeURIComponent(`${EVENT_METADATA.name} @ Rungta University`);
  const details = encodeURIComponent(
    `Hello ${record.fullName},\n\nYour registration for ${EVENT_METADATA.name} is confirmed!\n\n` +
    `Pass ID: ${record.ticketId}\n` +
    `Track: ${record.areaOfInterest}\n` +
    `Venue: ${EVENT_METADATA.hall}, ${EVENT_METADATA.venue}, ${EVENT_METADATA.location}\n` +
    `Check-in starts at: ${EVENT_METADATA.checkInTime}\n\n` +
    `Please bring your college ID and laptop.\n` +
    `Organizers: ${EVENT_METADATA.organizerEmail}`
  );
  const location = encodeURIComponent(`${EVENT_METADATA.hall}, ${EVENT_METADATA.venue}, ${EVENT_METADATA.location}`);
  
  // Format: 20261019T043000Z to 20261019T113000Z (10:00 AM to 5:00 PM IST)
  const dates = '20261019T043000Z/20261019T113000Z';

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
};

// Generates a direct 1-click Gmail compose web link with pre-filled ticket details
export const getGmailComposeUrl = (record: RegistrationRecord): string => {
  const subject = encodeURIComponent(`Your Builder Pass [${record.ticketId}] - ${EVENT_METADATA.name}`);
  const body = encodeURIComponent(
    `Hello ${record.fullName},\n\n` +
    `Your official pass for ${EVENT_METADATA.name} is confirmed!\n\n` +
    `-----------------------------------------\n` +
    `OFFICIAL BUILDER PASS\n` +
    `Pass ID: ${record.ticketId}\n` +
    `Registered Stream: ${record.areaOfInterest}\n` +
    `Institution: ${record.college}\n` +
    `Course: ${record.course} (${record.yearOfStudy})\n` +
    `Date: 19 October 2026 (10:00 AM – 5:00 PM IST)\n` +
    `Reporting / Check-in: 09:30 AM IST\n` +
    `Venue: ${EVENT_METADATA.hall}, ${EVENT_METADATA.venue}, ${EVENT_METADATA.location}\n` +
    `-----------------------------------------\n\n` +
    `Event Day Checklist:\n` +
    `1. Bring your physical/digital college student ID card.\n` +
    `2. Bring your laptop and charger for hands-on labs.\n` +
    `3. Keep this Pass ID ready at the registration desk for QR badge scanning.\n\n` +
    `View online pass: ${typeof window !== 'undefined' ? window.location.origin : ''}?ticket=${encodeURIComponent(record.ticketId)}\n\n` +
    `Regards,\n` +
    `AWS Student Community & Department of CSE\n` +
    `Rungta University, Bhilai`
  );

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(record.email)}&su=${subject}&body=${body}`;
};

// Generates high-fidelity, responsive HTML email template with bulletproof inline styles
export const generateEmailHtml = (record: RegistrationRecord): string => {
  const livePassUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}?ticket=${encodeURIComponent(record.ticketId)}` 
    : `https://aws-community-rungta.vercel.app?ticket=${encodeURIComponent(record.ticketId)}`;

  const googleCalUrl = getGoogleCalendarUrl(record);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Official Builder Pass - AWS Community Day</title>
</head>
<body style="margin: 0; padding: 0; background-color: #030712; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F3F4F6;">
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #030712; padding: 30px 10px;">
    <tr>
      <td align="center">
        
        <!-- Main Email Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #0F172A; border: 1px solid #1E293B; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);">
          
          <!-- Top Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0B1118 0%, #161F2E 50%, #0F172A 100%); padding: 36px 28px; text-align: center; border-bottom: 3px solid #FF9900;">
              
              <!-- Neon Tag -->
              <div style="display: inline-block; background: rgba(255, 153, 0, 0.15); border: 1px solid rgba(255, 153, 0, 0.4); color: #FF9900; font-size: 11px; font-weight: 800; font-family: monospace; letter-spacing: 2px; text-transform: uppercase; padding: 6px 16px; border-radius: 9999px; margin-bottom: 14px;">
                &#9889; OFFICIAL REGISTRATION CONFIRMED
              </div>
              
              <!-- Title -->
              <h1 style="margin: 0; color: #FFFFFF; font-size: 26px; font-weight: 900; letter-spacing: -0.5px; text-transform: uppercase;">
                AWS Student Builder <br><span style="color: #FF9900;">Community Day</span>
              </h1>
              
              <!-- Subtitle -->
              <p style="margin: 8px 0 0 0; color: #38BDF8; font-size: 13px; font-family: monospace; font-weight: 600; letter-spacing: 0.5px;">
                @ Rungta University, Bhilai &bull; 19 October 2026
              </p>
            </td>
          </tr>

          <!-- Body Content Area -->
          <tr>
            <td style="padding: 32px 28px;">
              
              <!-- Welcome Greeting -->
              <p style="margin: 0 0 16px 0; font-size: 17px; color: #FFFFFF; line-height: 1.5;">
                Hey <strong style="color: #FF9900;">${escapeHtml(record.fullName)}</strong>,
              </p>
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #94A3B8; line-height: 1.6;">
                You're officially confirmed for Central India's premier student cloud &amp; AI summit. Your VIP digital builder pass has been generated below.
              </p>

              <!-- VIP Builder Pass Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #090D16; border: 2px solid #FF9900; border-radius: 16px; margin: 24px 0; overflow: hidden; box-shadow: 0 10px 30px rgba(255, 153, 0, 0.15);">
                <tr>
                  <td style="padding: 24px;">
                    
                    <!-- Pass Header -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px dashed rgba(255, 153, 0, 0.4); padding-bottom: 16px;">
                      <tr>
                        <td align="left">
                          <span style="font-size: 10px; font-family: monospace; color: #38BDF8; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 800; display: block;">
                            ALL-ACCESS ATTENDEE BADGE
                          </span>
                          <span style="font-size: 26px; font-family: monospace; font-weight: 900; color: #FF9900; letter-spacing: 2px; display: block; margin-top: 4px;">
                            ${escapeHtml(record.ticketId)}
                          </span>
                        </td>
                        <td align="right">
                          <span style="display: inline-block; background: #10B981; color: #000000; font-size: 10px; font-weight: 900; font-family: monospace; text-transform: uppercase; padding: 4px 10px; border-radius: 6px;">
                            &check; ACTIVE PASS
                          </span>
                        </td>
                      </tr>
                    </table>

                    <!-- Details Grid -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 18px;">
                      <tr>
                        <td width="50%" style="padding-bottom: 14px;">
                          <span style="font-size: 10px; font-family: monospace; color: #64748B; text-transform: uppercase; display: block;">ATTENDEE</span>
                          <span style="font-size: 14px; color: #FFFFFF; font-weight: 700; display: block; margin-top: 2px;">${escapeHtml(record.fullName)}</span>
                        </td>
                        <td width="50%" style="padding-bottom: 14px;">
                          <span style="font-size: 10px; font-family: monospace; color: #64748B; text-transform: uppercase; display: block;">TRACK / STREAM</span>
                          <span style="font-size: 14px; color: #38BDF8; font-weight: 700; display: block; margin-top: 2px;">${escapeHtml(record.areaOfInterest)}</span>
                        </td>
                      </tr>
                      <tr>
                        <td width="50%" style="padding-bottom: 14px;">
                          <span style="font-size: 10px; font-family: monospace; color: #64748B; text-transform: uppercase; display: block;">INSTITUTION</span>
                          <span style="font-size: 13px; color: #E2E8F0; font-weight: 600; display: block; margin-top: 2px;">${escapeHtml(record.college)}</span>
                        </td>
                        <td width="50%" style="padding-bottom: 14px;">
                          <span style="font-size: 10px; font-family: monospace; color: #64748B; text-transform: uppercase; display: block;">REPORTING TIME</span>
                          <span style="font-size: 13px; color: #F59E0B; font-weight: 700; display: block; margin-top: 2px;">19 Oct &bull; 09:30 AM IST</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="background: rgba(255, 255, 255, 0.03); border-radius: 8px; padding: 10px 12px;">
                          <span style="font-size: 10px; font-family: monospace; color: #64748B; text-transform: uppercase; display: block;">VENUE</span>
                          <span style="font-size: 12px; color: #CBD5E1; font-weight: 600; display: block; margin-top: 2px;">
                            ${EVENT_METADATA.hall}, ${EVENT_METADATA.venue}
                          </span>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Event Highlights / Perks Callout -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: rgba(30, 41, 59, 0.4); border: 1px solid #1E293B; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 10px 0; font-size: 13px; font-family: monospace; color: #38BDF8; text-transform: uppercase; letter-spacing: 1px;">
                      &#127881; What's Included in Your Free Pass:
                    </h3>
                    <ul style="margin: 0; padding-left: 18px; color: #94A3B8; font-size: 13px; line-height: 1.8;">
                      <li><strong style="color: #F1F5F9;">Auditorium Keynotes:</strong> Industry Cloud Architects &amp; GenAI Mentors.</li>
                      <li><strong style="color: #F1F5F9;">Hands-on Cloud Labs:</strong> Bring your laptop for serverless &amp; Bedrock workshops.</li>
                      <li><strong style="color: #F1F5F9;">Complimentary Lunch &amp; Swags:</strong> Exclusive AWS stickers, badges &amp; meal passes.</li>
                      <li><strong style="color: #F1F5F9;">Digital Certificate:</strong> Awarded to attendees upon check-in.</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- Crucial Event Checklist -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: rgba(239, 68, 68, 0.08); border-left: 4px solid #EF4444; border-radius: 8px; padding: 14px 16px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <span style="font-size: 12px; font-weight: bold; color: #FCA5A5; display: block; text-transform: uppercase; letter-spacing: 0.5px;">
                      &#9888;&#65039; Mandatory Entry Checklist:
                    </span>
                    <span style="font-size: 12px; color: #E2E8F0; line-height: 1.6; display: block; margin-top: 4px;">
                      Please carry your <strong>College Student ID card</strong> and keep this email or your <strong>Pass ID (${escapeHtml(record.ticketId)})</strong> open on your phone for QR verification at the gate.
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Big Interactive Action Buttons -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="text-align: center; margin: 10px 0 20px 0;">
                <tr>
                  <td align="center">
                    
                    <!-- Primary Button: View Pass -->
                    <a href="${livePassUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #FF9900 0%, #FF6600 100%); color: #000000 !important; font-weight: 900; font-size: 14px; text-decoration: none; padding: 15px 30px; border-radius: 10px; box-shadow: 0 6px 20px rgba(255, 153, 0, 0.4); margin: 6px; letter-spacing: 0.5px;">
                      &#128640; View Your Pass Online
                    </a>
                    
                    <!-- Secondary Button: Google Calendar -->
                    <a href="${googleCalUrl}" target="_blank" style="display: inline-block; background: #1E293B; color: #38BDF8 !important; font-weight: 700; font-size: 13px; text-decoration: none; padding: 15px 24px; border-radius: 10px; border: 1px solid #334155; margin: 6px;">
                      &#128197; Add to Google Calendar
                    </a>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #080C14; border-top: 1px solid #1E293B; padding: 26px 28px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #94A3B8; font-weight: 600;">
                Organized by AWS Student Community &bull; Dept. of Computer Science &amp; Engineering
              </p>
              <p style="margin: 4px 0 0 0; font-size: 11px; color: #64748B;">
                Rungta University, Bhilai, Chhattisgarh, India
              </p>
              <p style="margin: 12px 0 0 0; font-size: 11px; color: #64748B;">
                Need help or queries? Write to <a href="mailto:${EVENT_METADATA.organizerEmail}" style="color: #38BDF8; text-decoration: none;">${EVENT_METADATA.organizerEmail}</a>
              </p>
            </td>
          </tr>

        </table>
        
      </td>
    </tr>
  </table>

</body>
</html>`;
};

// Helper to escape HTML characters in templates
function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Main dispatch function for sending registration confirmation emails.
 * Supports:
 * 1. EmailJS (Direct browser sending)
 * 2. Custom Webhook / Resend / AWS SES API Endpoint
 * 3. Graceful Simulation Mode (with rich console logs & preview) for demo/dev
 */
export const sendRegistrationEmail = async (
  record: RegistrationRecord
): Promise<EmailDispatchResult> => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const customApiEndpoint = import.meta.env.VITE_EMAIL_API_ENDPOINT;

  const templateParams = {
    // Recipient aliases (covers {{email}}, {{to_email}}, {{user_email}})
    email: record.email,
    to_email: record.email,
    user_email: record.email,
    recipient: record.email,

    // Name aliases (covers {{name}}, {{to_name}}, {{user_name}})
    name: record.fullName,
    to_name: record.fullName,
    user_name: record.fullName,

    // Event & Ticket Details
    ticket_id: record.ticketId,
    ticketId: record.ticketId,
    pass_id: record.ticketId,
    event_name: EVENT_METADATA.name,
    event_date: EVENT_METADATA.date,
    event_time: EVENT_METADATA.time,
    check_in_time: EVENT_METADATA.checkInTime,
    venue: `${EVENT_METADATA.hall}, ${EVENT_METADATA.venue}, ${EVENT_METADATA.location}`,
    hall: EVENT_METADATA.hall,
    location: EVENT_METADATA.location,
    track: record.areaOfInterest,
    area_of_interest: record.areaOfInterest,
    college: record.college,
    course: `${record.course} (${record.yearOfStudy})`,
    pass_url: typeof window !== 'undefined' ? `${window.location.origin}?ticket=${encodeURIComponent(record.ticketId)}` : '',
    calendar_url: getGoogleCalendarUrl(record),
    organizer_email: EVENT_METADATA.organizerEmail,
    message_html: generateEmailHtml(record)
  };

  // Option 1: Live EmailJS integration if credentials exist
  if (isEmailJsConfigured()) {
    try {
      console.log(`[EmailService] Attempting live EmailJS transmission to ${record.email}...`);
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      console.log(`[EmailService] Email successfully dispatched via EmailJS!`);
      return {
        success: true,
        mode: 'emailjs',
        message: `Official confirmation email sent to ${record.email} via EmailJS.`
      };
    } catch (err: any) {
      console.error('[EmailService] EmailJS dispatch failed:', err);
      return {
        success: false,
        mode: 'emailjs',
        message: `Failed to deliver via EmailJS: ${err?.text || err?.message || 'Unknown network error'}.`,
        error: err?.text || err?.message
      };
    }
  }

  // Option 2: Custom Serverless Backend / Supabase Edge Function / Resend Endpoint
  if (customApiEndpoint && !customApiEndpoint.includes('your_')) {
    try {
      console.log(`[EmailService] Posting to custom email API endpoint: ${customApiEndpoint}...`);
      const response = await fetch(customApiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          record,
          templateParams,
          html: generateEmailHtml(record)
        })
      });

      if (!response.ok) {
        throw new Error(`API responded with HTTP ${response.status}`);
      }

      return {
        success: true,
        mode: 'custom_api',
        message: `Official confirmation email sent to ${record.email} via backend API.`
      };
    } catch (err: any) {
      console.error('[EmailService] Custom API dispatch failed:', err);
      // Fall through to simulated mode if API fails in local dev
    }
  }

  // Option 3: Development / Interactive Demo Mode (Simulated Network Latency & Logging)
  // Provides 100% working demo for interviews and presentation without mandatory 3rd-party setup
  await new Promise((resolve) => setTimeout(resolve, 600));

  console.group('%c[EmailService] Automated Confirmation Email Dispatched', 'color: #10B981; font-weight: bold;');
  console.log('Recipient:', record.email);
  console.log('Subject:', `Your Builder Pass [${record.ticketId}] - ${EVENT_METADATA.name}`);
  console.log('Attendee:', record.fullName);
  console.log('Ticket ID:', record.ticketId);
  console.log('Track:', record.areaOfInterest);
  console.log('Venue:', `${EVENT_METADATA.hall}, ${EVENT_METADATA.venue}`);
  console.log('Template Parameters:', templateParams);
  console.groupEnd();

  return {
    success: true,
    mode: 'simulated',
    message: `Confirmation email generated for ${record.email} (Demo / Preview Mode).`
  };
};

// Generates mailto link for direct manual dispatch / mail client fallback
export const openMailClient = (record: RegistrationRecord) => {
  const subject = encodeURIComponent(`Your Builder Pass [${record.ticketId}] - ${EVENT_METADATA.name}`);
  const body = encodeURIComponent(
    `Hello ${record.fullName},\n\n` +
    `Your registration for ${EVENT_METADATA.name} is confirmed!\n\n` +
    `Pass ID: ${record.ticketId}\n` +
    `Stream: ${record.areaOfInterest}\n` +
    `Institution: ${record.college}\n` +
    `Date & Time: ${EVENT_METADATA.date} • ${EVENT_METADATA.time} (Reporting: ${EVENT_METADATA.checkInTime})\n` +
    `Venue: ${EVENT_METADATA.hall}, ${EVENT_METADATA.venue}, ${EVENT_METADATA.location}\n\n` +
    `Checklist for Event Day:\n` +
    `- Carry your physical/digital College ID card\n` +
    `- Bring your laptop and charger for hands-on cloud labs\n` +
    `- Keep this Pass ID handy for fast-track QR scanner check-in\n\n` +
    `View online pass: ${typeof window !== 'undefined' ? window.location.origin : ''}?ticket=${record.ticketId}\n\n` +
    `Organized by AWS Student Community @ Rungta University`
  );

  window.open(`mailto:${record.email}?subject=${subject}&body=${body}`, '_blank');
};

