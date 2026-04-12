// ========== FIX 1: STUDENT ISSUES SUPPLEMENT ==========
function openMeetParentModal(studentName) {
  const m = `<div class="modal-overlay" id="meet-parent-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:450px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
        <h3 style="margin:0">Schedule Parent Meeting</h3>
        <button onclick="document.getElementById('meet-parent-modal').remove()" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--color-text)">&times;</button>
      </div>
      <div class="form-group">
        <div style="margin-bottom:10px"><strong style="color:var(--color-text-muted);font-size:13px">Student:</strong> ${studentName}</div>
        <div style="margin-bottom:15px"><strong style="color:var(--color-text-muted);font-size:13px">Parent:</strong> Mr/Mrs ${studentName.split(' ').pop()} <br><span style="color:var(--color-text-muted);font-size:12px">+91 98765 XXXXX</span></div>
        <label>Meeting Date</label>
        <input type="date" class="form-control">
        <label style="margin-top:10px">Meeting Time</label>
        <input type="time" class="form-control">
        <label style="margin-top:10px">Meeting Agenda / Notes</label>
        <textarea class="form-control" rows="3" placeholder="Enter agenda notes..."></textarea>
        <div style="display:flex;gap:10px;margin-top:15px">
          <button class="btn-primary" style="flex:1" onclick="
            localStorage.setItem('campuscore_meeting_req', Date.now());
            document.getElementById('meet-parent-modal').remove();
            simulateAction('Meeting scheduled successfully');
          ">Confirm Meeting</button>
          <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('meet-parent-modal').remove()">Cancel</button>
        </div>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

function openForwardCoordModal(issueId, studentName, issueStr) {
  const m = `<div class="modal-overlay" id="fwd-coord-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:450px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
        <h3 style="margin:0">Forward to Coordinator</h3>
        <button onclick="document.getElementById('fwd-coord-modal').remove()" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--color-text)">&times;</button>
      </div>
      <div class="form-group">
        <div style="margin-bottom:5px;font-size:13px"><strong>Student:</strong> ${studentName}</div>
        <div style="margin-bottom:15px;font-size:12px;color:var(--color-text-muted)"><strong>Issue:</strong> ${issueStr}</div>
        <label>Reason for forwarding / Additional notes</label>
        <textarea class="form-control" rows="3" placeholder="Add notes for the coordinator..."></textarea>
        <label style="margin-top:10px">Assign to Coordinator</label>
        <select class="form-control">
          <option>C001 - Anitha</option>
          <option>C002 - Rajesh</option>
        </select>
        <div style="display:flex;gap:10px;margin-top:15px">
          <button class="btn-danger" style="flex:1;background:var(--color-danger);color:white;border:none;border-radius:8px;padding:10px;cursor:pointer;font-weight:600" onclick="
            localStorage.setItem('campuscore_case_fwd_'+'${issueId}', Date.now());
            document.getElementById('fwd-coord-modal').remove();
            simulateAction('Issue forwarded to Coordinator successfully');
            triggerLiveReRender();
          ">Confirm Forward</button>
          <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('fwd-coord-modal').remove()">Cancel</button>
        </div>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

