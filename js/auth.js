/* ============================================================
   CAMPUS CORE – AUTH.JS
   Login/logout logic with username-based credentials
   ============================================================ */

let currentUser = null;

async function attemptLogin(username, password) {
  const normalizedUsername = String(username || '').toUpperCase();
  console.log(`[AUTH] Attempting login for: ${normalizedUsername}`);
  console.log(`[AUTH] DEMO_USERS available:`, DEMO_USERS ? DEMO_USERS.length : 'undefined');
  
  // 1. Try Supabase Login first
  if (typeof supabaseLogin === 'function') {
    const res = await supabaseLogin(username, password);
    if (res.success) {
      currentUser = res.user;
      try { sessionStorage.setItem('cc_user', JSON.stringify(currentUser)); } catch(e) {}
      console.log(`[AUTH] Supabase login successful: ${normalizedUsername}`);
      return { success: true, user: currentUser };
    }
    // If res.fallback is false, it means Supabase specifically rejected the credentials
    if (res.fallback === false) {
      console.error(`[AUTH] Supabase login failed: ${res.message}`);
      return { success: false };
    }
  }

  // 2. Fallback to local DEMO_USERS
  if (!DEMO_USERS || !Array.isArray(DEMO_USERS)) {
    console.error(`[AUTH] DEMO_USERS is not available or not an array`);
    return { success: false };
  }
  
  const user = DEMO_USERS.find(u => u.username.toUpperCase() === normalizedUsername);
  if (!user) {
    console.warn(`[AUTH] User not found in DEMO_USERS: ${normalizedUsername}`);
    console.log(`[AUTH] Available users:`, DEMO_USERS.map(u => u.username));
    return { success: false };
  }

  const accountKey = `campuscore_account_password_${normalizedUsername}`;
  const stored = localStorage.getItem(accountKey);
  const expected = user.password || stored || 'PARENT123';
  
  console.log(`[AUTH] Checking password for ${normalizedUsername}`);
  console.log(`[AUTH] Expected: ${expected}, Got: ${password}`);
  
  if (String(expected).toUpperCase() !== String(password).toUpperCase()) {
    console.error(`[AUTH] Password mismatch for ${normalizedUsername}`);
    return { success: false };
  }

  currentUser = user;
  try { sessionStorage.setItem('cc_user', JSON.stringify(user)); } catch(e) {}
  console.log(`[AUTH] Local login successful: ${normalizedUsername}`);
  return { success: true, user };
}

function logout() {
  currentUser = null;
  try { sessionStorage.removeItem('cc_user'); } catch(e) {}
  showPage('login');
  clearLoginForm();
}

function clearLoginForm() {
  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';
  hideLoginMessage();
  clearFieldError('fg-username', 'username-error');
  clearFieldError('fg-password', 'password-error');
}

function restoreSession() {
  try {
    const saved = sessionStorage.getItem('cc_user');
    if (saved) {
      currentUser = JSON.parse(saved);
      return true;
    }
  } catch(e) {}
  return false;
}

function showForgotMsg(e) {
  e.preventDefault();
  showLoginMessage('Password reset link sent! (Demo mode – no real email sent)', 'success');
  setTimeout(() => hideLoginMessage(), 4000);
}

function setFieldError(groupId, errorId, message) {
  const group = document.getElementById(groupId);
  const errEl = document.getElementById(errorId);
  if (group) group.classList.add('error');
  if (errEl) errEl.textContent = message;
}

function clearFieldError(groupId, errorId) {
  const group = document.getElementById(groupId);
  const errEl = document.getElementById(errorId);
  if (group) group.classList.remove('error');
  if (errEl) errEl.textContent = '';
}

function showLoginMessage(text, type) {
  const box = document.getElementById('login-message');
  const icon = document.getElementById('msg-icon');
  const msg = document.getElementById('msg-text');
  box.className = 'login-message ' + type;
  box.style.display = 'flex';
  icon.className = type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
  msg.textContent = text;
}

function hideLoginMessage() {
  document.getElementById('login-message').style.display = 'none';
}
