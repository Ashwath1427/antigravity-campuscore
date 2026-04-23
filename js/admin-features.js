/* ============================================================
   CAMPUS CORE – ADMIN FEATURES
   User registration, bulk upload, and admin functionality
   ============================================================ */

// ─── User Registration System ───────────────────────────────────
function showUserRegistrationModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'user-registration-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Register New User</h3>
        <button class="modal-close" onclick="closeModal('user-registration-modal')">×</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>User Type</label>
          <select id="user-type" onchange="updateUserForm()">
            <option value="">Select User Type</option>
            <option value="student">Student</option>
            <option value="parent">Parent</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div id="user-form-fields"></div>
      </div>
      <div class="modal-footer">
        <button class="btn-secondary" onclick="closeModal('user-registration-modal')">Cancel</button>
        <button class="btn-primary" onclick="registerUser()">Register User</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.style.display = 'flex';
}

function updateUserForm() {
  const userType = document.getElementById('user-type').value;
  const formFields = document.getElementById('user-form-fields');
  
  let formHTML = '';
  
  if (userType === 'student') {
    formHTML = `
      <div class="form-group">
        <label>Admission Number</label>
        <input type="text" id="adm-no" placeholder="Enter admission number">
      </div>
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" id="full-name" placeholder="Enter full name">
      </div>
      <div class="form-group">
        <label>Class</label>
        <select id="class-select">
          <option value="">Select Class</option>
          <option value="6">Class 6</option>
          <option value="7">Class 7</option>
          <option value="8">Class 8</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
        </select>
      </div>
      <div class="form-group">
        <label>Section</label>
        <select id="section-select">
          <option value="">Select Section</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
          <option value="D">Section D</option>
        </select>
      </div>
      <div class="form-group">
        <label>Roll Number</label>
        <input type="text" id="roll-no" placeholder="Enter roll number">
      </div>
      <div class="form-group">
        <label>Date of Birth</label>
        <input type="date" id="dob">
      </div>
      <div class="form-group">
        <label>Gender</label>
        <select id="gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
    `;
  } else if (userType === 'parent') {
    formHTML = `
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" id="parent-name" placeholder="Enter parent's full name">
      </div>
      <div class="form-group">
        <label>Student's Admission Number</label>
        <input type="text" id="student-adm-no" placeholder="Enter student's admission number">
      </div>
      <div class="form-group">
        <label>Student's Name</label>
        <input type="text" id="student-name" placeholder="Enter student's full name">
      </div>
      <div class="form-group">
        <label>Student's Class</label>
        <select id="student-class">
          <option value="">Select Class</option>
          <option value="6">Class 6</option>
          <option value="7">Class 7</option>
          <option value="8">Class 8</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
        </select>
      </div>
      <div class="form-group">
        <label>Student's Section</label>
        <select id="student-section">
          <option value="">Select Section</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
          <option value="D">Section D</option>
        </select>
      </div>
    `;
  } else if (userType === 'teacher') {
    formHTML = `
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" id="teacher-name" placeholder="Enter teacher's full name">
      </div>
      <div class="form-group">
        <label>Subject</label>
        <input type="text" id="subject" placeholder="Enter subject">
      </div>
      <div class="form-group">
        <label>Classes Assigned</label>
        <input type="text" id="classes" placeholder="e.g., 10-A, 9-B">
      </div>
      <div class="form-group">
        <label>Experience (years)</label>
        <input type="number" id="experience" placeholder="Enter years of experience">
      </div>
      <div class="form-group">
        <label>Phone Number</label>
        <input type="tel" id="phone" placeholder="Enter phone number">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" id="email" placeholder="Enter email address">
      </div>
    `;
  }
  
  formFields.innerHTML = formHTML;
}

