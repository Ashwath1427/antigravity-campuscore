/* ============================================================
   CAMPUS CORE – TEACHER.JS
   Teacher-specific functions and utilities
   ============================================================ */

// ─── Teacher Dashboard Builders ────────────────────────────────
function buildTeacherDashboard(user) {
    const cfg = ROLE_HOME[user.role];
    const dateStr = getFormattedDate();
    const firstName = user.name.split(' ')[0];
    
    return `<div class="dash-section" id="section-home">
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:30px;flex-wrap:wrap">
          <div>
            <h2 style="margin:0 0 8px 0">${cfg.greeting || `Good Morning, ${firstName}!`}</h2>
            <p style="margin:0;color:var(--color-text-muted)">${cfg.subtitle || 'Your classes and tasks for today.'}</p>
          </div>
          <div style="text-align:right">
            <div style="font-size:12px;color:var(--color-text-muted)">${dateStr}</div>
            <div style="font-size:10px;color:var(--color-text-muted)">Academic Year 2025-2026</div>
          </div>
        </div>
        <div class="stats-grid" style="grid-template-columns:repeat(auto-fit,minmax(140px,1fr))">
          ${(cfg.stats || []).map(s => `
            <div class="stat-card">
              <div class="stat-icon" style="background:${s.color}20;color:${s.color}">${s.icon}</div>
              <div class="stat-value">${s.value}</div>
              <div class="stat-label">${s.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>`;
}

// ─── Teacher Profile Builder ────────────────────────────────────
function buildTeacherProfile(user) {
    const teacher = TEACHERS.find(t => t.name === user.name) || {};
    return `<div class="dash-section" id="section-profile">
      <div class="card">
        <div style="display:flex;align-items:center;gap:24px;margin-bottom:30px">
          <div class="avatar" style="width:80px;height:80px;font-size:32px;background:${user.avatar_color}">
            ${getInitials(user.name)}
          </div>
          <div>
            <h2 style="margin:0 0 4px 0">${user.name}</h2>
            <p style="margin:0 0 4px 0;color:var(--color-text-muted)">${user.roleLabel}</p>
            <p style="margin:0;color:var(--color-text-muted)">${user.department}</p>
          </div>
        </div>
        <div class="profile-grid">
          ${pRow("Employee ID", user.username)}
          ${pRow("Email", user.email)}
          ${pRow("Phone", user.phone)}
          ${pRow("Joined", user.joined)}
          ${pRow("Specialization", teacher.subject || 'N/A')}
          ${pRow("Classes", teacher.classes || 'N/A')}
          ${pRow("Experience", teacher.exp || 'N/A')}
          ${pRow("Status", '<span class="badge badge-active">Active</span>')}
        </div>
        <div style="margin-top:24px">
          <button class="btn-primary" onclick="showEditProfileModal()">Edit Profile</button>
        </div>
      </div>
    </div>`;
}

// ─── Teacher Attendance Builder ─────────────────────────────────
function buildTeacherAttendanceSection(user) {
    const today = new Date().toLocaleDateString('en-IN');
    return `<div class="dash-section" id="section-teacher_attendance">
      <div class="card">
        <div class="section-header">
          <h3>Mark Attendance</h3>
          <span class="date-badge">${today}</span>
        </div>
        <div style="margin-bottom:20px">
          <select class="form-control" id="att-class-select" style="max-width:300px">
            <option value="">Select Class</option>
            ${TEACHER_MY_CLASSES.map(c => `<option value="${c.class}">Class ${c.class} - ${c.subject}</option>`).join('')}
          </select>
        </div>
        <div id="attendance-marking-area">
          <p style="text-align:center;color:var(--color-text-muted);padding:40px">Select a class to mark attendance</p>
        </div>
      </div>
    </div>`;
}

// ─── Teacher Homework Builder ───────────────────────────────────
function buildTeacherHomeworkSection(user) {
    return `<div class="dash-section" id="section-teacher_homework">
      <div class="card">
        <div class="section-header">
          <h3>Homework Management</h3>
          <button class="btn-primary" onclick="showCreateHomeworkModal()">Create Assignment</button>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Assignment</th>
                <th>Class</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${TEACHER_HOMEWORK_TRACKING.map(hw => `
                <tr>
                  <td style="font-weight:700">${hw.title}</td>
                  <td><span class="badge">${hw.class}</span></td>
                  <td>${hw.dueDate}</td>
                  <td><span class="badge ${hw.status.includes('Open') ? 'badge-info' : hw.status.includes('Grading') ? 'badge-warning' : 'badge-success'}">${hw.status}</span></td>
                  <td>
                    <div style="display:flex;align-items:center;gap:8px">
                      <div class="progress-bar" style="flex:1">
                        <div class="progress-fill" style="width:${(hw.submitted/(hw.submitted+hw.pending))*100}%"></div>
                      </div>
                      <span style="font-size:12px;color:var(--color-text-muted)">${hw.submitted}/${hw.submitted+hw.pending}</span>
                    </div>
                  </td>
                  <td>
                    <button class="btn-sm" onclick="viewHomeworkDetails('${hw.id}')">View</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

// ─── Teacher Results Builder ─────────────────────────────────────
function buildTeacherResultsSection(user) {
    return `<div class="dash-section" id="section-teacher_results">
      <div class="card">
        <div class="section-header">
          <h3>Marks & Results</h3>
          <button class="btn-primary" onclick="showMarksEntryModal()">Enter Marks</button>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Exam</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Students</th>
                <th>Marks Entered</th>
                <th>Average</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${TEACHER_RESULT_TRACKING.map(res => `
                <tr>
                  <td style="font-weight:700">${res.exam}</td>
                  <td><span class="badge">${res.class}</span></td>
                  <td>${res.subject}</td>
                  <td>${res.totalStudents}</td>
                  <td>${res.marksEntered}</td>
                  <td>${res.avgScore > 0 ? res.avgScore + '%' : '-'}</td>
                  <td><span class="badge ${res.status.includes('Pending') ? 'badge-warning' : res.status.includes('Draft') ? 'badge-info' : 'badge-success'}">${res.status}</span></td>
                  <td>
                    <button class="btn-sm" onclick="editMarks('${res.exam}', '${res.class}')">Edit</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

// ─── Teacher Messages Builder ───────────────────────────────────
function buildTeacherMessagesSection(user) {
    const store = getEscalationStore();
    const teacherIssues = store.teacherInbox.slice().sort((a, b) => new Date(b.registeredDate || b.escalatedDate || 0) - new Date(a.registeredDate || a.escalatedDate || 0));
    
    return `<div class="dash-section" id="section-teacher_messages">
      <div class="card">
        <div class="section-header">
          <h3>Messages & Issues</h3>
          <button class="btn-primary" onclick="openRegisterTeacherIssueModal()">Report Issue</button>
        </div>
        <div class="messages-list">
          ${teacherIssues.length === 0 ? 
            '<p style="text-align:center;color:var(--color-text-muted);padding:40px">No messages</p>' :
            teacherIssues.map(msg => `
              <div class="message-card ${msg.unread ? 'unread' : ''}" onclick="openTeacherMessageModal('${msg.id}')">
                <div class="message-header">
                  <div class="message-from">${msg.sender}</div>
                  <div class="message-time">${msg.time}</div>
                  ${msg.unread ? '<div class="unread-indicator"></div>' : ''}
                </div>
                <div class="message-subject">${msg.subject}</div>
                <div class="message-preview">${msg.content.substring(0, 100)}...</div>
              </div>
            `).join('')
          }
        </div>
      </div>
    </div>`;
}

// ─── Utility Functions ───────────────────────────────────────────
function showEditProfileModal() {
  const modal = `
    <div class="modal-overlay" id="edit-profile-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
      <div class="modal" style="max-width:500px">
        <h3 style="margin-top:0">Edit Profile</h3>
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" id="edit-email" value="${currentUser.email}">
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input type="tel" class="form-control" id="edit-phone" value="${currentUser.phone}">
        </div>
        <div class="form-group">
          <label>Specialization</label>
          <input type="text" class="form-control" id="edit-subject" value="${TEACHERS.find(t => t.name === currentUser.name)?.subject || ''}">
        </div>
        <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px">
          <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
          <button class="btn-primary" onclick="saveTeacherProfile()">Save Changes</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modal);
}

function saveTeacherProfile() {
  const email = document.getElementById('edit-email')?.value || '';
  const phone = document.getElementById('edit-phone')?.value || '';
  const subject = document.getElementById('edit-subject')?.value || '';
  
  // Update user data
  currentUser.email = email;
  currentUser.phone = phone;
  
  // Update teacher data
  const teacher = TEACHERS.find(t => t.name === currentUser.name);
  if (teacher) {
    teacher.subject = subject;
  }
  
  // Save session
  try { sessionStorage.setItem('cc_user', JSON.stringify(currentUser)); } catch(e) {}
  
  // Close modal and refresh
  document.getElementById('edit-profile-modal')?.remove();
  if (typeof buildDashboard === 'function') buildDashboard(currentUser);
  
  showNotification('Profile updated successfully', 'success');
}

function showCreateHomeworkModal() {
  const modal = `
    <div class="modal-overlay" id="create-homework-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
      <div class="modal" style="max-width:600px">
        <h3 style="margin-top:0">Create Assignment</h3>
        <div class="form-group">
          <label>Assignment Title</label>
          <input type="text" class="form-control" id="hw-title" placeholder="Enter assignment title">
        </div>
        <div class="form-group">
          <label>Class</label>
          <select class="form-control" id="hw-class">
            ${TEACHER_MY_CLASSES.map(c => `<option value="${c.class}">Class ${c.class}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Due Date</label>
          <input type="date" class="form-control" id="hw-due">
        </div>
        <div class="form-group">
          <label>Instructions</label>
          <textarea class="form-control" id="hw-instructions" rows="4" placeholder="Enter assignment instructions..."></textarea>
        </div>
        <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px">
          <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
          <button class="btn-primary" onclick="createHomework()">Create Assignment</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modal);
}

function createHomework() {
  const title = document.getElementById('hw-title')?.value || '';
  const className = document.getElementById('hw-class')?.value || '';
  const dueDate = document.getElementById('hw-due')?.value || '';
  const instructions = document.getElementById('hw-instructions')?.value || '';
  
  if (!title || !className || !dueDate) {
    showNotification('Please fill all required fields', 'error');
    return;
  }
  
  // Add to homework tracking
  const newHomework = {
    id: 'HW' + Date.now(),
    title,
    class: className,
    dueDate: new Date(dueDate).toLocaleDateString('en-IN'),
    status: 'Submission Open',
    submitted: 0,
    pending: 35
  };
  
  TEACHER_HOMEWORK_TRACKING.unshift(newHomework);
  
  // Close modal and refresh
  document.getElementById('create-homework-modal')?.remove();
  if (typeof buildDashboard === 'function') buildDashboard(currentUser);
  
  showNotification('Assignment created successfully', 'success');
}

function showMarksEntryModal() {
  const modal = `
    <div class="modal-overlay" id="marks-entry-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
      <div class="modal" style="max-width:700px">
        <h3 style="margin-top:0">Enter Marks</h3>
        <div class="form-group">
          <label>Exam</label>
          <select class="form-control" id="marks-exam">
            <option value="Unit Test 3">Unit Test 3</option>
            <option value="Mid-Term">Mid-Term</option>
            <option value="Final Exam">Final Exam</option>
          </select>
        </div>
        <div class="form-group">
          <label>Class</label>
          <select class="form-control" id="marks-class">
            ${TEACHER_MY_CLASSES.map(c => `<option value="${c.class}">Class ${c.class}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Subject</label>
          <input type="text" class="form-control" id="marks-subject" value="${TEACHERS.find(t => t.name === currentUser.name)?.subject || ''}" readonly>
        </div>
        <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px">
          <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
          <button class="btn-primary" onclick="openMarksEntryForm()">Proceed to Entry</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modal);
}

function openMarksEntryForm() {
  const exam = document.getElementById('marks-exam')?.value || '';
  const className = document.getElementById('marks-class')?.value || '';
  const subject = document.getElementById('marks-subject')?.value || '';
  
  // Get students for this class
  const classStudents = STUDENTS.filter(s => s.class === className).slice(0, 5);
  
  const marksModal = `
    <div class="modal-overlay" id="marks-form-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
      <div class="modal" style="max-width:800px;max-height:80vh;overflow-y:auto">
        <h3 style="margin-top:0">Enter Marks - ${exam} | Class ${className} | ${subject}</h3>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Marks (out of 100)</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              ${classStudents.map(student => `
                <tr>
                  <td>${student.roll}</td>
                  <td style="font-weight:700">${student.name}</td>
                  <td><input type="number" class="form-control" min="0" max="100" value="${Math.floor(Math.random() * 20) + 75}" onchange="calculateGrade(this)"></td>
                  <td><span class="grade-badge">A</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px">
          <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
          <button class="btn-primary" onclick="submitMarks()">Submit Marks</button>
        </div>
      </div>
    </div>
  `;
  
  // Close current modal and open marks form
  document.getElementById('marks-entry-modal')?.remove();
  document.body.insertAdjacentHTML('beforeend', marksModal);
}

function calculateGrade(input) {
  const marks = parseInt(input.value) || 0;
  const gradeBadge = input.closest('tr').querySelector('.grade-badge');
  let grade = 'F';
  
  if (marks >= 90) grade = 'A+';
  else if (marks >= 80) grade = 'A';
  else if (marks >= 70) grade = 'B+';
  else if (marks >= 60) grade = 'B';
  else if (marks >= 50) grade = 'C';
  else if (marks >= 40) grade = 'D';
  
  if (gradeBadge) {
    gradeBadge.textContent = grade;
    gradeBadge.style.background = gradeColor(grade) + '20';
    gradeBadge.style.color = gradeColor(grade);
  }
}

function submitMarks() {
  // Close modal and refresh
  document.getElementById('marks-form-modal')?.remove();
  if (typeof buildDashboard === 'function') buildDashboard(currentUser);
  
  showNotification('Marks submitted successfully', 'success');
}

function showNotification(message, type = 'info') {
  const notification = `
    <div class="notification-toast ${type}" style="position:fixed;top:20px;right:20px;z-index:9999;padding:16px 20px;border-radius:8px;color:white;background:${type === 'success' ? '#5ca870' : type === 'error' ? '#d32f2f' : '#1976d2'};box-shadow:0 4px 12px rgba(0,0,0,0.15)">
      ${message}
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', notification);
  setTimeout(() => {
    const toast = document.querySelector('.notification-toast');
    if (toast) toast.remove();
  }, 3000);
}

// ─── Initialize Teacher Functions ─────────────────────────────────
console.log('[Teacher.js] Teacher module loaded successfully');
