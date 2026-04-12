/* ============================================================
   CAMPUS CORE – AUTH.JS
   Login/logout logic with username-based credentials
   ============================================================ */

let currentUser = null;

function attemptLogin(username, password) {
  const normalizedUsername = String(username || '').toUpperCase();
  console.log(`[AUTH] Attempting login for: ${normalizedUsername}`);
  
  const user = DEMO_USERS.find(u => u.username.toUpperCase() === normalizedUsername);
  if (!user) {
    console.warn(`[AUTH] User not found in DEMO_USERS: ${normalizedUsername}`);
    return { success: false };
  }

  const accountKey = `campuscore_account_password_${normalizedUsername}`;
  const stored = localStorage.getItem(accountKey);
  
  // CRITICAL FIX: Prioritize hardcoded DEMO_USERS password over stale localStorage for demo accounts
  const expected = user.password || stored || 'PARENT123';
  
  console.log(`[AUTH] Comparing passwords for ${normalizedUsername}. Expected: ${expected}, Got: ${password}`);

  if (String(expected).toUpperCase() !== String(password).toUpperCase()) {
    console.error(`[AUTH] Password mismatch for ${normalizedUsername}`);
    return { success: false };
  }

  currentUser = user;
  try { sessionStorage.setItem('cc_user', JSON.stringify(user)); } catch(e) {}
  console.log(`[AUTH] Login successful for: ${normalizedUsername} (Role: ${user.role})`);
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
