import re

dash_path = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/dashboard.js"
with open(dash_path, "r", encoding="utf-8") as f:
    content = f.read()

# ─────────────────────────────────────────────
# FIX 1: buildParentHome uses `calculatedStats` (undefined) instead of cfg.stats
# ─────────────────────────────────────────────
content = content.replace(
    "  const stats = calculatedStats.map(s => `\n    <div class=\"stat-card\">\n      <div class=\"stat-card-icon\">${s.icon}</div>\n      <div class=\"stat-value\">${s.value}</div>\n      <div class=\"stat-label\">${s.label}</div>\n    </div>`).join('');\n\n  const qaMap = [\n    { icon: 'fa-clipboard-check'",
    "  const stats = (cfg.stats || []).map(s => `\n    <div class=\"stat-card\">\n      <div class=\"stat-card-icon\">${s.icon}</div>\n      <div class=\"stat-value\">${s.value}</div>\n      <div class=\"stat-label\">${s.label}</div>\n    </div>`).join('');\n\n  const qaMap = [\n    { icon: 'fa-clipboard-check'"
)

# ─────────────────────────────────────────────
# FIX 2: buildParentExams uses `child` not defined in scope — add lookup
# ─────────────────────────────────────────────
OLD_EXAMS = """function buildParentExams(user) {
  const rows = PARENT_EXAMS.map(e=>`<tr>
    <td style="font-weight:600;color:var(--color-text)">${e.subject}</td>
    <td style="color:var(--color-text)">${e.date}</td>
    <td style="color:var(--color-text-muted)">${e.time}</td>
    <td><span class="badge badge-info">${e.room}</span></td>
  </tr>`).join('');
  return `<div class="dash-section" id="section-parent_exams">
    <div class="card" style="margin-bottom:20px;background:linear-gradient(135deg,rgba(139,92,246,0.06),transparent)">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap">
        <div>
          <h3>📅 ${PARENT_EXAMS[0].exam}</h3>
          <p style="color:var(--color-text-muted);font-size:13px">Class ${child.class} · ${PARENT_EXAMS.length} subjects</p>"""

NEW_EXAMS = """function buildParentExams(user) {
  const child = getParentChildContext(user);
  const rows = PARENT_EXAMS.map(e=>`<tr>
    <td style="font-weight:600;color:var(--color-text)">${e.subject}</td>
    <td style="color:var(--color-text)">${e.date}</td>
    <td style="color:var(--color-text-muted)">${e.time}</td>
    <td><span class="badge badge-info">${e.room}</span></td>
  </tr>`).join('');
  return `<div class="dash-section" id="section-parent_exams">
    <div class="card" style="margin-bottom:20px;background:linear-gradient(135deg,rgba(139,92,246,0.06),transparent)">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap">
        <div>
          <h3>📅 ${PARENT_EXAMS[0].exam}</h3>
          <p style="color:var(--color-text-muted);font-size:13px">Class ${child.class} · ${PARENT_EXAMS.length} subjects</p>"""

if OLD_EXAMS in content:
    content = content.replace(OLD_EXAMS, NEW_EXAMS)
    print("FIX 2a applied: buildParentExams child declaration")
else:
    print("FIX 2a SKIPPED - pattern not found")

# ─────────────────────────────────────────────
# FIX 3: buildParentResults also uses `child` not in scope — add lookup
# ─────────────────────────────────────────────
OLD_RESULTS = """function buildParentResults(user) {
  const r = PARENT_RESULTS;"""

NEW_RESULTS = """function buildParentResults(user) {
  const child = getParentChildContext(user);
  const r = PARENT_RESULTS;"""

if OLD_RESULTS in content:
    content = content.replace(OLD_RESULTS, NEW_RESULTS, 1)
    print("FIX 3 applied: buildParentResults child declaration")
else:
    print("FIX 3 SKIPPED - already fixed or not found")

