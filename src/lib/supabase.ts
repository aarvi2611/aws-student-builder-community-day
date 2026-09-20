import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { RegistrationRecord } from '../types';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

const CONFIG_KEY = 'aws_supabase_config';

// Permanent fallback configuration (can be populated directly or via .env)
export const DEFAULT_SUPABASE_CONFIG: SupabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
};

export const getSupabaseConfig = (): SupabaseConfig => {
  // 1. Check environment variables first (permanent 1-time setup)
  if (
    DEFAULT_SUPABASE_CONFIG.url &&
    DEFAULT_SUPABASE_CONFIG.anonKey &&
    !DEFAULT_SUPABASE_CONFIG.url.includes('dummy')
  ) {
    return DEFAULT_SUPABASE_CONFIG;
  }

  // 2. Check persistent saved config in localStorage (survives refreshes forever)
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey && parsed.url.startsWith('https://')) {
        return parsed;
      }
    }
  } catch (e) {}

  return {
    url: '',
    anonKey: ''
  };
};

export const saveSupabaseConfig = (url: string, anonKey: string) => {
  const config = { url: url.trim(), anonKey: anonKey.trim() };
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
};

export const clearSupabaseConfig = () => {
  localStorage.removeItem(CONFIG_KEY);
};

export const isSupabaseConfigured = (): boolean => {
  const config = getSupabaseConfig();
  return Boolean(
    config.url &&
    config.anonKey &&
    config.url.startsWith('https://') &&
    !config.url.includes('dummy') &&
    !config.anonKey.includes('dummy')
  );
};

let cachedClient: SupabaseClient | null = null;
let lastUrl = '';
let lastKey = '';

export const getSupabaseClient = (): SupabaseClient | null => {
  const config = getSupabaseConfig();

  if (!isSupabaseConfigured()) {
    return null;
  }

  if (cachedClient && lastUrl === config.url && lastKey === config.anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(config.url, config.anonKey);
    lastUrl = config.url;
    lastKey = config.anonKey;
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
};

// Database queries with snake_case <-> camelCase mapping

export const fetchCloudRegistrations = async (): Promise<RegistrationRecord[] | null> => {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('registered_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error:', error.message);
      return null;
    }

    if (!data) return [];

    return data.map((item: any) => ({
      id: item.id || `reg-${Date.now()}`,
      ticketId: item.ticket_id,
      fullName: item.full_name,
      email: item.email,
      phone: item.phone || '',
      college: item.college,
      course: item.course,
      yearOfStudy: item.year_of_study,
      profileUrl: item.profile_url || '',
      areaOfInterest: item.area_of_interest,
      agreeUpdates: item.agree_updates ?? true,
      isCheckedIn: item.is_checked_in ?? false,
      registeredAt: item.registered_at || new Date().toISOString()
    }));
  } catch (err) {
    console.warn('Network error querying Supabase:', err);
    return null;
  }
};

export const insertCloudRegistration = async (record: RegistrationRecord): Promise<boolean> => {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const payload = {
      id: record.id,
      ticket_id: record.ticketId,
      full_name: record.fullName,
      email: record.email,
      phone: record.phone || null,
      college: record.college,
      course: record.course,
      year_of_study: record.yearOfStudy,
      profile_url: record.profileUrl || null,
      area_of_interest: record.areaOfInterest,
      agree_updates: record.agreeUpdates,
      is_checked_in: record.isCheckedIn || false,
      registered_at: record.registeredAt
    };

    const { error } = await supabase.from('registrations').insert([payload]);

    if (error) {
      console.warn('Supabase insert error:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.warn('Network error inserting into Supabase:', err);
    return false;
  }
};

export const updateCloudCheckIn = async (id: string, isCheckedIn: boolean): Promise<boolean> => {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from('registrations')
      .update({ is_checked_in: isCheckedIn })
      .eq('id', id);

    if (error) {
      console.warn('Supabase checkin update error:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.warn('Network error updating check-in in Supabase:', err);
    return false;
  }
};

export const deleteCloudRegistration = async (id: string): Promise<boolean> => {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('registrations').delete().eq('id', id);

    if (error) {
      console.warn('Supabase delete error:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.warn('Network error deleting from Supabase:', err);
    return false;
  }
};

export const SUPABASE_SQL_SCHEMA = `-- Copy & Paste this into your Supabase SQL Editor and click RUN:

create table if not exists public.registrations (
  id text primary key,
  ticket_id text unique not null,
  full_name text not null,
  email text not null,
  phone text,
  college text not null,
  course text not null,
  year_of_study text not null,
  profile_url text,
  area_of_interest text not null,
  agree_updates boolean default true,
  is_checked_in boolean default false,
  registered_at timestamp with time zone default now()
);

-- Enable public row level security for registration
alter table public.registrations enable row level security;

create policy "Allow public read access"
  on public.registrations for select
  using (true);

create policy "Allow public insert"
  on public.registrations for insert
  with check (true);

create policy "Allow public update"
  on public.registrations for update
  using (true);

create policy "Allow public delete"
  on public.registrations for delete
  using (true);
`;
