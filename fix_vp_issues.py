import os

dash_path = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/dashboard.js"
with open(dash_path, "r", encoding="utf-8") as f:
    content = f.read()

vp_issues_code = """
window.currentVPIssuesTab = window.currentVPIssuesTab || 'escalated';

function switchVPTab(tab) {
  window.currentVPIssuesTab = tab;
  buildDashboard(currentUser); 
  // Restore sidebar active state
  setTimeout(() => {
    document.querySelectorAll('.sidebar-nav li').forEach(li => li.classList.remove('active'));
    document.querySelector(`li[onclick*="vp_student_issues"]`)?.classList.add('active');
  }, 10);
}

function buildVPStudentIssues(user) {
  const tab = window.currentVPIssuesTab;
  
  // Filter GLOBAL_ISSUES
  let issues = GLOBAL_ISSUES.filter(i => i.stage === 'VP');
  if (tab === 'main') {
    issues = GLOBAL_ISSUES.filter(i => (i.status === 'Open' || i.status === 'Reviewing') && i.stage !== 'VP');
  } else if (tab === 'escalated') {
    issues = GLOBAL_ISSUES.filter(i => i.stage === 'VP' && i.status !== 'Resolved' && i.status !== 'Closed');
  } else if (tab === 'resolved') {
    issues = GLOBAL_ISSUES.filter(i => i.status === 'Resolved' || i.status === 'Closed');
  }
  
  issues.sort((a,b) => new Date(b.created) - new Date(a.created));

  let listHTML = '';
  if (issues.length === 0) {
    listHTML = `<div style="text-align:center;padding:60px 20px;color:var(--color-text-muted)"><i class="fas fa-check-double" style="font-size:48px;opacity:0.2;margin-bottom:16px"></i><p>No issues found in this category.</p></div>`;
  } else {
    listHTML = issues.map(m => {
      const isRes = m.status === 'Resolved' || m.status === 'Closed';
      const border = isRes ? 'var(--color-primary)' : m.stage === 'VP' ? '#d32f2f' : 'var(--color-border)';
      
      return `<div class="card" style="margin-bottom:12px;border:1px solid ${border};cursor:pointer;transition:transform 0.2s;position:relative" onclick="viewIssue('${m.id}')">
        ${m.priority === 'High' && !isRes ? '<div style="position:absolute;top:-6px;right:-6px;background:var(--color-danger);color:white;font-size:10px;padding:2px 6px;border-radius:10px;font-weight:700">URGENT</div>' : ''}
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap">
          <div>
            <div style="font-weight:700;color:var(--color-text);margin-bottom:4px;font-size:16px">${m.title}</div>
            <div style="font-size:13px;color:var(--color-text-muted)">
              <span class="badge" style="background:var(--color-surface-2);color:var(--color-text);border:1px solid var(--color-border)">${m.studentName} (${m.class})</span>
              <span style="margin-left:8px">Reported by: ${m.reporterName} (${m.reporterRole})</span>
            </div>
          </div>
          <div style="text-align:right">
            <span class="badge" style="background:${isRes?'var(--color-primary)':m.stage==='VP'?'#f57c00':m.stage==='Coordinator'?'#1976d2':'#5ca870'}">Stage: ${m.stage}</span>
            <span class="badge" style="background:var(--color-surface-2);color:var(--color-text);border:1px solid var(--color-border);margin-left:4px">${m.status}</span>
            <div style="font-size:11px;color:var(--color-text-muted);margin-top:6px">${m.created.split('T')[0]} - ${m.category}</div>
          </div>
        </div>
        <div style="font-size:13px;color:var(--color-text-light);margin-top:10px;line-height:1.4">${m.desc.substring(0, 150)}${m.desc.length>150?'...':''}</div>
      </div>`;
    }).join('');
  }

  return `<div class="dash-section active" id="section-vp_student_issues">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:16px">
      <div>
        <h3 style="color:var(--color-text)">⚖️ VP Issue Management Center</h3>
        <p style="color:var(--color-text-muted);font-size:13px;margin-top:4px">Oversee escalated disciplinary and operational issues.</p>
      </div>
      <div style="display:flex;background:var(--color-surface-2);border-radius:8px;border:1px solid var(--color-border);overflow:hidden">
        <button onclick="switchVPTab('main')" style="padding:10px 16px;border:none;background:${tab==='main'?'var(--color-primary)':'transparent'};color:${tab==='main'?'white':'var(--color-text)'};font-weight:600;cursor:pointer"><i class="fas fa-layer-group"></i> School-Wide</button>
        <button onclick="switchVPTab('escalated')" style="padding:10px 16px;border:none;background:${tab==='escalated'?'#f57c00':'transparent'};color:${tab==='escalated'?'white':'var(--color-text)'};font-weight:600;cursor:pointer"><i class="fas fa-level-up-alt"></i> Escalated to VP</button>
        <button onclick="switchVPTab('resolved')" style="padding:10px 16px;border:none;background:${tab==='resolved'?'#5ca870':'transparent'};color:${tab==='resolved'?'white':'var(--color-text)'};font-weight:600;cursor:pointer"><i class="fas fa-archive"></i> Resolved Bin</button>
      </div>
    </div>
    
    <div style="display:flex;gap:10px;margin-bottom:16px;background:var(--color-surface-2);padding:12px;border-radius:12px;border:1px solid var(--color-border)">
      <select class="form-control" style="margin:0;max-width:200px"><option>All Categories</option><option>Discipline</option><option>Academic</option></select>
      <select class="form-control" style="margin:0;max-width:200px"><option>All Dates</option><option>This Week</option><option>This Month</option></select>
      <input type="text" class="form-control" style="margin:0" placeholder="Search by student name or issue ID..."/>
      <button class="btn-primary"><i class="fas fa-search"></i> Apply</button>
    </div>

    <div>${listHTML}</div>
  </div>`;
}
"""

if "function buildVPStudentIssues" not in content:
    content = content.replace(
        "function buildVPTeachers(user) {",
        vp_issues_code + "\n\nfunction buildVPTeachers(user) {"
    )
    with open(dash_path, "w", encoding="utf-8") as f:
        f.write(content)
        