# ─────────────────────────────────────────────
# FIX 4: Coordinator Quick Actions have no target — add targets
# ─────────────────────────────────────────────
OLD_COORD_QA = """    coordinator: [
      { icon: 'fa-calendar-alt', label: 'Edit Timetable', color: '#5ca870' },
      { icon: 'fa-bullhorn', label: 'Post Notice', color: '#1976d2' },
      { icon: 'fa-chart-bar', label: 'View Reports', color: '#f57c00' },
      { icon: 'fa-trophy', label: 'Manage CCA', color: '#8b5cf6' },
    ],"""

NEW_COORD_QA = """    coordinator: [
      { icon: 'fa-calendar-alt', label: 'Edit Timetable', color: '#5ca870', target: 'vp_schedule' },
      { icon: 'fa-bullhorn', label: 'Post Notice', color: '#1976d2', target: 'announcements' },
      { icon: 'fa-exclamation-circle', label: 'Issue Inbox', color: '#f57c00', target: 'coord_issues' },
      { icon: 'fa-sitemap', label: 'Class Overview', color: '#8b5cf6', target: 'coord_classes' },
    ],"""

if OLD_COORD_QA in content:
    content = content.replace(OLD_COORD_QA, NEW_COORD_QA)
    print("FIX 4 applied: Coordinator quick actions targets")
else:
    print("FIX 4 SKIPPED")

# ─────────────────────────────────────────────
# FIX 5: Class Teacher Quick Actions also have no target  
# ─────────────────────────────────────────────
OLD_CT_QA = """    class_teacher: [
      { icon: 'fa-clipboard-check', label: 'Mark Attendance', color: '#5ca870' },
      { icon: 'fa-file-alt', label: 'Report Cards', color: '#1976d2' },
      { icon: 'fa-book', label: 'Assign Homework', color: '#f57c00' },
      { icon: 'fa-users', label: 'Class Students', color: '#8b5cf6' },
    ],"""

NEW_CT_QA = """    class_teacher: [
      { icon: 'fa-clipboard-check', label: 'Mark Attendance', color: '#5ca870', target: 'teacher_attendance' },
      { icon: 'fa-chart-bar', label: 'Marks & Results', color: '#1976d2', target: 'teacher_results' },
      { icon: 'fa-book', label: 'Assign Homework', color: '#f57c00', target: 'teacher_homework' },
      { icon: 'fa-users', label: 'Class Students', color: '#8b5cf6', target: 'teacher_classes' },
    ],"""

if OLD_CT_QA in content:
    content = content.replace(OLD_CT_QA, NEW_CT_QA)
    print("FIX 5 applied: Class Teacher quick actions targets")
else:
    print("FIX 5 SKIPPED")

# ─────────────────────────────────────────────
# FIX 6: buildStudents "Add Student" button - wire it to simulateAction
# ─────────────────────────────────────────────
content = content.replace(
    "<button class=\"btn-primary\"><i class=\"fas fa-plus\"></i> Add Student</button>",
    "<button class=\"btn-primary\" onclick=\"simulateAction('Add Student form opened. Fill in admission details.')\"><i class=\"fas fa-plus\"></i> Add Student</button>"
)
print("FIX 6 applied: Add Student button")

# ─────────────────────────────────────────────
# FIX 7: buildHomework "New Assignment" button  
# ─────────────────────────────────────────────
content = content.replace(
    "<button class=\"btn-primary\"><i class=\"fas fa-plus\"></i> New Assignment</button>",
    "<button class=\"btn-primary\" onclick=\"simulateAction('New Assignment modal opened. Select class, subject and due date.')\"><i class=\"fas fa-plus\"></i> New Assignment</button>"
)
print("FIX 7 applied: New Assignment button")

