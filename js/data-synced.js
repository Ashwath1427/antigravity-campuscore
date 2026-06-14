/* ============================================================
   CAMPUS CORE – DATA.JS (SYNCHRONIZED VERSION)
   All data synchronized with database structure
   ============================================================ */

// ─── Demo Users (Matching prototype credentials) ────────────
const DEMO_USERS = [
  {
    id: 1,
    username: "VP001",
    password: "VP123",
    name: "SUMAN",
    role: "vice_principal",
    roleLabel: "Vice Principal",
    department: "Executive Office",
    phone: "+91 98765 43210",
    email: "vp@dpsnadergul.edu",
    joined: "Mar 2019",
    avatar_color: "#2d7a6e",
    icon: "fa-user-tie",
    notifications: [
      { title: "Monthly Report Ready", text: "March 2026 analytics summary is ready for review", time: "30m ago", icon: "📊", color: "#5ca870" },
      { title: "Board Meeting", text: "Scheduled for April 5th, 2026 at 10 AM", time: "2h ago", icon: "📋", color: "#1976d2" },
      { title: "New Teacher Joined", text: "Ms. Pooja Mehta joined as Biology faculty", time: "1d ago", icon: "👩‍🏫", color: "#7ec490" },
      { title: "Audit Complete", text: "Annual infrastructure audit completed successfully", time: "2d ago", icon: "✅", color: "#4caf50" },
    ]
  },
  {
    id: 2,
    username: "T001",
    password: "teacher123",
    name: "Prasana Reddy",
    role: "teacher",
    roleLabel: "Teacher",
    department: "Mathematics",
    phone: "+91 87654 32109",
    email: "prasana@dpsnadergul.edu",
    joined: "Aug 2022",
    avatar_color: "#5ca870",
    icon: "fa-chalkboard-teacher",
    notifications: [
      { title: "Assignment Due Today", text: "Class 9B Quadratic Equations due by 3 PM", time: "1h ago", icon: "📝", color: "#f57c00" },
      { title: "Parent Query", text: "Parent sent a query about KASULA ASHWATH", time: "3h ago", icon: "💬", color: "#1976d2" },
      { title: "Marks Uploaded", text: "Mid-term marks for Class 10A uploaded successfully", time: "1d ago", icon: "✅", color: "#5ca870" },
    ]
  },
  {
    id: 3,
    username: "P3180076A",
    password: "parent123",
    name: "Parent of KASULA ASHWATH",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of KASULA ASHWATH (Class 9-C)",
    phone: "+91 76543 21098",
    email: "ashwath@gmail.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "KASULA ASHWATH",
    childId: "3180076",
    childClass: "9-C",
    childRoll: "01",
    notifications: [
      { title: "Child's Report Card", text: "KASULA ASHWATH's report card is available", time: "2h ago", icon: "📄", color: "#5ca870" },
      { title: "Fee Payment Reminder", text: "Next term fees due by April 15", time: "1d ago", icon: "💰", color: "#f57c00" },
      { title: "Parent Meeting", text: "PTM scheduled for April 3rd", time: "2d ago", icon: "👥", color: "#1976d2" },
    ]
  },
  {
    id: 4,
    username: "C001",
    password: "coord123",
    name: "Anitha",
    role: "coordinator",
    roleLabel: "Coordinator",
    department: "Academic Coordination",
    phone: "+91 54321 09876",
    email: "anitha@dpsnadergul.edu",
    joined: "Jun 2021",
    avatar_color: "#1976d2",
    icon: "fa-sitemap",
    notifications: [
      { title: "Class 9 Performance", text: "Class 9-C showing excellent results", time: "1h ago", icon: "📊", color: "#5ca870" },
      { title: "Teacher Meeting", text: "Weekly coordination meeting tomorrow", time: "3h ago", icon: "👥", color: "#1976d2" },
    ]
  },
  {
    id: 5,
    username: "PRIN001",
    password: "PRINCIPAL123",
    name: "Principal",
    role: "principal",
    roleLabel: "Principal",
    department: "Principal's Office",
    phone: "+91 98765 00001",
    email: "principal@dpsnadergul.edu",
    joined: "Jan 2015",
    avatar_color: "#1a237e",
    icon: "fa-user-shield",
    notifications: [
      { title: "Board Meeting", text: "Scheduled for April 10th at 11 AM", time: "1h ago", icon: "📋", color: "#1976d2" },
      { title: "Annual Results", text: "Class 10 board results summary ready", time: "3h ago", icon: "📊", color: "#5ca870" },
      { title: "Staff Review", text: "Monthly staff performance review due", time: "1d ago", icon: "👥", color: "#f57c00" }
    ]
  }
];

