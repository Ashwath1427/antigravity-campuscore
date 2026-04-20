/* ============================================================
   CAMPUS CORE – UI.JS
   Landing page, page switching, sidebar, theme, notifications,
   search, navigation, and all helpers
   ============================================================ */

// ─── Page System ────────────────────────────────────────────
function showPage(name) {
  // Use instant scroll for page transitions to prevent 'scrolling' bug on Hero clicks
  const originalScroll = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = 'auto';

  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });

  if (name === 'landing') {
    document.getElementById('landing-page').style.display = 'block';
    document.getElementById('landing-page').classList.add('active');
  } else if (name === 'login') {
    document.getElementById('login-page').style.display = 'flex';
    document.getElementById('login-page').classList.add('active');
  } else if (name === 'dashboard') {
    document.getElementById('dashboard-page').style.display = 'block';
    document.getElementById('dashboard-page').classList.add('active');
  }

  window.scrollTo(0, 0);

  // Restore scroll behavior after transition
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = originalScroll;
  }, 100);

  // Close sidebar on mobile when switching pages
  if (window.innerWidth <= 1024) {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  }
}

// ─── Landing Page ───────────────────────────────────────────
function goLanding(e) { e && e.preventDefault(); showPage('landing'); }
function toggleMobileNav() {
  document.getElementById('land-nav-links').classList.toggle('open');
}
function closeMobileNav() {
  document.getElementById('land-nav-links').classList.remove('open');
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('land-nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});


// ─── Theme Toggle ───────────────────────────────────────────
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  const newDark = !isDark;
  html.setAttribute('data-theme', newDark ? 'dark' : 'light');
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = newDark ? '🌙' : '☀️';

  if (typeof currentUser !== 'undefined' && currentUser && currentUser.id) {
    if (typeof handleSettingToggle === 'function') {
      handleSettingToggle(currentUser.id, 'darkMode', newDark);
    }
  } else {
    try { localStorage.setItem('cc_theme', newDark ? 'dark' : 'light'); } catch (e) { }
  }
}
function loadTheme(userId = null) {
  try {
    let isDark = false, isCompact = false;
    if (userId) {
      const settingsStr = localStorage.getItem('campuscore_settings');
      if (settingsStr) {
        const settingsObj = JSON.parse(settingsStr);
        if (settingsObj[userId]) {
          isDark = !!settingsObj[userId].darkMode;
          isCompact = !!settingsObj[userId].compactMode;
        }
      }
    } else {
      const saved = localStorage.getItem('cc_theme');
      if (saved) {
        isDark = (saved === 'dark');
      } else {
        // DEFAULT: Force dark theme for landing page design consistency
        isDark = true;
      }
    }

    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (isCompact) {
      document.documentElement.setAttribute('data-compact', 'true');
    } else {
      document.documentElement.removeAttribute('data-compact');
    }

    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = isDark ? '🌙' : '☀️';
  } catch (e) { }
}

// ─── DateTime Banner ────────────────────────────────────────
function updateDateTime() {
  const el = document.getElementById('banner-datetime');
  if (!el) return;
  const now = new Date();
  const opts = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  el.innerHTML = `<i class="far fa-clock"></i> ${now.toLocaleDateString('en-IN', opts)}`;
}
function getFormattedDate() {
  const now = new Date();
  return now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

// ─── Sidebar Toggle ─────────────────────────────────────────
function setupSidebar() {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const closeBtn = document.getElementById('sidebar-close');
  function open() { sidebar.classList.add('open'); overlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
  function close() { sidebar.classList.remove('open'); overlay.classList.remove('active'); document.body.style.overflow = ''; }
  if (hamburger) hamburger.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (overlay) overlay.addEventListener('click', close);
}

// ─── Notifications ──────────────────────────────────────────
function toggleNotifications() { document.getElementById('notif-dropdown').classList.toggle('hidden'); }
function renderNotifications(user) {
  const list = document.getElementById('notif-list');
  const badge = document.getElementById('notif-badge');
  if (!user || !user.notifications || !user.notifications.length) {
    list.innerHTML = '<div class="notif-empty">No notifications</div>';
    badge.classList.add('hidden');
    return;
  }
  badge.textContent = user.notifications.length;
  badge.classList.remove('hidden');
  list.innerHTML = user.notifications.map(n => `
    <div class="notif-item">
      <div class="notif-icon" style="background:${n.color}20;color:${n.color}">${n.icon}</div>
      <div class="notif-body"><strong>${n.title}</strong><span>${n.text}</span></div>
      <div class="notif-time">${n.time}</div>
    </div>
  `).join('');
}
document.addEventListener('click', e => {
  const dd = document.getElementById('notif-dropdown');
  const btn = document.getElementById('notif-btn');
  if (dd && btn && !dd.contains(e.target) && !btn.contains(e.target)) dd.classList.add('hidden');
});

// ─── Search ─────────────────────────────────────────────────
function toggleSearch() {
  const ov = document.getElementById('search-overlay');
  ov.classList.toggle('hidden');
  if (!ov.classList.contains('hidden')) setTimeout(() => document.getElementById('global-search').focus(), 100);
}
function handleSearch(query) {
  const results = document.getElementById('search-results');
  if (!query || query.length < 2) { results.innerHTML = '<div class="search-empty">Type to start searching...</div>'; return; }
  const q = query.toLowerCase();
  let items = [];
  const role = (currentUser && currentUser.role) || '';
  const linkedSid = (typeof getStudentIdFromUser === 'function' && currentUser) ? getStudentIdFromUser(currentUser) : null;
  if (role === 'student' || role === 'parent') {
    if (linkedSid && typeof getStudentProfileData === 'function') {
      const p = getStudentProfileData(linkedSid);
      const shared = typeof getStudentSharedData === 'function' ? getStudentSharedData(linkedSid) : null;
      const ownItems = [
        { title: p.fullName, sub: `Class ${p.className || '9C'} · Roll #${p.rollNo || '-'}`, icon: '🎓', section: role === 'student' ? 'profile' : 'parent_child' },
        { title: 'Homework', sub: `${(shared && shared.homework || []).length} items`, icon: '📝', section: role === 'student' ? 'student_homework' : 'parent_homework' },
        { title: 'Results', sub: `Overall ${(shared && shared.results && shared.results.overall) || '-'}%`, icon: '📊', section: role === 'student' ? 'student_results' : 'parent_results' },
      ];
      ownItems.filter(x => x.title.toLowerCase().includes(q) || x.sub.toLowerCase().includes(q)).forEach(x => items.push(x));
    }
  } else {
    let scopedStudents = STUDENTS;
    if (role === 'teacher') {
      const teacher = TEACHERS.find(t => t.name === currentUser.name);
      const allowed = teacher ? teacher.classes.split(',').map(c => c.trim()) : [];
      scopedStudents = STUDENTS.filter(s => allowed.includes(s.class));
    } else if (role === 'coordinator') {
      scopedStudents = STUDENTS.filter(s => String(s.class).startsWith('9-'));
    }

    // Filter Students
    scopedStudents.filter(s => s.name.toLowerCase().includes(q) || s.class.toLowerCase().includes(q)).slice(0, 5)
      .forEach(s => items.push({ title: s.name, sub: `Class ${s.class} · Roll #${s.roll}`, icon: '🎓', section: role === 'teacher' ? 'teacher_classes' : 'students' }));

    // Filter Teachers (With Secrecy)
    const isAdmin = (user.role === 'apaaas' || user.role === 'super_admin' || String(user.username || '').toUpperCase() === 'APAAAS');
    TEACHERS.filter(t => {
      const matches = t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q);
      if (!matches) return false;
      const isTargetAdmin = (t.role === 'super_admin' || t.username === 'APAAAS' || t.name === 'Admin');
      return isAdmin || !isTargetAdmin;
    }).slice(0, 3).forEach(t => items.push({ title: t.name, sub: `${t.subject} · ${t.classes}`, icon: '👨‍🏫', section: 'teachers' }));
  }

  ANNOUNCEMENTS.filter(a => a.title.toLowerCase().includes(q)).slice(0, 3)
    .forEach(a => items.push({ title: a.title, sub: `${a.date} · ${a.author}`, icon: '📢', section: 'announcements' }));
  const sections = (role === 'student' || role === 'parent')
    ? ['Dashboard', 'Attendance', 'Homework', 'Results', 'Notices', 'Messages', 'Settings']
    : ['Dashboard', 'Students', 'Teachers', 'Attendance', 'Homework', 'Results', 'Fees', 'Events', 'Settings'];
  sections.filter(s => s.toLowerCase().includes(q)).forEach(s => items.push({ title: s, sub: 'Navigate to section', icon: '📌', section: s.toLowerCase() === 'dashboard' ? 'home' : s.toLowerCase() }));
  if (!items.length) { results.innerHTML = `<div class="search-empty">No results for "${query}"</div>`; return; }
  results.innerHTML = items.map(i => `
    <div class="search-result-item" onclick="navigateTo('${i.section}');toggleSearch()">
      <div class="search-result-icon">${i.icon}</div>
      <div><div class="search-result-title">${i.title}</div><div class="search-result-sub">${i.sub}</div></div>
    </div>
  `).join('');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') { const o = document.getElementById('search-overlay'); if (o && !o.classList.contains('hidden')) toggleSearch(); } });

// ─── Build Sidebar ──────────────────────────────────────────
function buildSidebar(user) {
  let displayName = user.name;
  if (user.role === 'parent' && typeof getParentChildContext === 'function') {
    const child = getParentChildContext(user);
    const words = String(child.name || '').trim().split(/\s+/).filter(Boolean);
    const meaningful = words.find(w => w.length > 1) || words[0] || '';
    displayName = `PARENT OF ${meaningful.toUpperCase()}`;
  }
  const initials = getInitials(displayName);
  document.getElementById('sidebar-avatar').textContent = initials;
  document.getElementById('sidebar-name').textContent = displayName;
  document.getElementById('sidebar-user-id').textContent = user.username;
  document.getElementById('sidebar-role').textContent = user.roleLabel;
  // Banner user
  document.getElementById('banner-avatar').textContent = initials;
  document.getElementById('banner-user-name').textContent = displayName;
  document.getElementById('banner-role-badge').textContent = user.roleLabel;
  // Nav
  const nav = document.getElementById('sidebar-nav');
  const roleKey = (user.role || '').toLowerCase().replace(' ', '_');
  let sections = ROLE_NAV[roleKey] || ROLE_NAV[user.role] || [];

  // SECRECY: Hide Admin (APAAAS) role from anyone not specifically logged in as admin
  const isAdmin = (user.role === 'apaaas' || user.role === 'super_admin' || String(user.username || '').toUpperCase() === 'APAAAS');
  if (!isAdmin) {
    sections = (sections || []).filter(s => {
      const label = (s.label || '').toUpperCase();
      return label !== 'ADMIN' && label !== 'SYSTEM_INTERNAL' && label !== 'MASTER';
    });
  }

  if (sections.length === 0) {
    console.warn(`No navigation configuration found for role: ${user.role}`);
    sections = [{ label: "HOME", items: [{ id: "home", icon: "fa-home", label: "Dashboard" }] }];
  }

  // FIX 9: Calculate Message Count Badge safely
  let msgCount = 0;
  try {
    if (user.role === 'parent') {
      const sid = String(user.childId || (user.username || '').replace(/^P/i, '').replace(/A$/i, ''));
      const shared = (typeof getStudentSharedData === 'function') ? getStudentSharedData(sid) : {};
      msgCount = (shared.messages || []).filter(m => m.unread).length;
    } else if (['teacher', 'coordinator', 'vice_principal', 'principal'].includes(user.role)) {
      const store = (typeof getEscalationStore === 'function') ? getEscalationStore() : { teacherInbox: [], coordinatorInbox: [], vpEscalated: [] };
      if (user.role === 'teacher') msgCount = store.teacherInbox.length;
      else if (user.role === 'coordinator') msgCount = store.coordinatorInbox.length;
      else if (user.role === 'vice_principal' || user.role === 'principal') msgCount = store.vpEscalated.length;
    }
  } catch (e) { console.warn("Failed to calculate message count", e); }
  nav.innerHTML = sections.map(section => `
    <div class="menu-section-label">${section.label}</div>
    ${section.items.map(item => {
    // Force English fallback if literal corrupted nav object text is found
    let fallbackLabel = item.label;
    if (fallbackLabel === 'డాష్బోర్డ్' || fallbackLabel === 'డాష్‌బోర్డ్') fallbackLabel = 'Dashboard';

    const lang = localStorage.getItem('cc_sys_lang') || 'English';
    const label = (lang === 'Telugu' && TRANSLATIONS[fallbackLabel]) ? TRANSLATIONS[fallbackLabel] : fallbackLabel;

    // Inject badge for messages if not already present
    let displayBadge = item.badge;
    if (item.id && item.id.includes('messages') && msgCount > 0) displayBadge = String(msgCount);

    return `
        <div class="menu-item">
          <button class="menu-link" id="nav-${item.id}" onclick="navigateTo('${item.id}')" data-en-label="${fallbackLabel}">
            <span class="menu-icon"><i class="fas ${item.icon}"></i></span>
            <span class="menu-text">${label}</span>
            ${displayBadge ? `<span class="menu-badge">${displayBadge}</span>` : ''}
          </button>
        </div>
      `;
  }).join('')}
  `).join('');


  // Apply Language Translation if needed
  setTimeout(() => {
    if (typeof applyLanguage === 'function') applyLanguage();
  }, 0);
}

// Default Language Setup hook
if (!localStorage.getItem('cc_sys_lang')) {
  localStorage.setItem('cc_sys_lang', 'English');
}
if (localStorage.getItem('cc_sys_lang') === 'Telugu') {
  setTimeout(() => { if (typeof applyLanguage === 'function') applyLanguage(); }, 50);
}

// ─── Navigation ─────────────────────────────────────────────
let currentSection = 'home';
function navigateTo(sectionId) {
  if (sectionId === 'logout') {
    if (typeof logout === 'function') logout();
    return;
  }

  console.log(`[CampusCore] Navigating to: ${sectionId}`);

  // Defensive: If the target section doesn't exist in DOM, we might need a re-render
  const targetSec = document.getElementById('section-' + sectionId);
  if (!targetSec && window.triggerLiveReRender) {
    console.warn(`[CampusCore] Section ${sectionId} not found, forcing re-render`);
    window.triggerLiveReRender();
  }

  document.querySelectorAll('.menu-link').forEach(el => el.classList.remove('active'));
  const activeNav = document.getElementById('nav-' + sectionId);
  if (activeNav) activeNav.classList.add('active');

  document.querySelectorAll('.dash-section').forEach(s => {
    s.classList.remove('active');
  });

  const sec = document.getElementById('section-' + sectionId);
  if (sec) {
    sec.classList.add('active');
    currentSection = sectionId;
    
    // Explicitly scroll the content area to the top
    const contentArea = document.getElementById('content-area');
    if (contentArea) contentArea.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Close mobile sidebar
  const sidebar = document.getElementById('sidebar');
  if (sidebar && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
    const overlay = document.getElementById('sidebar-overlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ─── Utility Helpers ─────────────────────────────────────────
function getInitials(name) { return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(); }
function getAvatarColor(i) { return ['#5ca870', '#1976d2', '#f57c00', '#8b5cf6', '#00bcd4', '#e53935', '#ff9800'][i % 7]; }
function behaviorBadge(b) {
  if (b === 'Excellent') return `<span class="badge badge-excellent">${b}</span>`;
  if (b === 'Good') return `<span class="badge badge-good">${b}</span>`;
  if (b === 'Distracting') return `<span class="badge badge-danger">${b}</span>`;
  return `<span class="badge badge-info">${b}</span>`;
}
function feeStatusBadge(s) {
  if (s === 'Paid') return `<span class="badge badge-paid">${s}</span>`;
  if (s === 'Pending') return `<span class="badge badge-pending">${s}</span>`;
  if (s === 'Overdue') return `<span class="badge badge-overdue">${s}</span>`;
  return `<span class="badge">${s}</span>`;
}
function attColor(p) { return p >= 90 ? '#5ca870' : p >= 75 ? '#f57c00' : '#d32f2f'; }
function pRow(l, v) { return `<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--color-border);font-size:14px"><span style="color:var(--color-text-muted);font-weight:500">${l}</span><span style="color:var(--color-text);font-weight:600;text-align:right">${v}</span></div>`; }

function gradeColor(g) {
  if (g === 'A+' || g === 'A') return '#5ca870';
  if (g === 'A-' || g === 'B+') return '#1976d2';
  if (g === 'B' || g === 'B-') return '#f57c00';
  return '#d32f2f';
}
const TRANSLATIONS = {
  'Dashboard': 'డాష్బోర్డ్',
  'Fees': 'ఫీజులు',
  'Notices': 'నోటీసులు',
  'Events': 'ఈవెంట్స్',
  'My Profile': 'నా ప్రొఫైల్',
  'Parent Dashboard': 'తల్లిదండ్రుల డాష్‌బోర్డ్',
  'Student Dashboard': 'విద్యార్థి డాష్‌బోర్డ్',
  'Manage Documents': 'పత్రాల నిర్వహణ',
  'Helpdesk Tickets': 'హెల్ప్‌డెస్క్ టిక్కెట్లు',
  'All Attendance': 'మొత్తం హాజరు',
  'All Results': 'అన్ని ఫలితాలు',
  'Staff Helpdesk': 'సిబ్బంది హెల్ప్‌డెస్క్',
  'Digital ID Card': 'డిజిటల్ ఐడి కార్డ్',
  'Student Almanac': 'విద్యార్థి పంచాంగం',
  'Request Center': 'విన్నపాల కేంద్రం',
  'Master Dashboard': 'మాస్టర్ డాష్‌బోర్డ్',
  'Role Views': 'పాత్రల వీక్షణలు',
  'System-wide Logs': 'సిస్టమ్ లాగ్‌లు',
  'All Issues': 'అన్ని సమస్యలు',
  'All Notices': 'అన్ని నోటీసులు',
  'All Approvals': 'అన్ని ఆమోదాలు',
  'System Audit': 'సిస్టమ్ ఆడిట్',
  'Removed Bin': 'తొలగించిన బిన్',
  'Activity & System': 'కార్యాచరణ & సిస్టమ్',
  'All Messages': 'అన్ని సందేశాలు',
  'Full Helpdesk': 'పూర్తి హెల్ప్‌డెస్క్',
  'Settings': 'సెట్టింగులు',
  'Main': 'ప్రధాన ఎంపికలు',
  'System-wide Issue Log': 'సిస్టమ్-వ్యాప్త సమస్యల లాగ్',
  'Support Network': 'సహాయక నెట్వర్క్',
  'Institutional Account Control': 'సంస్థాగత ఖాతా నియంత్రణ',
  'Analytical Reports Hub': 'విశ్లేషణాత్మక నివేదిక కేంద్రం',
  'Mid-Term Exam & Results Authority': 'మిడ్-టర్మ్ పరీక్ష & ఫలితాల అథారిటీ',
  'Class Performance Matrix': 'తరగతి పనితీరు మ్యాట్రిక్స్'
};

window.saveGenericLanguage = function (newLang) {
  if (!newLang) return;
  localStorage.setItem('cc_sys_lang', newLang);
  localStorage.setItem('campuscore_lang', newLang === 'Telugu' ? 'te' : newLang === 'Hindi' ? 'hi' : 'en');
  if (window.currentUser) {
    localStorage.setItem('campuscore_language_' + currentUser.id, newLang);
  }
  if (window.triggerLiveReRender) window.triggerLiveReRender();
  setTimeout(applyLanguage, 50);
  if (window.simulateAction) simulateAction(`Language changed to ${newLang}`);
};

function applyLanguage() {
  const lang = localStorage.getItem('cc_sys_lang') || 'English';
  const isTelugu = lang === 'Telugu';

  // 1. Sidebar Navigation
  document.querySelectorAll('.menu-link').forEach(link => {
    const textNode = link.querySelector('.menu-text');
    const enLabel = link.getAttribute('data-en-label');
    if (textNode && enLabel) {
      textNode.textContent = (isTelugu && TRANSLATIONS[enLabel]) ? TRANSLATIONS[enLabel] : enLabel;
    }
  });

  // 2. Section Headers
  document.querySelectorAll('.menu-section-label, h2, h3').forEach(el => {
    const txt = el.textContent.trim();
    if (isTelugu && TRANSLATIONS[txt]) {
      el.textContent = TRANSLATIONS[txt];
    }
  });

  // 3. Settings Buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const text = btn.innerText.toLowerCase();
    const isActive = (text.includes('english') && !isTelugu) || ((text.includes('telugu') || text.includes('తెలుగు')) && isTelugu);
    btn.style.background = isActive ? 'var(--color-success)' : 'var(--color-surface-2)';
    btn.style.color = isActive ? 'white' : 'var(--color-text)';
    btn.style.borderColor = isActive ? 'var(--color-success)' : 'var(--color-border)';
    btn.classList.toggle('active-lang', isActive);
  });

  // 4. Global Text Nodes (Aggressive replacement for deep components)
  if (isTelugu) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
      const txt = node.nodeValue.trim();
      if (TRANSLATIONS[txt]) {
        node.nodeValue = TRANSLATIONS[txt];
      }
    }
  }
}

// --- Language Observer ---
let langObserver = null;
function startLanguageObserver() {
  if (langObserver) langObserver.disconnect();
  langObserver = new MutationObserver((mutations) => {
    const lang = localStorage.getItem('cc_sys_lang');
    if (lang === 'Telugu' || lang === 'Hindi') {
      if (window._langTimeout) clearTimeout(window._langTimeout);
      window._langTimeout = setTimeout(() => {
        applyLanguage();
      }, 500);
    }
  });
  langObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
}

document.addEventListener('DOMContentLoaded', () => {
  applyLanguage();
  startLanguageObserver();
});

// Periodic fallback
setInterval(applyLanguage, 5000);