function registerUser() {
  const userType = document.getElementById('user-type').value;
  if (!userType) {
    showNotification('Please select a user type', 'error');
    return;
  }
  
  let userData = {};
  let success = false;
  
  if (userType === 'student') {
    userData = {
      id: 'S' + Date.now(),
      admNo: document.getElementById('adm-no').value,
      name: document.getElementById('full-name').value,
      class: document.getElementById('class-select').value,
      section: document.getElementById('section-select').value,
      roll: document.getElementById('roll-no').value,
      dob: document.getElementById('dob').value,
      gender: document.getElementById('gender').value,
      attendance: 0,
      behavior: 'Good',
      fee_status: 'Pending',
      gpa: 0,
      parent: 'Parent of ' + document.getElementById('full-name').value
    };
    
    if (STUDENTS) {
      STUDENTS.push(userData);
      localStorage.setItem('campuscore_students', JSON.stringify(STUDENTS));
      success = true;
    }
  } else if (userType === 'parent') {
    userData = {
      id: 'P' + Date.now(),
      username: 'P' + document.getElementById('student-adm-no').value + 'A',
      password: 'parent123',
      name: document.getElementById('parent-name').value,
      role: 'parent',
      roleLabel: 'Parent',
      department: `Parent of ${document.getElementById('student-name').value} (Class ${document.getElementById('student-class').value}-${document.getElementById('student-section').value})`,
      phone: '+91 99999 99999',
      email: 'parent@example.com',
      joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      avatar_color: '#f57c00',
      icon: 'fa-user-friends',
      childName: document.getElementById('student-name').value,
      childId: document.getElementById('student-adm-no').value,
      childClass: document.getElementById('student-class').value + '-' + document.getElementById('student-section').value,
      childRoll: '01',
      notifications: []
    };
    
    if (DEMO_USERS) {
      DEMO_USERS.push(userData);
      localStorage.setItem('campuscore_users', JSON.stringify(DEMO_USERS));
      success = true;
    }
  } else if (userType === 'teacher') {
    userData = {
      id: 'T' + Date.now(),
      name: document.getElementById('teacher-name').value,
      subject: document.getElementById('subject').value,
      classes: document.getElementById('classes').value,
      exp: document.getElementById('experience').value + ' years',
      phone: document.getElementById('phone').value,
      status: 'Active'
    };
    
    if (TEACHERS) {
      TEACHERS.push(userData);
      localStorage.setItem('campuscore_teachers', JSON.stringify(TEACHERS));
      success = true;
    }
  }
  
  if (success) {
    showNotification(`${userType.charAt(0).toUpperCase() + userType.slice(1)} registered successfully!`, 'success');
    closeModal('user-registration-modal');
    updateDashboardCounts();
  } else {
    showNotification('Registration failed. Please try again.', 'error');
  }
}

// ─── Bulk Upload Excel Feature ───────────────────────────────────
function showBulkUploadModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'bulk-upload-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Bulk Upload Students</h3>
        <button class="modal-close" onclick="closeModal('bulk-upload-modal')">×</button>
      </div>
      <div class="modal-body">
        <div class="upload-instructions">
          <h4>Instructions:</h4>
          <ul>
            <li>Download the Excel template below</li>
            <li>Fill in student details in the Excel file</li>
            <li>Select the class and section for upload</li>
            <li>Upload the completed Excel file</li>
          </ul>
        </div>
        <div class="form-group">
          <label>Class</label>
          <select id="bulk-class">
            <option value="">Select Class</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </select>
        </div>
        <div class="form-group">
          <label>Section</label>
          <select id="bulk-section">
            <option value="">Select Section</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
            <option value="D">Section D</option>
          </select>
        </div>
        <div class="form-group">
          <label>Excel File</label>
          <input type="file" id="excel-file" accept=".xlsx,.xls" onchange="handleFileSelect(event)">
        </div>
        <div id="file-preview"></div>
      </div>
      <div class="modal-footer">
        <button class="btn-secondary" onclick="downloadTemplate()">Download Template</button>
        <button class="btn-secondary" onclick="closeModal('bulk-upload-modal')">Cancel</button>
        <button class="btn-primary" onclick="processBulkUpload()">Upload Students</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.style.display = 'flex';
}

function downloadTemplate() {
  // Create a simple CSV template
  const csvContent = "Admission Number,Full Name,Roll Number,Gender,Date of Birth,Phone,Email\n" +
                     "3160001,Student Name,01,Male,15-Jan-2012,+91 99999 99999,student@example.com\n" +
                     "3160002,Student Name,02,Female,15-Jan-2012,+91 99999 99999,student@example.com";
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'student_upload_template.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  const preview = document.getElementById('file-preview');
  
  if (file) {
    preview.innerHTML = `
      <div class="file-info">
        <p><strong>Selected File:</strong> ${file.name}</p>
        <p><strong>Size:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
        <p><strong>Type:</strong> ${file.type}</p>
      </div>
    `;
  }
}