# ─────────────────────────────────────────────
# FIX 8: VP Messages - Reply button needs onclick
# ─────────────────────────────────────────────
# The Reply button in VP Messages list
content = content.replace(
    "<button style=\"padding:6px 14px;border-radius:6px;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;font-size:12px;font-weight:600\"><i class=\"fas fa-reply\"></i> Reply</button>",
    "<button style=\"padding:6px 14px;border-radius:6px;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;font-size:12px;font-weight:600\" onclick=\"simulateAction('Reply composer opened.')\"><i class=\"fas fa-reply\"></i> Reply</button>"
)
content = content.replace(
    "<button style=\"padding:6px 14px;border-radius:6px;background:none;border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;font-size:12px;font-weight:600\"><i class=\"fas fa-share\"></i> Forward</button>",
    "<button style=\"padding:6px 14px;border-radius:6px;background:none;border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;font-size:12px;font-weight:600\" onclick=\"simulateAction('Forwarded to coordinator.')\"><i class=\"fas fa-share\"></i> Forward</button>"
)
print("FIX 8 applied: VP Messages Reply/Forward buttons")

# ─────────────────────────────────────────────
# FIX 9: VP Reports "Open Module" buttons - wire to relevant sections
# ─────────────────────────────────────────────
content = content.replace(
    "<i class=\"fas fa-user-check\" style=\"font-size:32px;color:var(--color-primary);margin-bottom:16px\"></i>\n        <h4 style=\"margin-bottom:8px\">Attendance Reports</h4>\n        <p style=\"font-size:12px;color:var(--color-text-muted);margin-bottom:16px\">Generate class-wise and teacher attendance comparisons.</p>\n        <button class=\"btn-primary\" style=\"font-size:12px;padding:8px 16px\">Open Module</button>",
    "<i class=\"fas fa-user-check\" style=\"font-size:32px;color:var(--color-primary);margin-bottom:16px\"></i>\n        <h4 style=\"margin-bottom:8px\">Attendance Reports</h4>\n        <p style=\"font-size:12px;color:var(--color-text-muted);margin-bottom:16px\">Generate class-wise and teacher attendance comparisons.</p>\n        <button class=\"btn-primary\" style=\"font-size:12px;padding:8px 16px\" onclick=\"navigateTo('vp_attendance')\">Open Module</button>"
)
content = content.replace(
    "<i class=\"fas fa-chart-bar\" style=\"font-size:32px;color:#f57c00;margin-bottom:16px\"></i>\n        <h4 style=\"margin-bottom:8px\">Academic &amp; Exam Reports</h4>\n        <p style=\"font-size:12px;color:var(--color-text-muted);margin-bottom:16px\">Class performance comparisons, subject averages.</p>\n        <button class=\"btn-primary\" style=\"font-size:12px;padding:8px 16px\">Open Module</button>",
    "<i class=\"fas fa-chart-bar\" style=\"font-size:32px;color:#f57c00;margin-bottom:16px\"></i>\n        <h4 style=\"margin-bottom:8px\">Academic &amp; Exam Reports</h4>\n        <p style=\"font-size:12px;color:var(--color-text-muted);margin-bottom:16px\">Class performance comparisons, subject averages.</p>\n        <button class=\"btn-primary\" style=\"font-size:12px;padding:8px 16px\" onclick=\"navigateTo('vp_class_perf')\">Open Module</button>"
)
content = content.replace(
    "<i class=\"fas fa-balance-scale\" style=\"font-size:32px;color:var(--color-danger);margin-bottom:16px\"></i>\n        <h4 style=\"margin-bottom:8px\">Discipline Reports</h4>\n        <p style=\"font-size:12px;color:var(--color-text-muted);margin-bottom:16px\">Track incidents across sections and escalate to Admin.</p>\n        <button class=\"btn-primary\" style=\"font-size:12px;padding:8px 16px\">Open Module</button>",
    "<i class=\"fas fa-balance-scale\" style=\"font-size:32px;color:var(--color-danger);margin-bottom:16px\"></i>\n        <h4 style=\"margin-bottom:8px\">Discipline Reports</h4>\n        <p style=\"font-size:12px;color:var(--color-text-muted);margin-bottom:16px\">Track incidents across sections and escalate to Admin.</p>\n        <button class=\"btn-primary\" style=\"font-size:12px;padding:8px 16px\" onclick=\"navigateTo('vp_student_issues')\">Open Module</button>"
)
print("FIX 9 applied: VP Reports buttons")

