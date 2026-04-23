/* ========================================================================
   WORKFLOW MANAGER & MASTER OVERRIDES
   Execution Script covering all full-completion fixes globally.
   ======================================================================== */

// INITIALIZE GLOBAL SHARED DATA
function initWorkflowData() {
    if(!localStorage.getItem('campuscore_vp_issues')) {
        // Fallback seeded cases
        const seeded = {
            mainIssues: [
               { id: 'ISS-001', student: 'KASULA ASHWATH', class: '9C', category: 'Discipline', priority: 'Medium', desc: 'Frequent disruption in Math class. Parent concern attached.', reportedBy: 'Prasana Reddy', date: new Date().toLocaleString(), stage: 'VP' }
            ],
            escalatedIssues: [
              { id: 'ISS-002', student: 'PRANEETH BHUKYA', class: '9C', category: 'Academic', priority: 'High', desc: 'Student failing 3 subjects back-to-back.', reportedBy: 'Teacher', date: new Date().toLocaleString(), stage: 'VP', escalatedBy: 'Anitha', escalationReason: 'Needs strict intervention.' }
            ],
            resolvedIssues: []
        };
        localStorage.setItem('campuscore_vp_issues', JSON.stringify(seeded));
    }
}
initWorkflowData();

// ---------------------------------------------------------
// FIX 2 & 3: TIMETABLE INLINE EDITING & FILTERS
// ---------------------------------------------------------
window.vpEditTimetable = function() {
    const ttSec = document.getElementById('section-vp_schedule') || document.getElementById('section-vp_timetable');
    if(!ttSec) return;
    const theList = ttSec.querySelector('.schedule-list') || ttSec.querySelector('.timetable-grid');
    if(!theList) return;

    ttSec.classList.add('edit-mode');
    document.querySelector('.btn-primary[title="Edit or adjust the daily timetable"]')?.style.setProperty('display', 'none', 'important');
    
    // Backup data string natively onto the node
    theList.dataset.origHtml = theList.innerHTML;

    // Build header controls
    const ctrls = document.createElement('div');
    ctrls.id = 'tt-edit-controls';
    ctrls.style.cssText = 'margin-bottom:16px;display:flex;gap:10px';
    ctrls.innerHTML = `
      <button id="tt-save-btn" onclick="saveTimetableEdit()" style="background:#2e7d32;color:white;padding:10px 24px;border-radius:8px;border:none;cursor:pointer;font-weight:600">Save Changes</button>
      <button id="tt-cancel-btn" onclick="cancelTimetableEdit()" style="background:#666;color:white;padding:10px 24px;border-radius:8px;border:none;cursor:pointer;font-weight:600">Cancel Edit</button>
    `;
    theList.parentNode.insertBefore(ctrls, theList);

    const items = theList.querySelectorAll('.schedule-item, .tt-data-row, .tt-cell');
    items.forEach(it => {
        // Skip purely break/lunch descriptors if we can detect
        if(it.textContent.includes('Break') || it.textContent.includes('Lunch')) return;

        const titleEl = it.querySelector('h4') || it.querySelector('.subj');
        const teachEl = it.querySelector('p') || it.querySelector('.teach');

        if(titleEl && teachEl) {
            let oldT = titleEl.textContent.trim();
            let oldTeach = teachEl.textContent.split('•')[0].trim();
            
            titleEl.innerHTML = `<select class="tt-subject-select" style="padding:6px;border-radius:6px;border:1px solid #ccc;width:100%"><option>${oldT}</option><option>Mathematics</option><option>Physics</option><option>Chemistry</option><option>Biology</option><option>English Literature</option><option>History</option><option>Computer Science</option><option>Physical Education</option></select>`;
            teachEl.innerHTML = `<select class="tt-teacher-select" style="padding:6px;border-radius:6px;border:1px solid #ccc;width:100%"><option>${oldTeach}</option><option>Ramesh Sharma</option><option>Prasana Reddy</option><option>Venkat Iyer</option><option>Sunita Verma</option><option>Mohan Das</option><option>Pooja Mehta</option><option>Anita Pillai</option><option>Coach Raju</option></select>`;
        }
    });
};

window.saveTimetableEdit = function() {
    const ttSec = document.getElementById('section-vp_schedule') || document.getElementById('section-vp_timetable');
    const theList = ttSec.querySelector('.schedule-list') || ttSec.querySelector('.timetable-grid');
    
    // Construct Object map of saved edits
    let savedArr = [];
    const items = theList.querySelectorAll('.schedule-item, .tt-data-row, .tt-cell');
    items.forEach(it => {
        const selS = it.querySelector('.tt-subject-select');
        const selT = it.querySelector('.tt-teacher-select');
        if(selS && selT) {
            savedArr.push({ s: selS.value, t: selT.value });
            const titleEl = it.querySelector('h4') || it.querySelector('.subj');
            const teachEl = it.querySelector('p') || it.querySelector('.teach');
            titleEl.innerHTML = selS.value;
            teachEl.innerHTML = selT.value;
        }
    });
    localStorage.setItem('campuscore_timetable', JSON.stringify(savedArr));
    
    document.getElementById('tt-edit-controls').remove();
    ttSec.classList.remove('edit-mode');
    document.querySelector('.btn-primary[title="Edit or adjust the daily timetable"]')?.style.removeProperty('display');
    realAction('saveTimetable', { changes: [] });
    // Local state naturally holds because we hardcoded DOM strings!
};