function processBulkUpload() {
  const classValue = document.getElementById('bulk-class').value;
  const sectionValue = document.getElementById('bulk-section').value;
  const fileInput = document.getElementById('excel-file');
  
  if (!classValue || !sectionValue) {
    showNotification('Please select class and section', 'error');
    return;
  }
  
  if (!fileInput.files.length) {
    showNotification('Please select an Excel file', 'error');
    return;
  }
  
  // Simulate processing (in real implementation, you'd use a library like SheetJS)
  showNotification('Processing bulk upload...', 'info');
  
  setTimeout(() => {
    // Add sample students (in real implementation, parse Excel file)
    const sampleStudents = [
      {
        id: 'BULK' + Date.now() + '1',
        admNo: 'BULK' + Date.now() + '1',
        name: 'Bulk Student 1',
        class: classValue,
        section: sectionValue,
        roll: '01',
        gender: 'Male',
        dob: '15 Jan 2012',
        attendance: 85,
        behavior: 'Good',
        fee_status: 'Pending',
        gpa: 7.0,
        parent: 'Parent of Bulk Student 1'
      },
      {
        id: 'BULK' + Date.now() + '2',
        admNo: 'BULK' + Date.now() + '2',
        name: 'Bulk Student 2',
        class: classValue,
        section: sectionValue,
        roll: '02',
        gender: 'Female',
        dob: '15 Jan 2012',
        attendance: 88,
        behavior: 'Good',
        fee_status: 'Pending',
        gpa: 7.5,
        parent: 'Parent of Bulk Student 2'
      }
    ];
    
    if (STUDENTS) {
      STUDENTS.push(...sampleStudents);
      localStorage.setItem('campuscore_students', JSON.stringify(STUDENTS));
    }
    
    showNotification(`Successfully uploaded ${sampleStudents.length} students to Class ${classValue}-${sectionValue}!`, 'success');
    closeModal('bulk-upload-modal');
    updateDashboardCounts();
  }, 2000);
}

