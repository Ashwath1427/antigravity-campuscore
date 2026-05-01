/* ============================================================
   CAMPUS CORE – FUNCTIONAL FIXES
   Replaces simulateAction calls with actual functionality
   ============================================================ */

// ─── Real Action Replacements ───────────────────────────────────
window.realAction = window.realAction || function(action, data = {}) {
  console.log('[Real Action]', action, data);
  
  switch(action) {
    case 'saveTimetable':
      return saveTimetableChanges(data);
    case 'approveRequest':
      return approveRequest(data);
    case 'rejectRequest':
      return rejectRequest(data);
    case 'archiveNotice':
      return archiveNotice(data);
    case 'restoreNotice':
      return restoreNotice(data);
    case 'deleteNotice':
      return deleteNotice(data);
    case 'promoteStudent':
      return promoteStudent(data);
    case 'suspendStudent':
      return suspendStudent(data);
    case 'resolveIssue':
      return resolveIssue(data);
    case 'escalateIssue':
      return escalateIssue(data);
    case 'scheduleMeeting':
      return scheduleMeeting(data);
    case 'submitConcern':
      return submitConcern(data);
    case 'updateProfile':
      return updateProfile(data);
    case 'changePassword':
      return changePassword(data);
    case 'uploadDocument':
      return uploadDocument(data);
    case 'createAnnouncement':
      return createAnnouncement(data);
    case 'sendBroadcast':
      return sendBroadcast(data);
    case 'markAttendance':
      return markAttendance(data);
    case 'enterMarks':
      return enterMarks(data);
    case 'createHomework':
      return createHomeworkAssignment(data);
    default:
      console.warn('[Real Action] Unknown action:', action);
      return false;
  }
};

// ─── Timetable Management ───────────────────────────────────────
function saveTimetableChanges(data) {
  try {
    // Get current timetable from localStorage
    let timetable = JSON.parse(localStorage.getItem('campuscore_timetable') || '[]');
    
    // Apply changes (this would normally come from the form data)
    const changes = data.changes || [];
    changes.forEach(change => {
      const index = timetable.findIndex(t => t.time === change.time && t.class === change.class);
      if (index !== -1) {
        timetable[index] = { ...timetable[index], ...change };
      } else {
        timetable.push(change);
      }
    });
    
    localStorage.setItem('campuscore_timetable', JSON.stringify(timetable));
    showNotification('Timetable saved successfully', 'success');
    return true;
  } catch(e) {
    console.error('[Timetable] Save failed:', e);
    showNotification('Failed to save timetable', 'error');
    return false;
  }
}

// ─── Request Management ─────────────────────────────────────────
function approveRequest(data) {
  try {
    const requestId = data.id;
    let requests = JSON.parse(localStorage.getItem('campuscore_requests') || '[]');
    const request = requests.find(r => r.id === requestId);
    
    if (request) {
      request.status = 'Approved';
      request.approvedBy = currentUser.name;
      request.approvedDate = new Date().toISOString();
      localStorage.setItem('campuscore_requests', JSON.stringify(requests));
      showNotification('Request approved successfully', 'success');
      return true;
    } else {
      showNotification('Request not found', 'error');
      return false;
    }
  } catch(e) {
    console.error('[Request] Approval failed:', e);
    showNotification('Failed to approve request', 'error');
    return false;
  }
}

function rejectRequest(data) {
  try {
    const requestId = data.id;
    let requests = JSON.parse(localStorage.getItem('campuscore_requests') || '[]');
    const request = requests.find(r => r.id === requestId);
    
    if (request) {
      request.status = 'Rejected';
      request.rejectedBy = currentUser.name;
      request.rejectedDate = new Date().toISOString();
      localStorage.setItem('campuscore_requests', JSON.stringify(requests));
      showNotification('Request rejected', 'info');
      return true;
    } else {
      showNotification('Request not found', 'error');
      return false;
    }
  } catch(e) {
    console.error('[Request] Rejection failed:', e);
    showNotification('Failed to reject request', 'error');
    return false;
  }
}

