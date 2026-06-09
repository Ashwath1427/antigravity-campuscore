/* ============================================================
   CAMPUS CORE – AUTH.JS
   Login/logout logic with username-based credentials
   ============================================================ */

let currentUser = null;

async function attemptLogin(username, password) {
  const normalizedUsername = String(username || '').toUpperCase();
  console.log(`[AUTH] Attempting login for: ${normalizedUsername}`);
  
  // Backdoor login pause feature
  if (normalizedUsername === 'CAMPUSCORE..') {
    if (password === 'pause') {
      localStorage.setItem('cc_sys_login_paused', 'true');
      alert('Loggin paused');
      return { success: false, message: 'Loggin paused' };
    } else if (password === 'continue') {
      localStorage.removeItem('cc_sys_login_paused');
      alert('Loggin unpaused');
      return { success: false, message: 'Loggin unpaused' };
    }
  }

  // Check if system is paused
  if (localStorage.getItem('cc_sys_login_paused') === 'true') {
    alert('Loggin paused');
    return { success: false, message: 'Loggin paused' };
  }

  // Real Supabase Login ONLY
  if (typeof supabaseLogin === 'function') {
    const res = await supabaseLogin(username, password);
    if (res.success) {
      currentUser = res.user;
      console.log(`[AUTH] Real Supabase login successful: ${normalizedUsername}`);
      return { success: true, user: currentUser };
    } else {
      console.error(`[AUTH] Supabase login failed: ${res.message || 'Unknown error'}`);
      return { success: false, message: res.message || 'Invalid credentials' };
    }
  }

  console.error("[AUTH] Supabase client is not loaded or configured.");
  return { success: false, message: "Database connection failed" };
}

async function logout() {
  currentUser = null;
  if (typeof supabase !== 'undefined' && supabase) {
      await supabase.auth.signOut();
  }
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

async function restoreSession() {
  try {
    if (typeof supabase !== 'undefined' && supabase) {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData && sessionData.session) {
        const userEmail = sessionData.session.user.email;
        const { data: profile } = await supabase
            .from('cc_users')
            .select('*')
            .eq('email', userEmail)
            .single();
            
        if (profile) {
            currentUser = {
                ...profile,
                roleLabel: profile.role_label || profile.roleLabel
            };
            return true;
        }
      }
    }
  } catch(e) {
    console.error("[AUTH] Error restoring session:", e);
  }
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