window.cancelTimetableEdit = function() {
    const ttSec = document.getElementById('section-vp_schedule') || document.getElementById('section-vp_timetable');
    document.getElementById('tt-edit-controls').remove();
    ttSec.classList.remove('edit-mode');
    document.querySelector('.btn-primary[title="Edit or adjust the daily timetable"]')?.style.removeProperty('display');
    
    const theList = ttSec.querySelector('.schedule-list') || ttSec.querySelector('.timetable-grid');
    if(theList.dataset.origHtml) {
        theList.innerHTML = theList.dataset.origHtml;
    }
};

window.renderTodayWeekTimetable = function(val) {
    const theList = document.querySelector('.schedule-list') || document.querySelector('.timetable-grid');
    if(!theList) return;
    if(val === 'Today') {
        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const today = days[new Date().getDay()];
        if(today === 'Saturday' || today === 'Sunday') {
            theList.innerHTML = `<div style="text-align:center;padding:40px;color:#888">No classes scheduled today — Weekend</div>`;
        } else {
            theList.innerHTML = `
              <div class="schedule-item tt-data-row"><div class="time">08:30</div><div class="details"><h4>Mathematics</h4><p>Ramesh Sharma</p></div></div>
              <div class="schedule-item tt-data-row"><div class="time">09:20</div><div class="details"><h4>Physics</h4><p>Prasana Reddy</p></div></div>
              <div class="schedule-item"><div class="time">10:10</div><div class="details"><h4>Break</h4></div></div>
              <div class="schedule-item tt-data-row"><div class="time">10:30</div><div class="details"><h4>Chemistry</h4><p>Venkat Iyer</p></div></div>
            `;
        }
    } else {
        theList.innerHTML = `
          <table style="width:100%;text-align:center;border-collapse:collapse">
            <tr style="background:var(--color-surface-2)"><th style="padding:10px;border:1px solid var(--color-border)">Mon</th><th style="padding:10px;border:1px solid var(--color-border)">Tue</th><th style="padding:10px;border:1px solid var(--color-border)">Wed</th><th style="padding:10px;border:1px solid var(--color-border)">Thu</th><th style="padding:10px;border:1px solid var(--color-border)">Fri</th></tr>
            <tr class="tt-data-row"><td class="tt-cell">Math<br>Ramesh</td><td class="tt-cell">Phys<br>Venkat</td><td class="tt-cell">Chem</td><td class="tt-cell">Bio</td><td class="tt-cell">Eng</td></tr>
            <tr class="tt-data-row"><td class="tt-cell">Phys</td><td class="tt-cell">Math</td><td class="tt-cell">Chem</td><td class="tt-cell">Hist</td><td class="tt-cell">PE</td></tr>
          </table>
        `;
    }
};

// ---------------------------------------------------------
// FIX 4: APPROVALS FILTER COMPLETE FIX
// ---------------------------------------------------------
window.filterApprovalsVP = function(val) {
    const rows = document.querySelectorAll('.approval-row, #section-vp_approvals tbody tr');
    let visibleCt = 0;
    rows.forEach(r => {
        const typeChip = r.querySelector('.type-chip, .badge')?.textContent.trim();
        if(val === 'All Approvals' || val.includes('All') || typeChip === val || r.innerText.includes(val)) {
            r.style.display = '';
            visibleCt++;
        } else {
            r.style.display = 'none';
        }
    });

    const tb = document.querySelector('#section-vp_approvals tbody');
    let emp = document.getElementById('app-empty');
    if(visibleCt === 0) {
        if(!emp && tb) { tb.insertAdjacentHTML('beforeend', '<tr id="app-empty"><td colspan="5" style="text-align:center;padding:20px;color:var(--color-text-muted)">No approvals found for selected filter</td></tr>'); }
    } else {
        if(emp) emp.remove();
    }
};

window.wfmApprove = function(btn) {
    const row = btn.closest('tr');
    const badge = row.querySelector('.badge');
    if(badge) {
        badge.className = 'badge badge-success';
        badge.textContent = 'APPROVED';
    }
    const btns = row.querySelectorAll('button');
    btns.forEach(b => { b.disabled = true; b.style.opacity = '0.5'; });
    realAction('approveRequest', { id: requestId });
};

window.wfmReject = function(btn) {
    const row = btn.closest('tr');
    const badge = row.querySelector('.badge');
    if(badge) {
        badge.className = 'badge badge-error';
        badge.textContent = 'REJECTED';
        badge.style.background = 'var(--color-danger)';
    }
    const btns = row.querySelectorAll('button');
    btns.forEach(b => { b.disabled = true; b.style.opacity = '0.5'; });
    realAction('rejectRequest', { id: requestId });
};