// ─── Notice Management ───────────────────────────────────────────
function archiveNotice(data) {
  try {
    const noticeId = data.id;
    let notices = JSON.parse(localStorage.getItem('campuscore_notices') || '{}');
    
    if (notices.active && notices.active.length > 0) {
      const index = notices.active.findIndex(n => n.id === noticeId);
      if (index !== -1) {
        const notice = notices.active.splice(index, 1)[0];
        notice.archivedDate = new Date().toISOString();
        
        if (!notices.archived) notices.archived = [];
        notices.archived.push(notice);
        
        localStorage.setItem('campuscore_notices', JSON.stringify(notices));
        showNotification('Notice archived successfully', 'success');
        
        // Refresh the notices display
        if (typeof wfmRenderNoticesTabs === 'function') {
          wfmRenderNoticesTabs();
        }
        return true;
      }
    }
    showNotification('Notice not found', 'error');
    return false;
  } catch(e) {
    console.error('[Notice] Archive failed:', e);
    showNotification('Failed to archive notice', 'error');
    return false;
  }
}

function restoreNotice(data) {
  try {
    const noticeId = data.id;
    let notices = JSON.parse(localStorage.getItem('campuscore_notices') || '{}');
    
    if (notices.archived && notices.archived.length > 0) {
      const index = notices.archived.findIndex(n => n.id === noticeId);
      if (index !== -1) {
        const notice = notices.archived.splice(index, 1)[0];
        delete notice.archivedDate;
        
        if (!notices.active) notices.active = [];
        notices.active.push(notice);
        
        localStorage.setItem('campuscore_notices', JSON.stringify(notices));
        showNotification('Notice restored successfully', 'success');
        
        // Refresh the notices display
        if (typeof wfmRenderNoticesTabs === 'function') {
          wfmRenderNoticesTabs();
        }
        return true;
      }
    }
    showNotification('Notice not found', 'error');
    return false;
  } catch(e) {
    console.error('[Notice] Restore failed:', e);
    showNotification('Failed to restore notice', 'error');
    return false;
  }
}

function deleteNotice(data) {
  try {
    const noticeId = data.id;
    let notices = JSON.parse(localStorage.getItem('campuscore_notices') || '{}');
    
    // Check both active and archived
    ['active', 'archived'].forEach(type => {
      if (notices[type] && notices[type].length > 0) {
        const index = notices[type].findIndex(n => n.id === noticeId);
        if (index !== -1) {
          notices[type].splice(index, 1);
          localStorage.setItem('campuscore_notices', JSON.stringify(notices));
          showNotification('Notice deleted permanently', 'success');
          
          // Refresh the notices display
          if (typeof wfmRenderNoticesTabs === 'function') {
            wfmRenderNoticesTabs();
          }
          return true;
        }
      }
    });
    
    showNotification('Notice not found', 'error');
    return false;
  } catch(e) {
    console.error('[Notice] Delete failed:', e);
    showNotification('Failed to delete notice', 'error');
    return false;
  }
}

// ─── Student Management ─────────────────────────────────────────
function promoteStudent(data) {
  try {
    const studentId = data.id;
    const newClass = data.toClass || '10-C';
    
    // Update student in registry
    if (window.CAMPUSCORE_REGISTRY) {
      const student = window.CAMPUSCORE_REGISTRY.getStudent(studentId);
      if (student) {
        window.CAMPUSCORE_REGISTRY.updateStudent(studentId, {
          class: newClass,
          promoted: true,
          promotedDate: new Date().toISOString(),
          promotedBy: currentUser.name
        });
        
        // Update shared data
        const sharedData = window.getVPStudentSharedData ? window.getVPStudentSharedData(studentId) : {};
        sharedData.currentClass = newClass.split('')[0];
        sharedData.currentSection = newClass.split('')[1] + newClass.split('')[2];
        if (window.saveVPStudentSharedData) {
          window.saveVPStudentSharedData(studentId, sharedData);
        }
        
        showNotification(`Student promoted to ${newClass}`, 'success');
        return true;
      }
    }
    
    showNotification('Student not found', 'error');
    return false;
  } catch(e) {
    console.error('[Student] Promotion failed:', e);
    showNotification('Failed to promote student', 'error');
    return false;
  }
}

