import os
import re

# TASK 1 & 6: SUPABASE CLIENT & DEBUG UTILITY
sb_client_code = """// js/supabase-client.js

const SUPABASE_URL = 'https://bzqqgurlqunpzgdavedz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_c4FB7TUyjfrO-_g4WwV0wQ_7ALx5e27';

const { createClient } = supabase; // from CDN script tag
window.supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('[Supabase] Client initialized:', !!window.supabaseClient);

window.checkSupabaseAuthStatus = async function() {
  const supabase = window.supabaseClient;
  console.log('====== SUPABASE AUTH DEBUG ======');
  console.log('Client initialized:', !!supabase);

  if (!supabase) {
    console.error('supabase client is undefined. Check script load order in index.html');
    return;
  }

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  console.log('Session:', sessionData, sessionError);

  const { data: userData, error: userError } = await supabase.auth.getUser();
  console.log('User:', userData, userError);

  console.log('window.currentUser:', window.currentUser);

  if (sessionData?.session) {
    const { data: testQuery, error: testError } = await supabase
      .from('cc_users')
      .select('username, role')
      .limit(3);
    console.log('Protected query result:', testQuery, testError);
  } else {
    console.warn('No session — cannot run protected queries');
  }
  console.log('=================================');
};

const supabase = window.supabaseClient;

async function initSupabaseData() {
    if (!supabase) return;
    try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData && sessionData.session) {
            const [studentsRes, homeworkRes] = await Promise.all([
                supabase.from('cc_students').select('*'),
                supabase.from('cc_homework').select('*')
            ]);
            if (studentsRes.data) {
                window.STUDENTS = studentsRes.data.map(s => ({
                    ...s,
                    admNo: s.adm_no || s.admNo,
                    parentName: s.parent || s.parent_name || s.parentName
                }));
            }
            if (homeworkRes.data) window.HOMEWORK = homeworkRes.data;
        }
        
        const [announcementsRes, eventsRes] = await Promise.all([
            supabase.from('cc_announcements').select('*'),
            supabase.from('cc_events').select('*')
        ]);
        if (announcementsRes.data) window.ANNOUNCEMENTS = announcementsRes.data;
        if (eventsRes.data) window.EVENTS = eventsRes.data;
        if (typeof triggerLiveReRender === 'function') triggerLiveReRender();
    } catch (e) {
        console.error(e);
    }
}
window.initSupabaseData = initSupabaseData;
"""

with open('js/supabase-client.js', 'w', encoding='utf-8') as f:
    f.write(sb_client_code)


# TASK 2: FIX index.html SCRIPT LOAD ORDER
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Strip existing script tags for these to avoid duplicates
html = re.sub(r'<script src="https://cdn\.jsdelivr\.net/npm/@supabase/supabase-js@2"></script>\s*', '', html)
html = re.sub(r'<script src="js/supabase-config\.js\?v=.*?"></script>\s*', '', html)
html = re.sub(r'<script src="js/supabase-client\.js\?v=.*?"></script>\s*', '', html)
html = re.sub(r'<script src="js/supabase-client\.js"></script>\s*', '', html)
html = re.sub(r'<script src="js/auth\.js\?v=.*?"></script>\s*', '', html)
html = re.sub(r'<script src="js/auth\.js"></script>\s*', '', html)

# Insert scripts correctly before other scripts
scripts_block = """  <!-- Step 1: Supabase CDN (must be first) -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

  <!-- Step 2: Initialize the client (must be before auth.js) -->
  <script src="js/supabase-client.js"></script>

  <!-- Step 3: Auth logic (uses window.supabaseClient) -->
  <script src="js/auth.js"></script>

  <!-- Step 4: Everything else -->
"""

# Put it before js/ui.js
html = re.sub(r'\s*<script src="js/ui\.js(\?v=[^"]*)?"></script>', '\n' + scripts_block + '  <script src="js/ui.js\\1"></script>', html, count=1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)