// ─── Students (Complete 130 students synchronized with database) ────────────────────────────────────────────────
let STUDENTS = [];
// Built in data.js

STUDENTS.sort((a, b) => {
  const getNum = (str) => {
    const match = String(str).match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };
  const getSec = (str) => {
    const match = String(str).match(/[A-Za-z]/);
    return match ? match[0].toUpperCase() : 'Z';
  };
  const gA = getNum(a.class);
  const gB = getNum(b.class);
  if (gA !== gB) return gA - gB;
  const sA = getSec(a.class);
  const sB = getSec(b.class);
  if (sA !== sB) return sA.localeCompare(sB);
  return String(a.name || '').localeCompare(String(b.name || ''));
});

// ─── Teachers (7 teachers synchronized with database) ────────────────────────────────────────────────
const TEACHERS = [
  { id: "T001", name: "Prasana Reddy",   subject: "Mathematics",       classes: "10-A, 9-B, 8-C",  exp: "8 years",  phone: "+91 87654 11111", status: "Active" },
  { id: "T002", name: "Ramesh Sharma",   subject: "Physics",           classes: "10-A, 10-B", exp: "12 years", phone: "+91 87654 22222", status: "Active" },
  { id: "T003", name: "Anita Pillai",    subject: "English Literature",classes: "8-B, 9-A",   exp: "6 years",  phone: "+91 87654 33333", status: "Active" },
  { id: "T004", name: "Mohan Das",       subject: "Chemistry",         classes: "9-C, 10-C", exp: "10 years", phone: "+91 87654 44444", status: "Active" },
  { id: "T005", name: "Sunita Verma",    subject: "Social Studies",    classes: "8-A, 9-D", exp: "7 years",  phone: "+91 87654 55555", status: "Active" },
  { id: "T006", name: "Venkat Iyer",     subject: "Computer Science",  classes: "9-C, 10-D", exp: "5 years",  phone: "+91 87654 66666", status: "Active" },
  { id: "T007", name: "Pooja Mehta",     subject: "Biology",           classes: "8-C, 9-C", exp: "9 years",  phone: "+91 87654 77777", status: "Active" }
];

// ─── Announcements (5 announcements synchronized with database) ──────────────────────────────────────────
const ANNOUNCEMENTS = [
  { id: 1, title: "Welcome to CampusCore",        date: "28 Mar 2026", author: "System", category: "General",   priority: "high" },
  { id: 2, title: "Mid-Term Examination Schedule Released",     date: "26 Mar 2026", author: "Coordinator",    category: "Academic", priority: "high" },
  { id: 3, title: "Parent-Teacher Meeting – April 5",          date: "24 Mar 2026", author: "Vice Principal", category: "Meeting",  priority: "medium" },
  { id: 4, title: "Annual Sports Day – April 12",             date: "22 Mar 2026", author: "VP", category: "Events",   priority: "medium" },
  { id: 5, title: "Fee Payment Reminder",                      date: "20 Mar 2026", author: "Admin Office", category: "Finance",  priority: "high" }
];

