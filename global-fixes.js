// ========================================================================
// CAMPUSCORE GLOBAL FIXES (Phase 4 Final Pass)
// ========================================================================

// ---------------------------------------------------------
// FIX 6: LANGUAGE SETTING
// ---------------------------------------------------------
const VOCAB = {
  English: {}, // Fallback
  Hindi: {
    'Dashboard': 'डैशबोर्ड',
    'My Profile': 'मेरी प्रोफ़ाइल',
    'Attendance': 'उपस्थिति',
    'Homework': 'गृहकार्य',
    'Notices': 'सूचनाएं',
    'Messages': 'संदेश',
    'Settings': 'सेटिंग्स',
    'Logout': 'लॉगआउट',
    'Save': 'सहेजें',
    'Cancel': 'रद्द करें',
    'Submit': 'जमा करें',
    'Good Morning': 'सुप्रभात',
    'Good Afternoon': 'नमस्कार',
    'Good Evening': 'शुभ संध्या'
  },
  Telugu: {
    'Dashboard': 'డాష్బోర్డ్',
    'My Profile': 'నా ప్రొఫైల్',
    'Attendance': 'హాజరు',
    'Homework': 'గృహపాఠం',
    'Notices': 'నోటీసులు',
    'Messages': 'సందేశాలు',
    'Settings': 'సెట్టింగులు',
    'Logout': 'లాగ్అవుట్',
    'Save': 'సేవ్ చేయి',
    'Cancel': 'రద్దు చేయి',
    'Submit': 'సమర్పించు',
    'Good Morning': 'శుభోదయం',
    'Good Afternoon': 'శుభ మధ్యాహ్నం',
    'Good Evening': 'శుభ సాయంత్రం'
  }
};

function applyLanguage() {
  const langKey = currentUser ? localStorage.getItem('campuscore_language_' + currentUser.id) : 'English';
  const lang = langKey || 'English';
  if (lang === 'English') return; // Nothing to change natively

  const map = VOCAB[lang];
  if (!map) return;

  // Replace text everywhere safely using basic text matching on specific targets
  document.querySelectorAll('.menu-link, .menu-section-label, .qa-label, h2, h3, button, span').forEach(el => {
    // Only replace direct text nodes to avoid destroying HTML structure
    for (let node of el.childNodes) {
      if (node.nodeType === 3) { // Text node
        const trim = node.nodeValue.trim();
        if (map[trim]) {
          node.nodeValue = node.nodeValue.replace(trim, map[trim]);
        } else {
            // Check substrings for Greetings
            Object.keys(map).forEach(k => {
                if(trim.includes(k) && (k.startsWith('Good'))) {
                    node.nodeValue = node.nodeValue.replace(k, map[k]);
                }
            });
        }
      }
    }
  });
}

function openLanguageModal() {
  const currentLang = localStorage.getItem('campuscore_language_' + currentUser.id) || 'English';
  const m = `<div class="modal-overlay" id="lang-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:350px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
        <h3 style="margin:0">Select Language</h3>
      </div>
      <div class="form-group">
        <select class="form-control" id="lang-select">
          <option ${currentLang === 'English' ? 'selected' : ''}>English</option>
          <option ${currentLang === 'Hindi' ? 'selected' : ''}>Hindi</option>
          <option ${currentLang === 'Telugu' ? 'selected' : ''}>Telugu</option>
        </select>
        <div style="display:flex;gap:10px;margin-top:15px">
          <button class="btn-primary" style="flex:1" onclick="
            localStorage.setItem('campuscore_language_' + currentUser.id, document.getElementById('lang-select').value);
            document.getElementById('lang-modal').remove();
            simulateAction('Language updated!');
            if(window.triggerLiveReRender) window.triggerLiveReRender();
          ">Save</button>
          <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('lang-modal').remove()">Cancel</button>
        </div>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}


// ---------------------------------------------------------
// FIX 7: DOWNLOAD MY DATA
// ---------------------------------------------------------
function downloadMyData() {
  if (!currentUser) return;
  const d = new Date().toISOString();
  let data = {
    role: currentUser.role,
    userId: currentUser.id,
    exportDate: d,
    school: "DPS Nadergul",
    settings: {
        language: localStorage.getItem('campuscore_language_' + currentUser.id) || 'English'
    }
  };

  if (currentUser.role === 'vice_principal') {
    data.name = "SUMAN";
    data.email = "vp@dpsnadergul.edu.in";
    data.activitySummary = {
        totalIssuesResolved: localStorage.getItem('campuscore_vp_issues_res') || 0,
        totalNoticesPublished: localStorage.getItem('campuscore_notice_save') ? 1 : 0
    };
  } else if (currentUser.role === 'student') {
    data.name = currentUser.name;
    data.class = "9C";
    data.attendance = { overall: "92%" };
    data.results = { Math: "A", Physics: "A-" };
  } else if (currentUser.role === 'parent') {
    data.linkedStudent = currentUser.name.replace(' Parent', '');
    data.childAttendance = { overall: "92%" };
  } else if (currentUser.role === 'teacher') {
    data.name = currentUser.name;
    data.assignedClasses = ["9C", "10A"];
  }

  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `campuscore_${currentUser.role}_data_${currentUser.id}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  simulateAction('Your data has been downloaded');
}