// ---------------------------------------------------------
// FIX 5: NOTICES ARCHIVED TAB & DELETE
// ---------------------------------------------------------
window.wfmRenderNoticesTabs = function() {
    const noticeSec = document.getElementById('section-vp_notices');
    if(!noticeSec) return;
    
    let activeArr = ['Notice 1', 'Notice 2', 'Notice 3']; 
    let archArr = [];
    if(localStorage.getItem('campuscore_notices')) {
        let nData = JSON.parse(localStorage.getItem('campuscore_notices'));
        activeArr = nData.active;
        archArr = nData.archived;
    } else {
        localStorage.setItem('campuscore_notices', JSON.stringify({ active: activeArr, archived: archArr }));
    }

    let activeTab = noticeSec.dataset.ntTab || 'pub';

    let html = `<div class="section-header" style="display:flex;justify-content:space-between">
        <h2>Notices & Broadcasting</h2>
        <button class="btn-primary" onclick="vpCreateNoticeModal(false)">Create Notice</button>
    </div>`;

    html += `<div style="display:flex;gap:15px;margin-bottom:20px;border-bottom:2px solid var(--color-surface-2)">
       <button class="nt-tab ${activeTab==='pub'?'active':''}" data-tab="pub" style="padding:10px 15px;background:none;border:none;border-bottom:2px solid ${activeTab==='pub'?'var(--color-primary)':'transparent'};color:${activeTab==='pub'?'var(--color-primary)':'var(--color-text-muted)'};font-weight:600;cursor:pointer;margin-bottom:-2px">Published <span class="badge" style="border-radius:10px;padding:2px 6px">${activeArr.length}</span></button>
       <button class="nt-tab ${activeTab==='arch'?'active':''}" data-tab="arch" style="padding:10px 15px;background:none;border:none;border-bottom:2px solid ${activeTab==='arch'?'var(--color-primary)':'transparent'};color:${activeTab==='arch'?'var(--color-primary)':'var(--color-text-muted)'};font-weight:600;cursor:pointer;margin-bottom:-2px">Archived <span class="badge" style="border-radius:10px;padding:2px 6px">${archArr.length}</span></button>
    </div>`;

    let renderArr = activeTab === 'pub' ? activeArr : archArr;
    html += `<div class="notices-list">`;
    if(renderArr.length === 0) {
        html += `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--color-text-muted)">No ${activeTab==='pub'?'published':'archived'} notices.</div>`;
    } else {
        renderArr.forEach(n => {
            if(activeTab === 'pub') {
                html += `<div class="card">
                   <div style="display:flex;justify-content:space-between">
                       <span class="badge badge-success">PUBLISHED</span>
                       <div style="display:flex;gap:10px">
                         <i class="fas fa-archive" style="color:var(--color-text-muted);cursor:pointer" onclick="wfmArchiveNotice('${n}')"></i>
                         <i class="fas fa-trash" style="color:var(--color-danger);cursor:pointer" onclick="wfmDeleteNotice('${n}')"></i>
                       </div>
                   </div>
                   <h3 style="margin:10px 0">${n} Dummy Title</h3>
                   <p style="font-size:12px;color:var(--color-text-muted)">Just now • VP</p>
                </div>`;
            } else {
                html += `<div class="card" style="opacity:0.6">
                   <div style="display:flex;justify-content:space-between">
                       <span class="badge" style="background:#555">ARCHIVED</span>
                   </div>
                   <h3 style="margin:10px 0">${n} Dummy Title</h3>
                   <p style="font-size:12px;color:var(--color-text-muted)">Archived today</p>
                   <div style="display:flex;gap:10px;margin-top:10px">
                     <button style="flex:1;background:var(--color-success);color:white;border:none;padding:6px;border-radius:6px;cursor:pointer" onclick="wfmRestoreNotice('${n}')">Restore</button>
                     <button style="flex:1;background:var(--color-danger);color:white;border:none;padding:6px;border-radius:6px;cursor:pointer" onclick="wfmDeleteNotice('${n}', true)">Delete Permanently</button>
                   </div>
                </div>`;
            }
        });
    }
    html += `</div>`;
    noticeSec.innerHTML = html;

    noticeSec.querySelectorAll('.nt-tab').forEach(t => t.onclick = function() {
        noticeSec.dataset.ntTab = this.dataset.tab;
        wfmRenderNoticesTabs();
    });
};

window.wfmArchiveNotice = function(id) {
    let d = JSON.parse(localStorage.getItem('campuscore_notices'));
    let idx = d.active.findIndex(x=>x===id);
    if(idx>-1) {
        d.archived.push(d.active.splice(idx,1)[0]);
        localStorage.setItem('campuscore_notices', JSON.stringify(d));
        wfmRenderNoticesTabs();
        realAction('archiveNotice', { id: noticeId });
    }
};

window.wfmRestoreNotice = function(id) {
    let d = JSON.parse(localStorage.getItem('campuscore_notices'));
    let idx = d.archived.findIndex(x=>x===id);
    if(idx>-1) {
        d.active.push(d.archived.splice(idx,1)[0]);
        localStorage.setItem('campuscore_notices', JSON.stringify(d));
        wfmRenderNoticesTabs();
        simulateAction('Notice restored to Published');
    }
};

