import os

dash_path = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/dashboard.js"
with open(dash_path, "r", encoding="utf-8") as f:
    content = f.read()

new_parent_messages = """
/* ━━━━ PARENT: MESSAGES & ISSUES ━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildParentMessages(user) {
  const child = getParentChildContext(user);
  const myIssues = GLOBAL_ISSUES.filter(i => i.reporterId === user.username).sort((a,b) => new Date(b.created) - new Date(a.created));
  
  let list = '';
  if (myIssues.length === 0) {
    list = `<div style="text-align:center;padding:40px;color:var(--color-text-muted)"><i class="fas fa-inbox" style="font-size:48px;opacity:0.2;margin-bottom:16px"></i><p>No messages or concerns raised yet.</p></div>`;
  } else {
    list = myIssues.map(m => {
      const isRes = m.status === 'Resolved' || m.status === 'Closed';
      const isEscalated = m.stage === 'VP' || m.stage === 'Coordinator';
      const border = isRes ? 'var(--color-primary)' : isEscalated ? '#f57c00' : 'var(--color-border)';
      
      return `<div class="card" style="margin-bottom:12px;border:1px solid ${border};cursor:pointer;transition:transform 0.2s" onclick="viewIssue('${m.id}')">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap">
          <div>
            <div style="font-weight:700;color:var(--color-text);margin-bottom:4px;font-size:16px">${m.title}</div>
            <div style="font-size:13px;color:var(--color-text-muted)">ID: ${m.id} · Created: ${m.created.split('T')[0]}</div>
          </div>
          <div style="text-align:right">
            <span class="badge" style="background:${isRes?'var(--color-primary)':isEscalated?'#f57c00':'#1976d2'}">${m.status}</span>
            <div style="font-size:11px;color:var(--color-text-muted);margin-top:6px">Stage: ${m.stage}</div>
          </div>
        </div>
      </div>`;
    }).join('');
  }

  return `<div class="dash-section" id="section-parent_messages">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap">
      <h3 style="color:var(--color-text)">✉️ Messages & Issues</h3>
      <button class="btn-primary" onclick="openRaiseConcernModal()"><i class="fas fa-plus"></i> Raise Concern / Message</button>
    </div>
    <div class="card" style="background:var(--color-surface-2);margin-bottom:20px">
      <p style="font-size:13px;color:var(--color-text-muted)">Send a direct message to ${child.classTeacher} (Class Teacher). Issues not resolved by the teacher can be escalated to the Coordinator and Vice Principal.</p>
    </div>
    <div>${list}</div>
  </div>`;
}
"""

start_str = "/* ━━━━ PARENT: MESSAGES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */"
end_str = "/* ━━━━ TEACHER EXCLUSIVE MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━ */"

if start_str in content and end_str in content:
    pre = content[:content.find(start_str)]
    post = content[content.find(end_str):]
    with open(dash_path, "w", encoding="utf-8") as f:
        f.write(pre + new_parent_messages + "\n" + post)
    print("Patched buildParentMessages successfully.")
else:
    print("Could not find patch points.")
