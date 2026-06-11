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
    () => Promise.resolve({ data: [
      { id: 'APP-101', type: 'Leave Request (Teacher)', status: 'Pending Review' },
      { id: 'APP-102', type: 'Event Budget: Science Fair', status: 'Pending' },
      { id: 'APP-103', type: 'Syllabus Change: Math 10th', status: 'Under Review' }
    ]}),
    (data) => {
      let rows = data.map(row => `<tr><td><strong>${row.id}</strong></td><td>${row.type}</td><td><span style="padding:4px 8px;border-radius:12px;background:var(--color-warning-light, #fff3cd);color:var(--color-warning-dark, #856404);font-size:12px">${row.status}</span></td></tr>`).join('');
      return `<table class="cc-table"><thead><tr><th>Request ID</th><th>Type / Description</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`;
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
    () => Promise.resolve({ data: [
      { student_name: 'Rahul Sharma', class: '10-A', issue: 'Repeatedly late to class', status: 'Pending Review' },
      { student_name: 'Priya Patel', class: '9-B', issue: 'Missing continuous assignments', status: 'Teacher Contacted' },
      { student_name: 'Amit Kumar', class: '10-C', issue: 'Disciplinary action during recess', status: 'Parents Summoned' }
    ]}),
    (data) => {
      let rows = data.map(row => `<tr><td><strong>${row.student_name}</strong><br><small style="color:var(--color-text-muted)">Class ${row.class}</small></td><td>${row.issue}</td><td><span style="font-size:13px;font-weight:600">${row.status}</span></td></tr>`).join('');
      return `<table class="cc-table"><thead><tr><th>Student</th><th>Reported Issue</th><th>Current Status</th></tr></thead><tbody>${rows}</tbody></table>`;
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
    () => Promise.resolve({ data: [
      { class: '10-A', present: 38, total: 40, percentage: '95%' },
      { class: '10-B', present: 35, total: 40, percentage: '87.5%' },
      { class: '9-A', present: 39, total: 40, percentage: '97.5%' },
      { class: '9-B', present: 32, total: 40, percentage: '80%' }
    ]}),
    (data) => {
      let rows = data.map(row => `<tr><td><strong>${row.class}</strong></td><td>${row.present} / ${row.total}</td><td>${row.percentage}</td></tr>`).join('');
      return `<table class="cc-table"><thead><tr><th>Class</th><th>Present / Total</th><th>Percentage</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
  );
  return `
    <div id="section-vp_attendance" class="dash-section">
      <div class="card">
        <h2>Attendance Overview (Today)</h2>
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
    () => Promise.resolve({ data: [
      { class: '10-A', subject: 'Mathematics', avg_score: '88%', top_scorer: 'KASULA ASHWATH' },
      { class: '10-B', subject: 'Science', avg_score: '82%', top_scorer: 'Rohit Verma' },
      { class: '9-A', subject: 'English', avg_score: '91%', top_scorer: 'Neha Singh' }
    ]}),
    (data) => {
      let rows = data.map(row => `<tr><td><strong>${row.class}</strong></td><td>${row.subject}</td><td><span style="color:var(--color-primary);font-weight:bold">${row.avg_score}</span></td><td>${row.top_scorer}</td></tr>`).join('');
      return `<table class="cc-table"><thead><tr><th>Class</th><th>Subject</th><th>Class Average</th><th>Top Scorer</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
  );
  return `
    <div id="section-vp_class_perf" class="dash-section">
      <div class="card">
        <h2>Class Performance Metrics</h2>
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
    () => Promise.resolve({ data: [
      { metric: 'Overall Pass Percentage', value: '94.2%', trend: '+2.1% from last month', color: 'green' },
      { metric: 'Average Attendance', value: '92.5%', trend: '-0.4% from last month', color: 'orange' },
      { metric: 'Disciplinary Incidents', value: '14', trend: '-5 from last month', color: 'green' }
    ]}),
    (data) => {
      let rows = data.map(row => `<tr><td style="font-size:16px">${row.metric}</td><td style="text-align:right"><h2 style="margin:0">${row.value}</h2><small style="color:${row.color}">${row.trend}</small></td></tr>`).join('');
      return `<table class="cc-table"><tbody>${rows}</tbody></table>`;
    }
  );
  return `
    <div id="section-vp_analysis" class="dash-section">
      <div class="card">
        <h2>Student Analysis & Trends</h2>
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
    <div id="section-vp_teachers" class="dash-section">
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
    () => Promise.resolve({ data: [
      { day: 'Monday', time: '09:00 - 10:00', class: '10-A', subject: 'Mathematics', teacher: 'Mr. Sharma' },
      { day: 'Monday', time: '10:00 - 11:00', class: '9-B', subject: 'Science', teacher: 'Mrs. Gupta' },
      { day: 'Monday', time: '11:30 - 12:30', class: '10-C', subject: 'English', teacher: 'Ms. Reddy' }
    ]}),
    (data) => {
      let rows = data.map(row => `<tr><td><strong>${row.day}</strong><br><small style="color:var(--color-text-muted)">${row.time}</small></td><td>${row.class}</td><td>${row.subject}</td><td>${row.teacher}</td></tr>`).join('');
      return `<table class="cc-table"><thead><tr><th>Time Slot</th><th>Class</th><th>Subject</th><th>Teacher</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
  );
  return `
    <div id="section-vp_schedule" class="dash-section">
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
    () => Promise.resolve({ data: [
      { exam_name: 'Mid-Term Examinations', date: 'Oct 15 - Oct 25, 2026', status: 'Scheduled' },
      { exam_name: 'Weekly Unit Test 4', date: 'Aug 20, 2026', status: 'Results Pending' },
      { exam_name: 'Quarterly Assessments', date: 'Sep 10, 2026', status: 'Preparation' }
    ]}),
    (data) => {
      let rows = data.map(row => `<tr><td><strong>${row.exam_name}</strong></td><td>${row.date}</td><td><span class="cc-badge" style="background:var(--color-surface-2);padding:4px 8px;border-radius:6px;border:1px solid var(--color-border)">${row.status}</span></td></tr>`).join('');
      return `<table class="cc-table"><thead><tr><th>Exam Name</th><th>Date</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
  );
  return `
    <div id="section-vp_exams" class="dash-section">
      <div class="card">
        <h2>Exams & Results Status</h2>
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
    () => Promise.resolve({ data: [
      { report: 'Monthly Attendance Summary', date: 'Last 30 Days', type: 'PDF' },
      { report: 'Teacher Performance Matrix', date: 'Quarter 2', type: 'Excel' },
      { report: 'Fee Collection Defaulters', date: 'As of Today', type: 'CSV' }
    ]}),
    (data) => {
      let rows = data.map(row => `<tr><td><i class="fas fa-file-alt" style="color:var(--color-primary);margin-right:8px"></i> <strong>${row.report}</strong></td><td>${row.date}</td><td style="text-align:right"><button class="cc-btn cc-btn-primary" style="padding:4px 10px;font-size:12px"><i class="fas fa-download"></i> Download ${row.type}</button></td></tr>`).join('');
      return `<table class="cc-table"><thead><tr><th>Report Name</th><th>Period</th><th style="text-align:right">Action</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
  );
  return `
    <div id="section-vp_reports" class="dash-section">
      <div class="card">
        <h2>Generated Reports</h2>
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
    () => Promise.resolve({ data: [
      { sender: 'Principal Office', subject: 'Urgent: Board Meeting Tomorrow', time: '10 mins ago', isNew: true },
      { sender: 'Mrs. Gupta (Science)', subject: 'Lab Equipment Shortage', time: '2 hours ago', isNew: false },
      { sender: 'Transport Dept', subject: 'Bus Route 4 Delayed', time: 'Yesterday', isNew: false }
    ]}),
    (data) => {
      let rows = data.map(row => `<tr><td>${row.isNew ? '<span style="color:var(--color-primary);font-size:10px;vertical-align:middle;margin-right:6px"><i class="fas fa-circle"></i></span>' : ''}<strong>${row.sender}</strong></td><td>${row.subject}</td><td style="color:var(--color-text-muted);text-align:right"><small>${row.time}</small></td></tr>`).join('');
      return `<table class="cc-table" style="table-layout:fixed"><tbody>${rows}</tbody></table>`;
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
    () => Promise.resolve({ data: [
      { issue: 'Projector in Room 102 not turning on', status: 'Open', priority: 'High', color: '#e74c3c' },
      { issue: 'Wi-Fi slow in Staff Room B', status: 'In Progress', priority: 'Medium', color: '#f39c12' },
      { issue: 'Smartboard calibration needed', status: 'Pending Parts', priority: 'Low', color: '#3498db' }
    ]}),
    (data) => {
      let rows = data.map(row => `<tr><td><strong>${row.issue}</strong></td><td><span style="background:${row.color}15;color:${row.color};padding:4px 8px;border-radius:12px;font-size:11px;font-weight:bold">${row.priority}</span></td><td>${row.status}</td></tr>`).join('');
      return `<table class="cc-table"><thead><tr><th>Issue Description</th><th>Priority</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
  );
  return `
    <div id="section-helpdesk_staff" class="dash-section">
      <div class="card">
        <h2>Helpdesk Tickets (IT & Maintenance)</h2>
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
  'vp_teachers': { builder: window.buildVPTeacherMonitoring, roles: ['vp'], label: 'Teacher Activity' },
  'vp_schedule': { builder: window.buildVPTimetable, roles: ['vp'], label: 'Timetable' },
  'vp_exams': { builder: window.buildVPExams, roles: ['vp'], label: 'Exams' },
  'vp_reports': { builder: window.buildVPReports, roles: ['vp'], label: 'Reports' },
  'announcements': { builder: window.buildVPNotices, roles: ['vp'], label: 'Notices' },
  'events': { builder: window.buildVPEvents, roles: ['vp'], label: 'Events' },
  'vp_messages': { builder: window.buildVPMessages, roles: ['vp'], label: 'Messages' },
  'document_upload': { builder: window.buildVPUpload, roles: ['vp'], label: 'Upload' },
  'helpdesk_staff': { builder: window.buildVPHelpdesk, roles: ['vp'], label: 'Helpdesk' },
  'settings': { builder: window.buildVPSettings, roles: ['vp'], label: 'Settings' }
};