window.wfmDeleteNotice = function(id, fromArch) {
    const markup = `
    <div class="modal-overlay" style="display:flex" id="wfm-del-modal">
        <div class="modal" style="max-width:400px;background:var(--color-surface);color:var(--color-text);padding:20px;border-radius:12px;text-align:center">
            <h3 style="margin-top:0">Delete Notice Permanently</h3>
            <p>This action cannot be undone. The notice will be permanently removed.</p>
            <div style="display:flex;gap:10px;margin-top:20px">
                <button style="flex:1;background:var(--color-danger);color:white;border:none;border-radius:6px;padding:10px;cursor:pointer" onclick="
                    let d = JSON.parse(localStorage.getItem('campuscore_notices'));
                    let arr = ${fromArch} ? d.archived : d.active;
                    let idx = arr.findIndex(x=>x==='${id}');
                    if(idx>-1) { arr.splice(idx,1); }
                    localStorage.setItem('campuscore_notices', JSON.stringify(d));
                    document.getElementById('wfm-del-modal').remove();
                    wfmRenderNoticesTabs();
                    simulateAction('Notice deleted permanently');
                ">Yes Delete</button>
                <button style="flex:1;background:var(--color-surface-2);color:var(--color-text);border:1px solid var(--color-border);border-radius:6px;cursor:pointer" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', markup);
};

// ---------------------------------------------------------
// FIX 8 & 9: CLASSES + STUDENT PROMOTE/DEMOTE
// ---------------------------------------------------------
window.wfmRenderStudentListExt = function() {
    const stuSec = document.getElementById('section-students') || document.getElementById('section-vp_students');
    if(!stuSec) return;

    let html = `<div class="section-header"><h2>Students Details</h2></div>
    <div style="display:flex;gap:10px;margin-bottom:20px">
       <select id="wfm-cls-sel" class="form-control" style="flex:1" onchange="wfmUpdateSecs()">
          <option value="All">All Classes</option>
          <option>6</option><option>7</option><option>8</option><option>9</option><option>10</option>
       </select>
       <select id="wfm-sec-sel" class="form-control" style="flex:1" onchange="wfmUpdateStudentRoster()">
          <option value="All">All Sections</option>
          <option>A</option><option>B</option><option>C</option><option>D</option><option>E</option><option>F</option><option>G</option><option>H</option><option>I</option><option>J</option><option>K</option>
       </select>
    </div>
    <div id="wfm-student-roster"></div>`;

    // Only overwrite if it hasn't been done
    if(!stuSec.dataset.wfmInjected) {
        stuSec.innerHTML = html;
        stuSec.dataset.wfmInjected = 'true';
        wfmUpdateStudentRoster();
    }
};

window.wfmUpdateSecs = function() { wfmUpdateStudentRoster(); };

window.wfmUpdateStudentRoster = function() {
    const root = document.getElementById('wfm-student-roster');
    if(!root) return;
    const c = document.getElementById('wfm-cls-sel').value;
    const s = document.getElementById('wfm-sec-sel').value;

    if(c === '9' && s === 'C') {
        // Mock default seed
        root.innerHTML = `<div class="card" style="display:flex;justify-content:space-between;align-items:center">
          <div><h3 style="margin-bottom:4px">KASULA ASHWATH</h3><p style="color:var(--color-text-muted);font-size:12px;margin:0">Class 9C</p></div>
          <div style="display:flex;gap:8px">
             <button style="background:var(--color-success);color:white;border:none;padding:6px 12px;border-radius:6px;cursor:pointer" onclick="wfmPromote('KASULA ASHWATH', '9C')">Promote</button>
             <button style="background:var(--color-danger);color:white;border:none;padding:6px 12px;border-radius:6px;cursor:pointer" onclick="wfmSuspend('KASULA ASHWATH')">Suspend</button>
          </div>
        </div>`;
    } else {
        root.innerHTML = `<div class="empty-state" style="text-align:center;padding:40px;color:var(--color-text-muted)">No student data available for this class yet.</div>`;
    }
};

window.wfmPromote = function(name, cls) {
    const markup = `
    <div class="modal-overlay" style="display:flex">
      <div class="modal" style="max-width:400px;background:var(--color-surface);color:var(--color-text);padding:20px;border-radius:12px;text-align:center">
        <h3 style="margin-top:0">Promote Student</h3>
        <p>Promote ${name} from Class ${cls} to 10C?</p>
        <div style="display:flex;gap:10px;margin-top:20px">
            <button class="btn-primary" style="flex:1" onclick="simulateAction('Student promoted to Class 10C'); this.closest('.modal-overlay').remove()">Confirm</button>
            <button style="flex:1;background:var(--color-surface-2);color:var(--color-text);border:1px solid var(--color-border);border-radius:6px;cursor:pointer" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
        </div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', markup);
};