// ---------------------------------------------------------
// FIX 8 & 9: ALL BUTTONS AUDIT / TOAST REPLACEMENTS
// ---------------------------------------------------------

function openGenericModal(title, bodyHtml, confirmText = 'Confirm', confirmActionStr = '') {
  const m = `<div class="modal-overlay" id="generic-modal-${Date.now()}" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:500px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
        <h3 style="margin:0">${title}</h3>
        <button onclick="this.closest('.modal-overlay').remove()" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--color-text)">&times;</button>
      </div>
      <div class="form-group" style="font-size:14px;color:var(--color-text)">
        ${bodyHtml}
        ${confirmActionStr ? `
        <div style="display:flex;gap:10px;margin-top:20px">
          <button class="btn-primary" style="flex:1" onclick="${confirmActionStr}; this.closest('.modal-overlay').remove();">
            ${confirmText}
          </button>
          <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
        </div>` : ''}
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

function applyGlobalButtonFixes() {
    // Parent Comm Modals
    const ps = document.querySelectorAll('button');
    ps.forEach(btn => {
        const text = btn.textContent.trim();
        // Skip if already wired by vp-fixes or UI native hooks (indicated by presence of an onclick)
        if (text === 'Change Password' && !btn.onclick) {
            btn.onclick = openChangePasswordModal; // Already defined maybe? If not fallback to generic
        }
        if (text === 'Edit Profile' && !btn.onclick) {
            btn.onclick = () => openGenericModal('Edit Profile', '<label>Phone</label><input class="form-control" value="9876543210"><label style="margin-top:10px">Email</label><input class="form-control" value="user@mail.com">', 'Save Profile', 'simulateAction(\'Profile updated\')');
        }
        if (text === 'Language' && !btn.onclick) {
            btn.onclick = openLanguageModal;
        }
        if (text.includes('View Syllabus') && !btn.onclick) {
            btn.onclick = () => openGenericModal('Detailed Syllabus', '<p>Term 2 Examination:<br><br><b>Math:</b> Chapters 5,6,7<br><b>Science:</b> Chapters 10,11<br><b>English:</b> Modules 3-5</p>');
        }
        if (text.includes('View Details') && !btn.onclick) {
             btn.onclick = () => openGenericModal('Homework Details', '<p>Complete the physics worksheet questions 1 to 20. Submission expected by tomorrow morning via portal upload or physically in class.</p>');
        }
        if (text.includes('Read More') && !btn.onclick) {
             btn.onclick = () => openGenericModal('Notice', '<p>This is the full descriptive body of the selected notice indicating school policies and calendar updates...</p>');
        }
        if (text === 'Submit Query' && !btn.onclick) {
             btn.onclick = window.wfmParentSubmitConcern;
        }
    });

    if(!window.openChangePasswordModal) {
        window.openChangePasswordModal = function() {
            openGenericModal('Change Password', `
                <label>Current Password</label><input type="password" class="form-control">
                <label style="margin-top:10px">New Password</label><input type="password" class="form-control">
                <label style="margin-top:10px">Confirm Password</label><input type="password" class="form-control">
            `, 'Update Password', "simulateAction('Password successfully updated')");
        }
    }
}

// ---------------------------------------------------------
// FIX 1: TIMETABLE EDIT & FIX 2: FILTERS & FIX 3,4 REWRITES
// This hook intercepts the DOM right after render
// ---------------------------------------------------------

window.vpEditTimetable = function() {
  const ttSection = document.getElementById('section-vp_schedule') || document.getElementById('section-vp_timetable');
  if(!ttSection) return;
  const theList = ttSection.querySelector('.schedule-list') || ttSection.querySelector('.timetable-grid');
  
  if(theList && !theList.dataset.editing) {
    theList.dataset.editing = 'true';
    const items = theList.querySelectorAll('.schedule-item, .tt-cell');
    
    items.forEach((it, idx) => {
        const titleEl = it.querySelector('h4') || it.querySelector('.subj') || it;
        const teachEl = it.querySelector('p') || it.querySelector('.teach');
        
        let oldT = titleEl.textContent || 'Mathematics';
        let oldTeach = teachEl ? teachEl.textContent : 'Ramesh Sharma';
        
        // Ensure proper splits if it's a mock mock
        if(oldTeach.includes('•')) oldTeach = oldTeach.split('•')[0].trim();
        
        // Subject Dropdown
        const sHtml = `<select class="form-control" style="margin-bottom:5px;font-size:12px;padding:4px">
            <option>${oldT}</option><option>Mathematics</option><option>Physics</option><option>Chemistry</option>
            <option>Biology</option><option>English Literature</option><option>History</option>
            <option>Computer Science</option><option>Physical Education</option><option>Break</option><option>Lunch</option>
        </select>`;
        
        // Teacher Dropdown
        const tHtml = `<select class="form-control" style="margin-bottom:5px;font-size:12px;padding:4px">
            <option>${oldTeach}</option><option>Ramesh Sharma</option><option>Prasana Reddy</option><option>Venkat Iyer</option>
            <option>Sunita Verma</option><option>Mohan Das</option><option>Pooja Mehta</option><option>Anita Pillai</option><option>Coach Raju</option>
        </select>`;
        
        // Room Input
        const rHtml = `<input type="text" class="form-control" placeholder="Room/Venue" value="Room 10${1+idx}" style="font-size:12px;padding:4px">`;
        
        it.innerHTML = sHtml + tHtml + rHtml;
    });
    
    // Check if buttons exist already, if not, create
    let btns = document.getElementById('edit-tt-btns');
    if(!btns) {
        btns = document.createElement('div');
        btns.id = 'edit-tt-btns';
        btns.style.display = 'flex';
        btns.style.gap = '10px';
        btns.style.marginBottom = '15px';
        theList.parentNode.insertBefore(btns, theList);
    }
    
    btns.style.display = 'flex';
    btns.innerHTML = `
      <button class="btn-primary" style="background:#5ca870" onclick="
        const arr = [];
        this.parentElement.nextElementSibling.querySelectorAll('.schedule-item, .tt-cell').forEach(it => {
            const selects = it.querySelectorAll('select');
            const inputs = it.querySelectorAll('input');
            arr.push({ subject: selects[0]?.value, teacher: selects[1]?.value, room: inputs[0]?.value });
        });
        localStorage.setItem('campuscore_timetable_9c', JSON.stringify(arr));
        delete this.parentElement.nextElementSibling.dataset.editing;
        this.parentElement.style.display = 'none';
        simulateAction('Timetable saved successfully');
        if(window.triggerLiveReRender) window.triggerLiveReRender();
      ">Save Changes</button>
      <button style="padding:10px;border-radius:8px;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer" onclick="
        delete this.parentElement.nextElementSibling.dataset.editing;
        this.parentElement.style.display = 'none';
        if(window.triggerLiveReRender) window.triggerLiveReRender();
      ">Cancel Edit</button>
    `;
  }
};

function attachAdvancedVPFeatures() {
    if(!currentUser) return;

    if (currentUser.role === 'vice_principal') {
        const iSec = document.getElementById('section-vp_student_issues');
        if(iSec) wfmRenderVPStudentIssuesTabs(); 

        const ttSec = document.getElementById('section-vp_schedule') || document.getElementById('section-vp_timetable');
        if(ttSec) {
            const filterDropdown = document.querySelector('#view-filter, .view-select, select');
            if(filterDropdown && !filterDropdown.dataset.vwired) {
                filterDropdown.dataset.vwired = 'true';
                filterDropdown.onchange = (e) => wfmRenderTodayWeekTimetable(e.target.value);
            }
        }

        const appSec = document.getElementById('section-vp_approvals') || document.getElementById('section-approvals');
        if(appSec) {
            const appFilt = document.querySelector('.approvals-filter') || appSec.querySelector('select');
            if(appFilt && !appFilt.dataset.awired) {
                appFilt.dataset.awired = 'true';
                appFilt.onchange = (e) => filterApprovalsVP(e.target.value);
            }
            appSec.querySelectorAll('.btn-primary').forEach(b => {
                if(b.textContent.includes('Approve')) b.onclick=()=>wfmApprove(b);
            });
            appSec.querySelectorAll('button:not(.btn-primary)').forEach(b => {
                if(b.textContent.includes('Reject')) b.onclick=()=>wfmReject(b);
            });
        }

        const notSec = document.getElementById('section-vp_notices');
        if(notSec) wfmRenderNoticesTabs();

        const stuSec = document.getElementById('section-vp_students');
        if(stuSec) wfmRenderStudentListExt();
    } else if (currentUser.role === 'teacher') {
        wfmRenderTeacherIssuesTree();
    } else if (currentUser.role === 'coordinator') {
        wfmRenderCoordIssues();
    }
}


// ---------------------------------------------------------
// FIX 5: BLOCK ACTIONS FROM REDIRECTING TO DASHBOARD HOME
// ---------------------------------------------------------
if(window.buildDashboard) {
    const _origNav = window.navigateTo;
    if(_origNav && !window.__globalNavHook) {
        window.__globalNavHook = true;
        // Wrap buildDashboard fundamentally
        const _origBld = window.buildDashboard;
        window.buildDashboard = function(u) {
            // Check if we are doing a live re-render
            const prevSec = window.currentSection;
            _origBld(u);
            
            // If we are regenerating HTML, active state resets to 'home' natively. Re-apply:
            if(prevSec && prevSec !== 'home') {
                setTimeout(() => {
                    document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
                    const sec = document.getElementById('section-' + prevSec);
                    if(sec) sec.classList.add('active');
                }, 0);
            }
            
            setTimeout(() => {
                if(window.rewireVPDeadButtons) window.rewireVPDeadButtons();
                attachAdvancedVPFeatures();
                applyGlobalButtonFixes();
                applyLanguage();
            }, 50);
        }
    }
}
