import React, { useState, useEffect } from 'react';
import {
  X,
  Users,
  CheckCircle2,
  Clock,
  Search,
  Download,
  Filter,
  Trash2,
  Eye,
  Plus,
  QrCode,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Lock,
  LogOut,
  KeyRound,
  EyeOff,
  AlertCircle,
  Database,
  RefreshCw,
  Copy,
  ExternalLink
} from 'lucide-react';
import { RegistrationRecord } from '../types';
import { INITIAL_REGISTRATIONS } from '../data/eventData';
import {
  isSupabaseConfigured,
  getSupabaseConfig,
  saveSupabaseConfig,
  fetchCloudRegistrations,
  insertCloudRegistration,
  updateCloudCheckIn,
  deleteCloudRegistration,
  SUPABASE_SQL_SCHEMA
} from '../lib/supabase';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = 'aws_student_builder_registrations';
const AUTH_KEY = 'aws_organizer_auth';

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Dashboard state
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [inspectRecord, setInspectRecord] = useState<RegistrationRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDbModal, setShowDbModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCloudActive, setIsCloudActive] = useState(isSupabaseConfigured());

  // Database settings inputs
  const currentConfig = getSupabaseConfig();
  const [dbUrl, setDbUrl] = useState(currentConfig.url);
  const [dbKey, setDbKey] = useState(currentConfig.anonKey);
  const [dbMessage, setDbMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Spot Registration form state
  const [newStudent, setNewStudent] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: 'Rungta University, Bhilai',
    course: 'B.Tech CSE',
    yearOfStudy: '3rd Year',
    areaOfInterest: 'AWS Cloud'
  });

  // Load registrations function
  const loadData = async () => {
    setIsRefreshing(true);

    // If Supabase is configured, fetch from cloud
    if (isSupabaseConfigured()) {
      setIsCloudActive(true);
      const cloudData = await fetchCloudRegistrations();
      if (cloudData && cloudData.length > 0) {
        setRegistrations(cloudData);
        // Cache to localStorage
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
        } catch (e) {}
        setIsRefreshing(false);
        return;
      }
    }

    // Fallback to localStorage or seed
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRegistrations(parsed);
          setIsRefreshing(false);
          return;
        }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REGISTRATIONS));
      setRegistrations(INITIAL_REGISTRATIONS);
    } catch (err) {
      console.error('Error loading registrations:', err);
      setRegistrations(INITIAL_REGISTRATIONS);
    }
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const validUsernames = ['admin', 'organizer', 'aws-admin', 'lead'];
    const validPasswords = ['rungta@aws2026', 'admin2026', 'builder2026'];

    const u = loginId.trim().toLowerCase();
    const p = loginPassword.trim();

    if (validUsernames.includes(u) && validPasswords.includes(p)) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      setLoginPassword('');
    } else {
      setAuthError('Invalid Organizer ID or Password. Please verify your credentials.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
    setLoginId('');
    setLoginPassword('');
    setAuthError(null);
  };

  const saveRegistrations = (records: RegistrationRecord[]) => {
    setRegistrations(records);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (err) {
      console.error('Failed to save to localStorage', err);
    }
  };

  // Toggle Check-in status
  const handleToggleCheckIn = async (id: string) => {
    const target = registrations.find((r) => r.id === id);
    const newStatus = target ? !target.isCheckedIn : true;

    const updated = registrations.map((r) => {
      if (r.id === id) {
        return { ...r, isCheckedIn: newStatus };
      }
      return r;
    });
    saveRegistrations(updated);

    if (isSupabaseConfigured()) {
      await updateCloudCheckIn(id, newStatus);
    }
  };

  // Delete attendee record
  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name}'s registration?`)) {
      const updated = registrations.filter((r) => r.id !== id);
      saveRegistrations(updated);

      if (isSupabaseConfigured()) {
        await deleteCloudRegistration(id);
      }
    }
  };

  // Add new spot registration
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.fullName || !newStudent.email) return;

    const uniqueNum = Math.floor(10000 + Math.random() * 90000);
    const newRecord: RegistrationRecord = {
      ...newStudent,
      profileUrl: '',
      agreeUpdates: true,
      id: `reg-${Date.now()}`,
      ticketId: `RU-AWS-${uniqueNum}`,
      registeredAt: new Date().toISOString(),
      isCheckedIn: true
    };

    const updated = [newRecord, ...registrations];
    saveRegistrations(updated);

    if (isSupabaseConfigured()) {
      await insertCloudRegistration(newRecord);
    }

    setShowAddModal(false);
    setNewStudent({
      fullName: '',
      email: '',
      phone: '',
      college: 'Rungta University, Bhilai',
      course: 'B.Tech CSE',
      yearOfStudy: '3rd Year',
      areaOfInterest: 'AWS Cloud'
    });
  };

  // Save Supabase Configuration
  const handleSaveDatabaseConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setDbMessage(null);

    const cleanUrl = dbUrl.trim();
    const cleanKey = dbKey.trim();

    if (!cleanUrl || !cleanKey) {
      setDbMessage({ text: 'Please provide both Project URL and Anon API Key.', type: 'error' });
      return;
    }

    if (!cleanUrl.startsWith('https://')) {
      setDbMessage({ text: 'Supabase URL must start with https://', type: 'error' });
      return;
    }

    saveSupabaseConfig(cleanUrl, cleanKey);
    setIsCloudActive(true);
    setDbMessage({ text: 'Connected to Supabase! Syncing records...', type: 'success' });

    // Try fetching from cloud
    const cloudRecords = await fetchCloudRegistrations();
    if (cloudRecords !== null) {
      setDbMessage({ text: `Successfully connected to Supabase (${cloudRecords.length} records found).`, type: 'success' });
      if (cloudRecords.length > 0) {
        setRegistrations(cloudRecords);
      } else {
        // Upload current records to populate empty table
        for (const reg of registrations) {
          await insertCloudRegistration(reg);
        }
        setDbMessage({ text: `Connected! Uploaded ${registrations.length} existing attendees to Supabase.`, type: 'success' });
      }
    } else {
      setDbMessage({
        text: 'Credentials saved, but could not read table "registrations". Please run the SQL schema below in Supabase SQL Editor.',
        type: 'error'
      });
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Ticket ID',
      'Full Name',
      'Email',
      'Phone',
      'College',
      'Course',
      'Year of Study',
      'Primary Interest',
      'Check-in Status',
      'Registered Timestamp'
    ];

    const rows = registrations.map((r) => [
      `"${r.ticketId}"`,
      `"${r.fullName}"`,
      `"${r.email}"`,
      `"${r.phone || ''}"`,
      `"${r.college}"`,
      `"${r.course}"`,
      `"${r.yearOfStudy}"`,
      `"${r.areaOfInterest}"`,
      `"${r.isCheckedIn ? 'Checked In' : 'Registered'}"`,
      `"${r.registeredAt}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `AWS-Community-Day-Attendees-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  // Filtered registrations
  const filtered = registrations.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      r.fullName.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.ticketId.toLowerCase().includes(q) ||
      r.college.toLowerCase().includes(q);

    const matchesTrack =
      selectedTrack === 'ALL' || r.areaOfInterest.toLowerCase() === selectedTrack.toLowerCase();

    const matchesStatus =
      selectedStatus === 'ALL' ||
      (selectedStatus === 'CHECKED_IN' && r.isCheckedIn) ||
      (selectedStatus === 'PENDING' && !r.isCheckedIn);

    return matchesSearch && matchesTrack && matchesStatus;
  });

  // Calculate Metrics
  const totalCount = registrations.length;
  const checkedInCount = registrations.filter((r) => r.isCheckedIn).length;
  const checkInPercent = totalCount > 0 ? Math.round((checkedInCount / totalCount) * 100) : 0;

  // ==========================================
  // VIEW 1: LOGIN GATE (IF NOT AUTHENTICATED)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
        <div className="relative w-full max-w-md rounded-3xl bg-[#0B1118] border border-white/15 p-7 sm:p-9 shadow-2xl space-y-6">
          
          {/* Close / Return Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-muted hover:text-white hover:bg-white/5 transition-colors"
            title="Return to Website"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Login Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aws-orange/20 to-aws-blue/20 border border-aws-orange/40 text-aws-orange flex items-center justify-center mx-auto shadow-lg shadow-aws-orange/10">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <div className="text-xs font-mono font-bold text-aws-orange uppercase tracking-wider">
                RESTRICTED ACCESS
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                Organizer Login
              </h3>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Rungta University event coordinators & cloud database administration.
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {authError && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-gray-200">
                Organizer ID / Username
              </label>
              <input
                type="text"
                required
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="e.g. admin"
                className="w-full px-4 py-2.5 rounded-xl bg-[#05070A] border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-aws-orange focus:ring-1 focus:ring-aws-orange transition-colors"
                autoFocus
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-gray-200">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#05070A] border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-aws-orange focus:ring-1 focus:ring-aws-orange transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-aws-orange to-[#F59E0B] shadow-lg shadow-aws-orange/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Authenticate & Open Dashboard</span>
            </button>
          </form>

          {/* Credentials Helper */}
          <div className="p-3 rounded-xl bg-[#05070A] border border-white/10 text-center space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted font-semibold block">
              COORDINATOR CREDENTIALS
            </span>
            <div className="text-xs font-mono text-gray-300">
              ID: <span className="text-aws-brightBlue font-bold">admin</span> &bull; Password: <span className="text-aws-orange font-bold">rungta@aws2026</span>
            </div>
          </div>

          <div className="text-center pt-1">
            <button
              onClick={onClose}
              className="text-xs text-muted hover:text-white transition-colors underline font-mono"
            >
              ← Back to Event Homepage
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl rounded-3xl bg-[#0B1118] border border-white/15 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Title Bar */}
        <div className="px-6 py-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-surface-light/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-aws-orange/15 border border-aws-orange/30 text-aws-orange flex items-center justify-center font-mono font-bold">
              RU
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Organizer Admin Portal
                </h3>
                {isCloudActive ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    SUPABASE CLOUD ACTIVE
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 font-bold">
                    LOCAL STORAGE MODE
                  </span>
                )}
              </div>
              <p className="text-xs text-muted">
                AWS Student Builder Community Day @ Rungta University
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Supabase Cloud Connection Button */}
            <button
              onClick={() => setShowDbModal(true)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border shadow-sm ${
                isCloudActive
                  ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-surface-light hover:bg-surface-lighter text-gray-200 border-white/15'
              }`}
              title="Configure Supabase Cloud Database credentials"
            >
              <Database className="w-3.5 h-3.5 text-aws-brightBlue" />
              <span className="hidden sm:inline">Supabase Cloud</span>
            </button>

            {/* Refresh Data */}
            <button
              onClick={loadData}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-surface-light hover:bg-surface-lighter text-gray-300 hover:text-white border border-white/15 transition-colors"
              title="Refresh Registry"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-aws-orange' : ''}`} />
            </button>

            {/* Export CSV */}
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-surface-light hover:bg-surface-lighter text-xs font-semibold text-gray-200 hover:text-white border border-white/15 flex items-center gap-2 transition-colors shadow-sm"
              title="Download attendee records as CSV"
            >
              <Download className="w-3.5 h-3.5 text-aws-brightBlue" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {/* Spot Registration */}
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 rounded-xl bg-aws-orange hover:bg-aws-orangeHover text-xs font-bold text-white flex items-center gap-1.5 transition-colors shadow-md shadow-aws-orange/20"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Spot Registration</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-mono border border-red-500/30 flex items-center gap-1.5 transition-colors"
              title="Lock & Log out of admin portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-muted hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close admin dashboard"
              title="Return to site"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="p-6 pb-4 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-surface/40 border-b border-white/5 shrink-0">
          <div className="p-4 rounded-2xl bg-[#05070A] border border-white/10">
            <div className="flex items-center justify-between text-muted text-xs font-mono">
              <span>TOTAL REGISTRATIONS</span>
              <Users className="w-4 h-4 text-aws-brightBlue" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
              {totalCount}
            </div>
            <div className="text-[11px] text-gray-400 mt-0.5">Cap: 500 Attendees</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#05070A] border border-white/10">
            <div className="flex items-center justify-between text-muted text-xs font-mono">
              <span>CHECKED IN ON-SITE</span>
              <UserCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">
              {checkedInCount}
            </div>
            <div className="text-[11px] text-gray-400 mt-0.5">{checkInPercent}% Attendance Rate</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#05070A] border border-white/10">
            <div className="flex items-center justify-between text-muted text-xs font-mono">
              <span>PENDING ARRIVALS</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mt-1">
              {totalCount - checkedInCount}
            </div>
            <div className="text-[11px] text-gray-400 mt-0.5">Expected before 10:00 AM</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#05070A] border border-white/10">
            <div className="flex items-center justify-between text-muted text-xs font-mono">
              <span>STORAGE BACKEND</span>
              <Database className="w-4 h-4 text-aws-orange" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-aws-orange font-mono mt-2 truncate">
              {isCloudActive ? 'Supabase' : 'LocalStorage'}
            </div>
            <div className="text-[11px] text-gray-400 mt-0.5">
              {isCloudActive ? 'Real-time PostgreSQL' : 'Local browser store'}
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-6 pb-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, email, pass ID, college..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#05070A] border border-white/15 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-aws-orange"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#05070A] border border-white/15 text-xs text-gray-200 focus:outline-none focus:border-aws-orange"
            >
              <option value="ALL">All Streams</option>
              <option value="AWS Cloud">AWS Cloud</option>
              <option value="Generative AI">Generative AI</option>
              <option value="DevOps">DevOps</option>
              <option value="Full Stack Development">Full Stack</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#05070A] border border-white/15 text-xs text-gray-200 focus:outline-none focus:border-aws-orange"
            >
              <option value="ALL">All Status</option>
              <option value="CHECKED_IN">Checked In</option>
              <option value="PENDING">Pending Arrival</option>
            </select>
          </div>
        </div>

        {/* Registry Table View */}
        <div className="flex-grow overflow-y-auto px-4 sm:px-6 pb-6">
          <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#05070A]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-surface-light/60 font-mono text-[11px] text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Pass ID</th>
                  <th className="py-3 px-4">Student & College</th>
                  <th className="py-3 px-4 hidden md:table-cell">Contact</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Stream & Year</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.length > 0 ? (
                  filtered.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-surface-light/30 transition-colors group"
                    >
                      {/* Ticket ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-aws-orange">
                        <button
                          onClick={() => handleCopy(record.ticketId)}
                          className="hover:underline flex items-center gap-1.5"
                          title="Click to copy Pass ID"
                        >
                          <span>{record.ticketId}</span>
                          {copiedId === record.ticketId && (
                            <span className="text-[9px] text-emerald-400 font-sans">Copied!</span>
                          )}
                        </button>
                      </td>

                      {/* Name & College */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm">{record.fullName}</div>
                        <div className="text-gray-400 truncate max-w-[200px]">{record.college}</div>
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-4 hidden md:table-cell text-gray-300">
                        <div>{record.email}</div>
                        <div className="text-muted font-mono text-[11px]">{record.phone || '—'}</div>
                      </td>

                      {/* Stream & Year */}
                      <td className="py-3.5 px-4 hidden sm:table-cell">
                        <span className="inline-block px-2 py-0.5 rounded bg-white/5 border border-white/10 text-aws-brightBlue font-mono font-medium text-[11px] mb-1">
                          {record.areaOfInterest}
                        </span>
                        <div className="text-gray-400 text-[11px]">{record.yearOfStudy}</div>
                      </td>

                      {/* Check-in Toggle Button */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleToggleCheckIn(record.id)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-colors inline-flex items-center gap-1.5 ${
                            record.isCheckedIn
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                              : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                          }`}
                          title="Click to toggle check-in state"
                        >
                          {record.isCheckedIn ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Checked In</span>
                            </>
                          ) : (
                            <span>Pending</span>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setInspectRecord(record)}
                            className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            title="View Builder Pass"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(record.id, record.fullName)}
                            className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-muted">
                      No registrations matched your filters or search query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: View Pass Preview */}
        {inspectRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-md rounded-3xl bg-[#0B1118] border border-white/15 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono font-bold text-aws-orange uppercase">
                  PASS INSPECTION
                </span>
                <button
                  onClick={() => setInspectRecord(null)}
                  className="p-1 rounded-lg text-muted hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#05070A] border border-white/15 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-white">{inspectRecord.fullName}</h4>
                    <p className="text-xs text-aws-brightBlue font-mono">{inspectRecord.ticketId}</p>
                    <p className="text-xs text-muted mt-1">{inspectRecord.college}</p>
                  </div>
                  <div className="p-2 bg-white rounded-lg">
                    <QrCode className="w-10 h-10 text-black" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs border-t border-white/10 pt-3">
                  <div>
                    <span className="text-[10px] text-muted font-mono block">STREAM</span>
                    <span className="text-white font-medium">{inspectRecord.areaOfInterest}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted font-mono block">COURSE</span>
                    <span className="text-white font-medium truncate block">{inspectRecord.course}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted font-mono block">YEAR</span>
                    <span className="text-white font-medium">{inspectRecord.yearOfStudy}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted font-mono block">STATUS</span>
                    <span className={inspectRecord.isCheckedIn ? "text-emerald-400 font-bold" : "text-amber-400 font-medium"}>
                      {inspectRecord.isCheckedIn ? "Checked In" : "Pending Check-in"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setInspectRecord(null)}
                  className="px-4 py-2 rounded-xl bg-surface-light text-xs font-semibold text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Supabase Cloud Database Settings */}
        {showDbModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-2xl rounded-3xl bg-[#0B1118] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-base font-bold text-white">
                    Supabase Cloud Database Settings
                  </h4>
                </div>
                <button
                  onClick={() => setShowDbModal(false)}
                  className="p-1 rounded-lg text-muted hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-muted leading-relaxed">
                Connect your free Supabase PostgreSQL project so student registrations from any device sync into a single shared database in real time.
              </p>

              {dbMessage && (
                <div
                  className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                    dbMessage.type === 'success'
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                      : 'bg-red-500/15 border border-red-500/30 text-red-300'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{dbMessage.text}</span>
                </div>
              )}

              {/* Settings Form */}
              <form onSubmit={handleSaveDatabaseConfig} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-200">
                    Supabase Project URL
                  </label>
                  <input
                    type="url"
                    required
                    value={dbUrl}
                    onChange={(e) => setDbUrl(e.target.value)}
                    placeholder="https://your-project-ref.supabase.co"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#05070A] border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-aws-orange"
                  />
                  <span className="text-[10px] text-muted font-mono">Found in Supabase Project Settings → API → Project URL</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-200">
                    Supabase Anon Public API Key
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={dbKey}
                    onChange={(e) => setDbKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full px-4 py-2 rounded-xl bg-[#05070A] border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-aws-orange"
                  />
                  <span className="text-[10px] text-muted font-mono">Found in Supabase Project Settings → API → Project API Keys (anon public)</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleCopySql}
                    className="px-3.5 py-2 rounded-xl bg-surface-light hover:bg-surface-lighter border border-white/15 text-xs text-gray-200 flex items-center gap-1.5 transition-colors"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-aws-brightBlue" />}
                    <span>{copiedSql ? 'SQL Copied!' : 'Copy Supabase SQL Setup'}</span>
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-xs font-bold text-white shadow-md shadow-emerald-500/20 transition-all"
                  >
                    Connect & Sync Database
                  </button>
                </div>
              </form>

              {/* SQL Schema Preview Box */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono text-gray-300 font-semibold">
                    1-Minute Setup in Supabase SQL Editor:
                  </span>
                </div>
                <pre className="p-3.5 rounded-xl bg-[#05070A] border border-white/10 text-[10px] font-mono text-gray-400 overflow-x-auto max-h-36">
                  {SUPABASE_SQL_SCHEMA}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add Spot Registration */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-lg rounded-3xl bg-[#0B1118] border border-white/15 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="text-base font-bold text-white">Add Spot Registration</h4>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-muted hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="col-span-2 space-y-1">
                    <label className="font-semibold text-gray-200">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={newStudent.fullName}
                      onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
                      placeholder="Student full name"
                      className="w-full px-3 py-2 rounded-xl bg-[#05070A] border border-white/15 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-gray-200">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      placeholder="student@rungta.ac.in"
                      className="w-full px-3 py-2 rounded-xl bg-[#05070A] border border-white/15 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-gray-200">Phone</label>
                    <input
                      type="tel"
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                      placeholder="+91 98..."
                      className="w-full px-3 py-2 rounded-xl bg-[#05070A] border border-white/15 text-white"
                    />
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="font-semibold text-gray-200">College</label>
                    <input
                      type="text"
                      value={newStudent.college}
                      onChange={(e) => setNewStudent({ ...newStudent, college: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#05070A] border border-white/15 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-gray-200">Course / Branch</label>
                    <input
                      type="text"
                      value={newStudent.course}
                      onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#05070A] border border-white/15 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-gray-200">Year of Study</label>
                    <select
                      value={newStudent.yearOfStudy}
                      onChange={(e) => setNewStudent({ ...newStudent, yearOfStudy: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#05070A] border border-white/15 text-white"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Postgraduate">Postgraduate</option>
                    </select>
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="font-semibold text-gray-200">Stream</label>
                    <select
                      value={newStudent.areaOfInterest}
                      onChange={(e) => setNewStudent({ ...newStudent, areaOfInterest: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#05070A] border border-white/15 text-white"
                    >
                      <option value="AWS Cloud">AWS Cloud Foundations</option>
                      <option value="Generative AI">Generative AI & Bedrock</option>
                      <option value="DevOps">DevOps & CI/CD</option>
                      <option value="Full Stack Development">Full Stack Development</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl bg-surface-light text-xs font-semibold text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-aws-orange hover:bg-aws-orangeHover text-xs font-bold text-white shadow-md"
                  >
                    Confirm & Check In
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
