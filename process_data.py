import json
import re

with open("gen_output.txt", "r", encoding="utf-8") as f:
    gen_data = f.read()

parts = gen_data.split("// ─── Generated Students (Class 9-C) ───\n")
users_part = parts[0]
students_part = parts[1]

with open("C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/data.js", "r", encoding="utf-8") as f:
    data_content = f.read()

# 1. Inject Users
data_content = data_content.replace(
"""      { title: "Parent Meeting", text: "Meeting scheduled with Nanda S. on April 3", time: "1d ago", icon: "👥", color: "#1976d2" },
    ]
  }
];""",
f"""      {{ title: "Parent Meeting", text: "Meeting scheduled with Nanda S. on April 3", time: "1d ago", icon: "👥", color: "#1976d2" }},
    ]
  }},
{users_part.strip()}
];"""
)

# 2. Inject Students
data_content = data_content.replace(
"""  { id: "S012", admNo: "3211028",  name: "Sneha Reddy",      class: "8-B",  roll: "12", gender: "Female", dob: "18 Oct 2011", attendance: 94, behavior: "Excellent", fee_status: "Paid",    gpa: 8.8, parent: "Ramesh Reddy" },
];""",
f"""  {{ id: "S012", admNo: "3211028",  name: "Sneha Reddy",      class: "8-B",  roll: "12", gender: "Female", dob: "18 Oct 2011", attendance: 94, behavior: "Excellent", fee_status: "Paid",    gpa: 8.8, parent: "Ramesh Reddy" }},
{students_part.strip()}
];"""
)

# 3. Add base GLOBAL_ISSUES and localStorage wrappers at the bottom
init_block = """
// ─── Global State & LocalStorage Persistence ───────────────
let GLOBAL_ISSUES = [];

const DEFAULT_GLOBAL_ISSUES = [
  {
    id: "ISS-1001",
    title: "Bus route 4 arriving late",
    desc: "The bus driver has been arriving 15 minutes late for the past week, making Aarav late for the morning assembly.",
    status: "Reviewing",
    stage: "Coordinator",
    studentId: "3180076",
    studentName: "KASULA ASHWATH",
    class: "9-C",
    reporterId: "P3180076A",
    reporterName: "Parent of KASULA ASHWATH",
    reporterRole: "Parent",
    category: "Transport",
    priority: "Medium",
    severity: "Normal",
    assignedTo: "Anitha (Coord)",
    attachments: [],
    created: "2026-03-25T08:30:00Z",
    updated: "2026-03-28T09:15:00Z",
    timeline: [
      { date: "2026-03-25T08:30:00Z", actor: "Parent of KASULA ASHWATH", role: "Parent", note: "Issue raised regarding bus delays." },
      { date: "2026-03-26T10:00:00Z", actor: "Prasana Reddy", role: "Teacher", note: "I have also noticed Aarav arriving late. Escalated to Transport/Coordinator." },
      { date: "2026-03-26T10:05:00Z", actor: "System", role: "System", note: "Escalated to Coordinator" },
      { date: "2026-03-28T09:15:00Z", actor: "Anitha", role: "Coordinator", note: "I am speaking with the fleet manager to review GPS logs for Route 4." }
    ]
  },
  {
    id: "ISS-1002",
    title: "Discipline issue during P.E.",
    desc: "Student was involved in a minor altercation during the basketball match.",
    status: "Pending Action",
    stage: "VP",
    studentId: "3240214",
    studentName: "NIMMAKAYALA PRATEEK REDDY",
    class: "9-C",
    reporterId: "C001",
    reporterName: "Anitha",
    reporterRole: "Coordinator",
    category: "Discipline",
    priority: "High",
    severity: "Critical",
    assignedTo: "VP Suman",
    attachments: [],
    created: "2026-03-29T11:00:00Z",
    updated: "2026-03-29T14:30:00Z",
    timeline: [
      { date: "2026-03-29T11:00:00Z", actor: "Anitha", role: "Coordinator", note: "Reported altercation during PE. Immediate VP attention required." },
      { date: "2026-03-29T11:05:00Z", actor: "System", role: "System", note: "Escalated to VP" }
    ]
  }
];

function initDataStore() {
  if (!localStorage.getItem('campuscore_issues')) {
    localStorage.setItem('campuscore_issues', JSON.stringify(DEFAULT_GLOBAL_ISSUES));
  }
  GLOBAL_ISSUES = JSON.parse(localStorage.getItem('campuscore_issues'));
  
  if (!localStorage.getItem('campuscore_settings')) {
    localStorage.setItem('campuscore_settings', JSON.stringify({}));
  }
}

function saveIssues(issuesArr) {
  GLOBAL_ISSUES = issuesArr;
  localStorage.setItem('campuscore_issues', JSON.stringify(GLOBAL_ISSUES));
}

function getSettings(userId) {
  const allSet = JSON.parse(localStorage.getItem('campuscore_settings') || '{}');
  return allSet[userId] || {
    darkMode: false,
    compactMode: false,
    emailNotif: true,
    attNotif: true,
    feeNotif: false,
    hwNotif: true,
    language: 'English',
    twoFactor: false
  };
}

function saveSettings(userId, settingsObj) {
  const allSet = JSON.parse(localStorage.getItem('campuscore_settings') || '{}');
  allSet[userId] = settingsObj;
  localStorage.setItem('campuscore_settings', JSON.stringify(allSet));
}

initDataStore();
"""

data_content += "\n" + init_block

with open("C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/data.js", "w", encoding="utf-8") as f:
    f.write(data_content)
