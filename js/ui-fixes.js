/* ============================================================
   CAMPUS CORE – UI FIXES
   Fixes navigation issues and dashboard inconsistencies
   ============================================================ */

// ─── Fixed Navigation Function ─────────────────────────────────
function navigateTo(sectionId) {
  if (sectionId === 'logout') {
    if (typeof logout === 'function') logout();
    return;
  }
  
  // Remove active class from all menu items
  document.querySelectorAll('.menu-link').forEach(el => el.classList.remove('active'));
  
  // Add active class to current menu item
  const activeNav = document.getElementById('nav-' + sectionId);
  if (activeNav) activeNav.classList.add('active');
  
  // Hide all dashboard sections
  document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
  
  // Show the target section - try multiple possible IDs
  let targetSection = null;
  const possibleIds = [
    'section-' + sectionId,
    'section-' + sectionId.replace('_', '-'),
    sectionId + '-section',
    sectionId
  ];
  
  for (const id of possibleIds) {
    const sec = document.getElementById(id);
    if (sec) {
      sec.classList.add('active');
      targetSection = sec;
      currentSection = sectionId;
      break;
    }
  }
  
  // If section not found, show home/dashboard
  if (!targetSection) {
    console.warn(`Section not found for: ${sectionId}. Showing dashboard instead.`);
    const homeSection = document.getElementById('section-home');
    if (homeSection) {
      homeSection.classList.add('active');
      currentSection = 'home';
    }
  }
  
  // Close mobile sidebar
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Scroll to top of content
  const contentArea = document.getElementById('content-area');
  if (contentArea) {
    contentArea.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ─── Fixed VP Dashboard Student Counts ────────────────────────────
function updateVPDashboardCounts() {
  // Get actual student count from STUDENTS array
  const totalStudents = STUDENTS ? STUDENTS.length : 130;
  
  // Calculate attendance based on actual student data
  let presentCount = 0;
  let absentCount = 0;
  let lateCount = 0;
  
  if (STUDENTS) {
    STUDENTS.forEach(student => {
      const attendance = student.attendance || 0;
      if (attendance >= 95) presentCount++;
      else if (attendance >= 85) lateCount++;
      else absentCount++;
    });
  }
  
  // Update VP dashboard stats
  const presentElement = document.querySelector('[data-stat="present"]');
  const absentElement = document.querySelector('[data-stat="absent"]');
  const lateElement = document.querySelector('[data-stat="late"]');
  const totalElement = document.querySelector('[data-stat="total"]');
  
  if (presentElement) presentElement.textContent = presentCount;
  if (absentElement) absentElement.textContent = absentCount;
  if (lateElement) lateElement.textContent = lateCount;
  if (totalElement) totalElement.textContent = totalStudents;
  
  // Update student analysis section
  const strengthElement = document.querySelector('.student-strength-count');
  if (strengthElement) strengthElement.textContent = totalStudents;
}

// ─── Enhanced Section Filters ───────────────────────────────────
function createClassSectionFilters() {
  const filterContainer = document.getElementById('class-section-filters');
  if (!filterContainer) return;
  
  const classes = ['6', '7', '8', '9', '10'];
  const sections = ['A', 'B', 'C', 'D'];
  
  let filterHTML = `
    <div class="filter-row">
      <select id="class-filter" class="filter-select">
        <option value="all">All Classes</option>
        ${classes.map(cls => `<option value="${cls}">Class ${cls}</option>`).join('')}
      </select>
      <select id="section-filter" class="filter-select">
        <option value="all">All Sections</option>
        ${sections.map(sec => `<option value="${sec}">Section ${sec}</option>`).join('')}
      </select>
      <button onclick="applyClassSectionFilters()" class="btn-primary">Apply Filter</button>
      <button onclick="resetClassSectionFilters()" class="btn-secondary">Reset</button>
    </div>
  `;
  
  filterContainer.innerHTML = filterHTML;
}

function applyClassSectionFilters() {
  const classFilter = document.getElementById('class-filter')?.value || 'all';
  const sectionFilter = document.getElementById('section-filter')?.value || 'all';
  
  let filteredStudents = STUDENTS || [];
  
  if (classFilter !== 'all') {
    filteredStudents = filteredStudents.filter(s => s.class === classFilter);
  }
  
  if (sectionFilter !== 'all') {
    filteredStudents = filteredStudents.filter(s => s.section === sectionFilter);
  }
  
  // Update the student display
  updateStudentDisplay(filteredStudents);
}

function resetClassSectionFilters() {
  document.getElementById('class-filter').value = 'all';
  document.getElementById('section-filter').value = 'all';
  updateStudentDisplay(STUDENTS || []);
}

function updateStudentDisplay(students) {
  const container = document.querySelector('.students-table-container');
  if (!container) return;
  
  // Update student count
  const countElement = container.querySelector('.student-count');
  if (countElement) countElement.textContent = students.length;
  
  // Update student table
  const tableBody = container.querySelector('tbody');
  if (tableBody) {
    tableBody.innerHTML = students.map(student => `
      <tr>
        <td>${student.admNo}</td>
        <td>${student.name}</td>
        <td>${student.class}-${student.section || ''}</td>
        <td>${student.roll}</td>
        <td>${student.attendance}%</td>
        <td>${student.gpa}</td>
        <td>${student.fee_status}</td>
        <td>
          <button onclick="editStudent('${student.id}')" class="btn-sm btn-primary">Edit</button>
          <button onclick="deleteStudent('${student.id}')" class="btn-sm btn-danger">Delete</button>
        </td>
      </tr>
    `).join('');
  }
}

// ─── Enhanced Button Functionality ───────────────────────────────
function enhanceButtonFunctionality() {
  // Fix all button click handlers
  document.querySelectorAll('button').forEach(button => {
    const onclick = button.getAttribute('onclick');
    if (!onclick || onclick.includes('simulateAction')) {
      // Replace simulateAction with realAction
      const action = button.getAttribute('data-action') || 'default';
      button.setAttribute('onclick', `realAction('${action}', {})`);
    }
  });
}

// ─── Fixed Approvals System ───────────────────────────────────────
function initializeApprovals() {
  const approvalsContainer = document.getElementById('approvals-container');
  if (!approvalsContainer) return;
  
  // Sample approvals data
  const approvals = [
    { id: 'AP01', type: 'Leave Request', desc: 'Medical leave for 3 days - Anita Pillai', date: 'Today', status: 'Pending' },
    { id: 'AP02', type: 'Timetable Swap', desc: 'Swap P3 with Prasana Reddy for Class 10-A', date: 'Today', status: 'Pending' },
    { id: 'AP03', type: 'Event Fund', desc: '₹15,000 for Science Exhibition materials', date: 'Yesterday', status: 'Pending' }
  ];
  
  approvalsContainer.innerHTML = approvals.map(approval => `
    <div class="approval-item" data-id="${approval.id}">
      <div class="approval-header">
        <span class="approval-type">${approval.type}</span>
        <span class="approval-date">${approval.date}</span>
      </div>
      <div class="approval-desc">${approval.desc}</div>
      <div class="approval-actions">
        <button onclick="approveRequest('${approval.id}')" class="btn-sm btn-success">Approve</button>
        <button onclick="rejectRequest('${approval.id}')" class="btn-sm btn-danger">Reject</button>
      </div>
    </div>
  `).join('');
}

function approveRequest(id) {
  const element = document.querySelector(`[data-id="${id}"]`);
  if (element) {
    element.classList.add('approved');
    element.querySelector('.approval-actions').innerHTML = '<span class="approved-badge">Approved</span>';
    showNotification('Request approved successfully', 'success');
  }
}

function rejectRequest(id) {
  const element = document.querySelector(`[data-id="${id}"]`);
  if (element) {
    element.classList.add('rejected');
    element.querySelector('.approval-actions').innerHTML = '<span class="rejected-badge">Rejected</span>';
    showNotification('Request rejected', 'warning');
  }
}

// ─── Fixed Teacher Monitoring ───────────────────────────────────
function enableTeacherMonitoring() {
  // Make all teacher monitoring fields editable
  document.querySelectorAll('.teacher-monitoring input, .teacher-monitoring select, .teacher-monitoring textarea').forEach(field => {
    field.removeAttribute('readonly');
    field.removeAttribute('disabled');
  });
  
  // Add save button
  const monitoringContainer = document.querySelector('.teacher-monitoring');
  if (monitoringContainer && !monitoringContainer.querySelector('.save-monitoring-btn')) {
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn-primary save-monitoring-btn';
    saveBtn.textContent = 'Save Changes';
    saveBtn.onclick = saveTeacherMonitoring;
    monitoringContainer.appendChild(saveBtn);
  }
}

function saveTeacherMonitoring() {
  // Collect all monitoring data
  const monitoringData = {};
  document.querySelectorAll('.teacher-monitoring input, .teacher-monitoring select, .teacher-monitoring textarea').forEach(field => {
    monitoringData[field.name || field.id] = field.value;
  });
  
  // Save to localStorage
  localStorage.setItem('teacher_monitoring', JSON.stringify(monitoringData));
  showNotification('Teacher monitoring data saved successfully', 'success');
}

// ─── Multi-Language Support ───────────────────────────────────────
const TRANSLATIONS = {
  'English': {
    'Dashboard': 'Dashboard',
    'Students': 'Students',
    'Teachers': 'Teachers',
    'Attendance': 'Attendance',
    'Homework': 'Homework',
    'Results': 'Results',
    'Settings': 'Settings',
    'Approvals': 'Approvals',
    'Messages': 'Messages'
  },
  'Telugu': {
    'Dashboard': 'డాష్‌బోర్డ్',
    'Students': 'విద్యార్థులు',
    'Teachers': 'ఉపాధ్యాయులు',
    'Attendance': 'హాజరు',
    'Homework': 'ఇంటిపని',
    'Results': 'ఫలితాలు',
    'Settings': 'సెట్టింగులు',
    'Approvals': 'అనుమతులు',
    'Messages': 'సందేశాలు'
  },
  'Hindi': {
    'Dashboard': 'डैशबोर्ड',
    'Students': 'छात्र',
    'Teachers': 'शिक्षक',
    'Attendance': 'उपस्थिति',
    'Homework': 'गृहकार्य',
    'Results': 'परिणाम',
    'Settings': 'सेटिंग्स',
    'Approvals': 'अनुमोदन',
    'Messages': 'संदेश'
  }
};

function applyLanguage(language) {
  if (!TRANSLATIONS[language]) language = 'English';
  
  localStorage.setItem('cc_sys_lang', language);
  
  // Update all translatable text
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (TRANSLATIONS[language][key]) {
      element.textContent = TRANSLATIONS[language][key];
    }
  });
  
  // Update navigation
  document.querySelectorAll('.menu-link').forEach(link => {
    const enLabel = link.getAttribute('data-en-label');
    if (enLabel && TRANSLATIONS[language][enLabel]) {
      link.querySelector('.menu-text').textContent = TRANSLATIONS[language][enLabel];
    }
  });
}

// ─── Initialize All Fixes ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Apply fixes after dashboard is loaded
  setTimeout(() => {
    updateVPDashboardCounts();
    createClassSectionFilters();
    enhanceButtonFunctionality();
    initializeApprovals();
    enableTeacherMonitoring();
  }, 1000);
});

// Export functions for global use
window.navigateTo = navigateTo;
window.updateVPDashboardCounts = updateVPDashboardCounts;
window.createClassSectionFilters = createClassSectionFilters;
window.applyClassSectionFilters = applyClassSectionFilters;
window.resetClassSectionFilters = resetClassSectionFilters;
window.approveRequest = approveRequest;
window.rejectRequest = rejectRequest;
window.enableTeacherMonitoring = enableTeacherMonitoring;
window.saveTeacherMonitoring = saveTeacherMonitoring;
window.applyLanguage = applyLanguage;
