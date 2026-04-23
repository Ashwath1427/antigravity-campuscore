import re

dash_path = "C:/Users/Kasula Santhosh/OneDrive/Desktop/REVISED ANTIGRAVITY CAMPUSCORE/js/dashboard.js"
with open(dash_path, "r", encoding="utf-8") as f:
    content = f.read()

# We look for the final `else` block in buildDashboard.
old_block = """  } else if (user.role === 'student') {
    c.innerHTML = buildStudentDashboard(user);
  } else {
    c.innerHTML = [
      buildHome(user), buildProfile(user), buildStudents(user),
      buildTeachers(user), buildSchedule(user), buildAttendance(user),
      buildHomework(user), buildResults(user), buildFees(user),
      buildAnnouncements(user), buildEvents(user), buildSettings(user),
    ].join('');
  }"""

new_block = """  } else if (user.role === 'student') {
    c.innerHTML = buildStudentDashboard(user);
  } else if (user.role === 'principal' || String(user.username||'').toUpperCase() === 'PRIN001') {
    // Audit fix: Principal blank pages (Attendance Reports, Exam Results, Class Performance, Approvals, Notices, Events, Messages)
    c.innerHTML = [
      buildHome(user).replace('id="section-home"', 'id="section-home"'), 
      buildProfile(user),
      buildVPAttendance(user).replace('id="section-vp_attendance"', 'id="section-attendance_reports"'),
      buildVPExams(user).replace('id="section-vp_exams"', 'id="section-exam_results"'),
      buildVPClassPerf(user).replace('id="section-vp_class_perf"', 'id="section-class_performance"'),
      buildVPApprovals(user).replace('id="section-vp_approvals"', 'id="section-approvals"'),
      buildAnnouncements(user).replace('id="section-announcements"', 'id="section-announcements"'),
      buildAnnouncements(user).replace('id="section-announcements"', 'id="section-notices"'), // Fallback
      buildEvents(user).replace('id="section-events"', 'id="section-events"'),
      buildVPMessages(user).replace('id="section-vp_messages"', 'id="section-messages"'),
      buildSettings(user)
    ].join('');
  } else if (user.role === 'apaaas' || String(user.username||'').toUpperCase() === 'APAAAS' || user.role === 'superadmin') {
    // Audit fix: APAAAS blank pages (Master Dashboard, All Issues, All Notices, All Approvals, All Attendance, All Results, All Messages, Role Views)
    c.innerHTML = [
      buildHome(user).replace('id="section-home"', 'id="section-master_dashboard"'),
      (typeof buildVPStudentIssues === 'function' ? buildVPStudentIssues(user).replace('id="section-vp_student_issues"', 'id="section-all_issues"') : '<div class="dash-section" id="section-all_issues"><h2>All Issues</h2></div>'),
      buildAnnouncements(user).replace('id="section-announcements"', 'id="section-all_notices"'),
      (typeof buildVPApprovals === 'function' ? buildVPApprovals(user).replace('id="section-vp_approvals"', 'id="section-all_approvals"') : '<div class="dash-section" id="section-all_approvals"><h2>All Approvals</h2></div>'),
      buildVPAttendance(user).replace('id="section-vp_attendance"', 'id="section-all_attendance"'),
      buildVPExams(user).replace('id="section-vp_exams"', 'id="section-all_results"'),
      buildVPMessages(user).replace('id="section-vp_messages"', 'id="section-all_messages"'),
      '<div class="dash-section" id="section-role_views"><div class="card"><h3>SuperAdmin Role Views</h3><p>Manage access control and role simulation options here.</p></div></div>',
      buildSettings(user)
    ].join('');
  } else {
    c.innerHTML = [
      buildHome(user), buildProfile(user), buildStudents(user),
      buildTeachers(user), buildSchedule(user), buildAttendance(user),
      buildHomework(user), buildResults(user), buildFees(user),
      buildAnnouncements(user), buildEvents(user), buildSettings(user),
    ].join('');
  }"""

if old_block in content:
    content = content.replace(old_block, new_block)
    # Write back
    with open(dash_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully patched dashboard.js for Principal and APAAAS roles!")
else:
    print("Could not find the target block in dashboard.js. Try matching exactly.")