function openVPCaseDrawer(studentName, issue, card, idx) {
  const issueId = 'ISS-00' + (idx + 1);
  const reporter = card ? (card.querySelector('.fa-user-shield') ? card.querySelector('.fa-user-shield').parentElement.textContent.replace('Reported by:', '').trim() : 'System') : 'System';
  const priorityEl = card ? card.querySelector('span.badge') : null;
  const priority = priorityEl ? priorityEl.textContent.trim() : 'Medium Priority';
  const classEl = card ? card.querySelectorAll('span.badge')[1] : null;
  const className = classEl ? classEl.textContent.trim() : 'N/A';

  const m = `<div class="modal-overlay" id="case-drawer" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:580px;width:100%;max-height:90vh;overflow-y:auto">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
        <h3 style="margin:0"><i class="fas fa-folder-open"></i> Case ${issueId}</h3>
        <button onclick="document.getElementById('case-drawer').remove()" style="background:none;border:none;font-size:20px;cursor:pointer;color:var(--color-text)">&times;</button>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
        <span class="badge badge-info">${className}</span>
        <span class="badge" style="background:${priority.includes('High') ? 'var(--color-danger)' : priority.includes('Medium') ? '#f57c00' : 'var(--color-success)'};font-size:10px;padding:4px 10px">${priority}</span>
        <span class="badge badge-pending">Open</span>
      </div>
      <div style="border-bottom:1px solid var(--color-border);padding-bottom:12px;margin-bottom:12px">
        <div style="font-size:13px;color:var(--color-text-muted);margin-bottom:4px"><strong>Student:</strong> ${studentName}</div>
        <div style="font-size:13px;color:var(--color-text-muted);margin-bottom:4px"><strong>Category:</strong> Discipline</div>
        <div style="font-size:13px;color:var(--color-text-muted);margin-bottom:4px"><strong>Reported by:</strong> ${reporter}</div>
        <div style="font-size:13px;color:var(--color-text-muted)"><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
      </div>
      <h4 style="font-size:14px;margin-bottom:6px">Description</h4>
      <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:16px">${issue}</p>
      <h4 style="font-size:14px;margin-bottom:8px">📋 Timeline</h4>
      <div id="drawer-timeline" style="padding-left:16px;border-left:2px solid var(--color-primary);margin-bottom:16px">
        <div style="padding:8px 0;font-size:12px;color:var(--color-text-muted)"><strong style="color:var(--color-text)">Issue reported</strong> by ${reporter} &middot; ${new Date().toLocaleDateString()}</div>
      </div>
      <h4 style="font-size:14px;margin-bottom:6px">Add Note</h4>
      <textarea id="case-note" class="form-control" rows="2" placeholder="Add a note..." style="margin-bottom:8px"></textarea>
      <button style="padding:6px 14px;font-size:12px;border-radius:6px;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;margin-bottom:16px" onclick="
        const note = document.getElementById('case-note').value;
        if(note) {
          const tl = document.getElementById('drawer-timeline');
          tl.innerHTML += '<div style=\\'padding:8px 0;font-size:12px;color:var(--color-text-muted)\\'><strong style=\\'color:var(--color-text)\\'>VP Note</strong> &middot; Just now<br>'+note+'</div>';
          document.getElementById('case-note').value = '';
          localStorage.setItem('campuscore_case_note_' + '${issueId}', note);
        }
      ">Save Note</button>
      <div style="margin-bottom:12px">
        <label style="font-size:13px;font-weight:600;margin-bottom:4px;display:block">Assign To</label>
        <select class="form-control"><option>Coordinator - Anitha</option><option>Teacher - Ramesh Sharma</option><option>Teacher - Prasana Reddy</option><option>Teacher - Venkat Iyer</option></select>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn-primary" style="flex:1" onclick="
          document.getElementById('case-drawer').remove();
          localStorage.setItem('campuscore_case_res_'+'${issueId}', Date.now());
          simulateAction('Issue resolved');
          triggerLiveReRender();
        ">Resolve</button>
        <button style="flex:1;padding:8px;border-radius:8px;background:none;border:1px dashed #1976d2;color:#1976d2;cursor:pointer;font-weight:600;font-size:12px" onclick="document.getElementById('case-drawer').remove(); openForwardCoordModal('${issueId}', '${studentName}', '${issue.replace(/'/g, "")}')">Forward to Coordinator</button>
        <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('case-drawer').remove()">Close Case</button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

// ========== FIX 2: TIMETABLE REVIEW ==========
function vpScheduleFixDropdowns() {
  const sel = document.querySelector('#section-vp_schedule select');
  if (sel) {
    sel.onchange = function () { triggerLiveReRender(); }
  }
}

function openVPAssignSubstituteModal(btn, idx) {
  const card = btn.closest('.card');
  const missingTeacher = card ? card.querySelector('strong')?.textContent : 'Teacher';
  const subText = card ? card.querySelector('p')?.textContent : '';
  const m = `<div class="modal-overlay" id="assign-sub-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:400px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
        <h3 style="margin:0">Assign Substitute Teacher</h3>
        <button onclick="document.getElementById('assign-sub-modal').remove()" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--color-text)">&times;</button>
      </div>
      <div class="form-group">
        <div style="margin-bottom:8px;font-size:13px;color:var(--color-danger)"><strong>Absent:</strong> ${missingTeacher}</div>
        <div style="margin-bottom:15px;font-size:13px;color:var(--color-text-muted)"><strong>Period:</strong> ${subText}</div>
        <label>Select Substitute Teacher</label>
        <select class="form-control">
          <option>Ramesh Sharma</option>
          <option>Prasana Reddy</option>
          <option>Venkat Iyer</option>
          <option>Sunita Verma</option>
          <option>Mohan Das</option>
          <option>Pooja Mehta</option>
        </select>
        <div style="display:flex;gap:10px;margin-top:15px">
          <button class="btn-primary" style="flex:1" onclick="
            localStorage.setItem('campuscore_sub_'+'${idx}', Date.now());
            document.getElementById('assign-sub-modal').remove();
            simulateAction('Substitute assigned successfully');
            triggerLiveReRender();
          ">Confirm Assignment</button>
          <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('assign-sub-modal').remove()">Cancel</button>
        </div>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

