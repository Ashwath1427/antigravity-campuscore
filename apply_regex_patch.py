import re

dash_js = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/dashboard.js"
with open(dash_js, "r", encoding="utf-8") as f: dash = f.read()

# 1. Attachments in submitConcern
# We need to replace submitConcern entirely using regex or substring indexing
submit_start = dash.find("function submitConcern() {")
submit_end = dash.find("}", submit_start)
while True:
    # Need to match the whole function, finding the balancing bracket is hard with regex without balancing groups.
    # Let's just find the next function def
    next_func = dash.find("function", submit_start + 10)
    if next_func == -1: next_func = len(dash)
    # The function text is from submit_start to next_func-1, effectively.
    # Actually, we know it's submitConcern. I'll just regex replace the body.
    break

import re
old_func_pattern = r"function submitConcern\(\)\s*\{.*?simulateAction\('Your concern has been submitted successfully\.'\);\s*\}"

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
      if(typeof closeRaiseConcernModal === 'function') closeRaiseConcernModal();
      simulateAction('Your concern has been submitted successfully.');
      triggerLiveReRender();
  });
}"""
dash = re.sub(old_func_pattern, new_submit_concern, dash, flags=re.DOTALL)


# 2. Inject triggerLiveReRender into Escalate / Resolve / Reopen 
dash = re.sub(r"(saveIssues\(GLOBAL_ISSUES\);\s*closeIssueModal\(\);)", r"\1\n  triggerLiveReRender();", dash)

# And promoteStudents
dash = re.sub(r"(localStorage\.setItem\('campuscore_students',\s*JSON\.stringify\(STUDENTS\)\);)", r"\1\n  triggerLiveReRender();", dash)

# 3. Handle Raise Concern Modal injection
concern_modal_patt = r'(<textarea id="concern-details" class="form-control" rows="4" placeholder="Please provide specific details..." style="resize:none"></textarea>)\s*(<button class="btn-primary" style="width:100%;margin-top:10px" onclick="submitConcern\(\)">Submit Concern</button>)'

new_modal_inject = r'''\1
          <label style="margin-top:12px">Attachments (Optional)</label>
          <input type="file" id="concern-files" class="form-control" multiple accept="image/*,.pdf,.doc,.docx" />
          <div id="file-preview-list" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px"></div>
          \2'''

dash = re.sub(concern_modal_patt, new_modal_inject, dash)


# 4. Attachments Renderer in viewIssue
old_attach_patt = r'<div style="margin-top:20px">\s*<strong>Attachments \(\$\{issue\.attachments\.length\}\)</strong>.*?</div>\s*</div>'

new_attach_html = """<div style="margin-top:20px">
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

dash = re.sub(old_attach_patt, new_attach_html, dash, flags=re.DOTALL)


with open(dash_js, "w", encoding="utf-8") as f: f.write(dash)
print("Regex patch applied successfully.")