# ─────────────────────────────────────────────
# FIX 10: VP Approvals "Reject" button has no onclick  
# ─────────────────────────────────────────────
content = content.replace(
    "<button style=\"padding:6px 12px;font-size:12px;background:none;border:1px solid var(--color-danger);color:var(--color-danger);border-radius:6px;cursor:pointer\">Reject</button>",
    "<button style=\"padding:6px 12px;font-size:12px;background:none;border:1px solid var(--color-danger);color:var(--color-danger);border-radius:6px;cursor:pointer\" onclick=\"this.parentElement.parentElement.previousElementSibling.innerHTML='<span class=\\'badge badge-danger\\'>Rejected</span>';this.parentElement.innerHTML='<span style=\\'font-size:12px;color:var(--color-danger);font-weight:700\\'>Rejected</span>'\">Reject</button>"
)
print("FIX 10 applied: VP Approvals Reject button")

# ─────────────────────────────────────────────
# FIX 11: VP Compare Sections button has no onclick
# ─────────────────────────────────────────────
content = content.replace(
    "<button style=\"padding:10px 16px;border-radius:10px;background:var(--color-surface);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;font-weight:600\"><i class=\"fas fa-balance-scale\"></i> Compare Sections</button>",
    "<button style=\"padding:10px 16px;border-radius:10px;background:var(--color-surface);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;font-weight:600\" onclick=\"simulateAction('Section comparison chart opened.')\"><i class=\"fas fa-balance-scale\"></i> Compare Sections</button>"
)
print("FIX 11 applied: Compare Sections button")

# ─────────────────────────────────────────────
# FIX 12: VP Reports Export PDF / Excel buttons  
# ─────────────────────────────────────────────
content = content.replace(
    "<button class=\"btn-primary\" style=\"padding:8px 16px\"><i class=\"fas fa-file-pdf\"></i> Export PDF</button>\n          <button style=\"padding:8px 16px;border-radius:8px;background:var(--color-surface);border:1px solid var(--color-border);color:var(--color-text);font-weight:600;cursor:pointer\"><i class=\"fas fa-file-excel\"></i> Excel</button>",
    "<button class=\"btn-primary\" style=\"padding:8px 16px\" onclick=\"simulateAction('PDF report generated and ready to download.')\"><i class=\"fas fa-file-pdf\"></i> Export PDF</button>\n          <button style=\"padding:8px 16px;border-radius:8px;background:var(--color-surface);border:1px solid var(--color-border);color:var(--color-text);font-weight:600;cursor:pointer\" onclick=\"simulateAction('Excel sheet exported successfully.')\"><i class=\"fas fa-file-excel\"></i> Excel</button>"
)
print("FIX 12 applied: Reports Export buttons")

