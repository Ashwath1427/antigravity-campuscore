import os

dash_js = "js/dashboard.js"
with open(dash_js, "r", encoding="utf-8") as f:
    dash = f.read()

# =========================================================
# FIX 3 - MESSAGES MODALS AND BUTTONS
# =========================================================

# The old card generation in buildVPMessages:
old_messages_cards = """const list = VP_MESSAGES.map(m=>`<div class="card" style="margin-bottom:12px;border:${m.unread?'1px solid var(--color-primary)':'1px solid var(--color-border)'};position:relative;padding-left:${m.unread?'30px':'24px'}">
    ${m.unread?'<div style="position:absolute;left:12px;top:28px;width:8px;height:8px;border-radius:50%;background:var(--color-primary)"></div>':''}
    <div style="display:flex;justify-content:space-between;margin-bottom:6px">
      <strong style="color:var(--color-text)">${m.sender} <span style="font-size:10px;background:var(--color-surface-2);border:1px solid var(--color-border);padding:2px 6px;border-radius:4px;margin-left:6px">${m.sender.includes('Parent')?'Urgent Alert':m.sender.includes('Coord')?'Coordinator':'Staff'}</span></strong>
      <span style="font-size:11px;color:var(--color-text-muted)">${m.time}</span>
    </div>
    <div style="font-weight:${m.unread?'700':'500'};margin-bottom:8px;font-size:15px;color:var(--color-text)">${m.subject}</div>
    <p style="font-size:13px;color:var(--color-text-light);line-height:1.4">${m.content}</p>
    <div style="margin-top:12px;display:flex;gap:10px">
      <button style="padding:6px 14px;border-radius:6px;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;font-size:12px;font-weight:600" onclick="simulateAction('Reply composer opened.')"><i class="fas fa-reply"></i> Reply</button>
      <button style="padding:6px 14px;border-radius:6px;background:none;border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;font-size:12px;font-weight:600" onclick="simulateAction('Forwarded to coordinator.')"><i class="fas fa-share"></i> Forward</button>
    </div>
  </div>`).join('');"""

# We read from localStorage for replies
new_messages_cards = """
  // Ensure we have a persistent message store
  let activeMessages = JSON.parse(localStorage.getItem('campuscore_vp_msgs')) || VP_MESSAGES.map((m, i) => ({...m, _id: i, replies: []}));
  
  const list = activeMessages.map((m, index)=>`
  <div class="card" style="margin-bottom:12px;border:${m.unread?'1px solid var(--color-primary)':'1px solid var(--color-border)'};position:relative;padding-left:${m.unread?'30px':'24px'}">
    ${m.unread?'<div style="position:absolute;left:12px;top:28px;width:8px;height:8px;border-radius:50%;background:var(--color-primary)"></div>':''}
    <div style="display:flex;justify-content:space-between;margin-bottom:6px">
      <strong style="color:var(--color-text)">${m.sender} <span style="font-size:10px;background:var(--color-surface-2);border:1px solid var(--color-border);padding:2px 6px;border-radius:4px;margin-left:6px">${m.sender.includes('Parent')?'Urgent Alert':m.sender.includes('Coord')?'Coordinator':'Staff'}</span></strong>
      <span style="font-size:11px;color:var(--color-text-muted)">${m.time}</span>
    </div>
    <div style="font-weight:${m.unread?'700':'500'};margin-bottom:8px;font-size:15px;color:var(--color-text)">${m.subject}</div>
    <p style="font-size:13px;color:var(--color-text-light);line-height:1.4">${m.content}</p>
    
    ${m.replies && m.replies.length > 0 ? `<div style="margin-top:10px;padding-left:15px;border-left:2px solid var(--color-primary)">` + m.replies.map(r => `<div style="font-size:12px;color:var(--color-text-muted)"><strong style="color:var(--color-text)">${r.sender} (${r.time})</strong>: ${r.content}</div>`).join('') + `</div>` : ''}
    
    <div style="margin-top:12px;display:flex;gap:10px">
      <button style="padding:6px 14px;border-radius:6px;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;font-size:12px;font-weight:600" onclick="document.getElementById('reply-box-${index}').style.display='block';"><i class="fas fa-reply"></i> Reply</button>
      <button style="padding:6px 14px;border-radius:6px;background:none;border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;font-size:12px;font-weight:600" onclick="openMsgForwardModal('${m.subject}', '${m.sender}')"><i class="fas fa-share"></i> Forward</button>
    </div>
    <div id="reply-box-${index}" style="display:none;margin-top:12px;padding-top:12px;border-top:1px dashed var(--color-border)">
        <textarea id="reply-text-${index}" class="form-control" rows="2" placeholder="Type your reply here..." style="font-size:12px;resize:none;margin-bottom:8px"></textarea>
        <div style="display:flex;gap:10px">
            <button class="btn-primary" style="padding:6px 16px;font-size:12px" onclick="sendMsgReply(${index})">Send Reply</button>
            <button style="background:none;border:none;color:var(--color-text-muted);cursor:pointer;font-size:12px" onclick="document.getElementById('reply-box-${index}').style.display='none'">Cancel</button>
        </div>
    </div>
  </div>`).join('');
"""