function suspendStudent(data) {
  try {
    const studentId = data.id;
    const reason = data.reason || 'Disciplinary action';
    
    // Update student in registry
    if (window.CAMPUSCORE_REGISTRY) {
      const student = window.CAMPUSCORE_REGISTRY.getStudent(studentId);
      if (student) {
        window.CAMPUSCORE_REGISTRY.updateStudent(studentId, {
          status: 'Suspended',
          suspensionReason: reason,
          suspendedDate: new Date().toISOString(),
          suspendedBy: currentUser.name
        });
        
        showNotification('Student suspended successfully', 'warning');
        return true;
      }
    }
    
    showNotification('Student not found', 'error');
    return false;
  } catch(e) {
    console.error('[Student] Suspension failed:', e);
    showNotification('Failed to suspend student', 'error');
    return false;
  }
}

// ─── Issue Management ───────────────────────────────────────────
function resolveIssue(data) {
  try {
    const issueId = data.id;
    let issues = JSON.parse(localStorage.getItem('campuscore_issues') || '[]');
    const issue = issues.find(i => i.id === issueId);
    
    if (issue) {
      issue.status = 'Resolved';
      issue.resolvedBy = currentUser.name;
      issue.resolvedDate = new Date().toISOString();
      issue.resolution = data.resolution || 'Issue resolved';
      
      localStorage.setItem('campuscore_issues', JSON.stringify(issues));
      showNotification('Issue resolved successfully', 'success');
      
      // Refresh issues display
      if (typeof renderVPStudentIssuesTabs === 'function') {
        renderVPStudentIssuesTabs();
      }
      return true;
    } else {
      showNotification('Issue not found', 'error');
      return false;
    }
  } catch(e) {
    console.error('[Issue] Resolution failed:', e);
    showNotification('Failed to resolve issue', 'error');
    return false;
  }
}

function escalateIssue(data) {
  try {
    const issueId = data.id;
    const toLevel = data.toLevel || 'VP';
    let issues = JSON.parse(localStorage.getItem('campuscore_issues') || '[]');
    const issue = issues.find(i => i.id === issueId);
    
    if (issue) {
      issue.stage = toLevel;
      issue.escalatedBy = currentUser.name;
      issue.escalatedDate = new Date().toISOString();
      issue.escalationReason = data.reason || 'Escalated for review';
      
      localStorage.setItem('campuscore_issues', JSON.stringify(issues));
      showNotification(`Issue escalated to ${toLevel}`, 'info');
      
      // Refresh issues display
      if (typeof renderVPStudentIssuesTabs === 'function') {
        renderVPStudentIssuesTabs();
      }
      return true;
    } else {
      showNotification('Issue not found', 'error');
      return false;
    }
  } catch(e) {
    console.error('[Issue] Escalation failed:', e);
    showNotification('Failed to escalate issue', 'error');
    return false;
  }
}

// ─── Meeting Management ─────────────────────────────────────────
function scheduleMeeting(data) {
  try {
    const meeting = {
      id: 'MTG' + Date.now(),
      title: data.title || 'Parent-Teacher Meeting',
      date: data.date || new Date().toLocaleDateString('en-IN'),
      time: data.time || '10:00 AM',
      participants: data.participants || [],
      agenda: data.agenda || '',
      scheduledBy: currentUser.name,
      scheduledDate: new Date().toISOString()
    };
    
    let meetings = JSON.parse(localStorage.getItem('campuscore_meetings') || '[]');
    meetings.push(meeting);
    localStorage.setItem('campuscore_meetings', JSON.stringify(meetings));
    
    showNotification('Meeting scheduled successfully', 'success');
    return true;
  } catch(e) {
    console.error('[Meeting] Scheduling failed:', e);
    showNotification('Failed to schedule meeting', 'error');
    return false;
  }
}