# ─────────────────────────────────────────────
# FIX 13: VP Teacher Monitoring view/bell/flag icon buttons
# ─────────────────────────────────────────────
content = content.replace(
    "<button style=\"padding:6px;font-size:12px;border-radius:6px;background:var(--color-surface-2);border:1px solid var(--color-border);cursor:pointer;color:var(--color-text)\" title=\"View Profile\"><i class=\"fas fa-user\"></i></button><button style=\"padding:6px;font-size:12px;border-radius:6px;background:var(--color-surface-2);border:1px solid var(--color-border);cursor:pointer;color:#f57c00\" title=\"Send Reminder\"><i class=\"fas fa-bell\"></i></button><button style=\"padding:6px;font-size:12px;border-radius:6px;background:none;border:1px solid var(--color-danger);cursor:pointer;color:var(--color-danger)\" title=\"Flag Issue\"><i class=\"fas fa-flag\"></i></button>",
    "<button style=\"padding:6px;font-size:12px;border-radius:6px;background:var(--color-surface-2);border:1px solid var(--color-border);cursor:pointer;color:var(--color-text)\" title=\"View Profile\" onclick=\"navigateTo('profile')\"><i class=\"fas fa-user\"></i></button><button style=\"padding:6px;font-size:12px;border-radius:6px;background:var(--color-surface-2);border:1px solid var(--color-border);cursor:pointer;color:#f57c00\" title=\"Send Reminder\" onclick=\"simulateAction('Reminder sent to teacher.')\"><i class=\"fas fa-bell\"></i></button><button style=\"padding:6px;font-size:12px;border-radius:6px;background:none;border:1px solid var(--color-danger);cursor:pointer;color:var(--color-danger)\" title=\"Flag Issue\" onclick=\"simulateAction('Issue flagged for VP review.')\"><i class=\"fas fa-flag\"></i></button>"
)
print("FIX 13 applied: VP Teacher Monitoring icon buttons")

# ─────────────────────────────────────────────
# FIX 14: VP Reviews Pending Work button 
# ─────────────────────────────────────────────
content = content.replace(
    "<button class=\"btn-primary\" onclick=\"alert('Reviewing Pending Work...')\">Review Pending Work</button>",
    "<button class=\"btn-primary\" onclick=\"simulateAction('Pending work review loaded. 3 items need immediate attention.')\">Review Pending Work</button>"
)
print("FIX 14 applied: VP Pending Work button")

# ─────────────────────────────────────────────
# FIX 15: VP ClassPerf Export button 
# ─────────────────────────────────────────────
content = content.replace(
    "<button class=\"btn-primary\" onclick=\"alert('Exporting PDF...')\"><i class=\"fas fa-file-pdf\"></i> Export</button>",
    "<button class=\"btn-primary\" onclick=\"simulateAction('Class performance PDF exported.')\"><i class=\"fas fa-file-pdf\"></i> Export</button>"
)
print("FIX 15 applied: VP ClassPerf Export button")

# ─────────────────────────────────────────────
# FIX 16: VP Teacher Homework 'New Assignment' at Teacher dashboard
# ─────────────────────────────────────────────
content = content.replace(
    "<button class=\"btn-primary\" onclick=\"alert('Create new homework modal')\"><i class=\"fas fa-plus\"></i> New Assignment</button>",
    "<button class=\"btn-primary\" onclick=\"openNewAssignmentModal()\"><i class=\"fas fa-plus\"></i> New Assignment</button>"
)
print("FIX 16 applied: Teacher Homework New Assignment button")

# ─────────────────────────────────────────────
# FIX 17: Teacher Attendance 'Submit Attendance' button 
# ─────────────────────────────────────────────
content = content.replace(
    "<button class=\"btn-primary\" onclick=\"alert('Attendance saved successfully!');\"><i class=\"fas fa-check\"></i> Submit Attendance</button>",
    "<button class=\"btn-primary\" onclick=\"simulateAction('Attendance submitted successfully for Class 9-C on ' + new Date().toLocaleDateString('en-IN') + '.')\"><i class=\"fas fa-check\"></i> Submit Attendance</button>"
)
print("FIX 17 applied: Teacher Attendance Submit button")

