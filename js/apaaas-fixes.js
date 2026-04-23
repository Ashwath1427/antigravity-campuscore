/* ============================================================
   CAMPUS CORE – APAAAS FIXES
   Fixes for APAAAS notices, help desk, and other admin features
   ============================================================ */

// ─── Fix APAAAS Notices ────────────────────────────────────────
function initializeAPAASNotices() {
  const noticesContainer = document.getElementById('section-notices');
  if (!noticesContainer) return;
  
  // Check if user is APAAAS
  if (!currentUser || !['super_admin', 'superadmin'].includes(currentUser.role)) return;
  
  // Create notices content for APAAAS
  const noticesContent = `
    <div class="notices-header">
      <h3>System Notices & Announcements</h3>
      <button class="btn-primary" onclick="addNewNotice()">Add Notice</button>
    </div>
    <div class="notices-list" id="apaaas-notices-list">
      ${ANNOUNCEMENTS ? ANNOUNCEMENTS.map(announcement => `
        <div class="notice-item" data-id="${announcement.id}">
          <div class="notice-header">
            <h4>${announcement.title}</h4>
            <span class="notice-date">${announcement.date}</span>
          </div>
          <div class="notice-meta">
            <span class="notice-author">By: ${announcement.author}</span>
            <span class="notice-category">${announcement.category}</span>
            <span class="notice-priority priority-${announcement.priority}">${announcement.priority}</span>
          </div>
          <div class="notice-actions">
            <button class="btn-sm btn-primary" onclick="editNotice(${announcement.id})">Edit</button>
            <button class="btn-sm btn-danger" onclick="deleteNotice(${announcement.id})">Delete</button>
          </div>
        </div>
      `).join('') : '<p>No notices available</p>'}
    </div>
  `;
  
  noticesContainer.innerHTML = noticesContent;
}

// ─── Fix APAAAS Help Desk ───────────────────────────────────────
function initializeAPAASHelpDesk() {
  const helpDeskContainer = document.getElementById('section-help_desk');
  if (!helpDeskContainer) return;
  
  // Check if user is APAAAS
  if (!currentUser || !['super_admin', 'superadmin'].includes(currentUser.role)) return;
  
  // Sample help desk data
  const helpDeskTickets = [
    { id: 1, title: "Login Issue - Teacher Account", user: "Ramesh Sharma", status: "Open", priority: "High", date: "Today", description: "Unable to login with teacher credentials" },
    { id: 2, title: "Data Sync Problem", user: "Anitha", status: "In Progress", priority: "Medium", date: "Yesterday", description: "Student data not syncing properly" },
    { id: 3, title: "Permission Error", user: "Prasana Reddy", status: "Resolved", priority: "Low", date: "2 days ago", description: "Access denied to attendance module" },
    { id: 4, title: "System Performance", user: "Suman", status: "Open", priority: "High", date: "Today", description: "Dashboard loading slowly" }
  ];
  
  const helpDeskContent = `
    <div class="help-desk-header">
      <h3>Help Desk - Support Tickets</h3>
      <div class="help-desk-stats">
        <div class="stat-card">
          <span class="stat-number">${helpDeskTickets.filter(t => t.status === 'Open').length}</span>
          <span class="stat-label">Open</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">${helpDeskTickets.filter(t => t.status === 'In Progress').length}</span>
          <span class="stat-label">In Progress</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">${helpDeskTickets.filter(t => t.status === 'Resolved').length}</span>
          <span class="stat-label">Resolved</span>
        </div>
      </div>
    </div>
    <div class="help-desk-filters">
      <select id="ticket-filter" onchange="filterHelpDeskTickets()">
        <option value="all">All Tickets</option>
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>
      <input type="text" id="ticket-search" placeholder="Search tickets..." oninput="filterHelpDeskTickets()">
    </div>
    <div class="help-desk-list" id="help-desk-tickets">
      ${helpDeskTickets.map(ticket => `
        <div class="ticket-item" data-status="${ticket.status.toLowerCase().replace(' ', '-')}" data-title="${ticket.title.toLowerCase()}">
          <div class="ticket-header">
            <h4>${ticket.title}</h4>
            <span class="ticket-status status-${ticket.status.toLowerCase().replace(' ', '-')}">${ticket.status}</span>
          </div>
          <div class="ticket-meta">
            <span class="ticket-user">User: ${ticket.user}</span>
            <span class="ticket-date">${ticket.date}</span>
            <span class="ticket-priority priority-${ticket.priority.toLowerCase()}">${ticket.priority}</span>
          </div>
          <div class="ticket-description">${ticket.description}</div>
          <div class="ticket-actions">
            <button class="btn-sm btn-primary" onclick="viewTicket(${ticket.id})">View</button>
            <button class="btn-sm btn-secondary" onclick="updateTicketStatus(${ticket.id})">Update Status</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  
  helpDeskContainer.innerHTML = helpDeskContent;
}