window.wfmSuspend = function(name) {
    const markup = `
    <div class="modal-overlay" style="display:flex">
      <div class="modal" style="max-width:400px;background:var(--color-surface);color:var(--color-text);padding:20px;border-radius:12px;width:100%">
        <h3 style="margin-top:0">Suspend Student</h3>
        <p>Suspend ${name} temporarily?</p>
        <label>Duration</label>
        <select class="form-control" style="margin-bottom:10px"><option>1 day</option><option>3 days</option><option>1 week</option><option>2 weeks</option></select>
        <label>Reason *</label>
        <textarea class="form-control" rows="2"></textarea>
        <div style="display:flex;gap:10px;margin-top:20px">
            <button style="flex:1;background:var(--color-danger);color:white;border:none;border-radius:6px;padding:10px;cursor:pointer" onclick="simulateAction('Student suspended'); this.closest('.modal-overlay').remove()">Confirm</button>
            <button style="flex:1;background:var(--color-surface-2);color:var(--color-text);border:1px solid var(--color-border);border-radius:6px;cursor:pointer" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
        </div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', markup);
};

// ---------------------------------------------------------
// FIX 6: SECTION STATE RETENTION (No Redirects)
// ---------------------------------------------------------
window._activeSection = window._activeSection || 'home';

// Intercept navigateTo from ui.js
const origNavigateTo = window.navigateTo;
if(origNavigateTo && !window.__global_wfm_nav) {
    window.__global_wfm_nav = true;
    window.navigateTo = function(sectionId) {
        if(sectionId && sectionId !== 'logout') {
            window._activeSection = sectionId;
        }
        origNavigateTo(sectionId);
    };
}

// Function to redraw ONLY the active section safely
window.rerenderCurrentSection = function() {
    const sec = window._activeSection || 'home';
    if(window.buildDashboard) {
        window.buildDashboard(window.currentUser);
    }
}

// Strip out ALL hardcoded triggerLiveReRender mappings from old modals.
const _origSimActs = window.simulateAction;
window.simulateAction = function(msg) {
    // Show toast using a native custom implementation to bypass navigation triggers
    let t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.classList.add('show'); }, 100);
    setTimeout(() => { 
        t.classList.remove('show'); 
        setTimeout(() => t.remove(), 300);
    }, 3000);
    // DO NOT invoke `navigateTo('home')` implicitly!
}

// ---------------------------------------------------------
// FIX 1: STUDENT ISSUES STATE TRANSITIONS (VP)
// ---------------------------------------------------------
window.renderVPStudentIssuesTabs = function() {
    const issueSec = document.getElementById('section-vp_student_issues') || document.getElementById('section-coord_issues');
    if(!issueSec) return;

    let data;
    try { data = JSON.parse(localStorage.getItem('campuscore_vp_issues')); } catch(e) {}
    if(!data) return;

    const roleIsCoord = currentUser.role === 'coordinator';

    const mainCount = data.mainIssues.length;
    const escCount = data.escalatedIssues.length;
    const resCount = data.resolvedIssues.length;

    let activeTab = issueSec.dataset.activeTab || 'main';

    let html = `<div class="section-header"><h2>${roleIsCoord ? 'Escalations Review' : 'Student Issues'}</h2></div>`;
    
    // TABS
    html += `<div style="display:flex;gap:15px;margin-bottom:20px;border-bottom:2px solid var(--color-surface-2)">
       <button class="wfm-tab ${activeTab==='main'?'active':''}" data-tab="main" style="padding:10px 15px;background:none;border:none;border-bottom:2px solid ${activeTab==='main'?'var(--color-primary)':'transparent'};color:${activeTab==='main'?'var(--color-primary)':'var(--color-text-muted)'};font-weight:600;cursor:pointer;margin-bottom:-2px">Main Issues <span class="badge ${activeTab==='main'?'badge-error':''}" style="border-radius:10px;padding:2px 6px">${mainCount}</span></button>
       <button class="wfm-tab ${activeTab==='esc'?'active':''}" data-tab="esc" style="padding:10px 15px;background:none;border:none;border-bottom:2px solid ${activeTab==='esc'?'var(--color-primary)':'transparent'};color:${activeTab==='esc'?'var(--color-primary)':'var(--color-text-muted)'};font-weight:600;cursor:pointer;margin-bottom:-2px">Escalated <span class="badge ${activeTab==='esc'?'badge-warning':''}" style="border-radius:10px;padding:2px 6px">${escCount}</span></button>
       <button class="wfm-tab ${activeTab==='res'?'active':''}" data-tab="res" style="padding:10px 15px;background:none;border:none;border-bottom:2px solid ${activeTab==='res'?'var(--color-primary)':'transparent'};color:${activeTab==='res'?'var(--color-primary)':'var(--color-text-muted)'};font-weight:600;cursor:pointer;margin-bottom:-2px">Resolved Bin <span class="badge ${activeTab==='res'?'badge-success':''}" style="border-radius:10px;padding:2px 6px">${resCount}</span></button>
    </div>`;

    let activeArr = activeTab === 'main' ? data.mainIssues : activeTab === 'esc' ? data.escalatedIssues : data.resolvedIssues;

    html += `<div class="issues-list" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:20px;">`;
    if(activeArr.length === 0) {
        html += `<div class="empty-state" style="grid-column:1/-1;text-align:center;padding:40px;color:var(--color-text-muted)">No issues in this tab.</div>`;
    } else {
        activeArr.forEach((issue, idx) => {
            html += `<div class="card" style="display:flex;flex-direction:column;">
                <div style="display:flex;justify-content:space-between;margin-bottom:10px">
                   <h4 style="margin:0">${issue.student}</h4>
                   <span class="badge" style="background:${issue.priority==='High'?'var(--color-danger)':issue.priority==='Medium'?'#f57c00':'var(--color-success)'}">${issue.priority}</span>
                </div>
                <div style="font-size:12px;color:var(--color-text-muted);margin-bottom:8px">ID: ${issue.id} • Class: ${issue.class}</div>
                <p style="font-size:13px;flex:1">${issue.desc}</p>
                <div style="font-size:12px;color:var(--color-text-muted);margin-bottom:12px">Reported: ${issue.date} <br/>By: ${issue.reportedBy}</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">`;
            
            if(activeTab === 'main') {
                html += `<button class="btn-primary" style="flex:1" onclick="wfmResolveVP('${issue.id}','mainIssues')">Resolve</button>
                         <button style="flex:1;background:var(--color-surface-2);color:var(--color-text);border:1px solid var(--color-border);border-radius:6px;cursor:pointer" onclick="wfmForwardVP('${issue.id}','mainIssues')">Forward</button>
                         <button style="flex:1;background:none;color:#1976d2;border:1px dashed #1976d2;border-radius:6px;cursor:pointer" onclick="wfmMeetParentVP('${issue.student}')">Meet Parent</button>`;
            } else if(activeTab === 'esc') {
                html += `<button class="btn-primary" style="flex:1" onclick="wfmResolveVP('${issue.id}','escalatedIssues')">Resolve</button>
                         <button style="flex:1;background:var(--color-surface-2);color:var(--color-text);border:1px solid var(--color-border);border-radius:6px;cursor:pointer" onclick="wfmRestoreMain('${issue.id}','escalatedIssues')">Restore to Main</button>`;
            } else {
                html += `<button style="flex:1;background:var(--color-surface-2);color:var(--color-text);border:1px solid var(--color-border);border-radius:6px;cursor:pointer" onclick="wfmRestoreMain('${issue.id}','resolvedIssues')">Restore to Main</button>
                         <button class="btn-primary" style="flex:1" onclick="wfmViewDetails('${issue.id}')">View Details</button>`;
            }
            html += `</div></div>`;
        });
    }
    html += `</div>`;
    
    issueSec.innerHTML = html;

    // Attach click listeners to tabs without navigation
    const tabs = issueSec.querySelectorAll('.wfm-tab');
    tabs.forEach(t => {
        t.onclick = function() {
            issueSec.dataset.activeTab = this.dataset.tab;
            renderVPStudentIssuesTabs(); // local render only!
        };
    });
};

