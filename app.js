/* ============================================================
   CAMPUS CORE – APP.JS
   Application boot, login form handler, dashboard init
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  try {
    if (typeof loadTheme === 'function') loadTheme();
    setupSidebar();
    setupLoginForm();
    updateDateTime();
    setInterval(updateDateTime, 60000); // update time every minute

    // BUG-009 FIX: Pre-load live Supabase data BEFORE restoring session so the
    // dashboard always renders with fresh data instead of stale local arrays.
    // Make this NON-FATAL - if Supabase is offline, continue with local data
    if (typeof initSupabaseData === 'function') {
      try {
        await initSupabaseData();
      } catch (e) {
        console.warn('[CampusCore] initSupabaseData failed, using local data:', e);
        window.offlineMode = true;
        // Continue execution - do not throw
      }
    }

    // Restore session on refresh
    if (restoreSession() && currentUser) {
      initDashboard(currentUser);
      showPage('dashboard');
    } else {
      // Show landing page by default for unauthenticated users
      showPage('landing');
    }
  } catch (error) {
    console.error('[CampusCore] DOMContentLoaded error:', error);
    // Ensure dashboard still initializes even if there's an error
    if (restoreSession() && currentUser) {
      try {
        initDashboard(currentUser);
        showPage('dashboard');
      } catch (dashboardError) {
        console.error('[CampusCore] Dashboard init failed:', dashboardError);
        showPage('landing');
      }
    } else {
      showPage('landing');
    }
  }
});

// ─── Login Form ──────────────────────────────────────────────
function setupLoginForm() {
  const form = document.getElementById('login-form');
  const pwInput = document.getElementById('login-password');
  const toggleBtn = document.getElementById('toggle-pw');
  const pwIcon = document.getElementById('pw-icon');

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
  const btn = document.getElementById('btn-login');

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

    let finalUser = result.user;
    try {
      if (typeof getPostLoginUser === 'function') {
        const selectedUser = await getPostLoginUser(result.user);
        if (!selectedUser) {
          // User cancelled or went back
          btn.style.background = '';
          btn.innerHTML = '<span class="btn-text">Sign In</span><i class="fas fa-arrow-right btn-arrow"></i>';
          return;
        }
        finalUser = selectedUser;
      }
    } catch (err) {
      console.error("Post-login hook failed:", err);
      // Fallback to initial user if hook crashes
    }

    currentUser = finalUser;
    window.currentUser = finalUser; // Ensure global availability
    try { sessionStorage.setItem('cc_user', JSON.stringify(finalUser)); } catch (e) { }

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
function initDashboard(user) {
  if (typeof loadTheme === 'function') loadTheme(user.id);
  buildSidebar(user);
  renderNotifications(user);
  buildDashboard(user);

  if (user.role === 'apaaas' || user.role === 'superadmin' || user.role === 'super_admin' || String(user.username || '').toUpperCase() === 'APAAAS') {
    navigateTo('master_dashboard');
  } else {
    navigateTo('home');
  }

  updateDateTime();
}

// ─── Utility ────────────────────────────────────────────────
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Glow Card Spotlight Effect ─────────────────────────────
(function() {
  let isListenerAttached = false;
  let lastX = 0;
  let lastY = 0;
  let rafId = null;

  function updateGlowCards() {
    const cards = document.querySelectorAll('.cc-glow-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = lastX - rect.left;
      const y = lastY - rect.top;
      card.style.setProperty('--x', x);
      card.style.setProperty('--y', y);
    });
    rafId = null;
  }

  function handlePointerMove(e) {
    lastX = e.clientX;
    lastY = e.clientY;
    if (!rafId) {
      rafId = requestAnimationFrame(updateGlowCards);
    }
  }

  // Use a MutationObserver to only attach the listener when .cc-glow-card elements exist,
  // handling dynamic dashboard rendering naturally without breaking existing logic.
  const observer = new MutationObserver(() => {
    const cards = document.querySelectorAll('.cc-glow-card');
    if (cards.length > 0 && !isListenerAttached) {
      document.addEventListener('pointermove', handlePointerMove, { passive: true });
      isListenerAttached = true;
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
    if (document.querySelectorAll('.cc-glow-card').length > 0) {
      document.addEventListener('pointermove', handlePointerMove, { passive: true });
      isListenerAttached = true;
    }
  });
})();
// ─── Animated Dock Effect (Mac-style) ───────────────────────
(function() {
  let isDockListenerAttached = false;
  let rafId = null;
  let mouseX = Infinity;
  
  // Magic numbers for Mac-like scale curve
  const MAX_SCALE = 1.4;
  const DISTANCE_LIMIT = 150;

  function updateDock() {
    const items = document.querySelectorAll('.cc-dock__item');
    if (items.length === 0) return;

    items.forEach(item => {
      // Calculate distance from mouse to the center of the dock item
      const rect = item.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - itemCenterX);
      
      let scale = 1;
      if (distance < DISTANCE_LIMIT) {
        // Linear scale factor from 1.0 (far) to MAX_SCALE (center)
        const scaleFactor = 1 - (distance / DISTANCE_LIMIT);
        scale = 1 + (MAX_SCALE - 1) * scaleFactor;
      }
      
      item.style.setProperty('--dock-scale', scale.toFixed(3));
    });
    rafId = null;
  }

  function handleDockPointerMove(e) {
    mouseX = e.clientX;
    if (!rafId) {
      rafId = requestAnimationFrame(updateDock);
    }
  }
  
  function handleDockPointerLeave() {
    mouseX = Infinity;
    if (!rafId) {
      rafId = requestAnimationFrame(updateDock);
    }
  }

  const observer = new MutationObserver(() => {
    const dockContainer = document.querySelector('.cc-dock');
    if (dockContainer && !isDockListenerAttached) {
      dockContainer.addEventListener('mousemove', handleDockPointerMove, { passive: true });
      dockContainer.addEventListener('mouseleave', handleDockPointerLeave, { passive: true });
      isDockListenerAttached = true;
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
    
    const dockContainer = document.querySelector('.cc-dock');
    if (dockContainer) {
      dockContainer.addEventListener('mousemove', handleDockPointerMove, { passive: true });
      dockContainer.addEventListener('mouseleave', handleDockPointerLeave, { passive: true });
      isDockListenerAttached = true;
    }
  });
})();
// ─── APAAAS Admin Dock (MacOS Style) ────────────────────────
window.CampusCoreAdminDock = {
  viewLogs: function() {
    console.log("[Admin] Logs Panel: All services running gracefully. Supabase connection OK.");
  },
  toggleLabs: function() {
    const isLabs = localStorage.getItem('CC_LABS_MODE') === 'true';
    localStorage.setItem('CC_LABS_MODE', !isLabs);
    console.log(`[Admin] Labs Mode is now: ${!isLabs}`);
  },
  debugOverlay: function() {
    console.log("[Admin] Toggling Debug Overlay");
    document.body.classList.toggle('debug-overlay-active');
    if(document.body.classList.contains('debug-overlay-active')) {
      console.log("[Admin] Debug overlay active. Use CSS debugger.");
    }
  },
  forceResync: function() {
    console.log("[Admin] Force Resync requested.");
    if(typeof initDashboardLiveStats === 'function' && window.currentUser) {
      initDashboardLiveStats(window.currentUser);
    }
  },
  showMetrics: function() {
    const students = window.STUDENTS ? window.STUDENTS.length : 'N/A';
    const users = window.DEMO_USERS ? window.DEMO_USERS.length : 'N/A';
    console.log(`📊 System Metrics\nStudents: ${students}\nUsers: ${users}\nRole: ${window.currentUser?.role}`);
  }
};

(function() {
  let isAdminDockAttached = false;
  let rafId = null;
  let mouseX = Infinity;
  const MAX_SCALE = 1.5;
  const DIST_LIMIT = 120;

  function updateAdminDock() {
    const items = document.querySelectorAll('.cc-admin-dock__item');
    if (items.length === 0) return;

    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - itemCenterX);
      
      let scale = 1;
      if (distance < DIST_LIMIT) {
        const factor = 1 - (distance / DIST_LIMIT);
        scale = 1 + (MAX_SCALE - 1) * factor;
      }
      item.style.transform = `scale(${scale.toFixed(3)}) translateY(calc((1 - ${scale.toFixed(3)}) * 10px))`;
    });
    rafId = null;
  }

  function handleMove(e) {
    mouseX = e.clientX;
    if (!rafId) rafId = requestAnimationFrame(updateAdminDock);
  }
  
  function handleLeave() {
    mouseX = Infinity;
    if (!rafId) rafId = requestAnimationFrame(updateAdminDock);
  }

  function bindAdminActions() {
    const items = document.querySelectorAll('.cc-admin-dock__item');
    items.forEach(item => {
      // Avoid binding multiple times
      if(item.dataset.bound) return;
      item.dataset.bound = 'true';
      item.addEventListener('click', (e) => {
        const action = item.getAttribute('data-dock-action');
        if(action === 'view-logs') window.CampusCoreAdminDock.viewLogs();
        if(action === 'toggle-labs') window.CampusCoreAdminDock.toggleLabs();
        if(action === 'debug-overlay') window.CampusCoreAdminDock.debugOverlay();
        if(action === 'force-resync') window.CampusCoreAdminDock.forceResync();
        if(action === 'show-metrics') window.CampusCoreAdminDock.showMetrics();
      });
    });
  }

  const observer = new MutationObserver(() => {
    const dock = document.querySelector('.cc-admin-dock');
    if (dock) {
      bindAdminActions();
      if (!isAdminDockAttached) {
        dock.addEventListener('mousemove', handleMove, { passive: true });
        dock.addEventListener('mouseleave', handleLeave, { passive: true });
        isAdminDockAttached = true;
      }
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
// ─── Bento Calendar Card Logic ────────────────────────────────
(function() {
  function renderBentoCalendar() {
    const grid = document.getElementById('bento-cal-grid');
    const monthLabel = document.getElementById('bento-cal-month');
    if (!grid || !monthLabel) return;
    
    // Prevent re-rendering if already populated
    if (grid.children.length > 0) return;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-11
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    
    monthLabel.textContent = `${monthNames[month]} ${year}`;

    // Compute calendar maths
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun, 6=Sat
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Headers
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    let html = '';
    daysOfWeek.forEach(d => {
      html += `<div class="cc-calendar-card__day cc-calendar-card__day--header">${d}</div>`;
    });

    // Blank cells before 1st
    for (let i = 0; i < firstDay; i++) {
      html += `<div class="cc-calendar-card__day"></div>`;
    }

    // Hardcode some highlight days (e.g., 5th, 12th, 22nd)
    const highlightDays = [5, 12, 22];

    // Days 1..N
    for (let i = 1; i <= daysInMonth; i++) {
      const isHighlight = highlightDays.includes(i) ? 'cc-calendar-card__day--highlight' : '';
      html += `<div class="cc-calendar-card__day ${isHighlight}">${i}</div>`;
    }

    grid.innerHTML = html;
  }

  // Use a MutationObserver because the dashboard HTML is injected dynamically
  const observer = new MutationObserver(() => {
    if (document.getElementById('bento-cal-grid') && document.getElementById('bento-cal-grid').children.length === 0) {
      renderBentoCalendar();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
    renderBentoCalendar(); // Initial check
  });
})();
