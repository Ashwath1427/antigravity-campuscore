import os

dash_path = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/dashboard.js"
with open(dash_path, "r", encoding="utf-8") as f:
    content = f.read()

issue_modal_code = """
/* ━━━━ GLOBAL ISSUE ENGINE & MODALS ━━━━━━━━━━━━━━━━━━━━━━ */

function openRaiseConcernModal() {
  const child = getParentChildContext(currentUser);
  const modalHTML = `
    <div id="issue-modal-overlay" class="modal-overlay" onclick="closeIssueModal(event)">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3>Raise a Concern / Message</h3>
          <button class="modal-close" onclick="closeIssueModal()"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <label>Summary Title</label>
          <input type="text" id="issue-title" class="form-control" placeholder="E.g., Query about Math assignment"/>
          <label>Category</label>
          <select id="issue-category" class="form-control">
            <option>Academic</option><option>Discipline</option><option>Transport</option><option>Facilities</option><option>Other</option>
          </select>
          <label>Details</label>
          <textarea id="issue-desc" class="form-control" rows="4" placeholder="Describe the concern..."></textarea>
          <button class="btn-primary" style="width:100%;margin-top:10px" onclick="submitConcern()">Submit Concern</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function submitConcern() {
  const title = document.getElementById('issue-title').value.trim();
  const cat = document.getElementById('issue-category').value;
  const desc = document.getElementById('issue-desc').value.trim();
  if(!title || !desc) return alert("Please fill all fields");

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
  
  const issues = GLOBAL_ISSUES;
  issues.push(newIssue);
  saveIssues(issues);
  closeIssueModal();
  buildDashboard(currentUser);
}

function viewIssue(issueId) {
  const issue = GLOBAL_ISSUES.find(i => i.id === issueId);
  if(!issue) return;
  
  const isVP = currentUser.role === 'vice_principal';
  const isCoord = currentUser.role === 'coordinator';
  const isTeacher = currentUser.role === 'teacher';
  const isParent = currentUser.role === 'parent';
  
  const canEscalate = (isTeacher && issue.stage === 'Teacher') || (isCoord && issue.stage === 'Coordinator');
  const canResolve = ((isTeacher && issue.stage === 'Teacher') || (isCoord && issue.stage === 'Coordinator') || (isVP && issue.stage === 'VP')) && issue.status !== 'Resolved' && issue.status !== 'Closed';
  const canReopen = (isVP || isCoord || isTeacher) && (issue.status === 'Resolved' || issue.status === 'Closed');
  const canReply = issue.status !== 'Resolved' && issue.status !== 'Closed';

  let actions = '';
  if(canEscalate) actions += `<button class="btn-primary" style="background:#f57c00;border-color:#f57c00" onclick="updateIssueStatus('${issue.id}', 'escalate')"><i class="fas fa-level-up-alt"></i> Escalate</button>`;
  if(canResolve) actions += `<button class="btn-primary" style="background:var(--color-primary)" onclick="updateIssueStatus('${issue.id}', 'resolve')"><i class="fas fa-check-circle"></i> Resolve</button>`;
  if(canReopen) actions += `<button class="btn-primary" style="background:#8b5cf6;border-color:#8b5cf6" onclick="updateIssueStatus('${issue.id}', 'reopen')"><i class="fas fa-undo"></i> Reopen</button>`;

  const timelineHTML = issue.timeline.map(t => `
    <div style="margin-bottom:12px;padding:12px;background:var(--color-surface);border-radius:8px;border:1px solid var(--color-border)">
      <div style="font-size:12px;color:var(--color-text-muted);display:flex;justify-content:space-between;margin-bottom:4px">
        <strong>${t.actor} (${t.role})</strong><span>${t.date.split('T')[0]}</span>
      </div>
      <div style="color:var(--color-text);font-size:14px">${t.note}</div>
    </div>
  `).join('');

  const replyHTML = canReply ? `
    <div style="margin-top:20px">
      <textarea id="issue-reply-text" class="form-control" rows="3" placeholder="Type a reply or update..."></textarea>
      <button class="btn-primary" style="width:100%;margin-top:10px" onclick="submitReply('${issue.id}')"><i class="fas fa-paper-plane"></i> Post Update</button>
    </div>
  ` : `<div style="margin-top:20px;padding:12px;text-align:center;background:var(--color-surface);border-radius:8px;color:var(--color-text-muted)">This issue is resolved and locked.</div>`;

  const modalHTML = `
    <div id="issue-modal-overlay" class="modal-overlay" onclick="closeIssueModal(event)">
      <div class="modal-content" style="max-width:600px" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3>${issue.id}: ${issue.title}</h3>
          <button class="modal-close" onclick="closeIssueModal()"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap">
            <span class="badge badge-info">${issue.studentName} (${issue.class})</span>
            <span class="badge" style="background:var(--color-border);color:var(--color-text)">Stage: ${issue.stage}</span>
            <span class="badge" style="background:${issue.status.includes('Resolv')?'var(--color-primary)': '#f57c00'}">Status: ${issue.status}</span>
          </div>
          <div style="margin-bottom:20px;color:var(--color-text);font-size:15px;line-height:1.5">
            <strong>Original Concern:</strong><br>
            ${issue.desc}
          </div>
          <div style="display:flex;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--color-border)">
            ${actions}
          </div>
          <h4 style="margin-bottom:10px">Timeline Updates</h4>
          <div style="max-height:300px;overflow-y:auto;padding-right:8px">
            ${timelineHTML}
          </div>
          ${replyHTML}
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeIssueModal(e) {
  if(e && e.target.id !== 'issue-modal-overlay') return;
  const overlay = document.getElementById('issue-modal-overlay');
  if(overlay) overlay.remove();
}

function submitReply(issueId) {
  const text = document.getElementById('issue-reply-text').value.trim();
  if(!text) return;
  const issue = GLOBAL_ISSUES.find(i => i.id === issueId);
  if(!issue) return;
  
  issue.timeline.push({
    date: new Date().toISOString(),
    actor: currentUser.name,
    role: currentUser.roleLabel,
    note: text
  });
  issue.updated = new Date().toISOString();
  saveIssues(GLOBAL_ISSUES);
  closeIssueModal();
  viewIssue(issueId); // Re-render
}

function updateIssueStatus(issueId, action) {
  const issue = GLOBAL_ISSUES.find(i => i.id === issueId);
  if(!issue) return;
  
  let note = '';
  if(action === 'escalate') {
    if(issue.stage === 'Teacher') { issue.stage = 'Coordinator'; issue.assignedTo = 'Coordinator'; note = 'Escalated from Teacher to Coordinator.'; }
    else if(issue.stage === 'Coordinator') { issue.stage = 'VP'; issue.assignedTo = 'VP Suman'; note = 'Escalated from Coordinator to VP.'; }
    issue.status = 'Escalated';
  } else if(action === 'resolve') {
    issue.status = 'Resolved';
    note = 'Issue marked as resolved.';
  } else if(action === 'reopen') {
    issue.status = 'Open';
    note = 'Issue reopened for further review.';
  }
  
  issue.timeline.push({
    date: new Date().toISOString(), actor: currentUser.name, role: currentUser.roleLabel, note: note
  });
  issue.updated = new Date().toISOString();
  saveIssues(GLOBAL_ISSUES);
  closeIssueModal();
  buildDashboard(currentUser); // Refresh background dashboard
}
"""