function openVPAdjustAllocationModal() {
  const m = `<div class="modal-overlay" id="adj-alloc-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:500px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
        <h3 style="margin:0">Adjust Period Allocation</h3>
        <button onclick="document.getElementById('adj-alloc-modal').remove()" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--color-text)">&times;</button>
      </div>
      <table style="width:100%;font-size:13px;border-collapse:collapse">
        <thead><tr style="background:var(--color-surface-2)"><th style="padding:8px;text-align:left;border-bottom:1px solid var(--color-border)">Teacher Name</th><th style="padding:8px;text-align:center;border-bottom:1px solid var(--color-border)">Current Free</th><th style="padding:8px;text-align:center;border-bottom:1px solid var(--color-border)">Max Free</th></tr></thead>
        <tbody>
          <tr><td style="padding:8px;border-bottom:1px solid var(--color-border)">Ramesh Sharma</td><td style="padding:8px;text-align:center;border-bottom:1px solid var(--color-border)">2</td><td style="padding:8px;border-bottom:1px solid var(--color-border)"><input type="number" min="0" max="5" value="3" class="form-control" style="width:60px;margin:0 auto;text-align:center"></td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid var(--color-border)">Prasana Reddy</td><td style="padding:8px;text-align:center;border-bottom:1px solid var(--color-border)">1</td><td style="padding:8px;border-bottom:1px solid var(--color-border)"><input type="number" min="0" max="5" value="2" class="form-control" style="width:60px;margin:0 auto;text-align:center"></td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid var(--color-border)">Venkat Iyer</td><td style="padding:8px;text-align:center;border-bottom:1px solid var(--color-border)">0</td><td style="padding:8px;border-bottom:1px solid var(--color-border)"><input type="number" min="0" max="5" value="1" class="form-control" style="width:60px;margin:0 auto;text-align:center"></td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid var(--color-border)">Sunita Verma</td><td style="padding:8px;text-align:center;border-bottom:1px solid var(--color-border)">3</td><td style="padding:8px;border-bottom:1px solid var(--color-border)"><input type="number" min="0" max="5" value="3" class="form-control" style="width:60px;margin:0 auto;text-align:center"></td></tr>
        </tbody>
      </table>
      <div style="display:flex;gap:10px;margin-top:15px">
        <button class="btn-primary" style="flex:1" onclick="
          localStorage.setItem('campuscore_alloc_saved', Date.now());
          document.getElementById('adj-alloc-modal').remove();
          simulateAction('Allocation updated successfully');
        ">Save Allocation</button>
        <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('adj-alloc-modal').remove()">Cancel</button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

function vpEditTimetable() {
  const ttSection = document.getElementById('section-vp_schedule') || document.getElementById('section-vp_timetable');
  if (!ttSection) return;
  const theList = ttSection.querySelector('.schedule-list') || ttSection.querySelector('.timetable-grid');
  if (theList && !theList.dataset.editing) {
    theList.dataset.editing = 'true';
    const items = theList.querySelectorAll('.schedule-item, .tt-cell');
    items.forEach(it => {
      const titleEl = it.querySelector('h4') || it.querySelector('.subj');
      const teachEl = it.querySelector('p') || it.querySelector('.teach');
      if (titleEl && teachEl) {
        const oldT = titleEl.textContent;
        const oldTeach = teachEl.textContent;
        titleEl.innerHTML = `<select class="form-control" style="margin-bottom:5px;font-size:12px;padding:4px"><option>${oldT}</option><option>Mathematics</option><option>Physics</option><option>Chemistry</option><option>Biology</option><option>English Literature</option><option>History</option></select>`;
        teachEl.innerHTML = `<select class="form-control" style="font-size:12px;padding:4px"><option>${oldTeach}</option><option>Ramesh Sharma</option><option>Prasana Reddy</option><option>Venkat Iyer</option><option>Mohan Das</option></select>`;
      }
    });
    const btns = document.createElement('div');
    btns.id = 'edit-tt-btns';
    btns.style.display = 'flex';
    btns.style.gap = '10px';
    btns.style.margin = '15px 0';
    btns.innerHTML = `<button class="btn-primary" onclick="simulateAction('Timetable updated successfully'); delete this.parentElement.nextElementSibling.dataset.editing; triggerLiveReRender()">Save Changes</button> <button style="padding:10px;border-radius:8px;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer" onclick="delete this.parentElement.nextElementSibling.dataset.editing; triggerLiveReRender()">Cancel Edit</button>`;
    theList.parentElement.insertBefore(btns, theList);
  }
}

// ========== FIX 3: MESSAGES ==========
function vpReplyMessage(btn, id) {
  if (btn.nextElementSibling && btn.nextElementSibling.className === 'vp-reply-box') {
    btn.nextElementSibling.remove();
    return;
  }
  const box = document.createElement('div');
  box.className = 'vp-reply-box';
  box.style.cssText = 'margin-top:10px;padding-top:10px;border-top:1px dashed var(--color-border)';
  box.innerHTML = `
    <textarea class="form-control" rows="2" placeholder="Type your reply here..."></textarea>
    <div style="display:flex;gap:10px;align-items:center;margin-top:8px">
      <button class="btn-primary" style="padding:6px 12px;font-size:12px" onclick="
        const text = this.parentElement.previousElementSibling.value;
        if(text) {
            localStorage.setItem('campuscore_reply_'+'${id}', text);
            simulateAction('Reply sent');
            triggerLiveReRender();
        }
      ">Send Reply</button>
      <span style="color:var(--color-text-muted);font-size:12px;cursor:pointer;text-decoration:underline" onclick="this.closest('.vp-reply-box').remove()">Cancel</span>
    </div>
  `;
  btn.parentNode.insertBefore(box, btn.nextSibling);
}

function openForwardMsgModal(sender, subj) {
  const m = `<div class="modal-overlay" id="fwd-msg-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:400px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
        <h3 style="margin:0">Forward Message</h3>
        <button onclick="document.getElementById('fwd-msg-modal').remove()" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--color-text)">&times;</button>
      </div>
      <div class="form-group">
        <div style="margin-bottom:5px;font-size:13px;color:var(--color-text-muted)"><strong>From:</strong> ${sender}</div>
        <div style="margin-bottom:15px;font-size:13px;color:var(--color-text-muted)"><strong>Subject:</strong> ${subj}</div>
        <label>Forward To</label>
        <select class="form-control" id="fwd-to-sel"><option>Coordinator</option><option>Teacher</option><option>Admin Office</option></select>
        <label style="margin-top:10px">Add forwarding note (optional)</label>
        <textarea class="form-control" rows="3"></textarea>
        <div style="display:flex;gap:10px;margin-top:15px">
          <button class="btn-primary" style="flex:1" onclick="
            const sel = document.getElementById('fwd-to-sel').value;
            localStorage.setItem('campuscore_msg_fwd', Date.now());
            document.getElementById('fwd-msg-modal').remove();
            simulateAction('Message forwarded to ' + sel);
          ">Forward</button>
          <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('fwd-msg-modal').remove()">Cancel</button>
        </div>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

