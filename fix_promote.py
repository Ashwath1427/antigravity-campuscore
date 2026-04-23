import os

data_path = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/data.js"
with open(data_path, "r", encoding="utf-8") as f:
    content = f.read()

new_init = """function initDataStore() {
  if (!localStorage.getItem('campuscore_issues')) {
    localStorage.setItem('campuscore_issues', JSON.stringify(DEFAULT_GLOBAL_ISSUES));
  }
  GLOBAL_ISSUES = JSON.parse(localStorage.getItem('campuscore_issues'));
  
  if (!localStorage.getItem('campuscore_settings')) {
    localStorage.setItem('campuscore_settings', JSON.stringify({}));
  }
  
  // Persist STUDENTS to support Promote feature
  if (!localStorage.getItem('campuscore_students')) {
    localStorage.setItem('campuscore_students', JSON.stringify(STUDENTS));
  } else {
    STUDENTS = JSON.parse(localStorage.getItem('campuscore_students'));
  }
}

function saveStudents() {
  localStorage.setItem('campuscore_students', JSON.stringify(STUDENTS));
}
"""

if "// Persist STUDENTS" not in content:
    content = content.replace(
        "function initDataStore() {\n  if (!localStorage.getItem('campuscore_issues')) {\n    localStorage.setItem('campuscore_issues', JSON.stringify(DEFAULT_GLOBAL_ISSUES));\n  }\n  GLOBAL_ISSUES = JSON.parse(localStorage.getItem('campuscore_issues'));\n  \n  if (!localStorage.getItem('campuscore_settings')) {\n    localStorage.setItem('campuscore_settings', JSON.stringify({}));\n  }\n}",
        new_init
    )
    with open(data_path, "w", encoding="utf-8") as f:
        f.write(content)

# Now fix promoteStudents() in dashboard.js
dash_path = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/dashboard.js"
with open(dash_path, "r", encoding="utf-8") as f:
    dash = f.read()

new_promote = """function promoteStudents() {
  if(!confirm("Are you sure you want to promote all students? This will shuffle them to the next class and assign a new random class teacher.")) return;
  const sections = ['A','B','C','D','E','F'];
  const newTeachers = TEACHERS.map(t=>t.name);
  STUDENTS.forEach(student => {
    let currentClassSplit = student.class.split('-');
    let grade = parseInt(currentClassSplit[0]);
    if(grade < 12) {
      grade++;
      student.class = grade + "-" + sections[Math.floor(Math.random()*sections.length)];
    } else {
      student.class = "Graduated";
    }
  });
  
  // Persist the changes
  if(typeof saveStudents === 'function') saveStudents();
  
  alert("All students have been promoted to the next grade and reassigned to new sections and teachers.");
  buildDashboard(currentUser);
}"""

# Extract the old function
import re
dash = re.sub(
    r"function promoteStudents\(\) \{.*?\n\}",
    new_promote,
    dash,
    flags=re.DOTALL
)

with open(dash_path, "w", encoding="utf-8") as f:
    f.write(dash)

print("Fixed persistence and promoteStudents()")