# TASK 3, 4, 5: REPLACE DEMO AUTH IN auth.js
auth_code = """let currentUser = null;

async function attemptLogin(username, password) {
  const supabase = window.supabaseClient;

  if (!supabase) {
    console.error('[AUTH] Supabase client not initialized');
    showLoginError('System error. Please refresh the page.');
    return;
  }

  try {
    // Step 1: Look up the email for this username from cc_users
    const { data: userRow, error: lookupError } = await supabase
      .from('cc_users')
      .select('email, role, full_name, school')
      .eq('username', username)
      .single();

    if (lookupError || !userRow) {
      showLoginError('Username not found.');
      return;
    }

    // Step 2: Sign in with real Supabase Auth using the email
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: userRow.email,
      password: password
    });

    if (authError || !authData.session) {
      showLoginError('Incorrect password.');
      return;
    }

    // Step 3: Set the current user from real DB data
    window.currentUser = {
      id: authData.user.id,
      username: username,
      email: userRow.email,
      role: userRow.role,
      full_name: userRow.full_name,
      school: userRow.school,
      session: authData.session
    };

    console.log('[AUTH] Real Supabase login successful:', window.currentUser);
    
    // Add missing routeToDashboard mock if not defined
    if (typeof routeToDashboard !== 'function') {
        const btn = document.getElementById('btn-login');
        if (btn) {
            btn.style.background = 'linear-gradient(135deg, #4caf50, #66bb6a)';
            btn.innerHTML = '<i class="fas fa-check"></i> <span class="btn-text">Redirecting...</span>';
        }
        showLoginMessage(`Welcome, ${window.currentUser.username}!`, 'success');
        setTimeout(() => {
            initDashboard(window.currentUser);
            showPage('dashboard');
        }, 1000);
    } else {
        routeToDashboard(userRow.role);
    }

  } catch (err) {
    console.error('[AUTH] Login error:', err);
    showLoginError('Login failed. Please try again.');
  }
}

async function restoreSession() {
  const supabase = window.supabaseClient;
  if (!supabase) return null;

  const { data: sessionData, error } = await supabase.auth.getSession();
  if (error || !sessionData.session) {
    console.log('[AUTH] No active session found.');
    return null;
  }

  const user = sessionData.session.user;

  // Reload role from database
  const { data: userRow } = await supabase
    .from('cc_users')
    .select('role, full_name, school, username')
    .eq('email', user.email)
    .single();

  if (!userRow) return null;

  window.currentUser = {
    id: user.id,
    email: user.email,
    role: userRow.role,
    full_name: userRow.full_name,
    school: userRow.school,
    username: userRow.username,
    session: sessionData.session
  };

  console.log('[AUTH] Session restored:', window.currentUser);
  return window.currentUser;
}

async function logout() {
  const supabase = window.supabaseClient;
  if (supabase) {
    await supabase.auth.signOut();
  }
  window.currentUser = null;
  window.location.href = 'index.html'; // or your login page
}

function showLoginError(text) {
  showLoginMessage(text, 'error');
  const box = document.querySelector('.login-box');
  if (box) {
    box.style.animation = 'shake 0.5s';
    setTimeout(() => box.style.animation = '', 600);
  }
}

function showLoginMessage(text, type) {
  const box = document.getElementById('login-message');
  const icon = document.getElementById('msg-icon');
  const msg = document.getElementById('msg-text');
  if (box && icon && msg) {
      box.className = 'login-message ' + type;
      box.style.display = 'flex';
      icon.className = type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
      msg.textContent = text;
  }
}

function hideLoginMessage() {
  const box = document.getElementById('login-message');
  if (box) box.style.display = 'none';
}

function clearLoginForm() {
  const uname = document.getElementById('login-username');
  const pass = document.getElementById('login-password');
  if (uname) uname.value = '';
  if (pass) pass.value = '';
  hideLoginMessage();
}
"""

with open('js/auth.js', 'w', encoding='utf-8') as f:
    f.write(auth_code)


# TASK 8: MAKE SURE app.js AWAITS SESSION BEFORE BOOT
with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

new_app_boot = """document.addEventListener('DOMContentLoaded', async () => {
  try {
    if (typeof loadTheme === 'function') loadTheme();
    setupSidebar();
    setupLoginForm();
    updateDateTime();
    setInterval(updateDateTime, 60000);

    const user = await restoreSession();
    if (!user) {
      // If no session, show login page
      if (typeof showPage === 'function') showPage('landing');
      return;
    }
    
    // Otherwise boot the dashboard for this role
    if (typeof initSupabaseData === 'function') {
      try {
        await initSupabaseData();
      } catch (e) {
        console.warn('[CampusCore] initSupabaseData failed, using local data:', e);
      }
    }
    if (typeof initDashboard === 'function') initDashboard(user);
    if (typeof showPage === 'function') showPage('dashboard');
  } catch (error) {
    console.error('[CampusCore] DOMContentLoaded error:', error);
    if (typeof showPage === 'function') showPage('landing');
  }
});"""

app_js = re.sub(r'document\.addEventListener\(\'DOMContentLoaded\', async \(\) => \{.*?(?=\n// ─── Login Form)', new_app_boot, app_js, flags=re.DOTALL)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app_js)

print("Applied UI and Auth JS updates")
