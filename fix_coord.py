import os
import re

# 1. Update data.js with coordinator roles
data_path = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/data.js"
with open(data_path, "r", encoding="utf-8") as f:
    data_content = f.read()

coord_nav = """
  coordinator: [
    { label: "Main", items: [
      { id: "home",              icon: "fa-tachometer-alt",     label: "Dashboard" },
      { id: "coord_classes",     icon: "fa-chalkboard",         label: "Class Overview" },
    ]},
    { label: "Operations", items: [
      { id: "coord_issues",      icon: "fa-exclamation-circle", label: "Issue Inbox", badge: "New" },
      { id: "vp_schedule",       icon: "fa-calendar-alt",       label: "Manage Timetable" },
    ]},
    { label: "Communication", items: [
      { id: "announcements",     icon: "fa-bullhorn",           label: "Notices" },
      { id: "events",            icon: "fa-calendar-star",      label: "Events" },
    ]},
    { label: "System", items: [
      { id: "settings",          icon: "fa-cog",                label: "Settings" },
    ]},
  ],
"""

if "coordinator: [" not in data_content[data_content.find("const ROLE_NAV = {"):data_content.find("const ROLE_HOME = {")]:
    data_content = data_content.replace(
        "const ROLE_NAV = {\n",
        "const ROLE_NAV = {\n" + coord_nav
    )

coord_home = """
  coordinator: {
    greeting: "Coordinator Command Center",
    subtitle: "Middle-tier academic and operations management.",
    stats: [
      { label: "Total Classes", value: "24", icon: "🏫" },
      { label: "Open Issues", value: "5", icon: "⚠️" },
      { label: "Pending Approvals", value: "2", icon: "⏱️" },
      { label: "Escalated to VP", value: "1", icon: "🚨" },
    ]
  },
"""

if "coordinator: {" not in data_content[data_content.find("const ROLE_HOME = {"):]:
    data_content = data_content.replace(
        "const ROLE_HOME = {\n",
        "const ROLE_HOME = {\n" + coord_home
    )

with open(data_path, "w", encoding="utf-8") as f:
    f.write(data_content)

# 2. Update dashboard.js to include Coordinator layout
dash_path = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/dashboard.js"
with open(dash_path, "r", encoding="utf-8") as f:
    dash_content = f.read()

# Route injection
coord_route = """  } else if (user.role === 'coordinator') {
    c.innerHTML = [
      buildCoordHome(user), buildCoordClasses(user), buildCoordIssues(user), 
      buildVPSchedule(user), buildAnnouncements(user), buildEvents(user), buildSettings(user)
    ].join('');
"""
if "user.role === 'coordinator'" not in dash_content:
    dash_content = dash_content.replace("  } else if (user.role === 'teacher') {", coord_route + "  } else if (user.role === 'teacher') {")