function openBroadcastModal() {
  const m = `<div class="modal-overlay" id="bcast-msg-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:480px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
        <h3 style="margin:0">Broadcast to Staff</h3>
        <button onclick="document.getElementById('bcast-msg-modal').remove()" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--color-text)">&times;</button>
      </div>
      <div class="form-group">
        <label>Target Audience</label>
        <select class="form-control" id="bc-aud-sel"><option>All Staff</option><option>Teachers Only</option><option>Coordinators Only</option><option>Admin Only</option></select>
        <label style="margin-top:10px">Broadcast Message</label>
        <textarea class="form-control" rows="4" placeholder="Enter your broadcast message..."></textarea>
        <div style="display:flex;gap:10px;margin-top:15px">
          <button class="btn-primary" style="flex:1" onclick="
            const aud = document.getElementById('bc-aud-sel').value;
            localStorage.setItem('campuscore_msg_bcast', Date.now());
            document.getElementById('bcast-msg-modal').remove();
            simulateAction('Broadcast sent to ' + aud + ' successfully');
          ">Send Broadcast</button>
          <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('bcast-msg-modal').remove()">Cancel</button>
        </div>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

function openNewMessageModalVP() {
  const m = `<div class="modal-overlay" id="new-msg-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:480px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
        <h3 style="margin:0">New Message</h3>
        <button onclick="document.getElementById('new-msg-modal').remove()" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--color-text)">&times;</button>
      </div>
      <div class="form-group">
        <label>To</label>
        <select class="form-control"><option>Anitha (Coordinator)</option><option>Ramesh Sharma (Teacher)</option><option>Prasana Reddy (Teacher)</option><option>Venkat Iyer (Teacher)</option><option>Admin Office</option></select>
        <label style="margin-top:10px">Subject</label>
        <input type="text" class="form-control" placeholder="Subject line">
        <label style="margin-top:10px">Message</label>
        <textarea class="form-control" rows="5" placeholder="Enter your message..."></textarea>
        <div style="display:flex;gap:10px;margin-top:15px">
          <button class="btn-primary" style="flex:1" onclick="
            localStorage.setItem('campuscore_msg_new', Date.now());
            document.getElementById('new-msg-modal').remove();
            simulateAction('Message sent successfully');
            triggerLiveReRender();
          ">Send</button>
          <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="document.getElementById('new-msg-modal').remove()">Cancel</button>
        </div>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

