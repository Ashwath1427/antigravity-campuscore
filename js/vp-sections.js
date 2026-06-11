// js/vp-sections.js

// Helper to handle async rendering
function renderVPSectionAsync(containerId, fetchFn, renderFn) {
  setTimeout(async () => {
    const el = document.getElementById(containerId);
    if (!el) return;
    
    // Default skeleton loader is already in the HTML.
    try {
      const { data, error } = await fetchFn();
      if (error) throw error;
      
      if (!data || data.length === 0) {
        el.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--color-text-muted);">No data available yet.</div>';
      } else {
        el.innerHTML = renderFn(data);
      }
    } catch (err) {
      console.error(`[VP-Sections] Error in ${containerId}:`, err);
      el.innerHTML = `<div style="padding: 1rem; color: #e74c3c; border-left: 4px solid #e74c3c; background: var(--color-surface-2);">
        <strong>Failed to load data:</strong> ${err.message}
      </div>`;
    }
  }, 0);
}

// 1. vp_approvals
window.buildVPApprovals = function(user) {
  renderVPSectionAsync('vp_approvals_content', 
    () => Promise.resolve({ data: [] }), // cc_approvals does not exist
    (data) => {
      let rows = data.map(row => `<tr><td>${row.id}</td><td>${row.type}</td><td>${row.status}</td></tr>`).join('');
      return `<table class="cc-table"><thead><tr><th>ID</th><th>Type</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
  );
  return `
    <div id="section-vp_approvals" class="dash-section">
      <div class="card">
        <h2>Pending Approvals</h2>
        <div id="vp_approvals_content">
           <div class="cc-skeleton" style="height: 200px; border-radius: 8px;"></div>
        </div>
      </div>
    </div>
  `;
};

// 2. vp_student_issues
window.buildVPStudentIssues = function(user) {
  renderVPSectionAsync('vp_student_issues_content', 
    () => Promise.resolve({ data: [] }), // cc_issues does not exist
    (data) => {
      let rows = data.map(row => `<tr><td>${row.student_name || 'Unknown'}</td><td>${row.issue}</td><td>${row.status}</td></tr>`).join('');
      return `<table class="cc-table"><thead><tr><th>Student</th><th>Issue</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
  );
  return `
    <div id="section-vp_student_issues" class="dash-section">
      <div class="card">
        <h2>Student Issues</h2>
        <div id="vp_student_issues_content">
           <div class="cc-skeleton" style="height: 200px; border-radius: 8px;"></div>
        </div>
      </div>
    </div>
  `;
};

// 3. vp_students
window.buildVPStudents = function(user) {
  renderVPSectionAsync('vp_students_content', 
    () => window.supabaseClient ? window.supabaseClient.from('cc_students').select('*').limit(50) : { data: [] },
    (data) => {
      let rows = data.map(row => `<tr><td>${row.name}</td><td>${row.class || ''}-${row.section || ''}</td><td>${row.roll || row.adm_no || ''}</td></tr>`).join('');
      return `<table class="cc-table"><thead><tr><th>Name</th><th>Class</th><th>Roll No</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
  );
  return `
    <div id="section-vp_students" class="dash-section">
      <div class="card">
        <h2>Students Overview</h2>
        <div id="vp_students_content">
           <div class="cc-skeleton" style="height: 200px; border-radius: 8px;"></div>
        </div>
      </div>
    </div>
  `;
};

// 4. vp_attendance
window.buildVPAttendance = function(user) {
  renderVPSectionAsync('vp_attendance_content', 
    () => Promise.resolve({ data: [] }), // cc_attendance does not exist
    (data) => {
      return `<p>Recent attendance records found: ${data.length}</p>`;
    }
  );
  return `
    <div id="section-vp_attendance" class="dash-section">
      <div class="card">
        <h2>Attendance Overview</h2>
        <div id="vp_attendance_content">
           <div class="cc-skeleton" style="height: 200px; border-radius: 8px;"></div>
        </div>
      </div>
    </div>
  `;
};

// 5. vp_class_perf
window.buildVPClassPerf = function(user) {
  renderVPSectionAsync('vp_class_perf_content', 
    () => Promise.resolve({ data: [] }), // cc_results does not exist
    (data) => {
      return `<p>Class performance data loaded.</p>`;
    }
  );
  return `
    <div id="section-vp_class_perf" class="dash-section">
      <div class="card">
        <h2>Class Performance</h2>
        <div id="vp_class_perf_content">
           <div class="cc-skeleton" style="height: 200px; border-radius: 8px;"></div>
        </div>
      </div>
    </div>
  `;
};

// 6. vp_analysis
window.buildVPAnalysis = function(user) {
  renderVPSectionAsync('vp_analysis_content', 
    () => window.supabaseClient ? window.supabaseClient.from('cc_students').select('id, class, section, roll, name').limit(1) : { data: [] },
    (data) => {
      return `<p>Analysis charts ready.</p>`;
    }
  );
  return `
    <div id="section-vp_analysis" class="dash-section">
      <div class="card">
        <h2>Student Analysis Stats</h2>
        <div id="vp_analysis_content">
           <div class="cc-skeleton" style="height: 200px; border-radius: 8px;"></div>
        </div>
      </div>
    </div>
  `;
};

// 7. vp_teacher_monitoring
window.buildVPTeacherMonitoring = function(user) {
  renderVPSectionAsync('vp_teacher_monitoring_content', 
    () => window.supabaseClient ? window.supabaseClient.from('cc_users').select('*').eq('role', 'teacher').limit(50) : { data: [] },
    (data) => {
      let rows = data.map(row => `<tr><td>${row.name}</td><td>${row.email}</td><td>Active</td></tr>`).join('');
      return `<table class="cc-table"><thead><tr><th>Teacher</th><th>Email</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
  );
  return `
    <div id="section-vp_teacher_monitoring" class="dash-section">
      <div class="card">
        <h2>Teacher Activity</h2>
        <div id="vp_teacher_monitoring_content">
           <div class="cc-skeleton" style="height: 200px; border-radius: 8px;"></div>
        </div>
      </div>
    </div>
  `;
};

// 8. vp_timetable
window.buildVPTimetable = function(user) {
  renderVPSectionAsync('vp_timetable_content', 
    () => Promise.resolve({ data: [] }), // cc_schedule does not exist
    (data) => {
      return `<p>Timetable loaded.</p>`;
    }
  );
  return `
    <div id="section-vp_timetable" class="dash-section">
      <div class="card">
        <h2>Timetable Review</h2>
        <div id="vp_timetable_content">
           <div class="cc-skeleton" style="height: 200px; border-radius: 8px;"></div>
        </div>
      </div>
    </div>
  `;
};

// 9. vp_exams
window.buildVPExams = function(user) {
  renderVPSectionAsync('vp_exams_content', 
    () => Promise.resolve({ data: [] }), // cc_exams does not exist
    (data) => {
      let rows = data.map(row => `<tr><td>${row.exam_name}</td><td>${row.date}</td></tr>`).join('');
      return `<table class="cc-table"><thead><tr><th>Exam</th><th>Date</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
  );
  return `
    <div id="section-vp_exams" class="dash-section">
      <div class="card">
        <h2>Exams & Results</h2>
        <div id="vp_exams_content">
           <div class="cc-skeleton" style="height: 200px; border-radius: 8px;"></div>
        </div>
      </div>
    </div>
  `;
};

// 10. vp_reports
window.buildVPReports = function(user) {
  renderVPSectionAsync('vp_reports_content', 
    () => Promise.resolve({ data: [] }), // cc_reports does not exist
    (data) => {
      return `<p>Reports loaded successfully.</p>`;
    }
  );
  return `
    <div id="section-vp_reports" class="dash-section">
      <div class="card">
        <h2>Reports</h2>
        <div id="vp_reports_content">
           <div class="cc-skeleton" style="height: 200px; border-radius: 8px;"></div>
        </div>
      </div>
    </div>
  `;
};

// 11. vp_notices
window.buildVPNotices = function(user) {
  renderVPSectionAsync('vp_notices_content', 
    () => window.supabaseClient ? window.supabaseClient.from('cc_announcements').select('*').limit(50) : { data: [] },
    (data) => {
      let rows = data.map(row => `<tr><td>${row.title}</td><td>${row.date || 'N/A'}</td></tr>`).join('');
      return `<table class="cc-table"><thead><tr><th>Title</th><th>Date</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
  );
  return `
    <div id="section-vp_notices" class="dash-section">
      <div class="card">
        <h2>Notices</h2>
        <div id="vp_notices_content">
           <div class="cc-skeleton" style="height: 200px; border-radius: 8px;"></div>
        </div>
      </div>
    </div>
  `;
};

// 12. vp_events
window.buildVPEvents = function(user) {
  renderVPSectionAsync('vp_events_content', 
    () => window.supabaseClient ? window.supabaseClient.from('cc_events').select('*').limit(50) : { data: [] },
    (data) => {
      let rows = data.map(row => `<tr><td>${row.title}</td><td>${row.date || 'N/A'}</td></tr>`).join('');
      return `<table class="cc-table"><thead><tr><th>Event</th><th>Date</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
  );
  return `
    <div id="section-vp_events" class="dash-section">
      <div class="card">
        <h2>Events</h2>
        <div id="vp_events_content">
           <div class="cc-skeleton" style="height: 200px; border-radius: 8px;"></div>
        </div>
      </div>
    </div>
  `;
};

// 13. vp_messages
window.buildVPMessages = function(user) {
  renderVPSectionAsync('vp_messages_content', 
    () => Promise.resolve({ data: [] }), // cc_messages does not exist
    (data) => {
      return `<p>Inbox loaded (${data.length} messages).</p>`;
    }
  );
  return `
    <div id="section-vp_messages" class="dash-section">
      <div class="card">
        <h2>Messages Inbox</h2>
        <div id="vp_messages_content">
           <div class="cc-skeleton" style="height: 200px; border-radius: 8px;"></div>
        </div>
      </div>
    </div>
  `;
};

// 14. vp_upload
window.buildVPUpload = function(user) {
  return `
    <div id="section-vp_upload" class="dash-section">
      <div class="card">
        <h2>Document Upload</h2>
        <p>Use this form to upload documents.</p>
        <div style="margin-top: 1rem;">
          <input type="file" class="cc-input" />
          <button class="cc-btn cc-btn-primary" style="margin-top: 1rem;">Upload</button>
        </div>
      </div>
    </div>
  `;
};

// 15. vp_helpdesk
window.buildVPHelpdesk = function(user) {
  renderVPSectionAsync('vp_helpdesk_content', 
    () => Promise.resolve({ data: [] }), // cc_helpdesk does not exist
    (data) => {
      let rows = data.map(row => `<tr><td>${row.issue}</td><td>${row.status}</td></tr>`).join('');
      return `<table class="cc-table"><thead><tr><th>Issue</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
  );
  return `
    <div id="section-vp_helpdesk" class="dash-section">
      <div class="card">
        <h2>Helpdesk Tickets</h2>
        <div id="vp_helpdesk_content">
           <div class="cc-skeleton" style="height: 200px; border-radius: 8px;"></div>
        </div>
      </div>
    </div>
  `;
};

// 16. vp_profile
window.buildVPProfile = function(user) {
  return `
    <div id="section-vp_profile" class="dash-section">
      <div class="card">
        <h2>VP Profile</h2>
        <p><strong>Name:</strong> ${user.name || 'Unknown'}</p>
        <p><strong>Email:</strong> ${user.email || 'Unknown'}</p>
        <p><strong>Role:</strong> ${user.role}</p>
      </div>
    </div>
  `;
};

// 17. vp_settings
window.buildVPSettings = function(user) {
  return `
    <div id="section-vp_settings" class="dash-section">
      <div class="card">
        <h2>Settings</h2>
        <p>System settings configuration.</p>
      </div>
    </div>
  `;
};

// Export Section Registry for VP Dashboard
window.VP_SECTION_REGISTRY = {
  'vp_approvals': { builder: window.buildVPApprovals, roles: ['vp'], label: 'Approvals' },
  'vp_student_issues': { builder: window.buildVPStudentIssues, roles: ['vp'], label: 'Student Issues' },
  'vp_students': { builder: window.buildVPStudents, roles: ['vp'], label: 'Students Overview' },
  'vp_attendance': { builder: window.buildVPAttendance, roles: ['vp'], label: 'Attendance' },
  'vp_class_perf': { builder: window.buildVPClassPerf, roles: ['vp'], label: 'Performance' },
  'vp_analysis': { builder: window.buildVPAnalysis, roles: ['vp'], label: 'Analysis' },
  'vp_teacher_monitoring': { builder: window.buildVPTeacherMonitoring, roles: ['vp'], label: 'Teacher Activity' },
  'vp_timetable': { builder: window.buildVPTimetable, roles: ['vp'], label: 'Timetable' },
  'vp_exams': { builder: window.buildVPExams, roles: ['vp'], label: 'Exams' },
  'vp_reports': { builder: window.buildVPReports, roles: ['vp'], label: 'Reports' },
  'vp_notices': { builder: window.buildVPNotices, roles: ['vp'], label: 'Notices' },
  'vp_events': { builder: window.buildVPEvents, roles: ['vp'], label: 'Events' },
  'vp_messages': { builder: window.buildVPMessages, roles: ['vp'], label: 'Messages' },
  'vp_upload': { builder: window.buildVPUpload, roles: ['vp'], label: 'Upload' },
  'vp_helpdesk': { builder: window.buildVPHelpdesk, roles: ['vp'], label: 'Helpdesk' },
  'vp_profile': { builder: window.buildVPProfile, roles: ['vp'], label: 'Profile' },
  'vp_settings': { builder: window.buildVPSettings, roles: ['vp'], label: 'Settings' }
};
