# AWS Student Builder Community Day @ Rungta University

> An immersive, production-quality event and registration web application engineered for **AWS Student Builder Community Day @ Rungta University**.

![Event Date](https://img.shields.io/badge/Date-19_October_2026-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Location](https://img.shields.io/badge/Location-Rungta_University,_Bhilai-146EB4?style=for-the-badge)
![Status](https://img.shields.io/badge/Passes-Free_•_Registration_Open-10B981?style=for-the-badge)
![Build](https://img.shields.io/badge/Build-Vite_•_React_19_•_TypeScript-38BDF8?style=for-the-badge)

---

## 📌 Project Overview

This repository hosts a production-grade single-page event website built for technical and design excellence. The application is crafted with an authentic, humanized dark-mode aesthetic inspired by AWS builder communities, combining deep blacks (`#05070A`), AWS Orange (`#FF9900`), and Sky Cyan (`#38BDF8`) with responsive typography, an interactive cloud architecture simulation, an event countdown timer, ticket lookup, and a **Hidden Organizer Admin Portal** protected by ID & Password authentication.

---

## 🔐 Organizer Admin Portal (Hidden URL & Protected Access)

The Admin Dashboard is **hidden** from the public website navigation to preserve the clean attendee experience. It is accessible only via direct URL:

- **Direct URL**: `http://localhost:3000/admin` (or `#/admin`)
- **Vercel Production URL**: `https://<your-vercel-domain>.vercel.app/admin`

### Organizer Login Credentials:
- **Organizer ID**: `admin`
- **Password**: `rungta@aws2026`

### Admin Features:
- **Live Key Metrics**: Total registered students, checked-in count, check-in percentage, and stream distributions.
- **Search & Filter**: Real-time filtering by student name, email, pass ID, or college. Filter by track and check-in status.
- **On-Site Check-in Toggle**: Mark students as "Checked In" or toggle back with a single click at the entrance.
- **Export to CSV**: Download all attendee records formatted for Microsoft Excel or Google Sheets.
- **Spot Registration**: Quickly register walk-in students on event day.
- **Pass Inspection**: View student digital pass and scannable QR code.
- **Session Security**: Sign out button to lock the portal and clear session tokens.

---

## ✨ Key Features

- **Interactive Cloud Architecture Hero**: Custom SVG simulation representing API Gateway, AWS Lambda, Amazon Bedrock, and Amazon DynamoDB with live metrics and inspection tooltips.
- **Live Countdown Timer**: Real-time ticker counting down to 19 October 2026, 10:00 AM IST (Days, Hours, Minutes, Seconds).
- **Quick Highlight Strip**: Instant visibility of key metadata (Date, Venue, Timings, Free Admission).
- **Attendee Ticket Lookup**: Students can look up their confirmed pass anytime using their email or Pass ID (`RU-AWS-XXXXX`) without filling the form again.
- **Builder Lifecycle Progression**: Interactive 4-stage learning journey (`Learn → Build → Deploy → Share`) with expandable stage insights.
- **Editorial Benefits Matrix**: Six curated takeaways avoiding repetitive cards through varied layouts and verified skill checks.
- **Community Mentors**: Profiles highlighting cloud solutions, generative AI, full-stack, and DevOps specializations with social links.
- **Filterable Event Agenda**: Detailed chronological timeline from 09:30 AM check-in to 05:00 PM closing, filterable by session type.
- **Specialized Learning Tracks**: Four distinct tracks (Cloud Foundations, Generative AI, Full-Stack Cloud, DevOps) with direct form pre-fill integration.
- **75-Minute Rapid Build Challenge**: Dedicated sprint breakdown outlining the 5-stage hackathon workflow (`IDEA → ARCHITECT → BUILD → DEPLOY → DEMO`).
- **Client-Side Registration Engine**:
  - Full client-side validation for required fields, character limits, and RFC email format.
  - Simulated network submission latency with spinner.
  - Confetti celebration burst upon success.
  - Digital Event Pass with unique Ticket ID (`RU-AWS-XXXXX`) and scannable QR code preview.
  - `.ics` calendar invitation download and pass ID copying.
  - Persistent caching in `localStorage`.
- **Accessible FAQ Accordion**: Keyboard-navigable collapsible questions covering event eligibility, laptop requirements, and participation certificates.
- **SEO & Social Sharing Ready**: Fully equipped with OpenGraph, Twitter card tags, and Schema.org Event JSON-LD structured data.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler & Tooling**: [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Brand Icons
- **Animation & Effects**: Native CSS Transforms + [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Local Storage**: Web Storage API (`localStorage` & `sessionStorage`)

---

## 🚀 Quick Start & Commands

### Prerequisites
- **Node.js**: v18.0.0 or later (Node v20+ recommended)
- **npm**: v9.0.0 or later

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
The site will be available at `http://localhost:3000`.

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deployment to Vercel

This repository is configured with `vercel.json` for zero-configuration SPA rewrites:
1. Push the repository to GitHub.
2. In Vercel, click **Add New Project** and select the repository.
3. Vercel automatically detects the project settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Both the main site (`/`) and the hidden admin route (`/admin`) will work cleanly with zero 404 errors!