// ─── Class Schedule ──────────────────────────────────────────
const SCHEDULE = [
  { time: "8:00 – 8:45",  subject: "Mathematics",       class: "10-A", teacher: "Prasana Reddy", room: "Room 101", color: "#5ca870" },
  { time: "8:50 – 9:35",  subject: "Physics",           class: "10-A", teacher: "Ramesh Sharma",  room: "Physics Lab", color: "#1976d2" },
  { time: "9:40 – 10:25", subject: "English Literature", class: "8-B",  teacher: "Anita Pillai",  room: "Room 204", color: "#8b5cf6" },
  { time: "10:30 – 11:15", subject: "Chemistry",         class: "9-C", teacher: "Mohan Das",      room: "Chem Lab", color: "#e91e63" },
  { time: "11:20 – 12:05", subject: "Computer Science",  class: "9-C", teacher: "Venkat Iyer",    room: "Lab 301", color: "#ff6b6b" },
  { time: "12:10 – 12:55", subject: "Biology",           class: "9-C", teacher: "Pooja Mehta",    room: "Bio Lab", color: "#4caf50" },
  { time: "1:00 – 1:45",  subject: "Social Studies",    class: "8-A", teacher: "Sunita Verma",   room: "Room 105", color: "#ff9800" },
  { time: "1:50 – 2:35",  subject: "Mathematics",       class: "9-B", teacher: "Prasana Reddy", room: "Room 102", color: "#5ca870" },
];

// ─── Data Persistence & Sync Functions ────────────────────────────────────────────────────────────
const EXCLUDED_STUDENTS = new Set([
  "AARAV ASHWATH",
  "MEERA SHARMA",
  "RAVI DESAI",
]);

function isExcludedStudentRecord(student) {
  return EXCLUDED_STUDENTS.has(student.name);
}

// Initialize localStorage with synced data
if (!localStorage.getItem('campuscore_students')) {
  localStorage.setItem('campuscore_students', JSON.stringify(STUDENTS));
} else {
  // Sync with existing data if needed
  const existingStudents = JSON.parse(localStorage.getItem('campuscore_students'));
  if (existingStudents.length !== STUDENTS.length) {
    localStorage.setItem('campuscore_students', JSON.stringify(STUDENTS));
  }
}

// Initialize other data
if (!localStorage.getItem('campuscore_teachers')) {
  localStorage.setItem('campuscore_teachers', JSON.stringify(TEACHERS));
}

if (!localStorage.getItem('campuscore_announcements')) {
  localStorage.setItem('campuscore_announcements', JSON.stringify(ANNOUNCEMENTS));
}

if (!localStorage.getItem('campuscore_schedule')) {
  localStorage.setItem('campuscore_schedule', JSON.stringify(SCHEDULE));
}