// ─── User Management with Filters ───────────────────────────────
function showUserManagementModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'user-management-modal';
  modal.innerHTML = `
    <div class="modal-content large">
      <div class="modal-header">
        <h3>User Management</h3>
        <button class="modal-close" onclick="closeModal('user-management-modal')">×</button>
      </div>
      <div class="modal-body">
        <div class="filter-bar">
          <select id="user-filter" onchange="filterUsers()">
            <option value="all">All Users</option>
            <option value="student">Students</option>
            <option value="parent">Parents</option>
            <option value="teacher">Teachers</option>
            <option value="admin">Admin Staff</option>
          </select>
          <input type="text" id="user-search" placeholder="Search users..." oninput="filterUsers()">
          <button class="btn-primary" onclick="showUserRegistrationModal()">Add New User</button>
        </div>
        <div id="users-list" class="users-list"></div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.style.display = 'flex';
  
  loadUsersList();
}

function loadUsersList() {
  const usersList = document.getElementById('users-list');
  if (!usersList) return;
  
  let allUsers = [];
  
  // Add students
  if (STUDENTS) {
    allUsers = allUsers.concat(STUDENTS.map(s => ({...s, type: 'student', displayName: s.name})));
  }
  
  // Add parents
  if (DEMO_USERS) {
    const parents = DEMO_USERS.filter(u => u.role === 'parent');
    allUsers = allUsers.concat(parents.map(p => ({...p, type: 'parent', displayName: p.name})));
  }
  
  // Add teachers
  if (TEACHERS) {
    allUsers = allUsers.concat(TEACHERS.map(t => ({...t, type: 'teacher', displayName: t.name})));
  }
  
  // Add admin staff
  if (DEMO_USERS) {
    const admins = DEMO_USERS.filter(u => ['vice_principal', 'principal', 'coordinator', 'super_admin'].includes(u.role));
    allUsers = allUsers.concat(admins.map(a => ({...a, type: 'admin', displayName: a.name})));
  }
  
  usersList.innerHTML = allUsers.map(user => `
    <div class="user-item" data-type="${user.type}" data-name="${user.displayName.toLowerCase()}">
      <div class="user-info">
        <div class="user-avatar">${getInitials(user.displayName)}</div>
        <div class="user-details">
          <div class="user-name">${user.displayName}</div>
          <div class="user-type">${user.type.charAt(0).toUpperCase() + user.type.slice(1)}</div>
          ${user.class ? `<div class="user-class">Class ${user.class}${user.section ? '-' + user.section : ''}</div>` : ''}
        </div>
      </div>
      <div class="user-actions">
        <button class="btn-sm btn-primary" onclick="editUser('${user.id}', '${user.type}')">Edit</button>
        <button class="btn-sm btn-danger" onclick="removeUser('${user.id}', '${user.type}')">Remove</button>
      </div>
    </div>
  `).join('');
}

function filterUsers() {
  const filterValue = document.getElementById('user-filter').value;
  const searchValue = document.getElementById('user-search').value.toLowerCase();
  const userItems = document.querySelectorAll('.user-item');
  
  userItems.forEach(item => {
    const type = item.getAttribute('data-type');
    const name = item.getAttribute('data-name');
    
    const matchesFilter = filterValue === 'all' || type === filterValue;
    const matchesSearch = name.includes(searchValue);
    
    item.style.display = matchesFilter && matchesSearch ? 'flex' : 'none';
  });
}

function removeUser(userId, userType) {
  if (!confirm(`Are you sure you want to remove this ${userType}?`)) return;
  
  let success = false;
  
  if (userType === 'student' && STUDENTS) {
    const index = STUDENTS.findIndex(s => s.id === userId);
    if (index > -1) {
      STUDENTS.splice(index, 1);
      localStorage.setItem('campuscore_students', JSON.stringify(STUDENTS));
      success = true;
    }
  } else if (userType === 'parent' && DEMO_USERS) {
    const index = DEMO_USERS.findIndex(u => u.id === userId);
    if (index > -1) {
      DEMO_USERS.splice(index, 1);
      localStorage.setItem('campuscore_users', JSON.stringify(DEMO_USERS));
      success = true;
    }
  } else if (userType === 'teacher' && TEACHERS) {
    const index = TEACHERS.findIndex(t => t.id === userId);
    if (index > -1) {
      TEACHERS.splice(index, 1);
      localStorage.setItem('campuscore_teachers', JSON.stringify(TEACHERS));
      success = true;
    }
  }
  
  if (success) {
    showNotification(`${userType.charAt(0).toUpperCase() + userType.slice(1)} removed successfully`, 'success');
    loadUsersList();
    updateDashboardCounts();
  } else {
    showNotification('Failed to remove user', 'error');
  }
}

function editUser(userId, userType) {
  showNotification(`Edit functionality for ${userType} will be implemented soon`, 'info');
}

// ─── Attendance System ───────────────────────────────────────────
function showAttendanceModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'attendance-modal';
  modal.innerHTML = `
    <div class="modal-content large">
      <div class="modal-header">
        <h3>Mark Attendance</h3>
        <button class="modal-close" onclick="closeModal('attendance-modal')">×</button>
      </div>
      <div class="modal-body">
        <div class="filter-bar">
          <select id="attendance-class" onchange="loadAttendanceList()">
            <option value="">Select Class</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </select>
          <select id="attendance-section" onchange="loadAttendanceList()">
            <option value="">Select Section</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
            <option value="D">Section D</option>
          </select>
          <input type="date" id="attendance-date" value="${new Date().toISOString().split('T')[0]}">
          <button class="btn-primary" onclick="saveAttendance()">Save Attendance</button>
        </div>
        <div id="attendance-list" class="attendance-list"></div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.style.display = 'flex';
}