// ========== FIX 4: NOTICES ==========
function vpCreateNoticeModal(isEdit, initData) {
  const m = `<div class="modal-overlay" id="notice-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
    <div class="modal" style="max-width:550px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
        <h3 style="margin:0">${isEdit ? 'Edit Notice' : 'Create New Notice'}</h3>
        <button onclick="document.getElementById('notice-modal').remove()" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--color-text)">&times;</button>
      </div>
      <div class="form-group">
        <label>Notice Title <span style="color:red">*</span></label>
        <input type="text" id="nt-title" class="form-control" value="${initData?.title || ''}" placeholder="Enter title">
        <label style="margin-top:10px">Notice Body / Description <span style="color:red">*</span></label>
        <textarea id="nt-body" class="form-control" rows="4" placeholder="Full notice description...">${initData?.body || ''}</textarea>
        <div style="display:flex;gap:10px;margin-top:10px">
            <div style="flex:1">
                <label>Category</label>
                <select class="form-control"><option>General</option><option>Events</option><option>Academic</option><option>Meeting</option><option>Finance</option><option>Holiday</option></select>
            </div>
            <div style="flex:1">
                <label>Priority</label>
                <select class="form-control"><option>Low</option><option>Medium</option><option>High</option></select>
            </div>
        </div>
        <label style="margin-top:10px">Target Audience</label>
        <select class="form-control"><option>All</option><option>Teachers</option><option>Parents</option><option>Students</option><option>Coordinators</option></select>
        <div style="display:flex;gap:10px;margin-top:20px">
          <button class="btn-primary" style="flex:2" onclick="
            const t = document.getElementById('nt-title');
            const b = document.getElementById('nt-body');
            if(!t.value || !b.value) { t.style.borderColor=t.value?'':'red'; b.style.borderColor=b.value?'':'red'; return; }
            localStorage.setItem('campuscore_notice_save', Date.now());
            document.getElementById('notice-modal').remove();
            simulateAction(${isEdit ? "'Notice updated successfully'" : "'Notice published successfully'"});
            triggerLiveReRender();
          ">${isEdit ? 'Update Notice' : 'Publish'}</button>
          ${!isEdit ? `<button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px;cursor:pointer" onclick="
            localStorage.setItem('campuscore_notice_draft', Date.now());
            document.getElementById('notice-modal').remove();
            simulateAction('Notice saved as draft');
            triggerLiveReRender();
          ">Save as Draft</button>` : ''}
          <button style="flex:1;background:transparent;border:none;color:var(--color-text);cursor:pointer;text-decoration:underline" onclick="document.getElementById('notice-modal').remove()">Cancel</button>
        </div>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', m);
}

function vpArchiveNoticeConfirm() {
  if (confirm('Are you sure you want to archive this notice?')) {
    localStorage.setItem('campuscore_notice_archive', Date.now());
    simulateAction('Notice archived');
    triggerLiveReRender();
  }
}

// ========== REWIRE FUNCTION ==========
/* ============================================================
   REWIRE ALL DEAD BUTTONS AFTER DOM RENDERS
   This runs after buildDashboard and re-attaches onclick handlers
   to buttons that still use alert() or toast-only responses.
   ============================================================ */
