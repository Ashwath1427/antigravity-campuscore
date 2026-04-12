import re
import os

app_js = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/app.js"
ui_js = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/ui.js"
dash_js = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/dashboard.js"

with open(app_js, "r", encoding="utf-8") as f: app = f.read()
with open(ui_js, "r", encoding="utf-8") as f: ui = f.read()
with open(dash_js, "r", encoding="utf-8") as f: dash = f.read()

# ──────────────────────────────────────────────────────────
# FIX 1: THEME & COMPACT MODE PERSISTENCE
# ──────────────────────────────────────────────────────────

# Update app.js to pass user ID to loadTheme on dashboard init
app = app.replace(
    "function initDashboard(user) {\n  buildSidebar(user);",
    "function initDashboard(user) {\n  if(typeof loadTheme === 'function') loadTheme(user.id);\n  buildSidebar(user);"
)

# Update ui.js loadTheme to read from unified campuscore_settings
old_toggleTheme = """function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = isDark ? '☀️' : '🌙';
  try { localStorage.setItem('cc_theme', isDark ? 'light' : 'dark'); } catch(e) {}
}"""
new_toggleTheme = """function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  const newDark = !isDark;
  html.setAttribute('data-theme', newDark ? 'dark' : 'light');
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = newDark ? '🌙' : '☀️';
  
  if (typeof currentUser !== 'undefined' && currentUser && currentUser.id) {
    if(typeof handleSettingToggle === 'function') {
      handleSettingToggle(currentUser.id, 'darkMode', newDark);
    }
  } else {
    try { localStorage.setItem('cc_theme', newDark ? 'dark' : 'light'); } catch(e) {}
  }
}"""
ui = ui.replace(old_toggleTheme, new_toggleTheme)

old_loadTheme = """function loadTheme() {
  try {
    const saved = localStorage.getItem('cc_theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
      const icon = document.getElementById('theme-icon');
      if (icon) icon.textContent = saved === 'dark' ? '🌙' : '☀️';
    }
  } catch(e) {}
}"""
new_loadTheme = """function loadTheme(userId = null) {
  try {
    let isDark = false, isCompact = false;
    if (userId) {
      const settingsStr = localStorage.getItem('campuscore_settings');
      if (settingsStr) {
        const settingsObj = JSON.parse(settingsStr);
        if (settingsObj[userId]) {
          isDark = !!settingsObj[userId].darkMode;
          isCompact = !!settingsObj[userId].compactMode;
        }
      }
    } else {
      const saved = localStorage.getItem('cc_theme');
      if (saved === 'dark') isDark = true;
    }
    
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if(isCompact) {
       document.documentElement.setAttribute('data-compact', 'true');
    } else {
       document.documentElement.removeAttribute('data-compact');
    }
    
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = isDark ? '🌙' : '☀️';
  } catch(e) {}
}"""
ui = ui.replace(old_loadTheme, new_loadTheme)

# Update dashboard.js compactMode UI string logic to immediately trigger CSS change
dash = dash.replace(
    "`handleSettingToggle('${user.id}', 'compactMode', this.checked)`",
    "`handleSettingToggle('${user.id}', 'compactMode', this.checked); if(this.checked){document.documentElement.setAttribute('data-compact', 'true');}else{document.documentElement.removeAttribute('data-compact');}`"
)


# ──────────────────────────────────────────────────────────
# FIX 2: ATTACHMENTS HANDLING
# ──────────────────────────────────────────────────────────

# Inside Raise Concern Modal HTML -> inject File Input
old_concern_html = """          <textarea id=\"concern-details\" class=\"form-control\" rows=\"4\" placeholder=\"Please provide specific details...\" style=\"resize:none\"></textarea>
          <button class=\"btn-primary\" style=\"width:100%;margin-top:10px\" onclick=\"submitConcern()\">Submit Concern</button>"""
new_concern_html = """          <textarea id=\"concern-details\" class=\"form-control\" rows=\"4\" placeholder=\"Please provide specific details...\" style=\"resize:none\"></textarea>
          
          <label style="margin-top:12px">Attachments (Optional)</label>
          <input type="file" id="concern-files" class="form-control" multiple accept="image/*,.pdf,.doc,.docx" />
          <div id="file-preview-list" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px"></div>
          
          <button class=\"btn-primary\" style=\"width:100%;margin-top:10px\" onclick=\"submitConcern()\">Submit Concern</button>"""
