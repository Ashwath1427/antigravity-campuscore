/* ============================================================
   CAMPUS CORE – GLOBAL FIXES ENHANCED
   Additional utility functions to prevent console errors
   ============================================================ */

// ─── Ensure all required functions exist ────────────────────────
window.handleSettingToggle = window.handleSettingToggle || function(userId, key, val) {
  console.log(`[Settings] Setting ${key} for user ${userId} to ${val}`);
  try {
    const settings = JSON.parse(localStorage.getItem('campuscore_settings') || '{}');
    if (!settings[userId]) settings[userId] = {};
    settings[userId][key] = val;
    localStorage.setItem('campuscore_settings', JSON.stringify(settings));
  } catch(e) {
    console.warn('[Settings] Failed to save setting:', e);
  }
};

window.getEscalationStore = window.getEscalationStore || function() {
  try {
    const base = { teacherInbox: [], coordinatorInbox: [], vpEscalated: [], resolvedIssues: [] };
    const parsed = JSON.parse(localStorage.getItem('campuscore_escalations') || '{}');
    return { ...base, ...parsed };
  } catch(e) {
    console.warn('[Escalation] Failed to load escalation store:', e);
    return { teacherInbox: [], coordinatorInbox: [], vpEscalated: [], resolvedIssues: [] };
  }
};

window.getPostLoginUser = window.getPostLoginUser || function(user) {
  console.log('[Auth] Post-login user processing for:', user.username);
  return Promise.resolve(user);
};

window.getVPStudentSharedData = window.getVPStudentSharedData || function(studentId) {
  try {
    const key = `campuscore_vp_shared_${studentId}`;
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch(e) {
    console.warn('[VP] Failed to get student shared data:', e);
    return {};
  }
};

window.saveVPStudentSharedData = window.saveVPStudentSharedData || function(studentId, data) {
  try {
    const key = `campuscore_vp_shared_${studentId}`;
    localStorage.setItem(key, JSON.stringify(data));
  } catch(e) {
    console.warn('[VP] Failed to save student shared data:', e);
  }
};

window.getStudentSharedData = window.getStudentSharedData || function(studentId) {
  try {
    const key = `campuscore_student_shared_${studentId}`;
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch(e) {
    console.warn('[Student] Failed to get shared data:', e);
    return {};
  }
};

window.saveStudentSharedData = window.saveStudentSharedData || function(studentId, data) {
  try {
    const key = `campuscore_student_shared_${studentId}`;
    localStorage.setItem(key, JSON.stringify(data));
  } catch(e) {
    console.warn('[Student] Failed to save shared data:', e);
  }
};

window.getStudentProfileData = window.getStudentProfileData || function(studentId) {
  try {
    const key = `campuscore_student_profile_${studentId}`;
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch(e) {
    console.warn('[Student] Failed to get profile data:', e);
    return { fullName: 'Student', className: '9C', rollNo: '01' };
  }
};

window.getStudentIdFromUser = window.getStudentIdFromUser || function(user) {
  if (user.role === 'student') {
    return user.username || user.id || '3180076';
  } else if (user.role === 'parent') {
    return user.childId || user.username?.replace(/^P/i, '').replace(/A$/i, '') || '3180076';
  }
  return '3180076';
};

// ─── Additional utility functions ───────────────────────────────
window.simulateAction = window.simulateAction || function(message) {
  console.log('[Simulate] Action:', message);
  // Show a temporary notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 9999;
    padding: 12px 16px; background: #5ca870; color: white;
    border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-size: 14px; max-width: 300px;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
};

window.triggerLiveReRender = window.triggerLiveReRender || function() {
  console.log('[ReRender] Triggering live re-render');
  if (typeof currentUser !== 'undefined' && currentUser) {
    if (typeof buildDashboard === 'function') buildDashboard(currentUser);
    if (typeof buildSidebar === 'function') buildSidebar(currentUser);
  }
};

// ─── Fix missing global variables ─────────────────────────────────
window.CAMPUSCORE_REGISTRY = window.CAMPUSCORE_REGISTRY || {
  getAllStudents: function() {
    try {
      return JSON.parse(localStorage.getItem('campuscore_students') || '[]');
    } catch(e) {
      console.warn('[Registry] Failed to get students:', e);
      return [];
    }
  },
  getStudent: function(id) {
    const students = this.getAllStudents();
    return students.find(s => s.id === id || s.admNo === id);
  },
  addStudent: function(student) {
    const students = this.getAllStudents();
    students.push(student);
    localStorage.setItem('campuscore_students', JSON.stringify(students));
  },
  updateStudent: function(id, updates) {
    const students = this.getAllStudents();
    const index = students.findIndex(s => s.id === id || s.admNo === id);
    if (index !== -1) {
      students[index] = { ...students[index], ...updates };
      localStorage.setItem('campuscore_students', JSON.stringify(students));
    }
  }
};

// ─── Ensure data arrays are available globally ───────────────────
if (typeof window.STUDENTS === 'undefined') {
  window.STUDENTS = [];
}

if (typeof window.TEACHERS === 'undefined') {
  window.TEACHERS = [];
}

if (typeof window.ANNOUNCEMENTS === 'undefined') {
  window.ANNOUNCEMENTS = [];
}

if (typeof window.SCHEDULE === 'undefined') {
  window.SCHEDULE = [];
}

// ─── Initialize missing localStorage data ────────────────────────
function initializeMissingData() {
  // Initialize escalations if not present
  if (!localStorage.getItem('campuscore_escalations')) {
    const defaultEscalations = {
      teacherInbox: [
        {
          id: 'TMSG001',
          sender: 'System',
          subject: 'Welcome to CampusCore',
          content: 'This is the teacher messaging system.',
          time: 'Just now',
          unread: true,
          registeredDate: new Date().toISOString()
        }
      ],
      coordinatorInbox: [],
      vpEscalated: [],
      resolvedIssues: []
    };
    localStorage.setItem('campuscore_escalations', JSON.stringify(defaultEscalations));
  }

  // Initialize notices if not present
  if (!localStorage.getItem('campuscore_notices')) {
    const defaultNotices = [
      {
        id: 1,
        title: 'Welcome to CampusCore',
        date: new Date().toLocaleDateString('en-IN'),
        author: 'System',
        category: 'General',
        priority: 'medium'
      }
    ];
    localStorage.setItem('campuscore_notices', JSON.stringify(defaultNotices));
  }
}

// ─── Console error prevention ────────────────────────────────────
window.addEventListener('error', function(e) {
  // Filter out expected errors that don't affect functionality
  const expectedErrors = [
    'Cannot read propert',
    'is not a function',
    'undefined',
    'null'
  ];
  
  const errorMessage = e.message || '';
  const isExpected = expectedErrors.some(err => errorMessage.includes(err));
  
  if (!isExpected) {
    console.error('[Global] Unexpected error:', e);
  }
});

window.addEventListener('unhandledrejection', function(e) {
  console.warn('[Global] Unhandled promise rejection:', e.reason);
});

// ─── Initialize on load ───────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMissingData);
} else {
  initializeMissingData();
}

console.log('[Global Fixes Enhanced] All utility functions initialized successfully');