style_patch = """
<style>
.modal-overlay {
  position: fixed; top:0; left:0; width:100%; height:100%;
  background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
  z-index: 9999; display: flex; justify-content: center; align-items: center;
}
.modal-content {
  background: var(--color-surface); width: 100%; max-width: 500px;
  border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  display: flex; flex-direction: column; overflow: hidden;
  max-height: 90vh;
}
.modal-header {
  padding: 20px; border-bottom: 1px solid var(--color-border);
  display: flex; justify-content: space-between; align-items: center;
}
.modal-header h3 { margin:0; color:var(--color-text); }
.modal-close {
  background: none; border: none; color: var(--color-text-muted);
  font-size: 20px; cursor: pointer; transition: color 0.2s;
}
.modal-close:hover { color: var(--color-danger); }
.modal-body {
  padding: 20px; overflow-y: auto;
}
.form-control {
  width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--color-border);
  background: var(--color-surface-2); color: var(--color-text); font-family: inherit;
  margin-bottom: 16px; margin-top: 6px; outline: none; transition: border-color 0.2s;
}
.form-control:focus { border-color: var(--color-primary); }
</style>
"""

# Inject this block at the end of the dashboard.js file
with open(dash_path, "a", encoding="utf-8") as f:
    f.write("\n\n" + issue_modal_code)

index_path = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/index.html"
with open(index_path, "r", encoding="utf-8") as f:
    idx = f.read()

if ".modal-overlay {" not in idx:
    idx = idx.replace("</head>", style_patch + "\n</head>")
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(idx)

# Cache bust index html to reload js
import re
idx = re.sub(r'dashboard\.js\?v=\d+', 'dashboard.js?v=9', idx)
with open(index_path, "w", encoding="utf-8") as f:
    f.write(idx)