dash = dash.replace(old_concern_html, new_concern_html)


# Update submitConcern to handle the file upload reading
old_submit_concern = """function submitConcern() {
  const title = document.getElementById('concern-title').value.trim();
  const cat = document.getElementById('concern-category').value;
  const desc = document.getElementById('concern-details').value.trim();
  if(!title || !desc) {
    alert("Please fill all fields.");
    return;
  }
  
  const child = getParentChildContext(currentUser);
  
  const newIssue = {
    id: "ISS-" + Math.floor(1000 + Math.random() * 9000),
    title, desc, status: "Open", stage: "Teacher",
    studentId: child.id, studentName: child.name, class: child.class,
    reporterId: currentUser.username, reporterName: currentUser.name, reporterRole: currentUser.roleLabel,
    category: cat, priority: "Normal", severity: "Normal",
    assignedTo: child.classTeacher + " (Teacher)",
    attachments: [],
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    timeline: [
      { date: new Date().toISOString(), actor: currentUser.name, role: currentUser.roleLabel, note: `Created concern: ${desc}` }
    ]
  };

  GLOBAL_ISSUES.unshift(newIssue);
  saveIssues(GLOBAL_ISSUES);
  closeRaiseConcernModal();
  simulateAction('Your concern has been submitted successfully.');
}"""

new_submit_concern = """function submitConcern() {
  const title = document.getElementById('concern-title').value.trim();
  const cat = document.getElementById('concern-category').value;
  const desc = document.getElementById('concern-details').value.trim();
  const fileInput = document.getElementById('concern-files');
  
  if(!title || !desc) {
    simulateAction('Please fill all required fields.');
    return;
  }
  
  const child = getParentChildContext(currentUser);
  
  // Read all files asynchronously
  const files = fileInput && fileInput.files ? Array.from(fileInput.files) : [];
  const readers = files.map(file => {
      return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve({ name: file.name, type: file.type, size: file.size, data: e.target.result });
          reader.readAsDataURL(file);
      });
  });
  
  Promise.all(readers).then(attachmentsArray => {
      const newIssue = {
        id: "ISS-" + Math.floor(1000 + Math.random() * 9000),
        title, desc, status: "Open", stage: "Teacher",
        studentId: child.id, studentName: child.name, class: child.class,
        reporterId: currentUser.username, reporterName: currentUser.name, reporterRole: currentUser.roleLabel,
        category: cat, priority: "Normal", severity: "Normal",
        assignedTo: child.classTeacher + " (Teacher)",
        attachments: attachmentsArray,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        timeline: [
          { date: new Date().toISOString(), actor: currentUser.name, role: currentUser.roleLabel, note: `Created concern: ${desc}` }
        ]
      };

      GLOBAL_ISSUES.unshift(newIssue);
      saveIssues(GLOBAL_ISSUES);
      closeRaiseConcernModal();
      simulateAction('Your concern has been submitted successfully.');
      triggerLiveReRender();
  });
}"""

if old_submit_concern in dash:
    dash = dash.replace(old_submit_concern, new_submit_concern)


# Make attachments clickable in viewIssue()
old_view_attach = """          <div style="margin-top:20px">
            <strong>Attachments (${issue.attachments.length})</strong>
            <div style="display:flex;gap:10px;margin-top:8px">
              ${issue.attachments.length > 0 
                ? issue.attachments.map(a => `<div style="padding:10px;border:1px solid var(--color-border);border-radius:6px;background:var(--color-surface);font-size:12px"><i class="fas fa-file"></i> ${a}</div>`).join('')
                : '<span style="font-size:13px;color:var(--color-text-muted)">No attachments</span>'
              }
            </div>
          </div>"""
