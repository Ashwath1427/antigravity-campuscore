import os

dash_path = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/dashboard.js"
with open(dash_path, "r", encoding="utf-8") as f:
    content = f.read()

new_teacher_msgs = """
function buildTeacherMessages(user) {
  // Fetch issues that are currently at the 'Teacher' stage, or were created by/assigned to this teacher
  const teacherIssues = GLOBAL_ISSUES.filter(i => 
    i.stage === 'Teacher' || 
    i.reporterId === user.username
  ).sort((a,b) => new Date(b.created) - new Date(a.created));

  let list = '';
  if (teacherIssues.length === 0) {
    list = `<div style="text-align:center;padding:40px;color:var(--color-text-muted)"><i class="fas fa-check-circle" style="font-size:48px;opacity:0.2;margin-bottom:16px"></i><p>Inbox is clear. No pending issues.</p></div>`;
  } else {
    list = teacherIssues.map(m => {
      const isRes = m.status === 'Resolved' || m.status === 'Closed';
      const isEscalated = m.status === 'Escalated';
      const border = isRes ? 'var(--color-primary)' : isEscalated ? '#f57c00' : 'var(--color-border)';
      
      return `<div class="card" style="margin-bottom:12px;border:1px solid ${border};cursor:pointer;transition:transform 0.2s" onclick="viewIssue('${m.id}')">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap">
          <div>
            <div style="font-weight:700;color:var(--color-text);margin-bottom:4px;font-size:16px">${m.title}</div>
            <div style="font-size:13px;color:var(--color-text-muted)">
              <span class="badge" style="background:var(--color-surface-2);color:var(--color-text)">${m.studentName} (${m.class})</span>
              <span style="margin-left:8px">Reported by: ${m.reporterName}</span>
            </div>
          </div>
          <div style="text-align:right">
            <span class="badge" style="background:${isRes?'var(--color-primary)':isEscalated?'#f57c00':'#1976d2'}">${m.status}</span>
            <div style="font-size:11px;color:var(--color-text-muted);margin-top:6px">${m.created.split('T')[0]}</div>
          </div>
        </div>
        <div style="font-size:13px;color:var(--color-text-light);margin-top:10px;line-height:1.4">${m.desc.substring(0, 100)}${m.desc.length>100?'...':''}</div>
      </div>`;
    }).join('');
  }

  return `<div class="dash-section" id="section-teacher_messages">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap">
      <h3 style="color:var(--color-text)">✉️ Staff Inbox & Parent Concerns</h3>
    </div>
    <div class="card" style="background:var(--color-surface-2);margin-bottom:20px">
      <p style="font-size:13px;color:var(--color-text-muted)">Manage parent concerns and active communications. Issues not resolvable at your level can be escalated to the Coordinator.</p>
    </div>
    <div>${list}</div>
  </div>`;
}
"""

start_str = "function buildTeacherMessages(user) {"
end_str = "/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n   PROMOTE STUDENTS – VP Action\n   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */"

if start_str in content and end_str in content:
    pre = content[:content.find(start_str)]
    post = content[content.find(end_str):]
    with open(dash_path, "w", encoding="utf-8") as f:
        f.write(pre + new_teacher_msgs + "\n" + post)
    print("Patched buildTeacherMessages successfully.")
else:
    print("Could not find patch points.")