function loadAttendanceList() {
  const classValue = document.getElementById('attendance-class').value;
  const sectionValue = document.getElementById('attendance-section').value;
  const attendanceList = document.getElementById('attendance-list');
  
  if (!classValue || !sectionValue || !attendanceList) return;
  
  const classSection = classValue + '-' + sectionValue;
  const students = STUDENTS ? STUDENTS.filter(s => s.class === classValue && (s.section || '') === sectionValue) : [];
  
  attendanceList.innerHTML = students.map(student => `
    <div class="attendance-item">
      <div class="student-info">
        <span class="student-name">${student.name}</span>
        <span class="student-roll">Roll ${student.roll}</span>
      </div>
      <div class="attendance-options">
        <label>
          <input type="radio" name="attendance-${student.id}" value="present" ${student.attendance >= 95 ? 'checked' : ''}>
          Present
        </label>
        <label>
          <input type="radio" name="attendance-${student.id}" value="late" ${student.attendance >= 85 && student.attendance < 95 ? 'checked' : ''}>
          Late
        </label>
        <label>
          <input type="radio" name="attendance-${student.id}" value="absent" ${student.attendance < 85 ? 'checked' : ''}>
          Absent
        </label>
      </div>
    </div>
  `).join('');
}

function saveAttendance() {
  const classValue = document.getElementById('attendance-class').value;
  const sectionValue = document.getElementById('attendance-section').value;
  const dateValue = document.getElementById('attendance-date').value;
  
  if (!classValue || !sectionValue) {
    showNotification('Please select class and section', 'error');
    return;
  }
  
  const classSection = classValue + '-' + sectionValue;
  const students = STUDENTS ? STUDENTS.filter(s => s.class === classValue && (s.section || '') === sectionValue) : [];
  
  students.forEach(student => {
    const attendanceInput = document.querySelector(`input[name="attendance-${student.id}"]:checked`);
    if (attendanceInput) {
      const status = attendanceInput.value;
      if (status === 'present') student.attendance = 95;
      else if (status === 'late') student.attendance = 85;
      else student.attendance = 75;
    }
  });
  
  if (STUDENTS) {
    localStorage.setItem('campuscore_students', JSON.stringify(STUDENTS));
    showNotification('Attendance saved successfully!', 'success');
    closeModal('attendance-modal');
    updateDashboardCounts();
  }
}

// ─── Utility Functions ───────────────────────────────────────────
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.remove();
  }
}

function updateDashboardCounts() {
  if (typeof updateVPDashboardCounts === 'function') {
    updateVPDashboardCounts();
  }
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 5px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  
  const colors = {
    success: '#4caf50',
    error: '#f44336',
    info: '#2196f3',
    warning: '#ff9800'
  };
  
  notification.style.backgroundColor = colors[type] || colors.info;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ─── Add Admin Buttons to Navigation ───────────────────────────────
function addAdminButtons() {
  if (!currentUser) return;
  
  const adminRoles = ['vice_principal', 'principal', 'super_admin', 'coordinator'];
  if (!adminRoles.includes(currentUser.role)) return;
  
  // Add admin buttons to appropriate sections
  setTimeout(() => {
    const studentsSection = document.getElementById('section-students');
    if (studentsSection) {
      const adminButtons = document.createElement('div');
      adminButtons.className = 'admin-actions';
      adminButtons.innerHTML = `
        <div class="admin-buttons">
          <button class="btn-primary" onclick="showUserRegistrationModal()">Register User</button>
          <button class="btn-primary" onclick="showBulkUploadModal()">Bulk Upload</button>
          <button class="btn-primary" onclick="showUserManagementModal()">Manage Users</button>
          <button class="btn-primary" onclick="showAttendanceModal()">Mark Attendance</button>
        </div>
      `;
      studentsSection.insertBefore(adminButtons, studentsSection.firstChild);
    }
  }, 1000);
}

// ─── Initialize Admin Features ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    addAdminButtons();
  }, 2000);
});

// Export functions for global use
window.showUserRegistrationModal = showUserRegistrationModal;
window.showBulkUploadModal = showBulkUploadModal;
window.showUserManagementModal = showUserManagementModal;
window.showAttendanceModal = showAttendanceModal;
window.registerUser = registerUser;
window.updateUserForm = updateUserForm;
window.downloadTemplate = downloadTemplate;
window.handleFileSelect = handleFileSelect;
window.processBulkUpload = processBulkUpload;
window.loadUsersList = loadUsersList;
window.filterUsers = filterUsers;
window.removeUser = removeUser;
window.editUser = editUser;
window.loadAttendanceList = loadAttendanceList;
window.saveAttendance = saveAttendance;