// ─── Role Navigation Configuration ─────────────────────────────────────────────────────────────
const ROLE_NAV = {
  'vice_principal': [
    { id: 'home', label: 'Dashboard', icon: 'fa-home' },
    { id: 'students', label: 'Students', icon: 'fa-users' },
    { id: 'teachers', label: 'Teachers', icon: 'fa-chalkboard-teacher' },
    { id: 'attendance', label: 'Attendance', icon: 'fa-check-circle' },
    { id: 'homework', label: 'Homework', icon: 'fa-book' },
    { id: 'results', label: 'Results', icon: 'fa-chart-line' },
    { id: 'fees', label: 'Fees', icon: 'fa-dollar-sign' },
    { id: 'events', label: 'Events', icon: 'fa-calendar' },
    { id: 'notices', label: 'Notices', icon: 'fa-bullhorn' },
    { id: 'messages', label: 'Messages', icon: 'fa-envelope' },
    { id: 'settings', label: 'Settings', icon: 'fa-cog' }
  ],
  'teacher': [
    { id: 'home', label: 'Dashboard', icon: 'fa-home' },
    { id: 'profile', label: 'Profile', icon: 'fa-user' },
    { id: 'my_classes', label: 'My Classes', icon: 'fa-school' },
    { id: 'attendance', label: 'Attendance', icon: 'fa-check-circle' },
    { id: 'homework', label: 'Homework', icon: 'fa-book' },
    { id: 'results', label: 'Results', icon: 'fa-chart-line' },
    { id: 'messages', label: 'Messages', icon: 'fa-envelope' },
    { id: 'settings', label: 'Settings', icon: 'fa-cog' }
  ],
  'parent': [
    { id: 'home', label: 'Dashboard', icon: 'fa-home' },
    { id: 'profile', label: 'Profile', icon: 'fa-user' },
    { id: 'attendance', label: 'Attendance', icon: 'fa-check-circle' },
    { id: 'homework', label: 'Homework', icon: 'fa-book' },
    { id: 'exams', label: 'Exams', icon: 'fa-file-alt' },
    { id: 'results', label: 'Results', icon: 'fa-chart-line' },
    { id: 'fees', label: 'Fees', icon: 'fa-dollar-sign' },
    { id: 'notices', label: 'Notices', icon: 'fa-bullhorn' },
    { id: 'messages', label: 'Messages', icon: 'fa-envelope' },
    { id: 'settings', label: 'Settings', icon: 'fa-cog' }
  ],
  'student': [
    { id: 'home', label: 'Dashboard', icon: 'fa-home' },
    { id: 'profile', label: 'Profile', icon: 'fa-user' },
    { id: 'attendance', label: 'Attendance', icon: 'fa-check-circle' },
    { id: 'homework', label: 'Homework', icon: 'fa-book' },
    { id: 'exams', label: 'Exams', icon: 'fa-file-alt' },
    { id: 'results', label: 'Results', icon: 'fa-chart-line' },
    { id: 'notices', label: 'Notices', icon: 'fa-bullhorn' },
    { id: 'messages', label: 'Messages', icon: 'fa-envelope' },
    { id: 'settings', label: 'Settings', icon: 'fa-cog' }
  ],
  'coordinator': [
    { id: 'home', label: 'Dashboard', icon: 'fa-home' },
    { id: 'students', label: 'Students', icon: 'fa-users' },
    { id: 'teachers', label: 'Teachers', icon: 'fa-chalkboard-teacher' },
    { id: 'attendance', label: 'Attendance', icon: 'fa-check-circle' },
    { id: 'homework', label: 'Homework', icon: 'fa-book' },
    { id: 'results', label: 'Results', icon: 'fa-chart-line' },
    { id: 'messages', label: 'Messages', icon: 'fa-envelope' },
    { id: 'settings', label: 'Settings', icon: 'fa-cog' }
  ],
  'principal': [
    { id: 'home', label: 'Dashboard', icon: 'fa-home' },
    { id: 'students', label: 'Students', icon: 'fa-users' },
    { id: 'teachers', label: 'Teachers', icon: 'fa-chalkboard-teacher' },
    { id: 'attendance', label: 'Attendance', icon: 'fa-check-circle' },
    { id: 'homework', label: 'Homework', icon: 'fa-book' },
    { id: 'results', label: 'Results', icon: 'fa-chart-line' },
    { id: 'fees', label: 'Fees', icon: 'fa-dollar-sign' },
    { id: 'events', label: 'Events', icon: 'fa-calendar' },
    { id: 'notices', label: 'Notices', icon: 'fa-bullhorn' },
    { id: 'messages', label: 'Messages', icon: 'fa-envelope' },
    { id: 'settings', label: 'Settings', icon: 'fa-cog' }
  ],
  'super_admin': [
    { id: 'home', label: 'Dashboard', icon: 'fa-home' },
    { id: 'users', label: 'Users', icon: 'fa-users' },
    { id: 'students', label: 'Students', icon: 'fa-graduation-cap' },
    { id: 'teachers', label: 'Teachers', icon: 'fa-chalkboard-teacher' },
    { id: 'system', label: 'System', icon: 'fa-cogs' },
    { id: 'logs', label: 'Logs', icon: 'fa-file-alt' },
    { id: 'settings', label: 'Settings', icon: 'fa-cog' }
  ]
};