if old_messages_cards in dash:
    dash = dash.replace(old_messages_cards, new_messages_cards)
    
old_broadcast_btns = """<button class="btn-primary" onclick="simulateAction('Broadcast sent to all staff members.')"><i class="fas fa-bullhorn"></i> Broadcast to Staff</button>
        <button class="btn-primary" onclick="simulateAction('Message compose window opened.')"><i class="fas fa-pen"></i> New Message</button>"""
new_broadcast_btns = """<button class="btn-primary" onclick="openBroadcastModal()"><i class="fas fa-bullhorn"></i> Broadcast to Staff</button>
        <button class="btn-primary" onclick="openNewMessageModal()"><i class="fas fa-pen"></i> New Message</button>"""
if old_broadcast_btns in dash: dash = dash.replace(old_broadcast_btns, new_broadcast_btns)

msg_modals = """
// --- FIX 3: MESSAGES ---
function sendMsgReply(index) {
    let activeMessages = JSON.parse(localStorage.getItem('campuscore_vp_msgs')) || VP_MESSAGES.map((m, i) => ({...m, _id: i, replies: []}));
    let content = document.getElementById('reply-text-' + index).value.trim();
    if(!content) return;
    if(!activeMessages[index].replies) activeMessages[index].replies = [];
    activeMessages[index].replies.push({sender: currentUser.name, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), content});
    localStorage.setItem('campuscore_vp_msgs', JSON.stringify(activeMessages));
    simulateAction('Reply sent');
    triggerLiveReRender();
}
function openMsgForwardModal(sub, sender) {
    const m = `<div class="modal-overlay" id="fwd-msg-modal" style="display:flex" onclick="if(event.target===this) this.remove()"><div class="modal" style="max-width:400px"><h3 style="margin-top:0">Forward Message</h3>
    <div class="form-group"><label>Forward To</label><select class="form-control"><option>Coordinator</option><option>Teacher</option><option>Admin</option></select><label style="margin-top:10px">Add forwarding note (optional)</label><textarea class="form-control" rows="3"></textarea>
    <div style="display:flex;gap:10px;margin-top:15px"><button class="btn-primary" style="flex:1" onclick="document.getElementById('fwd-msg-modal').remove(); simulateAction('Message forwarded');">Forward</button><button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;border-radius:8px" onclick="document.getElementById('fwd-msg-modal').remove()">Cancel</button></div></div></div></div>`;
    document.body.insertAdjacentHTML('beforeend', m);
}
function openBroadcastModal() {
    const m = `<div class="modal-overlay" id="bc-modal" style="display:flex" onclick="if(event.target===this) this.remove()"><div class="modal" style="max-width:400px"><h3 style="margin-top:0">Broadcast Message</h3>
    <div class="form-group"><label>Target Audience</label><select class="form-control"><option>All Staff</option><option>Teachers Only</option><option>Coordinators Only</option></select><label style="margin-top:10px">Message</label><textarea class="form-control" rows="4"></textarea>
    <div style="display:flex;gap:10px;margin-top:15px"><button class="btn-primary" style="flex:1" onclick="document.getElementById('bc-modal').remove(); simulateAction('Broadcast sent to staff members');">Send Broadcast</button><button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;border-radius:8px" onclick="document.getElementById('bc-modal').remove()">Cancel</button></div></div></div></div>`;
    document.body.insertAdjacentHTML('beforeend', m);
}
function openNewMessageModal() {
    const m = `<div class="modal-overlay" id="nm-modal" style="display:flex" onclick="if(event.target===this) this.remove()"><div class="modal" style="max-width:400px"><h3 style="margin-top:0">New Message</h3>
    <div class="form-group"><label>To</label><select class="form-control"><option>Anitha (Coordinator)</option><option>Venkat (Teacher)</option></select><label style="margin-top:10px">Subject</label><input type="text" class="form-control"><label style="margin-top:10px">Message</label><textarea class="form-control" rows="4"></textarea>
    <div style="display:flex;gap:10px;margin-top:15px"><button class="btn-primary" style="flex:1" onclick="document.getElementById('nm-modal').remove(); simulateAction('Message sent');">Send</button><button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;border-radius:8px" onclick="document.getElementById('nm-modal').remove()">Cancel</button></div></div></div></div>`;
    document.body.insertAdjacentHTML('beforeend', m);
}
"""
if "function sendMsgReply" not in dash: dash += "\n" + msg_modals

