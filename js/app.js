/* ============================================================
   CAMPUS CORE – APP.JS
   Application boot, login form handler, dashboard init
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  setupSidebar();
  setupLoginForm();
  updateDateTime();
  setInterval(updateDateTime, 60000); // update time every minute

  // Restore session on refresh
  if (restoreSession() && currentUser) {
    initDashboard(currentUser);
    showPage('dashboard');
  } else {
    // Show landing page by default for unauthenticated users
    showPage('landing');
  }
});

// ─── Login Form ──────────────────────────────────────────────
function setupLoginForm() {
  const form     = document.getElementById('login-form');
  const pwInput  = document.getElementById('login-password');
  const toggleBtn = document.getElementById('toggle-pw');
  const pwIcon   = document.getElementById('pw-icon');

  // Show/hide password
  toggleBtn.addEventListener('click', () => {
    const isHidden = pwInput.type === 'password';
    pwInput.type = isHidden ? 'text' : 'password';
    pwIcon.className = isHidden ? 'fas fa-eye-slash' : 'fas fa-eye';
  });

  // Clear errors on input
  document.getElementById('login-username').addEventListener('input', () => {
    clearFieldError('fg-username', 'username-error');
    hideLoginMessage();
  });
  pwInput.addEventListener('input', () => {
    clearFieldError('fg-password', 'password-error');
    hideLoginMessage();
  });

  // Submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleLogin();
  });
}

// ─── Handle Login ────────────────────────────────────────────
async function handleLogin() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const btn      = document.getElementById('btn-login');

  // Clear previous errors
  clearFieldError('fg-username', 'username-error');
  clearFieldError('fg-password', 'password-error');
  hideLoginMessage();

  // Validation
  let valid = true;

  if (!username) {
    setFieldError('fg-username', 'username-error', 'Please enter your User ID');
    valid = false;
  }

  if (!password) {
    setFieldError('fg-password', 'password-error', 'Please enter your password');
    valid = false;
  } else if (password.length < 3) {
    setFieldError('fg-password', 'password-error', 'Password too short');
    valid = false;
  }

  if (!valid) return;

  // Loading state
  btn.classList.add('loading');
  btn.disabled = true;

  await delay(800);

  const result = attemptLogin(username, password);

  btn.classList.remove('loading');
  btn.disabled = false;

  if (result.success) {
    // Success flash
    btn.style.background = 'linear-gradient(135deg, #4caf50, #66bb6a)';
    btn.innerHTML = '<i class="fas fa-check"></i> <span class="btn-text">Redirecting...</span>';

    showLoginMessage(`Welcome, ${result.user.name}! Redirecting to ${result.user.roleLabel} dashboard...`, 'success');

    await delay(1000);

    const finalUser = typeof getPostLoginUser === 'function'
      ? await getPostLoginUser(result.user)
      : result.user;
    if (!finalUser) {
      btn.style.background = '';
      btn.innerHTML = '<span class="btn-text">Sign In</span><i class="fas fa-arrow-right btn-arrow"></i>';
      return;
    }
    currentUser = finalUser;
    try { sessionStorage.setItem('cc_user', JSON.stringify(finalUser)); } catch(e) {}
    initDashboard(finalUser);
    showPage('dashboard');

    // Reset button
    btn.style.background = '';
    btn.innerHTML = '<span class="btn-text">Sign In</span><i class="fas fa-arrow-right btn-arrow"></i>';
  } else {
    showLoginMessage('Invalid User ID or password. Please try again or use a demo credential.', 'error');
    // Shake the login box
    const box = document.querySelector('.login-box');
    box.style.animation = 'shake 0.5s';
    setTimeout(() => box.style.animation = '', 600);
  }
}

// ─── Init Dashboard ──────────────────────────────────────────
function initDashboard() {
  if(typeof loadTheme === 'function') loadTheme();
  if (typeof buildSidebar === 'function') buildSidebar();
  if (typeof addDatabaseManagementToMenu === 'function') addDatabaseManagementToMenu();
  if (typeof initDashboardContent === 'function') initDashboardContent();
  
  updateDateTime();
}

// ─── Utility ────────────────────────────────────────────────
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
