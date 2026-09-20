export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  course: string;
  yearOfStudy: string;
  profileUrl: string;
  areaOfInterest: string;
  agreeUpdates: boolean;
}

export interface RegistrationRecord extends RegistrationFormData {
  id: string;
  ticketId: string;
  registeredAt: string;
  isCheckedIn?: boolean;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  organization: string;
  topic: string;
  bio: string;
  track: string;
  tag: string;
  github?: string;
  linkedin?: string;
  initials: string;
  avatarGradient: string;
  isFictionalDemo?: boolean;
}

export interface ScheduleItem {
  id: string;
  time: string;
  endTime?: string;
  title: string;
  description: string;
  speaker?: string;
  speakerRole?: string;
  location: string;
  type: 'networking' | 'keynote' | 'fundamentals' | 'hands-on' | 'ai' | 'challenge' | 'showcase' | 'wrapup';
  trackBadge?: string;
}

export interface Track {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  keyTopics: string[];
  targetAudience: string;
  badge: string;
  accentColor: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}