# =========================================================
# FIX 4 - NOTICES MODALS AND BUTTONS
# =========================================================

old_ann_cards = """const cards=ANNOUNCEMENTS.map(a=>{const c=catC[a.category]||'#5ca870';const p=priC[a.priority];return `<div class="card" style="padding:0;overflow:hidden"><div style="height:5px;background:${p}"></div><div style="padding:22px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><div style="display:flex;gap:6px"><span class="badge" style="background:${c};font-size:10px;padding:4px 10px">${a.category}</span> ${user.role==='vice_principal'?`<span class="badge" style="background:var(--color-surface-2);color:var(--color-text);font-size:10px;border:1px solid var(--color-border)">Target: All</span>`:''}</div><span style="font-size:10px;font-weight:800;color:${p};text-transform:uppercase;letter-spacing:1px">${a.priority}</span></div><h4 style="font-size:15px;font-weight:700;color:var(--color-text);margin-bottom:10px;line-height:1.4">${a.title}</h4><div style="font-size:12px;color:var(--color-text-muted);display:flex;gap:12px;margin-bottom:12px"><span>📅 Pub: ${a.date}</span><span>👤 ${a.author}</span></div>${user.role==='vice_principal'?`<div style="display:flex;gap:8px;border-top:1px solid var(--color-border);padding-top:12px;margin-top:12px"><span class="badge badge-active" style="flex:1;text-align:center;font-size:11px">Published</span><button style="padding:4px 8px;font-size:11px;border-radius:4px;background:none;border:1px solid #1976d2;color:#1976d2;cursor:pointer" onclick="simulateAction('Notice edit mode opened.')"><i class="fas fa-edit"></i></button><button style="padding:4px 8px;font-size:11px;border-radius:4px;background:none;border:1px solid #999;color:#999;cursor:pointer" onclick="simulateAction('Notice archived successfully.')"><i class="fas fa-archive"></i></button></div>`:''}</div></div>`;}).join('');"""
new_ann_cards = """
  let liveAnnouncements = JSON.parse(localStorage.getItem('campuscore_notices')) || ANNOUNCEMENTS;
  const cards=liveAnnouncements.map((a, index)=>{const c=catC[a.category]||'#5ca870';const p=priC[a.priority]||'#5ca870';return `<div class="card" style="padding:0;overflow:hidden"><div style="height:5px;background:${p}"></div><div style="padding:22px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><div style="display:flex;gap:6px"><span class="badge" style="background:${c};font-size:10px;padding:4px 10px">${a.category}</span> ${user.role==='vice_principal'?`<span class="badge" style="background:var(--color-surface-2);color:var(--color-text);font-size:10px;border:1px solid var(--color-border)">Target: ${a.target || 'All'}</span>`:''}</div><span style="font-size:10px;font-weight:800;color:${p};text-transform:uppercase;letter-spacing:1px">${a.priority}</span></div><h4 style="font-size:15px;font-weight:700;color:var(--color-text);margin-bottom:10px;line-height:1.4">${a.title}</h4><p style="font-size:13px;color:var(--color-text-light);margin-bottom:12px">${a.body || ''}</p><div style="font-size:12px;color:var(--color-text-muted);display:flex;gap:12px;margin-bottom:12px"><span>📅 Pub: ${a.date}</span><span>👤 ${a.author}</span></div>${user.role==='vice_principal'?`<div style="display:flex;gap:8px;border-top:1px solid var(--color-border);padding-top:12px;margin-top:12px"><span class="badge badge-active" style="flex:1;text-align:center;font-size:11px">Published</span><button style="padding:4px 8px;font-size:11px;border-radius:4px;background:none;border:1px solid #1976d2;color:#1976d2;cursor:pointer" onclick="openNoticeModal(${index})"><i class="fas fa-edit"></i></button><button style="padding:4px 8px;font-size:11px;border-radius:4px;background:none;border:1px solid #999;color:#999;cursor:pointer" onclick="archiveNotice(${index})"><i class="fas fa-archive"></i></button></div>`:''}</div></div>`;}).join('');
"""
if old_ann_cards in dash: dash = dash.replace(old_ann_cards, new_ann_cards)