function rewireVPDeadButtons() {
  if (!currentUser || currentUser.role !== 'vice_principal') return;

  // --- FIX 1: Student Issues ---
  const issueSection = document.getElementById('section-vp_student_issues') || document.getElementById('section-student_issues');
  if (issueSection) {
    const cards = issueSection.querySelectorAll('.card');
    cards.forEach((card, idx) => {
      // Find resolved marker
      if (localStorage.getItem('campuscore_case_res_ISS-00' + (idx + 1)) || localStorage.getItem('campuscore_case_fwd_ISS-00' + (idx + 1))) {
        card.style.opacity = '0.5';
        const b = card.querySelector('span.badge-pending');
        if (b) { b.textContent = 'Resolved/Forwarded'; b.className = 'badge badge-success'; }
      }

      const buttons = card.querySelectorAll('button');
      const studentEl = card.querySelector('h4');
      const issueEl = card.querySelector('p');
      const studentName = studentEl ? studentEl.textContent.trim() : 'Student';
      const issueSummary = issueEl ? issueEl.textContent.trim() : '';

      buttons.forEach(btn => {
        const text = btn.textContent.trim();
        if (text === 'Meet Parent') {
          btn.onclick = function () { openMeetParentModal(studentName); };
        } else if (text.includes('Open Case')) {
          btn.onclick = function () { openVPCaseDrawer(studentName, issueSummary, card, idx); };
        } else if (text.includes('Forward to Coordinator')) {
          btn.onclick = function () { openForwardCoordModal('ISS-00' + (idx + 1), studentName, issueSummary); };
        }
      });
    });
  }

  // --- FIX 2: Timetable Review ---
  const scheduleSection = document.getElementById('section-vp_schedule') || document.getElementById('section-vp_timetable');
  if (scheduleSection) {
    // Dropdowns
    const sels = scheduleSection.querySelectorAll('select.form-control');
    sels.forEach(sel => { sel.onchange = function () { triggerLiveReRender(); }; });

    const cards = scheduleSection.querySelectorAll('.card');
    cards.forEach((card, idx) => {
      if (localStorage.getItem('campuscore_sub_' + idx)) {
        card.style.borderLeft = '4px solid var(--color-success)';
        const b = card.querySelector('.badge');
        if (b) { b.className = 'badge badge-success'; b.textContent = 'RESOLVED'; }
      }
    });

    const btns = scheduleSection.querySelectorAll('button');
    btns.forEach((btn, idx) => {
      const txt = btn.textContent.trim();
      if (txt.includes('Assign Substitute')) {
        btn.onclick = function () { openVPAssignSubstituteModal(btn, idx); };
        if (localStorage.getItem('campuscore_sub_' + idx)) { btn.style.display = 'none'; }
      } else if (txt.includes('Adjust Allocation')) {
        btn.onclick = openVPAdjustAllocationModal;
      } else if (txt.includes('Edit Timetable')) {
        btn.onclick = vpEditTimetable;
      }
    });
  }

  // --- FIX 3: Messages ---
  const msgSection = document.getElementById('section-vp_messages') || document.getElementById('section-messages');
  if (msgSection) {
    const msgs = msgSection.querySelectorAll('.message-item');
    msgs.forEach((m, idx) => {
      const sender = m.querySelector('h4') ? m.querySelector('h4').textContent : 'Unknown';
      const subj = m.querySelector('p strong') ? m.querySelector('p strong').textContent : 'Message';
      const btns = m.querySelectorAll('button');
      btns.forEach(btn => {
        if (btn.textContent.includes('Reply')) {
          btn.onclick = function () { vpReplyMessage(btn, idx); };
        } else if (btn.textContent.includes('Forward')) {
          btn.onclick = function () { openForwardMsgModal(sender, subj); };
        }
      });

      if (localStorage.getItem('campuscore_reply_' + idx)) {
        if (!m.querySelector('.vp-replied')) {
          const r = document.createElement('div');
          r.className = 'vp-replied';
          r.innerHTML = `<div style="margin-top:10px;padding:8px;background:var(--color-surface-2);border-radius:6px;font-size:12px;border-left:3px solid var(--color-primary)"><strong style="color:var(--color-primary)">SUMAN (VP)</strong> <span style="color:var(--color-text-muted);float:right">Just now</span><p style="margin:4px 0 0 0;color:var(--color-text)">${localStorage.getItem('campuscore_reply_' + idx)}</p></div>`;
          m.appendChild(r);
        }
      }
    });
    const topBtns = msgSection.querySelectorAll('button.btn-primary');
    topBtns.forEach(btn => {
      if (btn.textContent.includes('Broadcast')) {
        btn.onclick = openBroadcastModal;
      } else if (btn.textContent.includes('New Message')) {
        btn.onclick = openNewMessageModalVP;
      }
    });

    if (localStorage.getItem('campuscore_msg_new') && !document.getElementById('vp-new-msg-sent')) {
      const list = msgSection.querySelector('.message-list');
      if (list) {
        const el = document.createElement('div');
        el.id = 'vp-new-msg-sent';
        el.className = 'message-item';
        el.innerHTML = `<h4>To: Staff</h4><p><strong>General Update</strong><br>New message sent by VP.</p><div><span class="badge badge-success">Sent</span></div>`;
        list.insertBefore(el, list.firstChild);
      }
    }
  }

  // --- FIX 4: Notices ---
  const noticeSection = document.getElementById('section-vp_notices') || document.getElementById('section-notices');
  if (noticeSection) {
    const topBtn = noticeSection.querySelector('.btn-primary');
    if (topBtn && topBtn.textContent.includes('Create')) {
      topBtn.onclick = function () { vpCreateNoticeModal(false, null); };
    }

    const list = noticeSection.querySelector('.notices-list');

    if (localStorage.getItem('campuscore_notice_save') && !document.getElementById('vp-new-notice-pub')) {
      if (list) {
        const el = document.createElement('div');
        el.id = 'vp-new-notice-pub';
        el.className = 'card';
        el.innerHTML = `<h3>New Notice</h3><span class="badge badge-success">PUBLISHED</span><p>Just now &middot; VP</p>`;
        list.insertBefore(el, list.firstChild);
      }
    }
    if (localStorage.getItem('campuscore_notice_draft') && !document.getElementById('vp-new-notice-draft')) {
      if (list) {
        const el = document.createElement('div');
        el.id = 'vp-new-notice-draft';
        el.className = 'card';
        el.innerHTML = `<h3>Draft Notice</h3><span class="badge badge-info">DRAFT</span><p>Just now &middot; VP</p>`;
        list.insertBefore(el, list.firstChild);
      }
    }

    const noticeCards = noticeSection.querySelectorAll('.card');
    if (localStorage.getItem('campuscore_notice_archive')) {
      if (noticeCards.length > 0) noticeCards[0].style.display = 'none'; // basic mock removal
    }
    noticeCards.forEach(c => {
      const acts = c.querySelectorAll('.action-icons i, button i');
      acts.forEach(icon => {
        if (icon.className.includes('fa-edit') || icon.className.includes('fa-pen')) {
          if (icon.parentElement.tagName === 'BUTTON') {
            icon.parentElement.onclick = function (e) { e.stopPropagation(); vpCreateNoticeModal(true, { title: c.querySelector('h3, h4')?.textContent }); };
          } else {
            icon.onclick = function (e) { e.stopPropagation(); vpCreateNoticeModal(true, { title: c.querySelector('h3, h4')?.textContent }); };
          }
        }
        if (icon.className.includes('fa-trash') || icon.className.includes('fa-archive')) {
          if (icon.parentElement.tagName === 'BUTTON') {
            icon.parentElement.onclick = function (e) { e.stopPropagation(); vpArchiveNoticeConfirm(); };
          } else {
            icon.onclick = function (e) { e.stopPropagation(); vpArchiveNoticeConfirm(); };
          }
        }
      });
    });
  }

  // --- FIX 5: Attendance Filter ---
  const attSection = document.getElementById('section-vp_attendance');
  if (attSection) {
    const applyBtn = attSection.querySelector('.btn-primary');
    if (applyBtn && applyBtn.textContent.includes('Apply')) {
      applyBtn.onclick = vpApplyAttendanceFilter;
    }
  }

  // --- FIX 6: Profile ---
  const profileSection = document.getElementById('section-profile');
  if (profileSection) {
    const header = profileSection.querySelector('.profile-header');
    if (header && !profileSection.querySelector('#prof-action-btns')) {
      const btnDiv = document.createElement('div');
      btnDiv.id = 'prof-action-btns';
      btnDiv.style.cssText = 'display:flex;gap:10px;margin-top:12px;flex-wrap:wrap';
      btnDiv.innerHTML = `
        <button class="btn-primary" style="padding:8px 16px;font-size:13px" onclick="openProfileEditModal()"><i class="fas fa-user-edit"></i> Edit Profile</button>
        <button style="padding:8px 16px;font-size:13px;border-radius:8px;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer" onclick="openChangePasswordModal()"><i class="fas fa-lock"></i> Change Password</button>
      `;
      header.appendChild(btnDiv);
    }
  }

  // --- FIX 7: Settings ---
  const settingsSection = document.getElementById('section-settings');
  if (settingsSection) {
    const btns = settingsSection.querySelectorAll('button');
    btns.forEach(btn => {
      const text = btn.textContent.trim();
      if (text.includes('Change Password')) {
        btn.onclick = openChangePasswordModal;
      } else if (text.includes('Edit Profile')) {
        btn.onclick = openProfileEditModal;
      } else if (text.includes('Language')) {
        btn.onclick = openLanguageModal;
      } else if (text.includes('Download My Data')) {
        btn.onclick = downloadMyData;
      }
    });
  }

  // --- FIX 8: Events ---
  const eventsSection = document.getElementById('section-events');
  if (eventsSection) {
    const evBtns = eventsSection.querySelectorAll('button');
    evBtns.forEach((btn, idx) => {
      if (btn.textContent.includes('View Event Master Plan')) {
        btn.onclick = function () { openEventMasterPlan(idx); };
      }
    });
  }

  // --- FIX 9: Class Performance ---
  const classPerfSection = document.getElementById('section-vp_class_perf') || document.getElementById('section-vp_performance');
  if (classPerfSection) {
    const tbody = classPerfSection.querySelector('tbody');
    if (tbody) {
      const rows = tbody.querySelectorAll('tr');
      rows.forEach(row => {
        row.style.cursor = 'pointer';
        row.onclick = function () {
          const className = row.querySelector('td').textContent.trim();
          openClassPerfDetail(className);
        };
      });
    }
    const btns = classPerfSection.querySelectorAll('button');
    btns.forEach(btn => {
      if (btn.textContent.includes('Compare Sections')) {
        btn.onclick = function () { simulateAction('Section comparison details generated'); };
      } else if (btn.textContent.includes('Export')) {
        btn.onclick = function () { simulateAction('Class performance PDF exported'); };
      }
    });
  }

  // --- FIX 10: Teacher Monitoring ---
  const teacherSection = document.getElementById('section-vp_teachers');
  if (teacherSection) {
    const viewBtns = teacherSection.querySelectorAll('button[title="View Profile"]');
    viewBtns.forEach(btn => {
      const row = btn.closest('tr');
      if (row) {
        const nameEl = row.querySelector('.user-row-info strong');
        const name = nameEl ? nameEl.textContent.trim() : 'Teacher';
        btn.onclick = function (e) {
          e.stopPropagation();
          openTeacherProfileModal(name);
        };
      }
    });
    const reviewBtn = teacherSection.querySelector('.btn-primary');
    if (reviewBtn && reviewBtn.textContent.includes('Review Pending Work')) {
      reviewBtn.onclick = function () {
        simulateAction('3 items need attention: 1 marks upload pending, 1 attendance unmarked...');
      };
    }
  }

  // --- FIX 11: Exams ---
  const examSection = document.getElementById('section-vp_exams');
  if (examSection) {
    const btns = examSection.querySelectorAll('button');
    btns.forEach(btn => {
      const text = btn.textContent.trim();
      if (text.includes('View Exam Plan')) {
        btn.onclick = openExamPlanModal;
      } else if (text.includes('Schedule Exam')) {
        btn.onclick = openScheduleExamModal;
      } else if (text.includes('Open Performance Report')) {
        btn.onclick = function () { openClassPerfDetail('9-B'); };
      }
    });
  }

  // --- FIX 12: Reports ---
  const reportsSection = document.getElementById('section-vp_reports');
  if (reportsSection) {
    const btns = reportsSection.querySelectorAll('button');
    btns.forEach(btn => {
      const text = btn.textContent.trim();
      if (text.includes('Export PDF') || text.includes('Generate Report')) {
        btn.onclick = openGenerateReportModal;
      } else if (text.includes('Excel')) {
        btn.onclick = function () { simulateAction('Excel report exported successfully'); };
      } else if (text === 'Open Module') {
        btn.onclick = function () { navigateTo('vp_class_perf'); };
      }
    });
  }
}

// Re-evaluate immediate hooks
if (window.buildDashboard) {
  (function () {
    const _origBuildDashboard = window.buildDashboard;
    window.buildDashboard = function (user) {
      _origBuildDashboard(user);
      setTimeout(rewireVPDeadButtons, 50);
    };

    const _origNavigateTo = window.navigateTo;
    if (_origNavigateTo && !window.__navHookedVP) {
      window.__navHookedVP = true;
      window.navigateTo = function (section) {
        _origNavigateTo(section);
        setTimeout(rewireVPDeadButtons, 50);
      };
    }
  })();
}