new_view_attach = """          <div style="margin-top:20px">
            <strong>Attachments (${(issue.attachments && issue.attachments.length) || 0})</strong>
            <div style="display:flex;gap:10px;margin-top:8px;flex-wrap:wrap">
              ${(issue.attachments && issue.attachments.length > 0) 
                ? issue.attachments.map(a => {
                    const isObj = typeof a === 'object';
                    const name = isObj ? a.name : a;
                    const b64 = isObj ? a.data : null;
                    if(b64) {
                       return `<div style="padding:10px;border:1px solid var(--color-border);border-radius:6px;background:var(--color-surface);font-size:12px;display:flex;flex-direction:column;gap:6px;">
                                 <div><i class="fas fa-file"></i> ${name}</div>
                                 <div style="display:flex;gap:6px">
                                   <button onclick="const w = window.open('about:blank'); setTimeout(()=>{w.document.write('<iframe src=\\'${b64}\\' frameborder=\\'0\\' style=\\'width:100%;height:100%\\'></iframe>');}, 100);" style="font-size:11px;padding:4px 8px;border-radius:4px;cursor:pointer;background:var(--color-primary);color:#fff;border:none"><i class="fas fa-eye"></i> View</button>
                                   <a href="${b64}" download="${name}" style="font-size:11px;padding:4px 8px;border-radius:4px;cursor:pointer;background:var(--color-surface-2);color:var(--color-text);border:1px solid var(--color-border);text-decoration:none"><i class="fas fa-download"></i> Download</a>
                                 </div>
                               </div>`;
                    } else {
                       return `<div style="padding:10px;border:1px solid var(--color-border);border-radius:6px;background:var(--color-surface);font-size:12px"><i class="fas fa-file"></i> ${name}</div>`;
                    }
                  }).join('')
                : '<span style="font-size:13px;color:var(--color-text-muted)">No attachments</span>'
              }
            </div>
          </div>"""
dash = dash.replace(old_view_attach, new_view_attach)

# Also update the issue counter on cards throughout the system
dash = dash.replace(
    # Old static 0 attachments label might be in buildCoordInbox or buildTeacherMessages
    "<i class=\"fas fa-paperclip\"></i> 0",
    "<i class=\"fas fa-paperclip\"></i> ${i.attachments ? i.attachments.length : 0}"
)

# ──────────────────────────────────────────────────────────
# FIX 3: LIVE RE-RENDER FUNCTIONALITY
# ──────────────────────────────────────────────────────────

# Create central live re-render function
re_render_func = """
function triggerLiveReRender() {
   // Immediately rebuild the dashboard content without full page reload
   console.log("Triggering live re-render to update state & badges.");
   if(typeof currentUser !== 'undefined' && currentUser) {
       buildDashboard(currentUser);
       buildSidebar(currentUser); // re-calc sidebar badges too!
   }
}
"""
if "function triggerLiveReRender()" not in dash:
    dash += re_render_func

# Inject triggerLiveReRender() into all state-mutating actions
mutating_functions = [
   ("function escalateIssue", "saveIssues(GLOBAL_ISSUES);\n  closeIssueModal();", "saveIssues(GLOBAL_ISSUES);\n  closeIssueModal();\n  triggerLiveReRender();"),
   ("function resolveIssue", "saveIssues(GLOBAL_ISSUES);\n  closeIssueModal();", "saveIssues(GLOBAL_ISSUES);\n  closeIssueModal();\n  triggerLiveReRender();"),
   ("function reopenIssue", "saveIssues(GLOBAL_ISSUES);\n  closeIssueModal();", "saveIssues(GLOBAL_ISSUES);\n  closeIssueModal();\n  triggerLiveReRender();"),
   ("function postIssueUpdate", "saveIssues(GLOBAL_ISSUES);\n  // Refresh modal", "saveIssues(GLOBAL_ISSUES);\n  triggerLiveReRender();\n  // Refresh modal"),
   ("function promoteStudents", "localStorage.setItem('campuscore_students', JSON.stringify(STUDENTS));\n  simulateAction", "localStorage.setItem('campuscore_students', JSON.stringify(STUDENTS));\n  triggerLiveReRender();\n  simulateAction")
]

for func, search, replace in mutating_functions:
    dash = dash.replace(search, replace)


with open(app_js, "w", encoding="utf-8") as f: f.write(app)
with open(ui_js, "w", encoding="utf-8") as f: f.write(ui)
with open(dash_js, "w", encoding="utf-8") as f: f.write(dash)

print("SUCCESS: Python surgical script complete!")
