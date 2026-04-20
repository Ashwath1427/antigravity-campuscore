/* ============================================================
   CAMPUS CORE – DASHBOARD.JS
   Comprehensive role-based dashboard section builders
   ============================================================ */

/* ━━━━ DASHBOARD HELPERS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/**
 * Safely renders a component block. If it fails, returns a fallback to prevent blanking the dashboard.
 */
function safeRender(name, builderFunc, user) {
  try {
    if (typeof builderFunc !== 'function') {
      console.error(`Render error in ${name}: builderFunc is not a function`, builderFunc);
      throw new Error('builderFunc is not a function');
    }
    const html = builderFunc(user);
    if (!html) throw new Error('Render returned empty content');
    return html;
  } catch (e) {
    console.error(`[CampusCore] Render error in ${name}:`, e);
    return `<div class="dash-section" id="section-${name.toLowerCase().replace(/\s+/g, '_')}">
      <div class="card" style="border-left:4px solid var(--color-danger);padding:30px;text-align:center">
        <div style="font-size:40px;margin-bottom:15px;color:var(--color-danger)"><i class="fas fa-exclamation-triangle"></i></div>
        <h3 style="color:var(--color-danger);margin-bottom:10px">${name} Rendering Failed</h3>
        <p style="color:var(--color-text-muted);margin-bottom:20px">The system encountered an error while building this section.</p>
        <div style="display:flex;gap:10px;justify-content:center">
          <button class="btn-primary" onclick="location.reload()">Reload Page</button>
          <button style="padding:10px 20px;border-radius:10px;border:1px solid var(--color-border);background:none;color:var(--color-text);cursor:pointer" onclick="this.parentElement.parentElement.remove()">Dismiss</button>
        </div>
        <details style="margin-top:20px;text-align:left;font-size:11px;color:rgba(0,0,0,0.4)">
          <summary>Error Details</summary>
          <pre style="white-space:pre-wrap;margin-top:5px">${e.stack || e.message}</pre>
        </details>
      </div>
    </div>`;
  }
}

window.triggerLiveReRender = function () {
  if (window.currentUser) {
    buildDashboard(window.currentUser);
    // If global-fixes.js navigation hook is active, it handles section retention.
    // If not, we stay on 'home' or current.
  }
};

/**
 * Borrows logic from another role context without mutating the primary user object.
 */
function renderWithRoleContext(user, role, builderFunc) {
  const originalRole = user.role;
  try {
    user.role = role;
    return builderFunc(user);
  } finally {
    user.role = originalRole;
  }
}

function buildDashboard(user) {
  const c = document.getElementById('content-area');

  if (user.role === 'vice_principal') {
    c.innerHTML = [
      safeRender('Home', buildHome, user),
      safeRender('Profile', buildProfile, user),
      safeRender('Attendance', buildVPAttendance, user),
      safeRender('Performance', buildVPClassPerf, user),
      safeRender('Students', buildVPStudents, user),
      safeRender('Issues', buildVPStudentIssues, user),
      safeRender('Teachers', buildVPTeachers, user),
      safeRender('Schedule', buildVPSchedule, user),
      safeRender('Exams', buildVPExams, user),
      safeRender('Reports', buildVPReports, user),
      safeRender('Approvals', buildVPApprovals, user),
      safeRender('Upload Document', buildDocumentUploadSection, user),
      safeRender('Notices', buildAnnouncements, user),
      safeRender('Events', buildEvents, user),
      safeRender('Messages', buildVPMessages, user),
      safeRender('Helpdesk Tickets', buildStaffHelpdesk, user),
      safeRender('Settings', buildSettings, user)
    ].join('');
  } else if (user.role === 'parent') {
    c.innerHTML = safeRender('Parent Dashboard', window.buildParentDashboard || buildHome, user);
  } else if (user.role === 'coordinator') {
    c.innerHTML = [
      buildCoordHome(user), buildCoordClasses(user), buildCoordIssues(user),
      buildStaffApprovals(user), buildDocumentUploadSection(user),
      buildVPSchedule(user), buildAnnouncements(user), buildEvents(user),
      buildStaffHelpdesk(user), buildSettings(user)
    ].join('');
  } else if (user.role === 'teacher') {
    if (typeof window.buildTeacherDashboard === 'function') {
      const teacherHtml = window.buildTeacherDashboard(user);
      if (teacherHtml) {
        c.innerHTML = teacherHtml;
      } else {
        // Fallback if the function returned null or empty
        c.innerHTML = [
          buildTeacherHome(user), buildTeacherClasses(user), buildTeacherAttendance(user),
          buildTeacherHomework(user), buildTeacherSchedule(user), buildTeacherResults(user),
          buildTeacherStudentPerf(user), buildDocumentUploadSection(user),
          buildAnnouncements(user), buildEvents(user),
          buildTeacherMessages(user), buildStaffHelpdesk(user), buildSettings(user)
        ].join('');
      }
    } else {
      c.innerHTML = [
        buildTeacherHome(user), buildTeacherClasses(user), buildTeacherAttendance(user),
        buildTeacherHomework(user), buildTeacherSchedule(user), buildTeacherResults(user),
        buildTeacherStudentPerf(user), buildDocumentUploadSection(user),
        buildAnnouncements(user), buildEvents(user),
        buildTeacherMessages(user), buildStaffHelpdesk(user), buildSettings(user)
      ].join('');
    }
  } else if (user.role === 'student') {
    c.innerHTML = safeRender('Student Dashboard', window.buildStudentDashboard || buildHome, user);
  } else if (user.role === 'principal' || String(user.username || '').toUpperCase() === 'PRIN001') {
    // Hardened Principal Render Logic
    c.innerHTML = [
      renderWithRoleContext(user, 'vice_principal', (u) => safeRender('Home', buildHome, u)),
      safeRender('Profile', buildProfile, user),
      safeRender('Attendance', buildVPAttendance, user).replace('id="section-vp_attendance"', 'id="section-attendance_reports"'),
      safeRender('Exams', buildVPExams, user).replace('id="section-vp_exams"', 'id="section-exam_results"'),
      safeRender('Performance', buildVPClassPerf, user).replace('id="section-vp_class_perf"', 'id="section-class_performance"'),
      safeRender('Approvals', buildVPApprovals, user).replace('id="section-vp_approvals"', 'id="section-approvals"'),
      safeRender('Upload Document', buildDocumentUploadSection, user),
      safeRender('Notices', buildAnnouncements, user).replace('id="section-announcements"', 'id="section-notices"'),
      safeRender('Events', buildEvents, user),
      safeRender('Messages', buildVPMessages, user).replace('id="section-vp_messages"', 'id="section-messages"'),
      safeRender('Helpdesk Tickets', buildStaffHelpdesk, user),
      safeRender('Settings', buildSettings, user)
    ].join('');
  } else if (user.role === 'apaaas' || String(user.username || '').toUpperCase() === 'APAAAS' || user.role === 'superadmin' || user.role === 'super_admin') {
    // Hardened SuperAdmin Render Logic
    c.innerHTML = [
      safeRender('Master Dashboard', buildHome, user).replace(/id="section-[a-zA-Z0-9_-]+"/, 'id="section-master_dashboard"'),
      safeRender('Role Views', buildRoleViews, user).replace(/id="section-[a-zA-Z0-9_-]+"/, 'id="section-role_views"'),
      safeRender('All Issues', buildAllIssuesSuperAdmin, user).replace(/id="section-[a-zA-Z0-9_-]+"/, 'id="section-all_issues"'),
      safeRender('All Accounts', buildAllAccounts, user).replace(/id="section-[a-zA-Z0-9_-]+"/, 'id="section-all_accounts"'),
      safeRender('Removed Bin', buildRemovedBin, user).replace(/id="section-[a-zA-Z0-9_-]+"/, 'id="section-removed_bin"'),
      safeRender('All Attendance', buildVPAttendance, user).replace(/id="section-[a-zA-Z0-9_-]+"/, 'id="section-all_attendance"'),
      safeRender('All Results', buildVPClassPerf, user).replace(/id="section-[a-zA-Z0-9_-]+"/, 'id="section-all_results"'),
      safeRender('All Approvals', buildVPApprovals, user).replace(/id="section-[a-zA-Z0-9_-]+"/, 'id="section-all_approvals"'),
      safeRender('Manage Documents', buildManageDocuments, user).replace(/id="section-[a-zA-Z0-9_-]+"/, 'id="section-manage_documents"'),
      safeRender('All Messages', buildVPMessages, user).replace(/id="section-[a-zA-Z0-9_-]+"/, 'id="section-all_messages"'),
      safeRender('Full Helpdesk', buildStaffHelpdesk, user).replace(/id="section-[a-zA-Z0-9_-]+"/, 'id="section-full_helpdesk"'),
      safeRender('Settings', buildSettings, user)
    ].join('');
  } else {

    c.innerHTML = [
      safeRender('Home', buildHome, user),
      safeRender('Profile', buildProfile, user),
      safeRender('Students', buildStudents, user),
      safeRender('Teachers', buildTeachers, user),
      safeRender('Schedule', buildSchedule, user),
      safeRender('Attendance', buildAttendance, user),
      safeRender('Homework', buildHomework, user),
      safeRender('Results', buildResults, user),
      safeRender('Fees', buildFees, user),
      safeRender('Announcements', buildAnnouncements, user),
      safeRender('Events', buildEvents, user),
      safeRender('Settings', buildSettings, user),
    ].join('');
  }
}

function renderWithRoleContext(user, targetRole, renderFn) {
  const originalRole = user.role;
  user.role = targetRole;
  try {
    return renderFn(user);
  } finally {
    user.role = originalRole;
  }
}


function resetSystemLanguage() {
  localStorage.setItem('cc_sys_lang', 'English');
  triggerLiveReRender();
  if (typeof applyLanguage === 'function') setTimeout(applyLanguage, 50);
  simulateAction('Language reset to English');
}