const ROLE_HOME = {
  'vice_principal': {
    greeting: 'Good Morning, SUMAN!',
    subtitle: 'Here\'s your administrative overview for today.',
    stats: [
      { icon: 'fa-users', label: 'Total Students', value: '130', color: '#5ca870' },
      { icon: 'fa-chalkboard-teacher', label: 'Teachers', value: '7', color: '#1976d2' },
      { icon: 'fa-school', label: 'Classes', value: '16', color: '#ff6b6b' },
      { icon: 'fa-check-circle', label: 'Avg Attendance', value: '88%', color: '#ffa726' }
    ]
  },
  'teacher': {
    greeting: 'Good Morning!',
    subtitle: 'Your classes and tasks for today.',
    stats: [
      { icon: 'fa-school', label: 'My Classes', value: '3', color: '#5ca870' },
      { icon: 'fa-users', label: 'Students', value: '30', color: '#1976d2' },
      { icon: 'fa-book', label: 'Homework', value: '2', color: '#ff6b6b' },
      { icon: 'fa-check-circle', label: 'Attendance', value: '92%', color: '#ffa726' }
    ]
  },
  'parent': {
    greeting: 'Good Morning!',
    subtitle: 'Your child\'s academic progress today.',
    stats: [
      { icon: 'fa-chart-line', label: 'Current GPA', value: '8.7', color: '#5ca870' },
      { icon: 'fa-check-circle', label: 'Attendance', value: '94%', color: '#1976d2' },
      { icon: 'fa-book', label: 'Homework', value: '3', color: '#ff6b6b' },
      { icon: 'fa-calendar', label: 'Next Exam', value: '5d', color: '#ffa726' }
    ]
  },
  'student': {
    greeting: 'Good Morning!',
    subtitle: 'Your academic dashboard.',
    stats: [
      { icon: 'fa-chart-line', label: 'Current GPA', value: '8.7', color: '#5ca870' },
      { icon: 'fa-check-circle', label: 'Attendance', value: '94%', color: '#1976d2' },
      { icon: 'fa-book', label: 'Homework', value: '3', color: '#ff6b6b' },
      { icon: 'fa-trophy', label: 'Rank', value: '1', color: '#ffa726' }
    ]
  },
  'coordinator': {
    greeting: 'Good Morning!',
    subtitle: 'Academic coordination overview.',
    stats: [
      { icon: 'fa-users', label: 'Students', value: '130', color: '#5ca870' },
      { icon: 'fa-chalkboard-teacher', label: 'Teachers', value: '7', color: '#1976d2' },
      { icon: 'fa-school', label: 'Classes', value: '16', color: '#ff6b6b' },
      { icon: 'fa-chart-line', label: 'Avg GPA', value: '7.6', color: '#ffa726' }
    ]
  },
  'principal': {
    greeting: 'Good Morning!',
    subtitle: 'School overview and administration.',
    stats: [
      { icon: 'fa-users', label: 'Total Students', value: '130', color: '#5ca870' },
      { icon: 'fa-chalkboard-teacher', label: 'Teachers', value: '7', color: '#1976d2' },
      { icon: 'fa-school', label: 'Classes', value: '16', color: '#ff6b6b' },
      { icon: 'fa-check-circle', label: 'Overall Attendance', value: '88%', color: '#ffa726' }
    ]
  },
  'super_admin': {
    greeting: 'System Administrator',
    subtitle: 'System health and management.',
    stats: [
      { icon: 'fa-users', label: 'Total Users', value: '142', color: '#5ca870' },
      { icon: 'fa-server', label: 'System Health', value: 'Good', color: '#1976d2' },
      { icon: 'fa-database', label: 'Database', value: 'Synced', color: '#ff6b6b' },
      { icon: 'fa-shield-alt', label: 'Security', value: 'Active', color: '#ffa726' }
    ]
  }
};

console.log('[Data Sync] Loaded 130 students, 7 teachers, 5 announcements - All data synchronized');