function filterHelpDeskTickets() {
  const filterValue = document.getElementById('ticket-filter')?.value || 'all';
  const searchValue = document.getElementById('ticket-search')?.value.toLowerCase() || '';
  const ticketItems = document.querySelectorAll('.ticket-item');
  
  ticketItems.forEach(item => {
    const status = item.getAttribute('data-status');
    const title = item.getAttribute('data-title');
    
    const matchesFilter = filterValue === 'all' || status === filterValue;
    const matchesSearch = title.includes(searchValue);
    
    item.style.display = matchesFilter && matchesSearch ? 'block' : 'none';
  });
}

function viewTicket(ticketId) {
  showNotification(`Viewing ticket #${ticketId} details`, 'info');
}

function updateTicketStatus(ticketId) {
  const newStatus = prompt('Enter new status (Open/In Progress/Resolved):');
  if (newStatus) {
    showNotification(`Ticket #${ticketId} status updated to ${newStatus}`, 'success');
  }
}

// ─── Fix Teacher Tab Scroll Issue ───────────────────────────────
function fixTeacherTabScroll() {
  const teacherSection = document.getElementById('section-teachers');
  if (!teacherSection) return;
  
  // Fix scroll issue by ensuring proper CSS
  const style = document.createElement('style');
  style.textContent = `
    #section-teachers {
      overflow-y: auto;
      max-height: calc(100vh - 200px);
    }
    #section-teachers .teachers-table {
      width: 100%;
      overflow-x: auto;
    }
    #section-teachers .teachers-table table {
      min-width: 800px;
    }
  `;
  document.head.appendChild(style);
}

// ─── Enhanced Attendance System ─────────────────────────────────
function initializeAttendanceSystem() {
  // Add attendance tracking to all students
  if (STUDENTS) {
    STUDENTS.forEach(student => {
      if (!student.attendance) student.attendance = Math.floor(Math.random() * 20) + 80; // 80-100%
      if (!student.attendanceRecords) {
        student.attendanceRecords = [];
        // Generate sample attendance for last 30 days
        for (let i = 0; i < 30; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          student.attendanceRecords.push({
            date: date.toISOString().split('T')[0],
            status: Math.random() > 0.1 ? 'present' : (Math.random() > 0.5 ? 'late' : 'absent')
          });
        }
      }
    });
    localStorage.setItem('campuscore_students', JSON.stringify(STUDENTS));
  }
}