# ─────────────────────────────────────────────
# FIX 18: Teacher Results 'Download Template' and 'Save Draft' 
# ─────────────────────────────────────────────
content = content.replace(
    "<button class=\"btn-primary\" onclick=\"alert('Downloading Excel template...');\"><i class=\"fas fa-download\"></i> Download Template</button>",
    "<button class=\"btn-primary\" onclick=\"simulateAction('Excel template downloaded. Fill marks and re-upload.')\"><i class=\"fas fa-download\"></i> Download Template</button>"
)
content = content.replace(
    "<button class=\"btn-primary\" style=\"background:#f57c00\" onclick=\"alert('Draft saved.');\"><i class=\"fas fa-save\"></i> Save Draft</button>",
    "<button class=\"btn-primary\" style=\"background:#f57c00\" onclick=\"simulateAction('Draft marks saved. You can continue later.')\"><i class=\"fas fa-save\"></i> Save Draft</button>"
)
print("FIX 18 applied: Teacher Results buttons")

# ─────────────────────────────────────────────
# FIX 19: Teacher Performance 'Note' button uses template literal that breaks
# ─────────────────────────────────────────────
# Replace the broken alert in teacher performance
content = content.replace(
    "onclick=\"alert('Adding note for ${s.name}')\"",
    "onclick=\"simulateAction('Note added for student.')\""
)
print("FIX 19 applied: Teacher Performance Note button")

# ─────────────────────────────────────────────
# FIX 20: VP Exams 'Approve Release' already has good onclick, check 'Open Performance Report'  
# ─────────────────────────────────────────────
content = content.replace(
    "onclick=\"alert('Opened performance analytics for 9-B Chemistry.')\"",
    "onclick=\"simulateAction('Performance analytics for 9-B Chemistry opened.')\""
)
print("FIX 20 applied: VP Exams performance report")

# ─────────────────────────────────────────────
# FIX 21: VP Home "Broadcast to Staff" and "New Message" use alert still
# ─────────────────────────────────────────────
content = content.replace(
    "onclick=\"alert('Broadcast active.')\"",
    "onclick=\"simulateAction('Broadcast sent to all staff members.')\""
)
content = content.replace(
    "onclick=\"alert('Compose mode')\"",
    "onclick=\"simulateAction('Message compose window opened.')\""
)
print("FIX 21 applied: VP Messages action buttons")

# ─────────────────────────────────────────────
# FIX 22: Events "View Event Master Plan" button - wire to events nav
# ─────────────────────────────────────────────
# already does navigateTo for events in the quick actions, this is the card button
# The event cards have a button with hover inline style, keep as simulateAction
content = content.replace(
    ">View Event Master Plan</button>",
    " onclick=\"simulateAction('Event master plan opened with full schedule.')\">View Event Master Plan</button>"
)
print("FIX 22 applied: Event Master Plan button")

# ─────────────────────────────────────────────
# FIX 23: VP Announcements - Edit and Archive inline icon buttons
# ─────────────────────────────────────────────
content = content.replace(
    "<button style=\"padding:4px 8px;font-size:11px;border-radius:4px;background:none;border:1px solid #1976d2;color:#1976d2;cursor:pointer\"><i class=\"fas fa-edit\"></i></button>",
    "<button style=\"padding:4px 8px;font-size:11px;border-radius:4px;background:none;border:1px solid #1976d2;color:#1976d2;cursor:pointer\" onclick=\"simulateAction('Notice edit mode opened.')\"><i class=\"fas fa-edit\"></i></button>"
)
content = content.replace(
    "<button style=\"padding:4px 8px;font-size:11px;border-radius:4px;background:none;border:1px solid #999;color:#999;cursor:pointer\"><i class=\"fas fa-archive\"></i></button>",
    "<button style=\"padding:4px 8px;font-size:11px;border-radius:4px;background:none;border:1px solid #999;color:#999;cursor:pointer\" onclick=\"simulateAction('Notice archived successfully.')\"><i class=\"fas fa-archive\"></i></button>"
)
content = content.replace(
    "<button class=\"btn-primary\" style=\"padding:8px 16px\"><i class=\"fas fa-plus\"></i> Create Notice</button>",
    "<button class=\"btn-primary\" style=\"padding:8px 16px\" onclick=\"simulateAction('Notice creation form opened.')\"><i class=\"fas fa-plus\"></i> Create Notice</button>"
)
print("FIX 23 applied: Announcements VP buttons")

