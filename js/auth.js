let currentUser = null;

async function attemptLogin(username, password) {
  const db = window.supabaseClient;

  if (!db) {
    console.error('[AUTH] Supabase client not initialized');
    showLoginError('System error. Please refresh the page.');
    return { success: false };
  }

  try {
    // Step 1: Look up the email for this username from cc_users
    const { data: userRow, error: lookupError } = await db
      .from('cc_users')
      .select('email, role, full_name, school')
      .eq('username', username)
      .single();

    if (lookupError || !userRow) {
      showLoginError('Username not found.');
      return { success: false };
    }

    // Step 2: Sign in with real Supabase Auth using the email
    const { data: authData, error: authError } = await db.auth.signInWithPassword({
      email: userRow.email,
      password: password
    });

    if (authError || !authData.session) {
      showLoginError('Incorrect password.');
      return { success: false };
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
        return { success: true, user: window.currentUser };
    } else {
        routeToDashboard(userRow.role);
        return { success: true, user: window.currentUser };
    }

  } catch (err) {
    console.error('[AUTH] Login error:', err);
    showLoginError('Login failed. Please try again.');
    return { success: false };
  }
}

async function restoreSession() {
  const db = window.supabaseClient;
  if (!db) return null;

  const { data: sessionData, error } = await db.auth.getSession();
  if (error || !sessionData.session) {
    console.log('[AUTH] No active session found.');
    return null;
  }

  const user = sessionData.session.user;

  // Reload role from database
  const { data: userRow } = await db
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
  const db = window.supabaseClient;
  if (db) {
    await db.auth.signOut();
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