/* ━━━━ HOME ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildHome(user) {
  const cfg = ROLE_HOME[user.role] || ROLE_HOME[user.role.toLowerCase().replace(' ', '_')] || {
    greeting: `Welcome, ${user.name}!`,
    subtitle: "Dashboard summary",
    stats: []
  };

  const greeting = getGreeting();
  const dateStr = getFormattedDate();
  const firstName = user.name.split(' ')[0];

  let calculatedStats = cfg.stats || [];

  // STATS POPULATION LOGIC
  // For VP/Admin, we use specific counts. For others, use defaults.
  if (user.role === 'vice_principal') {
    calculatedStats = [
      { label: "Active Escalations", value: "...", icon: "🚨", id: "stat-escalations" },
      { label: "Total Open Issues", value: "...", icon: "📋", id: "stat-open-issues" },
      { label: "Low Att. Alerts", value: "...", icon: "⚠️", id: "stat-low-att" },
      { label: "Pending Approvals", value: "...", icon: "⏱️", id: "stat-approvals" }
    ];
  } else if (user.role === 'teacher') {
    calculatedStats = [
      { label: "Total Students", value: "...", icon: "🎓", id: "stat-total-students" },
      { label: "Assigned Classes", value: "...", icon: "🏫", id: "stat-total-classes" },
      { label: "Avg Attendance", value: "...", icon: "📈", id: "stat-avg-att-teacher" },
      { label: "Pending Marking", value: "...", icon: "⏱️", id: "stat-pending-marking" }
    ];
  } else {
    // Default stats with skeleton support
    calculatedStats = (cfg.stats || []).map((s, idx) => ({ ...s, id: `stat-generic-${idx}` }));
  }

  // Welcome Banner

  const welcome = `
    <div class="welcome-banner">
      <div class="welcome-greeting">${greeting}, ${firstName}! 👋</div>
      <div class="welcome-sub">${user.roleLabel} Dashboard · Here's a quick view of what's happening across your campus today.</div>
      <div class="welcome-date"><i class="far fa-calendar-alt"></i> ${dateStr}</div>
      <div class="welcome-school">🏫 Delhi Public School, Nadergul</div>
    </div>`;

  // KPI Stats
  const stats = calculatedStats.map(s => `
    <div class="stat-card">
      <div class="stat-card-icon">${s.icon}</div>
      <div class="stat-value ${s.value === '...' ? 'skeleton' : ''}" id="${s.id || ''}">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>`).join('');

  // Quick Actions (role-specific)
  const qaMap = {
    vice_principal: [
      { icon: 'fa-clipboard-check', label: 'Review Attendance', color: '#5ca870', target: 'vp_attendance' },
      { icon: 'fa-bullhorn', label: 'Publish Notice', color: '#f57c00', target: 'announcements' },
      { icon: 'fa-check-circle', label: 'Check Approvals', color: '#1976d2', target: 'vp_approvals' },
      { icon: 'fa-exclamation-triangle', label: 'Low-Perf Classes', color: '#d32f2f', target: 'vp_class_perf' },
      { icon: 'fa-chalkboard-teacher', label: 'Teacher Status', color: '#00bcd4', target: 'vp_teachers' },
      { icon: 'fa-file-signature', label: 'Exam Readiness', color: '#8b5cf6', target: 'vp_exams' },
      { icon: 'fa-level-up-alt', label: 'Promote Students', color: '#e91e63', target: '_promote' },
    ],
    teacher: [
      { icon: 'fa-clipboard-check', label: 'Mark Attendance', color: '#5ca870', target: 'teacher_attendance' },
      { icon: 'fa-book', label: 'Assign Homework', color: '#1976d2', target: 'teacher_homework' },
      { icon: 'fa-pen', label: 'Upload Marks', color: '#f57c00', target: 'teacher_results' },
      { icon: 'fa-calendar-alt', label: 'Open Timetable', color: '#8b5cf6', target: 'teacher_schedule' },
    ],
    parent: [
      { icon: 'fa-clipboard-check', label: 'View Attendance', color: '#5ca870', target: 'parent_attendance' },
      { icon: 'fa-chart-bar', label: 'View Results', color: '#1976d2', target: 'parent_results' },
      { icon: 'fa-book-open', label: 'Check Homework', color: '#8b5cf6', target: 'parent_homework' },
      { icon: 'fa-rupee-sign', label: 'View Fees', color: '#f57c00', target: 'parent_fees' },
      { icon: 'fa-bullhorn', label: 'Open Notices', color: '#00bcd4', target: 'announcements' },
    ],
    coordinator: [
      { icon: 'fa-calendar-alt', label: 'Edit Timetable', color: '#5ca870', target: 'vp_schedule' },
      { icon: 'fa-bullhorn', label: 'Post Notice', color: '#1976d2', target: 'announcements' },
      { icon: 'fa-exclamation-circle', label: 'Issue Inbox', color: '#f57c00', target: 'coord_issues' },
      { icon: 'fa-sitemap', label: 'Class Overview', color: '#8b5cf6', target: 'coord_classes' },
    ],
    class_teacher: [
      { icon: 'fa-clipboard-check', label: 'Mark Attendance', color: '#5ca870', target: 'teacher_attendance' },
      { icon: 'fa-chart-bar', label: 'Marks & Results', color: '#1976d2', target: 'teacher_results' },
      { icon: 'fa-book', label: 'Assign Homework', color: '#f57c00', target: 'teacher_homework' },
      { icon: 'fa-users', label: 'Class Students', color: '#8b5cf6', target: 'teacher_classes' },
    ],
    principal: [
      { icon: 'fa-check-circle', label: 'Policy Approvals', color: '#d32f2f', target: 'vp_approvals' },
      { icon: 'fa-chart-pie', label: 'Institutional Perf.', color: '#1976d2', target: 'vp_class_perf' },
      { icon: 'fa-user-shield', label: 'System Logs', color: '#8b5cf6', target: 'all_issues' },
      { icon: 'fa-clipboard-check', label: 'Global Attendance', color: '#5ca870', target: 'vp_attendance' },
      { icon: 'fa-bullhorn', label: 'Global Notice', color: '#f57c00', target: 'announcements' }
    ],
    apaaas: [
      { icon: 'fa-sitemap', label: 'Master Dash', color: '#1976d2', target: 'master_dashboard' },
      { icon: 'fa-user-lock', label: 'Role Master', color: '#d32f2f', target: 'role_views' },
      { icon: 'fa-users-cog', label: 'Manage Accounts', color: '#8b5cf6', target: 'all_accounts' },
      { icon: 'fa-shield-alt', label: 'Audit Logs', color: '#5ca870', target: 'all_issues' },
      { icon: 'fa-folder-open', label: 'Master Files', color: '#f57c00', target: 'manage_documents' },
    ],
    super_admin: [
      { icon: 'fa-sitemap', label: 'Master Dash', color: '#1976d2', target: 'master_dashboard' },
      { icon: 'fa-user-lock', label: 'Role Master', color: '#d32f2f', target: 'role_views' },
      { icon: 'fa-users-cog', label: 'Manage Accounts', color: '#8b5cf6', target: 'all_accounts' },
      { icon: 'fa-shield-alt', label: 'Audit Logs', color: '#5ca870', target: 'all_issues' },
      { icon: 'fa-folder-open', label: 'Master Files', color: '#f57c00', target: 'manage_documents' },
    ]
  };
  const quickActions = (qaMap[user.role] || []).map(qa => {
    let target = qa.target || (qa.label.toLowerCase().includes('attend') ? 'attendance' : qa.label.toLowerCase().includes('student') ? 'students' : qa.label.toLowerCase().includes('homework') || qa.label.toLowerCase().includes('assign') ? 'homework' : qa.label.toLowerCase().includes('result') || qa.label.toLowerCase().includes('mark') || qa.label.toLowerCase().includes('report') ? 'results' : qa.label.toLowerCase().includes('fee') || qa.label.toLowerCase().includes('pay') ? 'fees' : qa.label.toLowerCase().includes('notice') ? 'announcements' : qa.label.toLowerCase().includes('timetable') ? 'schedule' : 'home');
    if (target === '_promote') return `<button class="quick-action-btn" onclick="promoteStudents()">
      <div class="qa-icon" style="background:${qa.color}"><i class="fas ${qa.icon}"></i></div>
      <span class="qa-label">${qa.label}</span>
    </button>`;
    return `<button class="quick-action-btn" onclick="navigateTo('${target}')">
      <div class="qa-icon" style="background:${qa.color}"><i class="fas ${qa.icon}"></i></div>
      <span class="qa-label">${qa.label}</span>
    </button>`;
  }).join('');

  // Notices
  const notices = `<ul class="activity-list" id="home-notices-list">
    <li class="skeleton" style="height:40px;width:100%;margin:5px 0"></li>
    <li class="skeleton" style="height:40px;width:100%;margin:5px 0"></li>
    <li class="skeleton" style="height:40px;width:100%;margin:5px 0"></li>
  </ul>`;

  // Trigger async population
  setTimeout(() => initDashboardLiveStats(user), 50);

  // Schedule Preview
  const schedulePreview = SCHEDULE.filter(s => !s.subject.includes('Break')).slice(0, 5).map(s => `
    <div class="schedule-item">
      <div class="schedule-time">${s.time.split('–')[0].trim()}</div>
      <div class="schedule-bar" style="background:${s.color}"></div>
      <div class="schedule-info"><div class="schedule-subject">${s.subject}</div><div class="schedule-meta">${s.class} · ${s.teacher}</div></div>
      <div class="schedule-room">${s.room}</div>
    </div>`).join('');

  // Activity
  const activity = RECENT_ACTIVITY.slice(0, 6).map(a => `
    <li class="activity-item">
      <div class="activity-dot" style="background:${a.color}"></div>
      <div class="activity-text">${a.icon} ${a.text}</div>
      <div class="activity-time">${a.time}</div>
    </li>`).join('');

  // Attendance mini
  const att = ATTENDANCE_SUMMARY;
  const attPct = Math.round((att.present_today / att.total_students) * 100);

  // Events preview
  const eventsPreview = EVENTS.slice(0, 3).map(ev => `
    <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--color-border);align-items:center">
      <div style="width:8px;height:8px;border-radius:50%;background:${ev.color};flex-shrink:0"></div>
      <div style="flex:1"><strong style="font-size:13px;color:var(--color-text)">${ev.title}</strong>
      <div style="font-size:11px;color:var(--color-text-muted)">${ev.date}</div></div>
    </div>`).join('');

  // Pending items
  const pendingItems = [
    { icon: '⚠️', count: '5', label: 'Pending Issues', color: '#f57c00' },
    { icon: '📝', count: '3', label: 'Ungraded Work', color: '#1976d2' },
    { icon: '💰', count: '₹10K', label: 'Pending Fees', color: '#d32f2f' },
    { icon: '📋', count: '2', label: 'Unmarked Days', color: '#8b5cf6' },
  ];
  const pending = pendingItems.map(p => `
    <div class="pending-item">
      <div class="pending-icon" style="background:${p.color}12;color:${p.color}">${p.icon}</div>
      <div class="pending-info"><div class="pending-count">${p.count}</div><div class="pending-label">${p.label}</div></div>
    </div>`).join('');

  return `
  <div class="dash-section active" id="section-home">
    ${welcome}
    <div class="stats-grid">${stats}</div>

    <div class="card"><h3>⚡ Quick Actions</h3><div class="quick-actions">${quickActions}</div></div>

    <div class="content-grid">
      <div class="card"><h3>📢 Latest Announcements</h3><ul class="activity-list">${notices}</ul>
        <div style="text-align:center;margin-top:12px"><button class="btn-primary" onclick="navigateTo('announcements')">View All Notices</button></div>
      </div>
      <div class="card"><h3>📅 Today's Schedule</h3>${schedulePreview}
        <div style="text-align:center;margin-top:12px"><button class="btn-primary" onclick="navigateTo((currentUser && (currentUser.role === 'vice_principal' || currentUser.role === 'principal')) ? 'vp_schedule' : 'schedule')">Full Timetable</button></div>
      </div>
    </div>

    <div class="content-grid-equal">
      <div class="card">
        <h3>📊 Attendance Summary</h3>
        <div class="attendance-grid" style="margin-bottom:16px">
          <div class="attendance-stat present"><div class="attendance-stat-number">${att.present_today}</div><div class="attendance-stat-label">Present</div></div>
          <div class="attendance-stat absent"><div class="attendance-stat-number">${att.absent_today}</div><div class="attendance-stat-label">Absent</div></div>
          <div class="attendance-stat late"><div class="attendance-stat-number">${att.late_today}</div><div class="attendance-stat-label">Late</div></div>
        </div>
        <div style="text-align:center;font-size:14px;color:var(--color-text-muted)">Overall: <strong style="color:var(--color-primary);font-size:20px">${attPct}%</strong></div>
      </div>
      <div class="card"><h3>📋 Recent Activity</h3><ul class="activity-list">${activity}</ul></div>
    </div>

    <div class="content-grid-equal">
      <div class="card"><h3>📆 Upcoming Events</h3>${eventsPreview}
        <div style="text-align:center;margin-top:12px"><button class="btn-primary" onclick="navigateTo('events')">View All Events</button></div>
      </div>
      <div class="card"><h3>🔔 Pending Items</h3><div class="pending-grid">${pending}</div></div>
    </div>

    <div class="dash-footer">CampusCore v2.0 · DPS Nadergul · Last synced: Just now</div>
  </div>`;
}

/* ━━━━ PROFILE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildProfile(user) {
  const initials = getInitials(user.name);
  return `<div class="dash-section" id="section-profile">
    <div class="profile-header">
      <div class="profile-big-avatar">${initials}</div>
      <div class="profile-info"><h2>${user.name}</h2><p>${user.email}</p><p>${user.department}</p><div class="profile-role-chip">${user.roleLabel}</div></div>
    </div>
    <div class="profile-grid">
      <div class="card"><h3>👤 Personal Info</h3>${pRow('Full Name', user.name)}${pRow('User ID', user.username)}${pRow('Email', user.email)}${pRow('Phone', user.phone)}${pRow('Joined', user.joined)}</div>
      <div class="card"><h3>🏫 School Info</h3>${pRow('Role', user.roleLabel)}${pRow('Department', user.department)}${pRow('Employee ID', 'DPS-' + String(user.id).padStart(4, '0'))}${pRow('Status', '<span style="color:#5ca870;font-weight:700">● Active</span>')}</div>
      <div class="card"><h3>🔒 Account Security</h3>${pRow('Password', '••••••••')}${pRow('2-Factor Auth', '<span style="color:var(--color-text-muted)">Not enabled</span>')}${pRow('Last Login', 'Just now')}${pRow('Session', '<span style="color:#5ca870;font-weight:700">Active</span>')}</div>
    </div>
  </div>`;
}


/* ━━━━ STUDENTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildStudents(user) {
  const rows = STUDENTS.map((s, i) => `<tr>
    <td><div class="user-row"><div class="avatar" style="background:${getAvatarColor(i)}">${getInitials(s.name)}</div><div class="user-row-info"><strong>${s.name}</strong><span>Adm: ${s.admNo}</span></div></div></td>
    <td>${s.class}</td><td>${s.roll}</td><td>${s.gender}</td>
    <td><div style="display:flex;align-items:center;gap:8px"><div class="progress-bar" style="flex:1;min-width:60px"><div class="progress-fill" style="width:${s.attendance}%;background:${attColor(s.attendance)}"></div></div><strong style="color:${attColor(s.attendance)};font-size:12px">${s.attendance}%</strong></div></td>
    <td>${behaviorBadge(s.behavior)}</td><td>${feeStatusBadge(s.fee_status)}</td>
    <td><strong style="color:var(--color-primary)">${s.gpa}</strong>/10</td></tr>`).join('');
  return `<div class="dash-section" id="section-students"><div class="card"><h3>🎓 Student Directory</h3>
    <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap;align-items:center">
      <div style="position:relative;flex:1;min-width:200px"><i class="fas fa-search" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--color-text-muted)"></i>
      <input type="text" placeholder="Search students..." id="student-search" style="width:100%;padding:11px 14px 11px 40px;border:2px solid var(--color-border);border-radius:10px;background:var(--color-surface);color:var(--color-text);font-size:14px;outline:none;font-family:Inter,sans-serif" oninput="filterStudents(this.value)"></div>
      <button class="btn-primary" onclick="simulateAction('Add Student form opened. Fill in admission details.')"><i class="fas fa-plus"></i> Add Student</button>
    </div>
    <div style="overflow-x:auto;border-radius:14px"><table class="data-table" id="students-table"><thead><tr><th>Student</th><th>Class</th><th>Roll</th><th>Gender</th><th>Attendance</th><th>Behavior</th><th>Fee</th><th>GPA</th></tr></thead><tbody id="students-tbody">${rows}</tbody></table></div></div></div>`;
}
function filterStudents(q) { const t = document.getElementById('students-tbody'); if (!t) return; const s = q.toLowerCase(); t.querySelectorAll('tr').forEach(r => { r.style.display = r.textContent.toLowerCase().includes(s) ? '' : 'none'; }); }

/* ━━━━ TEACHERS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildTeachers(user) {
  const rows = TEACHERS.map((t, i) => `<tr><td><div class="user-row"><div class="avatar" style="background:${getAvatarColor(i + 3)}">${getInitials(t.name)}</div><div class="user-row-info"><strong>${t.name}</strong><span>${t.id}</span></div></div></td><td>${t.subject}</td><td>${t.classes}</td><td>${t.exp}</td><td>${t.phone}</td><td><span class="badge ${t.status === 'Active' ? 'badge-active' : 'badge-warning'}">${t.status}</span></td></tr>`).join('');
  return `<div class="dash-section" id="section-teachers"><div class="card"><h3>👨‍🏫 Teaching Staff</h3><p style="color:var(--color-text-muted);margin-bottom:16px">${TEACHERS.length} teachers · ${TEACHERS.filter(t => t.status === 'Active').length} active</p><div style="overflow-x:auto;border-radius:14px"><table class="data-table"><thead><tr><th>Teacher</th><th>Subject</th><th>Classes</th><th>Experience</th><th>Phone</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div></div></div>`;
}

/* ━━━━ SCHEDULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildSchedule(user) {
  const rows = SCHEDULE.map(s => `<div class="schedule-item"><div class="schedule-time">${s.time}</div><div class="schedule-bar" style="background:${s.color}"></div><div class="schedule-info"><div class="schedule-subject">${s.subject}</div><div class="schedule-meta">${s.class} · ${s.teacher}</div></div><div class="schedule-room">${s.room}</div></div>`).join('');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const btns = days.map((d, i) => `<button onclick="setActiveDay(this)" style="padding:8px 16px;border:2px solid ${i === 0 ? 'var(--color-primary)' : 'var(--color-border)'};border-radius:10px;background:${i === 0 ? 'var(--color-primary)' : 'var(--color-surface)'};color:${i === 0 ? 'white' : 'var(--color-text-light)'};font-size:13px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;transition:all 0.2s">${d}</button>`).join('');
  return `<div class="dash-section" id="section-schedule"><div class="card"><h3>📅 Class Timetable</h3><div style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap">${btns}</div><p style="color:var(--color-text-muted);font-size:13px;margin-bottom:16px">${getFormattedDate()} · ${SCHEDULE.length} periods</p>${rows}</div></div>`;
}
function setActiveDay(b) { b.parentElement.querySelectorAll('button').forEach(x => { x.style.background = 'var(--color-surface)'; x.style.color = 'var(--color-text-light)'; x.style.borderColor = 'var(--color-border)'; }); b.style.background = 'var(--color-primary)'; b.style.color = 'white'; b.style.borderColor = 'var(--color-primary)'; }

/* ━━━━ ATTENDANCE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildAttendance(user) {
  const a = ATTENDANCE_SUMMARY;
  const f_class = localStorage.getItem('admin_att_f_class') || 'All';
  const f_sect = localStorage.getItem('admin_att_f_sect') || 'All';

  const classData = [['Class 10-A', 95, '#5ca870'], ['Class 9-B', 88, '#1976d2'], ['Class 8-B', 84, '#f57c00'], ['Class 7-A', 91, '#8b5cf6'], ['Class 6-B', 76, '#d32f2f']];

  let filteredStudents = [...STUDENTS];
  if (f_class !== 'All') filteredStudents = filteredStudents.filter(s => String(s.class || '').startsWith(f_class));
  if (f_sect !== 'All') filteredStudents = filteredStudents.filter(s => String(s.class || '').endsWith(f_sect));

  const studentRows = filteredStudents.length ? filteredStudents.map((s, i) => `
    <tr>
      <td>
        <div class="user-row">
          <div class="avatar" style="background:${getAvatarColor(i)};width:30px;height:30px;font-size:11px">${getInitials(s.name)}</div>
          <div class="user-row-info"><strong>${s.name}</strong><span>${s.class}</span></div>
        </div>
      </td>
      <td>
        <div style="display:flex;align-items:center;gap:6px">
          <div class="progress-bar" style="flex:1"><div class="progress-fill" style="width:${s.attendance}%;background:${attColor(s.attendance)}"></div></div>
          <strong style="color:${attColor(s.attendance)};font-size:12px">${s.attendance}%</strong>
        </div>
      </td>
      <td><span class="badge ${s.attendance >= 90 ? 'badge-excellent' : s.attendance >= 80 ? 'badge-good' : 'badge-danger'}">${s.attendance >= 90 ? 'Excellent' : s.attendance >= 80 ? 'Good' : 'Low'}</span></td>
    </tr>`).join('') : `<tr><td colspan="3" style="text-align:center;padding:20px;color:var(--color-text-muted)">No matching records found</td></tr>`;

  return `<div class="dash-section" id="section-attendance">
    <div style="display:flex;gap:15px;margin-bottom:20px;background:var(--color-surface);padding:15px;border-radius:12px;border:1px solid var(--color-border);align-items:center">
      <div style="font-weight:700;color:var(--color-text-muted);font-size:13px"><i class="fas fa-filter"></i> FILTERS:</div>
      <select class="form-control" style="width:140px" onchange="localStorage.setItem('admin_att_f_class', this.value); triggerLiveReRender()">
        <option value="All" ${f_class === 'All' ? 'selected' : ''}>All Classes</option>
        <option value="10" ${f_class === '10' ? 'selected' : ''}>Class 10</option>
        <option value="9" ${f_class === '9' ? 'selected' : ''}>Class 9</option>
        <option value="8" ${f_class === '8' ? 'selected' : ''}>Class 8</option>
      </select>
      <select class="form-control" style="width:140px" onchange="localStorage.setItem('admin_att_f_sect', this.value); triggerLiveReRender()">
        <option value="All" ${f_sect === 'All' ? 'selected' : ''}>All Sections</option>
        <option value="A" ${f_sect === 'A' ? 'selected' : ''}>Section A</option>
        <option value="B" ${f_sect === 'B' ? 'selected' : ''}>Section B</option>
        <option value="C" ${f_sect === 'C' ? 'selected' : ''}>Section C</option>
      </select>
    </div>
    <div class="attendance-grid">
      <div class="attendance-stat total"><div class="attendance-stat-number">${a.total_students}</div><div class="attendance-stat-label">Total</div></div>
      <div class="attendance-stat present"><div class="attendance-stat-number">${a.present_today}</div><div class="attendance-stat-label">Present</div></div>
      <div class="attendance-stat absent"><div class="attendance-stat-number">${a.absent_today}</div><div class="attendance-stat-label">Absent</div></div>
      <div class="attendance-stat late"><div class="attendance-stat-number">${a.late_today}</div><div class="attendance-stat-label">Late</div></div>
    </div>
    <div class="content-grid-equal">
      <div class="card"><h3>📊 Class-wise Attendance</h3>${classData.map(([c, p, col]) => `<div style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-weight:700;font-size:14px;color:var(--color-text)">${c}</span><span style="font-weight:800;color:${col}">${p}%</span></div><div class="progress-bar"><div class="progress-fill" style="width:${p}%;background:${col}"></div></div></div>`).join('')}</div>
      <div class="card"><h3>📈 Weekly Trend</h3><div style="display:flex;align-items:flex-end;gap:12px;height:180px;padding-top:20px">${a.weekly.map(d => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;height:100%;justify-content:flex-end"><span style="font-size:11px;font-weight:700;color:${attColor(d.present)}">${d.present}%</span><div style="width:100%;background:${attColor(d.present)};border-radius:8px 8px 0 0;height:${d.present}%;transition:height 0.8s"></div><span style="font-size:10px;color:var(--color-text-muted);font-weight:700">${d.day}</span></div>`).join('')}</div></div>
    </div>
    <div class="card"><h3>📋 Student Records</h3><div style="overflow-x:auto;border-radius:14px"><table class="data-table"><thead><tr><th>Student</th><th>Attendance %</th><th>Status</th></tr></thead><tbody>${studentRows}</tbody></table></div></div>
  </div>`;
}

/* ━━━━ HOMEWORK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildHomework(user) {
  const cards = HOMEWORK.map(h => {
    const p = Math.round((h.submitted / h.total) * 100); return `<div class="card" style="padding:24px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><span class="badge badge-info" style="font-size:10px">${h.subject}</span><span class="badge ${h.status === 'Completed' ? 'badge-active' : 'badge-pending'}" style="font-size:10px">${h.status}</span></div>
    <h4 style="color:var(--color-text);font-size:15px;font-weight:700;margin-bottom:10px;line-height:1.4">${h.title}</h4>
    <div style="font-size:12px;color:var(--color-text-muted);margin-bottom:14px">👨‍🏫 ${h.teacher} · 🏫 ${h.class} · 📅 Due: ${h.due}</div>
    <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:8px"><span style="color:var(--color-text-muted)">Submissions</span><strong>${h.submitted}/${h.total}</strong></div>
    <div class="progress-bar"><div class="progress-fill" style="width:${p}%"></div></div>
    <div style="text-align:right;font-size:12px;font-weight:700;color:var(--color-primary);margin-top:6px">${p}%</div></div>`;
  }).join('');
  return `<div class="dash-section" id="section-homework"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px"><span style="font-size:14px;color:var(--color-text-muted)">${HOMEWORK.length} assignments · ${HOMEWORK.filter(h => h.status === 'Active').length} active</span><button class="btn-primary" onclick="simulateAction('New Assignment modal opened. Select class, subject and due date.')"><i class="fas fa-plus"></i> New Assignment</button></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px">${cards}</div></div>`;
}

/* ━━━━ RESULTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildResults(user) {
  const total = MARKS.reduce((a, m) => a + m.marks, 0), maxT = MARKS.reduce((a, m) => a + m.max, 0), pct = Math.round((total / maxT) * 100);
  const rows = MARKS.map(m => `<tr><td style="font-weight:700">${m.subject}</td><td><div style="display:flex;align-items:center;gap:8px"><div class="progress-bar" style="flex:1"><div class="progress-fill" style="width:${m.marks}%;background:${gradeColor(m.grade)}"></div></div><strong style="color:${gradeColor(m.grade)}">${m.marks}</strong>/${m.max}</div></td><td><span class="badge" style="background:${gradeColor(m.grade)};font-size:11px;padding:4px 12px">${m.grade}</span></td></tr>`).join('');
  return `<div class="dash-section" id="section-results"><div class="content-grid">
    <div class="card"><h3>📊 Subject-wise Marks</h3><p style="color:var(--color-text-muted);margin-bottom:16px">Mid-Term Exam 2026 · KASULA ASHWATH (Class 9-C)</p><div style="overflow-x:auto;border-radius:14px"><table class="data-table"><thead><tr><th>Subject</th><th>Marks</th><th>Grade</th></tr></thead><tbody>${rows}</tbody></table></div></div>
    <div><div class="card" style="text-align:center"><h3>🏆 Overall Score</h3><div style="font-size:60px;font-weight:900;background:linear-gradient(135deg,var(--color-primary),#1976d2);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;margin:10px 0">${pct}%</div><div style="font-size:15px;color:var(--color-text-muted);margin-bottom:16px">${total}/${maxT}</div><div class="progress-bar" style="margin-bottom:16px"><div class="progress-fill" style="width:${pct}%"></div></div><div style="padding:14px;background:rgba(92,168,112,0.1);border-radius:12px;border:2px solid rgba(92,168,112,0.2)"><div style="font-size:20px;font-weight:900;color:var(--color-primary)">DISTINCTION</div><div style="font-size:13px;color:var(--color-text-muted)">Class Rank: 3/35</div></div></div></div>
  </div></div>`;
}

/* ━━━━ FEES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildFees(user) {
  const pct = Math.round((FEE_DATA.paid / FEE_DATA.total_due) * 100);
  const rows = FEE_DATA.breakdown.map(f => `<tr><td style="font-weight:600">${f.label}</td><td style="font-weight:700">₹${f.amount.toLocaleString('en-IN')}</td><td>${feeStatusBadge(f.status)}</td></tr>`).join('');
  return `<div class="dash-section" id="section-fees">
    <div class="attendance-grid" style="grid-template-columns:repeat(3,1fr)">
      <div class="attendance-stat present"><div class="attendance-stat-number">₹${(FEE_DATA.paid / 1000).toFixed(0)}K</div><div class="attendance-stat-label">Paid</div></div>
      <div class="attendance-stat late"><div class="attendance-stat-number">₹${(FEE_DATA.pending / 1000).toFixed(0)}K</div><div class="attendance-stat-label">Pending</div></div>
      <div class="attendance-stat total"><div class="attendance-stat-number">₹${(FEE_DATA.total_due / 1000).toFixed(0)}K</div><div class="attendance-stat-label">Total Due</div></div>
    </div>
    <div class="content-grid"><div class="card"><h3>💰 Fee Breakdown</h3><div style="overflow-x:auto;border-radius:14px"><table class="data-table"><thead><tr><th>Component</th><th>Amount</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div></div>
    <div><div class="card" style="text-align:center"><h3>📊 Payment Progress</h3><div class="fee-donut" style="background:conic-gradient(var(--color-primary) ${pct * 3.6}deg,var(--color-border) 0);box-shadow:inset 0 0 0 30px var(--color-surface)"><div><div style="font-size:28px;font-weight:900;color:var(--color-text)">${pct}%</div><div style="font-size:11px;color:var(--color-text-muted)">Paid</div></div></div><div style="font-size:13px;color:var(--color-text-muted);margin-bottom:16px">Next due: <strong>${FEE_DATA.next_due}</strong></div><button class="btn-primary" style="width:100%"><i class="fas fa-credit-card"></i> Pay Now</button></div></div></div></div>`;
}

/* ━━━━ ANNOUNCEMENTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildAnnouncements(user) {
  const catC = { Events: '#5ca870', Academic: '#1976d2', Meeting: '#f57c00', Finance: '#d32f2f', Holiday: '#8b5cf6', CCA: '#00bcd4' };
  const priC = { high: '#d32f2f', medium: '#f57c00', low: '#5ca870' };
  let liveAnnouncements = JSON.parse(localStorage.getItem('campuscore_notices')) || ANNOUNCEMENTS;
  let archivedAnnouncements = JSON.parse(localStorage.getItem('campuscore_notices_archived')) || [];
  const vpNoticeTab = localStorage.getItem('vp_notice_tab') || 'active';
  const parentSid = user.role === 'parent' ? String(user.childId || user.username.replace(/^P/i, '').replace(/A$/i, '')) : null;
  const parentShared = (parentSid && typeof getStudentSharedData === 'function') ? getStudentSharedData(parentSid) : null;
  const readSet = new Set((parentShared && parentShared.noticesRead) || []);
  const source = user.role === 'vice_principal' && vpNoticeTab === 'archived' ? archivedAnnouncements : liveAnnouncements;
  const cards = source.map((a, index) => {
    const c = catC[a.category] || '#5ca870';
    const p = priC[a.priority] || '#5ca870';
    const isUnread = user.role === 'parent' ? !readSet.has(String(a.id)) : false;
    return `<div class="card" style="padding:0;overflow:hidden"><div style="height:5px;background:${p}"></div><div style="padding:22px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><div style="display:flex;gap:6px"><span class="badge" style="background:${c};font-size:10px;padding:4px 10px">${a.category}</span> ${user.role === 'vice_principal' ? `<span class="badge" style="background:var(--color-surface-2);color:var(--color-text);font-size:10px;border:1px solid var(--color-border)">Target: ${a.target || 'All'}</span>` : ''} ${user.role === 'parent' && isUnread ? `<span class="badge badge-info" style="font-size:10px">Unread</span>` : ''}</div><span style="font-size:10px;font-weight:800;color:${p};text-transform:uppercase;letter-spacing:1px">${a.priority}</span></div><h4 style="font-size:15px;font-weight:700;color:var(--color-text);margin-bottom:10px;line-height:1.4">${a.title}</h4><p style="font-size:13px;color:var(--color-text-light);margin-bottom:12px">${a.body || ''}</p><div style="font-size:12px;color:var(--color-text-muted);display:flex;gap:12px;margin-bottom:12px"><span>📅 Pub: ${a.date}</span><span>👤 ${a.author}</span></div>${user.role === 'vice_principal' && vpNoticeTab === 'active' ? `<div style="display:flex;gap:8px;border-top:1px solid var(--color-border);padding-top:12px;margin-top:12px"><span class="badge badge-active" style="flex:1;text-align:center;font-size:11px">Published</span><button style="padding:4px 8px;font-size:11px;border-radius:4px;background:none;border:1px solid #1976d2;color:#1976d2;cursor:pointer" onclick="openNoticeModal(${index})"><i class="fas fa-edit"></i></button><button style="padding:4px 8px;font-size:11px;border-radius:4px;background:none;border:1px solid #999;color:#999;cursor:pointer" onclick="archiveNotice(${index})"><i class="fas fa-archive"></i></button></div>` : ''}${user.role === 'vice_principal' && vpNoticeTab === 'archived' ? `<div style="display:flex;gap:8px;border-top:1px solid var(--color-border);padding-top:12px;margin-top:12px"><span class="badge badge-warning" style="flex:1;text-align:center;font-size:11px">Archived</span><button style="padding:4px 8px;font-size:11px;border-radius:4px;background:none;border:1px solid var(--color-primary);color:var(--color-primary);cursor:pointer" onclick="restoreNotice(${index})"><i class="fas fa-undo"></i></button></div>` : ''}${user.role === 'parent' ? `<button class="btn-primary" style="width:100%" onclick="parentReadNotice('${a.id}')">Read More</button>` : ''}</div></div>`;
  }).join('');

  return `<div class="dash-section" id="section-announcements">
    ${user.role === 'vice_principal' ? `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap"><h3>📢 Broadcasting & Notices</h3><div style="display:flex;gap:8px"><button class="btn-primary" onclick="setVPNoticeTab('active')" style="${vpNoticeTab === 'active' ? '' : 'opacity:.75'}">Active</button><button class="btn-primary" onclick="setVPNoticeTab('archived')" style="${vpNoticeTab === 'archived' ? '' : 'opacity:.75'}">Archived</button><button class="btn-primary" style="padding:8px 16px" onclick="openNoticeModal(null)"><i class="fas fa-plus"></i> Create Notice</button></div></div>` : ''}
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px">${cards || `<div class="card"><p style="color:var(--color-text-muted)">No notices in this tab.</p></div>`}</div>
  </div>`;
}

function parentReadNotice(noticeId) {
  if (!currentUser || currentUser.role !== 'parent' || typeof getStudentSharedData !== 'function') return;
  const sid = String(currentUser.childId || currentUser.username.replace(/^P/i, '').replace(/A$/i, ''));
  const shared = getStudentSharedData(sid);
  const set = new Set(shared.noticesRead || []);
  set.add(String(noticeId));
  shared.noticesRead = Array.from(set);
  saveStudentSharedData(sid, shared);
  simulateAction('Notice marked as read');
  buildDashboard(currentUser);
  navigateTo('announcements');
}

function buildEvents(user) {
  const cards = EVENTS.map(e => `<div class="event-card"><div class="event-bar" style="background:${e.color}"></div><div class="event-body"><div class="event-date" style="color:${e.color}"><i class="fas fa-calendar-alt"></i> ${e.date}</div><div class="event-title">${e.title}</div><div class="event-desc">${e.desc}</div>${user.role === 'vice_principal' ? `<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--color-border);font-size:12px;color:var(--color-text-muted)"><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span>👤 In-charge: A. Sharma</span> <span class="badge ${e.title.includes('Sports') ? 'badge-warning' : 'badge-active'}" style="font-size:10px">${e.title.includes('Sports') ? 'Stage 2/4' : 'Approved'}</span></div><div>👩‍🎓 Classes: 6A - 10L</div><div style="margin-top:8px;color:var(--color-primary);font-weight:600"><i class="fas fa-tasks"></i> Readiness: 80%</div></div>` : ''}<button style="margin-top:12px;width:100%;padding:8px 18px;background:${e.color}15;color:${e.color};border:2px solid ${e.color}30;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;transition:all 0.2s" onmouseover="this.style.background='${e.color}';this.style.color='white'" onmouseout="this.style.background='${e.color}15';this.style.color='${e.color}'" onclick="simulateAction('Event master plan opened with full schedule.')" onclick="simulateAction('Event master plan opened with full schedule.')">View Event Master Plan</button></div></div>`).join('');
  return `<div class="dash-section" id="section-events"><div class="events-grid">${cards}</div></div>`;
}

/* ━━━━ SETTINGS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function buildSettings(user) {
  const pCard = user.role === 'vice_principal' ? `<div class="card" style="grid-column: 1 / -1; display:flex; gap: 20px; align-items:center; background:linear-gradient(135deg,rgba(25,118,210,0.1),transparent)">
    <div class="avatar" style="width:80px;height:80px;font-size:32px;background:var(--color-primary)">${getInitials(user.name)}</div>
    <div>
      <h2 style="margin-bottom:6px;color:var(--color-text)">${user.name}</h2>
      <div style="font-size:14px;color:var(--color-text-muted);margin-bottom:6px"><strong>Role:</strong> ${user.roleLabel}</div>
      <div style="font-size:14px;color:var(--color-text-muted)"><strong>School:</strong> Delhi Public School, Nadergul</div>
    </div>
  </div>`: '';

  const set = getSettings(user.id);

  return `<div class="dash-section" id="section-settings"><div class="settings-grid">
    ${pCard}
    <div class="card">
      <h3>🎨 Appearance</h3>
      ${sToggle('Dark Mode', 'Switch between light and dark theme', 's-dark', `handleSettingToggle('${user.id}', 'darkMode', this.checked); document.documentElement.setAttribute('data-theme', this.checked ? 'dark' : 'light');`, set.darkMode)}
      ${sToggle('Compact Mode', 'Reduce spacing', 'compact', `handleSettingToggle('${user.id}', 'compactMode', this.checked); if(this.checked){document.documentElement.setAttribute('data-compact','true')}else{document.documentElement.removeAttribute('data-compact')}`, set.compactMode)}
    </div>
    <div class="card">
      <h3>🔔 Notifications</h3>
      ${sToggle('Email Notifications', 'Receive updates via email', 'e-notif', `handleSettingToggle('${user.id}', 'emailNotif', this.checked)`, set.emailNotif)}
      ${sToggle('Attendance Alerts', 'Alert on low attendance', 'att-a', `handleSettingToggle('${user.id}', 'attNotif', this.checked)`, set.attNotif)}
      ${sToggle('Fee Reminders', 'Payment deadline alerts', 'fee-r', `handleSettingToggle('${user.id}', 'feeNotif', this.checked)`, set.feeNotif)}
      ${sToggle('Homework Updates', 'New assignments', 'hw-u', `handleSettingToggle('${user.id}', 'hwNotif', this.checked)`, set.hwNotif)}
    </div>
    <div class="card">
      <h3>👤 Account</h3>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${sBtn('Change Password', 'fa-lock', `currentUser && (currentUser.role==='parent' || currentUser.role==='student') && typeof openUnifiedAccountPasswordModal==='function' ? openUnifiedAccountPasswordModal() : openGenericAccountPasswordModal()`)}
        ${sBtn('Edit Profile', 'fa-user-edit', `currentUser && currentUser.role==='parent' ? openParentEditProfileModal() : openGenericProfileModal()`)}
        <div style="display:flex;gap:10px;margin-top:10px">
            <button class="btn-primary lang-btn" style="flex:1;font-size:12px;padding:10px" onclick="setSystemLanguage('English')">🇬🇧 English</button>
            <button class="btn-primary lang-btn" style="flex:1;font-size:12px;padding:10px" onclick="setSystemLanguage('Telugu')">🇮🇳 తెలుగు (Telugu)</button>
        </div>
        <button class="btn-primary" style="margin-top:10px; font-size:12px; padding:10px; background:var(--color-surface-3); border:1px dashed var(--color-border); color:var(--color-text)" onclick="resetSystemLanguage()">
            <i class="fas fa-undo"></i> Reset to English
        </button>
        ${sBtn('Download My Data', 'fa-download', `currentUser && currentUser.role==='parent' ? downloadParentData() : downloadGenericUserData()`)}
      </div>
    </div>
    <div class="card">
      <h3>🔒 Security</h3>
      ${sToggle('Two-Factor Auth', 'Extra login security', '2fa', `handleSettingToggle('${user.id}', 'twoFactor', this.checked); if(this.checked) simulateAction('2FA setup text sent to ' + currentUser.phone)`, set.twoFactor)}
      ${user.role === 'vice_principal' ? `<div class="settings-row"><div><div class="settings-label">Action PIN (Promote/Demote)</div><div class="settings-hint">Protect VP student actions with a PIN.</div></div><button class="btn-primary" style="padding:8px 14px" onclick="openChangeActionPinModal()">Change PIN</button></div>` : ''}
      <div style="margin-top:20px;padding:16px;background:rgba(211,47,47,0.06);border:2px solid rgba(211,47,47,0.15);border-radius:12px">
        <div style="font-size:14px;font-weight:700;color:var(--color-danger);margin-bottom:6px">⚠️ Session</div>
        <button class="btn-danger" style="margin-bottom:10px" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</button>
      </div>
    </div>
  </div></div>`;
}

function handleSettingToggle(userId, key, val) {
  const set = getSettings(userId);
  set[key] = val;
  saveSettings(userId, set);
}

function simulateAction(msg) {
  // Show a non-blocking toast instead of alert
  const existing = document.getElementById('sim-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'sim-toast';
  toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:var(--color-primary);color:white;padding:14px 28px;border-radius:12px;font-size:14px;font-weight:600;font-family:Inter,sans-serif;z-index:99999;box-shadow:0 8px 30px rgba(0,0,0,0.25);max-width:90vw;text-align:center;animation:fadeInUp 0.3s ease;pointer-events:none;';
  toast.innerHTML = '<i class="fas fa-check-circle" style="margin-right:8px"></i>' + msg;
  document.body.appendChild(toast);
  setTimeout(() => { if (toast.parentNode) toast.remove(); }, 3500);
}

function sToggle(l, h, id, oc, ch) {
  return `<div class="settings-row">
    <div>
      <div class="settings-label">${l}</div>
      <div class="settings-hint">${h}</div>
    </div>
    <label class="toggle-switch">
      <input type="checkbox" id="${id}" ${ch ? 'checked' : ''} onchange="${oc.replace(/"/g, '&quot;')}"/>
      <span class="toggle-slider"></span>
    </label>
  </div>`;
}

function sBtn(l, ic, oc = '') {
  return `<button onclick="${oc}" style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--color-surface-2);border:2px solid var(--color-border);border-radius:10px;cursor:pointer;color:var(--color-text);font-size:13px;font-weight:600;font-family:Inter,sans-serif;transition:all 0.2s;text-align:left;width:100%" onmouseover="this.style.borderColor='var(--color-primary)'" onmouseout="this.style.borderColor='var(--color-border)'"><i class="fas ${ic}" style="color:var(--color-primary);width:18px"></i> ${l}<i class="fas fa-chevron-right" style="margin-left:auto;opacity:0.3;font-size:11px"></i></button>`;
}
/* ━━━━ VICE PRINCIPAL EXCLUSIVE MODULES ━━━━━━━━━━━━━━━━━━━ */

function buildVPAttendance(user) {
  const filterClass = localStorage.getItem('att_filter_class') || 'All';
  const filterSection = localStorage.getItem('att_filter_section') || 'All';

  let rawList = window.CAMPUSCORE_REGISTRY ? window.CAMPUSCORE_REGISTRY.getAllStudents() : STUDENTS;
  let filtered = rawList.map(s => ({
    name: s.name || 'Unknown',
    class: s.class || `${s.currentClass || '9'}-${s.currentSection || 'A'}`,
    attendance: Number(s.attendance || s.attendancePct || s.att || 0)
  }));

  if (filterClass !== 'All') {
    filtered = filtered.filter(s => {
      const parts = String(s.class || '').split('-');
      return parts[0] === filterClass;
    });
  }
  if (filterSection !== 'All') {
    filtered = filtered.filter(s => {
      const parts = String(s.class || '').split('-');
      return (parts[1] || '').includes(filterSection);
    });
  }

  const rows = filtered.map((s, i) => `<tr><td><div class="user-row"><div class="avatar" style="background:${getAvatarColor(i)}">${getInitials(s.name)}</div><div class="user-row-info"><strong>${s.name}</strong><span>${s.class}</span></div></div></td><td><div class="progress-bar"><div class="progress-fill" style="width:${s.attendance}%;background:${attColor(s.attendance)}"></div></div></td><td><strong style="color:${attColor(s.attendance)}">${s.attendance}%</strong></td><td>${s.attendance >= 90 ? 'Excellent' : s.attendance >= 80 ? 'Good' : 'Low'}</td></tr>`).join('');

  return `<div class="dash-section" id="section-vp_attendance">
    <div class="content-grid-equal" style="margin-bottom:20px">
      <div class="card" style="display:flex;flex-direction:column;justify-content:center;align-items:center;background:linear-gradient(135deg,rgba(92,168,112,0.1),transparent)">
        <h3 style="margin-bottom:10px">Overall Attendance</h3>
        <div style="font-size:48px;font-weight:900;color:var(--color-primary)">${filtered.length ? (filtered.reduce((a, b) => a + b.attendance, 0) / filtered.length).toFixed(1) : 0}%</div>
        <p style="color:var(--color-text-muted)">Tracking ${filtered.length} students in view</p>
      </div>
      <div class="card">
        <h3>🚨 Low Attendance Alerts</h3>
        <ul class="activity-list" style="margin-top:10px">
          ${filtered.filter(s => s.attendance < 85).slice(0, 3).map(s => `<li class="activity-item"><div class="activity-dot" style="background:var(--color-danger)"></div><div class="activity-text"><strong style="color:var(--color-text)">${s.name} (${s.class})</strong> - ${s.attendance}%</div></li>`).join('') || '<li class="activity-item"><div class="activity-text">No alerts for selected group</div></li>'}
        </ul>
      </div>
    </div>
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:10px">
        <h3>📈 Detailed Student Tracking</h3>
        <div style="display:flex;gap:10px">
          <select id="att-class-filter" style="padding:8px 12px;border-radius:8px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text);outline:none">
            <option value="All" ${filterClass === 'All' ? 'selected' : ''}>All Classes</option>
            <option value="10" ${filterClass === '10' ? 'selected' : ''}>Class 10</option>
            <option value="9" ${filterClass === '9' ? 'selected' : ''}>Class 9</option>
            <option value="8" ${filterClass === '8' ? 'selected' : ''}>Class 8</option>
            <option value="7" ${filterClass === '7' ? 'selected' : ''}>Class 7</option>
            <option value="6" ${filterClass === '6' ? 'selected' : ''}>Class 6</option>
          </select>
          <select id="att-section-filter" style="padding:8px 12px;border-radius:8px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text);outline:none">
            <option value="All" ${filterSection === 'All' ? 'selected' : ''}>All Sections</option>
            <option value="A" ${filterSection === 'A' ? 'selected' : ''}>Section A</option>
            <option value="B" ${filterSection === 'B' ? 'selected' : ''}>Section B</option>
            <option value="C" ${filterSection === 'C' ? 'selected' : ''}>Section C</option>
          </select>
          <button class="btn-primary" style="padding:8px 16px" onclick="applyAttendanceFilter()"><i class="fas fa-filter"></i> Apply</button>
        </div>
      </div>
      <div style="overflow-x:auto;border-radius:14px"><table class="data-table"><thead><tr><th>Student</th><th>Progress</th><th>%</th><th>Status</th></tr></thead><tbody>${rows || '<tr><td colspan="4" style="text-align:center">No students found matching filters.</td></tr>'}</tbody></table></div>
    </div>
  </div>`;
}

function applyAttendanceFilter() {
  const cls = document.getElementById('att-class-filter').value;
  const sec = document.getElementById('att-section-filter').value;
  localStorage.setItem('att_filter_class', cls);
  localStorage.setItem('att_filter_section', sec);
  triggerLiveReRender();
}

function buildVPClassPerf(user) {
  const rows = CLASS_PERFORMANCE.map(c => `<tr onclick="openVPStudentAnalysis('${c.class}')" style="cursor:pointer">
    <td style="font-weight:700">${c.class}</td>
    <td>${c.teacher}</td>
    <td><strong style="color:${attColor(c.avgAtt)}">${c.avgAtt}%</strong></td>
    <td><strong style="color:var(--color-primary)">${c.avgGPA}</strong></td>
    <td><span class="badge ${c.weak > 3 ? 'badge-danger' : 'badge-active'}">${c.weak}</span></td>
    <td><span class="badge ${c.issues > 1 ? 'badge-warning' : 'badge-info'}">${c.issues}</span></td>
    <td>${c.topper}</td>
  </tr>`).join('');
  return `<div class="dash-section" id="section-vp_class_perf">
    <div class="card" style="margin-bottom:20px;background:var(--color-surface-2)">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <h3>📊 Class Performance Matrix</h3>
          <p style="color:var(--color-text-muted);font-size:13px">Comparing academic and discipline health across 6A - 10L. Click a row to analyze students.</p>
        </div>
        <div style="display:flex;gap:10px">
          <button style="padding:10px 16px;border-radius:10px;background:var(--color-surface);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;font-weight:600" onclick="compareVPSections()"><i class="fas fa-balance-scale"></i> Compare Sections</button>
          <button class="btn-primary" onclick="exportVPReport()"><i class="fas fa-file-pdf"></i> Export</button>
        </div>
      </div>
    </div>
    <div class="card"><div style="overflow-x:auto;border-radius:14px"><table class="data-table"><thead><tr><th>Class</th><th>Class Teacher</th><th>Avg. Att.</th><th>Avg. GPA</th><th>Weak Students</th><th>Discipline Issues</th><th>Topper</th></tr></thead><tbody>${rows}</tbody></table></div></div>
  </div>`;
}

window.compareVPSections = function () {
  const m = `<div class="modal-overlay" id="vp-compare-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:500px">
      <h3>⚖️ Compare Sections</h3>
      <div class="form-group">
        <label>Select Base Section</label>
        <select class="form-control"><option>10A</option><option>9C</option></select>
        <label style="margin-top:10px">Select Target Section</label>
        <select class="form-control"><option>10B</option><option>8A</option></select>
      </div>
      <button class="btn-primary" style="width:100%;margin-top:20px" onclick="simulateAction('Comparison matrix generated successfully!'); document.getElementById('vp-compare-modal').remove()">Generate Matrix</button>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
};

window.exportVPReport = function () {
  const m = `<div class="modal-overlay" id="vp-export-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:400px">
      <h3>📄 Export Audit Report</h3>
      <p style="font-size:13px;color:var(--color-text-muted)">Select the dataset range to perform an institutional export.</p>
      <div class="form-group">
        <label>Report Type</label>
        <select class="form-control"><option>Full Academic Audit (.pdf)</option><option>Raw Class Metrics (.xlsx)</option></select>
      </div>
      <button class="btn-primary" style="width:100%;margin-top:20px" onclick="simulateAction('Initiating secure file download...'); setTimeout(() => { simulateAction('Report downloaded: perf_audit_2026.pdf'); document.getElementById('vp-export-modal').remove(); }, 1500)">Execute Export</button>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
};

