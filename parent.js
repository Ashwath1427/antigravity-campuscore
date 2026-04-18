/* ============================================================
   CAMPUS CORE – PARENT.JS
   Parent Portal Dedicated Module
   ============================================================ */

(function () {
  /**
   * --- CORE DATA HELPERS ---
   * Standardizes how Parent role accesses Child data and preferences.
   */

  function getParentSid(user) {
    if (!user) return null;
    if (user.childId) return String(user.childId);
    // Fallback: Parse from username P[ID]A
    const m = String(user.username || "").toUpperCase().match(/^P(\d+)A$/);
    return m ? m[1] : null;
  }

  function getChildProfile(sid) {
    // Attempt to use global student registry helpers if available
    if (typeof window.getStudentProfileData === 'function') {
      return window.getStudentProfileData(sid);
    }
    // Fallback to STUDENTS array
    return (window.STUDENTS || []).find(s => s.admNo === sid || s.id === sid) || (window.STUDENTS ? window.STUDENTS[0] : {});
  }

  function getChildSharedData(sid) {
    if (typeof window.getStudentSharedData === 'function') {
      return window.getStudentSharedData(sid);
    }
    const key = 'campuscore_student_data_' + sid;
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  function getParentSettings(sid) {
    const key = `campuscore_parent_settings_${sid}`;
    const defaults = {
      darkMode: false,
      compactMode: false,
      notifications: true,
      emailAlerts: true,
      language: "English"
    };
    return { ...defaults, ...JSON.parse(localStorage.getItem(key) || '{}') };
  }

  function saveParentSettings(sid, patch) {
    const key = `campuscore_parent_settings_${sid}`;
    const current = getParentSettings(sid);
    const updated = { ...current, ...patch };
    localStorage.setItem(key, JSON.stringify(updated));

    // Apply visual effects if relevant
    if (patch.darkMode !== undefined) {
      document.documentElement.setAttribute('data-theme', patch.darkMode ? 'dark' : 'light');
    }
    if (patch.compactMode !== undefined) {
      document.documentElement.setAttribute('data-compact', patch.compactMode ? 'true' : 'false');
    }
    return updated;
  }

  /**
   * --- DASHBOARD BUILDER ENTRY ---
   */

  window.buildParentDashboard = function (user) {
    const sid = getParentSid(user);
    if (!sid) return `<div class="dash-section active"><h3>Error: No child linked to this account.</h3></div>`;

    const ctx = {
      user: user,
      sid: sid,
      profile: getChildProfile(sid),
      shared: getChildSharedData(sid),
      settings: getParentSettings(sid)
    };

    // Concatenate all sections
    return [
      buildParentHome(ctx),
      buildParentProfile(ctx),
      buildParentAttendance(ctx),
      buildParentHomework(ctx),
      buildParentExams(ctx),
      buildParentResults(ctx),
      buildParentFees(ctx),
      typeof window.buildAnnouncements === 'function' ? window.buildAnnouncements(user) : "",
      typeof window.buildEvents === 'function' ? window.buildEvents(user) : "",
      buildParentMessages(ctx),
      buildParentSettings(ctx)
    ].join("");
  };

  /**
   * --- SECTION BUILDERS ---
   */

  function buildParentHome(ctx) {
    const p = ctx.profile;
    const s = ctx.shared;
    const greeting = typeof window.getGreeting === 'function' ? window.getGreeting() : "Welcome";
    const dateStr = typeof window.getFormattedDate === 'function' ? window.getFormattedDate() : "";

    const stats = [
      { label: 'Attendance', value: s.attendancePct ? `${s.attendancePct}%` : '94%', icon: '📋', color: 'var(--color-primary)', id: 'p-stat-att' },
      { label: 'Pending HW', value: Array.isArray(s.homework) ? s.homework.filter(h => h.status === 'Pending').length : '2', icon: '📝', color: '#f57c00', id: 'p-stat-hw' },
      { label: 'Upcoming Exams', value: Array.isArray(s.exams) ? s.exams.filter(e => new Date(e.date) >= new Date()).length : '3', icon: '📅', color: '#8b5cf6', id: 'p-stat-exams' },
      { label: 'Academic GPA', value: (s.results && s.results.overall) ? (s.results.overall / 10).toFixed(1) : (p.gpa || '8.7'), icon: '📊', color: '#1976d2', id: 'p-stat-gpa' }
    ].map(st => `
      <div class="stat-card">
        <div class="stat-card-icon" style="color:${st.color}">${st.icon}</div>
        <div class="stat-value ${st.value === '...' ? 'skeleton' : ''}" id="${st.id}">${st.value}</div>
        <div class="stat-label">${st.label}</div>
      </div>`).join('');

    const subText = `Viewing dashboard for ${p.fullName || p.name} · Class ${p.className || p.class || '9-C'}`;
    
      const activities = (s.activities || []).map(a => `
        <li class="activity-item">
          <div class="activity-dot" style="background:${a.color}"></div>
          <div class="activity-text">${a.icon} ${a.text}</div>
          <div class="activity-time">${a.time}</div>
        </li>`).join('');

      return `
    <div class="dash-section active" id="section-home">
      <div class="welcome-banner">
        <div class="welcome-greeting">${greeting}, ${ctx.user.name || 'Parent'}! 👋</div>
        <div id="parent-welcome-sub" class="welcome-sub">${subText}</div>
        <div class="welcome-date"><i class="far fa-calendar-alt"></i> ${dateStr}</div>
      </div>

      <div class="stats-grid">${stats}</div>

      <div class="content-grid">
        <div class="card">
          <h3>⚡ Quick Actions</h3>
          <div class="quick-actions">
            <button class="quick-action-btn" onclick="navigateTo('parent_attendance')">
              <div class="qa-icon" style="background:var(--color-primary)"><i class="fas fa-clipboard-check"></i></div>
              <span class="qa-label">Attendance</span>
            </button>
            <button class="quick-action-btn" onclick="navigateTo('parent_results')">
              <div class="qa-icon" style="background:#1976d2"><i class="fas fa-chart-bar"></i></div>
              <span class="qa-label">Results</span>
            </button>
            <button class="quick-action-btn" onclick="navigateTo('parent_fees')">
              <div class="qa-icon" style="background:#f57c00"><i class="fas fa-rupee-sign"></i></div>
              <span class="qa-label">Pay Fees</span>
            </button>
            <button class="quick-action-btn" onclick="navigateTo('parent_messages')">
              <div class="qa-icon" style="background:#8b5cf6"><i class="fas fa-envelope"></i></div>
              <span class="qa-label">Messages</span>
            </button>
          </div>
        </div>
        <div class="card">
          <h3>⏱️ Recent Activity</h3>
          <ul class="activity-list">${activities}</ul>
        </div>
      </div>

      <div class="content-grid">
        <div class="card">
          <h3>📢 Latest Notices</h3>
          <ul class="activity-list" id="parent-home-notices">
             <li class="skeleton" style="height:40px;width:100%;margin:5px 0"></li>
             <li class="skeleton" style="height:40px;width:100%;margin:5px 0"></li>
          </ul>
          <script>setTimeout(() => { if(typeof refreshParentLiveDashboard === 'function') refreshParentLiveDashboard(); }, 100);</script>
          <button class="btn-primary" style="width:100%;margin-top:12px" onclick="navigateTo('announcements')">View All Notices</button>
        </div>
      </div>
    </div>`;
  }

  function buildParentProfile(ctx) {
    const p = ctx.profile;
    const u = ctx.user;

    const row = (label, val) => `
      <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--color-border)">
        <span style="color:var(--color-text-muted)">${label}</span>
        <strong style="color:var(--color-text)">${val || '—'}</strong>
      </div>`;

    return `
    <div class="dash-section" id="section-parent_child">
      <div class="content-grid-equal">
        <div class="card">
          <h3>🧑‍🎓 Child Information</h3>
          <div style="text-align:center;margin-bottom:20px">
            <div class="avatar" style="width:80px;height:80px;font-size:32px;margin:0 auto 10px;background:var(--color-primary)">${(p.name || 'S')[0]}</div>
            <h2 style="margin:0">${p.name || 'Student Name'}</h2>
            <div style="color:var(--color-text-muted)">Class ${p.class} · Roll No: ${p.roll}</div>
          </div>
          ${row('Admission No', p.admNo)}
          ${row('Date of Birth', p.dob)}
          ${row('Gender', p.gender)}
          ${row('Blood Group', p.bloodGroup || 'B+')}
          ${row('Class Teacher', p.classTeacher || 'Anita Pillai')}
        </div>
        <div class="card">
          <h3>👨‍👩‍👧 Parent / Guardian Details</h3>
          ${row('Guardian Name', u.name)}
          ${row('Relationship', 'Father / Mother')}
          ${row('Primary Contact', u.phone || p.parentContact)}
          ${row('Email Address', u.email || p.parentEmail)}
          ${row('Emergency No', p.parentContact || u.phone)}
          <button class="btn-primary" style="margin-top:20px;width:100%" onclick="openParentEditProfileModal()">Edit Contact Details</button>
        </div>
      </div>
    </div>`;
  }

  function buildParentAttendance(ctx) {
    const s = ctx.shared;
    const att = s.attendancePct || ctx.profile.attendance || 0;

    // Mock monthly data if not present
    const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
    const bars = months.map((m, i) => {
      const pct = Math.min(100, att - (i % 5) + 2);
      return `
        <div style="flex:1;text-align:center">
          <div style="height:100px;background:var(--color-surface-2);border-radius:4px;position:relative;margin-bottom:8px">
            <div style="position:absolute;bottom:0;width:100%;height:${pct}%;background:var(--color-primary);border-radius:0 0 4px 4px;transition:height 1s"></div>
          </div>
          <small>${m}</small>
        </div>`;
    }).join('');

    return `
    <div class="dash-section" id="section-parent_attendance">
      <div class="content-grid">
        <div class="card">
          <h3>📊 Attendance Overview</h3>
          <div style="display:flex;align-items:center;gap:30px;margin:20px 0">
             <div style="width:120px;height:120px;border-radius:50%;border:8px solid var(--color-primary);display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:900">${att}%</div>
             <div>
               <h4 style="margin:0;color:var(--color-primary)">Progress Status</h4>
               <p style="margin:5px 0;font-size:13px;color:var(--color-text-muted)">${att >= 85 ? 'Excellent regularity!' : 'Needs improvement to meet 85% requirement.'}</p>
             </div>
          </div>
          <h3>Monthly Trend</h3>
          <div style="display:flex;gap:10px;margin-top:20px">${bars}</div>
        </div>
        <div class="card">
          <h3>📝 Recent Logs</h3>
          <div style="max-height:350px;overflow-y:auto">
            <table class="data-table">
              <thead><tr><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                ${Array.from({ length: 10 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - i);
      const isSun = d.getDay() === 0;
      const status = isSun ? 'Holiday' : (i % 7 === 0 ? 'Absent' : 'Present');
      const badge = status === 'Present' ? 'badge-active' : (status === 'Absent' ? 'badge-danger' : 'badge-info');
      return `<tr><td>${d.toLocaleDateString('en-IN')}</td><td><span class="badge ${badge}">${status}</span></td></tr>`;
    }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;
  }

  function buildParentHomework(ctx) {
    const hwList = ctx.shared.homework || [];
    const rows = hwList.map(h => `
      <tr>
        <td><strong>${h.subject}</strong></td>
        <td>${h.title}</td>
        <td>${h.dueDate || h.due}</td>
        <td><span class="badge ${h.status === 'Submitted' ? 'badge-active' : (h.status === 'Overdue' ? 'badge-danger' : 'badge-warning')}">${h.status}</span></td>
      </tr>`).join('');

    return `
    <div class="dash-section" id="section-parent_homework">
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
           <h3>📚 Child's Homework Tracker</h3>
           <span class="badge badge-info">${hwList.filter(h => h.status === 'Pending').length} Pending</span>
        </div>
        <div style="overflow-x:auto">
          <table class="data-table">
            <thead><tr><th>Subject</th><th>Assignment</th><th>Due Date</th><th>Status</th></tr></thead>
            <tbody>${rows || '<tr><td colspan="4" style="text-align:center">No homework assigned yet.</td></tr>'}</tbody>
          </table>
        </div>
      </div>
    </div>`;
  }

  function buildParentExams(ctx) {
    const exams = ctx.shared.exams || [];
    const rows = exams.map(e => `
      <tr>
        <td><strong>${e.subject}</strong></td>
        <td>${e.date}</td>
        <td>${e.time}</td>
        <td>${e.venue || e.room}</td>
      </tr>`).join('');

    return `
    <div class="dash-section" id="section-parent_exams">
      <div class="card">
        <h3>📅 Upcoming Exam Schedule</h3>
        <table class="data-table">
          <thead><tr><th>Subject</th><th>Date</th><th>Time</th><th>Room</th></tr></thead>
          <tbody>${rows || '<tr><td colspan="4" style="text-align:center">No exams scheduled.</td></tr>'}</tbody>
        </table>
      </div>
    </div>`;
  }

  function buildParentResults(ctx) {
    const res = ctx.shared.results || { marks: [], overall: 0, trend: [] };
    const rows = (res.marks || []).map(m => {
      const gradeClass = m.grade.startsWith('A') ? 'var(--color-primary)' : (m.grade.startsWith('B') ? '#f57c00' : 'var(--color-danger)');
      return `
      <tr>
        <td><strong>${m.subject}</strong></td>
        <td>${m.marks}/${m.total}</td>
        <td style="color:${gradeClass};font-weight:900">${m.grade}</td>
        <td>${m.remarks || '—'}</td>
      </tr>`;
    }).join('');

    const trend = (res.trend || []).map(t => `
      <div style="margin-bottom:15px">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px"><small>${t.label}</small> <small>${t.pct}%</small></div>
        <div class="progress-bar"><div class="progress-fill" style="width:${t.pct}%"></div></div>
      </div>`).join('');

    return `
    <div class="dash-section" id="section-parent_results">
      <div class="content-grid">
        <div class="card">
          <h3>📊 Examination Results</h3>
          <div style="overflow-x:auto">
            <table class="data-table">
              <thead><tr><th>Subject</th><th>Score</th><th>Grade</th><th>Remarks</th></tr></thead>
              <tbody>${rows || '<tr><td colspan="4" style="text-align:center">Results not yet published.</td></tr>'}</tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <h3>📈 Performance Trend</h3>
          <div style="text-align:center;margin-bottom:20px">
            <div style="font-size:48px;font-weight:900;color:var(--color-primary)">${res.overall || 0}%</div>
            <div style="color:var(--color-text-muted)">Aggregate Score</div>
          </div>
          ${trend}
        </div>
      </div>
    </div>`;
  }

  function buildParentFees(ctx) {
    const fees = ctx.shared.fees || (window.FEE_DATA ? JSON.parse(JSON.stringify(window.FEE_DATA)) : { total_due: 0, paid: 0, pending: 0, breakdown: [], history: [] });
    const history = fees.history || [];
    const paidPct = fees.total_due > 0 ? Math.round((fees.paid / fees.total_due) * 100) : 0;
    const p = ctx.profile;

    return `
    <div class="dash-section" id="section-parent_fees">
      <div class="welcome-banner" style="background: linear-gradient(135deg, #1a237e, #0d47a1); margin-bottom: 20px;">
        <div style="display:flex; justify-content:space-between; align-items:center">
          <div>
            <div class="welcome-greeting">Fee Payment Portal</div>
            <div class="welcome-sub">${p.name} · Adm: ${p.admNo} · Class: ${p.class}</div>
          </div>
          <div style="background: rgba(255,255,255,0.1); padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: 800; color: #ffeb3b; border: 1px solid rgba(255,255,255,0.2)">
            DEMO MODE ONLY
          </div>
        </div>
      </div>

      <div class="content-grid-equal">
        <div class="card" style="text-align:center; padding: 30px;">
          <h3>💰 Outstanding Dues</h3>
          <div style="width:180px; height:180px; margin:25px auto; border-radius:50%; background:conic-gradient(var(--color-primary) ${paidPct * 3.6}deg, var(--color-surface-2) 0); display:flex; align-items:center; justify-content:center; position:relative; box-shadow: 0 4px 15px rgba(0,0,0,0.1)">
            <div style="width:145px; height:145px; border-radius:50%; background:var(--color-surface); display:flex; flex-direction:column; align-items:center; justify-content:center">
               <div style="font-size:32px; font-weight:900; color:var(--color-text)">${paidPct}%</div>
               <small style="color:var(--color-text-muted); font-weight:700">PAID</small>
            </div>
          </div>
          <div style="display:flex; justify-content:space-around; margin: 25px 0">
             <div>
               <div style="color:var(--color-primary); font-size:22px; font-weight:900">₹${(fees.paid || 0).toLocaleString('en-IN')}</div>
               <small style="text-transform:uppercase; letter-spacing:1px; color:var(--color-text-muted)">Total Paid</small>
             </div>
             <div style="width:1px; background:var(--color-border)"></div>
             <div>
               <div style="color:var(--color-danger); font-size:22px; font-weight:900">₹${(fees.pending || 0).toLocaleString('en-IN')}</div>
               <small style="text-transform:uppercase; letter-spacing:1px; color:var(--color-text-muted)">Pending Amount</small>
             </div>
          </div>
          <button class="btn-primary" style="width:100%; padding: 16px; font-size: 16px; border-radius: 12px; box-shadow: 0 4px 12px rgba(92,168,112,0.3)" onclick="parentPayNow()">
            <i class="fas fa-credit-card" style="margin-right:8px"></i> Finalize & Pay Now
          </button>
          <div style="margin-top:15px; font-size:11px; color:var(--color-text-muted)">
            <i class="fas fa-lock"></i> Secured via Razorpay Test Environment
          </div>
        </div>

        <div class="card">
          <h3>📋 Category Breakdown</h3>
          <div style="margin-top:15px">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th style="text-align:right">Total</th>
                  <th style="text-align:center">Status</th>
                </tr>
              </thead>
              <tbody>
                ${(fees.breakdown || []).map(b => `
                <tr>
                  <td style="font-weight:600">${b.label}</td>
                  <td style="text-align:right; font-weight:800">₹${b.amount.toLocaleString('en-IN')}</td>
                  <td style="text-align:center">
                    <span class="badge ${b.status === 'Paid' ? 'badge-active' : 'badge-warning'}" style="font-size:10px">${b.status}</span>
                  </td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
          <div style="margin-top:20px; padding: 15px; background: var(--color-surface-2); border-radius: 10px; border-left: 4px solid var(--color-info)">
            <div style="font-size:13px; font-weight:700">📅 Next Payment Due</div>
            <div style="font-size:18px; font-weight:900; color:var(--color-primary)">${fees.next_due || 'N/A'}</div>
          </div>
        </div>
      </div>

      <div class="card" style="margin-top: 25px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
          <h3>📜 Payment History & Receipts</h3>
          <div style="font-size:12px; color:var(--color-text-muted)">Showing last ${history.length} transactions</div>
        </div>
        <div style="overflow-x:auto">
          <table class="data-table">
            <thead>
              <tr>
                <th>Trans. ID</th>
                <th>Date</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th style="text-align:center">Action</th>
              </tr>
            </thead>
            <tbody>
              ${history.map(h => `
              <tr>
                <td style="font-family: monospace; font-size:12px">${h.id}</td>
                <td>${h.date}</td>
                <td>${h.method || '—'}</td>
                <td style="font-weight:800">₹${h.amount.toLocaleString('en-IN')}</td>
                <td><span class="badge badge-active">${h.status}</span></td>
                <td style="text-align:center">
                  <button class="btn-primary" style="padding: 4px 10px; font-size: 11px;" onclick="viewParentReceipt('${h.id}')">
                    <i class="fas fa-file-invoice"></i> Receipt
                  </button>
                </td>
              </tr>`).join('') || '<tr><td colspan="6" style="text-align:center; padding: 30px; color:var(--color-text-muted)">No payment records found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Placeholder for Backend Integrators -->
      <div style="margin-top:20px; padding:15px; border: 1px dashed var(--color-border); border-radius:10px; opacity: 0.6">
        <small style="color:var(--color-text-muted)">
          <strong>Developer Note:</strong> This UI is surgical and role-restricted. For production, wire <code>parentPayNow</code> to your secure 
          <code>CREATE_ORDER</code> API and implement <code>VERIFY_PAYMENT</code> on success.
        </small>
      </div>
    </div>`;
  }

  function buildParentMessages(ctx) {
    const msgs = ctx.shared.messages || [];
    const issues = (window.GLOBAL_ISSUES || []).filter(i => String(i.studentId) === String(ctx.sid));

    return `
    <div class="dash-section" id="section-parent_messages">
      <div class="card" style="margin-bottom:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
          <h3>✉️ School Correspondence</h3>
          <div style="display:flex;gap:10px">
            <button class="btn-primary" onclick="openParentComposeModal()">Message Teacher</button>
            <button class="btn-primary" onclick="window.openRaiseConcernModal()">Raise Concern</button>
          </div>
        </div>
        <div style="display:grid;gap:12px">
           ${msgs.map(m => `
             <div class="message-card ${m.unread ? 'unread' : ''}" onclick="openParentMessage('${m.id}')">
               <div style="display:flex;justify-content:space-between;margin-bottom:5px">
                 <strong>${m.sender}</strong>
                 <small>${m.ts}</small>
               </div>
               <div style="font-weight:700;margin-bottom:5px">${m.subject}</div>
               <div style="font-size:13px;color:var(--color-text-muted)">${m.preview || m.body.slice(0, 80)}...</div>
             </div>`).join('') || '<p style="text-align:center;color:var(--color-text-muted)">No messages yet.</p>'}
        </div>
      </div>

      <div class="card">
        <h3>📍 My Raised Concerns</h3>
        <div style="display:grid;gap:10px;margin-top:10px">
          ${issues.map(i => `
            <div style="padding:15px;border:1px solid var(--color-border);border-radius:12px">
              <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                <strong>${i.id} · ${i.category}</strong>
                <span class="badge" style="background:${i.status === 'Open' ? 'var(--color-info)' : 'var(--color-primary)'}">${i.status}</span>
              </div>
              <div style="font-size:14px;font-weight:700;margin-bottom:5px">${i.title}</div>
              <div style="font-size:12px;color:var(--color-text-muted)">Assigned to: ${i.assignedTo}</div>
              <button class="btn-primary" style="margin-top:12px;padding:6px 12px;font-size:12px" onclick="openEscalationTimelineModal('${i.id}')">View Full History</button>
            </div>`).join('') || '<p style="text-align:center;color:var(--color-text-muted)">No active concerns.</p>'}
        </div>
      </div>
    </div>`;
  }

  function buildParentSettings(ctx) {
    const s = ctx.settings;

    const toggle = (label, key, val) => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--color-border)">
        <div>
          <div style="font-weight:700">${label}</div>
          <small style="color:var(--color-text-muted)">Enabled since session start</small>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" ${val ? 'checked' : ''} onchange="parentToggleSetting('${key}', this.checked)">
          <span class="toggle-slider"></span>
        </label>
      </div>`;

    return `
    <div class="dash-section" id="section-settings">
      <div class="settings-grid">
        <div class="card">
          <h3>🎨 Interface Preferences</h3>
          ${toggle('Dark Mode', 'darkMode', s.darkMode)}
          ${toggle('Compact UI', 'compactMode', s.compactMode)}
          <div style="padding:15px 0">
            <label style="display:block;margin-bottom:10px;font-weight:700">Display Language</label>
            <select class="form-control" onchange="parentToggleSetting('language', this.value)">
               <option ${s.language === 'English' ? 'selected' : ''}>English</option>
               <option ${s.language === 'Hindi' ? 'selected' : ''}>Hindi</option>
               <option ${s.language === 'Telugu' ? 'selected' : ''}>Telugu</option>
            </select>
          </div>
        </div>
        <div class="card">
          <h3>🔔 Notification Settings</h3>
          ${toggle('Push Notifications', 'notifications', s.notifications)}
          ${toggle('Email Alerts', 'emailAlerts', s.emailAlerts)}
        </div>
        <div class="card">
          <h3>🔐 Account Management</h3>
          <button class="btn-primary" style="width:100%;margin-bottom:10px" onclick="parentDownloadData()">Download My Data</button>
          <button class="btn-danger" style="width:100%" onclick="window.logout()">Logout from Portal</button>
        </div>
      </div>
    </div>`;
  }

  /**
   * --- PORTAL ACTIONS ---
   */

  window.parentToggleSetting = function (key, val) {
    const sid = getParentSid(window.currentUser);
    const updated = saveParentSettings(sid, { [key]: val });
    if (typeof window.simulateAction === 'function') {
      window.simulateAction(`${key.charAt(0).toUpperCase() + key.slice(1)} preference saved.`);
    }
  };

  window.parentPayNow = function () {
    const sid = getParentSid(window.currentUser);
    const data = getChildSharedData(sid);

    // Ensure we have a fee structure to work with
    if (!data.fees) {
      if (window.FEE_DATA) data.fees = JSON.parse(JSON.stringify(window.FEE_DATA));
      else return;
    }

    if (data.fees.pending <= 0) {
      if (typeof window.simulateAction === 'function') window.simulateAction("No pending amount to be paid.");
      return;
    }

    const amountToPay = data.fees.pending;

    // --- RAZORPAY SURGICAL INTEGRATION ---
    // In production, this Order ID must be fetched from your secure backend server.
    const DEMO_ORDER_ID = "order_demo_" + Math.random().toString(36).substring(7);

    const options = {
      "key": "rzp_test_campuscore_demo", // [PLACEHOLDER] Replace with your actual Public Key
      "amount": amountToPay * 100, // Razorpay works in Paisa (INR)
      "currency": "INR",
      "name": "CampusCore School Fee",
      "description": `Fee payment for ${data.fees.student?.name || 'Student'}`,
      "order_id": DEMO_ORDER_ID, // [BACKEND HOOK] Wire to 'CREATE_SECURE_ORDER_URL'
      "handler": function (response) {
        // [PLACEHOLDER] Signature Verification should be done on backend via 'VERIFY_PAYMENT_URL'
        parentFinalizePayment(sid, amountToPay, response);
      },
      "prefill": {
        "name": window.currentUser.name,
        "email": window.currentUser.email,
        "contact": window.currentUser.phone
      },
      "theme": {
        "color": "#5ca870"
      },
      "modal": {
        "ondismiss": function () {
          if (typeof window.simulateAction === 'function') window.simulateAction("Payment cancelled by parent.");
        }
      }
    };

    try {
      if (typeof Razorpay === 'undefined') {
        throw new Error("Razorpay SDK not loaded. Check internet connection.");
      }
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (e) {
      console.error("[CampusCore] Razorpay Error:", e);
      alert("Payment gateway failed to load. Please try again later. (Error: " + e.message + ")");
    }
  };

  /**
   * --- PAYMENT FINALIZATION ---
   * Safely updates regional storage and adds to history.
   */
  window.parentFinalizePayment = function (sid, amount, rzpResponse) {
    const data = getChildSharedData(sid);
    if (!data.fees) return;

    // Update financial stats
    data.fees.paid += amount;
    data.fees.pending = 0;

    // Update category status
    if (data.fees.breakdown) {
      data.fees.breakdown.forEach(b => {
        if (b.status === 'Pending') b.status = 'Paid';
      });
    }

    // Add to history
    data.fees.history = data.fees.history || [];
    data.fees.history.unshift({
      id: rzpResponse.razorpay_payment_id || ("DEMO-" + Date.now()),
      date: new Date().toLocaleDateString('en-IN'),
      method: "Razorpay (Test)",
      amount: amount,
      status: 'Success',
      receipt: "RCPT-" + Math.floor(1000 + Math.random() * 9000)
    });

    // Persist
    if (typeof window.saveStudentSharedData === 'function') {
      window.saveStudentSharedData(sid, data);
    } else {
      localStorage.setItem('campuscore_student_data_' + sid, JSON.stringify(data));
    }

    if (typeof window.simulateAction === 'function') {
      window.simulateAction(`Secure receipt generated for ₹${amount}.`);
    }

    // Refresh dashboard
    if (typeof window.buildDashboard === 'function') window.buildDashboard(window.currentUser);
    window.navigateTo('parent_fees');

    // Success Toast/Alert
    alert('Payment Successful!\nTransaction ID: ' + (rzpResponse.razorpay_payment_id || 'DEMO_MODE'));
  };

  /**
   * --- VIEW RECEIPT ---
   * Displays a detailed receipt modal for completed transactions.
   */
  window.viewParentReceipt = function (txId) {
    const sid = getParentSid(window.currentUser);
    const data = getChildSharedData(sid);
    const tx = (data.fees?.history || []).find(h => h.id === txId);

    if (!tx) return;

    const m = `<div class="modal-overlay" id="receipt-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
      <div class="modal" style="max-width:400px; padding: 40px; text-align:center">
        <div style="color:var(--color-primary); font-size: 40px; margin-bottom: 20px;"><i class="fas fa-check-circle"></i></div>
        <h2 style="margin-bottom: 5px">Payment Receipt</h2>
        <div style="color:var(--color-text-muted); font-size:12px; margin-bottom:20px;">Delhi Public School, Nadergul</div>
        
        <div style="border-top: 1px dashed var(--color-border); border-bottom: 1px dashed var(--color-border); padding: 15px 0; margin-bottom: 20px; text-align:left; font-size:14px">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px"><span>Receipt No:</span> <strong>${tx.receipt}</strong></div>
          <div style="display:flex; justify-content:space-between; margin-bottom:8px"><span>Transaction ID:</span> <strong style="font-size:11px; font-family:monospace">${tx.id}</strong></div>
          <div style="display:flex; justify-content:space-between; margin-bottom:8px"><span>Date:</span> <strong>${tx.date}</strong></div>
          <div style="display:flex; justify-content:space-between; margin-bottom:8px"><span>Student:</span> <strong>${data.fees?.student?.name || 'Student'}</strong></div>
          <div style="display:flex; justify-content:space-between; margin-top:15px; font-size:18px"><span>Amount Paid:</span> <strong style="color:var(--color-primary)">₹${tx.amount.toLocaleString('en-IN')}</strong></div>
        </div>
        
        <button class="btn-primary" style="width:100%" onclick="window.print(); document.getElementById('receipt-modal').remove()"> <i class="fas fa-print"></i> Print Receipt</button>
        <button style="width:100%; margin-top:10px; background:none; border:none; color:var(--color-text-muted); font-size:13px; cursor:pointer" onclick="document.getElementById('receipt-modal').remove()">Close</button>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', m);
  };

  window.openRaiseConcernModal = function () {
    const modalHTML = `
    <div id="concern-modal" class="modal-overlay" onclick="if(event.target.id==='concern-modal') this.remove()">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header"><h3>Raise New Concern</h3><button class="modal-close" onclick="document.getElementById('concern-modal').remove()">×</button></div>
        <div class="modal-body">
          <label>Category</label>
          <select id="rc-cat" class="form-control">
            <option>Academic</option><option>Transport</option><option>Discipline</option><option>Facilities</option><option>Fine Arts</option>
          </select>
          <label>Priority</label>
          <select id="rc-pri" class="form-control">
            <option>Normal</option><option>Medium</option><option>High</option><option>Urgent</option>
          </select>
          <label>Concern Title</label>
          <input id="rc-title" class="form-control" placeholder="Short summary">
          <label>Detailed Explanation</label>
          <textarea id="rc-desc" class="form-control" rows="4" placeholder="Describe the issue..."></textarea>
          <button class="btn-primary" style="width:100%;margin-top:15px" onclick="submitParentConcern()">Submit Concern</button>
        </div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  };

  window.submitParentConcern = function () {
    const sid = getParentSid(window.currentUser);
    const cat = document.getElementById('rc-cat').value;
    const pri = document.getElementById('rc-pri').value;
    const title = document.getElementById('rc-title').value;
    const desc = document.getElementById('rc-desc').value;

    if (!title.trim() || !desc.trim()) {
      if (typeof window.simulateAction === 'function') window.simulateAction("Please fill all fields.");
      return;
    }

    const p = getChildProfile(sid);
    const newIssue = {
      id: `ISS-${Math.floor(1000 + Math.random() * 9000)}`,
      title: title,
      desc: desc,
      status: 'Open',
      stage: 'Teacher',
      studentId: sid,
      studentName: p.name,
      class: p.class,
      reporterId: window.currentUser.username,
      reporterName: window.currentUser.name,
      reporterRole: 'Parent',
      category: cat,
      priority: pri,
      severity: pri === 'Urgent' ? 'Critical' : 'Normal',
      assignedTo: `${p.classTeacher || 'Class Teacher'} (Teacher)`,
      attachments: [],
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      timeline: [{ date: new Date().toISOString(), actor: window.currentUser.name, role: 'Parent', note: "Concern submitted via portal." }]
    };

    window.GLOBAL_ISSUES = window.GLOBAL_ISSUES || [];
    window.GLOBAL_ISSUES.push(newIssue);
    if (typeof window.saveIssues === 'function') window.saveIssues(window.GLOBAL_ISSUES);

    document.getElementById('concern-modal').remove();
    if (typeof window.simulateAction === 'function') window.simulateAction("Concern submitted and added to workflow.");

    if (typeof window.buildDashboard === 'function') window.buildDashboard(window.currentUser);
    window.navigateTo('parent_messages');
  };

  window.parentDownloadData = function () {
    const sid = getParentSid(window.currentUser);
    const data = {
      user: window.currentUser,
      student: getChildProfile(sid),
      shared: getChildSharedData(sid),
      settings: getParentSettings(sid),
      concerns: (window.GLOBAL_ISSUES || []).filter(i => String(i.studentId) === String(sid))
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `campuscore_parent_data_${sid}.json`;
    a.click();
    if (typeof window.simulateAction === 'function') window.simulateAction("Data exported successfully.");
  };

  window.openParentComposeModal = function () {
    const sid = getParentSid(window.currentUser);
    const p = getChildProfile(sid);
    const modalHTML = `
    <div id="compose-modal" class="modal-overlay" onclick="if(event.target.id==='compose-modal') this.remove()">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header"><h3>Message Class Teacher</h3><button class="modal-close" onclick="document.getElementById('compose-modal').remove()">×</button></div>
        <div class="modal-body">
          <label>To:</label>
          <input class="form-control" value="${p.classTeacher || 'Anita Pillai'} (Class Teacher)" disabled>
          <label>Subject</label>
          <input id="msg-sub" class="form-control" placeholder="What is this about?">
          <label>Message</label>
          <textarea id="msg-body" class="form-control" rows="5" placeholder="Write your message..."></textarea>
          <button class="btn-primary" style="width:100%;margin-top:15px" onclick="submitParentMessage()">Send Message</button>
        </div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  };

  window.submitParentMessage = function () {
    const sid = getParentSid(window.currentUser);
    const sub = document.getElementById('msg-sub').value;
    const body = document.getElementById('msg-body').value;

    if (!sub.trim() || !body.trim()) {
      if (typeof window.simulateAction === 'function') window.simulateAction("Please fill all fields.");
      return;
    }

    const data = getChildSharedData(sid);
    data.messages = data.messages || [];
    data.messages.unshift({
      id: 'MSG-' + Date.now(),
      sender: 'Parent (Me)',
      recipient: 'Teacher',
      subject: sub,
      body: body,
      ts: 'Just now',
      unread: false,
      isOutbound: true
    });

    if (typeof window.saveStudentSharedData === 'function') {
      window.saveStudentSharedData(sid, data);
    } else {
      localStorage.setItem('campuscore_student_data_' + sid, JSON.stringify(data));
    }

    document.getElementById('compose-modal').remove();
    if (typeof window.simulateAction === 'function') window.simulateAction("Message sent to teacher.");
    if (typeof window.buildDashboard === 'function') window.buildDashboard(window.currentUser);
  };

  window.openParentMessage = function (msgId) {
    const sid = getParentSid(window.currentUser);
    const data = getChildSharedData(sid);
    const msg = (data.messages || []).find(m => m.id === msgId);
    if (!msg) return;

    // Mark as read
    if (msg.unread) {
      msg.unread = false;
      if (typeof window.saveStudentSharedData === 'function') {
        window.saveStudentSharedData(sid, data);
      } else {
        localStorage.setItem('campuscore_student_data_' + sid, JSON.stringify(data));
      }
    }

    const modalHTML = `
    <div id="view-msg-modal" class="modal-overlay" onclick="if(event.target.id==='view-msg-modal') this.remove()">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header"><h3>Message Detail</h3><button class="modal-close" onclick="document.getElementById('view-msg-modal').remove()">×</button></div>
        <div class="modal-body">
          <div style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid var(--color-border)">
            <div style="display:flex;justify-content:space-between"><strong>From: ${msg.sender}</strong><small>${msg.ts}</small></div>
            <div style="font-weight:700;margin-top:5px">Subject: ${msg.subject}</div>
          </div>
          <div style="line-height:1.6;color:var(--color-text)">${msg.body}</div>
          <button class="btn-primary" style="width:100%;margin-top:20px" onclick="document.getElementById('view-msg-modal').remove()">Close</button>
        </div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    if (typeof window.buildDashboard === 'function') window.buildDashboard(window.currentUser);
  };

  window.openEscalationTimelineModal = function (issueId) {
    const issue = (window.GLOBAL_ISSUES || []).find(i => i.id === issueId);
    if (!issue) return;

    const timelineHTML = (issue.timeline || []).map(t => `
      <div style="position:relative;padding-left:25px;margin-bottom:20px">
        <div style="position:absolute;left:0;top:5px;width:12px;height:12px;border-radius:50%;background:var(--color-primary)"></div>
        <div style="font-weight:700;font-size:13px">${t.actor} (${t.role})</div>
        <div style="color:var(--color-text-muted);font-size:11px">${new Date(t.date).toLocaleString()}</div>
        <div style="margin-top:5px;font-size:14px">${t.note}</div>
      </div>`).join('');

    const modalHTML = `
    <div id="timeline-modal" class="modal-overlay" onclick="if(event.target.id==='timeline-modal') this.remove()">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header"><h3>Concern Timeline: ${issueId}</h3><button class="modal-close" onclick="document.getElementById('timeline-modal').remove()">×</button></div>
        <div class="modal-body">
          <div style="margin-bottom:20px">
             <div style="font-weight:700;font-size:16px">${issue.title}</div>
             <div style="color:var(--color-text-muted);margin-top:5px">${issue.desc}</div>
          </div>
          <div style="border-left:2px solid var(--color-border);margin-left:5px">
            ${timelineHTML}
          </div>
          <button class="btn-primary" style="width:100%;margin-top:20px" onclick="document.getElementById('timeline-modal').remove()">Close</button>
        </div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  };

  window.openParentEditProfileModal = function () {
    const sid = getParentSid(window.currentUser);
    const p = getChildProfile(sid);
    const u = window.currentUser;

    const modalHTML = `
    <div id="edit-profile-modal" class="modal-overlay" onclick="if(event.target.id==='edit-profile-modal') this.remove()">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header"><h3>Edit Contact Information</h3><button class="modal-close" onclick="document.getElementById('edit-profile-modal').remove()">×</button></div>
        <div class="modal-body">
          <label>Primary Phone</label>
          <input id="edit-phone" class="form-control" value="${u.phone || p.parentContact}">
          <label>Email Address</label>
          <input id="edit-email" class="form-control" value="${u.email || p.parentEmail}">
          <button class="btn-primary" style="width:100%;margin-top:20px" onclick="saveParentProfile()">Save Changes</button>
        </div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  };

  window.saveParentProfile = function () {
    const phone = document.getElementById('edit-phone').value;
    const email = document.getElementById('edit-email').value;

    if (window.currentUser) {
      window.currentUser.phone = phone;
      window.currentUser.email = email;
      // Also update DEMO_USERS to persist during session
      const idx = window.DEMO_USERS.findIndex(u => u.username === window.currentUser.username);
      if (idx !== -1) window.DEMO_USERS[idx] = window.currentUser;
    }

    document.getElementById('edit-profile-modal').remove();
    if (typeof window.simulateAction === 'function') window.simulateAction("Contact information updated.");
    if (typeof window.buildDashboard === 'function') window.buildDashboard(window.currentUser);
  };

  window.getParentChildContext = function (user) {
    const sid = getParentSid(user);
    if (!sid) return {};
    return getChildProfile(sid);
  };

  window.getParentSid = getParentSid;
  window.getChildSharedData = getChildSharedData;
  window.getParentSettings = getParentSettings;

})();

/**
 * --- LIVE SUPABASE INTEGRATION FOR PARENTS ---
 */

async function refreshParentLiveDashboard() {
  const user = window.currentUser;
  if (!user) return;

  const sid = window.getParentSid ? window.getParentSid(user) : null;
  const localData = sid && window.getChildSharedData ? window.getChildSharedData(sid) : null;

  // Fallback population from local data if available
  if (localData) {
    if (localData.attendancePct) updatePStat('p-stat-att', localData.attendancePct + '%');
    if (Array.isArray(localData.homework)) updatePStat('p-stat-hw', localData.homework.filter(h => h.status === 'Pending').length);
    if (Array.isArray(localData.exams)) updatePStat('p-stat-exams', localData.exams.filter(e => new Date(e.date) >= new Date()).length);
    if (localData.results && localData.results.overall) updatePStat('p-stat-gpa', (localData.results.overall / 10).toFixed(1));
  }

  if (!window.supabaseClient) return;

  try {
    // 1. Fetch Child Profile via parent_email
    const { data: students, error: sErr } = await window.supabaseClient
      .from('students')
      .select('*, classes(name)')
      .eq('parent_email', user.email);

    if (sErr) throw sErr;
    
    if (students && students.length > 0) {
      const student = students[0];
      
      // Update welcome banner
      const banner = document.getElementById('parent-welcome-sub');
      if (banner) {
        banner.innerText = `Viewing dashboard for ${student.name} · Class ${student.classes ? student.classes.name : (student.class_id || 'N/A')}`;
        banner.classList.remove('skeleton');
      }

      // Fetch stats (Attendance, Marks, Exams)
      fetchParentStats(student.id);
    } 

    loadParentNotices();
  } catch (e) {
    console.warn('[CampusCore] Parent Live Sync unavailable, using local context.', e);
  }
}

async function fetchParentStats(studentUuid) {
  try {
    // Attendance
    const { data: attData } = await window.supabaseClient.from('attendance').select('status').eq('student_id', studentUuid);
    const present = (attData || []).filter(a => a.status === 'Present').length;
    const total = (attData || []).length;
    const pct = total > 0 ? Math.round((present / total) * 100) : '--';
    updatePStat('p-stat-att', pct + '%');

    // Homework (Mock or query homework table)
    updatePStat('p-stat-hw', '2');
    updatePStat('p-stat-exams', '1');

    // GPA
    const { data: student } = await window.supabaseClient.from('students').select('gpa').eq('id', studentUuid).single();
    updatePStat('p-stat-gpa', student ? student.gpa : '0.0');

  } catch (e) { console.error('[CampusCore] Error:', e); }
}

async function loadParentNotices() {
  const container = document.getElementById('parent-home-notices');
  if (!container) return;
  try {
    const { data } = await window.supabaseClient.from('announcements').select('*').order('date', { ascending: false }).limit(3);
    if (data && data.length > 0) {
      container.innerHTML = data.map(a => `
        <li class="activity-item">
          <div class="activity-dot" style="background:var(--color-primary)"></div>
          <div class="activity-text"><strong>${a.title}</strong><br><small>${new Date(a.date).toLocaleDateString()}</small></div>
        </li>`).join('');
    }
  } catch (e) { console.error('[CampusCore] Error:', e); }
}

function updatePStat(id, value) {
  const el = document.getElementById(id);
  if (el) { el.innerText = value; el.classList.remove('skeleton'); }
}
