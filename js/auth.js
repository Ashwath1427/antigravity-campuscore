let currentUser = null;

async function attemptLogin(username, password) {
  const db = window.supabaseClient;

  try {
    if (db) {
      // Step 1: Attempt login using custom RPC against cc_users
      const { data: userRow, error: rpcError } = await db
        .rpc('verify_login', { p_username: username, p_password: password });

      if (!rpcError && userRow) {
        window.currentUser = {
          id: userRow.id,
          username: userRow.username,
          email: userRow.email || '',
          role: userRow.role,
          roleLabel: userRow.role_label || userRow.roleLabel || userRow.role,
          name: userRow.name,
          session: { fake: true, local: false }
        };
        localStorage.setItem('cc_current_user', JSON.stringify(window.currentUser));
        console.log('[AUTH] Real Supabase login successful via RPC:', window.currentUser);
        return { success: true, user: window.currentUser };
      }
    }
  } catch (err) {
    console.warn('[AUTH] Supabase login attempt failed or unavailable:', err);
  }

  // Step 4: Local fallback if Supabase fails (e.g. auth.users not synced)
  console.log('[AUTH] Attempting local fallback login...');
  try {
    if (typeof DEMO_USERS !== 'undefined') {
      const localUser = DEMO_USERS.find(u => 
        String(u.username).toUpperCase() === String(username).toUpperCase() && 
        u.password === password
      );
      
      if (localUser) {
        window.currentUser = {
          id: localUser.id || 'local-' + Date.now(),
          username: localUser.username,
          email: localUser.email || '',
          role: localUser.role,
          roleLabel: localUser.role_label || localUser.roleLabel || localUser.role,
          name: localUser.name,
          session: { fake: true, local: true }
        };
        localStorage.setItem('cc_current_user', JSON.stringify(window.currentUser));
        console.log('[AUTH] Local fallback login successful:', window.currentUser);
        return { success: true, user: window.currentUser };
      }
    }
  } catch (err) {
    console.error('[AUTH] Local fallback failed:', err);
  }

  console.warn('[AUTH] Login failed. Invalid User ID or password.');
  return { success: false };
}

async function restoreSession() {
  const localSession = localStorage.getItem('cc_current_user');
  if (localSession) {
    try {
      window.currentUser = JSON.parse(localSession);
      console.log('[AUTH] Session restored from local storage:', window.currentUser);
      return window.currentUser;
    } catch (e) {
      console.error('Failed to parse local session', e);
    }
  }

  const db = window.supabaseClient;
  if (!db) return null;

  const { data: sessionData, error } = await db.auth.getSession();
  if (error || !sessionData.session) {
    console.log('[AUTH] No active session found.');
    return null;
  }

  const user = sessionData.session.user;

  // Reload role from database, matching actual schema
  const { data: userRow, error: fetchError } = await db
    .from('cc_users')
    .select('role, role_label, name, username')
    .eq('email', user.email)
    .maybeSingle();

  if (fetchError) {
    console.error('[AUTH] Session restore fetch error:', fetchError);
  }

  if (!userRow) return null;

  window.currentUser = {
    id: user.id,
    email: user.email,
    role: userRow.role,
    roleLabel: userRow.role_label,
    name: userRow.name,
    username: userRow.username,
    session: sessionData.session
  };

  console.log('[AUTH] Session restored:', window.currentUser);
  return window.currentUser;
}

async function logout() {
  const db = window.supabaseClient;
  if (db) {
    await db.auth.signOut();
  }
  localStorage.removeItem('cc_current_user');
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

function clearFieldError(groupId, errorId) {
  const group = document.getElementById(groupId);
  const errorSpan = document.getElementById(errorId);
  if (group) group.classList.remove('error');
  if (errorSpan) errorSpan.textContent = '';
}

function setFieldError(groupId, errorId, message) {
  const group = document.getElementById(groupId);
  const errorSpan = document.getElementById(errorId);
  if (group) group.classList.add('error');
  if (errorSpan) errorSpan.textContent = message;
}