window.openVPStudentAnalysis = function (className) {
  const m = `<div class="modal-overlay" id="vp-student-analysis-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:600px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
        <h3>📈 Academic Analysis: Class ${className}</h3>
        <button onclick="document.getElementById('vp-student-analysis-modal').remove()" style="background:none;border:none;font-size:18px;cursor:pointer">&times;</button>
      </div>
      <div class="content-grid-equal" style="margin-bottom:20px">
        <div class="card" style="padding:15px;background:rgba(92,168,112,0.1);border:1px solid rgba(92,168,112,0.3)">
          <h4 style="color:#5ca870;margin-top:0">Top Performers</h4>
          <ul style="padding-left:20px;margin:10px 0;font-size:13px">
            <li>Ananya Sharma (98%)</li>
            <li>Rohan Das (96%)</li>
            <li>Priya Patel (95%)</li>
          </ul>
        </div>
        <div class="card" style="padding:15px;background:rgba(211,47,47,0.1);border:1px solid rgba(211,47,47,0.3)">
          <h4 style="color:#d32f2f;margin-top:0">Action Required</h4>
          <ul style="padding-left:20px;margin:10px 0;font-size:13px">
            <li>Vikram Singh (Att: 45%)</li>
            <li>Neha Gupta (Failed Math)</li>
          </ul>
        </div>
      </div>
      <p style="font-size:13px;color:var(--color-text-muted)">This module ties directly into the institutional data lake for ${className}. Full demographic breakdown and semester-over-semester growth trend processing is active.</p>
      <div style="display:flex;gap:10px;margin-top:20px">
        <button class="btn-primary" style="flex:1" onclick="simulateAction('Downloading detailed class analysis report...'); document.getElementById('vp-student-analysis-modal').remove()">Download Full Report</button>
        <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:8px" onclick="document.getElementById('vp-student-analysis-modal').remove()">Close</button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
};

function getActionPin() {
  const key = 'campuscore_action_pin';
  const current = localStorage.getItem(key);
  if (!current) {
    localStorage.setItem(key, 'cc');
    return 'cc';
  }
  return current;
}

function getVPStudentById(studentId) {
  const sid = String(studentId);
  return (STUDENTS || []).find(s => String(s.admNo || s.id) === sid);
}

function normalizeClassCode(classValue) {
  return String(classValue || '').toUpperCase().replace(/\s+/g, '').replace('-', '');
}

function classCodeToStoredFormat(classCode) {
  const c = normalizeClassCode(classCode);
  if (!c) return '';
  return `${c.slice(0, -1)}-${c.slice(-1)}`;
}

function parseClassCode(classCode) {
  const c = normalizeClassCode(classCode);
  const m = c.match(/^(\d+)([A-Z])$/);
  if (!m) return null;
  return { grade: Number(m[1]), section: m[2] };
}

function computePromotedClass(currentClassCode) {
  const parsed = parseClassCode(currentClassCode);
  if (!parsed) return { error: 'Invalid current class format.' };
  if (parsed.grade >= 10) return { error: 'Student is already in Class 10. Cannot promote further.' };
  return { value: `${parsed.grade + 1}${parsed.section}` };
}

function computeDemotedClass(currentClassCode) {
  const parsed = parseClassCode(currentClassCode);
  if (!parsed) return { error: 'Invalid current class format.' };
  if (parsed.grade <= 6) return { error: 'Student is already in Class 6. Cannot demote further.' };
  return { value: `${parsed.grade - 1}${parsed.section}` };
}

function getVPStudentSharedData(studentId) {
  const sid = String(studentId);
  if (typeof getStudentSharedData === 'function') return getStudentSharedData(sid);
  return JSON.parse(localStorage.getItem('campuscore_student_data_' + sid) || '{}');
}

function saveVPStudentSharedData(studentId, data) {
  const sid = String(studentId);
  if (typeof saveStudentSharedData === 'function') {
    saveStudentSharedData(sid, data);
    return;
  }
  localStorage.setItem('campuscore_student_data_' + sid, JSON.stringify(data));
}

function pushStudentActivity(shared, note) {
  const list = Array.isArray(shared.activityLog) ? shared.activityLog : [];
  list.unshift({ note, date: new Date().toISOString(), actor: 'SUMAN (VP)' });
  shared.activityLog = list.slice(0, 50);
}

function getEscalationStore() {
  const base = { teacherInbox: [], coordinatorInbox: [], vpEscalated: [], resolvedIssues: [] };
  const parsed = JSON.parse(localStorage.getItem('campuscore_escalations') || '{}');
  return {
    teacherInbox: Array.isArray(parsed.teacherInbox) ? parsed.teacherInbox : [],
    coordinatorInbox: Array.isArray(parsed.coordinatorInbox) ? parsed.coordinatorInbox : [],
    vpEscalated: Array.isArray(parsed.vpEscalated) ? parsed.vpEscalated : [],
    resolvedIssues: Array.isArray(parsed.resolvedIssues) ? parsed.resolvedIssues : [],
  };
}

function saveEscalationStore(store) {
  localStorage.setItem('campuscore_escalations', JSON.stringify(store));
}

function sectionFromClassCode(cls) {
  const code = normalizeClassCode(cls);
  return code ? code.slice(-1) : '';
}

function stageChipLabel(stage, status) {
  const s = String(status || '').toLowerCase();
  const st = String(stage || '').toLowerCase();
  if (s.includes('resolved')) return { label: 'Resolved', color: 'var(--color-success)' };
  if (st === 'vp') return { label: 'With VP', color: 'var(--color-danger)' };
  if (st === 'coordinator') return { label: 'With Coordinator', color: '#f57c00' };
  return { label: 'With Teacher', color: '#1976d2' };
}

function openEscalationTimelineModal(issueId) {
  const store = getEscalationStore();
  const all = [...store.teacherInbox, ...store.coordinatorInbox, ...store.vpEscalated, ...store.resolvedIssues];
  const issue = all.find(i => String(i.id) === String(issueId));
  if (!issue) return simulateAction('Issue not found');
  const timelineRows = (issue.timeline || []).map(t => `<div style="padding:10px;border:1px solid var(--color-border);border-radius:10px;margin-bottom:8px"><div style="display:flex;justify-content:space-between;font-size:12px;color:var(--color-text-muted)"><strong>${t.action || 'Update'}</strong><span>${t.date || ''}</span></div><div style="font-size:13px;color:var(--color-text);margin-top:4px">${t.by || ''} (${t.role || ''})</div>${t.note ? `<div style="font-size:13px;color:var(--color-text-light);margin-top:4px">${t.note}</div>` : ''}</div>`).join('');
  const html = `<div class="modal-overlay" id="esc-timeline-modal" style="display:flex" onclick="if(event.target===this) this.remove()"><div class="modal" style="max-width:620px;width:100%"><h3 style="margin-top:0">${issue.id} · Full Timeline</h3><div style="font-size:13px;color:var(--color-text-muted);margin-bottom:10px">${issue.studentName} · ${issue.class}</div><div style="max-height:420px;overflow:auto">${timelineRows || '<p style="color:var(--color-text-muted)">No timeline updates yet.</p>'}</div><div style="margin-top:10px"><button class="btn-primary" onclick="document.getElementById('esc-timeline-modal').remove()">Close</button></div></div></div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

function buildVPStudents(user) {
  const filter = JSON.parse(localStorage.getItem('vp_student_analysis_filter') || '{"class":"All Classes","section":"All Sections","q":""}');
  const allSections = 'ABCDEFGHIJK'.split('');
  const selectedClass = filter.class || 'All Classes';
  const selectedSection = filter.section || 'All Sections';
  const q = String(filter.q || '').trim().toLowerCase();

  // Step 1 — Get students from registry
  const students = window.CAMPUSCORE_REGISTRY
    ? window.CAMPUSCORE_REGISTRY.getAllStudents()
    : (STUDENTS || []).map(s => {
      const shared = getVPStudentSharedData(s.admNo || s.id);
      return {
        id: s.admNo || s.id,
        name: s.name,
        currentClass: shared.currentClass || s.class || '9',
        currentSection: shared.currentSection || s.section || 'C',
        roll: s.roll || 0,
        attendance: Number(shared.attendancePct || s.attendance || 0),
        gpa: shared.results ? (shared.results.overall || 0) : (s.gpa || 0),
        status: shared.status || 'Active',
        sno: 0
      };
    });

  let data = students.map((s, idx) => {
    const sid = String(s.id);
    const shared = getVPStudentSharedData(sid);
    const grade = String(s.currentClass);
    const section = String(s.currentSection);
    const att = Number(s.attendance);
    const gpa = String(s.gpa);
    const status = String(s.status);
    return { s, idx, sid, shared, grade, section, att, gpa, status };
  });

  if (selectedClass !== 'All Classes') data = data.filter(d => String(d.grade) === String(selectedClass));
  if (selectedSection !== 'All Sections') data = data.filter(d => d.section === selectedSection);
  if (q) data = data.filter(d => String(d.s.name).toLowerCase().includes(q) || String(d.sid).includes(q));

  const avgAtt = data.length ? (data.reduce((a, d) => a + d.att, 0) / data.length).toFixed(1) : '0.0';
  const avgGpa = data.length ? (data.reduce((a, d) => a + Number(d.gpa || 0), 0) / data.length).toFixed(2) : '0.00';
  const lowAtt = data.filter(d => d.att < 85).length;
  const activeSusp = data.filter(d => d.status === 'Suspended').length;
  const promoted = data.filter(d => d.shared.promotedDate && String(d.shared.academicYear || '') === '2026-27').length;

  const cards = [
    ['Total Students', data.length],
    ['Average Attendance %', avgAtt],
    ['Average GPA', avgGpa],
    ['Attendance below 85%', lowAtt],
    ['Active Suspensions', activeSusp],
    ['Promoted this year', promoted],
  ].map(([label, value]) => `<div class="stat-card"><div class="stat-value">${value}</div><div class="stat-label">${label}</div></div>`).join('');

  const rows = data.map((d, idx) => {
    const suspended = d.shared.suspensionStatus === 'suspended';
    let statusChip = `<span class="badge badge-active">Active</span>`;
    if (d.status === 'Demoted') statusChip = `<span class="badge badge-danger">Demoted</span>`;
    else if (suspended || d.status === 'Suspended') statusChip = `<span class="badge badge-warning">Suspended</span>`;
    else if (d.shared.promotedDate) statusChip = `<span class="badge badge-success">Promoted</span>`;
    return `<tr>
      <td>${idx + 1}</td>
      <td>${d.sid}</td>
      <td>${d.s.name}</td>
      <td>${d.grade || '-'}</td>
      <td>${d.section || '-'}</td>
      <td>${d.s.roll || '-'}</td>
      <td style="color:${attColor(d.att)};font-weight:700">${d.att}%</td>
      <td>${d.gpa}</td>
      <td>${statusChip}</td>
      <td><div style="display:flex;gap:6px;flex-wrap:wrap">
        <button class="btn-primary" style="padding:6px 8px;font-size:11px" onclick="openVPStudentProfileModal('${d.sid}')">View Profile</button>
        <button class="btn-primary" style="padding:6px 8px;font-size:11px;background:var(--color-success);border-color:var(--color-success)" onclick="openVPStudentActionFlow('${d.sid}','promote')">Promote</button>
        <button class="btn-primary" style="padding:6px 8px;font-size:11px;background:var(--color-danger);border-color:var(--color-danger)" onclick="openVPStudentActionFlow('${d.sid}','demote')">Demote</button>
        <button class="btn-primary" style="padding:6px 8px;font-size:11px;background:#f57c00;border-color:#f57c00" onclick="openVPStudentActionFlow('${d.sid}','suspend')">Suspend</button>
      </div></td>
    </tr>`;
  }).join('');

  const noRecordsMsg = (selectedClass !== 'All Classes' && selectedSection !== 'All Sections' && !(selectedClass === '9' && selectedSection === 'C')) ? `<div class="card" style="margin-top:12px"><p style="color:var(--color-text-muted)">No student records available for this class yet</p><p style="font-size:12px;color:var(--color-text-muted)">Student data for Class ${selectedClass}${selectedSection} will appear here once registered.</p></div>` : '';
  return `<div class="dash-section" id="section-vp_students">
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap"><h3>🎓 Student Analysis</h3></div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px">
        <select id="vp-filter-class" class="form-control" style="max-width:160px" onchange="onVPAnalysisClassChange(this.value)">
          <option ${selectedClass === 'All Classes' ? 'selected' : ''}>All Classes</option>
          <option ${selectedClass === '6' ? 'selected' : ''}>6</option><option ${selectedClass === '7' ? 'selected' : ''}>7</option><option ${selectedClass === '8' ? 'selected' : ''}>8</option><option ${selectedClass === '9' ? 'selected' : ''}>9</option><option ${selectedClass === '10' ? 'selected' : ''}>10</option>
        </select>
        <select id="vp-filter-section" class="form-control" style="max-width:160px">${['All Sections', ...allSections].map(sec => `<option ${selectedSection === sec ? 'selected' : ''}>${sec}</option>`).join('')}</select>
        <input id="vp-filter-query" class="form-control" style="min-width:220px;flex:1" placeholder="Search by student name or ID" value="${String(filter.q || '').replace(/"/g, '&quot;')}">
        <button class="btn-primary" onclick="applyVPStudentFilters()">Apply Filter</button>
        <button class="btn-primary" style="background:var(--color-surface-2);border-color:var(--color-border);color:var(--color-text)" onclick="clearVPStudentFilters()">Clear Filter</button>
      </div>
      <div class="stats-grid" style="margin-bottom:12px">${cards}</div>
      <div style="overflow-x:auto;border-radius:14px">
        <table class="data-table"><thead><tr><th>S.No</th><th>Student ID</th><th>Student Name</th><th>Class</th><th>Section</th><th>Roll No</th><th>Attendance %</th><th>GPA / Average</th><th>Status</th><th>Actions</th></tr></thead><tbody>${rows || `<tr><td colspan="10" style="text-align:center;color:var(--color-text-muted)">No students found for selected filter.</td></tr>`}</tbody></table>
      </div>
      ${noRecordsMsg}
    </div>
  </div>`;
}

function onVPAnalysisClassChange(val) {
  const sec = document.getElementById('vp-filter-section');
  if (!sec) return;
  const opts = ['All Sections', ...'ABCDEFGHIJK'.split('')];
  sec.innerHTML = opts.map(o => `<option>${o}</option>`).join('');
}

function applyVPStudentFilters() {
  const cls = (document.getElementById('vp-filter-class') || {}).value || 'All Classes';
  const sec = (document.getElementById('vp-filter-section') || {}).value || 'All Sections';
  const q = (document.getElementById('vp-filter-query') || {}).value || '';
  localStorage.setItem('vp_student_analysis_filter', JSON.stringify({ class: cls, section: sec, q }));
  triggerLiveReRender();
  navigateTo('vp_students');
}

function clearVPStudentFilters() {
  localStorage.setItem('vp_student_analysis_filter', JSON.stringify({ class: 'All Classes', section: 'All Sections', q: '' }));
  triggerLiveReRender();
  navigateTo('vp_students');
}

function openVPStudentProfileModal(studentId) {
  const s = getVPStudentById(studentId);
  if (!s) return;
  const sid = String(s.admNo || s.id);
  const shared = getVPStudentSharedData(sid);
  const cls = normalizeClassCode(shared.currentClass || s.class);
  const section = sectionFromClassCode(cls);
  const grade = cls ? cls.slice(0, -1) : '';
  const marks = Array.isArray(shared.results) ? shared.results : [];
  const hw = Array.isArray(shared.homework) ? shared.homework.slice(0, 5) : [];
  const esc = getEscalationStore();
  const issueHistory = [...esc.teacherInbox, ...esc.coordinatorInbox, ...esc.vpEscalated, ...esc.resolvedIssues].filter(i => String(i.studentId) === sid);
  const marksRows = marks.length ? marks.map(m => `<tr><td>${m.subject || '-'}</td><td>${m.marks || m.score || 0}</td><td>${m.total || 100}</td><td>${m.percent || m.pct || 0}%</td></tr>`).join('') : `<tr><td colspan="4" style="text-align:center;color:var(--color-text-muted)">No marks data</td></tr>`;
  const hwRows = hw.length ? hw.map(h => `<li>${h.subject || '-'} · ${h.title || '-'} <span class="badge ${h.status === 'Submitted' ? 'badge-success' : h.status === 'Overdue' ? 'badge-danger' : 'badge-warning'}">${h.status || 'Pending'}</span></li>`).join('') : '<li style="color:var(--color-text-muted)">No homework data</li>';
  const issueRows = issueHistory.length ? issueHistory.map(i => `<li>${i.id} · ${i.category || '-'} · ${i.status || '-'} <button class="btn-primary" style="padding:2px 8px;font-size:11px;margin-left:6px" onclick="openEscalationTimelineModal('${i.id}')">Timeline</button></li>`).join('') : '<li style="color:var(--color-text-muted)">No issue history</li>';
  const html = `<div class="modal-overlay" id="vp-student-profile-modal" style="display:flex" onclick="if(event.target===this) this.remove()"><div class="modal" style="max-width:760px;width:100%"><h3 style="margin-top:0">${s.name} · ${sid}</h3><div class="content-grid"><div><p><strong>Class:</strong> ${grade}</p><p><strong>Section:</strong> ${section}</p><p><strong>Roll No:</strong> ${s.roll || '-'}</p><p><strong>Attendance:</strong> ${Number(shared.attendancePct || s.attendance || 0)}%</p><p><strong>Status:</strong> ${shared.status || 'Active'}</p></div><div><p><strong>House:</strong> ${shared.profile?.house || 'Red'}</p><p><strong>Blood Group:</strong> ${shared.profile?.bloodGroup || 'O+'}</p><p><strong>DOB:</strong> ${shared.profile?.dob || s.dob || '-'}</p></div></div><h4>Subject-wise Marks</h4><div style="overflow:auto;border:1px solid var(--color-border);border-radius:10px"><table class="data-table"><thead><tr><th>Subject</th><th>Marks</th><th>Total</th><th>%</th></tr></thead><tbody>${marksRows}</tbody></table></div><h4 style="margin-top:10px">Recent Homework</h4><ul>${hwRows}</ul><h4 style="margin-top:10px">Issue History</h4><ul>${issueRows}</ul><div style="margin-top:10px"><button class="btn-primary" onclick="document.getElementById('vp-student-profile-modal').remove()">Close</button></div></div></div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

function buildVPStudentIssues(user) {
  const tab = localStorage.getItem('vp_issue_tab') || 'main';
  const escStore = getEscalationStore();
  const issues = (GLOBAL_ISSUES || []).slice().sort((a, b) => new Date(b.updated || b.created) - new Date(a.updated || a.created));
  const mainIssues = issues.filter(i => i.stage === 'VP' && i.status !== 'Resolved' && i.status !== 'Closed' && i.status !== 'Escalated');
  const globalEsc = issues.filter(i => i.status === 'Escalated').map(i => ({ ...i, _source: 'main' }));
  const localVpEsc = (escStore.vpEscalated || []).map(i => ({ ...i, _source: 'coordinator' }));
  const externalVp = (() => {
    const raw = JSON.parse(localStorage.getItem('campuscore_vp_issues') || '{}');
    const arr = Array.isArray(raw) ? raw : (Array.isArray(raw.escalatedIssues) ? raw.escalatedIssues : []);
    return arr.map(i => ({ ...i, _source: 'main' }));
  })();
  const escalatedIssues = [...localVpEsc, ...globalEsc, ...externalVp];
  const resolvedIssues = issues.filter(i => i.status === 'Resolved' || i.status === 'Closed');
  const activeList = tab === 'escalated' ? escalatedIssues : tab === 'resolved' ? resolvedIssues : mainIssues;
  const cards = activeList.map(i => {
    const priority = i.priority || i.urgency || 'Normal';
    const isHigh = priority === 'High';
    const isMed = priority === 'Medium';
    const color = isHigh ? 'var(--color-danger)' : isMed ? '#f57c00' : 'var(--color-success)';
    return `<div class="card" style="border-left:4px solid ${color}">
      <div style="display:flex;justify-content:space-between;margin-bottom:10px"><span class="badge" style="background:var(--color-surface-2);color:var(--color-text)">${i.class || '-'}</span><span style="font-size:12px;font-weight:700;color:${color}">${priority}</span></div>
      <h4 style="margin-bottom:6px;font-size:16px;color:var(--color-text)">${i.studentName || i.student || 'Student'}</h4>
      <p style="color:var(--color-text-muted);font-size:13px;margin-bottom:12px">${i.title || i.issue || '-'}</p>
      <div style="font-size:12px;color:var(--color-text-muted);margin-bottom:6px"><i class="fas fa-user-shield"></i> Reported by: ${i.reporterName || i.reporter || i.escalatedByCoordinator || '-'}</div>
      ${tab === 'escalated' ? `<div style="font-size:12px;color:var(--color-text-muted);margin-bottom:10px"><span class="badge" style="background:var(--color-surface-2);color:var(--color-text)">${i._source === 'coordinator' ? 'From Coordinator' : 'From Main Issues'}</span> ${i.escalationReason ? ` · Reason: ${i.escalationReason}` : ''} ${i.escalatedDate ? ` · ${i.escalatedDate}` : ''}</div>` : ''}
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        ${tab !== 'resolved' ? `<button class="btn-primary" style="flex:1;min-width:100px;font-size:12px;padding:8px" onclick="${i._source === 'coordinator' ? 'vpResolveEscalationIssue' : 'resolveVPIssue'}('${i.id}')">Resolve</button>` : ''}
        <button style="flex:1;min-width:100px;background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:8px;font-weight:600;font-size:12px;color:var(--color-text);cursor:pointer" onclick="${i._source === 'coordinator' ? 'openEscalationTimelineModal' : 'viewIssue'}('${i.id}')"><i class="fas fa-folder-open"></i> Open Case</button>
        ${tab === 'main' ? `<button style="width:100%;margin-top:6px;background:var(--color-surface-2);border:1px solid var(--color-primary);border-radius:8px;font-weight:700;font-size:12px;color:var(--color-primary);cursor:pointer;padding:8px" onclick="openEscalateIssueModal('${i.id}')"><i class="fas fa-level-up-alt"></i> ↗ Escalate Up</button>` : ''}
        ${tab === 'main' ? `<button style="width:100%;background:none;border:1px dashed #1976d2;border-radius:8px;font-weight:600;font-size:12px;color:#1976d2;cursor:pointer;padding:8px" onclick="openForwardCoordModal('${i.id}','${(i.studentName || i.student || '').replace(/'/g, '&#39;')}','${(i.title || i.issue || '').replace(/'/g, '&#39;')}')"><i class="fas fa-share"></i> Forward to Coordinator</button>` : ''}
        ${tab === 'escalated' ? `<button style="width:100%;background:none;border:1px dashed var(--color-primary);border-radius:8px;font-weight:600;font-size:12px;color:var(--color-primary);cursor:pointer;padding:8px" onclick="${i._source === 'coordinator' ? 'vpRestoreEscalationIssue' : 'vpRestoreIssue'}('${i.id}')"><i class="fas fa-undo"></i> Restore to Main</button>` : ''}
      </div>
    </div>`;
  }).join('');
  return `<div class="dash-section" id="section-vp_student_issues">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap">
      <h3 style="font-size:18px">Escalated Discipline & Attendance Cases</h3>
      <div style="display:flex;gap:10px;align-items:center">
        <span style="background:rgba(211,47,47,0.1);color:var(--color-danger);padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700">${mainIssues.length} Cases Require Action</span>
        <div style="display:flex;gap:6px">
          <button class="btn-primary" onclick="setVPIssueTab('main')" style="${tab === 'main' ? '' : 'opacity:.75'}">Main</button>
          <button class="btn-primary" onclick="setVPIssueTab('escalated')" style="${tab === 'escalated' ? '' : 'opacity:.75'}">Escalated</button>
          <button class="btn-primary" onclick="setVPIssueTab('resolved')" style="${tab === 'resolved' ? '' : 'opacity:.75'}">Resolved Bin</button>
        </div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px">${cards || `<div class="card"><p style="color:var(--color-text-muted)">No issues in this tab.</p></div>`}</div>
  </div>`;
}

function buildVPTeachers(user) {
  const rows = TEACHERS.map((t, i) => `<tr><td><div class="user-row"><div class="avatar" style="background:${getAvatarColor(i + 3)}">${getInitials(t.name)}</div><div class="user-row-info"><strong>${t.name}</strong><span>${t.id}</span></div></div></td><td>${t.subject}</td><td>${t.classes}</td><td><div class="progress-bar" style="margin-bottom:4px"><div class="progress-fill" style="width:${Math.floor(Math.random() * 20) + 80}%;background:#5ca870"></div></div><span style="font-size:11px;color:var(--color-text-muted)">95% Attendance</span></td><td><div class="progress-bar" style="margin-bottom:4px"><div class="progress-fill" style="width:${Math.floor(Math.random() * 40) + 60}%;background:var(--color-primary)"></div></div><span style="font-size:11px;color:var(--color-text-muted)">Syllabus coverage</span></td><td><span class="badge ${t.status === 'Active' ? 'badge-active' : 'badge-warning'}"><i class="fas fa-check"></i> Marks Uploaded</span></td><td><div style="display:flex;gap:6px"><button style="padding:6px;font-size:12px;border-radius:6px;background:var(--color-surface-2);border:1px solid var(--color-border);cursor:pointer;color:var(--color-text)" title="View Profile" onclick="openStaffProfile('${t.id}', '${t.name.replace(/'/g, "\\'").replace(/"/g, '&quot;')}')"><i class="fas fa-user"></i></button><button style="padding:6px;font-size:12px;border-radius:6px;background:var(--color-surface-2);border:1px solid var(--color-border);cursor:pointer;color:#f57c00" title="Send Reminder" onclick="openVPTeacherReminder('${t.id}', '${t.name.replace(/'/g, "\\'").replace(/"/g, '&quot;')}')"><i class="fas fa-bell"></i></button><button style="padding:6px;font-size:12px;border-radius:6px;background:none;border:1px solid var(--color-danger);cursor:pointer;color:var(--color-danger)" title="Flag Issue" onclick="openVPTeacherFlag('${t.id}', '${t.name.replace(/'/g, "\\'").replace(/"/g, '&quot;')}')"><i class="fas fa-flag"></i></button></div></td></tr>`).join('');
  return `<div class="dash-section" id="section-vp_teachers">
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <div>
          <h3>👨‍🏫 Staff Monitoring & Syllabus Progress</h3>
          <p style="color:var(--color-text-muted);font-size:13px">Track workload and performance across active faculty members.</p>
        </div>
        <button class="btn-primary" onclick="openVPPendingStaffWork()">Review Pending Work</button>
      </div>
      <div style="overflow-x:auto;border-radius:14px"><table class="data-table"><thead><tr><th>Teacher</th><th>Subject</th><th>Classes</th><th>Attendance</th><th>Syllabus</th><th>Marks Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div>
    </div>
  </div>`;
}

window.openStaffProfile = function (id, name) {
  const m = `<div class="modal-overlay" id="staff-profile-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:500px">
      <h3>Faculty Overview: ${name} (${id})</h3>
      <div class="content-grid-equal" style="margin-top:15px;margin-bottom:15px">
        <div class="card" style="padding:15px;background:rgba(25,118,210,0.1);border:1px solid rgba(25,118,210,0.3)">
          <h4 style="color:#1976d2;margin-top:0">Classes Taught</h4>
          <p style="font-size:13px">Average Class Perf: 8.5 GPA<br>Syllabus Tracker: 72% done</p>
        </div>
        <div class="card" style="padding:15px;background:rgba(92,168,112,0.1);border:1px solid rgba(92,168,112,0.3)">
          <h4 style="color:#5ca870;margin-top:0">HR Metrics</h4>
          <p style="font-size:13px">Leaves Taken: 2/14<br>Avg Rating: 4.8/5</p>
        </div>
      </div>
      <button class="btn-primary" style="width:100%" onclick="document.getElementById('staff-profile-modal').remove()">Close Profiler</button>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
};

window.openVPTeacherReminder = function (id, name) {
  const m = `<div class="modal-overlay" id="staff-rem-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:400px">
      <h3>🔔 Push Reminder to ${name}</h3>
      <div class="form-group">
        <label>Reminder Type</label>
        <select class="form-control"><option>Upload Exam Marks</option><option>Submit Syllabus Planner</option><option>Update Attendance</option></select>
        <label style="margin-top:10px">Custom Note (Optional)</label>
        <textarea class="form-control" rows="2" placeholder="e.g. Please finish unit 4 marks..."></textarea>
      </div>
      <button class="btn-primary" style="width:100%;margin-top:15px" onclick="simulateAction('Official reminder blasted to faculty dashboard'); document.getElementById('staff-rem-modal').remove()">Dispatch Reminder</button>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
};

window.openVPTeacherFlag = function (id, name) {
  const m = `<div class="modal-overlay" id="staff-flag-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:450px">
      <h3>🚩 Escalate Administrative Action</h3>
      <p style="font-size:13px;color:var(--color-text-muted)">Flag ${name} for a disciplinary or academic compliance review.</p>
      <div class="form-group">
        <label>Violation / Issue</label>
        <select class="form-control"><option>Continuous Late Arrivals</option><option>Syllabus Behind Schedule</option><option>Unresponsive to Parents</option></select>
        <label style="margin-top:10px">Action Requested</label>
        <select class="form-control"><option>Send Formal Warning</option><option>Schedule Principal Review</option><option>Suspend Classes</option></select>
      </div>
      <button style="width:100%;margin-top:15px;padding:10px;background:var(--color-danger);color:white;border:none;border-radius:8px;font-weight:600;cursor:pointer" onclick="simulateAction('Disciplinary action heavily documented and issued.'); document.getElementById('staff-flag-modal').remove()">Execute Escalation</button>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
};

window.openVPPendingStaffWork = function () {
  const m = `<div class="modal-overlay" id="staff-pending-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:600px;width:100%">
      <h3>📋 System-Wide Pending Staff Audit</h3>
      <ul class="activity-list" style="margin-top:15px">
        <li class="activity-item"><div class="activity-dot" style="background:var(--color-danger)"></div><div class="activity-text"><strong>Ramesh Sharma</strong> hasn't uploaded Mid-Term marks for 10-A (3 days overdue)</div><button class="btn-primary" style="font-size:11px;padding:4px 8px" onclick="simulateAction('Nudged'); this.disabled=true">Nudge</button></li>
        <li class="activity-item"><div class="activity-dot" style="background:#f57c00"></div><div class="activity-text"><strong>Anitha Kumari</strong> syllabus coverage critically low in 9-B Physics</div><button class="btn-primary" style="font-size:11px;padding:4px 8px" onclick="simulateAction('Meeting Set'); this.disabled=true">Set Meeting</button></li>
      </ul>
      <button class="btn-primary" style="width:100%;margin-top:20px;background:var(--color-surface-2);color:var(--color-text);border:1px solid var(--color-border)" onclick="document.getElementById('staff-pending-modal').remove()">Close Viewer</button>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
};