old_ann_btn = """<button class="btn-primary" style="padding:8px 16px" onclick="simulateAction('Notice creation form opened.')">"""
new_ann_btn = """<button class="btn-primary" style="padding:8px 16px" onclick="openNoticeModal(null)">"""
if old_ann_btn in dash: dash = dash.replace(old_ann_btn, new_ann_btn)

notices_modals = """
// --- FIX 4: NOTICES ---
function archiveNotice(index) {
    let live = JSON.parse(localStorage.getItem('campuscore_notices')) || ANNOUNCEMENTS;
    live.splice(index, 1);
    localStorage.setItem('campuscore_notices', JSON.stringify(live));
    simulateAction('Notice archived');
    triggerLiveReRender();
}
function openNoticeModal(editIndex = null) {
    let live = JSON.parse(localStorage.getItem('campuscore_notices')) || ANNOUNCEMENTS;
    let n = editIndex !== null ? live[editIndex] : {title:'', body:'', category:'Events', target:'All', priority:'High'};
    
    const m = `<div class="modal-overlay" id="notice-modal" style="display:flex" onclick="if(event.target===this) this.remove()"><div class="modal" style="max-width:500px;width:100%"><h3 style="margin-top:0">${editIndex !== null ? 'Edit Notice' : 'Create New Notice'}</h3>
    <div class="form-group">
      <label>Notice Title</label><input type="text" id="n-title" class="form-control" value="${n.title}">
      <label style="margin-top:10px">Notice Body / Description</label><textarea id="n-body" class="form-control" rows="4">${n.body || ''}</textarea>
      
      <div style="display:flex;gap:10px;margin-top:10px">
          <div style="flex:1"><label>Category</label><select id="n-cat" class="form-control"><option ${n.category==='Events'?'selected':''}>Events</option><option ${n.category==='Academic'?'selected':''}>Academic</option><option ${n.category==='Meeting'?'selected':''}>Meeting</option><option ${n.category==='Finance'?'selected':''}>Finance</option><option ${n.category==='Holiday'?'selected':''}>Holiday</option><option ${n.category==='General'?'selected':''}>General</option></select></div>
          <div style="flex:1"><label>Target</label><select id="n-tar" class="form-control"><option ${n.target==='All'?'selected':''}>All</option><option ${n.target==='Teachers'?'selected':''}>Teachers</option><option ${n.target==='Parents'?'selected':''}>Parents</option><option ${n.target==='Students'?'selected':''}>Students</option><option ${n.target==='Coordinators'?'selected':''}>Coordinators</option></select></div>
      </div>
      <label style="margin-top:10px">Priority</label><select id="n-pri" class="form-control"><option ${n.priority==='High'?'selected':''}>high</option><option ${n.priority==='Medium'?'selected':''}>medium</option><option ${n.priority==='Low'?'selected':''}>low</option></select>
      
      <div style="display:flex;gap:10px;margin-top:20px">
          <button class="btn-primary" style="flex:2" onclick="saveNotice(${editIndex})">${editIndex !== null ? 'Update Notice' : 'Publish'}</button>
          <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);cursor:pointer;border-radius:8px" onclick="document.getElementById('notice-modal').remove()">Save as Draft</button>
          <button style="flex:1;background:none;border:none;color:var(--color-text-muted);cursor:pointer;border-radius:8px" onclick="document.getElementById('notice-modal').remove()">Cancel</button>
      </div>
    </div></div></div>`;
    document.body.insertAdjacentHTML('beforeend', m);
}
function saveNotice(editIndex) {
    let t = document.getElementById('n-title').value.trim();
    let b = document.getElementById('n-body').value.trim();
    if(!t || !b) { simulateAction('Please fill all fields'); return; }
    
    let live = JSON.parse(localStorage.getItem('campuscore_notices')) || ANNOUNCEMENTS;
    let n = {
        title: t, body: b, 
        category: document.getElementById('n-cat').value,
        target: document.getElementById('n-tar').value,
        priority: document.getElementById('n-pri').value,
        author: currentUser.name, date: new Date().toLocaleDateString('en-GB')
    };
    
    if(editIndex !== null) live[editIndex] = n;
    else live.unshift(n);
    
    localStorage.setItem('campuscore_notices', JSON.stringify(live));
    document.getElementById('notice-modal').remove();
    simulateAction(editIndex !== null ? 'Notice updated' : 'Notice published successfully');
    triggerLiveReRender();
}
"""
if "function archiveNotice" not in dash: dash += "\n" + notices_modals

with open(dash_js, "w", encoding="utf-8") as f:
    f.write(dash)
print("Applied Fix 3 and 4 successfully")