coord_builders = """
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COORDINATOR EXCLUSIVE MODULES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function buildCoordHome(user) {
  const cfg = ROLE_HOME[user.role];
  const greeting = getGreeting();
  const dateStr = getFormattedDate();
  const firstName = user.name.split(' ')[0];

  const stats = cfg.stats.map(s => `
    <div class="stat-card">
      <div class="stat-card-icon">${s.icon}</div>
      <div class="stat-value">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>`).join('');

  const qaItems = [
    { icon: 'fa-exclamation-circle', label: 'Issue Inbox', color: '#f57c00', target: 'coord_issues' },
    { icon: 'fa-calendar-alt', label: 'Edit Timetable', color: '#5ca870', target: 'vp_schedule' },
    { icon: 'fa-bullhorn', label: 'Post Notice', color: '#1976d2', target: 'announcements' },
  ];
  const quickActions = qaItems.map(qa => `<button class="quick-action-btn" onclick="navigateTo('${qa.target}')"><div class="qa-icon" style="background:${qa.color}"><i class="fas ${qa.icon}"></i></div><span class="qa-label">${qa.label}</span></button>`).join('');

  return `<div class="dash-section active" id="section-home">
    <div class="welcome-banner" style="background:linear-gradient(135deg, var(--color-primary), #45a049)">
      <div class="welcome-greeting">${greeting}, ${firstName}!</div>
      <div class="welcome-sub">${cfg.subtitle} · ${dateStr}</div>
    </div>
    <div class="stats-grid">${stats}</div>
    <div class="card"><h3>⚡ Coordinator Tools</h3><div class="quick-actions">${quickActions}</div></div>
    <div class="card" style="border-left:4px solid #f57c00">
      <h3>⚠️ Action Required</h3>
      <p style="font-size:14px;color:var(--color-text-muted);margin-top:10px">Review escalated issues in the Issue Inbox.</p>
      <button class="btn-primary" style="margin-top:10px" onclick="navigateTo('coord_issues')">Go to Inbox</button>
    </div>
  </div>`;
}

function buildCoordClasses(user) {
  return `<div class="dash-section" id="section-coord_classes">
    <div class="card">
      <h3>🏫 Class Overview</h3>
      <p style="color:var(--color-text-muted)">Monitor classes, teacher assignment, and academic progression.</p>
      <div style="padding:20px;text-align:center;color:var(--color-text-muted);background:var(--color-surface-2);border-radius:12px;margin-top:20px">Overview dashboard loaded successfully.</div>
    </div>
  </div>`;
}

function buildCoordIssues(user) {
  const coordIssues = GLOBAL_ISSUES.filter(i => 
    i.stage === 'Coordinator' || 
    i.reporterId === user.username
  ).sort((a,b) => new Date(b.created) - new Date(a.created));

  let list = '';
  if (coordIssues.length === 0) {
    list = `<div style="text-align:center;padding:40px;color:var(--color-text-muted)"><i class="fas fa-check-circle" style="font-size:48px;opacity:0.2;margin-bottom:16px"></i><p>Inbox is clear. No pending escalated issues.</p></div>`;
  } else {
    list = coordIssues.map(m => {
      const isRes = m.status === 'Resolved' || m.status === 'Closed';
      const isEscalated = m.status === 'Escalated';
      const border = isRes ? 'var(--color-primary)' : isEscalated ? '#f57c00' : 'var(--color-border)';
      
      return `<div class="card" style="margin-bottom:12px;border:1px solid ${border};cursor:pointer;transition:transform 0.2s" onclick="viewIssue('${m.id}')">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap">
          <div>
            <div style="font-weight:700;color:var(--color-text);margin-bottom:4px;font-size:16px">${m.title}</div>
            <div style="font-size:13px;color:var(--color-text-muted)">
              <span class="badge" style="background:var(--color-surface-2);color:var(--color-text)">${m.studentName} (${m.class})</span>
              <span style="margin-left:8px">Reported by: ${m.reporterName} (${m.reporterRole})</span>
            </div>
          </div>
          <div style="text-align:right">
            <span class="badge" style="background:${isRes?'var(--color-primary)':isEscalated?'#f57c00':'#1976d2'}">${m.status}</span>
            <div style="font-size:11px;color:var(--color-text-muted);margin-top:6px">${m.created.split('T')[0]}</div>
          </div>
        </div>
        <div style="font-size:13px;color:var(--color-text-light);margin-top:10px;line-height:1.4">${m.desc.substring(0, 100)}${m.desc.length>100?'...':''}</div>
      </div>`;
    }).join('');
  }

  return `<div class="dash-section" id="section-coord_issues">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap">
      <h3 style="color:var(--color-text)">📥 Coordinator Issue Inbox</h3>
    </div>
    <div class="card" style="background:var(--color-surface-2);margin-bottom:20px">
      <p style="font-size:13px;color:var(--color-text-muted)">Handle issues escalated by Teachers or Parents. If an issue requires disciplinary action or high-level approval, escalate it to the Vice Principal.</p>
    </div>
    <div>${list}</div>
  </div>`;
}
"""

if "function buildCoordHome" not in dash_content:
    dash_content = dash_content.replace(
        "/* ━━━━ TEACHER EXCLUSIVE MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━ */", 
        coord_builders + "\n/* ━━━━ TEACHER EXCLUSIVE MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━ */"
    )

with open(dash_path, "w", encoding="utf-8") as f:
    f.write(dash_content)

print("Coordinator architecture generated successfully.")