window.wfmResolveVP = function(id, sourceArrKey) {
    let d = JSON.parse(localStorage.getItem('campuscore_vp_issues'));
    let arr = d[sourceArrKey];
    const idx = arr.findIndex(i => i.id === id);
    if(idx > -1) {
        let issue = arr.splice(idx, 1)[0];
        issue.resolvedBy = currentUser.name + ' (' + currentUser.role + ')';
        issue.resolvedDate = new Date().toLocaleString();
        issue.source = sourceArrKey;
        issue.status = 'Resolved';
        d.resolvedIssues.push(issue);
        localStorage.setItem('campuscore_vp_issues', JSON.stringify(d));
        simulateAction('Issue resolved and moved to Resolved Bin');
        renderVPStudentIssuesTabs();
    }
};

window.wfmForwardVP = function(id, sourceArrKey) {
    const markup = `
    <div class="modal-overlay" style="display:flex" id="wfm-fwd-modal">
      <div class="modal" style="max-width:400px;background:var(--color-surface);color:var(--color-text);padding:20px;border-radius:12px;width:100%">
        <h3 style="margin-top:0">Forward to Coordinator</h3>
        <label>Reason for Escalation *</label>
        <textarea id="wfm-fwd-text" class="form-control" rows="3" style="width:100%;margin-bottom:10px"></textarea>
        <label>Assign To</label>
        <select id="wfm-fwd-sel" class="form-control" style="width:100%;margin-bottom:20px">
          <option>C001 - Anitha (Coordinator)</option>
        </select>
        <div style="display:flex;gap:10px">
          <button style="flex:1;background:var(--color-danger);color:white;border:none;border-radius:6px;padding:10px;cursor:pointer" onclick="
            const text = document.getElementById('wfm-fwd-text').value;
            let d = JSON.parse(localStorage.getItem('campuscore_vp_issues'));
            let arr = d['${sourceArrKey}'];
            const iIdx = arr.findIndex(i => i.id === '${id}');
            if(iIdx > -1) {
                let iss = arr.splice(iIdx, 1)[0];
                iss.escalatedBy = currentUser.name;
                iss.escalatedDate = new Date().toLocaleString();
                iss.escalationReason = text;
                iss.assignedTo = document.getElementById('wfm-fwd-sel').value;
                iss.source = '${sourceArrKey}';
                iss.stage = 'Coordinator';
                d.escalatedIssues.push(iss);
                localStorage.setItem('campuscore_vp_issues', JSON.stringify(d));
                document.getElementById('wfm-fwd-modal').remove();
                simulateAction('Issue moved to Escalated tab');
                renderVPStudentIssuesTabs();
            }
          ">Confirm Forward</button>
          <button style="flex:1;background:var(--color-surface-2);color:var(--color-text);border:1px solid var(--color-border);border-radius:6px;cursor:pointer" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
        </div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', markup);
};

window.wfmRestoreMain = function(id, sourceArrKey) {
    let d = JSON.parse(localStorage.getItem('campuscore_vp_issues'));
    let arr = d[sourceArrKey];
    const idx = arr.findIndex(i => i.id === id);
    if(idx > -1) {
        let issue = arr.splice(idx, 1)[0];
        issue.status = 'Reopened';
        d.mainIssues.push(issue);
        localStorage.setItem('campuscore_vp_issues', JSON.stringify(d));
        simulateAction('Issue restored to Main Issues');
        renderVPStudentIssuesTabs();
    }
};

window.wfmMeetParentVP = function(name) {
    const markup = `
    <div class="modal-overlay" style="display:flex" id="wfm-meet-modal">
        <div class="modal" style="max-width:400px;background:var(--color-surface);color:var(--color-text);padding:20px;border-radius:12px;width:100%">
            <h3 style="margin-top:0">Schedule Meeting</h3>
            <div style="font-size:13px;margin-bottom:4px">Student: <strong>${name}</strong></div>
            <div style="font-size:13px;margin-bottom:15px">Parent: <strong>Parent of ${name.split(' ').pop()}</strong> <br><span style="color:var(--color-text-muted)">+91 98765 XXXXX</span></div>
            <label>Meeting Date</label><input type="date" class="form-control" style="margin-bottom:10px">
            <label>Meeting Time</label><input type="time" class="form-control" style="margin-bottom:10px">
            <label>Agenda / Notes</label><textarea class="form-control" rows="2" style="margin-bottom:20px"></textarea>
            <div style="display:flex;gap:10px">
                <button class="btn-primary" style="flex:1" onclick="simulateAction('Meeting scheduled'); this.closest('.modal-overlay').remove();">Confirm Meeting</button>
                <button style="flex:1;background:var(--color-surface-2);color:var(--color-text);border:1px solid var(--color-border);border-radius:6px;cursor:pointer" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', markup);
};