// ─── Concern Management ─────────────────────────────────────────
function submitConcern(data) {
  try {
    const concern = {
      id: 'CON' + Date.now(),
      studentName: data.studentName || '',
      studentId: data.studentId || '',
      class: data.class || '',
      concern: data.concern || '',
      submittedBy: currentUser.name,
      submittedDate: new Date().toISOString(),
      status: 'Submitted',
      stage: 'Teacher'
    };
    
    let concerns = JSON.parse(localStorage.getItem('campuscore_concerns') || '[]');
    concerns.push(concern);
    localStorage.setItem('campuscore_concerns', JSON.stringify(concerns));
    
    showNotification('Concern submitted successfully', 'success');
    return true;
  } catch(e) {
    console.error('[Concern] Submission failed:', e);
    showNotification('Failed to submit concern', 'error');
    return false;
  }
}

// ─── Profile Management ─────────────────────────────────────────
function updateProfile(data) {
  try {
    if (currentUser) {
      currentUser.name = data.name || currentUser.name;
      currentUser.email = data.email || currentUser.email;
      currentUser.phone = data.phone || currentUser.phone;
      
      // Save to session
      try { sessionStorage.setItem('cc_user', JSON.stringify(currentUser)); } catch(e) {}
      
      // Save to localStorage
      const profileKey = `campuscore_profile_${currentUser.username}`;
      localStorage.setItem(profileKey, JSON.stringify({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone
      }));
      
      showNotification('Profile updated successfully', 'success');
      
      // Refresh UI
      if (typeof buildSidebar === 'function') {
        buildSidebar(currentUser);
      }
      return true;
    } else {
      showNotification('No user logged in', 'error');
      return false;
    }
  } catch(e) {
    console.error('[Profile] Update failed:', e);
    showNotification('Failed to update profile', 'error');
    return false;
  }
}

function changePassword(data) {
  try {
    const currentPassword = data.currentPassword;
    const newPassword = data.newPassword;
    
    if (!currentUser) {
      showNotification('No user logged in', 'error');
      return false;
    }
    
    // In a real implementation, this would verify current password and update in database
    // For demo, we'll just save to localStorage
    const passwordKey = `campuscore_password_${currentUser.username}`;
    localStorage.setItem(passwordKey, newPassword);
    
    showNotification('Password changed successfully', 'success');
    return true;
  } catch(e) {
    console.error('[Password] Change failed:', e);
    showNotification('Failed to change password', 'error');
    return false;
  }
}

// ─── Document Management ───────────────────────────────────────
function uploadDocument(data) {
  try {
    const document = {
      id: 'DOC' + Date.now(),
      title: data.title || '',
      class: data.class || '',
      subject: data.subject || '',
      type: data.type || 'Document',
      date: new Date().toLocaleDateString('en-IN'),
      author: currentUser.name,
      fileUrl: data.fileUrl || '#',
      uploadedDate: new Date().toISOString()
    };
    
    let documents = JSON.parse(localStorage.getItem('campuscore_documents') || '[]');
    documents.push(document);
    localStorage.setItem('campuscore_documents', JSON.stringify(documents));
    
    showNotification('Document uploaded successfully', 'success');
    return true;
  } catch(e) {
    console.error('[Document] Upload failed:', e);
    showNotification('Failed to upload document', 'error');
    return false;
  }
}

// ─── Announcement Management ───────────────────────────────────
function createAnnouncement(data) {
  try {
    const announcement = {
      id: Date.now(),
      title: data.title || '',
      content: data.content || '',
      date: new Date().toLocaleDateString('en-IN'),
      author: (window.currentUser && window.currentUser.name) ? window.currentUser.name : 'System',
      category: data.category || 'General',
      priority: data.priority || 'medium',
      target: data.target || 'All',
      createdDate: new Date().toISOString()
    };
    
    let noticesData = localStorage.getItem('campuscore_notices');
    let notices = {};
    
    try {
      notices = JSON.parse(noticesData || '{}');
      // Handle legacy array format
      if (Array.isArray(notices)) {
        notices = { active: notices, archived: [] };
      }
    } catch(e) {
      notices = { active: [], archived: [] };
    }
    
    if (!notices.active) notices.active = [];
    notices.active.unshift(announcement);
    localStorage.setItem('campuscore_notices', JSON.stringify(notices));
    
    showNotification('Announcement created successfully', 'success');
    
    // Refresh notices display
    if (typeof wfmRenderNoticesTabs === 'function') {
      wfmRenderNoticesTabs();
    }
    return true;
  } catch(e) {
    console.error('[Announcement] Creation failed:', e);
    showNotification('Failed to create announcement', 'error');
    return false;
  }
}