function buildVPSchedule(user) {
  const view = localStorage.getItem('vp_schedule_view') || 'today';
  
  if (view === 'week') {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const times = Object.keys(WEEKLY_SCHEDULE);
    
    let gridHTML = `<div class="card" style="grid-column: 1 / -1">
      <p style="color:var(--color-text-muted);margin-bottom:16px;font-size:13px">Full Weekly Academic Grid - Class 10A View</p>
      <div style="overflow-x:auto">
        <table class="data-table" style="text-align:center">
          <thead>
            <tr><th>Time</th>${days.map(d => `<th>${d}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${times.map(t => `
              <tr>
                <td style="font-weight:700">${t}</td>
                ${days.map(d => {
                  const sub = WEEKLY_SCHEDULE[t][d];
                  const color = sub === 'LUNCH' ? '#999' : (sub === 'Math' ? '#5ca870' : (sub === 'Science' ? '#f57c00' : '#1976d2'));
                  return `<td><span class="badge" style="background:${color};color:white;width:80px;display:inline-block">${sub}</span></td>`;
                }).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>`;

    return `<div class="dash-section" id="section-vp_schedule">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap">
        <h3>📅 Institutional Timetable Review</h3>
        <div style="display:flex;gap:10px">
          <div style="display:flex;gap:6px">
            <button class="btn-primary" onclick="setVPScheduleView('today')" style="opacity:.75">Today</button>
            <button class="btn-primary" onclick="setVPScheduleView('week')">Week</button>
          </div>
          <button class="btn-primary" style="padding:8px 16px" onclick="openEditTimetableMode()"><i class="fas fa-edit"></i> Edit Timetable</button>
        </div>
      </div>
      <div class="content-grid">${gridHTML}</div>
    </div>`;
  }

  const shown = SCHEDULE.slice(0, Math.min(SCHEDULE.length, 5));
  return `<div class="dash-section" id="section-vp_schedule">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap">
      <h3>📅 Institutional Timetable Review</h3>
      <div style="display:flex;gap:10px">
        <div style="display:flex;gap:6px">
          <button class="btn-primary" onclick="setVPScheduleView('today')">Today</button>
          <button class="btn-primary" onclick="setVPScheduleView('week')" style="opacity:.75">Week</button>
        </div>
        <button class="btn-primary" style="padding:8px 16px" onclick="openEditTimetableMode()"><i class="fas fa-edit"></i> Edit Timetable</button>
      </div>
    </div>
    <div class="content-grid">
      <div class="card" style="grid-column: 1 / -1">
        <p style="color:var(--color-text-muted);margin-bottom:16px;font-size:13px">Institutional Schedule Overseer (${view === 'today' ? 'Today' : 'Full Week – Class 9C'})</p>
        <div style="overflow-x:auto">
          <table class="data-table">
            <thead>
              <tr><th>Time</th><th>Subject</th><th>Class</th><th>Teacher</th><th>Room</th><th>Actions</th></tr>
            </thead>
            <tbody>
              ${shown.map(s => `<tr>
                <td>${s.time}</td>
                <td><span class="badge" style="background:${s.color};color:white">${s.subject}</span></td>
                <td>${s.class}</td>
                <td>${s.teacher}</td>
                <td>${s.room}</td>
                <td>
                  <button class="btn-primary" style="padding:4px 8px;font-size:11px" onclick="openAssignSubModal('${s.teacher}', '${s.time} ${s.subject} for ${s.class}')">Sub Assignment</button>
                </td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div class="card" style="margin-bottom:20px;border-left:4px solid ${localStorage.getItem('vp_sub_assigned') ? 'var(--color-success)' : 'var(--color-danger)'}">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <h4 style="color:${localStorage.getItem('vp_sub_assigned') ? 'var(--color-success)' : 'var(--color-danger)'}">${localStorage.getItem('vp_sub_assigned') ? '✅ Resolved: Substitute Assigned' : '⚠️ Missing Period Alert'}</h4>
            <span class="badge ${localStorage.getItem('vp_sub_assigned') ? 'badge-success' : 'badge-danger'}">${localStorage.getItem('vp_sub_assigned') ? 'Resolved' : 'High'}</span>
          </div>
          <p style="font-size:13px;color:var(--color-text-muted)">Anita Pillai is on leave today. Period 3 English for 8-B needs a substitute.</p>
          <button class="btn-primary" style="margin-top:12px;width:100%;font-size:13px" onclick="openAssignSubModal('Anita Pillai', 'Period 3 English for 8-B')">Assign Substitute</button>
        </div>
        <div class="card" style="border-left:4px solid #f57c00">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <h4 style="color:#f57c00">⚖️ Free Period Imbalance</h4>
            <span class="badge badge-warning">Review</span>
          </div>
          <p style="font-size:13px;color:var(--color-text-muted)">Mohan Das has 3 consecutive free periods today. Ramesh Sharma has 0 free periods.</p>
          <button style="margin-top:12px;width:100%;font-size:13px;padding:8px;border-radius:8px;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer" onclick="openAdjAllocModal()">Adjust Allocation</button>
        </div>
      </div>
    </div>
  </div>`;
}

function buildVPExams(user) {
  const filterClass = localStorage.getItem('results_filter_class') || 'All';
  const data = JSON.parse(localStorage.getItem('campuscore_results') || '[]');
  const filtered = filterClass === 'All' ? data : data.filter(r => r.class === filterClass);

  const rows = filtered.map(r => `
    <tr>
      <td><strong>${r.class}</strong></td>
      <td>${r.subject}</td>
      <td><span class="badge ${r.status === 'Published' ? 'badge-active' : 'badge-pending'}">${r.status}</span></td>
      <td>${r.date}</td>
      <td>
        <div style="display:flex;gap:6px">
          ${r.status !== 'Published' ? `<button class="btn-primary" style="padding:4px 8px;font-size:11px;background:var(--color-success);border:none" onclick="approveExamResult('${r.class}', '${r.subject}')">Approve</button>` : ''}
          <button class="btn-primary" style="padding:4px 8px;font-size:11px" onclick="openPerformanceReport('${r.class}', '${r.subject}')">Report</button>
          <button style="padding:4px 8px;font-size:11px;background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:4px;cursor:pointer;color:var(--color-text)" onclick="openExamPlan('${r.class}')">Plan</button>
        </div>
      </td>
    </tr>
  `).join('');

  return `<div class="dash-section" id="section-vp_exams">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:15px">
      <h3>📝 Mid-Term Exam & Results Authority</h3>
      <div style="display:flex;gap:10px">
        <select id="res-class-filter" onchange="setResultsFilter(this.value)" style="padding:8px 12px;border-radius:8px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text);outline:none">
            <option value="All" ${filterClass === 'All' ? 'selected' : ''}>All Classes</option>
            <option value="10A" ${filterClass === '10A' ? 'selected' : ''}>10A</option>
            <option value="9C" ${filterClass === '9C' ? 'selected' : ''}>9C</option>
            <option value="8B" ${filterClass === '8B' ? 'selected' : ''}>8B</option>
        </select>
        <button class="btn-primary" style="padding:8px 16px" onclick="openExamPlan('All')"><i class="fas fa-calendar-alt"></i> Global Exam Plan</button>
      </div>
    </div>
    <div class="card">
      <div style="overflow-x:auto;border-radius:14px"><table class="data-table"><thead><tr><th>Class</th><th>Subject</th><th>Status</th><th>Updated</th><th>Action</th></tr></thead><tbody>${rows || '<tr><td colspan="5" style="text-align:center;padding:20px">No result records found.</td></tr>'}</tbody></table></div>
    </div>
  </div>`;
}

function setResultsFilter(v) {
  localStorage.setItem('results_filter_class', v);
  triggerLiveReRender();
}

window.approveExamResult = function (cls, subj) {
  let res = JSON.parse(localStorage.getItem('campuscore_results') || '[]');
  const idx = res.findIndex(r => r.class === cls && r.subject === subj);
  if (idx !== -1) {
    res[idx].status = 'Published';
    localStorage.setItem('campuscore_results', JSON.stringify(res));
    simulateAction('Performance results for ' + cls + ' ' + subj + ' approved & published!');
    triggerLiveReRender();
  }
};
// Functions now handled at bottom of file for single source of truth

function buildVPReports(user) {
  return `<div class="dash-section" id="section-vp_reports">
    <div class="card" style="margin-bottom:20px">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap">
        <h3><i class="fas fa-chart-line" style="color:var(--color-primary);margin-right:10px"></i> Analytical Reports Hub</h3>
        <div style="display:flex;gap:10px;margin-top:10px">
          <select style="padding:8px 12px;border-radius:8px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text);outline:none"><option>All Classes (6-10)</option><option>Class 10</option><option>Class 9</option></select>
          <select style="padding:8px 12px;border-radius:8px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text);outline:none"><option>Last 30 Days</option><option>This Semester</option><option>All Time</option></select>
          <button class="btn-primary" style="padding:8px 16px" onclick="simulateAction('PDF report generated and ready to download.')"><i class="fas fa-file-pdf"></i> Export PDF</button>
          <button style="padding:8px 16px;border-radius:8px;background:var(--color-surface);border:1px solid var(--color-border);color:var(--color-text);font-weight:600;cursor:pointer" onclick="simulateAction('Excel sheet exported successfully.')"><i class="fas fa-file-excel"></i> Excel</button>
        </div>
      </div>
    </div>
    <div class="content-grid-equal">
      <div class="card" style="text-align:center;padding:40px 20px;border-top:4px solid var(--color-primary)">
        <i class="fas fa-user-check" style="font-size:32px;color:var(--color-primary);margin-bottom:16px"></i>
        <h4 style="margin-bottom:8px">Attendance Reports</h4>
        <p style="font-size:12px;color:var(--color-text-muted);margin-bottom:16px">Generate class-wise and teacher attendance comparisons.</p>
        <button class="btn-primary" style="font-size:12px;padding:8px 16px" onclick="navigateTo('vp_attendance')">Open Module</button>
      </div>
      <div class="card" style="text-align:center;padding:40px 20px;border-top:4px solid #f57c00">
        <i class="fas fa-chart-bar" style="font-size:32px;color:#f57c00;margin-bottom:16px"></i>
        <h4 style="margin-bottom:8px">Academic & Exam Reports</h4>
        <p style="font-size:12px;color:var(--color-text-muted);margin-bottom:16px">Class performance comparisons, subject averages.</p>
        <button class="btn-primary" style="font-size:12px;padding:8px 16px">Open Module</button>
      </div>
      <div class="card" style="text-align:center;padding:40px 20px;border-top:4px solid var(--color-danger)">
        <i class="fas fa-balance-scale" style="font-size:32px;color:var(--color-danger);margin-bottom:16px"></i>
        <h4 style="margin-bottom:8px">Discipline Reports</h4>
        <p style="font-size:12px;color:var(--color-text-muted);margin-bottom:16px">Track incidents across sections and escalate to Admin.</p>
        <button class="btn-primary" style="font-size:12px;padding:8px 16px" onclick="navigateTo('vp_student_issues')">Open Module</button>
      </div>
    </div>
  </div>`;
}

function buildVPApprovals(user) {
  console.log('[CampusCore] Rendering Approvals section...');
  
  // Guard against undefined data
  if (typeof VP_APPROVALS === 'undefined') {
    console.warn('[CampusCore] VP_APPROVALS is undefined, using empty fallback');
    return `<div class="dash-section" id="section-vp_approvals"><div class="card"><p>No approval data available.</p></div></div>`;
  }

  const localComments = window.CCStorage 
    ? CCStorage.getItem('approval_comments', user.role, user.id, {})
    : JSON.parse(localStorage.getItem('cc_approval_comments') || '{}');

  const rows = VP_APPROVALS.map(a => {
    const comment = localComments[a.id] || a.comment;
    return `<tr>
    <td><span style="font-weight:700;color:var(--color-text)">${a.id}</span></td>
    <td><span class="badge badge-info">${a.type}</span></td>
    <td style="color:var(--color-text-muted);font-size:13px">${a.desc}</td>
    <td style="color:var(--color-text)">${a.date}</td>
    <td><span class="badge ${a.status === 'Pending' ? 'badge-pending' : 'badge-active'}">${a.status}</span></td>
    <td>
      ${comment ? `<div style="font-size:11px;color:var(--color-primary);margin-bottom:6px;font-weight:600"><i class="fas fa-comment-dots"></i> ${comment}</div>` : ''}
      ${a.status === 'Pending' ? `<div style="display:flex;gap:6px">
      <button class="btn-primary" style="padding:6px 12px;font-size:12px" onclick="approveApprovalItem('${a.id}')">Approve</button>
      <button style="padding:6px 12px;font-size:12px;background:none;border:1px solid var(--color-danger);color:var(--color-danger);border-radius:6px;cursor:pointer" onclick="rejectApprovalItem('${a.id}')">Reject</button>
      <button style="padding:6px 8px;font-size:12px;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:6px;cursor:pointer" title="Add Comment / Forward Upward" onclick="openApprovalCommentModal('${a.id}')"><i class="fas fa-comment-alt"></i></button>
    </div>` : `<div style="font-size:11px;color:var(--color-text-muted)">Resolved</div>`}
    </td>
  </tr>`}).join('');
  return `<div class="dash-section" id="section-vp_approvals">
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap">
        <div>
          <h3>✅ Logistics & Administrative Approvals</h3>
          <p style="color:var(--color-text-muted);font-size:13px">Review pending requests from staff and coordinators.</p>
        </div>
        <div style="display:flex;gap:10px">
          <select style="padding:6px 12px;border-radius:8px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text);outline:none"><option>All Approvals</option><option>Leave Requests</option><option>Timetable Changes</option><option>Notices</option><option>Exams/Results</option><option>Events</option></select>
        </div>
      </div>
      <div style="overflow-x:auto;border-radius:14px"><table class="data-table"><thead><tr><th>Req ID</th><th>Type</th><th>Details</th><th>Date</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div>
    </div>
  </div>`;
}

function buildVPMessages(user) {

  // Ensure we have a persistent message store
  let activeMessages = JSON.parse(localStorage.getItem('campuscore_vp_msgs')) || VP_MESSAGES.map((m, i) => ({ ...m, _id: i, replies: [] }));

  const list = activeMessages.map((m, index) => `
  <div class="card" style="margin-bottom:12px;border:${m.unread ? '1px solid var(--color-primary)' : '1px solid var(--color-border)'};position:relative;padding-left:${m.unread ? '30px' : '24px'}">
    ${m.unread ? '<div style="position:absolute;left:12px;top:28px;width:8px;height:8px;border-radius:50%;background:var(--color-primary)"></div>' : ''}
    <div style="display:flex;justify-content:space-between;margin-bottom:6px">
      <strong style="color:var(--color-text)">${m.sender} <span style="font-size:10px;background:var(--color-surface-2);border:1px solid var(--color-border);padding:2px 6px;border-radius:4px;margin-left:6px">${m.sender.includes('Parent') ? 'Urgent Alert' : m.sender.includes('Coord') ? 'Coordinator' : 'Staff'}</span></strong>
      <span style="font-size:11px;color:var(--color-text-muted)">${m.time}</span>
    </div>
    <div style="font-weight:${m.unread ? '700' : '500'};margin-bottom:8px;font-size:15px;color:var(--color-text)">${m.subject}</div>
    <p style="font-size:13px;color:var(--color-text-light);line-height:1.4">${m.content}</p>
    
    ${m.replies && m.replies.length > 0 ? `<div style="margin-top:10px;padding-left:15px;border-left:2px solid var(--color-primary)">` + m.replies.map(r => `<div style="font-size:12px;color:var(--color-text-muted)"><strong style="color:var(--color-text)">${r.sender} (${r.time})</strong>: ${r.content}</div>`).join('') + `</div>` : ''}
    
    <div style="margin-top:12px;display:flex;gap:10px">
      <button style="padding:6px 14px;border-radius:6px;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;font-size:12px;font-weight:600" onclick="document.getElementById('reply-box-${index}').style.display='block';"><i class="fas fa-reply"></i> Reply</button>
      <button style="padding:6px 14px;border-radius:6px;background:none;border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;font-size:12px;font-weight:600" onclick="openMsgForwardModal('${m.subject}', '${m.sender}')"><i class="fas fa-share"></i> Forward</button>
    </div>
    <div id="reply-box-${index}" style="display:none;margin-top:12px;padding-top:12px;border-top:1px dashed var(--color-border)">
        <textarea id="reply-text-${index}" class="form-control" rows="2" placeholder="Type your reply here..." style="font-size:12px;resize:none;margin-bottom:8px"></textarea>
        <div style="display:flex;gap:10px">
            <button class="btn-primary" style="padding:6px 16px;font-size:12px" onclick="sendMsgReply(${index})">Send Reply</button>
            <button style="background:none;border:none;color:var(--color-text-muted);cursor:pointer;font-size:12px" onclick="document.getElementById('reply-box-${index}').style.display='none'">Cancel</button>
        </div>
    </div>
  </div>`).join('');

  return `<div class="dash-section" id="section-vp_messages">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap">
      <h3 style="color:var(--color-text)">✉️ Direct Communications Inbox</h3>
      <div style="display:flex;gap:10px">
        <button class="btn-primary" onclick="openBroadcastModal()"><i class="fas fa-bullhorn"></i> Broadcast to Staff</button>
        <button class="btn-primary" onclick="openNewMessageModal()"><i class="fas fa-pen"></i> New Message</button>
      </div>
    </div>
    <div>${list}</div>
  </div>`;
}

function getAccountStorageKeyByUser(userObj) {
  const accountId = String((userObj && userObj.username) || '').toUpperCase();
  return `campuscore_account_password_${accountId}`;
}
function getEffectivePasswordForUser(userObj) {
  const key = getAccountStorageKeyByUser(userObj);
  const stored = localStorage.getItem(key);
  if (stored) return stored;
  const inDemo = (DEMO_USERS || []).find(u => String(u.username).toUpperCase() === String(userObj.username).toUpperCase());
  return (inDemo && inDemo.password) || 'PARENT123';
}
function openGenericAccountPasswordModal() {
  if (!currentUser) return;
  const modalHTML = `
  <div id="generic-pass-modal" class="modal-overlay" onclick="if(event.target.id==='generic-pass-modal') closeGenericAccountPasswordModal()">
    <div class="modal-content" onclick="event.stopPropagation()">
      <div class="modal-header"><h3>Change Password</h3><button class="modal-close" onclick="closeGenericAccountPasswordModal()">×</button></div>
      <div class="modal-body">
        <input id="gp-cur" class="form-control" placeholder="Current password" type="password" />
        <input id="gp-new" class="form-control" placeholder="New password" type="password" />
        <input id="gp-con" class="form-control" placeholder="Confirm password" type="password" />
        <button class="btn-primary" style="width:100%;margin-top:10px" onclick="saveGenericAccountPassword()">Save</button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}
function closeGenericAccountPasswordModal() { const m = document.getElementById('generic-pass-modal'); if (m) m.remove(); }
function saveGenericAccountPassword() {
  if (!currentUser) return;
  const cur = (document.getElementById('gp-cur') || {}).value || '';
  const n = (document.getElementById('gp-new') || {}).value || '';
  const c = (document.getElementById('gp-con') || {}).value || '';
  const expected = getEffectivePasswordForUser(currentUser);
  if (String(cur).toUpperCase() !== String(expected).toUpperCase()) return simulateAction('Current password is incorrect');
  if (!n || n.length < 4) return simulateAction('New password is too short');
  if (n !== c) return simulateAction('Confirm password does not match');
  localStorage.setItem(getAccountStorageKeyByUser(currentUser), n);
  const idx = (DEMO_USERS || []).findIndex(u => String(u.username).toUpperCase() === String(currentUser.username).toUpperCase());
  if (idx >= 0) DEMO_USERS[idx].password = n;
  closeGenericAccountPasswordModal();
  simulateAction('Password updated successfully');
}

function openGenericProfileModal() {
  if (!currentUser) return;
  const modalHTML = `
  <div id="generic-profile-modal" class="modal-overlay" onclick="if(event.target.id==='generic-profile-modal') closeGenericProfileModal()">
    <div class="modal-content" onclick="event.stopPropagation()">
      <div class="modal-header"><h3>Edit Profile</h3><button class="modal-close" onclick="closeGenericProfileModal()">×</button></div>
      <div class="modal-body">
        <label>Full Name</label><input id="gprof-name" class="form-control" value="${currentUser.name || ''}" />
        <label>Email</label><input id="gprof-email" class="form-control" value="${currentUser.email || ''}" />
        <label>Phone</label><input id="gprof-phone" class="form-control" value="${currentUser.phone || ''}" />
        <label>Department</label><input id="gprof-dept" class="form-control" value="${currentUser.department || ''}" />
        <button class="btn-primary" style="width:100%;margin-top:10px" onclick="saveGenericProfile()">Save</button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}
function closeGenericProfileModal() { const m = document.getElementById('generic-profile-modal'); if (m) m.remove(); }
function saveGenericProfile() {
  if (!currentUser) return;
  currentUser.name = (document.getElementById('gprof-name') || {}).value || currentUser.name;
  currentUser.email = (document.getElementById('gprof-email') || {}).value || currentUser.email;
  currentUser.phone = (document.getElementById('gprof-phone') || {}).value || currentUser.phone;
  currentUser.department = (document.getElementById('gprof-dept') || {}).value || currentUser.department;
  const idx = (DEMO_USERS || []).findIndex(u => String(u.username).toUpperCase() === String(currentUser.username).toUpperCase());
  if (idx >= 0) DEMO_USERS[idx] = { ...DEMO_USERS[idx], ...currentUser };
  try { sessionStorage.setItem('cc_user', JSON.stringify(currentUser)); } catch (e) { }
  closeGenericProfileModal();
  buildSidebar(currentUser);
  buildDashboard(currentUser);
  navigateTo('settings');
  simulateAction('Profile updated');
}

function openGenericLanguageModal() {
  if (!currentUser) return;
  const set = getSettings(currentUser.id);
  const modalHTML = `
  <div id="generic-lang-modal" class="modal-overlay" onclick="if(event.target.id==='generic-lang-modal') closeGenericLanguageModal()">
    <div class="modal-content" onclick="event.stopPropagation()">
      <div class="modal-header"><h3>Language Preference</h3><button class="modal-close" onclick="closeGenericLanguageModal()">×</button></div>
      <div class="modal-body">
        <select id="generic-lang-select" class="form-control">
          <option ${set.language === 'English' ? 'selected' : ''}>English</option>
          <option ${set.language === 'Hindi' ? 'selected' : ''}>Hindi</option>
          <option ${set.language === 'Telugu' ? 'selected' : ''}>Telugu</option>
        </select>
        <button class="btn-primary" style="width:100%;margin-top:10px" onclick="saveGenericLanguage()">Save</button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}
function closeGenericLanguageModal() { const m = document.getElementById('generic-lang-modal'); if (m) m.remove(); }
function saveGenericLanguage() {
  if (!currentUser) return;
  const lang = (document.getElementById('generic-lang-select') || {}).value || 'English';
  
  if (typeof setSystemLanguage === 'function') {
    setSystemLanguage(lang);
  } else {
    localStorage.setItem('cc_sys_lang', lang);
    triggerLiveReRender();
  }
  
  closeGenericLanguageModal();
}

/* ━━━━ TEACHER EXCEL ACTIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function downloadMarksTemplate() {
  simulateAction('Generating Excel Template...');
  const headers = "Roll No,Student Name,Subject,Max Marks,Marks Obtained,Grade,Comments\n";
  const demoRows = STUDENTS.slice(0, 10).map(s => `${s.roll},${s.name},Mathematics,100,,,`).join("\n");
  const csvContent = "data:text/csv;charset=utf-8," + headers + demoRows;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "marks_upload_template.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function openTeacherMarksUpload() {
  const m = `<div class="modal-overlay" id="marks-upload-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
        <div class="modal" style="max-width:450px">
            <h3>📤 Bulk Marks Upload</h3>
            <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:20px">Upload your completed CSV/Excel template.</p>
            <div style="border:2px dashed var(--color-border);padding:30px;text-align:center;border-radius:12px;cursor:pointer;margin-bottom:20px" onclick="simulateAction('File selection opened...')">
                <i class="fas fa-file-excel" style="font-size:32px;color:#1d6f42;margin-bottom:12px"></i>
                <div>Drop marks.csv here or click to browse</div>
            </div>
            <div style="display:flex;gap:10px">
                <button class="btn-primary" style="flex:1" onclick="submitMarksUpload()">Process & Upload</button>
                <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:8px" onclick="document.getElementById('marks-upload-modal').remove()">Cancel</button>
            </div>
        </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

function submitMarksUpload() {
  simulateAction('Parsing file... Validating student records...');
  setTimeout(() => {
    simulateAction('Success! Marks for Class 9-C updated.');
    document.getElementById('marks-upload-modal').remove();
    triggerLiveReRender();
  }, 1500);
}


function downloadGenericUserData() {
  if (!currentUser) return;
  const payload = {
    user: currentUser,
    settings: getSettings(currentUser.id),
    sharedIssues: (GLOBAL_ISSUES || []).filter(i => String(i.reporterId || '').toUpperCase() === String(currentUser.username || '').toUpperCase()),
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `campuscore_${(currentUser.role || 'user')}_${currentUser.username}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  simulateAction('Data archive download started.');
}

/* ━━━━ COORDINATOR MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildCoordHome(user) {
  const cfg = ROLE_HOME[user.role] || { stats: [] };
  const firstName = (user.name || 'Coordinator').split(' ')[0];
  const stats = (cfg.stats || []).map(s => `
    <div class="stat-card">
      <div class="stat-card-icon">${s.icon}</div>
      <div class="stat-value">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>`).join('');
  const quick = [
    { label: 'Class Overview', target: 'coord_classes', icon: 'fa-sitemap', color: '#1976d2' },
    { label: 'Issue Inbox', target: 'coord_issues', icon: 'fa-exclamation-circle', color: '#f57c00' },
    { label: 'Timetable', target: 'vp_schedule', icon: 'fa-calendar-alt', color: '#5ca870' },
    { label: 'Notices', target: 'announcements', icon: 'fa-bullhorn', color: '#8b5cf6' },
  ].map(q => `<button class="quick-action-btn" onclick="navigateTo('${q.target}')"><div class="qa-icon" style="background:${q.color}"><i class="fas ${q.icon}"></i></div><span class="qa-label">${q.label}</span></button>`).join('');
  return `<div class="dash-section active" id="section-home">
    <div class="welcome-banner">
      <div class="welcome-greeting">${getGreeting()}, ${firstName}!</div>
      <div class="welcome-sub">Coordinator dashboard · ${getFormattedDate()}</div>
    </div>
    <div class="stats-grid">${stats}</div>
    <div class="card"><h3>⚡ Quick Actions</h3><div class="quick-actions">${quick}</div></div>
  </div>`;
}

function buildCoordClasses() {
  const rows = STUDENTS.filter(s => String(s.class).startsWith('9-')).map((s, i) => `<tr>
    <td><div class="user-row"><div class="avatar" style="background:${getAvatarColor(i)}">${getInitials(s.name)}</div><div class="user-row-info"><strong>${s.name}</strong><span>${s.admNo}</span></div></div></td>
    <td>${s.class}</td><td>${s.roll}</td><td>${s.attendance}%</td><td>${s.gpa}</td>
  </tr>`).join('');
  return `<div class="dash-section" id="section-coord_classes">
    <div class="card"><h3>🏫 Class Overview (Grade 9)</h3>
      <div style="overflow-x:auto;border-radius:14px"><table class="data-table"><thead><tr><th>Student</th><th>Class</th><th>Roll</th><th>Attendance</th><th>GPA</th></tr></thead><tbody>${rows || `<tr><td colspan="5" style="text-align:center;color:var(--color-text-muted)">No students found.</td></tr>`}</tbody></table></div>
    </div>
  </div>`;
}

function buildCoordIssues() {
  const store = getEscalationStore();
  const issues = store.coordinatorInbox.slice().sort((a, b) => new Date(b.escalatedDate || b.registeredDate || 0) - new Date(a.escalatedDate || a.registeredDate || 0));
  const cards = issues.map(i => `<div class="card" style="margin-bottom:10px">
    <div style="display:flex;justify-content:space-between;gap:10px;align-items:center"><strong>${i.id} · ${i.studentName}</strong><span class="badge badge-warning">${i.status}</span></div>
    <div style="font-size:12px;color:var(--color-text-muted)">${i.class} · ${i.category} · ${i.priority}</div>
    <div style="font-size:12px;color:var(--color-text-muted);margin-top:4px">Escalated by: ${i.escalatedByTeacher || '-'} · ${i.escalatedDate || '-'}</div>
    <div style="font-size:12px;color:var(--color-text-light);margin-top:4px">Reason: ${i.escalationReason || '-'}</div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">
      <button class="btn-primary" style="padding:6px 10px;font-size:12px" onclick="openCoordReplyModal('${i.id}')">Reply to Teacher</button>
      <button class="btn-primary" style="padding:6px 10px;font-size:12px;background:var(--color-success);border-color:var(--color-success)" onclick="openCoordResolveModal('${i.id}')">Resolve</button>
      <button class="btn-primary" style="padding:6px 10px;font-size:12px;background:var(--color-danger);border-color:var(--color-danger)" onclick="openCoordEscalateVPModal('${i.id}')">Escalate to VP</button>
      <button class="btn-primary" style="padding:6px 10px;font-size:12px" onclick="openEscalationTimelineModal('${i.id}')">View Full Timeline</button>
    </div>
  </div>`).join('');
  return `<div class="dash-section" id="section-coord_issues">
    <div class="card"><h3>⚠️ Escalated Issues</h3>${cards || `<p style="color:var(--color-text-muted)">No coordinator issues pending.</p>`}</div>
  </div>`;
}

function openCoordReplyModal(issueId) {
  const html = `<div class="modal-overlay" id="coord-reply-modal" style="display:flex" onclick="if(event.target===this) this.remove()"><div class="modal" style="max-width:500px;width:100%"><h3 style="margin-top:0">Reply to Teacher</h3><textarea id="coord-reply-text" class="form-control" rows="4"></textarea><div style="display:flex;gap:10px;margin-top:10px"><button class="btn-primary" style="flex:1" onclick="confirmCoordReply('${issueId}')">Send Reply</button><button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('coord-reply-modal').remove()">Cancel</button></div></div></div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

function confirmCoordReply(issueId) {
  const txt = (document.getElementById('coord-reply-text') || {}).value || '';
  if (!txt.trim()) return simulateAction('Reply cannot be empty');
  const store = getEscalationStore();
  const issue = store.coordinatorInbox.find(i => String(i.id) === String(issueId));
  if (!issue) return;
  issue.timeline = issue.timeline || [];
  issue.timeline.push({ action: 'Reply to Teacher', by: (currentUser && currentUser.name) || 'Coordinator', role: 'Coordinator', date: new Date().toLocaleString(), note: txt.trim() });
  saveEscalationStore(store);
  const m = document.getElementById('coord-reply-modal'); if (m) m.remove();
  simulateAction('Reply sent to teacher');
  triggerLiveReRender();
  navigateTo('coord_issues');
}

function openCoordResolveModal(issueId) {
  const html = `<div class="modal-overlay" id="coord-resolve-modal" style="display:flex" onclick="if(event.target===this) this.remove()"><div class="modal" style="max-width:500px;width:100%"><h3 style="margin-top:0">Resolve Issue</h3><textarea id="coord-resolve-note" class="form-control" rows="4"></textarea><div style="display:flex;gap:10px;margin-top:10px"><button class="btn-primary" style="flex:1;background:var(--color-success);border-color:var(--color-success)" onclick="confirmCoordResolve('${issueId}')">Resolve</button><button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('coord-resolve-modal').remove()">Cancel</button></div></div></div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

function confirmCoordResolve(issueId) {
  const note = (document.getElementById('coord-resolve-note') || {}).value || '';
  if (!note.trim()) return simulateAction('Resolution note required');
  const store = getEscalationStore();
  const idx = store.coordinatorInbox.findIndex(i => String(i.id) === String(issueId));
  if (idx < 0) return;
  const issue = store.coordinatorInbox.splice(idx, 1)[0];
  issue.status = 'Resolved by Coordinator';
  issue.stage = 'resolved';
  issue.timeline = issue.timeline || [];
  issue.timeline.push({ action: 'Resolved by Coordinator', by: (currentUser && currentUser.name) || 'Coordinator', role: 'Coordinator', date: new Date().toLocaleString(), note: note.trim() });
  store.resolvedIssues.unshift(issue);
  saveEscalationStore(store);
  const m = document.getElementById('coord-resolve-modal'); if (m) m.remove();
  simulateAction('Issue resolved');
  triggerLiveReRender();
  navigateTo('coord_issues');
}

function openCoordEscalateVPModal(issueId) {
  const html = `<div class="modal-overlay" id="coord-vp-modal" style="display:flex" onclick="if(event.target===this) this.remove()"><div class="modal" style="max-width:500px;width:100%"><h3 style="margin-top:0">Escalate to VP</h3><textarea id="coord-vp-reason" class="form-control" rows="4" placeholder="Reason"></textarea><div style="display:flex;gap:10px;margin-top:10px"><button class="btn-primary" style="flex:1;background:var(--color-danger);border-color:var(--color-danger)" onclick="confirmCoordEscalateVP('${issueId}')">Confirm Escalation</button><button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('coord-vp-modal').remove()">Cancel</button></div></div></div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

function confirmCoordEscalateVP(issueId) {
  const reason = (document.getElementById('coord-vp-reason') || {}).value || '';
  if (!reason.trim()) return simulateAction('Escalation reason is required');
  const store = getEscalationStore();
  const idx = store.coordinatorInbox.findIndex(i => String(i.id) === String(issueId));
  if (idx < 0) return;
  const issue = store.coordinatorInbox.splice(idx, 1)[0];
  issue.escalatedByCoordinator = `${(currentUser && currentUser.name) || 'Anitha'} (Coordinator)`;
  issue.escalatedDate = new Date().toLocaleString();
  issue.escalationReason = reason.trim();
  issue.stage = 'vp';
  issue.status = 'Escalated to VP';
  issue.timeline = issue.timeline || [];
  issue.timeline.push({ action: 'Escalated to VP', by: issue.escalatedByCoordinator, role: 'Coordinator', date: issue.escalatedDate, note: `Reason: ${reason.trim()}` });
  store.vpEscalated.unshift(issue);
  saveEscalationStore(store);
  const m = document.getElementById('coord-vp-modal'); if (m) m.remove();
  simulateAction('Issue escalated to VP');
  triggerLiveReRender();
  navigateTo('coord_issues');
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEACHER EXCLUSIVE MODULES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function buildTeacherHome(user) {
  const cfg = ROLE_HOME[user.role];
  const dateStr = getFormattedDate();
  const firstName = user.name.split(' ')[0];

  const stats = (cfg.stats || []).map(s => `
    <div class="stat-card">
      <div class="stat-card-icon">${s.icon}</div>
      <div class="stat-value">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>`).join('');

  const qaItems = [
    { icon: 'fa-clipboard-check', label: 'Mark Attendance', color: '#5ca870', target: 'teacher_attendance' },
    { icon: 'fa-book', label: 'Assign Homework', color: '#1976d2', target: 'teacher_homework' },
    { icon: 'fa-pen', label: 'Upload Marks', color: '#f57c00', target: 'teacher_results' },
    { icon: 'fa-calendar-alt', label: 'Open Timetable', color: '#8b5cf6', target: 'teacher_schedule' },
  ];
  const quickActions = qaItems.map(qa => {
    // FIX: Redirect shortcuts for SuperAdmin if they point to role-specific sections
    let finalTarget = qa.target;
    if (user.role === 'apaaas' || user.username === 'APAAAS') {
      if (qa.target === 'announcements') finalTarget = 'all_notices';
      if (qa.target === 'vp_approvals') finalTarget = 'all_approvals';
    }
    return `<button class="quick-action-btn" onclick="navigateTo('${finalTarget}')"><div class="qa-icon" style="background:${qa.color}"><i class="fas ${qa.icon}"></i></div><span class="qa-label">${qa.label}</span></button>`;
  }).join('');

  const notices = ANNOUNCEMENTS.slice(0, 3).map(a => {
    const col = a.category === 'Academic' ? '#1976d2' : '#5ca870';
    return `<li class="activity-item" style="cursor:pointer" onclick="navigateTo('announcements')">
      <div class="activity-dot" style="background:${col}"></div>
      <div class="activity-text"><strong style="color:var(--color-text)">${a.title}</strong><br><span style="font-size:11px;color:var(--color-text-muted)">${a.date} · ${a.author}</span></div>
      <span class="badge" style="background:${col};font-size:10px;padding:3px 8px">${a.category}</span>
    </li>`;
  }).join('');

  const schedulePreview = SCHEDULE.filter(s => s.teacher === user.name).map(s => `
    <div class="schedule-item">
      <div class="schedule-time">${s.time}</div>
      <div class="schedule-bar" style="background:${s.color}"></div>
      <div class="schedule-info"><div class="schedule-subject">${s.subject} <span style="font-size:10px;background:var(--color-surface-2);padding:2px 6px;border-radius:4px;border:1px solid var(--color-border)">${s.class}</span></div></div>
      <div class="schedule-room">${s.room}</div>
    </div>`).join('');

  return `<div class="dash-section active" id="section-home">
    <div class="welcome-banner">
      <div class="welcome-greeting">${getGreeting()}, ${firstName}!</div>
      <div class="welcome-sub">${(cfg.subtitle || 'Your classes and tasks for today.')} · ${dateStr}</div>
    </div>
    <div class="stats-grid">${stats}</div>
    <div class="card"><h3>⚡ Quick Links</h3><div class="quick-actions">${quickActions}</div></div>
    <div class="content-grid">
      <div class="card"><h3>📅 My Schedule Today</h3>${schedulePreview || '<p style="color:var(--color-text-muted)">No classes scheduled.</p>'}</div>
      <div class="card" style="border-left:4px solid var(--color-danger)"><h3>⚠️ Action Required</h3>
        <ul class="activity-list" style="margin-top:10px">
          <li class="activity-item"><div class="activity-dot" style="background:var(--color-danger)"></div><div class="activity-text"><strong style="color:var(--color-text)">Grade Papers</strong>: Unit Test 3 (10-A)</div><button class="btn-primary" style="padding:4px 10px;font-size:11px" onclick="navigateTo('teacher_results')">Go</button></li>
          <li class="activity-item"><div class="activity-dot" style="background:#f57c00"></div><div class="activity-text"><strong style="color:var(--color-text)">Attendance missing</strong>: Class 9-B</div><button class="btn-primary" style="padding:4px 10px;font-size:11px" onclick="navigateTo('teacher_attendance')">Mark</button></li>
          <li class="activity-item"><div class="activity-dot" style="background:#f57c00"></div><div class="activity-text"><strong style="color:var(--color-text)">Unread Messages</strong>: 2 new from Parents</div><button class="btn-primary" style="padding:4px 10px;font-size:11px" onclick="navigateTo('teacher_messages')">Read</button></li>
        </ul>
      </div>
    </div>
  </div>`;
}

function buildTeacherClasses(user) {
  const teacherClasses = user.classes ? user.classes.split(',').map(c => c.trim()) : ['10-A', '9-B'];
  const filteredClasses = TEACHER_MY_CLASSES.filter(c => teacherClasses.includes(c.class.replace('-', '')));
  const rows = (filteredClasses.length ? filteredClasses : TEACHER_MY_CLASSES).map(c => `<tr>
    <td style="font-weight:700">Class ${c.class}</td>
    <td>${c.subject}</td>
    <td>${c.students}</td>
    <td><strong style="color:var(--color-primary)">${c.avgAtt}%</strong></td>
    <td><span class="badge badge-info">${c.avgPerf}</span></td>
    <td><span class="badge ${c.role.includes('Class') ? 'badge-active' : 'badge-warning'}">${c.role}</span></td>
  </tr>`).join('');
  return `<div class="dash-section" id="section-teacher_classes">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap">
      <h3>🏫 Assigned Classes</h3>
    </div>
    <div class="card"><div style="overflow-x:auto;border-radius:14px"><table class="data-table"><thead><tr><th>Class</th><th>Subject</th><th>Students</th><th>Avg. Attendance</th><th>Avg. Performance</th><th>My Role</th></tr></thead><tbody>${rows}</tbody></table></div></div>
  </div>`;
}

function buildTeacherAttendance(user) {
  const rows = TEACHER_ATT_MARKING.map(s => {
    const isP = s.status === 'Present' || s.status === '';
    return `<tr>
      <td>${s.roll}</td>
      <td style="font-weight:600">${s.name}</td>
      <td>
        <div style="display:flex;gap:4px">
          ${s.last5.map(d => `<div style="width:10px;height:10px;border-radius:50%;background:${d === 'Present' ? '#5ca870' : d === 'Absent' ? 'var(--color-danger)' : '#f57c00'}" title="${d}"></div>`).join('')}
        </div>
      </td>
      <td>
        <div class="attendance-btn-group" data-student-index="${s.roll}">
          <button class="att-btn p ${isP ? 'active' : ''}" onclick="markTeacherAttendance('${s.roll}', 'Present', this)">P</button>
          <button class="att-btn a ${s.status === 'Absent' ? 'active' : ''}" onclick="markTeacherAttendance('${s.roll}', 'Absent', this)">A</button>
          <button class="att-btn l ${s.status === 'Late' ? 'active' : ''}" onclick="markTeacherAttendance('${s.roll}', 'Late', this)">L</button>
        </div>
      </td>
      <td><input type="text" placeholder="Add remark..." style="padding:6px;width:100%;border-radius:6px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text)" /></td>
    </tr>`;
  }).join('');
  return `<div class="dash-section" id="section-teacher_attendance">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px">
      <h3>📋 Mark Attendance</h3>
      <div style="display:flex;gap:10px">
        <select style="padding:8px 12px;border-radius:8px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text)"><option>Class 9-B (Mathematics)</option></select>
        <input type="date" value="2026-03-30" style="padding:8px 12px;border-radius:8px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text)" />
      </div>
    </div>
    <div class="card">
      <div style="overflow-x:auto;border-radius:14px;margin-bottom:20px"><table class="data-table"><thead><tr><th>Roll</th><th>Student Name</th><th>Last 5 Days</th><th>Mark Status</th><th>Remarks</th></tr></thead><tbody>${rows}</tbody></table></div>
      <div style="display:flex;justify-content:space-between;align-items:center"><span style="color:var(--color-text-muted);font-size:13px">Showing 8 students (filtered view)</span><button class="btn-primary" onclick="simulateAction('Attendance submitted successfully for Class 9-C on ' + new Date().toLocaleDateString('en-IN') + '.')"><i class="fas fa-check"></i> Submit Attendance</button></div>
    </div>
  </div>`;
}

function buildTeacherHomework(user) {
  const rows = TEACHER_HOMEWORK_TRACKING.map(h => `<tr>
    <td style="font-weight:700">${h.title}</td>
    <td><span class="badge" style="background:var(--color-surface-2);color:var(--color-text)">${h.class}</span></td>
    <td>${h.dueDate}</td>
    <td>
      <div style="display:flex;align-items:center;gap:8px">
        <div class="progress-bar" style="flex:1"><div class="progress-fill" style="width:${(h.submitted / (h.submitted + h.pending)) * 100}%"></div></div>
        <span style="font-size:12px;color:var(--color-text-muted)">${h.submitted}/${h.submitted + h.pending}</span>
      </div>
    </td>
    <td><span class="badge ${h.status === 'Graded' ? 'badge-active' : h.status === 'Grading' ? 'badge-warning' : 'badge-info'}">${h.status}</span></td>
    <td><button style="padding:6px 12px;border-radius:6px;background:var(--color-primary);color:white;border:none;cursor:pointer;font-weight:600;font-size:11px" onclick="alert('Opening submissions...')">Review</button></td>
  </tr>`).join('');
  return `<div class="dash-section" id="section-teacher_homework">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap">
      <h3>📚 Homework Management</h3>
      <button class="btn-primary" onclick="openNewAssignmentModal()"><i class="fas fa-plus"></i> New Assignment</button>
    </div>
    <div class="card"><div style="overflow-x:auto;border-radius:14px"><table class="data-table"><thead><tr><th>Assignment Title</th><th>Class</th><th>Due Date</th><th>Submissions</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div></div>
  </div>`;
}

function buildTeacherSchedule(user) {
  const rows = SCHEDULE.filter(s => s.teacher === user.name).map(s => `<div class="schedule-item"><div class="schedule-time">${s.time}</div><div class="schedule-bar" style="background:${s.color}"></div><div class="schedule-info"><div class="schedule-subject">${s.subject} <span style="font-size:10px;background:var(--color-surface-2);padding:2px 6px;border-radius:4px;border:1px solid var(--color-border)">${s.class}</span></div></div><div class="schedule-room">${s.room}</div></div>`).join('');
  return `<div class="dash-section" id="section-teacher_schedule">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap">
      <h3>📅 My Timetable</h3>
      <div style="display:flex;gap:10px">
        <select style="padding:8px 12px;border-radius:8px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text);outline:none"><option>Monday</option><option>Tuesday</option></select>
      </div>
    </div>
    <div class="card" style="max-width:600px;margin:0 auto">
      ${rows || '<p style="padding:20px;text-align:center;color:var(--color-text-muted)">No classes scheduled.</p>'}
    </div>
  </div>`;
}

function buildTeacherResults(user) {
  const table1 = `<tr><td>KASULA ASHWATH</td><td><input type="number" value="87" style="width:60px;padding:4px;border-radius:4px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text)"/></td><td>A</td></tr>
  <tr><td>PRANEETH BHUKYA</td><td><input type="number" value="95" style="width:60px;padding:4px;border-radius:4px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text)"/></td><td>A+</td></tr>
  <tr><td>BHUKYA PRANAVI</td><td><input type="number" value="" placeholder="-" style="width:60px;padding:4px;border-radius:4px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text)"/></td><td>-</td></tr>`;
  return `<div class="dash-section" id="section-teacher_results">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px">
      <h3>📝 Upload Marks & Results</h3>
      <div style="display:flex;gap:10px">
        <select id="t-res-exam" style="padding:8px 12px;border-radius:8px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text)"><option>Mid-Term Examination</option><option>Unit Test 3</option></select>
        <select id="t-res-class" style="padding:8px 12px;border-radius:8px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text)">
            ${(user.classes ? user.classes.split(',') : ['10-A', '9-B']).map(c => `<option>${c.trim()}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <div><h4 style="margin-bottom:4px;color:var(--color-text)">10-A Mathematics</h4><span style="font-size:12px;color:var(--color-text-muted)">Max Marks: 100</span></div>
        <div style="display:flex;gap:8px">
          <button class="btn-primary" style="background:var(--color-surface-2);color:var(--color-text);border:1px solid var(--color-border)" onclick="downloadMarksTemplate()"><i class="fas fa-file-excel"></i> Template</button>
          <button class="btn-primary" onclick="openTeacherMarksUpload()"><i class="fas fa-upload"></i> Upload Excel Marks</button>
        </div>
      </div>
      <div style="overflow-x:auto;border-radius:14px;border:1px solid var(--color-border);margin-bottom:20px">
        <table class="data-table"><thead><tr><th>Student</th><th>Marks Obtained</th><th>Calculated Grade</th></tr></thead><tbody>${table1}</tbody></table>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center"><span style="color:var(--color-danger);font-size:13px"><i class="fas fa-exclamation-circle"></i> 33 students pending entry</span><button class="btn-primary" style="background:#f57c00" onclick="simulateAction('Draft marks saved. You can continue later.')"><i class="fas fa-save"></i> Save Draft</button></div>
    </div>
  </div>`;
}

function buildTeacherStudentPerf(user) {
  const rows = TEACHER_STUDENT_PERF.map(s => `<tr>
    <td style="font-weight:700">${s.name}</td>
    <td><span class="badge" style="background:var(--color-surface-2);color:var(--color-text)">${s.class}</span></td>
    <td><strong style="color:${attColor(s.att)}">${s.att}%</strong></td>
    <td><strong style="color:var(--color-primary)">${s.gpa}</strong></td>
    <td><i class="fas fa-arrow-${s.trend}" style="color:${s.trend === 'up' ? '#5ca870' : s.trend === 'down' ? 'var(--color-danger)' : '#f57c00'}"></i></td>
    <td style="color:var(--color-text-muted);font-size:13px">${s.remark}</td>
    <td><button style="padding:4px 10px;border-radius:6px;background:var(--color-surface-2);color:var(--color-text);border:1px solid var(--color-border);cursor:pointer;font-size:11px" onclick="simulateAction('Note added for student.')"><i class="fas fa-plus"></i> Note</button></td>
  </tr>`).join('');
  return `<div class="dash-section" id="section-teacher_performance">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap">
      <h3>📈 Student Performance Tracking</h3>
      <select style="padding:8px 12px;border-radius:8px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text);outline:none"><option>All Classes</option><option>10-A</option><option>9-B</option></select>
    </div>
    <div class="card"><div style="overflow-x:auto;border-radius:14px"><table class="data-table"><thead><tr><th>Student</th><th>Class</th><th>Att.</th><th>Curr. GPA</th><th>Trend</th><th>Recent Remark</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div></div>
  </div>`;
}


function buildTeacherMessages(user) {
  const store = getEscalationStore();
  const teacherIssues = store.teacherInbox.slice().sort((a, b) => new Date(b.registeredDate || b.escalatedDate || 0) - new Date(a.registeredDate || a.escalatedDate || 0));
  const list = teacherIssues.map(m => `<div class="card" style="margin-bottom:12px;border:1px solid var(--color-border)">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap">
      <div>
        <div style="font-weight:700;color:var(--color-text)">${m.id} · ${m.studentName}</div>
        <div style="font-size:13px;color:var(--color-text-muted)">${m.class} · ${m.category} · ${m.registeredDate || ''}</div>
      </div>
      <div style="display:flex;gap:6px;align-items:center">
        <span class="badge" style="background:${m.priority === 'High' ? 'var(--color-danger)' : m.priority === 'Medium' ? '#f57c00' : '#1976d2'}">${m.priority}</span>
        <span class="badge badge-info">${m.status}</span>
      </div>
    </div>
    <div style="font-size:13px;color:var(--color-text-light);margin-top:8px">${(m.description || '').slice(0, 120)}${(m.description || '').length > 120 ? '...' : ''}</div>
    <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
      <button class="btn-primary" style="padding:6px 10px;font-size:12px;background:var(--color-success);border-color:var(--color-success)" onclick="viewIssue('${m.id}')">Resolve Locally</button>
      <button class="btn-primary" style="padding:6px 10px;font-size:12px;background:var(--color-danger);border-color:var(--color-danger)" onclick="viewIssue('${m.id}')">Escalate to Coordinator</button>
      <button class="btn-primary" style="padding:6px 10px;font-size:12px" onclick="viewIssue('${m.id}')">View Details</button>
    </div>
  </div>`).join('');

  return `<div class="dash-section" id="section-teacher_messages">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap">
      <h3 style="color:var(--color-text)">✉️ Student Issues / Inbox</h3>
      <button class="btn-primary" style="background:var(--color-success);border-color:var(--color-success)" onclick="openRegisterTeacherIssueModal()">Register New Issue</button>
    </div>
    <div class="card" style="background:var(--color-surface-2);margin-bottom:20px"><p style="font-size:13px;color:var(--color-text-muted)">Register issues and either resolve locally or escalate to coordinator.</p></div>
    <div>${list || `<div class="card"><p style="color:var(--color-text-muted)">No registered issues in teacher inbox.</p></div>`}</div>
  </div>`;
}

function openRegisterTeacherIssueModal() {
  const classOpts = [];
  for (let g = 6; g <= 10; g++) for (const s of 'ABCDEFGHIJK') classOpts.push(`${g}${s}`);
  const html = `<div class="modal-overlay" id="teacher-reg-issue-modal" style="display:flex" onclick="if(event.target===this) this.remove()"><div class="modal" style="max-width:620px;width:100%"><h3 style="margin-top:0">Register Student Issue</h3>
    <label>Student Name</label><input id="tri-student-name" class="form-control" />
    <label style="margin-top:8px">Student ID</label><input id="tri-student-id" class="form-control" />
    <label style="margin-top:8px">Class</label><select id="tri-class" class="form-control" onchange="document.getElementById('tri-section').value=this.value.slice(-1)">${classOpts.map(c => `<option>${c}</option>`).join('')}</select>
    <label style="margin-top:8px">Section</label><input id="tri-section" class="form-control" readonly value="A" />
    <label style="margin-top:8px">Issue Category</label><select id="tri-category" class="form-control"><option>Discipline</option><option>Attendance</option><option>Academic</option><option>Behavior</option><option>Health</option><option>Other</option></select>
    <label style="margin-top:8px">Priority</label><select id="tri-priority" class="form-control"><option>High</option><option>Medium</option><option>Low</option></select>
    <label style="margin-top:8px">Severity</label><select id="tri-severity" class="form-control"><option>Critical</option><option>Moderate</option><option>Minor</option></select>
    <label style="margin-top:8px">Description</label><textarea id="tri-description" class="form-control" rows="4"></textarea>
    <label style="margin-top:8px">Attachment</label><input id="tri-files" type="file" class="form-control" multiple accept="image/*,.pdf" />
    <div style="display:flex;gap:10px;margin-top:12px"><button class="btn-primary" style="flex:1;background:var(--color-success);border-color:var(--color-success)" onclick="registerTeacherIssue()">Register Issue</button><button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('teacher-reg-issue-modal').remove()">Cancel</button></div>
  </div></div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

function registerTeacherIssue() {
  const studentName = (document.getElementById('tri-student-name') || {}).value || '';
  const studentId = (document.getElementById('tri-student-id') || {}).value || '';
  const cls = (document.getElementById('tri-class') || {}).value || '';
  const section = (document.getElementById('tri-section') || {}).value || sectionFromClassCode(cls);
  const category = (document.getElementById('tri-category') || {}).value || 'Other';
  const priority = (document.getElementById('tri-priority') || {}).value || 'Medium';
  const severity = (document.getElementById('tri-severity') || {}).value || 'Moderate';
  const description = (document.getElementById('tri-description') || {}).value || '';
  if (!studentName.trim() || !studentId.trim() || !cls.trim() || description.trim().length < 20) return simulateAction('Fill all required fields (description min 20 chars)');
  const fileInput = document.getElementById('tri-files');
  const files = fileInput && fileInput.files ? Array.from(fileInput.files) : [];
  const readers = files.map(file => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve({ name: file.name, type: file.type, data: e.target.result });
    reader.readAsDataURL(file);
  }));
  Promise.all(readers).then((attachments) => {
    const issue = {
      id: 'ISS-' + Date.now(),
      studentName: studentName.trim(),
      studentId: studentId.trim(),
      class: cls,
      section,
      category,
      priority,
      severity,
      description: description.trim(),
      attachments,
      registeredBy: (currentUser && currentUser.name) || 'Teacher',
      registeredByRole: 'Teacher',
      registeredDate: new Date().toLocaleString(),
      stage: 'teacher',
      status: 'New',
      timeline: [{ action: 'Issue registered', by: (currentUser && currentUser.name) || 'Teacher', role: 'Teacher', date: new Date().toLocaleString(), note: '' }]
    };
    const store = getEscalationStore();
    store.teacherInbox.unshift(issue);
    saveEscalationStore(store);
    const m = document.getElementById('teacher-reg-issue-modal');
    if (m) m.remove();
    simulateAction('Issue registered successfully');
    triggerLiveReRender();
    navigateTo('teacher_messages');
  });
}

function openTeacherResolveModal(issueId) {
  const html = `<div class="modal-overlay" id="teacher-resolve-modal" style="display:flex" onclick="if(event.target===this) this.remove()"><div class="modal" style="max-width:480px;width:100%"><h3 style="margin-top:0">Resolve Issue</h3><textarea id="teacher-resolve-note" class="form-control" rows="4" placeholder="Resolution note"></textarea><div style="display:flex;gap:10px;margin-top:10px"><button class="btn-primary" style="flex:1;background:var(--color-success);border-color:var(--color-success)" onclick="confirmTeacherResolveIssue('${issueId}')">Confirm Resolve</button><button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('teacher-resolve-modal').remove()">Cancel</button></div></div></div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

function confirmTeacherResolveIssue(issueId) {
  const note = (document.getElementById('teacher-resolve-note') || {}).value || '';
  if (!note.trim()) return simulateAction('Resolution note required');
  const store = getEscalationStore();
  const idx = store.teacherInbox.findIndex(i => String(i.id) === String(issueId));
  if (idx < 0) return;
  const issue = store.teacherInbox.splice(idx, 1)[0];
  issue.status = 'Resolved by Teacher';
  issue.stage = 'resolved';
  issue.timeline = issue.timeline || [];
  issue.timeline.push({ action: 'Resolved by Teacher', by: (currentUser && currentUser.name) || 'Teacher', role: 'Teacher', date: new Date().toLocaleString(), note: note.trim() });
  store.resolvedIssues.unshift(issue);
  saveEscalationStore(store);
  const m = document.getElementById('teacher-resolve-modal'); if (m) m.remove();
  simulateAction('Issue resolved');
  triggerLiveReRender();
  navigateTo('teacher_messages');
}

function openTeacherEscalateModal(issueId) {
  const html = `<div class="modal-overlay" id="teacher-esc-modal" style="display:flex" onclick="if(event.target===this) this.remove()"><div class="modal" style="max-width:520px;width:100%"><h3 style="margin-top:0">Escalate to Coordinator</h3><label>Reason</label><textarea id="teacher-esc-reason" class="form-control" rows="4"></textarea><label style="margin-top:8px">Assign to</label><select id="teacher-esc-assign" class="form-control"><option>C001 - Anitha (Coordinator)</option></select><div style="display:flex;gap:10px;margin-top:10px"><button class="btn-primary" style="flex:1;background:var(--color-danger);border-color:var(--color-danger)" onclick="confirmTeacherEscalation('${issueId}')">Confirm Escalation</button><button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('teacher-esc-modal').remove()">Cancel</button></div></div></div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

function confirmTeacherEscalation(issueId) {
  const reason = (document.getElementById('teacher-esc-reason') || {}).value || '';
  const assign = (document.getElementById('teacher-esc-assign') || {}).value || 'C001 - Anitha (Coordinator)';
  if (!reason.trim()) return simulateAction('Escalation reason is required');
  const store = getEscalationStore();
  const idx = store.teacherInbox.findIndex(i => String(i.id) === String(issueId));
  if (idx < 0) return;
  const issue = store.teacherInbox.splice(idx, 1)[0];
  issue.escalatedByTeacher = (currentUser && currentUser.name) || 'Teacher';
  issue.escalatedToCoordinator = assign;
  issue.escalatedDate = new Date().toLocaleString();
  issue.escalationReason = reason.trim();
  issue.stage = 'coordinator';
  issue.status = 'Escalated to Coordinator';
  issue.timeline = issue.timeline || [];
  issue.timeline.push({ action: 'Escalated to Coordinator', by: issue.escalatedByTeacher, role: 'Teacher', date: issue.escalatedDate, note: `Reason: ${reason.trim()}` });
  store.coordinatorInbox.unshift(issue);
  saveEscalationStore(store);
  const m = document.getElementById('teacher-esc-modal'); if (m) m.remove();
  simulateAction('Issue escalated to Coordinator');
  triggerLiveReRender();
  navigateTo('teacher_messages');
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROMOTE STUDENTS – VP Action
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function promoteStudents() {
  navigateTo('vp_students');
}

function getActionPinGuardState() {
  return JSON.parse(localStorage.getItem('campuscore_action_pin_guard') || '{"attempts":0,"lockUntil":0}');
}

function setActionPinGuardState(state) {
  localStorage.setItem('campuscore_action_pin_guard', JSON.stringify(state));
}

function closeVPActionModal() {
  const el = document.getElementById('vp-action-modal-overlay');
  if (el) el.remove();
  if (window.vpPinCountdownTimer) {
    clearInterval(window.vpPinCountdownTimer);
    window.vpPinCountdownTimer = null;
  }
}

function openVPStudentActionFlow(studentId, action, issueId) {
  const student = getVPStudentById(studentId);
  if (!student) {
    simulateAction('Student not found');
    return;
  }
  const sid = String(student.admNo || student.id);
  const shared = getVPStudentSharedData(sid);
  const currentClass = normalizeClassCode(shared.currentClass || student.class);
  const titleMap = { promote: 'Verify PIN to Promote Student', demote: 'Verify PIN to Demote Student', suspend: 'Verify PIN to Suspend Student' };
  closeVPActionModal();
  const html = `<div class="modal-overlay" id="vp-action-modal-overlay" style="display:flex" onclick="if(event.target===this) closeVPActionModal()">
    <div class="modal" style="max-width:460px;width:100%">
      <h3 style="margin-top:0">${titleMap[action] || 'Verify PIN'}</h3>
      <div style="font-size:13px;color:var(--color-text-muted);margin-bottom:10px"><strong>${student.name}</strong> · Class ${currentClass}</div>
      <label>Enter action PIN</label>
      <input type="password" id="vp-action-pin-input" class="form-control" placeholder="Enter action PIN" />
      <div id="vp-action-pin-error" style="color:var(--color-danger);font-size:12px;min-height:18px;margin-top:8px"></div>
      <div style="display:flex;gap:10px;margin-top:10px">
        <button class="btn-primary" id="vp-action-pin-verify-btn" style="flex:1;background:var(--color-success);border-color:var(--color-success)" onclick="verifyVPActionPin('${sid}','${action}','${issueId || ''}')">Verify</button>
        <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="closeVPActionModal()">Cancel</button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
  refreshVPPinLockState();
}

function refreshVPPinLockState() {
  const state = getActionPinGuardState();
  const now = Date.now();
  const locked = Number(state.lockUntil || 0) > now;
  const err = document.getElementById('vp-action-pin-error');
  const btn = document.getElementById('vp-action-pin-verify-btn');
  if (!err || !btn) return;
  if (!locked) {
    btn.disabled = false;
    err.textContent = '';
    return;
  }
  const update = () => {
    const s = getActionPinGuardState();
    const leftMs = Number(s.lockUntil || 0) - Date.now();
    if (leftMs <= 0) {
      setActionPinGuardState({ attempts: 0, lockUntil: 0 });
      err.textContent = '';
      btn.disabled = false;
      if (window.vpPinCountdownTimer) { clearInterval(window.vpPinCountdownTimer); window.vpPinCountdownTimer = null; }
      return;
    }
    btn.disabled = true;
    err.textContent = `Too many attempts. Try again in ${Math.ceil(leftMs / 1000)}s.`;
  };
  update();
  if (window.vpPinCountdownTimer) clearInterval(window.vpPinCountdownTimer);
  window.vpPinCountdownTimer = setInterval(update, 1000);
}

function verifyVPActionPin(studentId, action, issueId) {
  const state = getActionPinGuardState();
  if (Number(state.lockUntil || 0) > Date.now()) {
    refreshVPPinLockState();
    return;
  }
  const input = document.getElementById('vp-action-pin-input');
  const err = document.getElementById('vp-action-pin-error');
  const entered = (input ? input.value : '').trim();
  if (entered !== getActionPin()) {
    const nextAttempts = Number(state.attempts || 0) + 1;
    const next = { attempts: nextAttempts, lockUntil: nextAttempts >= 3 ? Date.now() + 30000 : 0 };
    setActionPinGuardState(next);
    if (err) err.textContent = 'Incorrect PIN. Please try again.';
    refreshVPPinLockState();
    return;
  }
  setActionPinGuardState({ attempts: 0, lockUntil: 0 });
  openVPStudentActionConfirm(studentId, action, issueId);
}

function openVPStudentActionConfirm(studentId, action, issueId) {
  const student = getVPStudentById(studentId);
  if (!student) return;
  const sid = String(student.admNo || student.id);
  const shared = getVPStudentSharedData(sid);
  const currentClass = normalizeClassCode(shared.currentClass || student.class);
  const promoted = computePromotedClass(currentClass);
  const demoted = computeDemotedClass(currentClass);
  const nextClass = action === 'promote' ? promoted.value : action === 'demote' ? demoted.value : currentClass;
  const error = action === 'promote' ? promoted.error : action === 'demote' ? demoted.error : '';
  const title = action === 'promote' ? 'Promote Student' : action === 'demote' ? 'Demote Student' : 'Suspend Student Temporarily';

  closeVPActionModal();
  let body = '';
  if (action === 'promote' || action === 'demote') {
    body = `
      <div style="font-size:13px;color:var(--color-text-muted);margin-bottom:10px"><strong>${student.name}</strong></div>
      <label>Current class</label><input class="form-control" readonly value="${currentClass}">
      <label style="margin-top:10px">New class</label><input class="form-control" readonly value="${nextClass || '-'}">
      ${action === 'promote' ? `<label style="margin-top:10px">Academic Year</label><input class="form-control" readonly value="2025-26 → 2026-27">` : ''}
      ${error ? `<div style="margin-top:10px;color:var(--color-danger);font-size:13px">${error}</div>` : ''}
      <label style="margin-top:10px">${action === 'promote' ? 'Reason for promotion (optional)' : 'Reason for demotion'}</label>
      <textarea id="vp-student-action-reason" class="form-control" rows="3"></textarea>
      ${action === 'demote' ? `<div style="margin-top:10px;padding:10px;border-radius:8px;background:rgba(211,47,47,.12);border:1px solid rgba(211,47,47,.3);color:var(--color-danger);font-size:13px">This will move the student to a lower class. This action is recorded and cannot be automatically undone.</div>` : ''}
      <div style="display:flex;gap:10px;margin-top:14px">
        <button class="btn-primary" ${error ? 'disabled' : ''} style="flex:1;background:${action === 'promote' ? 'var(--color-success)' : 'var(--color-danger)'};border-color:${action === 'promote' ? 'var(--color-success)' : 'var(--color-danger)'}" onclick="confirmVPStudentAction('${sid}','${action}','${nextClass || ''}','${currentClass}','${issueId || ''}')">${action === 'promote' ? 'Confirm Promotion' : 'Confirm Demotion'}</button>
        <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="closeVPActionModal()">Cancel</button>
      </div>`;
  } else {
    body = `
      <div style="font-size:13px;color:var(--color-text-muted);margin-bottom:10px"><strong>${student.name}</strong> · Class ${currentClass}</div>
      <label>Duration</label>
      <select id="vp-suspend-duration" class="form-control" onchange="toggleVPCustomSuspendDate()">
        <option value="">Select</option><option>1 Day</option><option>3 Days</option><option>1 Week</option><option>2 Weeks</option><option>Custom</option>
      </select>
      <div id="vp-suspend-custom-wrap" style="display:none">
        <label style="margin-top:10px">End date</label><input type="date" id="vp-suspend-custom-date" class="form-control">
      </div>
      <label style="margin-top:10px">Reason</label>
      <textarea id="vp-student-action-reason" class="form-control" rows="3"></textarea>
      <div style="margin-top:10px;padding:10px;border-radius:8px;background:rgba(245,124,0,.12);border:1px solid rgba(245,124,0,.35);color:#b35b00;font-size:13px">Student will be temporarily suspended. They will be notified and their dashboard will show suspension notice.</div>
      <div style="display:flex;gap:10px;margin-top:14px">
        <button class="btn-primary" style="flex:1;background:#f57c00;border-color:#f57c00" onclick="confirmVPStudentAction('${sid}','suspend','','${currentClass}','${issueId || ''}')">Confirm Suspension</button>
        <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="closeVPActionModal()">Cancel</button>
      </div>`;
  }
  const html = `<div class="modal-overlay" id="vp-action-modal-overlay" style="display:flex" onclick="if(event.target===this) closeVPActionModal()"><div class="modal" style="max-width:520px;width:100%"><h3 style="margin-top:0">${title}</h3>${body}</div></div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

function toggleVPCustomSuspendDate() {
  const sel = document.getElementById('vp-suspend-duration');
  const wrap = document.getElementById('vp-suspend-custom-wrap');
  if (sel && wrap) wrap.style.display = sel.value === 'Custom' ? 'block' : 'none';
}

function formatISODate(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function resolveSuspensionEndDate(duration) {
  const now = new Date();
  const end = new Date(now);
  if (duration === '1 Day') end.setDate(end.getDate() + 1);
  if (duration === '3 Days') end.setDate(end.getDate() + 3);
  if (duration === '1 Week') end.setDate(end.getDate() + 7);
  if (duration === '2 Weeks') end.setDate(end.getDate() + 14);
  return formatISODate(end);
}

function confirmVPStudentAction(studentId, action, newClass, oldClass, issueId) {
  const student = getVPStudentById(studentId);
  if (!student) return;
  const sid = String(student.admNo || student.id);
  const shared = getVPStudentSharedData(sid);
  const reason = (document.getElementById('vp-student-action-reason') || {}).value || '';
  const today = new Date().toISOString().slice(0, 10);
  let toast = '';

  if (action === 'promote') {
    shared.currentClass = newClass[0]; // Assuming newClass is like "10C"
    shared.currentSection = newClass.slice(1);

    // Step 4 — Update shared registry
    if (window.CAMPUSCORE_REGISTRY) {
      window.CAMPUSCORE_REGISTRY.updateStudentClass(sid, shared.currentClass, shared.currentSection);
    }

    shared.previousClass = oldClass;
    shared.promotedBy = 'SUMAN (VP)';
    shared.promotedDate = today;
    shared.promotionReason = reason.trim();
    shared.academicYear = '2026-27';
    shared.status = 'Active';
    pushStudentActivity(shared, `Promoted from ${oldClass} to ${newClass}`);
    toast = `Student promoted from ${oldClass} to ${newClass} successfully`;
  } else if (action === 'demote') {
    if (!reason.trim()) {
      simulateAction('Demotion reason is required');
      return;
    }
    shared.currentClass = newClass[0];
    shared.currentSection = newClass.slice(1);

    // Step 4 — Update shared registry
    if (window.CAMPUSCORE_REGISTRY) {
      window.CAMPUSCORE_REGISTRY.updateStudentClass(sid, shared.currentClass, shared.currentSection);
    }

    shared.previousClass = oldClass;
    shared.demotedBy = 'SUMAN (VP)';
    shared.demotedDate = today;
    shared.demotionReason = reason.trim();
    shared.status = 'Demoted';
    pushStudentActivity(shared, `Demoted from ${oldClass} to ${newClass}`);
    toast = `Student demoted from ${oldClass} to ${newClass}`;
  } else if (action === 'suspend') {
    const duration = (document.getElementById('vp-suspend-duration') || {}).value || '';
    if (!duration) {
      simulateAction('Suspension duration is required');
      return;
    }
    if (!reason.trim()) {
      simulateAction('Suspension reason is required');
      return;
    }
    let endDate = '';
    if (duration === 'Custom') {
      endDate = (document.getElementById('vp-suspend-custom-date') || {}).value || '';
      if (!endDate) {
        simulateAction('Please select custom end date');
        return;
      }
    } else {
      endDate = resolveSuspensionEndDate(duration);
    }
    shared.suspensionStatus = 'suspended';
    shared.suspensionStartDate = today;
    shared.suspensionEndDate = endDate;
    shared.suspensionDuration = duration;
    shared.suspensionReason = reason.trim();
    shared.suspendedBy = 'SUMAN (VP)';
    shared.status = 'Suspended';
    pushStudentActivity(shared, `Suspended until ${endDate}`);
    toast = `Student suspended until ${endDate}`;
  }

  saveVPStudentSharedData(sid, shared);
  student.class = classCodeToStoredFormat(shared.currentClass || oldClass || student.class);
  if (typeof saveStudents === 'function') saveStudents();

  if (issueId) {
    const issue = (GLOBAL_ISSUES || []).find(i => i.id === issueId);
    if (issue) {
      issue.timeline = issue.timeline || [];
      issue.timeline.push({
        date: new Date().toISOString(),
        actor: currentUser && currentUser.name ? currentUser.name : 'VP',
        role: 'VP',
        note: action === 'promote' ? `Student promoted to Class ${newClass}` : action === 'demote' ? `Student demoted to Class ${newClass}` : `Student suspended until ${shared.suspensionEndDate}`
      });
      issue.updated = new Date().toISOString();
      saveIssues(GLOBAL_ISSUES);
    }
  }

  closeVPActionModal();
  simulateAction(toast);
  triggerLiveReRender();
}

function openChangeActionPinModal() {
  closeVPActionModal();
  const html = `<div class="modal-overlay" id="vp-action-modal-overlay" style="display:flex" onclick="if(event.target===this) closeVPActionModal()">
    <div class="modal" style="max-width:460px;width:100%">
      <h3 style="margin-top:0">Change Action PIN</h3>
      <label>Current PIN</label><input type="password" id="vp-pin-current" class="form-control">
      <label style="margin-top:10px">New PIN</label><input type="password" id="vp-pin-new" class="form-control" minlength="2">
      <label style="margin-top:10px">Confirm New PIN</label><input type="password" id="vp-pin-confirm" class="form-control" minlength="2">
      <div id="vp-pin-change-error" style="color:var(--color-danger);font-size:12px;min-height:18px;margin-top:8px"></div>
      <div style="display:flex;gap:10px;margin-top:10px">
        <button class="btn-primary" style="flex:1;background:var(--color-success);border-color:var(--color-success)" onclick="saveActionPinChange()">Update PIN</button>
        <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="closeVPActionModal()">Cancel</button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

function saveActionPinChange() {
  const cur = (document.getElementById('vp-pin-current') || {}).value || '';
  const next = (document.getElementById('vp-pin-new') || {}).value || '';
  const conf = (document.getElementById('vp-pin-confirm') || {}).value || '';
  const err = document.getElementById('vp-pin-change-error');
  if (cur !== getActionPin()) { if (err) err.textContent = 'Current PIN is incorrect.'; return; }
  if (next.length < 2) { if (err) err.textContent = 'New PIN must be at least 2 characters.'; return; }
  if (next !== conf) { if (err) err.textContent = 'New PIN and confirm PIN do not match.'; return; }
  localStorage.setItem('campuscore_action_pin', next);
  closeVPActionModal();
  simulateAction('Action PIN updated successfully');
}



/* ━━━━ GLOBAL ISSUE ENGINE & MODALS ━━━━━━━━━━━━━━━━━━━━━━ */

function openRaiseConcernModal() {
  const child = getParentChildContext(currentUser);
  const modalHTML = `
    <div id="issue-modal-overlay" class="modal-overlay" onclick="closeIssueModal(event)">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3>Raise a Concern / Message</h3>
          <button class="modal-close" onclick="closeIssueModal()"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <label>Summary Title</label>
          <input type="text" id="issue-title" class="form-control" placeholder="E.g., Query about Math assignment"/>
          <label>Category</label>
          <select id="issue-category" class="form-control">
            <option>Academic</option><option>Discipline</option><option>Transport</option><option>Facilities</option><option>Other</option>
          </select>
          <label>Details</label>
          <textarea id="issue-desc" class="form-control" rows="4" placeholder="Describe the concern..."></textarea>
          
          <label style="margin-top:12px;display:block">Attachments (Optional)</label>
          <input type="file" id="issue-files" class="form-control" multiple accept="image/*,.pdf,.doc,.docx" />
          
          <button class="btn-primary" style="width:100%;margin-top:10px" onclick="submitConcern()">Submit Concern</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function submitConcern() {
  const title = document.getElementById('issue-title').value.trim();
  const cat = document.getElementById('issue-category').value;
  const desc = document.getElementById('issue-desc').value.trim();
  const fileInput = document.getElementById('issue-files');

  if (!title || !desc) {
    simulateAction("Please fill all required fields");
    return;
  }

  const child = getParentChildContext(currentUser);

  const files = fileInput && fileInput.files ? Array.from(fileInput.files) : [];
  const readers = files.map(file => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve({ name: file.name, type: file.type, size: file.size, data: e.target.result });
      reader.readAsDataURL(file);
    });
  });

  Promise.all(readers).then(attachmentsArray => {
    const newIssue = {
      id: "ISS-" + Math.floor(1000 + Math.random() * 9000),
      title, desc, status: "Open", stage: "Teacher",
      studentId: child.id, studentName: child.name, class: child.class,
      reporterId: currentUser.username, reporterName: currentUser.name, reporterRole: currentUser.roleLabel,
      category: cat, priority: "Normal", severity: "Normal",
      assignedTo: child.classTeacher + " (Teacher)",
      attachments: attachmentsArray,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      timeline: [
        { date: new Date().toISOString(), actor: currentUser.name, role: currentUser.roleLabel, note: `Created concern: ${desc}` }
      ]
    };

    const issues = GLOBAL_ISSUES;
    issues.push(newIssue);
    saveIssues(issues);
    closeIssueModal();
    simulateAction('Your concern has been submitted successfully.');
    triggerLiveReRender();
  });
}

function viewIssue(issueId) {
  const issue = GLOBAL_ISSUES.find(i => i.id === issueId);
  if (!issue) return;

  const isVP = currentUser.role === 'vice_principal';
  const isCoord = currentUser.role === 'coordinator';
  const isTeacher = currentUser.role === 'teacher';
  const isParent = currentUser.role === 'parent';

  const canEscalate = (isTeacher && issue.stage === 'Teacher') || (isCoord && issue.stage === 'Coordinator') || (isVP && issue.stage === 'VP') || (currentUser.role === 'principal' && issue.stage === 'Principal') || (currentUser.role === 'apaaas' || currentUser.role === 'super_admin');
  const canResolve = ((isTeacher && issue.stage === 'Teacher') || (isCoord && issue.stage === 'Coordinator') || (isVP && issue.stage === 'VP')) && issue.status !== 'Resolved' && issue.status !== 'Closed';
  const canReopen = (isVP || isCoord || isTeacher) && (issue.status === 'Resolved' || issue.status === 'Closed');
  const canReply = issue.status !== 'Resolved' && issue.status !== 'Closed';

  let actions = '';
  if (canEscalate && issue.stage !== 'Board') actions += `<button class="btn-primary" style="background:#f57c00;border-color:#f57c00" onclick="closeIssueModal(); openEscalateIssueModal('${issue.id}')"><i class="fas fa-level-up-alt"></i> Escalate</button>`;
  if (canResolve) actions += `<button class="btn-primary" style="background:var(--color-primary)" onclick="updateIssueStatus('${issue.id}', 'resolve')"><i class="fas fa-check-circle"></i> Resolve</button>`;
  if (canReopen) actions += `<button class="btn-primary" style="background:#8b5cf6;border-color:#8b5cf6" onclick="updateIssueStatus('${issue.id}', 'reopen')"><i class="fas fa-undo"></i> Reopen</button>`;
  if (isVP && issue.studentId) actions += `<button class="btn-primary" style="background:var(--color-success);border-color:var(--color-success)" onclick="openVPStudentActionFlow('${issue.studentId}', 'promote', '${issue.id}')"><i class="fas fa-arrow-up"></i> Promote Student</button>`;

  const timelineHTML = issue.timeline.map(t => `
    <div style="margin-bottom:12px;padding:12px;background:var(--color-surface);border-radius:8px;border:1px solid var(--color-border)">
      <div style="font-size:12px;color:var(--color-text-muted);display:flex;justify-content:space-between;margin-bottom:4px">
        <strong>${t.actor} (${t.role})</strong><span>${t.date.split('T')[0]}</span>
      </div>
      <div style="color:var(--color-text);font-size:14px">${t.note}</div>
    </div>
  `).join('');

  const replyHTML = canReply ? `
    <div style="margin-top:20px">
      <textarea id="issue-reply-text" class="form-control" rows="3" placeholder="Type a reply or update..."></textarea>
      <button class="btn-primary" style="width:100%;margin-top:10px" onclick="submitReply('${issue.id}')"><i class="fas fa-paper-plane"></i> Post Update</button>
    </div>
  ` : `<div style="margin-top:20px;padding:12px;text-align:center;background:var(--color-surface);border-radius:8px;color:var(--color-text-muted)">This issue is resolved and locked.</div>`;

  const modalHTML = `
    <div id="issue-modal-overlay" class="modal-overlay" onclick="closeIssueModal(event)">
      <div class="modal-content" style="max-width:600px" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3>${issue.id}: ${issue.title}</h3>
          <button class="modal-close" onclick="closeIssueModal()"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap">
            <span class="badge badge-info">${issue.studentName} (${issue.class})</span>
            <span class="badge" style="background:var(--color-border);color:var(--color-text)">Stage: ${issue.stage}</span>
            <span class="badge" style="background:${issue.status.includes('Resolv') ? 'var(--color-primary)' : '#f57c00'}">Status: ${issue.status}</span>
          </div>
          <div style="margin-bottom:20px;color:var(--color-text);font-size:15px;line-height:1.5">
            <strong>Original Concern:</strong><br>
            ${issue.desc}
          </div>
          <div style="display:flex;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--color-border)">
            ${actions}
          </div>
          <h4 style="margin-bottom:10px">Timeline Updates</h4>
          <div style="max-height:300px;overflow-y:auto;padding-right:8px">
            ${timelineHTML}
          </div>
          ${replyHTML}
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeIssueModal(e) {
  if (e && e.target.id !== 'issue-modal-overlay') return;
  const overlay = document.getElementById('issue-modal-overlay');
  if (overlay) overlay.remove();
}

function submitReply(issueId) {
  const text = document.getElementById('issue-reply-text').value.trim();
  if (!text) return;
  const issue = GLOBAL_ISSUES.find(i => i.id === issueId);
  if (!issue) return;

  issue.timeline.push({
    date: new Date().toISOString(),
    actor: currentUser.name,
    role: currentUser.roleLabel,
    note: text
  });
  issue.updated = new Date().toISOString();
  saveIssues(GLOBAL_ISSUES);
  closeIssueModal();
  triggerLiveReRender();
  triggerLiveReRender();
  triggerLiveReRender();
  triggerLiveReRender();
  viewIssue(issueId); // Re-render
}

function updateIssueStatus(issueId, action) {
  const issue = GLOBAL_ISSUES.find(i => i.id === issueId);
  if (!issue) return;

  let note = '';
  if (action === 'escalate') {
    if (issue.stage === 'Teacher') { issue.stage = 'Coordinator'; issue.assignedTo = 'Coordinator'; note = 'Escalated from Teacher to Coordinator.'; }
    else if (issue.stage === 'Coordinator') { issue.stage = 'VP'; issue.assignedTo = 'VP Suman'; note = 'Escalated from Coordinator to VP.'; }
    issue.status = 'Escalated';
  } else if (action === 'resolve') {
    issue.status = 'Resolved';
    note = 'Issue marked as resolved.';
  } else if (action === 'reopen') {
    issue.status = 'Open';
    note = 'Issue reopened for further review.';
  }

  issue.timeline.push({
    date: new Date().toISOString(), actor: currentUser.name, role: currentUser.roleLabel, note: note
  });
  issue.updated = new Date().toISOString();
  saveIssues(GLOBAL_ISSUES);
  closeIssueModal();
  triggerLiveReRender();
  triggerLiveReRender();
  triggerLiveReRender();
  triggerLiveReRender();
  buildDashboard(currentUser); // Refresh background dashboard
}


/* ━━━━ TEACHER: NEW ASSIGNMENT MODAL ━━━━━━━━━━━━━━━━━━━━━━ */
function openNewAssignmentModal() {
  if (document.getElementById('assign-modal-overlay')) return;
  const modalHTML = `
    <div id="assign-modal-overlay" class="modal-overlay" onclick="closeAssignModal(event)">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3>📚 Create New Assignment</h3>
          <button class="modal-close" onclick="closeAssignModal()"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <label>Assignment Title</label>
          <input type="text" id="assign-title" class="form-control" placeholder="E.g., Quadratic Equations Practice Set"/>
          <label>Subject</label>
          <select id="assign-subject" class="form-control">
            <option>Mathematics</option><option>Physics</option><option>Chemistry</option>
            <option>English</option><option>History</option><option>Computer Science</option>
          </select>
          <label>Class</label>
          <select id="assign-class" class="form-control">
            <option>9-C (My Class)</option><option>10-A</option><option>9-B</option>
          </select>
          <label>Due Date</label>
          <input type="date" id="assign-due" class="form-control"/>
          <label>Instructions</label>
          <textarea id="assign-desc" class="form-control" rows="3" placeholder="Describe the assignment..."></textarea>
          <button class="btn-primary" style="width:100%;margin-top:8px" onclick="submitNewAssignment()">
            <i class="fas fa-paper-plane"></i> Publish Assignment
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function submitNewAssignment() {
  const title = document.getElementById('assign-title').value.trim();
  const subject = document.getElementById('assign-subject').value;
  const cls = document.getElementById('assign-class').value;
  const due = document.getElementById('assign-due').value;
  if (!title || !due) { alert('Please fill in title and due date.'); return; }
  closeAssignModal();
  simulateAction('Assignment "' + title + '" published for ' + cls + ' — due ' + due + '.');
}

function closeAssignModal(e) {
  if (e && e.target.id !== 'assign-modal-overlay') return;
  const el = document.getElementById('assign-modal-overlay');
  if (el) el.remove();
}

function triggerLiveReRender() {
  // Immediately rebuild the dashboard content without full page reload
  console.log("Triggering live re-render to update state & badges.");
  if (typeof currentUser !== 'undefined' && currentUser) {
    buildDashboard(currentUser);
    buildSidebar(currentUser); // re-calc sidebar badges too!
    if (typeof currentSection !== 'undefined' && currentSection) {
      navigateTo(currentSection);
    }
  }
}

function setVPIssueTab(tab) {
  localStorage.setItem('vp_issue_tab', tab);
  triggerLiveReRender();
}

function setVPScheduleView(view) {
  localStorage.setItem('vp_schedule_view', view);
  triggerLiveReRender();
}

function setVPNoticeTab(tab) {
  localStorage.setItem('vp_notice_tab', tab);
  triggerLiveReRender();
}


// --- FIX 1: STUDENT ISSUES MODALS ---
window.vpTempIssueStore = []; // To store the mock mapped issues if needed

function resolveVPIssue(id) {
  let issue = GLOBAL_ISSUES.find(i => i.id === id);
  if (issue) {
    issue.status = 'Resolved';
    issue.updated = new Date().toISOString();
    saveIssues(GLOBAL_ISSUES);
  }
  simulateAction('Issue Resolved');
  triggerLiveReRender();
}

function openMeetParentModal(studentName) {
  const modalHTML = `
    <div class="modal-overlay" id="meet-parent-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
      <div class="modal" style="max-width:400px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
          <h3 style="margin:0">Schedule Parent Meeting</h3>
          <button onclick="document.getElementById('meet-parent-modal').remove()" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--color-text)">&times;</button>
        </div>
        <div class="form-group">
          <label>Student Name</label>
          <input type="text" class="form-control" value="${studentName}" readonly>
          <label style="margin-top:10px">Parent Name</label>
          <input type="text" class="form-control" value="Parent of ${studentName}" readonly>
          <label style="margin-top:10px">Parent Contact</label>
          <input type="text" class="form-control" value="+91 98XXXXXX89" readonly>
          
          <label style="margin-top:10px">Meeting Date</label>
          <input type="date" class="form-control" id="meet-date">
          
          <label style="margin-top:10px">Meeting Time</label>
          <input type="time" class="form-control" id="meet-time">
          
          <label style="margin-top:10px">Meeting Agenda / Notes</label>
          <textarea class="form-control" id="meet-notes" rows="3" style="resize:none"></textarea>
          
          <div style="display:flex;gap:10px;margin-top:15px">
              <button class="btn-primary" style="flex:1" onclick="document.getElementById('meet-parent-modal').remove(); simulateAction('Meeting scheduled successfully'); triggerLiveReRender();">Confirm Meeting</button>
              <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('meet-parent-modal').remove()">Cancel</button>
          </div>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function openVPCaseModal(id) {
  let issue = GLOBAL_ISSUES.find(i => i.id === id);
  if (!issue) {
    // Mock fallback
    issue = {
      id: id, title: 'Mock Case', desc: 'Mock details', status: 'Open', stage: 'VP',
      studentName: 'Student', class: '9-C', category: 'Discipline', priority: 'High',
      reporterName: 'System', created: new Date().toISOString(), updated: new Date().toISOString(),
      timeline: []
    };
  }

  // Check if viewIssue handles the exact full drawer functionality!
  // The existing viewIssue(id) does EXACTLY what is requested (timeline, reply, resolve, escalate)
  // BUT we will just use viewIssue directly or customize it here. Yes, viewIssue exists!
  if (typeof viewIssue === 'function') {
    // If it's a mock issue not in GLOBAL_ISSUES, push it first!
    if (!GLOBAL_ISSUES.find(i => i.id === id)) {
      GLOBAL_ISSUES.push(issue);
    }
    viewIssue(id);
  }
}

function openForwardCoordModal(id, studentName, summary) {
  const modalHTML = `
    <div class="modal-overlay" id="forward-coord-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
      <div class="modal" style="max-width:400px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
          <h3 style="margin:0">Forward to Coordinator</h3>
          <button onclick="document.getElementById('forward-coord-modal').remove()" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--color-text)">&times;</button>
        </div>
        <div class="form-group">
          <label>Student Name</label>
          <input type="text" class="form-control" value="${studentName}" readonly>
          <label style="margin-top:10px">Issue Summary</label>
          <input type="text" class="form-control" value="${summary}" readonly>
          
          <label style="margin-top:10px">Reason for forwarding / Additional notes</label>
          <textarea class="form-control" id="fw-notes" rows="3" style="resize:none"></textarea>
          
          <label style="margin-top:10px">Assign to Coordinator</label>
          <select class="form-control" id="fw-coord">
             <option value="C001">C001 - Anitha</option>
             <option value="C002">C002 - Rajesh</option>
          </select>
          
          <div style="display:flex;gap:10px;margin-top:15px">
              <button class="btn-primary" style="flex:1;background:var(--color-danger);border-color:var(--color-danger)" onclick="confirmForwardCoord('${id}')">Confirm Forward</button>
              <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('forward-coord-modal').remove()">Cancel</button>
          </div>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function confirmForwardCoord(id) {
  let issue = GLOBAL_ISSUES.find(i => i.id === id);
  if (issue) {
    issue.stage = 'Coordinator';
    issue.status = 'Escalated';
    const note = document.getElementById('fw-notes').value || 'No additional notes.';
    issue.timeline.push({
      date: new Date().toISOString(),
      actor: currentUser.name || 'VP',
      role: 'VP',
      note: 'Forwarded to Coordinator. Notes: ' + note
    });
    issue.updated = new Date().toISOString();
    saveIssues(GLOBAL_ISSUES);
  }
  document.getElementById('forward-coord-modal').remove();
  localStorage.setItem('vp_issue_tab', 'escalated');
  simulateAction('Issue forwarded to Coordinator successfully');
  triggerLiveReRender();
}

function vpRestoreIssue(id) {
  let issue = GLOBAL_ISSUES.find(i => i.id === id);
  if (issue) {
    issue.stage = 'VP';
    issue.status = 'Pending Action';
    issue.updated = new Date().toISOString();
    issue.timeline = issue.timeline || [];
    issue.timeline.push({
      date: new Date().toISOString(),
      actor: currentUser.name || 'VP',
      role: 'VP',
      note: 'Restored to VP main queue.'
    });
    saveIssues(GLOBAL_ISSUES);
  }
  localStorage.setItem('vp_issue_tab', 'main');
  simulateAction('Issue restored to main queue');
  triggerLiveReRender();
}

function vpResolveEscalationIssue(id) {
  const store = getEscalationStore();
  const idx = store.vpEscalated.findIndex(i => String(i.id) === String(id));
  if (idx < 0) return;
  const issue = store.vpEscalated.splice(idx, 1)[0];
  issue.status = 'Resolved';
  issue.stage = 'resolved';
  issue.timeline = issue.timeline || [];
  issue.timeline.push({
    action: 'Resolved by VP',
    by: (currentUser && currentUser.name) || 'VP',
    role: 'VP',
    date: new Date().toLocaleString(),
    note: 'Resolved from VP escalated queue'
  });
  store.resolvedIssues.unshift(issue);
  saveEscalationStore(store);
  simulateAction('Issue resolved');
  triggerLiveReRender();
}

function vpRestoreEscalationIssue(id) {
  const store = getEscalationStore();
  const idx = store.vpEscalated.findIndex(i => String(i.id) === String(id));
  if (idx < 0) return;
  const issue = store.vpEscalated.splice(idx, 1)[0];
  issue.status = 'Pending Action';
  issue.stage = 'teacher';
  issue.timeline = issue.timeline || [];
  issue.timeline.push({
    action: 'Restored to Main',
    by: (currentUser && currentUser.name) || 'VP',
    role: 'VP',
    date: new Date().toLocaleString(),
    note: 'Restored from VP escalated queue'
  });
  store.teacherInbox.unshift(issue);
  saveEscalationStore(store);
  localStorage.setItem('vp_issue_tab', 'main');
  simulateAction('Issue restored to main');
  triggerLiveReRender();
}


// --- FIX 2: TIMETABLE REVIEW MODALS ---
function openAssignSubModal(teacher, periodInfo) {
  const modalHTML = `
    <div class="modal-overlay" id="assign-sub-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
      <div class="modal" style="max-width:400px">
        <h3 style="margin-top:0">Assign Substitute Teacher</h3>
        <div class="form-group">
          <label>Missing Teacher</label>
          <input type="text" class="form-control" value="${teacher}" readonly>
          <label style="margin-top:10px">Period & Subject</label>
          <input type="text" class="form-control" value="${periodInfo}" readonly>
          <label style="margin-top:10px">Select Substitute Teacher</label>
          <select class="form-control" id="sub-teacher">
             <option>Ramesh Sharma</option>
             <option>Prasana Reddy</option>
             <option>Venkat Iyer</option>
             <option>Sunita Verma</option>
             <option>Mohan Das</option>
             <option>Pooja Mehta</option>
          </select>
          <div style="display:flex;gap:10px;margin-top:15px">
              <button class="btn-primary" style="flex:1" onclick="document.getElementById('assign-sub-modal').remove(); simulateAction('Substitute assigned successfully'); localStorage.setItem('vp_sub_assigned', 'true'); triggerLiveReRender();">Confirm Assignment</button>
              <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('assign-sub-modal').remove()">Cancel</button>
          </div>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function openAdjAllocModal() {
  const modalHTML = `
    <div class="modal-overlay" id="adj-alloc-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
      <div class="modal" style="max-width:400px">
        <h3 style="margin-top:0">Adjust Period Allocation</h3>
        <table style="width:100%;text-align:left;border-collapse:collapse;margin-bottom:15px">
           <tr><th style="padding:8px;border-bottom:1px solid var(--color-border)">Teacher</th><th style="padding:8px;border-bottom:1px solid var(--color-border)">Max Free</th></tr>
           <tr><td style="padding:8px;border-bottom:1px solid var(--color-border)">Mohan Das</td><td style="padding:8px;border-bottom:1px solid var(--color-border)"><input type="number" class="form-control" value="2" style="width:60px"></td></tr>
           <tr><td style="padding:8px;border-bottom:1px solid var(--color-border)">Ramesh Sharma</td><td style="padding:8px;border-bottom:1px solid var(--color-border)"><input type="number" class="form-control" value="3" style="width:60px"></td></tr>
           <tr><td style="padding:8px;border-bottom:1px solid var(--color-border)">Anita Pillai</td><td style="padding:8px;border-bottom:1px solid var(--color-border)"><input type="number" class="form-control" value="1" style="width:60px"></td></tr>
        </table>
        <div style="display:flex;gap:10px">
            <button class="btn-primary" style="flex:1" onclick="document.getElementById('adj-alloc-modal').remove(); simulateAction('Allocation updated');">Save Allocation</button>
            <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('adj-alloc-modal').remove()">Cancel</button>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function openEditTimetableMode() {
  // Close any existing modal
  const old = document.getElementById('edit-tt-modal');
  if (old) old.remove();

  const shown = SCHEDULE.slice(0, 5); // Default to today's set
  const modalHTML = `
    <div class="modal-overlay" id="edit-tt-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
      <div class="modal" style="max-width:800px;width:100%">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
            <div>
              <h3 style="margin-top:0">✏️ Edit Timetable Grid</h3>
              <p style="font-size:12px;color:var(--color-text-muted)">Modify period details. Changes will reflect in institutional view.</p>
            </div>
            <div style="display:flex;gap:10px">
               <button class="btn-primary" style="background:var(--color-success);border-color:var(--color-success)" onclick="document.getElementById('edit-tt-modal').remove(); simulateAction('Institutional timetable updated successfully'); triggerLiveReRender();">Save Changes</button>
               <button style="background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer;padding:8px 16px" onclick="document.getElementById('edit-tt-modal').remove()">Cancel</button>
            </div>
        </div>
        <div style="overflow-x:auto">
          <table class="data-table">
            <thead>
              <tr><th>Time</th><th>Subject</th><th>Class</th><th>Teacher</th><th>Room</th></tr>
            </thead>
            <tbody>
              ${shown.map((s, i) => `<tr>
                <td><input type="text" class="form-control" value="${s.time}" style="min-width:100px"></td>
                <td>
                  <select class="form-control">
                    <option selected>${s.subject}</option>
                    <option>Mathematics</option><option>Science</option><option>English</option><option>Social</option>
                  </select>
                </td>
                <td><input type="text" class="form-control" value="${s.class}" style="max-width:60px"></td>
                <td>
                  <select class="form-control">
                    <option selected>${s.teacher}</option>
                    <option>Ramesh Sharma</option><option>Prasana Reddy</option><option>Venkat Iyer</option>
                  </select>
                </td>
                <td><input type="text" class="form-control" value="${s.room}" style="max-width:80px"></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function buildAllIssuesSuperAdmin(user) {
  const list = GLOBAL_ISSUES.map(i => `
        <tr onclick="viewIssue('${i.id}')" style="cursor:pointer">
            <td><strong>${i.id}</strong></td>
            <td>${i.studentName}</td>
            <td>${i.category}</td>
            <td><span class="badge" style="background:var(--color-surface-2);color:var(--color-text)">${i.stage}</span></td>
            <td><span class="badge ${i.status === 'Open' ? 'badge-pending' : 'badge-active'}">${i.status}</span></td>
            <td>${new Date(i.created).toLocaleDateString()}</td>
        </tr>
    `).join('');

  return `<div class="dash-section" id="section-all_issues">
        <div class="card">
            <h3>📑 System-wide Issue Log</h3>
            <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:15px">Complete audit of all student and institutional concerns.</p>
            <div style="overflow-x:auto"><table class="data-table"><thead><tr><th>ID</th><th>Student</th><th>Category</th><th>Stage</th><th>Status</th><th>Date</th></tr></thead><tbody>${list || '<tr><td colspan="6" style="text-align:center">No issues recorded.</td></tr>'}</tbody></table></div>
        </div>
    </div>`;
}


// --- FIX 3: MESSAGES ---
function sendMsgReply(index) {
  let activeMessages = JSON.parse(localStorage.getItem('campuscore_vp_msgs')) || VP_MESSAGES.map((m, i) => ({ ...m, _id: i, replies: [] }));
  let content = document.getElementById('reply-text-' + index).value.trim();
  if (!content) return;
  if (!activeMessages[index].replies) activeMessages[index].replies = [];
  activeMessages[index].replies.push({ sender: currentUser.name, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), content });
  localStorage.setItem('campuscore_vp_msgs', JSON.stringify(activeMessages));
  simulateAction('Reply sent');
  triggerLiveReRender();
}
function openMsgForwardModal(sub, sender) {
  const m = `<div class="modal-overlay" id="fwd-msg-modal" style="display:flex" onclick="if(event.target===this) this.remove()"><div class="modal" style="max-width:400px"><h3 style="margin-top:0">Forward Message</h3>
    <div class="form-group"><label>Forward To</label><select class="form-control"><option>Coordinator</option><option>Teacher</option><option>Admin</option></select><label style="margin-top:10px">Add forwarding note (optional)</label><textarea class="form-control" rows="3"></textarea>
    <div style="display:flex;gap:10px;margin-top:15px"><button class="btn-primary" style="flex:1" onclick="document.getElementById('fwd-msg-modal').remove(); simulateAction('Message forwarded');">Forward</button><button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;border-radius:8px" onclick="document.getElementById('fwd-msg-modal').remove()">Cancel</button></div></div></div></div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}
function openBroadcastModal() {
  const m = `<div class="modal-overlay" id="bc-modal" style="display:flex" onclick="if(event.target===this) this.remove()"><div class="modal" style="max-width:400px"><h3 style="margin-top:0">Broadcast Message</h3>
    <div class="form-group"><label>Target Audience</label><select class="form-control"><option>All Staff</option><option>Teachers Only</option><option>Coordinators Only</option></select><label style="margin-top:10px">Message</label><textarea class="form-control" rows="4"></textarea>
    <div style="display:flex;gap:10px;margin-top:15px"><button class="btn-primary" style="flex:1" onclick="document.getElementById('bc-modal').remove(); simulateAction('Broadcast sent to staff members');">Send Broadcast</button><button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;border-radius:8px" onclick="document.getElementById('bc-modal').remove()">Cancel</button></div></div></div></div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}
function openNewMessageModal() {
  const m = `<div class="modal-overlay" id="nm-modal" style="display:flex" onclick="if(event.target===this) this.remove()"><div class="modal" style="max-width:400px"><h3 style="margin-top:0">New Message</h3>
    <div class="form-group"><label>To</label><select class="form-control"><option>Anitha (Coordinator)</option><option>Venkat (Teacher)</option></select><label style="margin-top:10px">Subject</label><input type="text" class="form-control"><label style="margin-top:10px">Message</label><textarea class="form-control" rows="4"></textarea>
    <div style="display:flex;gap:10px;margin-top:15px"><button class="btn-primary" style="flex:1" onclick="document.getElementById('nm-modal').remove(); simulateAction('Message sent');">Send</button><button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;border-radius:8px" onclick="document.getElementById('nm-modal').remove()">Cancel</button></div></div></div></div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}


// --- FIX 4: NOTICES ---
function archiveNotice(index) {
  let live = JSON.parse(localStorage.getItem('campuscore_notices')) || ANNOUNCEMENTS;
  let archived = JSON.parse(localStorage.getItem('campuscore_notices_archived')) || [];
  const picked = live[index];
  if (!picked) return;
  archived.unshift(picked);
  live.splice(index, 1);
  localStorage.setItem('campuscore_notices', JSON.stringify(live));
  localStorage.setItem('campuscore_notices_archived', JSON.stringify(archived));
  localStorage.setItem('vp_notice_tab', 'archived');
  simulateAction('Notice archived');
  triggerLiveReRender();
}

function restoreNotice(index) {
  let live = JSON.parse(localStorage.getItem('campuscore_notices')) || ANNOUNCEMENTS;
  let archived = JSON.parse(localStorage.getItem('campuscore_notices_archived')) || [];
  const picked = archived[index];
  if (!picked) return;
  live.unshift(picked);
  archived.splice(index, 1);
  localStorage.setItem('campuscore_notices', JSON.stringify(live));
  localStorage.setItem('campuscore_notices_archived', JSON.stringify(archived));
  localStorage.setItem('vp_notice_tab', 'active');
  simulateAction('Notice restored');
  triggerLiveReRender();
}
function openNoticeModal(editIndex = null) {
  let live = JSON.parse(localStorage.getItem('campuscore_notices')) || ANNOUNCEMENTS;
  let n = editIndex !== null ? live[editIndex] : { title: '', body: '', category: 'Events', target: 'All', priority: 'High' };

  const m = `<div class="modal-overlay" id="notice-modal" style="display:flex" onclick="if(event.target===this) this.remove()"><div class="modal" style="max-width:500px;width:100%"><h3 style="margin-top:0">${editIndex !== null ? 'Edit Notice' : 'Create New Notice'}</h3>
    <div class="form-group">
      <label>Notice Title</label><input type="text" id="n-title" class="form-control" value="${n.title}">
      <label style="margin-top:10px">Notice Body / Description</label><textarea id="n-body" class="form-control" rows="4">${n.body || ''}</textarea>
      
      <div style="display:flex;gap:10px;margin-top:10px">
          <div style="flex:1"><label>Category</label><select id="n-cat" class="form-control"><option ${n.category === 'Events' ? 'selected' : ''}>Events</option><option ${n.category === 'Academic' ? 'selected' : ''}>Academic</option><option ${n.category === 'Meeting' ? 'selected' : ''}>Meeting</option><option ${n.category === 'Finance' ? 'selected' : ''}>Finance</option><option ${n.category === 'Holiday' ? 'selected' : ''}>Holiday</option><option ${n.category === 'General' ? 'selected' : ''}>General</option></select></div>
          <div style="flex:1"><label>Target</label><select id="n-tar" class="form-control"><option ${n.target === 'All' ? 'selected' : ''}>All</option><option ${n.target === 'Teachers' ? 'selected' : ''}>Teachers</option><option ${n.target === 'Parents' ? 'selected' : ''}>Parents</option><option ${n.target === 'Students' ? 'selected' : ''}>Students</option><option ${n.target === 'Coordinators' ? 'selected' : ''}>Coordinators</option></select></div>
      </div>
      <label style="margin-top:10px">Priority</label><select id="n-pri" class="form-control"><option ${n.priority === 'High' ? 'selected' : ''}>high</option><option ${n.priority === 'Medium' ? 'selected' : ''}>medium</option><option ${n.priority === 'Low' ? 'selected' : ''}>low</option></select>
      
      <div style="display:flex;gap:10px;margin-top:20px">
          <button class="btn-primary" style="flex:2" onclick="saveNotice(${editIndex})">${editIndex !== null ? 'Update Notice' : 'Publish'}</button>
          <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;border-radius:8px" onclick="document.getElementById('notice-modal').remove()">Save as Draft</button>
          <button style="flex:1;background:none;border:none;color:var(--color-text-muted);cursor:pointer;border-radius:8px" onclick="document.getElementById('notice-modal').remove()">Cancel</button>
      </div>
    </div></div></div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}
function saveNotice(editIndex) {
  let t = document.getElementById('n-title').value.trim();
  let b = document.getElementById('n-body').value.trim();
  if (!t || !b) { simulateAction('Please fill all fields'); return; }

  let live = JSON.parse(localStorage.getItem('campuscore_notices')) || ANNOUNCEMENTS;
  let n = {
    title: t, body: b,
    category: document.getElementById('n-cat').value,
    target: document.getElementById('n-tar').value,
    priority: document.getElementById('n-pri').value,
    author: currentUser.name, date: new Date().toLocaleDateString('en-GB')
  };

  if (editIndex !== null) live[editIndex] = n;
  else live.unshift(n);

  localStorage.setItem('campuscore_notices', JSON.stringify(live));
  document.getElementById('notice-modal').remove();
  simulateAction(editIndex !== null ? 'Notice updated' : 'Notice published successfully');
  triggerLiveReRender();
}

// ==========================================
// FEATURE EXPANSION: DOCUMENT MANAGEMENT
// ==========================================

function buildDocumentUploadSection(user) {
  const docs = JSON.parse(localStorage.getItem('campuscore_documents') || '[]');
  const myDocs = docs.filter(d => d.author === user.name || user.role === 'principal' || user.role === 'vice_principal');

  const rows = myDocs.map(d => `
        <tr>
            <td>${d.title}</td>
            <td><span class="badge badge-info">${d.type}</span></td>
            <td>${d.class}</td>
            <td>${d.subject}</td>
            <td>${d.date}</td>
            <td><button class="btn-primary" style="padding:4px 8px;background:var(--color-danger);border:none" onclick="deleteDocument('${d.id}')"><i class="fas fa-trash"></i></button></td>
        </tr>
    `).join('');

  return `<div class="dash-section" id="section-document_upload">
        <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
                <h3>📤 Document Repository</h3>
                <button class="btn-primary" onclick="openUploadDocModal()"><i class="fas fa-plus"></i> Upload New</button>
            </div>
            <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:15px">Upload circulars, notes, and assignments for students and parents.</p>
            <div style="overflow-x:auto"><table class="data-table"><thead><tr><th>Title</th><th>Type</th><th>Target Class</th><th>Subject</th><th>Date</th><th>Action</th></tr></thead><tbody>${rows || '<tr><td colspan="6" style="text-align:center">No documents uploaded yet.</td></tr>'}</tbody></table></div>
        </div>
    </div>`;
}

function buildManageDocuments(user) {
  const docs = JSON.parse(localStorage.getItem('campuscore_documents') || '[]');
  const rows = docs.map(d => `
        <tr>
            <td>${d.id}</td>
            <td><strong>${d.title}</strong></td>
            <td>${d.author}</td>
            <td><span class="badge badge-info">${d.type}</span></td>
            <td>${d.class}</td>
            <td>${d.date}</td>
            <td><button class="btn-primary" style="padding:4px 8px;background:var(--color-danger);border:none" onclick="deleteDocument('${d.id}')">Delete</button></td>
        </tr>
    `).join('');

  return `<div class="dash-section" id="section-manage_documents">
        <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
                <h3>📂 Master Document Management</h3>
                <div style="display:flex;gap:10px;align-items:center">
                    <span class="badge badge-active">${docs.length} Total Files</span>
                    <button class="btn-primary" style="padding:8px 16px" onclick="openUploadDocModal()"><i class="fas fa-plus"></i> Upload New</button>
                </div>
            </div>
            <div style="overflow-x:auto"><table class="data-table"><thead><tr><th>ID</th><th>Title</th><th>Author</th><th>Type</th><th>Class</th><th>Date</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div>
        </div>
    </div>`;
}

function openUploadDocModal() {
  const m = `<div class="modal-overlay" id="upload-doc-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
        <div class="modal" style="max-width:500px">
            <h3>Upload Document</h3>
            <div class="form-group">
                <label>Document Title</label><input type="text" id="doc-title" class="form-control" placeholder="e.g. Science Project Guidelines">
                <label>Target Class</label>
                <select id="doc-class" class="form-control">
                    <option>All Classes</option><option>10A</option><option>10B</option><option>9A</option><option>9B</option><option>9C</option><option>8A</option>
                </select>
                <label>Subject</label><input type="text" id="doc-subj" class="form-control" placeholder="e.g. Mathematics">
                <label>Document Type</label>
                <select id="doc-type" class="form-control">
                    <option>Notes</option><option>Circular</option><option>Assignment</option><option>Logsheet</option><option>Syllabus</option>
                </select>
                <label>Upload File</label>
                <input type="file" id="doc-file" class="form-control" style="padding:10px" />
            </div>
            <div style="margin-top:20px;display:flex;gap:10px">
                <button class="btn-primary" style="flex:1" onclick="saveDocument()">Save Document</button>
                <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:8px" onclick="document.getElementById('upload-doc-modal').remove()">Cancel</button>
            </div>
        </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}
function saveDocument() {
  const fileInput = document.getElementById('doc-file');
  let title = document.getElementById('doc-title').value.trim();
  if (!title && fileInput && fileInput.files.length > 0) {
    title = fileInput.files[0].name;
  }
  if (!title) { alert('Please enter a title or choose a file.'); return; }
  const newDoc = {
    id: 'DOC' + Date.now().toString().slice(-4),
    title,
    author: (typeof currentUser !== 'undefined' && currentUser.name) ? currentUser.name : 'System Admin',
    type: document.getElementById('doc-type').value,
    class: document.getElementById('doc-class').value,
    date: new Date().toLocaleDateString()
  };
  let docs = JSON.parse(localStorage.getItem('campuscore_documents') || '[]');
  docs.unshift(newDoc);
  localStorage.setItem('campuscore_documents', JSON.stringify(docs));
  simulateAction('Document uploaded successfully!');
  document.getElementById('upload-doc-modal').remove();
  triggerLiveReRender();
}
function deleteDocument(id) {
  if (confirm('Delete document ' + id + '?')) {
    let docs = JSON.parse(localStorage.getItem('campuscore_documents') || '[]');
    docs = docs.filter(d => d.id !== id);
    localStorage.setItem('campuscore_documents', JSON.stringify(docs));
    simulateAction('Document deleted');
    triggerLiveReRender();
  }
}

// ==========================================
// FEATURE EXPANSION: MULTI-STAGE APPROVALS
// ==========================================

function buildStaffApprovals(user) {
  const reqs = JSON.parse(localStorage.getItem('campuscore_student_requests') || '[]');
  // Filter based on role stage

  let targetStage = 'Teacher';
  if (user.role === 'coordinator') targetStage = 'Coordinator';
  if (user.role === 'vice_principal') targetStage = 'VP';
  if (user.role === 'principal') targetStage = 'Principal';

  const myStageReqs = reqs.filter(r => r.stage === targetStage && r.status === 'Pending');

  const rows = myStageReqs.map(r => `
        <tr>
            <td>${r.id}</td>
            <td><strong>${r.studentName}</strong></td>
            <td>${r.type}</td>
            <td style="font-size:12px">${r.title}</td>
            <td>${r.date}</td>
            <td><div style="display:flex;gap:5px">
                <button class="btn-primary" style="padding:4px 8px;font-size:11px" onclick="approveRequest('${r.id}')">Approve</button>
                <button style="padding:4px 8px;font-size:11px;background:var(--color-danger);color:white;border:none;border-radius:4px" onclick="rejectRequest('${r.id}')">Reject</button>
            </div></td>
        </tr>
    `).join('');

  return `<div class="dash-section" id="section-approvals">
        <div class="card">
            <h3>⏳ Pending Approvals (${targetStage} Level)</h3>
            <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:15px">Review and process student/parent requests.</p>
            <div style="overflow-x:auto"><table class="data-table"><thead><tr><th>ID</th><th>Student</th><th>Type</th><th>Details</th><th>Date</th><th>Action</th></tr></thead><tbody>${rows || '<tr><td colspan="6" style="text-align:center">No pending requests for your stage.</td></tr>'}</tbody></table></div>
        </div>
    </div>`;
}

function approveRequest(id) {
  let reqs = JSON.parse(localStorage.getItem('campuscore_student_requests') || '[]');
  const idx = reqs.findIndex(r => r.id === id);
  if (idx === -1) return;

  const r = reqs[idx];
  const stages = ['Teacher', 'Coordinator', 'VP', 'Principal', 'Completed'];
  const currentIdx = stages.indexOf(r.stage);

  if (currentIdx < stages.length - 2) {
    r.stage = stages[currentIdx + 1];
    simulateAction('Request approved and forwarded to ' + r.stage);
  } else {
    r.stage = 'Completed';
    r.status = 'Approved';
    simulateAction('Request fully approved!');
  }

  localStorage.setItem('campuscore_student_requests', JSON.stringify(reqs));
  triggerLiveReRender();
}

function rejectRequest(id) {
  if (!confirm('Reject this request?')) return;
  let reqs = JSON.parse(localStorage.getItem('campuscore_student_requests') || '[]');
  const idx = reqs.findIndex(r => r.id === id);
  if (idx === -1) return;

  reqs[idx].status = 'Rejected';
  localStorage.setItem('campuscore_student_requests', JSON.stringify(reqs));
  simulateAction('Request rejected');
  triggerLiveReRender();
}

// ==========================================
// FEATURE EXPANSION: HELPDESK
// ==========================================

function buildStaffHelpdesk(user) {
  const filter = localStorage.getItem('helpdesk_filter') || 'All';
  const raw = JSON.parse(localStorage.getItem('campuscore_helpdesk_tickets') || '[]');
  const tickets = filter === 'All' ? raw : raw.filter(t => t.status === filter);

  const rows = tickets.map(t => `
        <tr>
            <td>${t.id}</td>
            <td><strong>${t.studentName}</strong></td>
            <td><div style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t.subject}</div></td>
            <td><span class="badge ${t.priority === 'High' ? 'badge-danger' : t.priority === 'Medium' ? 'badge-warning' : 'badge-active'}">${t.priority}</span></td>
            <td><span class="badge ${t.status === 'Open' ? 'badge-pending' : t.status === 'Resolved' ? 'badge-active' : 'badge-info'}">${t.status}</span></td>
            <td>
                <div style="display:flex;gap:6px">
                    <button class="btn-primary" style="padding:4px 8px;font-size:11px" onclick="viewTicketDetails('${t.id}')">View</button>
                    ${(user.role === 'super_admin' || user.role === 'apaaas' || user.role === 'principal' || user.role === 'vice_principal') && t.status === 'Open' ? `
                        <div style="display:flex;gap:5px">
                           <button style="padding:4px 8px;font-size:11px;background:var(--color-success);color:white;border:none;border-radius:4px;cursor:pointer" onclick="resolveTicket('${t.id}')">Resolve</button>
                           <button style="padding:4px 8px;font-size:11px;background:var(--color-primary);color:white;border:none;border-radius:4px;cursor:pointer" onclick="helpParent('${t.id}', '${t.studentName}')">Help Parent</button>
                           <button style="padding:4px 8px;font-size:11px;background:var(--color-surface-2);color:var(--color-text);border:1px solid var(--color-border);border-radius:4px;cursor:pointer" onclick="replyTicket('${t.id}')">Reply</button>
                        </div>
                    ` : ''}
                </div>
            </td>
        </tr>
    `).join('');

  return `<div class="dash-section" id="section-helpdesk_staff">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:15px">
             <div>
                <h3>🎧 Support Helpdesk</h3>
                <p style="color:var(--color-text-muted);font-size:13px">Managing institutional support requests.</p>
            </div>
            <div style="display:flex;gap:6px">
                <button class="btn-primary" style="padding:8px 12px;font-size:12px;${filter === 'All' ? '' : 'opacity:0.6'}" onclick="setHelpdeskFilter('All')">All</button>
                <button class="btn-primary" style="padding:8px 12px;font-size:12px;${filter === 'Open' ? '' : 'opacity:0.6'}" onclick="setHelpdeskFilter('Open')">Open</button>
                <button class="btn-primary" style="padding:8px 12px;font-size:12px;${filter === 'Resolved' ? '' : 'opacity:0.6'}" onclick="setHelpdeskFilter('Resolved')">Resolved</button>
            </div>
        </div>
        <div class="card">
            <div style="overflow-x:auto"><table class="data-table"><thead><tr><th>ID</th><th>Student</th><th>Subject</th><th>Priority</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows || '<tr><td colspan="6" style="text-align:center;padding:20px">No tickets found.</td></tr>'}</tbody></table></div>
        </div>
    </div>`;
}

function setHelpdeskFilter(f) {
  localStorage.setItem('helpdesk_filter', f);
  triggerLiveReRender();
}
function viewTicketDetails(id) {
  const raw = JSON.parse(localStorage.getItem('campuscore_helpdesk_tickets') || '[]');
  const t = raw.find(x => x.id === id);
  if (!t) return;
  const m = `
    <div class="modal-overlay" id="ticket-view-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
        <div class="modal" style="max-width:500px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
                <h3 style="margin:0">Ticket #${t.id}</h3>
                <button class="modal-close" onclick="document.getElementById('ticket-view-modal').remove()">×</button>
            </div>
            <div style="margin-bottom:15px"><strong>Subject:</strong> ${t.subject}</div>
            <div style="margin-bottom:15px;background:var(--color-surface-2);padding:12px;border-radius:8px;font-size:14px;white-space:pre-wrap">${t.content || 'No description provided.'}</div>
            <div style="font-size:12px;color:var(--color-text-muted)">Raised by ${t.studentName} · Priority: ${t.priority}</div>
            ${t.resolution ? `<div style="margin-top:20px;padding:12px;background:rgba(92,168,112,0.1);border-left:4px solid var(--color-success);border-radius:4px">
                <div style="font-weight:700;color:var(--color-success);margin-bottom:4px">Resolution:</div>
                <div style="font-size:14px">${t.resolution}</div>
            </div>` : ''}
        </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}
function replyTicket(id) {
  const r = prompt('Type your reply/internal note for this ticket:');
  if (r) {
    let t = JSON.parse(localStorage.getItem('campuscore_helpdesk_tickets') || '[]');
    const idx = t.findIndex(x => x.id === id);
    if (idx !== -1) {
      if (!t[idx].notes) t[idx].notes = [];
      t[idx].notes.push({ sender: currentUser.name, time: new Date().toLocaleString(), text: r });
      localStorage.setItem('campuscore_helpdesk_tickets', JSON.stringify(t));
      simulateAction('Reply added to ticket ' + id);
      triggerLiveReRender();
    }
  }
}


window.setRoleView = function (role) {
  localStorage.setItem('role_view_active', role);
  simulateAction('Sifting system perspective to ' + role + '...');
  triggerLiveReRender();
};

function buildRoleViews(user) {
  const activeRole = localStorage.getItem('role_view_active') || 'none';

  const roles = [
    { id: 'principal', icon: 'fa-user-shield', label: 'Principal', desc: 'Institutional oversight' },
    { id: 'vice_principal', icon: 'fa-user-tie', label: 'VP', desc: 'Academic operations' },
    { id: 'teacher', icon: 'fa-chalkboard-teacher', label: 'Teacher', desc: 'Classroom & Results' },
    { id: 'coordinator', icon: 'fa-sitemap', label: 'Coordinator', desc: 'Dept. Head view' },
    { id: 'parent', icon: 'fa-user-friends', label: 'Parent', desc: 'Child progress' },
    { id: 'student', icon: 'fa-user-graduate', label: 'Student', desc: 'Learning & Profile' }
  ];

  const cards = roles.map(r => `
        <div class="card" onclick="setRoleView('${r.id}')" style="cursor:pointer;border:${activeRole === r.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)'};transition:all 0.2s;background:${activeRole === r.id ? 'rgba(25,118,210,0.05)' : 'var(--color-surface)'}">
            <div style="font-size:32px;margin-bottom:12px;color:var(--color-primary)"><i class="fas ${r.icon}"></i></div>
            <h4 style="margin:0">${r.label}</h4>
            <p style="font-size:11px;color:var(--color-text-muted);margin-top:4px">${r.desc}</p>
        </div>
    `).join('');

  let previewContent = `
        <div style="height:400px;display:flex;flex-direction:column;justify-content:center;align-items:center;color:var(--color-text-muted);border:2px dashed var(--color-border);border-radius:12px;background:var(--color-surface-2);margin-top:20px">
            <i class="fas fa-ghost" style="font-size:48px;margin-bottom:16px;opacity:0.3"></i>
            <p>Select a role card above to enter Ghost-Preview mode.</p>
        </div>
    `;

  if (activeRole !== 'none') {
    const dummyUser = { ...user, role: activeRole, name: "AUDIT PREVIEW (" + activeRole.toUpperCase() + ")" };
    // Resolve correctly for student/parent who might have special IDs in preview
    if (activeRole === 'student') dummyUser.id = '3180076';
    if (activeRole === 'parent') { dummyUser.id = '50'; dummyUser.childId = '3180076'; }

    previewContent = `
            <div style="margin-top:20px;position:relative;border:1px solid var(--color-border);border-radius:12px;overflow:hidden">
                <div style="background:var(--color-primary);padding:12px 20px;color:white;display:flex;justify-content:space-between;align-items:center">
                   <div style="display:flex;align-items:center;gap:10px;font-weight:700;font-size:14px">
                       <i class="fas fa-ghost"></i> GHOST MODE: ${activeRole.toUpperCase()} VIEW
                   </div>
                   <button class="btn-primary" style="padding:6px 12px;font-size:11px;background:rgba(255,255,255,0.2);border:1px solid white;color:white" onclick="setRoleView('none')">Exit Preview</button>
                </div>
                <div style="padding:24px;background:var(--color-background);max-height:600px;overflow-y:auto">
                    ${safeRender(activeRole + ' Dashboard', (activeRole === 'student' ? (window.buildStudentDashboard || buildHome) : (activeRole === 'parent' ? (window.buildParentDashboard || buildHome) : buildHome)), dummyUser).replace(/dash-section/g, 'mock-dash-section')}
                </div>
            </div>
        `;
  }

  return `<div class="dash-section" id="section-role_views">
        <div style="margin-bottom:20px">
            <h3>🎭 Role-View Master Console</h3>
            <p style="color:var(--color-text-muted);font-size:13px">Sift institutional perspective to verify data visibility and UI consistency.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:15px">
            ${cards}
        </div>
        ${previewContent}
    </div>`;
}

// --- TIMETABLE MASTER ---
window.openEditTimetableMode = function () {
  const m = `<div class="modal-overlay" id="tt-edit-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
        <div class="modal" style="max-width:600px">
            <h3>Timetable Master Management</h3>
            <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:20px">Modify period assignments for the entire school schedule.</p>
            <div style="max-height:400px;overflow:auto;display:flex;flex-direction:column;gap:10px;margin-bottom:20px">
                ${SCHEDULE.map((s, i) => `
                    <div style="display:flex;gap:10px;align-items:center;padding:10px;background:var(--color-surface-2);border-radius:10px;border:1px solid var(--color-border)">
                        <div style="width:30px;height:30px;background:${s.color};border-radius:50%"></div>
                        <div style="flex:1">
                            <input type="text" class="form-control" style="margin:0;font-size:12px;padding:6px" value="${s.subject}">
                            <div style="font-size:11px;color:var(--color-text-muted);margin-top:4px">${s.time} · ${s.class}</div>
                        </div>
                        <div style="flex:1">
                            <input type="text" class="form-control" style="margin:0;font-size:12px;padding:6px" value="${s.teacher}">
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="display:flex;gap:10px">
                <button class="btn-primary" style="flex:1" onclick="saveTimetableChanges()">Save New Master Schedule</button>
                <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px" onclick="document.getElementById('tt-edit-modal').remove()">Cancel</button>
            </div>
        </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
};

window.saveTimetableChanges = function () {
  simulateAction('Validating teacher availability matrix...');
  setTimeout(() => {
    simulateAction('Conflict check passed. Saving school timetable...');
    document.getElementById('tt-edit-modal').remove();
    triggerLiveReRender();
    simulateAction('New timetable published to all Student dashboards.');
  }, 1200);
};

window.openAssignSubModal = function (teacher, detail) {
  const m = `<div class="modal-overlay" id="sub-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
        <div class="modal" style="max-width:450px">
            <h3>Assign Manual Substitute</h3>
            <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:15px">For: ${detail}</p>
            <div class="form-group">
                <label>Absent Teacher</label><div class="form-control" style="background:var(--color-surface-2)">${teacher}</div>
                <label>Select Substitute</label>
                <select id="sub-teacher-select" class="form-control">
                    <option>Prasana Reddy (Math)</option><option>Anitha (Coord)</option><option>Sunita Verma (History)</option><option>Coach Raju (PE)</option>
                </select>
                <div style="display:flex;gap:10px;margin-top:20px">
                    <button class="btn-primary" style="flex:1" onclick="submitSubAssignment()">Confirm Proxy</button>
                    <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px" onclick="document.getElementById('sub-modal').remove()">Cancel</button>
                </div>
            </div>
        </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
};

window.submitSubAssignment = function () {
  const sub = document.getElementById('sub-teacher-select').value;
  simulateAction('Assigning ' + sub + ' as proxy...');
  localStorage.setItem('vp_sub_assigned', 'true');
  document.getElementById('sub-modal').remove();
  setTimeout(() => {
    simulateAction('Substitute assignment confirmed in system.');
    triggerLiveReRender();
  }, 800);
};


function setRoleView(r) {
  localStorage.setItem('role_view_active', r);
  triggerLiveReRender();
}

function buildAllAccounts(user) {
  const list = DEMO_USERS.filter(u => {
    const isAdminLogged = currentUser.role === 'apaaas' || currentUser.role === 'super_admin' || String(currentUser.username || '').toUpperCase() === 'APAAAS';
    const isTargetAdmin = u.role === 'super_admin' || u.username === 'APAAAS' || u.name === 'Admin';
    return isAdminLogged || !isTargetAdmin;
  }).map(u => {
    const isSuper = u.role === 'super_admin' || u.username === 'APAAAS';
    const roleLabel = isSuper ? 'System Administrator' : u.roleLabel;
    return `<tr>
            <td><div class="user-row"><div class="avatar" style="background:${u.avatar_color || '#ccc'}">${getInitials(u.name)}</div><strong>${u.name}</strong></div></td>
            <td><code>${u.username}</code></td>
            <td><span class="badge" style="background:var(--color-surface-2);color:var(--color-text)">${roleLabel}</span></td>
            <td>${u.email}</td>
            <td>
                <div style="display:flex;gap:6px">
                    <button class="btn-primary" style="padding:4px 8px;font-size:11px" onclick="viewAccount('${u.username}')">View</button>
                    ${!isSuper ? `<button style="padding:4px 8px;font-size:11px;background:none;border:1px solid var(--color-danger);color:var(--color-danger);border-radius:4px" onclick="deleteAccount('${u.username}')">Delete</button>` : ''}
                </div>
            </td>
        </tr>`;
  }).join('');

  return `<div class="dash-section" id="section-all_accounts">
        <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
                <h3>👥 Institutional Account Control</h3>
                <button class="btn-primary" onclick="simulateAction('Account creation wizard opened.')"><i class="fas fa-plus"></i> Create Account</button>
            </div>
            <div style="overflow-x:auto"><table class="data-table"><thead><tr><th>Name</th><th>User ID</th><th>Role</th><th>Email</th><th>Action</th></tr></thead><tbody>${list}</tbody></table></div>
        </div>
    </div>`;
}

function buildRemovedBin(user) {
  return `<div class="dash-section" id="section-removed_bin">
        <div class="card" style="text-align:center;padding:60px 20px">
            <div style="width:100px;height:100px;background:var(--color-surface-2);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px">
                <i class="fas fa-trash-alt" style="font-size:40px;opacity:0.2"></i>
            </div>
            <h3>Removed Personnel Archive</h3>
            <p style="color:var(--color-text-muted);max-width:400px;margin:12px auto 24px">All dismissed staff or withdrawn student accounts are held here for 30 days before permanent deletion.</p>
            <div style="background:rgba(211,47,47,0.05);border:1px solid rgba(211,47,47,0.2);padding:16px;border-radius:12px;display:inline-block">
                <p style="color:var(--color-danger);font-weight:700;font-size:14px"><i class="fas fa-info-circle"></i> Bin is currently empty.</p>
            </div>
        </div>
    </div>`;
}

// --- ESCALATION LOGIC ---
function openEscalateIssueModal(id) {
  const raw = (GLOBAL_ISSUES || []).find(i => i.id === id);
  if (!raw) return;
  const m = `<div class="modal-overlay" id="escalate-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
        <div class="modal" style="max-width:450px">
            <h3><i class="fas fa-level-up-alt" style="color:var(--color-primary)"></i> Escalate Issue</h3>
            <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:20px">Forwarding <strong>${raw.id}</strong> to the next authority level.</p>
            <div class="form-group">
                <label>Escalation Reason</label>
                <textarea id="esc-reason" class="form-control" rows="3" placeholder="Why are you escalating this?"></textarea>
                <label>Priority Override</label>
                <select id="esc-prio" class="form-control"><option>High</option><option>Urgent</option><option>Critical</option></select>
            </div>
            <div style="display:flex;gap:10px;margin-top:20px">
                <button class="btn-primary" style="flex:1" onclick="submitEscalation('${id}')">Confirm Escalation</button>
                <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px" onclick="document.getElementById('escalate-modal').remove()">Cancel</button>
            </div>
        </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

function submitEscalation(id) {
  const reason = document.getElementById('esc-reason').value;
  const prio = document.getElementById('esc-prio').value;
  if (!reason) { simulateAction('Please provide a reason'); return; }

  const issues = JSON.parse(localStorage.getItem('campuscore_issues') || '[]');
  const idx = issues.findIndex(i => i.id === id);
  if (idx !== -1) {
    const issue = issues[idx];
    const stages = ['Teacher', 'Coordinator', 'VP', 'Principal', 'Board'];
    const currentIdx = stages.indexOf(issue.stage || 'VP');
    issue.stage = stages[Math.min(currentIdx + 1, stages.length - 1)];
    issue.priority = prio;
    if (!issue.timeline) issue.timeline = [];
    issue.timeline.push({ date: new Date().toISOString(), action: 'Escalated to ' + issue.stage, by: currentUser.name, note: reason });

    localStorage.setItem('campuscore_issues', JSON.stringify(issues));
    window.GLOBAL_ISSUES = issues; // Sync state to fix live re-render
    document.getElementById('escalate-modal').remove();

    // Automatically close the issue view modal so they see the fresh dashboard state
    const issueModal = document.getElementById('issue-modal');
    if (issueModal) issueModal.remove();

    simulateAction('Successfully escalated to ' + issue.stage);
    triggerLiveReRender();
  }
}

// Consolidated in window.openApprovalCommentModal below

function approveApprovalItem(id) {
  simulateAction('Request ' + id + ' approved.');
  triggerLiveReRender();
}
function rejectApprovalItem(id) {
  simulateAction('Request ' + id + ' rejected.');
  triggerLiveReRender();
}

// Removed duplicate buildAllAccounts block. Main component relies on the secure filtering version defined higher up.


function buildRemovedBin(user) {
  return `<div class="dash-section" id="section-removed_bin">
        <div class="card" style="text-align:center;padding:40px">
            <div style="font-size:48px;color:var(--color-text-muted);margin-bottom:20px"><i class="fas fa-trash-alt"></i></div>
            <h3>🗑️ Removed Records Bin</h3>
            <p style="color:var(--color-text-muted);max-width:400px;margin:0 auto">Deleted students, staff, or issues can be restored from here. Currently empty.</p>
        </div>
    </div>`;
}

function setGhostRoleContext(role) {
  simulateAction('Entering ' + role + ' view context...');
}

// --- HELPDESK MASTER ---
function viewTicketDetails(id) {
  simulateAction('Full history and logs for ' + id + ' opened.');
}
function resolveTicket(id) {
  const r = prompt('Resolution message for student:');
  if (r) {
    let t = JSON.parse(localStorage.getItem('campuscore_helpdesk_tickets') || '[]');
    const idx = t.findIndex(x => x.id === id);
    if (idx !== -1) {
      t[idx].status = 'Resolved';
      t[idx].resolution = r;
      localStorage.setItem('campuscore_helpdesk_tickets', JSON.stringify(t));
      simulateAction('Ticket ' + id + ' marked as Resolved.');
      triggerLiveReRender();
    }
  }
}
function closeTicket(id) {
  if (confirm('Permanently close ticket ' + id + '?')) {
    let t = JSON.parse(localStorage.getItem('campuscore_helpdesk_tickets') || '[]');
    const idx = t.findIndex(x => x.id === id);
    if (idx !== -1) {
      t[idx].status = 'Closed';
      localStorage.setItem('campuscore_helpdesk_tickets', JSON.stringify(t));
      simulateAction('Ticket ' + id + ' is now Closed.');
      triggerLiveReRender();
    }
  }
}

// --- LANGUAGE MASTER ---
function setSystemLanguage(l) {
  localStorage.setItem('cc_sys_lang', l);
  localStorage.setItem('campuscore_language', l);
  simulateAction('Applying ' + l + ' localization...');
  triggerLiveReRender();
  
  // High delay to ensure re-render is finished
  setTimeout(() => {
    if (typeof applyLanguage === 'function') {
      applyLanguage();
    }
  }, 250);
}

function translateSuperAdminUI() {
  // We now use the global applyLanguage() from ui.js for common elements
  if (typeof applyLanguage === 'function') {
    applyLanguage();
  }
}

// --- ACCOUNTS LOGIC ---
function viewAccount(uid) {
  simulateAction('Detailed activity audit for ' + uid + ' generated.');
}
function deleteAccount(uid) {
  if (confirm('DANGER: Delete institutional account ' + uid + '?')) {
    simulateAction('Account ' + uid + ' moved to Removed Personnel Bin.');
  }
}

// --- RESULTS Logic ---
window.openPerformanceReport = function (cls, subj) {
  const m = `<div class="modal-overlay" id="perf-rpt-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
        <div class="modal" style="max-width:800px;width:95%">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
                <h3 style="margin:0">📈 Performance Analysis: Class ${cls} (${subj})</h3>
                <button class="btn-primary" onclick="window.print()" style="background:var(--color-surface-2);color:var(--color-text);border:1px solid var(--color-border)"><i class="fas fa-print"></i> Print PDF</button>
            </div>
            <div style="display:grid;grid-template-columns:1fr 2fr;gap:20px">
                <div class="card" style="padding:15px;background:var(--color-surface-2)">
                    <h4 style="margin-top:0">Class Stats</h4>
                    <p style="font-size:13px">Assigned Students: 35<br>Avg Attendance: 92%<br>Top Mark: 98/100<br>Lowest Mark: 42/100</p>
                    <div style="margin-top:20px;padding:10px;background:var(--color-success);color:white;border-radius:6px;font-size:12px;text-align:center">Performance: ABOVE TARGET (+4%)</div>
                </div>
                <div style="background:var(--color-surface-2);padding:20px;border-radius:12px;height:300px;display:flex;align-items:flex-end;gap:15px;justify-content:center;border:1px solid var(--color-border)">
                    ${[68, 74, 82, 79, 88].map((v, i) => `
                        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;justify-content:flex-end">
                            <div style="font-size:11px;font-weight:700">${v}%</div>
                            <div style="width:100%;background:var(--color-primary);height:${v}%;border-radius:6px 6px 0 0;opacity:${0.5 + (i * 0.1)}"></div>
                            <div style="font-size:10px;color:var(--color-text-muted)">Unit ${i + 1}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div style="margin-top:20px;text-align:right">
                <button class="btn-primary" onclick="document.getElementById('perf-rpt-modal').remove()">Close Analytical View</button>
            </div>
        </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

window.openExamPlan = function (cls) {
  const m = `<div class="modal-overlay" id="exam-plan-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
        <div class="modal" style="max-width:600px">
            <h3>📅 Exam Roadmap: ${cls}</h3>
            <div style="margin-top:20px;display:flex;flex-direction:column;gap:15px">
                <div style="padding:15px;background:var(--color-surface-2);border-radius:12px;border-left:4px solid var(--color-primary)">
                    <div style="font-weight:700">Internal Assessment 1</div>
                    <div style="font-size:12px;color:var(--color-text-muted)">July 15 - July 22, 2026</div>
                </div>
                <div style="padding:15px;background:var(--color-surface-2);border-radius:12px;border-left:4px solid var(--color-warning)">
                    <div style="font-weight:700">Mid-Term Examination</div>
                    <div style="font-size:12px;color:var(--color-text-muted)">Sept 10 - Sept 25, 2026</div>
                </div>
                <div style="padding:15px;background:var(--color-surface-2);border-radius:12px;border-left:4px solid var(--color-success)">
                    <div style="font-weight:700">Final Examination</div>
                    <div style="font-size:12px;color:var(--color-text-muted)">March 05 - March 20, 2027</div>
                </div>
            </div>
            <div style="margin-top:25px;text-align:right">
                <button class="btn-primary" onclick="document.getElementById('exam-plan-modal').remove()">Close Roadmap</button>
            </div>
        </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

// Initialize missing results data if it doesn't exist
if (!localStorage.getItem('campuscore_results')) {
  localStorage.setItem('campuscore_results', JSON.stringify([
    { class: '10A', subject: 'Mathematics', status: 'Published', date: '2026-03-25' },
    { class: '10A', subject: 'Science', status: 'Draft', date: '2026-04-05' },
    { class: '9C', subject: 'English', status: 'Published', date: '2026-03-20' },
    { class: '9C', subject: 'Telugu', status: 'Published', date: '2026-03-22' },
    { class: '8B', subject: 'History', status: 'Draft', date: '2026-04-08' }
  ]));
}

// Ensure default helpdesk tickets for demonstration
if (!localStorage.getItem('campuscore_helpdesk_tickets')) {
  localStorage.setItem('campuscore_helpdesk_tickets', JSON.stringify([
    { id: 'TKT-101', studentName: 'Praneeth Bhukya', subject: 'Unable to view results', priority: 'High', status: 'Open', date: '2026-04-08' },
    { id: 'TKT-102', studentName: 'K. Moksha', subject: 'Bus route clarification', priority: 'Medium', status: 'Open', date: '2026-04-09' },
    { id: 'TKT-103', studentName: 'Ashwath', subject: 'Password reset request', priority: 'Low', status: 'Resolved', date: '2026-04-05', resolution: 'Password reset link sent to registered email.' }
  ]));
}

// --- APPROVALS LOGIC ---
window.approveApprovalItem = function (id) {
  simulateAction('Validating and Approving Request ' + id + '...');
  setTimeout(() => {
    let appItems = JSON.parse(localStorage.getItem('campuscore_approvals') || '[]');
    if (appItems.length === 0) appItems = VP_APPROVALS;
    const idx = appItems.findIndex(x => x.id === id);
    if (idx !== -1) {
      appItems[idx].status = 'Approved';
      localStorage.setItem('campuscore_approvals', JSON.stringify(appItems));
    }
    simulateAction('Success: Request ' + id + ' officially approved and dispatched.');
    triggerLiveReRender();
  }, 1000);
}

window.rejectApprovalItem = function (id) {
  const reason = prompt('Please provide rejection justification (sent to teacher):');
  if (!reason) return;
  simulateAction('Rejecting and logging feedback for ' + id + '...');
  setTimeout(() => {
    let appItems = JSON.parse(localStorage.getItem('campuscore_approvals') || '[]');
    if (appItems.length === 0) appItems = VP_APPROVALS;
    const idx = appItems.findIndex(x => x.id === id);
    if (idx !== -1) {
      appItems[idx].status = 'Rejected';
      appItems[idx].rejectionReason = reason;
      localStorage.setItem('campuscore_approvals', JSON.stringify(appItems));
    }
    simulateAction('Request ' + id + ' rejected. Teacher has been notified.');
    triggerLiveReRender();
  }, 1000);
}

window.openApprovalCommentModal = function (id) {
  const m = `<div class="modal-overlay" id="approval-comment-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
        <div class="modal" style="max-width:450px">
            <h3>Add Comment / Forward</h3>
            <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:15px">Request ID: ${id}</p>
            <div class="form-group">
                <label>Your Comment</label>
                <textarea id="app-comment-text" class="form-control" rows="3" placeholder="e.g. Recommended for approval but needs Principal sign-off..."></textarea>
                <div style="display:flex;gap:10px;margin-top:20px">
                    <button class="btn-primary" style="flex:1" onclick="submitApprovalComment('${id}')">Save Comment</button>
                    <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px" onclick="document.getElementById('approval-comment-modal').remove()">Cancel</button>
                </div>
            </div>
        </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

window.submitApprovalComment = function (id) {
  const comment = document.getElementById('app-comment-text').value;
  if (!comment) return;
  simulateAction('Saving and forwarding comment for ' + id + '...');

  const key = 'cc_approval_comments';
  let comments = JSON.parse(localStorage.getItem(key) || '{}');
  comments[id] = comment;
  localStorage.setItem(key, JSON.stringify(comments));

  setTimeout(() => {
    document.getElementById('approval-comment-modal').remove();
    triggerLiveReRender();
  }, 500);
}

window.markTeacherAttendance = function (roll, status, btn) {
  // Use the database-synced version if available, otherwise local simulation
  if (window.supabaseClient) {
     markTeacherAttendanceDB(roll, status, btn); 
     return;
  }
  let marking = JSON.parse(localStorage.getItem('teacher_current_marking') || '{}');
  marking[roll] = status;
  localStorage.setItem('teacher_current_marking', JSON.stringify(marking));

  const group = btn.closest('.attendance-btn-group');
  if(group) {
    group.querySelectorAll('.att-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  simulateAction('Local attendance marked for ' + roll);
};

window.resolveTicket = function (id) {
  simulateAction('Resolving ticket ' + id + '...');
  setTimeout(() => {
    let tickets = JSON.parse(localStorage.getItem('campuscore_tickets') || '[]');
    if (tickets.length === 0) tickets = HELPDESK_TICKETS;
    const idx = tickets.findIndex(t => t.id === id);
    if (idx > -1) {
      tickets[idx].status = 'Resolved';
      localStorage.setItem('campuscore_tickets', JSON.stringify(tickets));
    }
    simulateAction('Ticket ' + id + ' resolved.');
    triggerLiveReRender();
  }, 800);
};

window.replyTicket = function (id) {
  const m = `<div class="modal-overlay" id="helpdesk-reply-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
        <div class="modal" style="max-width:450px">
            <h3>Helpdesk Reply</h3>
            <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:15px">Ticket ID: ${id}</p>
            <textarea id="help-reply-text" class="form-control" rows="4" placeholder="Type your reply to the parent..."></textarea>
            <div style="display:flex;gap:10px;margin-top:20px">
                <button class="btn-primary" style="flex:1" onclick="submitHelpReply('${id}')">Send Reply</button>
                <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px" onclick="document.getElementById('helpdesk-reply-modal').remove()">Cancel</button>
            </div>
        </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
};

window.submitHelpReply = function (id) {
  const txt = document.getElementById('help-reply-text').value;
  if (!txt) return;
  simulateAction('Sending reply for ticket ' + id + '...');
  setTimeout(() => {
    document.getElementById('helpdesk-reply-modal').remove();
    simulateAction('Reply sent to parent.');
  }, 800);
};


// --- TEACHER MARKS UPLOAD ---
window.openTeacherMarksUpload = function () {
  const m = `<div class="modal-overlay" id="teacher-marks-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
        <div class="modal" style="max-width:500px">
            <h3>Excel Marks Upload</h3>
            <div style="padding:15px;background:rgba(25,118,210,0.05);border-radius:10px;margin-bottom:20px">
                <div style="font-size:14px;font-weight:700;margin-bottom:5px">Step 1: Download Template</div>
                <button class="btn-primary" style="width:100%;background:var(--color-surface-2);color:var(--color-text);border:1px dashed var(--color-border)" onclick="downloadMarksTemplate()">
                    <i class="fas fa-file-excel"></i> Download Marks_Template.xlsx
                </button>
            </div>
            <div style="padding:15px;background:rgba(76,175,80,0.05);border-radius:10px">
                <div style="font-size:14px;font-weight:700;margin-bottom:5px">Step 2: Upload Filled File</div>
                <div style="border:2px dashed var(--color-border);padding:30px;text-align:center;border-radius:8px;cursor:pointer" onclick="importMarksFromExcel()">
                    <i class="fas fa-cloud-upload-alt" style="font-size:32px;color:var(--color-success)"></i>
                    <p style="margin-top:10px;font-size:13px">Click or drag your filled template here</p>
                </div>
            </div>
            <button class="btn-primary" style="margin-top:20px;width:100%" onclick="document.getElementById('teacher-marks-modal').remove()">Close</button>
        </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

window.downloadMarksTemplate = function () {
  simulateAction('Generating template for Current Class/Section...');
  setTimeout(() => simulateAction('File downloaded: Marks_Template_Class9C.xlsx'), 1000);
}

window.importMarksFromExcel = function () {
  simulateAction('Parsing Excel data (Student IDs 3160XXX - 3180XXX)...');
  setTimeout(() => {
    simulateAction('Success: 27 Student records imported/updated.');
    document.getElementById('teacher-marks-modal').remove();
    triggerLiveReRender();
  }, 1500);
}

// --- EVENTS ---
window.openVPEventModal = function () {
  const m = `<div class="modal-overlay" id="event-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
        <div class="modal" style="max-width:450px">
            <h3>Add New School Event</h3>
            <div class="form-group">
                <label>Event Name</label><input type="text" id="ev-name" class="form-control" placeholder="e.g. Annual Sports Day">
                <label>Date</label><input type="date" id="ev-date" class="form-control">
                <label>Category</label>
                <select id="ev-cat" class="form-control"><option>Academic</option><option>Sports</option><option>Cultural</option><option>Holiday</option></select>
                <div style="display:flex;gap:10px;margin-top:20px">
                    <button class="btn-primary" style="flex:1" onclick="saveVPEvent()">Save Event</button>
                    <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px" onclick="document.getElementById('event-modal').remove()">Cancel</button>
                </div>
            </div>
        </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

window.saveVPEvent = function () {
  const name = document.getElementById('ev-name').value;
  const dateStr = document.getElementById('ev-date').value;
  const cat = document.getElementById('ev-cat').value;
  if (!name || !dateStr) { alert('Please fill in both Name and Date'); return; }
  
  simulateAction('Writing new event to institutional calendar...');
  
  const newEv = { title: name, date: dateStr, desc: 'Institutional Event', color: '#1976d2' };
  let localEvents = JSON.parse(localStorage.getItem('campuscore_events') || '[]');
  localEvents.push(newEv);
  localStorage.setItem('campuscore_events', JSON.stringify(localEvents));

  document.getElementById('event-modal').remove();
  setTimeout(() => {
    simulateAction('Event "' + name + '" successfully added!');
    triggerLiveReRender();
  }, 800);
}

/* ━━━━ INSTITUTIONAL HELP & ACTIONS ━━━━━━━━━━━━━━━━━━━━━━ */
function helpParent(ticketId, parentName) {
  const m = `<div class="modal-overlay" id="help-parent-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
        <div class="modal" style="max-width:550px">
            <h3><i class="fas fa-headset" style="color:#1976d2"></i> Advanced Parent Support Portal</h3>
            <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:20px">Drafting rapid resolution for ticket <strong>${ticketId}</strong> (Parent of: <strong>${parentName}</strong>).</p>
            <div class="form-group">
                <label>Direct Message / Resolution Note</label>
                <textarea id="direct-resolution-msg" class="form-control" rows="4" placeholder="Type your message to the parent or a internal resolution note..."></textarea>
            </div>
            <div class="content-grid-equal" style="margin-top:15px;margin-bottom:15px;gap:10px">
                <button class="btn-primary" onclick="simulateAction('Secure SMS Ping sent to parent mobile.'); this.innerHTML='<i class=\'fas fa-check\'></i> SMS Sent'; this.disabled=true">
                    <i class="fas fa-sms"></i> Send SMS
                </button>
                <button class="btn-primary" style="background:var(--color-success)" onclick="simulateAction('Connecting secure VOIP line...'); this.innerHTML='<i class=\'fas fa-phone\'></i> Calling...';">
                    <i class="fas fa-phone-alt"></i> Call Parent
                </button>
            </div>
            <div style="display:flex;gap:10px;margin-top:20px">
                <button class="btn-primary" style="flex:2" onclick="executeAdvancedResolve('${ticketId}')">Execute & Resolve Ticket</button>
                <button class="btn-primary" style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text)" onclick="document.getElementById('help-parent-modal').remove()">Cancel</button>
            </div>
        </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

window.executeAdvancedResolve = function(id) {
  const msg = document.getElementById('direct-resolution-msg').value;
  if(!msg) { alert('Please provide a message or resolution note'); return; }
  
  simulateAction('Transmitting resolution to Parent Portal...');
  setTimeout(() => {
    let tickets = JSON.parse(localStorage.getItem('campuscore_tickets') || '[]');
    if (tickets.length === 0) tickets = HELPDESK_TICKETS;
    const idx = tickets.findIndex(t => t.id === id);
    if (idx > -1) {
      tickets[idx].status = 'Resolved';
      if(!tickets[idx].notes) tickets[idx].notes = [];
      tickets[idx].notes.push({ sender: currentUser.role, text: msg, date: new Date().toLocaleString() });
      localStorage.setItem('campuscore_tickets', JSON.stringify(tickets));
    }
    simulateAction('Ticket ' + id + ' officially RESOLVED.');
    document.getElementById('help-parent-modal').remove();
    triggerLiveReRender();
  }, 1000);
};

function promoteStudents() {
  if (confirm('Are you sure you want to proceed to the Promotion Wizard? This will prepare students for the next academic level (2026-2027).')) {
    simulateAction('Promotion wizard initialized. Data integrity check in progress...');
    setTimeout(() => {
      alert('Promotion Readiness: 98%. Please review Class 10 board results before final lock.');
    }, 1000);
  }
}

/* ━━━━ ADMIN BIN & UTILITIES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildRemovedBin(user) {
  const bin = JSON.parse(localStorage.getItem('cc_removed_bin') || '[]');
  const rows = bin.map(x => `
        <tr>
            <td>${x.id}</td>
            <td>${x.type}</td>
            <td>${x.name}</td>
            <td>${x.removedDate}</td>
            <td><button class="btn-primary" style="padding:4px 8px;background:var(--color-success);border:none" onclick="restoreFromBin('${x.id}')">Restore</button></td>
        </tr>
    `).join('');
  return `<div class="dash-section" id="section-removed_bin">
        <div class="card">
            <h3>🗑️ Institutional Recycle Bin</h3>
            <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:20px">Items deleted from the system (Staff, Students, Documents) are held here for 30 days.</p>
            <div style="overflow-x:auto"><table class="data-table"><thead><tr><th>ID</th><th>Type</th><th>Name</th><th>Removed</th><th>Action</th></tr></thead><tbody>${rows || '<tr><td colspan="5" style="text-align:center;padding:20px">Recycle bin is empty.</td></tr>'}</tbody></table></div>
        </div>
    </div>`;
}

function restoreFromBin(id) {
  simulateAction('Restoring item ' + id + ' to original module...');
  let bin = JSON.parse(localStorage.getItem('cc_removed_bin') || '[]');
  bin = bin.filter(x => x.id !== id);
  localStorage.setItem('cc_removed_bin', JSON.stringify(bin));
  triggerLiveReRender();
}

function openAssignSubModal(teacher, slot) {
  const m = `<div class="modal-overlay" id="sub-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
        <div class="modal" style="max-width:400px">
            <h3>Assign Substitute</h3>
            <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:15px">For <strong>${teacher}</strong> at ${slot}</p>
            <label style="font-size:12px;margin-bottom:6px;display:block">Select Available Teacher</label>
            <select id="sub-teacher" class="form-control" style="margin-bottom:20px"><option>Venkat Iyer</option><option>Mohan Das</option><option>Suresh Naidu</option></select>
            <button class="btn-primary" style="width:100%" onclick="localStorage.setItem('vp_sub_assigned','true'); simulateAction('Substitute assigned!'); document.getElementById('sub-modal').remove(); triggerLiveReRender();">Confirm Assignment</button>
        </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

function openAdjAllocModal() {
  simulateAction('Opening Allocation Adjustment Wizard...');
  alert('Resource Allocation Wizard: Optimized load balancing suggested for the Mathematics department. Apply?');
}

function openChangeActionPinModal() {
  const m = `<div class="modal-overlay" id="pin-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
        <div class="modal" style="max-width:350px">
            <h3>Action Security PIN</h3>
            <p style="font-size:12px;color:var(--color-text-muted);margin-bottom:15px">Verify your identity to perform administrative overrides.</p>
            <input type="password" maxlength="6" class="form-control" placeholder="Current PIN" style="text-align:center;letter-spacing:5px;font-size:24px;margin-bottom:10px">
            <input type="password" maxlength="6" class="form-control" placeholder="New PIN" style="text-align:center;letter-spacing:5px;font-size:24px;margin-bottom:20px">
            <button class="btn-primary" style="width:100%" onclick="simulateAction('Security PIN updated successfully.'); document.getElementById('pin-modal').remove()">Update PIN</button>
        </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

/**
 * --- LIVE SUPABASE INTEGRATION ---
 * Populates dashboard stats and elements asynchronously using window.supabaseClient.
 */

async function initDashboardLiveStats(user) {
  if (!window.supabaseClient) return;
  if (user.role === 'vice_principal') fetchVPStats();
  else if (user.role === 'teacher') fetchTeacherStats(user);
  else fetchGlobalCounts();
  loadLiveAnnouncements();
}

async function fetchGlobalCounts() {
  try {
    const { count: studentCount } = await window.supabaseClient.from('students').select('*', { count: 'exact', head: true });
    const { count: teacherCount } = await window.supabaseClient.from('teachers').select('*', { count: 'exact', head: true });
    
    // Update generic stats if they are skeletons
    updateStat('stat-generic-0', studentCount || '540+');
    updateStat('stat-generic-1', teacherCount || '32');
    
    // Attempt to fill other generic stats from local context if possible
    const user = window.currentUser;
    if (user && (user.role === 'student' || user.role === 'parent')) {
      const sid = (user.role === 'parent' && window.getParentSid) ? window.getParentSid(user) : (user.childId || user.id);
      const data = window.getStudentSharedData ? window.getStudentSharedData(sid) : null;
      if (data) {
         updateStat('stat-generic-0', data.attendancePct + '%');
         updateStat('stat-generic-1', (data.results ? data.results.overall : 0) + '%');
         updateStat('stat-generic-2', (data.homework ? data.homework.filter(h=>h.status==='Pending').length : 0));
         updateStat('stat-generic-3', (data.exams ? data.exams.length : 0));
      }
    }
  } catch (e) { console.error('[CampusCore] Error:', e); }
}

async function fetchVPStats() {
  try {
    const { count: totalStudents } = await window.supabaseClient.from('students').select('*', { count: 'exact', head: true });
    const { count: openIssues } = await window.supabaseClient.from('issues').select('*', { count: 'exact', head: true }).eq('status', 'Open');
    const { count: lowAtt } = await window.supabaseClient.from('students').select('*', { count: 'exact', head: true }).lt('attendance_pct', 85);
    updateStat('stat-escalations', '2');
    updateStat('stat-open-issues', openIssues || '0');
    updateStat('stat-low-att', lowAtt || '0');
    updateStat('stat-approvals', '5');
    console.log('[CampusCore] Loaded VP stats from Supabase');
  } catch (e) { console.error('[CampusCore] Error:', e); }
}

async function fetchTeacherStats(user) {
  try {
    const { count: totalStudents } = await window.supabaseClient.from('students').select('*', { count: 'exact', head: true });
    updateStat('stat-total-students', totalStudents || '0');
    updateStat('stat-total-classes', user.classes ? user.classes.split(',').length : '2');
    updateStat('stat-avg-att-teacher', '92%');
    updateStat('stat-pending-marking', '1');
    console.log('[CampusCore] Loaded Teacher stats from Supabase');
  } catch (e) { console.error('[CampusCore] Error:', e); }
}

async function loadLiveAnnouncements() {
  const container = document.getElementById('home-notices-list');
  if (!container) return;
  try {
    const { data } = await window.supabaseClient.from('announcements').select('*').order('date', { ascending: false }).limit(4);
    if (data && data.length > 0) {
      const catColors = { Events: '#5ca870', Academic: '#1976d2', Meeting: '#f57c00', Finance: '#d32f2f', Holiday: '#8b5cf6', CCA: '#00bcd4' };
      container.innerHTML = data.map(a => {
        const col = catColors[a.category] || '#5ca870';
        const dateStr = new Date(a.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
        return `<li class="activity-item" style="cursor:pointer" onclick="navigateTo('announcements')">
          <div class="activity-dot" style="background:${col}"></div>
          <div class="activity-text"><strong style="color:var(--color-text)">${a.title}</strong><br>
            <span style="font-size:11px;color:var(--color-text-muted)">${dateStr}</span>
          </div>
          <span class="badge" style="background:${col};font-size:10px;padding:3px 8px">${a.category}</span>
        </li>`;
      }).join('');
      console.log(`[CampusCore] Loaded ${data.length} records from announcements`);
    }
  } catch (e) { console.error('[CampusCore] Error:', e); }
}

function updateStat(id, value) {
  const el = document.getElementById(id);
  if (el) { el.innerText = value; el.classList.remove('skeleton'); }
}

// EOF Dashboard Scripts