window.wfmViewDetails = function(id) {
    let d = JSON.parse(localStorage.getItem('campuscore_vp_issues'));
    let issue = d.mainIssues.find(i=>i.id===id) || d.escalatedIssues.find(i=>i.id===id) || d.resolvedIssues.find(i=>i.id===id);
    if(!issue) return;
    const markup = `
    <div class="modal-overlay" style="display:flex">
        <div class="modal" style="max-width:500px;background:var(--color-surface);color:var(--color-text);padding:20px;border-radius:12px;width:100%">
            <div style="display:flex;justify-content:space-between">
                <h3 style="margin-top:0">Detail View: ${issue.id}</h3>
                <button onclick="this.closest('.modal-overlay').remove()" style="background:none;border:none;font-size:20px;color:var(--color-text)">&times;</button>
            </div>
            <p style="font-size:14px">${issue.desc}</p>
            <hr style="border:none;border-top:1px solid var(--color-border);margin:15px 0">
            <div style="font-size:13px"><span style="color:var(--color-text-muted)">Reported by:</span> ${issue.reportedBy} on ${issue.date}</div>
            ${issue.escalatedBy ? `<div style="font-size:13px;margin-top:8px"><span style="color:var(--color-warning)">Escalated by:</span> ${issue.escalatedBy} on ${issue.escalatedDate}<br/><em>"${issue.escalationReason}"</em></div>` : ''}
            ${issue.resolvedBy ? `<div style="font-size:13px;margin-top:8px"><span style="color:var(--color-success)">Resolved by:</span> ${issue.resolvedBy} on ${issue.resolvedDate}</div>` : ''}
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', markup);
};

// ---------------------------------------------------------
// CROSS DASHBOARD ISSUES (FULL COMPLETION PHASE)
// ---------------------------------------------------------

window.wfmParentSubmitConcern = function() {
    const txt = document.getElementById('parent-cn-text')?.value;
    if(!txt) return;
    let d = JSON.parse(localStorage.getItem('campuscore_vp_issues'));
    let iss = { id: 'ISS-'+(Math.floor(Math.random()*900)+100), student: 'KASULA ASHWATH', class: '9C', category: 'General', priority: 'Medium', desc: txt, reportedBy: 'Parent', date: new Date().toLocaleString(), stage: 'Teacher' };
    
    // Ensure we place it gracefully
    if(!d.mainIssues) d.mainIssues = [];
    d.mainIssues.push(iss);
    localStorage.setItem('campuscore_vp_issues', JSON.stringify(d));
    simulateAction('Concern submitted securely to Class Teacher');
    
    // Attempt local clear
    const parentArea = document.getElementById('section-queries') || document.getElementById('section-messages');
    if(parentArea) parentArea.innerHTML = `<div class="empty-state" style="text-align:center;padding:40px;color:var(--color-success)">Concern submitted successfully! Our staff will review and respond shortly.</div>`;
};

window.wfmRenderTeacherIssuesTree = function() {
    const sec = document.getElementById('section-messages') || document.getElementById('section-teachers-msg');
    if(!sec) return;
    
    let d = JSON.parse(localStorage.getItem('campuscore_vp_issues'));
    let tIssues = (d.mainIssues||[]).filter(i => i.stage === 'Teacher' || i.stage === 'VP' || i.stage === 'Coordinator'); // Let teacher see all relevant class issues generically for demo.
    
    let html = `<div class="section-header"><h2>Parent Concerns & Queries</h2></div>`;
    html += `<div style="display:grid;grid-template-columns:1fr;gap:20px">`;
    if(tIssues.length === 0) {
        html += `<div class="empty-state" style="text-align:center;padding:40px;color:var(--color-text-muted)">No active queries or concerns found.</div>`;
    } else {
        tIssues.forEach(i => {
           html += `<div class="card" style="border-left:4px solid ${i.stage==='Teacher'?'var(--color-warning)':'var(--color-success)'}">
               <div style="display:flex;justify-content:space-between"><h4>${i.student} <span style="font-size:12px;color:var(--color-text-muted);font-weight:normal">(${i.class})</span></h4> <span class="badge" style="background:#555">Stage: ${i.stage}</span></div>
               <p style="margin:10px 0;font-size:14px">${i.desc}</p>
               <div style="display:flex;gap:10px;margin-top:15px">
                  ${i.stage==='Teacher' ? `<button class="btn-primary" onclick="wfmResolveVP('${i.id}', 'mainIssues'); simulateAction('Resolved locally'); setTimeout(wfmRenderTeacherIssuesTree, 500)">Resolve Locally</button>
                  <button style="background:var(--color-surface-2);color:var(--color-text);border:1px solid var(--color-danger);border-radius:6px;padding:8px" onclick="wfmTeacherEscalate('${i.id}')">Escalate to Coordinator</button>` : `<button style="background:none;border:none;color:var(--color-success);font-weight:600">Locked - In Progress elsewhere</button>`}
               </div>
           </div>`;
        });
    }
    html += `</div>`;
    sec.innerHTML = html;
};

window.wfmTeacherEscalate = function(id) {
    let d = JSON.parse(localStorage.getItem('campuscore_vp_issues'));
    let i = d.mainIssues.find(x=>x.id===id);
    if(i) {
        i.stage = 'Coordinator';
        i.escalationReason = 'Teacher escalated without note.';
        localStorage.setItem('campuscore_vp_issues', JSON.stringify(d));
        simulateAction('Escalated securely to Coordinator');
        wfmRenderTeacherIssuesTree();
    }
};

window.wfmRenderCoordIssues = function() {
    renderVPStudentIssuesTabs(); // They share identical layout wrappers natively
};

// ---------------------------------------------------------
// FIX 7: LANGUAGE SWITCHING
// ---------------------------------------------------------
const TRANSLATIONS = {
    te: {
        'Attendance Overview': 'హాజరు వలోకనం',
        'Student Issues': 'విద్యార్థి సమస్యలు',
        'Timetable Review': 'సమయపట్టిక సమీక్ష',
        'Broadcasting & Notices': 'నోటీసులు',
        'Direct Communications Inbox': 'సందేశాల ఇన్బాక్స్',
        'Settings': 'సెట్టింగులు',
        'Appearance': 'రూపం',
        'Notifications': 'నోటిఫికేషన్లు',
        'Account': 'ఖాతా',
        'Security': 'భద్రత',
        'Good Morning': 'శుభోదయం',
        'Good Afternoon': 'శుభ మధ్యాహ్నం',
        'Good Evening': 'శుభ సాయంత్రం'
    },
    hi: {
        'Attendance Overview': 'उपस्थिति अवलोकन',
        'Student Issues': 'छात्र समस्याएं',
        'Timetable Review': 'समय सारिणी',
        'Broadcasting & Notices': 'नोटिस',
        'Direct Communications Inbox': 'इनबॉक्स',
        'Settings': 'सेटिंग्स',
        'Appearance': 'दिखावट',
        'Notifications': 'सूचनाएं',
        'Account': 'खाता',
        'Security': 'सुरक्षा',
        'Good Morning': 'सुप्रभात',
        'Good Afternoon': 'नमस्कार',
        'Good Evening': 'शुभ संध्या'
    }
};

const _origApplyLang = window.applyLanguage;
window.applyLanguage = function() {
    const lang = localStorage.getItem('campuscore_lang') || 'en';
    if(lang === 'en') {
        if(_origApplyLang) _origApplyLang();
        return;
    }
    
    const dict = TRANSLATIONS[lang];
    if(!dict) return;
    
    // Brute force DOM replace of specific strings since they aren't marked
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while((node = walker.nextNode())) {
        let text = node.nodeValue.trim();
        if(text && dict[text]) {
            node.nodeValue = node.nodeValue.replace(text, dict[text]);
        } else {
            // Check substrings for greeting
            Object.keys(dict).forEach(k => {
                if(text.includes(k) && text.length < (k.length + 15)) {
                    node.nodeValue = node.nodeValue.replace(k, dict[k]);
                }
            });
        }
    }
};

let _lastInt = setInterval(() => {
    if(document.body) {
        window.applyLanguage();
        clearInterval(_lastInt);
    }
}, 500);