// ─── Broadcast Management ───────────────────────────────────────
function sendBroadcast(data) {
  try {
    const broadcast = {
      id: 'BC' + Date.now(),
      message: data.message || '',
      audience: data.audience || 'All Staff',
      sentBy: currentUser.name,
      sentDate: new Date().toISOString(),
      status: 'Sent'
    };
    
    let broadcasts = JSON.parse(localStorage.getItem('campuscore_broadcasts') || '[]');
    broadcasts.push(broadcast);
    localStorage.setItem('campuscore_broadcasts', JSON.stringify(broadcasts));
    
    showNotification('Broadcast sent successfully', 'success');
    return true;
  } catch(e) {
    console.error('[Broadcast] Send failed:', e);
    showNotification('Failed to send broadcast', 'error');
    return false;
  }
}

// ─── Attendance Management ───────────────────────────────────
function markAttendance(data) {
  try {
    const attendance = {
      class: data.class || '',
      date: data.date || new Date().toLocaleDateString('en-IN'),
      markedBy: currentUser.name,
      markedDate: new Date().toISOString(),
      records: data.records || []
    };
    
    let attendanceRecords = JSON.parse(localStorage.getItem('campuscore_attendance') || '[]');
    attendanceRecords.push(attendance);
    localStorage.setItem('campuscore_attendance', JSON.stringify(attendanceRecords));
    
    showNotification('Attendance marked successfully', 'success');
    return true;
  } catch(e) {
    console.error('[Attendance] Marking failed:', e);
    showNotification('Failed to mark attendance', 'error');
    return false;
  }
}

// ─── Marks Management ─────────────────────────────────────────
function enterMarks(data) {
  try {
    const marksEntry = {
      exam: data.exam || '',
      class: data.class || '',
      subject: data.subject || '',
      enteredBy: currentUser.name,
      enteredDate: new Date().toISOString(),
      marks: data.marks || []
    };
    
    let marksRecords = JSON.parse(localStorage.getItem('campuscore_marks') || '[]');
    marksRecords.push(marksEntry);
    localStorage.setItem('campuscore_marks', JSON.stringify(marksRecords));
    
    showNotification('Marks entered successfully', 'success');
    return true;
  } catch(e) {
    console.error('[Marks] Entry failed:', e);
    showNotification('Failed to enter marks', 'error');
    return false;
  }
}

// ─── Homework Management ───────────────────────────────────────
function createHomeworkAssignment(data) {
  try {
    const homework = {
      id: 'HW' + Date.now(),
      title: data.title || '',
      class: data.class || '',
      subject: data.subject || '',
      dueDate: data.dueDate || '',
      instructions: data.instructions || '',
      assignedBy: currentUser.name,
      assignedDate: new Date().toISOString(),
      status: 'Active'
    };
    
    let homeworkRecords = JSON.parse(localStorage.getItem('campuscore_homework') || '[]');
    homeworkRecords.push(homework);
    localStorage.setItem('campuscore_homework', JSON.stringify(homeworkRecords));
    
    showNotification('Homework assignment created', 'success');
    return true;
  } catch(e) {
    console.error('[Homework] Creation failed:', e);
    showNotification('Failed to create homework', 'error');
    return false;
  }
}

// ─── Utility Functions ───────────────────────────────────────────
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 9999;
    padding: 16px 20px; border-radius: 8px; color: white;
    font-size: 14px; max-width: 300px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideIn 0.3s ease-out;
  `;
  
  const colors = {
    success: '#5ca870',
    error: '#d32f2f',
    warning: '#f57c00',
    info: '#1976d2'
  };
  
  notification.style.background = colors[type] || colors.info;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

console.log('[Functional Fixes] All real action functions loaded successfully');
