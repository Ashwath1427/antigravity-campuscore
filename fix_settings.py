import os
dash_path = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/dashboard.js"
with open(dash_path, "r", encoding="utf-8") as f:
    content = f.read()

new_build_settings = """
function buildSettings(user) {
  const pCard = user.role==='vice_principal'?`<div class="card" style="grid-column: 1 / -1; display:flex; gap: 20px; align-items:center; background:linear-gradient(135deg,rgba(25,118,210,0.1),transparent)">
    <div class="avatar" style="width:80px;height:80px;font-size:32px;background:var(--color-primary)">${getInitials(user.name)}</div>
    <div>
      <h2 style="margin-bottom:6px;color:var(--color-text)">${user.name}</h2>
      <div style="font-size:14px;color:var(--color-text-muted);margin-bottom:6px"><strong>Role:</strong> ${user.roleLabel}</div>
      <div style="font-size:14px;color:var(--color-text-muted)"><strong>School:</strong> Delhi Public School, Nadergul</div>
    </div>
  </div>`:'';
  
  const set = getSettings(user.id);
  
  return `<div class="dash-section" id="section-settings"><div class="settings-grid">
    ${pCard}
    <div class="card">
      <h3>🎨 Appearance</h3>
      ${sToggle('Dark Mode','Switch between light and dark theme','s-dark', `handleSettingToggle('${user.id}', 'darkMode', this.checked); if(this.checked){document.documentElement.setAttribute('data-theme', 'dark');}else{document.documentElement.removeAttribute('data-theme');}`, set.darkMode)}
      ${sToggle('Compact Mode','Reduce spacing','compact', `handleSettingToggle('${user.id}', 'compactMode', this.checked); document.body.classList.toggle('compact-mode', this.checked)`, set.compactMode)}
    </div>
    <div class="card">
      <h3>🔔 Notifications</h3>
      ${sToggle('Email Notifications','Receive updates via email','e-notif', `handleSettingToggle('${user.id}', 'emailNotif', this.checked)`, set.emailNotif)}
      ${sToggle('Attendance Alerts','Alert on low attendance','att-a', `handleSettingToggle('${user.id}', 'attNotif', this.checked)`, set.attNotif)}
      ${sToggle('Fee Reminders','Payment deadline alerts','fee-r', `handleSettingToggle('${user.id}', 'feeNotif', this.checked)`, set.feeNotif)}
      ${sToggle('Homework Updates','New assignments','hw-u', `handleSettingToggle('${user.id}', 'hwNotif', this.checked)`, set.hwNotif)}
    </div>
    <div class="card">
      <h3>👤 Account</h3>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${sBtn('Change Password','fa-lock', 'simulateAction(\\'Password reset instructions sent to your email.\\')')}
        ${sBtn('Edit Profile','fa-user-edit', 'simulateAction(\\'Profile editor modal opened.\\')')}
        ${sBtn('Language','fa-language', 'simulateAction(\\'Language changed to English.\\')')}
        ${sBtn('Download My Data','fa-download', 'simulateAction(\\'Data archive download started.\\')')}
      </div>
    </div>
    <div class="card">
      <h3>🔒 Security</h3>
      ${sToggle('Two-Factor Auth','Extra login security','2fa', `handleSettingToggle('${user.id}', 'twoFactor', this.checked); if(this.checked) simulateAction('2FA setup text sent to ' + currentUser.phone)`, set.twoFactor)}
      <div style="margin-top:20px;padding:16px;background:rgba(211,47,47,0.06);border:2px solid rgba(211,47,47,0.15);border-radius:12px">
        <div style="font-size:14px;font-weight:700;color:var(--color-danger);margin-bottom:6px">⚠️ Session</div>
        <button class="btn-danger" style="margin-bottom:10px" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</button>
      </div>
    </div>
  </div></div>`;
}

function handleSettingToggle(userId, key, val) {
  const set = getSettings(userId);
  set[key] = val;
  saveSettings(userId, set);
}

function simulateAction(msg) {
  alert(msg);
}

function sToggle(l,h,id,oc,ch){
  return `<div class="settings-row">
    <div>
      <div class="settings-label">${l}</div>
      <div class="settings-hint">${h}</div>
    </div>
    <label class="toggle-switch">
      <input type="checkbox" id="${id}" ${ch?'checked':''} onchange="${oc.replace(/"/g, '&quot;')}"/>
      <span class="toggle-slider"></span>
    </label>
  </div>`;
}

function sBtn(l,ic, oc=''){
  return `<button onclick="${oc}" style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--color-surface-2);border:2px solid var(--color-border);border-radius:10px;cursor:pointer;color:var(--color-text);font-size:13px;font-weight:600;font-family:Inter,sans-serif;transition:all 0.2s;text-align:left;width:100%" onmouseover="this.style.borderColor='var(--color-primary)'" onmouseout="this.style.borderColor='var(--color-border)'"><i class="fas ${ic}" style="color:var(--color-primary);width:18px"></i> ${l}<i class="fas fa-chevron-right" style="margin-left:auto;opacity:0.3;font-size:11px"></i></button>`;
}
"""

start_str = "function buildSettings(user) {"
end_str = "/* ━━━━ VICE PRINCIPAL EXCLUSIVE MODULES ━━━━━━━━━━━━━━━━━━━ */"

if start_str in content and end_str in content:
    pre = content[:content.find(start_str)]
    post = content[content.find(end_str):]
    with open(dash_path, "w", encoding="utf-8") as f:
        f.write(pre + new_build_settings + post)
