/* ============================================================
   CAMPUS CORE – STUDENT.JS
   Student role selection + Class 9C student dashboard
   ============================================================ */

(function () {
  const STUDENT_9C = [
    { roll: 1, id: "3160136", name: "PRANEETH BHUKYA" },
    { roll: 2, id: "3160417", name: "SATHWIK REDDY GANTA" },
    { roll: 3, id: "3160662", name: "KOTHA ASHVIK" },
    { roll: 4, id: "3170292", name: "BOPPARAJU ABHIRAM" },
    { roll: 5, id: "3170355", name: "BOYINI VIVEKANANDA MUDIRAJ" },
    { roll: 6, id: "3170390", name: "LOLLA ABHIRAM" },
    { roll: 7, id: "3180076", name: "KASULA ASHWATH" },
    { roll: 8, id: "3180133", name: "SNITHIK VENGALA" },
    { roll: 9, id: "3180183", name: "NIDHISH DUMALA" },
    { roll: 10, id: "3180184", name: "YAMMANURU HARITEJA" },
    { roll: 11, id: "3180286", name: "CHARAN BATTU" },
    { roll: 12, id: "3190472", name: "ATHUL M" },
    { roll: 13, id: "3200320", name: "SIDDHARTH REDDY SADIVILLA" },
    { roll: 14, id: "3200437", name: "SIDDALA RAMCHARAN" },
    { roll: 15, id: "3210447", name: "SAPAVATH JAHNAVI" },
    { roll: 16, id: "3210590", name: "K MOKSHA" },
    { roll: 17, id: "3230302", name: "BOJJA HARIKESH REDDY" },
    { roll: 18, id: "3230706", name: "EKADANTHA YADAV" },
    { roll: 19, id: "3240214", name: "NIMMAKAYALA PRATEEK REDDY" },
    { roll: 20, id: "3240504", name: "CHEEKOORI SAI CHARAN" },
    { roll: 21, id: "3240693", name: "VALLETI SAI HARSHITH" },
    { roll: 22, id: "3250112", name: "P SATHWIK REDDY" },
    { roll: 23, id: "3260066", name: "DEPA AARYAN REDDY" },
    { roll: 24, id: "3230719", name: "G MANASWINI" },
    { roll: 25, id: "3170068", name: "SHERI RITHIK REDDY" },
    { roll: 26, id: "3220915", name: "BHUKYA PRANAVI" },
    { roll: 27, id: "3190133", name: "TANABUDDI SRI BHAVESH REDDY" },
  ];

  function initializeMasterStudentRegistry() {
    const STUDENTS_REG = [
      { sno: 1, id: '3160136', name: 'PRANEETH BHUKYA', class: '9', section: 'C', roll: 1 },
      { sno: 2, id: '3160417', name: 'SATHWIK REDDY GANTA', class: '9', section: 'C', roll: 2 },
      { sno: 3, id: '3160662', name: 'KOTHA ASHVIK', class: '9', section: 'C', roll: 3 },
      { sno: 4, id: '3170292', name: 'BOPPARAJU ABHIRAM', class: '9', section: 'C', roll: 4 },
      { sno: 5, id: '3170355', name: 'BOYINI VIVEKANANDA MUDIRAJ', class: '9', section: 'C', roll: 5 },
      { sno: 6, id: '3170390', name: 'LOLLA ABHIRAM', class: '9', section: 'C', roll: 6 },
      { sno: 7, id: '3180076', name: 'KASULA ASHWATH', class: '9', section: 'C', roll: 7 },
      { sno: 8, id: '3180133', name: 'SNITHIK VENGALA', class: '9', section: 'C', roll: 8 },
      { sno: 9, id: '3180183', name: 'NIDHISH DUMALA', class: '9', section: 'C', roll: 9 },
      { sno: 10, id: '3180184', name: 'YAMMANURU HARITEJA', class: '9', section: 'C', roll: 10 },
      { sno: 11, id: '3180286', name: 'CHARAN BATTU', class: '9', section: 'C', roll: 11 },
      { sno: 12, id: '3190472', name: 'ATHUL M', class: '9', section: 'C', roll: 12 },
      { sno: 13, id: '3200320', name: 'SIDDHARTH REDDY SADIVILLA', class: '9', section: 'C', roll: 13 },
      { sno: 14, id: '3200437', name: 'SIDDALA RAMCHARAN', class: '9', section: 'C', roll: 14 },
      { sno: 15, id: '3210447', name: 'SAPAVATH JAHNAVI', class: '9', section: 'C', roll: 15 },
      { sno: 16, id: '3210590', name: 'K MOKSHA', class: '9', section: 'C', roll: 16 },
      { sno: 17, id: '3230302', name: 'BOJJA HARIKESH REDDY', class: '9', section: 'C', roll: 17 },
      { sno: 18, id: '3230706', name: 'EKADANTHA YADAV', class: '9', section: 'C', roll: 18 },
      { sno: 19, id: '3240214', name: 'NIMMAKAYALA PRATEEK REDDY', class: '9', section: 'C', roll: 19 },
      { sno: 20, id: '3240504', name: 'CHEEKOORI SAI CHARAN', class: '9', section: 'C', roll: 20 },
      { sno: 21, id: '3240693', name: 'VALLETI SAI HARSHITH', class: '9', section: 'C', roll: 21 },
      { sno: 22, id: '3250112', name: 'P SATHWIK REDDY', class: '9', section: 'C', roll: 22 },
      { sno: 23, id: '3260066', name: 'DEPA AARYAN REDDY', class: '9', section: 'C', roll: 23 },
      { sno: 24, id: '3230719', name: 'G MANASWINI', class: '9', section: 'C', roll: 24 },
      { sno: 25, id: '3170068', name: 'SHERI RITHIK REDDY', class: '9', section: 'C', roll: 25 },
      { sno: 26, id: '3220915', name: 'BHUKYA PRANAVI', class: '9', section: 'C', roll: 26 },
      { sno: 27, id: '3190133', name: 'TANABUDDI SRI BHAVESH REDDY', class: '9', section: 'C', roll: 27 }
    ];

    STUDENTS_REG.forEach(student => {
      const key = 'campuscore_student_data_' + student.id;
      const existing = JSON.parse(localStorage.getItem(key) || '{}');

      const updated = {
        ...existing,
        studentId: student.id,
        name: student.name,
        currentClass: existing.currentClass || student.class,
        currentSection: existing.currentSection || student.section,
        originalClass: student.class,
        originalSection: student.section,
        roll: student.roll,
        sno: student.sno,
        class9cStudent: true,
        lastSyncedFromRegistry: new Date().toISOString()
      };

      localStorage.setItem(key, JSON.stringify(updated));
    });

    localStorage.setItem('campuscore_master_registry_initialized', 'true');
    localStorage.setItem('campuscore_master_registry_count', '27');
  }

  // Auto-initialize on load
  initializeMasterStudentRegistry();
  window.initializeMasterStudentRegistry = initializeMasterStudentRegistry;


  const FEMALE_NAMES = new Set(["SAPAVATH JAHNAVI", "K MOKSHA", "G MANASWINI", "BHUKYA PRANAVI"]);
  const SUBJECTS = [
    "Mathematics", "Physics", "Chemistry", "Biology",
    "English Literature", "History", "Computer Science", "Physical Education"
  ];
  window.SUBJECTS = SUBJECTS;
  window.STUDENT_9C = STUDENT_9C;

  function hashNum(seed, min, max) {
    const s = String(seed);
    let h = 0;
    for (let i = 0; i < s.length; i++) h = ((h << 5) - h) + s.charCodeAt(i);
    const n = Math.abs(h);
    return min + (n % (max - min + 1));
  }
  window.hashNum = hashNum;
  function sidFromUser(user) {
    if (user && user.childId) return String(user.childId);
    const m = String(user && user.username || "").toUpperCase().match(/^P(\d+)A$/);
    return m ? m[1] : "";
  }
  window.sidFromUser = sidFromUser;
  function bySid(sid) {
    return STUDENT_9C.find(s => s.id === sid) || STUDENT_9C[0];
  }
  window.bySid = bySid;
  function studentSettingsKey(sid) { return `campuscore_student_settings_${sid}`; }
  function studentProfileKey(sid) { return `campuscore_student_profile_${sid}`; }
  function studentSharedDataKey(sid) { return `campuscore_student_data_${sid}`; }
  function accountPasswordKey(accountId) { return `campuscore_account_password_${String(accountId || "").toUpperCase()}`; }
  function accountIdFromSid(sid) { return `P${sid}A`; }
  function accountIdFromUser(user) {
    if (user && user.username) return String(user.username).toUpperCase();
    const sid = sidFromUser(user);
    return accountIdFromSid(sid);
  }
  function getAccountPassword(accountId, fallback = "PARENT123") {
    return localStorage.getItem(accountPasswordKey(accountId)) || fallback;
  }
  function setAccountPassword(accountId, password) {
    localStorage.setItem(accountPasswordKey(accountId), password);
  }

  function getStudentBase(sid) {
    const s = bySid(sid);
    const first = s.name.split(" ")[0].toLowerCase();
    const last = s.name.split(" ").slice(-1)[0];
    const bloods = ["A+", "B+", "O+", "AB+", "A-", "O-"];
    return {
      fullName: s.name,
      studentId: s.id,
      className: "9C",
      rollNo: s.roll,
      dob: `${String(hashNum(s.id, 1, 28)).padStart(2, "0")} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][hashNum(s.id, 0, 11)]} ${hashNum(s.id, 2009, 2011)}`,
      gender: FEMALE_NAMES.has(s.name) ? "Female" : "Male",
      bloodGroup: bloods[(s.roll - 1) % bloods.length],
      address: "DPS Nadergul Campus Area, Hyderabad - 501510",
      parentName: `Mr/Mrs ${last}`,
      parentContact: `+91 98765 ${String(hashNum(s.id, 10000, 99999))}`,
      email: `${first}.${s.id}@dpsnadergul.edu.in`,
      admissionYear: "2022",
      house: ["Red", "Blue", "Green", "Yellow"][(s.roll - 1) % 4],
    };
  }

  function getStudentProfile(sid) {
    const base = getStudentBase(sid);
    const saved = JSON.parse(localStorage.getItem(studentProfileKey(sid)) || "{}");
    return { ...base, ...saved };
  }
  function saveStudentProfile(sid, profilePatch) {
    const merged = { ...getStudentProfile(sid), ...profilePatch };
    localStorage.setItem(studentProfileKey(sid), JSON.stringify(merged));
  }

  function getStudentSettings(sid) {
    const defaults = { darkMode: false, compactMode: false, hwReminders: true, examAlerts: true, noticeAlerts: true, msgAlerts: true, twoFactor: false, language: "English" };
    return { ...defaults, ...(JSON.parse(localStorage.getItem(studentSettingsKey(sid)) || "{}")) };
  }
  function saveStudentSettings(sid, patch) {
    const merged = { ...getStudentSettings(sid), ...patch };
    localStorage.setItem(studentSettingsKey(sid), JSON.stringify(merged));
    const userId = (window.currentUser && window.currentUser.id) || sid;
    if (typeof handleSettingToggle === "function") {
      if (Object.prototype.hasOwnProperty.call(patch, "darkMode")) handleSettingToggle(userId, "darkMode", !!merged.darkMode);
      if (Object.prototype.hasOwnProperty.call(patch, "compactMode")) handleSettingToggle(userId, "compactMode", !!merged.compactMode);
    }
    document.documentElement.setAttribute("data-theme", merged.darkMode ? "dark" : "light");
    document.documentElement.setAttribute("data-compact", merged.compactMode ? "true" : "false");
  }

  function getAttendancePct(sid) {
    const n = parseInt(String(sid).slice(-2), 10);
    return 78 + (n % 21);
  }
  function getSubjectAttendance(sid) {
    const base = getAttendancePct(sid);
    return SUBJECTS.map((sub, i) => ({ subject: sub, pct: Math.min(99, Math.max(70, base + ((i % 2 === 0 ? -1 : 1) * ((i % 3) + 1)))) }));
  }
  function attendanceStatusBadge(p) {
    if (p < 85) return { cls: "var(--color-danger)", text: "Your attendance is below 85%. Please contact your class teacher." };
    if (p <= 90) return { cls: "#f57c00", text: "Attendance is in caution range. Improve regularity this month." };
    return { cls: "var(--color-success)", text: "Great attendance. Keep it up!" };
  }

  function seedHomework(sid) {
    const subjects = [
      ["Mathematics", "Finish Exercises 1.4 - 1.6 on Quadratic Equations."],
      ["Physics", "Draw diagram of electric motor and explain working principle."],
      ["Chemistry", "List 20 common elements with their atomic numbers and symbols."],
      ["Biology", "Read Chapter 4: Cell Structure and complete the worksheet."],
      ["English Literature", "Write a summary of 'The Merchant of Venice' Act 1."],
      ["History", "Prepare a timeline of the Indian Independence Movement."],
      ["Computer Science", "Implement a simple calculator using if-else logic in JavaScript."],
      ["Civics", "Research the powers of the Parliament of India."],
      ["Geography", "Map work: Identify major rivers and mountain ranges of India."],
      ["Hindi", "Complete the essay on 'Mere Sapno Ka Bharat'."],
      ["Physical Education", "Prepare a report on your favorite sports personality."]
    ];
    const statuses = ["Pending", "Completed", "Submitted", "Late", "Pending", "Pending", "Completed", "Submitted", "Pending", "Late", "Completed"];
    
    // Pick 7 based on sid hash
    const startIdx = hashNum(sid, 0, subjects.length - 7);
    const selected = subjects.slice(startIdx, startIdx + 7);

    return selected.map((x, i) => {
      const d = 10 + (i * 2);
      return {
        id: `HW-${sid}-${i}`,
        subject: x[0],
        task: x[1],
        teacher: ({
          Mathematics: "Ramesh Sharma", Physics: "Venkat Iyer", Chemistry: "Mohan Das",
          Biology: "Pooja Mehta", "English Literature": "Anita Pillai", History: "Sunita Verma", 
          "Computer Science": "Prasana Reddy", Civics: "Amitabh Raj", Geography: "Sushma Swaraj",
          Hindi: "Rajesh Kumar", "Physical Education": "Coach Raju"
        })[x[0]] || "Class Teacher",
        assignedDate: `2026-04-${String(Math.max(1, d - 3)).padStart(2, "0")}`,
        dueDate: `2026-04-${String(d).padStart(2, "0")}`,
        status: statuses[i] || "Pending",
      };
    });
  }
  function seedExamSchedule() {
    return [
      { id: "EX1", subject: "Mathematics", type: "Unit Test", date: "2026-04-10", time: "09:00 AM", duration: "90 min", venue: "Room 201", topics: ["Algebraic expressions", "Quadratic equations", "Word problems"] },
      { id: "EX2", subject: "Physics", type: "Practical", date: "2026-04-13", time: "10:30 AM", duration: "60 min", venue: "Physics Lab", topics: ["Motion", "Force", "Friction"] },
      { id: "EX3", subject: "Chemistry", type: "Unit Test", date: "2026-04-18", time: "09:00 AM", duration: "90 min", venue: "Room 204", topics: ["Atoms", "Elements", "Compounds", "Valency"] },
      { id: "EX4", subject: "English Literature", type: "Mid Term", date: "2026-03-15", time: "11:00 AM", duration: "120 min", venue: "Hall B", topics: ["Prose lessons", "Poetry", "Grammar", "Comprehension"] },
      { id: "EX5", subject: "History", type: "Final", date: "2026-02-20", time: "09:00 AM", duration: "120 min", venue: "Hall A", topics: ["Industrial revolution", "Colonial India", "National movement"] },
      { id: "EX6", subject: "Computer Science", type: "Practical", date: "2026-03-28", time: "01:30 PM", duration: "60 min", venue: "Computer Lab", topics: ["Flowcharts", "Loops", "Conditions", "I/O"] },
    ];
  }
  function examStatus(dateStr) { return new Date(dateStr) >= new Date(new Date().toISOString().slice(0, 10)) ? "Upcoming" : "Completed"; }

  function gradeOf(p) {
    if (p >= 90) return "A+";
    if (p >= 80) return "A";
    if (p >= 70) return "B+";
    if (p >= 60) return "B";
    if (p >= 50) return "C";
    return "D";
  }
  function generateResults(sid) {
    const marks = SUBJECTS.map((sub, i) => {
      const m = 55 + (hashNum(`${sid}-${sub}`, 0, 40));
      const pct = Math.max(35, Math.min(98, m));
      return { subject: sub, marks: pct, total: 100, pct, grade: gradeOf(pct), remarks: pct >= 85 ? "Excellent" : pct >= 70 ? "Good effort" : "Needs improvement" };
    });
    const overall = Math.round(marks.reduce((a, b) => a + b.pct, 0) / marks.length);
    const t1 = Math.max(50, overall - 9);
    const mt = Math.max(55, overall - 4);
    const t2 = Math.max(60, overall - 2);
    return { marks, overall, trend: [{ label: "Unit Test 1", pct: t1 }, { label: "Mid Term", pct: mt }, { label: "Unit Test 2", pct: t2 }, { label: "Final", pct: overall }] };
  }

  function generateActivityLog(sid) {
    return [
      { text: "Attendance marked: Present", time: "Today 08:32 AM", icon: "✅", color: "var(--color-success)" },
      { text: "New Physics assignment uploaded", time: "Yesterday 04:15 PM", icon: "📝", color: "var(--color-primary)" },
      { text: "Fee payment confirmed: ₹12,500", time: "2 days ago", icon: "💰", color: "var(--color-warning)" },
      { text: "Mathematics Unit Test result published", time: "3 days ago", icon: "📊", color: "var(--color-info)" },
      { text: "Participated in Inter-school Debate", time: "4 days ago", icon: "🏆", color: "#f57c00" }
    ];
  }

  function seedMessages(sid, studentName) {
    const first = studentName.split(" ")[0];
    const pool = [
      { sender: "Anita Pillai", role: "Class Teacher", subject: "Homework Reminder", body: `Hi ${first},\nPlease submit your pending homework by Friday.\n\n- Class Teacher`, ts: "Today 10:15 AM" },
      { sender: "Venkat Iyer", role: "Physics Teacher", subject: "Lab Report Status", body: `Hello ${first},\nYour physics lab report is due next week. Ensure all data is logged correctly.\n\n- Physics Dept`, ts: "Yesterday 2:30 PM" },
      { sender: "Suman", role: "Vice Principal", subject: "Academic Appreciation", body: `Dear ${studentName},\nWe've noticed your improved performance in recent tests. Keep it up!\n\n- VP Suman`, ts: "2 days ago" },
      { sender: "Anitha", role: "Coordinator", subject: "Uniform Notice", body: `Dear ${first},\nPlease ensure full school uniform starting Monday.\n\n- Administration`, ts: "3 days ago" },
      { sender: "Coach Raju", role: "PE Coach", subject: "Sports Day Signup", body: `Hey ${first},\nSports day signups are open till Thursday. Don't miss out!`, ts: "Today 08:30 AM" },
      { sender: "Librarian", role: "Staff", subject: "Library Book Overdue", body: `Hi ${first},\nThe book 'Introduction to Algorithms' is due for return.`, ts: "4 days ago" },
      { sender: "Office Room", role: "Admin", subject: "Fee Receipt Generated", body: `Dear Parent,\nQ4 Fee receipt for ${studentName} is generated and available in the fees section.`, ts: "Yesterday 11:00 AM" }
    ];
    // Pick 4 based on ID hash
    const idx1 = hashNum(sid + "m1", 0, pool.length - 1);
    const idx2 = (idx1 + 1) % pool.length;
    const idx3 = (idx1 + 2) % pool.length;
    const idx4 = (idx1 + 3) % pool.length;
    
    return [pool[idx1], pool[idx2], pool[idx3], pool[idx4]].map((m, i) => ({
      id: `${sid}-M${i + 1}`,
      ...m,
      preview: m.body.slice(0, 50) + "...",
      unread: i < 2,
      replies: []
    }));
  }

  function getNotices() {
    const list = JSON.parse(localStorage.getItem("campuscore_notices") || JSON.stringify(ANNOUNCEMENTS || []));
    return list.filter(n => !n.target || n.target === "All" || n.target === "Students" || n.target === "Student");
  }
  function getStudentSharedData(sid) {
    const key = studentSharedDataKey(sid);
    const profile = getStudentProfile(sid);
    const existing = JSON.parse(localStorage.getItem(key) || "null");
    if (existing) return existing;
    const seeded = {
      studentId: sid,
      attendancePct: getAttendancePct(sid),
      subjectAttendance: getSubjectAttendance(sid),
      homework: seedHomework(sid),
      exams: seedExamSchedule(),
      results: generateResults(sid),
      fees: {
        total_due: 45000,
        paid: 30000 + (hashNum(sid, 0, 10) * 500),
        pending: 15000 - (hashNum(sid, 0, 10) * 500),
        next_due: '5 Apr 2026'
      },
      feeHistory: [
        { date: '15 Mar 2026', desc: 'Tuition Fee', amount: 30000, mode: 'Online', status: 'Paid' },
        { date: '20 Mar 2026', desc: 'Transport Fee', amount: 5000, mode: 'Online', status: 'Paid' },
      ],
      noticesRead: [],
      messages: seedMessages(sid, profile.fullName)
    };
    localStorage.setItem(key, JSON.stringify(seeded));
    return seeded;
  }
  function saveStudentSharedData(sid, data) {
    localStorage.setItem(studentSharedDataKey(sid), JSON.stringify(data));
  }
  window.getStudentSharedData = getStudentSharedData;
  window.saveStudentSharedData = saveStudentSharedData;
  window.getStudentProfileData = getStudentProfile;
  window.getStudentIdFromUser = sidFromUser;
  window.getAccountPassword = getAccountPassword;
  window.setAccountPassword = setAccountPassword;
  window.getAccountIdFromUser = accountIdFromUser;

  function studentContext(user) {
    const sid = sidFromUser(user);
    const profile = getStudentProfile(sid);
    const shared = getStudentSharedData(sid);
    return { sid, profile, shared, user };
  }
  window.studentContext = studentContext;

  function getStudentContextData(user) {
    const ctx = studentContext(user) || {};
    const sid = ctx.sid || '3180076';
    const profile = ctx.profile || getStudentProfile(sid);
    const shared = ctx.shared || getStudentSharedData(sid) || {};

    const homework = Array.isArray(shared.homework) ? shared.homework : seedHomework(sid);
    const messages = Array.isArray(shared.messages) ? shared.messages : seedMessages(sid, profile.name);
    const notices = getNotices() || [];
    const read = new Set(shared.noticesRead || []);
    const results = shared.results || generateResults(sid);
    const exams = Array.isArray(shared.exams) ? shared.exams : seedExamSchedule();
    const attendancePct = shared.attendancePct || getAttendancePct(sid) || 0;
    
    shared.exams = shared.exams || seedExamSchedule();
    shared.messages = shared.messages || seedMessages(sid, profile.name);
    shared.activities = shared.activities || generateActivityLog(sid);
    saveStudentSharedData(sid, shared);

    return {
      sid, profile, homework, messages, notices, read, results, exams, attendancePct,
      name: profile.name || user.name,
      pendingHomework: homework.filter(h => h.status === "Pending").length,
      upcomingExams: exams.filter(e => examStatus(e.date) === "Upcoming").length,
      unreadMessages: messages.filter(m => m.unread).length,
      unreadNotices: notices.filter(n => !read.has(String(n.id))).length,
      latestResult: results.overall || 0,
      shared
    };
  }

  function rerenderStudent(sectionId) {
    buildDashboard(currentUser);
    if (sectionId) navigateTo(sectionId);
    buildSidebar(currentUser);
  }
  window.rerenderStudent = rerenderStudent;

  window.getPostLoginUser = function getPostLoginUser(user) {
    const u = { ...user };
    const sid = sidFromUser(u);
    if (!sid || !bySid(sid)) return Promise.resolve(u);

    // Enforce overlay choice for Parent/Student usernames for variety, 
    // but skip for high-level roles like VP, Teacher, etc.
    const skipRoles = ["vice_principal", "teacher", "coordinator", "class_teacher", "principal", "super_admin", "apaaas"];
    if (skipRoles.includes(u.role)) return Promise.resolve(u);

    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.id = "role-select-overlay";
      overlay.className = "modal-overlay";
      const lastRole = localStorage.getItem(`cc_last_role_${u.username}`) || "";
      overlay.innerHTML = `
        <div class="modal-content" style="max-width:900px">
          <div class="modal-header"><h3>Welcome back! Who is accessing?</h3></div>
          <div class="modal-body">
            <div style="display:grid;grid-template-columns:repeat(2,minmax(260px,1fr));gap:16px">
              <button id="role-parent-btn" style="border:2px solid ${lastRole === "parent" ? "var(--color-primary)" : "var(--color-border)"};background:var(--color-surface);border-radius:14px;padding:18px;cursor:pointer;text-align:left">
                <div style="font-size:24px;margin-bottom:8px">👨‍👩‍👧</div>
                <div style="font-size:18px;font-weight:800;color:var(--color-text);margin-bottom:8px">Parent / Guardian</div>
                <div style="font-size:13px;color:var(--color-text-muted)">View your child's progress, fees, notices and communicate with school</div>
              </button>
              <button id="role-student-btn" style="border:2px solid ${lastRole === "student" ? "var(--color-primary)" : "var(--color-border)"};background:var(--color-surface);border-radius:14px;padding:18px;cursor:pointer;text-align:left">
                <div style="font-size:24px;margin-bottom:8px">🎓</div>
                <div style="font-size:18px;font-weight:800;color:var(--color-text);margin-bottom:8px">Student</div>
                <div style="font-size:13px;color:var(--color-text-muted)">View your timetable, homework, results and school notices</div>
              </button>
            </div>
            <div style="text-align:center;margin-top:16px">
              <a href="#" id="role-back-login" style="color:var(--color-primary);font-weight:700">Back to Login</a>
            </div>
          </div>
        </div>`;
      document.body.appendChild(overlay);
      document.getElementById("role-parent-btn").onclick = () => {
        localStorage.setItem(`cc_last_role_${u.username}`, "parent");
        overlay.remove();
        resolve({ ...u, role: "parent", roleLabel: "Parent", childId: sid });
      };
      document.getElementById("role-student-btn").onclick = () => {
        localStorage.setItem(`cc_last_role_${u.username}`, "student");
        overlay.remove();
        const s = bySid(sid);
        resolve({
          ...u,
          role: "student",
          roleLabel: "Student",
          childId: sid,
          name: s.name,
          department: "Class " + (getStudentSharedData(sid).currentClass || "9") + (getStudentSharedData(sid).currentSection || "C"),
          email: getStudentProfile(sid).email
        });
      };
      document.getElementById("role-back-login").onclick = (e) => {
        e.preventDefault();
        overlay.remove();
        resolve(null);
        if (typeof logout === "function") logout();
      };
    });
  };

  function ensureParentAccounts() {
    if (!Array.isArray(window.DEMO_USERS)) return;
    const preserved = DEMO_USERS.filter(u => !/^P\d+A$/i.test(u.username));
    const parents = STUDENT_9C.map((s, i) => ({
      id: 1000 + i,
      username: `P${s.id}A`,
      password: "PARENT123",
      name: `Parent of ${s.name}`,
      role: "parent",
      roleLabel: "Parent",
      department: `Parent of ${s.name} (Class 9-C)`,
      phone: `+91 98765 ${String(hashNum(s.id, 10000, 99999))}`,
      email: `${s.name.split(" ")[0].toLowerCase()}.${s.id}@parent.dpsnadergul.edu.in`,
      joined: "Apr 2024",
      avatar_color: "#f57c00",
      icon: "fa-user-friends",
      childName: s.name,
      childId: s.id,
      childClass: "9-C",
      childRoll: String(s.roll).padStart(2, "0"),
      notifications: [
        { id: `notif-${s.id}-1`, type: "Attendance", text: `${s.name} was marked Present today.`, time: "Today 08:45 AM", unread: true, color: "var(--color-success)" },
        { id: `notif-${s.id}-2`, type: "Fee", text: "Q4 Tuition fee notice generated.", time: "Yesterday 4:00 PM", unread: true, color: "var(--color-warning)" },
        { id: `notif-${s.id}-3`, type: "Homework", text: "New assignment uploaded in Mathematics.", time: "2 days ago", unread: false, color: "var(--color-primary)" }
      ],
    }));
    window.DEMO_USERS = [...preserved, ...parents];
  }
  ensureParentAccounts();

  if (window.ROLE_NAV) {
    ROLE_NAV.student = [
      { label: "DASHBOARD", items: [{ id: "home", icon: "fa-home", label: "Overview" }, { id: "profile", icon: "fa-user-circle", label: "My Profile" }] },
      {
        label: "ACADEMICS", items: [
          { id: "student_attendance", icon: "fa-clipboard-check", label: "Attendance" },
          { id: "student_homework", icon: "fa-book-open", label: "Homework" },
          { id: "student_timetable", icon: "fa-calendar-alt", label: "Timetable" },
          { id: "student_exams", icon: "fa-file-signature", label: "Exam Schedule" },
          { id: "student_results", icon: "fa-chart-bar", label: "Results & Marks" }
        ]
      },
      {
        label: "COMMUNICATION", items: [
          { id: "student_notices", icon: "fa-bullhorn", label: "Notices" },
          { id: "student_messages", icon: "fa-envelope", label: "Messages" }
        ]
      },
      {
        label: "SYSTEM", items: [
          { id: "student_settings", icon: "fa-cog", label: "Settings" },
          { id: "logout", icon: "fa-sign-out-alt", label: "Logout" }
        ]
      },
    ];
  }

  window.buildStudentDashboard = function buildStudentDashboard(user) {
    const d = getStudentContextData(user);
    return [
      buildStudentHome(d),
      buildStudentProfile(d),
      buildStudentIdCard(d),
      buildStudentAttendance(d),
      buildStudentTimetable(d),
      buildStudentHomework(d),
      buildStudentExams(d),
      buildStudentResults(d),
      buildStudentAlmanac(d),
      buildStudentRequests(d),
      buildStudentHelpdesk(d),
      buildStudentNotices(d),
      buildStudentMessages(d),
      buildStudentSettings(d),
    ].join("");
  };

  function buildStudentHome(d) {
    const greeting = typeof window.getGreeting === 'function' ? window.getGreeting() : "Welcome";
    const dateStr = typeof window.getFormattedDate === 'function' ? window.getFormattedDate() : "";
    const first = d.profile.fullName.split(" ")[0];
    
    const cards = [
      ["Attendance %", `${d.attendancePct}%`, "📋"],
      ["Pending Homework", d.pendingHomework, "📝"],
      ["Upcoming Exams", d.upcomingExams, "📅"],
      ["Latest Result %", `${d.latestResult}%`, "📊"],
      ["Unread Notices", d.unreadNotices, "📢"],
      ["Unread Messages", d.unreadMessages, "✉️"],
    ].map(x => `<div class="stat-card"><div class="stat-card-icon">${x[2]}</div><div class="stat-value">${x[1]}</div><div class="stat-label">${x[0]}</div></div>`).join("");
    
    const quick = [
      ["View Timetable", "student_timetable"],
      ["Submit Homework", "student_homework"],
      ["Check Results", "student_results"],
      ["View Notices", "student_notices"]
    ].map(q => `<button class="quick-action-btn" onclick="navigateTo('${q[1]}')"><div class="qa-icon" style="background:var(--color-primary)"><i class="fas fa-arrow-right"></i></div><span class="qa-label">${q[0]}</span></button>`).join("");

    const activities = (d.shared.activities || []).map(a => `
      <li class="activity-item">
        <div class="activity-dot" style="background:${a.color}"></div>
        <div class="activity-text">${a.icon} ${a.text}</div>
        <div class="activity-time">${a.time}</div>
      </li>`).join('');

    return `<div class="dash-section active" id="section-home">
      <div class="welcome-banner">
        <div class="welcome-greeting">${greeting}, ${first}! 👋</div>
        <div class="welcome-sub">Student Dashboard · Class ${d.profile.class} · Roll No: ${d.profile.roll}</div>
        <div class="welcome-date"><i class="far fa-calendar-alt"></i> ${dateStr}</div>
      </div>

      <div class="stats-grid">${cards}</div>

      <div class="content-grid">
        <div class="card">
          <h3>⚡ Quick Links</h3>
          <div class="quick-actions">${quick}</div>
        </div>
        <div class="card">
          <h3>⏱️ Recent Activity</h3>
          <ul class="activity-list">${activities}</ul>
        </div>
      </div>
    </div>`;
  }
  function buildStudentProfile(d) {
    const p = d.profile;
    const sharedData = window.getStudentSharedData ? window.getStudentSharedData(d.sid) : {};
    const displayClass = sharedData.currentClass || '9';
    const displaySection = sharedData.currentSection || 'C';

    return `<div class="dash-section" id="section-profile">
      <div class="card"><h3>👤 My Profile</h3>
      ${pRow("Full Name", p.fullName)}${pRow("Student ID", p.studentId)}${pRow("Class", displayClass)}${pRow("Section", displaySection)}${pRow("Roll Number", p.rollNo)}
      ${pRow("Date of Birth", p.dob)}${pRow("Gender", p.gender)}${pRow("Blood Group", p.bloodGroup)}${pRow("Address", p.address)}
      ${pRow("Parent/Guardian Name", p.parentName)}${pRow("Parent Contact", p.parentContact)}${pRow("Email", p.email)}${pRow("Admission Year", p.admissionYear)}${pRow("House", p.house)}
      <div style="display:flex;gap:10px;margin-top:14px">
        <button class="btn-primary" onclick="openStudentEditProfileModal()">Edit Profile</button>
        <button class="btn-primary" onclick="openStudentChangePasswordModal()">Change Password</button>
      </div></div>
    </div>`;
  }


  function buildStudentAttendance(d) {
    const status = attendanceStatusBadge(d.attendancePct);
    const subData = (getStudentSharedData(d.sid).subjectAttendance || getSubjectAttendance(d.sid));
    const subRows = subData.map(r => `<tr><td>${r.subject}</td><td><strong style="color:${r.pct > 90 ? "var(--color-success)" : r.pct >= 85 ? "#f57c00" : "var(--color-danger)"}">${r.pct}%</strong></td></tr>`).join("");
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    const days = new Date(y, m + 1, 0).getDate();
    let md = "";
    for (let i = 1; i <= days; i++) {
      const dt = new Date(y, m, i);
      let t = "Holiday";
      if (dt.getDay() === 0) t = "Sunday";
      else if (i % 7 === 0) t = "Absent";
      else if (i % 6 === 0) t = "Holiday";
      else t = "Present";
      md += `<tr><td>${i}</td><td>${t === "Present" ? "🟢" : t === "Absent" ? "🔴" : t === "Sunday" ? "—" : "⚪"}</td><td>${t}</td></tr>`;
    }
    return `<div class="dash-section" id="section-student_attendance">
      <div class="card"><h3>📋 Attendance</h3>
        <div style="font-size:34px;font-weight:900;color:${status.cls}">${d.attendancePct}%</div>
        <div style="padding:10px;border-radius:8px;background:${status.cls}22;color:${status.cls};font-weight:700">${status.text}</div>
      </div>
      <div class="content-grid">
        <div class="card"><h3>Monthly Breakdown</h3><div style="max-height:320px;overflow:auto"><table class="data-table"><thead><tr><th>Day</th><th>Mark</th><th>Status</th></tr></thead><tbody>${md}</tbody></table></div></div>
        <div class="card"><h3>Subject-wise Attendance</h3><table class="data-table"><thead><tr><th>Subject</th><th>Attendance</th></tr></thead><tbody>${subRows}</tbody></table></div>
      </div>
    </div>`;
  }
  function buildStudentTimetable(d) {
    const sharedData = window.getStudentSharedData ? window.getStudentSharedData(d.sid) : {};
    const displayClass = sharedData.currentClass || '9';
    const displaySection = sharedData.currentSection || 'C';
    const displayClassFull = displayClass + displaySection;

    const key = "cc_student_tt_filter";
    const filter = localStorage.getItem(key) || "today";
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const todayName = days[(new Date().getDay() + 6) % 7] || "Monday";
    const periods = [
      "8:00-8:45", "8:50-9:35", "9:40-10:25", "10:30-10:45 Break",
      "10:45-11:30", "11:35-12:20", "12:25-13:10 Lunch", "13:15-14:00", "14:05-14:50",
    ];
    const dayPlan = {
      Monday: ["Mathematics", "Physics", "Chemistry", "Break", "English Literature", "History", "Lunch", "Computer Science", "Physical Education"],
      Tuesday: ["Physics", "Mathematics", "Biology", "Break", "Chemistry", "English Literature", "Lunch", "History", "Computer Science"],
      Wednesday: ["Chemistry", "Mathematics", "English Literature", "Break", "Physics", "Computer Science", "Lunch", "Biology", "Physical Education"],
      Thursday: ["History", "English Literature", "Mathematics", "Break", "Physics", "Chemistry", "Lunch", "Computer Science", "Biology"],
      Friday: ["Computer Science", "History", "Mathematics", "Break", "English Literature", "Physics", "Lunch", "Chemistry", "Physical Education"],
    };
    const teacherOf = { Mathematics: "Ramesh Sharma", Physics: "Venkat Iyer", Chemistry: "Mohan Das", Biology: "Pooja Mehta", "English Literature": "Anita Pillai", History: "Sunita Verma", "Computer Science": "Prasana Reddy", "Physical Education": "Coach Raju", Break: "—", Lunch: "—" };
    const renderDay = (day) => `<h4 style="margin-top:14px">${day}</h4><table class="data-table"><thead><tr><th>Time</th><th>Subject</th><th>Teacher</th></tr></thead><tbody>${periods.map((p, i) => `<tr><td>${p}</td><td>${dayPlan[day][i]}</td><td>${teacherOf[dayPlan[day][i]]}</td></tr>`).join("")}</tbody></table>`;
    const body = filter === "today" ? renderDay(todayName) : days.map(renderDay).join("");
    return `<div class="dash-section" id="section-student_timetable">
      <div class="card"><h3>📅 Timetable (Class ${displayClassFull})</h3>
      <div style="display:flex;gap:10px;margin-bottom:10px">
        <button class="btn-primary" onclick="setStudentTimetableFilter('today')" style="${filter === "today" ? "" : "opacity:.7"}">Today</button>
        <button class="btn-primary" onclick="setStudentTimetableFilter('week')" style="${filter === "week" ? "" : "opacity:.7"}">Full Week</button>
      </div>${body}</div></div>`;
  }
  window.setStudentTimetableFilter = function setStudentTimetableFilter(v) { localStorage.setItem("cc_student_tt_filter", v); rerenderStudent("student_timetable"); };

  function buildStudentHomework(d) {
    const fk = localStorage.getItem("cc_student_hw_filter") || "All";
    const rows = d.homework.filter(h => fk === "All" || h.status === fk);
    const chips = ["All", "Pending", "Submitted", "Overdue"].map(f => `<button class="btn-primary" onclick="setStudentHomeworkFilter('${f}')" style="${fk === f ? "" : "opacity:.7"}">${f}</button>`).join("");
    const cards = rows.length ? rows.map(h => `<div class="card"><h4>${h.subject} - ${h.title}</h4><p style="font-size:13px;color:var(--color-text-muted)">${h.description}</p><div style="font-size:12px;color:var(--color-text-muted)">Assigned by ${h.teacher} · ${h.assignedDate} · Due ${h.dueDate}</div><div style="margin-top:10px"><span class="badge ${h.status === "Submitted" ? "badge-active" : h.status === "Overdue" ? "badge-danger" : "badge-warning"}">${h.status}</span></div><div style="display:flex;gap:8px;margin-top:10px">${h.status === "Pending" ? `<button class="btn-primary" onclick="studentMarkHomeworkSubmitted('${h.id}')">Mark as Submitted</button>` : ""}<button class="btn-primary" onclick="studentViewHomeworkDetails('${h.id}')">View Details</button></div></div>`).join("") : `<div class="card"><p style="color:var(--color-text-muted)">No homework items for this filter.</p></div>`;
    return `<div class="dash-section" id="section-student_homework"><div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">${chips}</div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px">${cards}</div></div>`;
  }
  window.setStudentHomeworkFilter = function setStudentHomeworkFilter(v) { localStorage.setItem("cc_student_hw_filter", v); rerenderStudent("student_homework"); };
  window.studentMarkHomeworkSubmitted = function studentMarkHomeworkSubmitted(id) {
    const sid = sidFromUser(currentUser);
    const sharedKey = 'campuscore_student_data_' + sid;
    const shared = JSON.parse(localStorage.getItem(sharedKey) || '{}');
    const existingHw = (shared.homework && Array.isArray(shared.homework)) ? shared.homework : seedHomework(sid);
    shared.homework = existingHw.map(h => h.id === id ? { ...h, status: "Submitted" } : h);
    localStorage.setItem(sharedKey, JSON.stringify(shared));
    if (typeof simulateAction === "function") simulateAction("Homework marked as submitted");
    rerenderStudent("student_homework");
  };
  window.studentViewHomeworkDetails = function studentViewHomeworkDetails(id) {
    const sid = sidFromUser(currentUser);
    const h = (getStudentSharedData(sid).homework || []).find(x => x.id === id);
    if (!h) return;
    const m = document.createElement("div");
    m.className = "modal-overlay";
    m.id = "student-hw-modal";
    m.innerHTML = `<div class="modal-content"><div class="modal-header"><h3>${h.title}</h3><button class="modal-close" onclick="closeStudentModal('student-hw-modal')">×</button></div><div class="modal-body"><p>${h.description}</p><p><strong>Due:</strong> ${h.dueDate}</p><button class="btn-primary" onclick="closeStudentModal('student-hw-modal')">Close</button></div></div>`;
    document.body.appendChild(m);
  };

  function buildStudentExams(d) {
    const f = localStorage.getItem("cc_student_ex_filter") || "All";
    const srt = localStorage.getItem("cc_student_ex_sort") || "Newest";
    let rows = [...d.exams].map(e => ({ ...e, status: examStatus(e.date) }));
    if (f !== "All") rows = rows.filter(r => r.status === f);
    rows.sort((a, b) => srt === "Newest" ? (new Date(b.date) - new Date(a.date)) : (new Date(a.date) - new Date(b.date)));
    const cards = rows.length ? rows.map(e => `<div class="card"><h4>${e.subject} <span class="badge ${e.status === "Upcoming" ? "badge-info" : "badge-active"}">${e.status}</span></h4><div>${e.type}</div><div style="font-size:13px;color:var(--color-text-muted)">${e.date} ${e.time} · ${e.duration} · ${e.venue}</div><ul>${e.topics.map(t => `<li>${t}</li>`).join("")}</ul><button class="btn-primary" onclick="studentViewSyllabus('${e.id}')">View Syllabus</button></div>`).join("") : `<div class="card"><p style="color:var(--color-text-muted)">No exams for selected filter.</p></div>`;
    return `<div class="dash-section" id="section-student_exams">
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
        ${["All", "Upcoming", "Completed"].map(x => `<button class="btn-primary" onclick="setStudentExamFilter('${x}')" style="${f === x ? "" : "opacity:.7"}">${x}</button>`).join("")}
        ${["Newest", "Oldest"].map(x => `<button class="btn-primary" onclick="setStudentExamSort('${x}')" style="${srt === x ? "" : "opacity:.7"}">${x}</button>`).join("")}
      </div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px">${cards}</div></div>`;
  }
  window.setStudentExamFilter = function setStudentExamFilter(v) { localStorage.setItem("cc_student_ex_filter", v); rerenderStudent("student_exams"); };
  window.setStudentExamSort = function setStudentExamSort(v) { localStorage.setItem("cc_student_ex_sort", v); rerenderStudent("student_exams"); };
  window.studentViewSyllabus = function studentViewSyllabus(id) {
    const sid = sidFromUser(currentUser);
    const e = (getStudentSharedData(sid).exams || []).find(x => x.id === id);
    if (!e) return;
    const m = document.createElement("div");
    m.className = "modal-overlay";
    m.id = "student-exam-modal";
    m.innerHTML = `<div class="modal-content"><div class="modal-header"><h3>${e.subject} Syllabus</h3><button class="modal-close" onclick="closeStudentModal('student-exam-modal')">×</button></div><div class="modal-body"><ul>${e.topics.map(t => `<li>${t}</li>`).join("")}</ul><button class="btn-primary" onclick="closeStudentModal('student-exam-modal')">Close</button></div></div>`;
    document.body.appendChild(m);
  };

  function buildStudentResults(d) {
    const rows = d.results.marks.map(r => `<tr><td>${r.subject}</td><td>${r.marks}</td><td>${r.total}</td><td>${r.pct}%</td><td>${r.grade}</td><td>${r.remarks}</td><td><button class="btn-primary" onclick="studentViewResultDetail('${r.subject}')">View Detailed Report</button></td></tr>`).join("");
    const trend = d.results.trend.map(t => `<div style="margin-bottom:8px"><div style="display:flex;justify-content:space-between"><span>${t.label}</span><strong>${t.pct}%</strong></div><div class="progress-bar"><div class="progress-fill" style="width:${t.pct}%"></div></div></div>`).join("");
    return `<div class="dash-section" id="section-student_results"><div class="card"><h3>📊 Results & Marks</h3><p><strong>Overall:</strong> ${d.results.overall}%</p><div style="overflow:auto"><table class="data-table"><thead><tr><th>Subject</th><th>Marks</th><th>Total</th><th>%</th><th>Grade</th><th>Remarks</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div><button class="btn-primary" onclick="studentDownloadReportCard()">Download Report Card</button></div><div class="card"><h3>Performance Trend</h3>${trend}</div></div>`;
  }
  window.studentDownloadReportCard = function studentDownloadReportCard() {
    const sid = sidFromUser(currentUser);
    const p = getStudentProfile(sid);
    const r = getStudentSharedData(sid).results || generateResults(sid);
    const text = [`CampusCore Report Card`, `Name: ${p.fullName}`, `ID: ${sid}`, `Class: 9C`, "", ...r.marks.map(x => `${x.subject}: ${x.marks}/100 (${x.grade})`), "", `Overall: ${r.overall}%`].join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `ReportCard_${p.fullName.replace(/\s+/g, "_")}_${sid}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
    if (typeof simulateAction === "function") simulateAction("Report card downloaded");
  };
  window.studentViewResultDetail = function studentViewResultDetail(subject) {
    const sid = sidFromUser(currentUser);
    const row = (getStudentSharedData(sid).results || generateResults(sid)).marks.find(r => r.subject === subject);
    if (!row) return;
    const att = getSubjectAttendance(sid).find(s => s.subject === subject);
    const internal = Math.round(row.marks * 0.3);
    const written = row.marks - internal;
    const m = document.createElement("div");
    m.className = "modal-overlay";
    m.id = "student-res-modal";
    m.innerHTML = `<div class="modal-content"><div class="modal-header"><h3>${subject} Detailed Report</h3><button class="modal-close" onclick="closeStudentModal('student-res-modal')">×</button></div><div class="modal-body"><p>Internal marks: ${internal}/30</p><p>Written marks: ${written}/70</p><p>Teacher remarks: ${row.remarks}</p><p>Subject attendance: ${att ? att.pct : "-"}%</p><button class="btn-primary" onclick="closeStudentModal('student-res-modal')">Close</button></div></div>`;
    document.body.appendChild(m);
  };

  function buildStudentNotices(d) {
    const f = localStorage.getItem("cc_student_notice_filter") || "All";
    const list = d.notices.filter(n => f === "All" || n.category === f);
    const cards = list.length ? list.map(n => `<div class="card"><h4>${n.title}</h4><div style="font-size:12px;color:var(--color-text-muted)">${n.category} · ${n.date} · ${n.author || n.publisher || "Admin"} ${d.read.has(String(n.id)) ? "" : `<span class="badge badge-info">Unread</span>`}</div><p style="font-size:13px;color:var(--color-text-muted)">${(n.body || n.text || n.title).slice(0, 120)}...</p><button class="btn-primary" onclick="studentReadNotice('${n.id}')">Read More</button></div>`).join("") : `<div class="card"><p style="color:var(--color-text-muted)">No notices for selected filter.</p></div>`;
    const filters = ["All", "Events", "Academic", "Meeting", "Finance", "Holiday"];
    return `<div class="dash-section" id="section-student_notices"><div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">${filters.map(x => `<button class="btn-primary" onclick="setStudentNoticeFilter('${x}')" style="${f === x ? "" : "opacity:.7"}">${x}</button>`).join("")}</div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px">${cards}</div></div>`;
  }
  window.setStudentNoticeFilter = function setStudentNoticeFilter(v) { localStorage.setItem("cc_student_notice_filter", v); rerenderStudent("student_notices"); };
  window.studentReadNotice = function studentReadNotice(id) {
    const sid = sidFromUser(currentUser);
    const n = getNotices().find(x => String(x.id) === String(id));
    if (!n) return;
    const shared = getStudentSharedData(sid);
    const read = new Set(shared.noticesRead || []);
    read.add(String(id));
    shared.noticesRead = Array.from(read);
    saveStudentSharedData(sid, shared);
    const m = document.createElement("div");
    m.className = "modal-overlay";
    m.id = "student-notice-modal";
    m.innerHTML = `<div class="modal-content"><div class="modal-header"><h3>${n.title}</h3><button class="modal-close" onclick="closeStudentModal('student-notice-modal')">×</button></div><div class="modal-body"><p><strong>Category:</strong> ${n.category}</p><p><strong>Date:</strong> ${n.date}</p><p>${n.body || n.text || n.title}</p><button class="btn-primary" onclick="closeStudentModal('student-notice-modal')">Close</button></div></div>`;
    document.body.appendChild(m);
    rerenderStudent("student_notices");
  };

  function buildStudentMessages(d) {
    const cards = d.messages.length ? d.messages.map(m => `<div class="card" onclick="studentOpenMessage('${m.id}')" style="cursor:pointer;border:${m.unread ? "1px solid var(--color-primary)" : "1px solid var(--color-border)"}"><div style="display:flex;justify-content:space-between"><strong>${m.sender}</strong><span style="font-size:12px;color:var(--color-text-muted)">${m.ts}</span></div><div style="font-size:13px;color:var(--color-text-muted)">${m.role}</div><h4>${m.subject} ${m.unread ? `<span class="badge badge-info">Unread</span>` : ""}</h4><p style="font-size:13px;color:var(--color-text-muted)">${m.preview}</p></div>`).join("") : `<div class="card"><p style="color:var(--color-text-muted)">No messages available.</p></div>`;
    return `<div class="dash-section" id="section-student_messages"><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px">${cards}</div></div>`;
  }
  window.studentOpenMessage = function studentOpenMessage(id) {
    const sid = sidFromUser(currentUser);
    const shared = getStudentSharedData(sid);
    const rows = shared.messages || [];
    const idx = rows.findIndex(x => x.id === id);
    if (idx < 0) return;
    rows[idx].unread = false;
    shared.messages = rows;
    saveStudentSharedData(sid, shared);
    const m = rows[idx];
    const replies = (m.replies || []).map(r => `<div style="padding:8px;border:1px solid var(--color-border);border-radius:8px;margin-bottom:6px"><strong>${r.by}</strong> <span style="font-size:11px;color:var(--color-text-muted)">${r.time}</span><div>${r.text}</div></div>`).join("");
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.id = "student-msg-modal";
    modal.innerHTML = `<div class="modal-content"><div class="modal-header"><h3>${m.subject}</h3><button class="modal-close" onclick="closeStudentModal('student-msg-modal')">×</button></div><div class="modal-body"><p><strong>${m.sender}</strong> (${m.role})</p><p>${m.body}</p><h4>Replies</h4>${replies || "<p style='color:var(--color-text-muted)'>No replies yet.</p>"}<textarea id="student-reply-text" class="form-control" rows="3" placeholder="Type your reply..."></textarea><div style="display:flex;gap:8px;margin-top:8px"><button class="btn-primary" onclick="studentSendReply('${m.id}')">Send Reply</button><button class="btn-primary" onclick="closeStudentModal('student-msg-modal')">Close</button></div></div></div>`;
    document.body.appendChild(modal);
    rerenderStudent("student_messages");
  };
  window.studentSendReply = function studentSendReply(id) {
    const sid = sidFromUser(currentUser);
    const text = (document.getElementById("student-reply-text") || {}).value || "";
    if (!text.trim()) return;
    const shared = getStudentSharedData(sid);
    const rows = shared.messages || [];
    const idx = rows.findIndex(x => x.id === id);
    if (idx < 0) return;
    rows[idx].replies = rows[idx].replies || [];
    rows[idx].replies.push({ by: getStudentProfile(sid).fullName, time: new Date().toLocaleString("en-IN"), text: text.trim() });
    shared.messages = rows;
    saveStudentSharedData(sid, shared);
    if (typeof simulateAction === "function") simulateAction("Reply sent");
    closeStudentModal("student-msg-modal");
    rerenderStudent("student_messages");
  };

  function buildStudentSettings(d) {
    const s = getStudentSettings(d.sid);
    return `<div class="dash-section" id="section-student_settings"><div class="settings-grid">
      <div class="card"><h3>🎨 Appearance</h3>
        ${sToggle("Dark Mode", s.darkMode, "studentToggleSetting('darkMode', this.checked)")}
        ${sToggle("Compact Mode", s.compactMode, "studentToggleSetting('compactMode', this.checked)")}
      </div>
      <div class="card"><h3>🔔 Notifications</h3>
        ${sToggle("Homework Reminders", s.hwReminders, "studentToggleSetting('hwReminders', this.checked)")}
        ${sToggle("Exam Alerts", s.examAlerts, "studentToggleSetting('examAlerts', this.checked)")}
        ${sToggle("Notice Alerts", s.noticeAlerts, "studentToggleSetting('noticeAlerts', this.checked)")}
        ${sToggle("Message Alerts", s.msgAlerts, "studentToggleSetting('msgAlerts', this.checked)")}
      </div>
      <div class="card"><h3>👤 Account</h3>
        <div style="display:flex;flex-direction:column;gap:8px">
          <button class="btn-primary" onclick="openStudentChangePasswordModal()">Change Password</button>
          <button class="btn-primary" onclick="openStudentEditProfileModal()">Edit Profile</button>
          <button class="btn-primary" onclick="openStudentLanguageModal()">Language</button>
          <button class="btn-primary" onclick="studentDownloadMyData()">Download My Data</button>
        </div>
      </div>
      <div class="card"><h3>🔒 Security</h3>
        ${sToggle("Two-Factor Auth", s.twoFactor, "studentToggleSetting('twoFactor', this.checked); if(typeof simulateAction==='function') simulateAction('2FA preference updated')")}
        <button class="btn-danger" style="margin-top:12px" onclick="logout()">Logout</button>
      </div>
    </div></div>`;
  }
  function sToggle(label, checked, onchange) {
    return `<div class="settings-row"><div class="settings-label">${label}</div><label class="toggle-switch"><input type="checkbox" ${checked ? "checked" : ""} onchange="${onchange}"><span class="toggle-slider"></span></label></div>`;
  }
  window.studentToggleSetting = function studentToggleSetting(k, v) {
    const sid = sidFromUser(currentUser);
    saveStudentSettings(sid, { [k]: v });
    if (typeof simulateAction === "function") simulateAction("Settings saved");
    rerenderStudent("student_settings");
  };

  window.openStudentEditProfileModal = function openStudentEditProfileModal() {
    const sid = sidFromUser(currentUser);
    const p = getStudentProfile(sid);
    const m = document.createElement("div");
    m.className = "modal-overlay";
    m.id = "student-profile-modal";
    m.innerHTML = `<div class="modal-content"><div class="modal-header"><h3>Edit Profile</h3><button class="modal-close" onclick="closeStudentModal('student-profile-modal')">×</button></div><div class="modal-body"><label>Name</label><input id="sp-name" class="form-control" value="${p.fullName}"><label>Email</label><input id="sp-email" class="form-control" value="${p.email}"><label>Address</label><input id="sp-address" class="form-control" value="${p.address}"><div style="display:flex;gap:8px;margin-top:8px"><button class="btn-primary" onclick="saveStudentProfileModal()">Save</button><button class="btn-primary" onclick="closeStudentModal('student-profile-modal')">Cancel</button></div></div></div>`;
    document.body.appendChild(m);
  };
  window.saveStudentProfileModal = function saveStudentProfileModal() {
    const sid = sidFromUser(currentUser);
    saveStudentProfile(sid, {
      fullName: document.getElementById("sp-name").value.trim(),
      email: document.getElementById("sp-email").value.trim(),
      address: document.getElementById("sp-address").value.trim()
    });
    if (typeof simulateAction === "function") simulateAction("Profile saved");
    closeStudentModal("student-profile-modal");
    rerenderStudent("profile");
  };

  window.openStudentChangePasswordModal = function openStudentChangePasswordModal() {
    const m = document.createElement("div");
    m.className = "modal-overlay";
    m.id = "student-pass-modal";
    m.innerHTML = `<div class="modal-content"><div class="modal-header"><h3>Change Password</h3><button class="modal-close" onclick="closeStudentModal('student-pass-modal')">×</button></div><div class="modal-body"><div style="font-size:12px;color:var(--color-text-muted);margin-bottom:8px">Note: This password applies to both Parent and Student access for this account.</div><input id="sp-cur" class="form-control" placeholder="Current password" type="password"><input id="sp-new" class="form-control" placeholder="New password" type="password"><input id="sp-con" class="form-control" placeholder="Confirm password" type="password"><div style="display:flex;gap:8px;margin-top:8px"><button class="btn-primary" onclick="saveStudentPassword()">Save</button><button class="btn-primary" onclick="closeStudentModal('student-pass-modal')">Cancel</button></div></div></div>`;
    document.body.appendChild(m);
  };
  window.saveStudentPassword = function saveStudentPassword() {
    const accountId = accountIdFromUser(currentUser);
    const cur = document.getElementById("sp-cur").value;
    const n = document.getElementById("sp-new").value;
    const c = document.getElementById("sp-con").value;
    const stored = getAccountPassword(accountId, "PARENT123");
    if (cur.toUpperCase() !== stored.toUpperCase()) return simulateAction("Current password is incorrect");
    if (!n || n.length < 4) return simulateAction("New password is too short");
    if (n !== c) return simulateAction("Confirm password does not match");
    setAccountPassword(accountId, n);
    simulateAction("Password updated successfully");
    closeStudentModal("student-pass-modal");
  };
  window.openUnifiedAccountPasswordModal = function openUnifiedAccountPasswordModal() {
    const m = document.createElement("div");
    m.className = "modal-overlay";
    m.id = "account-pass-modal";
    m.innerHTML = `<div class="modal-content"><div class="modal-header"><h3>Change Password</h3><button class="modal-close" onclick="closeStudentModal('account-pass-modal')">×</button></div><div class="modal-body"><div style="font-size:12px;color:var(--color-text-muted);margin-bottom:8px">Note: This password applies to both Parent and Student access for this account.</div><input id="ap-cur" class="form-control" placeholder="Current password" type="password"><input id="ap-new" class="form-control" placeholder="New password" type="password"><input id="ap-con" class="form-control" placeholder="Confirm password" type="password"><div style="display:flex;gap:8px;margin-top:8px"><button class="btn-primary" onclick="saveUnifiedAccountPassword()">Save</button><button class="btn-primary" onclick="closeStudentModal('account-pass-modal')">Cancel</button></div></div></div>`;
    document.body.appendChild(m);
  };
  window.saveUnifiedAccountPassword = function saveUnifiedAccountPassword() {
    const accountId = accountIdFromUser(currentUser);
    const cur = document.getElementById("ap-cur").value;
    const n = document.getElementById("ap-new").value;
    const c = document.getElementById("ap-con").value;
    const stored = getAccountPassword(accountId, "PARENT123");
    if (cur.toUpperCase() !== stored.toUpperCase()) return simulateAction("Current password is incorrect");
    if (!n || n.length < 4) return simulateAction("New password is too short");
    if (n !== c) return simulateAction("Confirm password does not match");
    setAccountPassword(accountId, n);
    simulateAction("Password updated successfully");
    closeStudentModal("account-pass-modal");
  };
  window.openStudentLanguageModal = function openStudentLanguageModal() {
    const sid = sidFromUser(currentUser);
    const s = getStudentSettings(sid);
    const m = document.createElement("div");
    m.className = "modal-overlay";
    m.id = "student-lang-modal";
    m.innerHTML = `<div class="modal-content"><div class="modal-header"><h3>Language</h3><button class="modal-close" onclick="closeStudentModal('student-lang-modal')">×</button></div><div class="modal-body"><select id="st-lang" class="form-control"><option ${s.language === "English" ? "selected" : ""}>English</option><option ${s.language === "Hindi" ? "selected" : ""}>Hindi</option><option ${s.language === "Telugu" ? "selected" : ""}>Telugu</option></select><div style="display:flex;gap:8px;margin-top:8px"><button class="btn-primary" onclick="saveStudentLanguage()">Save</button><button class="btn-primary" onclick="closeStudentModal('student-lang-modal')">Cancel</button></div></div></div>`;
    document.body.appendChild(m);
  };
  window.saveStudentLanguage = function saveStudentLanguage() {
    const sid = sidFromUser(currentUser);
    saveStudentSettings(sid, { language: document.getElementById("st-lang").value });
    simulateAction("Language preference saved");
    closeStudentModal("student-lang-modal");
  };
  window.studentDownloadMyData = function studentDownloadMyData() {
    const sid = sidFromUser(currentUser);
    const data = {
      profile: getStudentProfile(sid),
      attendance: getSubjectAttendance(sid),
      homework: getStudentSharedData(sid).homework || [],
      exams: getStudentSharedData(sid).exams || [],
      results: generateResults(sid)
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `campuscore_student_${sid}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    simulateAction("Student data downloaded");
  };
  window.closeStudentModal = function closeStudentModal(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  };

  // --- NEW STUDENT BUILDERS ---

  window.buildStudentIdCard = function (userOrD) {
    const d = (userOrD && userOrD.role) ? studentContext(userOrD) : userOrD;
    const p = d.profile;
    const shared = getStudentSharedData(d.sid);
    const cls = shared.currentClass || '9';
    const sec = shared.currentSection || 'C';

    return `<div class="dash-section" id="section-student_id_card">
      <div class="card id-card-container">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
          <h3>🪪 Digital ID Card</h3>
          <button class="btn-primary" onclick="window.print()"><i class="fas fa-print"></i> Print ID Card</button>
        </div>
        
        <div class="printable-id-card" style="width:350px;height:220px;background:linear-gradient(135deg, #1a237e, #0d47a1);color:white;border-radius:12px;padding:15px;position:relative;margin:0 auto;box-shadow:0 4px 15px rgba(0,0,0,0.2)">
          <div style="display:flex;gap:12px;align-items:center;margin-bottom:10px;border-bottom:1px solid rgba(255,255,255,0.2);padding-bottom:8px">
            <img src="campus-logo.png" style="width:30px;height:30px;filter:brightness(0) invert(1)" onerror="this.outerHTML='🎓'">
            <div style="font-size:14px;font-weight:900;letter-spacing:1px">DPS NADERGUL</div>
          </div>
          
          <div style="display:flex;gap:15px">
            <div style="width:80px;height:90px;background:#eee;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#666;font-size:30px">
              <i class="fas fa-user-graduate"></i>
            </div>
            <div style="flex:1">
              <div style="font-size:16px;font-weight:700;margin-bottom:4px">${p.fullName.toUpperCase()}</div>
              <div style="font-size:11px;opacity:0.9">ID: ${p.studentId}</div>
              <div style="font-size:11px;opacity:0.9">Class: ${cls}-${sec}</div>
              <div style="font-size:11px;opacity:0.9">House: ${p.house}</div>
              <div style="font-size:11px;opacity:0.9">Blood Group: ${p.bloodGroup}</div>
            </div>
          </div>
          
          <div style="position:absolute;bottom:15px;right:15px;text-align:right">
            <div style="font-family:'Libre Barcode 39', cursive;font-size:30px;line-height:1">*${p.studentId}*</div>
            <div style="font-size:8px;opacity:0.7">Valid until Mar 2027</div>
          </div>
        </div>
        
        <p style="margin-top:20px;font-size:12px;color:var(--color-text-muted);text-align:center">Ensure your profile picture is updated in Settings for accurate rendering.</p>
      </div>
    </div>`;
  }

  window.buildStudentAlmanac = function (userOrD) {
    const d = (userOrD && userOrD.role) ? studentContext(userOrD) : userOrD;
    const events = [
      { date: '2026-04-10', title: 'New Academic Session Starts', category: 'Academic' },
      { date: '2026-04-14', title: 'Ambedkar Jayanti', category: 'Holiday' },
      { date: '2026-04-18', title: 'Inter-House Sports Meet', category: 'Events' },
      { date: '2026-04-25', title: 'Parent Teacher Meeting', category: 'Academic' },
      { date: '2026-05-01', title: 'Summer Vacations Begin', category: 'Holiday' },
      { date: '2026-03-25', title: 'Graduation Day', category: 'Events' }
    ];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const rows = events.map(ev => {
      const evDate = new Date(ev.date);
      const diffDays = Math.ceil((evDate - today) / (1000 * 60 * 60 * 24));

      let color = '#757575'; // Past
      let status = 'Past';

      if (diffDays === 0) { color = '#4caf50'; status = 'Today'; }
      else if (diffDays > 0 && diffDays <= 7) { color = '#ff9800'; status = 'Upcoming'; }
      else if (diffDays > 7) { color = '#2196f3'; status = 'Future'; }

      return `<tr>
          <td>${ev.date}</td>
          <td><strong style="color:var(--color-text)">${ev.title}</strong></td>
          <td><span class="badge badge-info">${ev.category}</span></td>
          <td style="color:${color};font-weight:700">${diffDays < 0 ? '—' : diffDays + ' Days'}</td>
          <td><span style="color:${color}">${status}</span></td>
        </tr>`;
    }).sort((a, b) => new Date(a.date) - new Date(b.date)).join('');

    return `<div class="dash-section" id="section-student_almanac">
      <div class="card">
        <h3>📅 Student Almanac 2026</h3>
        <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:15px">Academic calendar and upcoming school holidays.</p>
        <div style="overflow-x:auto"><table class="data-table"><thead><tr><th>Date</th><th>Description</th><th>Type</th><th>Days Left</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div>
      </div>
    </div>`;
  }

  window.buildStudentRequests = function (userOrD) {
    const d = (userOrD && userOrD.role) ? studentContext(userOrD) : userOrD;
    const reqs = JSON.parse(localStorage.getItem('campuscore_student_requests') || '[]').filter(r => r.studentId === d.sid);
    const rows = reqs.map(r => `
      <div class="card" style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <strong>${r.type}: ${r.title}</strong>
          <span class="badge ${r.status === 'Approved' ? 'badge-active' : r.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}">${r.status}</span>
        </div>
        <div style="font-size:12px;color:var(--color-text-muted)">Stage: ${r.stage} | Submitted: ${r.date}</div>
      </div>
    `).join('');

    return `<div class="dash-section" id="${d.user.role === 'parent' ? 'section-parent_requests' : 'section-student_requests'}">
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
          <h3>📄 Request Center</h3>
          <button class="btn-primary" onclick="openNewRequestModal()"><i class="fas fa-plus"></i> New Request</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr;gap:10px">${rows || '<p style="color:var(--color-text-muted)">No requests found.</p>'}</div>
      </div>
    </div>`;
  }

  window.buildStudentHelpdesk = function (userOrD) {
    const d = (userOrD && userOrD.role) ? studentContext(userOrD) : userOrD;
    const tickets = JSON.parse(localStorage.getItem('campuscore_helpdesk_tickets') || '[]').filter(t => t.studentName === d.profile.fullName);
    const rows = tickets.map(t => `<tr><td>${t.id}</td><td>${t.subject}</td><td><span class="badge badge-info">${t.status}</span></td><td>${t.lastUpdate}</td></tr>`).join('');

    return `<div class="dash-section" id="${d.user.role === 'parent' ? 'section-helpdesk' : 'section-helpdesk'}">
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px">
          <h3>🎧 Helpdesk Support</h3>
          <button class="btn-primary" onclick="simulateAction('Ticketing system temporarily locked for maintenance')"><i class="fas fa-plus"></i> Open Ticket</button>
        </div>
        <div style="overflow-x:auto"><table class="data-table"><thead><tr><th>Ticket ID</th><th>Subject</th><th>Status</th><th>Last Update</th></tr></thead><tbody>${rows || '<tr><td colspan="4">No active tickets.</td></tr>'}</tbody></table></div>
      </div>
    </div>`;
  }

  window.openNewRequestModal = function () {
    const m = `<div class="modal-overlay" id="request-modal" style="display:flex" onclick="if(event.target===this) this.remove()">
      <div class="modal" style="max-width:450px">
        <h3>New School Request</h3>
        <div class="form-group">
          <label>Request Type</label>
          <select id="req-type" class="form-control">
            <option>Leave Application</option><option>TC Request</option><option>Bonafide Certificate</option><option>Bus Change</option><option>Other</option>
          </select>
          <label>Subject / Brief Reasoning</label>
          <input type="text" id="req-title" class="form-control" placeholder="e.g. Family Emergency">
          <label>Additional Details</label>
          <textarea id="req-desc" class="form-control" rows="3"></textarea>
          <div style="display:flex;gap:10px;margin-top:20px">
            <button class="btn-primary" style="flex:1" onclick="submitStudentRequest()">Submit Request</button>
            <button style="flex:1;background:var(--color-surface-2);border:1px solid var(--color-border);color:var(--color-text);border-radius:8px" onclick="document.getElementById('request-modal').remove()">Cancel</button>
          </div>
        </div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', m);
  }

  window.submitStudentRequest = function () {
    const type = document.getElementById('req-type').value;
    const title = document.getElementById('req-title').value;
    if (!title) { simulateAction('Please provide a subject'); return; }

    const sid = sidFromUser(currentUser);
    const s = bySid(sid);

    let reqs = JSON.parse(localStorage.getItem('campuscore_student_requests') || '[]');
    reqs.unshift({
      id: 'REQ-' + Math.floor(Math.random() * 900 + 100),
      title: title,
      studentId: sid,
      studentName: s.name,
      type: type,
      status: 'Pending',
      stage: 'Teacher',
      date: new Date().toISOString().split('T')[0]
    });

    localStorage.setItem('campuscore_student_requests', JSON.stringify(reqs));
    document.getElementById('request-modal').remove();
    simulateAction('Request submitted successfully');
    rerenderStudent('student_requests');
  }

  // Removed duplicate local buildStudentHelpdesk definition to clear namespace conflict.
})();
