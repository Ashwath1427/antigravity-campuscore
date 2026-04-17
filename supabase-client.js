/* ============================================================
   CAMPUS CORE – SUPABASE CLIENT
   Initializes Supabase and provides data-fetch helpers.
   Falls back to local DEMO_USERS/STUDENTS data if Supabase fails.
   ============================================================ */

if (!window.SUPABASE_URL) window.SUPABASE_URL = 'https://bzqqgurlqunpzgdavedz.supabase.co';
if (!window.SUPABASE_KEY) window.SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cXFndXJscXVucHpnZGF2ZWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMTY0MDAsImV4cCI6MjA2MTY5MjQwMH0.ZlzLFhDMcCzVq_lFMVP8MmjZAFUTKKCBomz0wIFJZxY';

if (!window.supabaseClient && typeof supabase !== 'undefined') {
  window.supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_KEY);
  console.log('[Supabase] window.supabaseClient initialized');
}

function getSupabase() {
  if (window.supabaseClient) return window.supabaseClient;
  try {
    if (typeof supabase !== 'undefined' && supabase.createClient) {
      window.supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_KEY);
      return window.supabaseClient;
    }
  } catch (e) {
    console.warn('[Supabase] Failed to initialize:', e);
  }
  return null;
}

// ─── Fetch users from Supabase cc_users table ────────────────
async function sbFetchUsers() {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb.from('cc_users').select('*');
    if (error) { console.warn('[Supabase] fetchUsers error:', error); return null; }
    return data;
  } catch (e) { console.warn('[Supabase] fetchUsers exception:', e); return null; }
}

// ─── Fetch students from Supabase cc_students table ──────────
async function sbFetchStudents() {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb.from('cc_students').select('*');
    if (error) { console.warn('[Supabase] fetchStudents error:', error); return null; }
    // Map DB columns to app format
    return data.map(s => ({
      id: s.id,
      admNo: s.adm_no,
      name: s.name,
      class: s.class,
      roll: s.roll,
      gender: s.gender,
      dob: s.dob,
      attendance: s.attendance,
      behavior: s.behavior,
      fee_status: s.fee_status,
      gpa: parseFloat(s.gpa),
      parent: s.parent_name
    }));
  } catch (e) { console.warn('[Supabase] fetchStudents exception:', e); return null; }
}

// ─── Fetch announcements ──────────────────────────────────────
async function sbFetchAnnouncements() {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb.from('cc_announcements').select('*').order('id');
    if (error) { console.warn('[Supabase] fetchAnnouncements error:', error); return null; }
    return data.map(a => ({
      id: a.id,
      title: a.title,
      date: a.date,
      author: a.author,
      category: a.category,
      priority: a.priority
    }));
  } catch (e) { console.warn('[Supabase] fetchAnnouncements exception:', e); return null; }
}

// ─── Fetch homework ───────────────────────────────────────────
async function sbFetchHomework() {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb.from('cc_homework').select('*').order('id');
    if (error) { console.warn('[Supabase] fetchHomework error:', error); return null; }
    return data.map(h => ({
      id: h.id,
      title: h.title,
      subject: h.subject,
      class: h.class,
      teacher: h.teacher,
      due: h.due,
      submitted: h.submitted,
      total: h.total,
      status: h.status
    }));
  } catch (e) { console.warn('[Supabase] fetchHomework exception:', e); return null; }
}

// ─── Fetch events ─────────────────────────────────────────────
async function sbFetchEvents() {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb.from('cc_events').select('*').order('id');
    if (error) { console.warn('[Supabase] fetchEvents error:', error); return null; }
    return data.map(e => ({
      title: e.title,
      date: e.date,
      desc: e.description,
      color: e.color
    }));
  } catch (e) { console.warn('[Supabase] fetchEvents exception:', e); return null; }
}

// ─── Login via Supabase cc_users ──────────────────────────────
async function sbAttemptLogin(username, password) {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const normalizedUsername = String(username || '').toUpperCase();

    // Create a timeout promise (3 seconds)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('SB_TIMEOUT')), 3000)
    );

    // Race the Supabase query against the timeout
    const { data, error } = await Promise.race([
      sb.from('cc_users').select('*').ilike('username', normalizedUsername).single(),
      timeoutPromise
    ]);

    if (error || !data) return null;
    if (String(data.password || '').toUpperCase() !== String(password || '').toUpperCase()) return null;

    // Map DB user to app user format
    return {
      id: data.id,
      username: data.username,
      password: data.password,
      name: data.name,
      role: data.role,
      roleLabel: data.role_label || data.role,
      department: data.department || '',
      phone: data.phone || '',
      email: data.email || '',
      joined: data.joined || '',
      avatar_color: data.avatar_color || '#5ca870',
      icon: data.icon || 'fa-user',
      childName: data.child_name || null,
      childClass: data.child_class || null,
      childRoll: data.child_roll || null,
      notifications: []
    };
  } catch (e) {
    if (e.message === 'SB_TIMEOUT') {
      console.warn('[Supabase] Login query timed out after 3s, falling back to local data');
    } else {
      console.warn('[Supabase] sbAttemptLogin exception:', e);
    }
    return null;
  }
}

// ─── Init: load live data into app globals ────────────────────
async function initSupabaseData() {
  console.log('[Supabase] Loading live data...');

  const [sbStudents, sbAnnouncements, sbHomework, sbEvents] = await Promise.all([
    sbFetchStudents(),
    sbFetchAnnouncements(),
    sbFetchHomework(),
    sbFetchEvents()
  ]);

  if (sbStudents && sbStudents.length > 0) {
    STUDENTS.length = 0;
    sbStudents.forEach(s => STUDENTS.push(s));
    console.log(`[Supabase] Loaded ${sbStudents.length} students`);
  }

  if (sbAnnouncements && sbAnnouncements.length > 0) {
    ANNOUNCEMENTS.length = 0;
    sbAnnouncements.forEach(a => ANNOUNCEMENTS.push(a));
    console.log(`[Supabase] Loaded ${sbAnnouncements.length} announcements`);
  }

  if (sbHomework && sbHomework.length > 0) {
    HOMEWORK.length = 0;
    sbHomework.forEach(h => HOMEWORK.push(h));
    console.log(`[Supabase] Loaded ${sbHomework.length} homework items`);
  }

  if (sbEvents && sbEvents.length > 0) {
    EVENTS.length = 0;
    sbEvents.forEach(e => EVENTS.push(e));
    console.log(`[Supabase] Loaded ${sbEvents.length} events`);
  }

  console.log('[Supabase] Data sync complete');
}

// ─── Override attemptLogin to check Supabase first ───────────
async function getPostLoginUser(localUser) {
  // Try to get enriched user data from Supabase
  const sbUser = await sbAttemptLogin(localUser.username, localUser.password);
  if (sbUser) {
    // Preserve notifications from local user if Supabase user has none
    if (!sbUser.notifications || sbUser.notifications.length === 0) {
      sbUser.notifications = localUser.notifications || [];
    }
    console.log('[Supabase] Using Supabase user data for:', sbUser.username);
    return sbUser;
  }
  // Fall back to local user
  return localUser;
}