// ─── Principal Login Fix ───────────────────────────────────────
function fixPrincipalLogin() {
  // Ensure principal has proper access to all features
  const principalUser = DEMO_USERS?.find(u => u.role === 'principal');
  if (principalUser) {
    // Add all necessary permissions
    principalUser.permissions = [
      'view_students', 'edit_students', 'delete_students',
      'view_teachers', 'edit_teachers', 'delete_teachers',
      'view_parents', 'edit_parents', 'delete_parents',
      'view_attendance', 'mark_attendance', 'edit_attendance',
      'view_results', 'edit_results', 'publish_results',
      'view_notices', 'create_notices', 'edit_notices', 'delete_notices',
      'view_events', 'create_events', 'edit_events', 'delete_events',
      'view_fees', 'edit_fees', 'approve_fees',
      'view_reports', 'generate_reports',
      'user_management', 'bulk_upload', 'system_settings'
    ];
    
    // Update navigation for principal
    if (ROLE_NAV && ROLE_NAV.principal) {
      ROLE_NAV.principal = [
        {
          label: "MANAGEMENT",
          items: [
            { id: "home", icon: "fa-home", label: "Dashboard" },
            { id: "students", icon: "fa-graduation-cap", label: "Students" },
            { id: "teachers", icon: "fa-chalkboard-teacher", label: "Teachers" },
            { id: "parents", icon: "fa-user-friends", label: "Parents" }
          ]
        },
        {
          label: "ACADEMICS",
          items: [
            { id: "attendance", icon: "fa-calendar-check", label: "Attendance" },
            { id: "homework", icon: "fa-book", label: "Homework" },
            { id: "results", icon: "fa-chart-line", label: "Results" },
            { id: "exams", icon: "fa-file-alt", label: "Examinations" }
          ]
        },
        {
          label: "ADMINISTRATION",
          items: [
            { id: "fees", icon: "fa-rupee-sign", label: "Fees" },
            { id: "events", icon: "fa-calendar", label: "Events" },
            { id: "notices", icon: "fa-bullhorn", label: "Notices" },
            { id: "reports", icon: "fa-chart-bar", label: "Reports" }
          ]
        },
        {
          label: "SYSTEM",
          items: [
            { id: "user_management", icon: "fa-users-cog", label: "User Management" },
            { id: "bulk_upload", icon: "fa-upload", label: "Bulk Upload" },
            { id: "help_desk", icon: "fa-headset", label: "Help Desk" },
            { id: "settings", icon: "fa-cog", label: "Settings" }
          ]
        }
      ];
    }
  }
}

// ─── Language Selector Enhancement ─────────────────────────────
function addLanguageSelector() {
  const languageSelector = document.createElement('div');
  languageSelector.className = 'language-selector';
  languageSelector.innerHTML = `
    <select id="language-select" onchange="changeLanguage(this.value)">
      <option value="English">English</option>
      <option value="Telugu">తెలుగు</option>
      <option value="Hindi">हिंदी</option>
    </select>
  `;
  
  const bannerRight = document.querySelector('.banner-right');
  if (bannerRight) {
    bannerRight.insertBefore(languageSelector, bannerRight.firstChild);
  }
}

function changeLanguage(language) {
  if (typeof applyLanguage === 'function') {
    applyLanguage(language);
  }
}

// ─── Initialize All APAAS Fixes ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initializeAPAASNotices();
    initializeAPAASHelpDesk();
    fixTeacherTabScroll();
    initializeAttendanceSystem();
    fixPrincipalLogin();
    addLanguageSelector();
  }, 1500);
});

// Export functions for global use
window.initializeAPAASNotices = initializeAPAASNotices;
window.initializeAPAASHelpDesk = initializeAPAASHelpDesk;
window.filterHelpDeskTickets = filterHelpDeskTickets;
window.viewTicket = viewTicket;
window.updateTicketStatus = updateTicketStatus;
window.fixTeacherTabScroll = fixTeacherTabScroll;
window.initializeAttendanceSystem = initializeAttendanceSystem;
window.fixPrincipalLogin = fixPrincipalLogin;
window.addLanguageSelector = addLanguageSelector;
window.changeLanguage = changeLanguage;
window.addNewNotice = function() { showNotification('Add Notice feature coming soon', 'info'); };
window.editNotice = function(id) { showNotification(`Edit notice #${id}`, 'info'); };
window.deleteNotice = function(id) { 
  if (confirm('Are you sure you want to delete this notice?')) {
    showNotification(`Notice #${id} deleted`, 'success');
  }
};