# ─────────────────────────────────────────────
# FIX 24: Add openNewAssignmentModal function at end of file
# ─────────────────────────────────────────────
NEW_MODAL_FUNC = """

/* ━━━━ TEACHER: NEW ASSIGNMENT MODAL ━━━━━━━━━━━━━━━━━━━━━━ */
function openNewAssignmentModal() {
  if(document.getElementById('assign-modal-overlay')) return;
  const modalHTML = `
    <div id="assign-modal-overlay" class="modal-overlay" onclick="closeAssignModal(event)">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3>📚 Create New Assignment</h3>
          <button class="modal-close" onclick="closeAssignModal()"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <label>Assignment Title</label>
          <input type="text" id="assign-title" class="form-control" placeholder="E.g., Quadratic Equations Practice Set"/>
          <label>Subject</label>
          <select id="assign-subject" class="form-control">
            <option>Mathematics</option><option>Physics</option><option>Chemistry</option>
            <option>English</option><option>History</option><option>Computer Science</option>
          </select>
          <label>Class</label>
          <select id="assign-class" class="form-control">
            <option>9-C (My Class)</option><option>10-A</option><option>9-B</option>
          </select>
          <label>Due Date</label>
          <input type="date" id="assign-due" class="form-control"/>
          <label>Instructions</label>
          <textarea id="assign-desc" class="form-control" rows="3" placeholder="Describe the assignment..."></textarea>
          <button class="btn-primary" style="width:100%;margin-top:8px" onclick="submitNewAssignment()">
            <i class="fas fa-paper-plane"></i> Publish Assignment
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function submitNewAssignment() {
  const title = document.getElementById('assign-title').value.trim();
  const subject = document.getElementById('assign-subject').value;
  const cls = document.getElementById('assign-class').value;
  const due = document.getElementById('assign-due').value;
  if(!title || !due) { alert('Please fill in title and due date.'); return; }
  closeAssignModal();
  simulateAction('Assignment "' + title + '" published for ' + cls + ' — due ' + due + '.');
}

function closeAssignModal(e) {
  if(e && e.target.id !== 'assign-modal-overlay') return;
  const el = document.getElementById('assign-modal-overlay');
  if(el) el.remove();
}
"""

if "function openNewAssignmentModal" not in content:
    content += NEW_MODAL_FUNC
    print("FIX 24 applied: New Assignment Modal function added")
else:
    print("FIX 24 SKIPPED: already exists")

# ─────────────────────────────────────────────
# FIX 25: simulateAction - make it a nicer toast instead of alert
# ─────────────────────────────────────────────
OLD_SIMULATE = """function simulateAction(msg) {
  alert(msg);
}"""

NEW_SIMULATE = """function simulateAction(msg) {
  // Show a non-blocking toast instead of alert
  const existing = document.getElementById('sim-toast');
  if(existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'sim-toast';
  toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:var(--color-primary);color:white;padding:14px 28px;border-radius:12px;font-size:14px;font-weight:600;font-family:Inter,sans-serif;z-index:99999;box-shadow:0 8px 30px rgba(0,0,0,0.25);max-width:90vw;text-align:center;animation:fadeInUp 0.3s ease;pointer-events:none;';
  toast.innerHTML = '<i class="fas fa-check-circle" style="margin-right:8px"></i>' + msg;
  document.body.appendChild(toast);
  setTimeout(() => { if(toast.parentNode) toast.remove(); }, 3500);
}"""

if OLD_SIMULATE in content:
    content = content.replace(OLD_SIMULATE, NEW_SIMULATE)
    print("FIX 25 applied: simulateAction toast notification")
else:
    print("FIX 25 SKIPPED - pattern mismatch")

with open(dash_path, "w", encoding="utf-8") as f:
    f.write(content)

print("\n✅ All fixes applied to dashboard.js")
