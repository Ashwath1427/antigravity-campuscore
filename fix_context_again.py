import re

dash_path = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/dashboard.js"
with open(dash_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix getParentChildContext
new_context = """function getParentChildContext(user) {
  if (!user.childId) return PARENT_CHILD;
  const s = STUDENTS.find(x => x.id === user.childId) || STUDENTS.find(x => x.admNo === user.username.replace('P', '').replace('A', '')) || STUDENTS[0];
  
  // Dynamic teacher matching based on DEMO_USERS role="class_teacher" 
  // or a preset mapping for 9-C -> Prasana Reddy, etc.
  let teacher = s.classTeacher;
  if(!teacher) {
    if(s.class === '9-C') teacher = 'Prasana Reddy';
    else if(s.class === '10-A') teacher = 'Anita Pillai';
    else teacher = 'Teacher ' + s.class;
  }

  return {
    ...PARENT_CHILD,
    ...s,
    parentName: user.name,
    parentContact: user.phone,
    parentEmail: user.email,
    bloodGroup: 'B+',
    house: 'Ruby',
    academicYear: '2025-26',
    classTeacher: teacher
  };
}"""

content = re.sub(
    r"function getParentChildContext\(user\) \{.*?\n\}",
    new_context,
    content,
    flags=re.DOTALL
)

# Fix promoteStudents again to actually assign classTeacher per student
new_promote = """function promoteStudents() {
  if(!confirm("Are you sure you want to promote all students? This will shuffle them to the next class and assign a new random class teacher.")) return;
  const sections = ['A','B','C','D','E','F'];
  const newTeachers = ['Mr. Sharma', 'Mrs. Gupta', 'Sunita Verma', 'Mohan Das', 'Venkat Iyer', 'Prasana Reddy', 'Anita Pillai'];
  STUDENTS.forEach(student => {
    let currentClassSplit = student.class.split('-');
    if(currentClassSplit.length < 2) return;
    let grade = parseInt(currentClassSplit[0]);
    if(grade < 12 && !isNaN(grade)) {
      grade++;
      student.class = grade + "-" + sections[Math.floor(Math.random()*sections.length)];
      student.classTeacher = newTeachers[Math.floor(Math.random()*newTeachers.length)];
    } else {
      student.class = "Graduated";
      student.classTeacher = "None";
    }
  });
  
  // Persist the changes
  if(typeof saveStudents === 'function') saveStudents();
  
  alert("All students have been promoted to the next grade and reassigned to new sections and teachers.");
  buildDashboard(currentUser);
}"""

content = re.sub(
    r"function promoteStudents\(\) \{.*?\n\}",
    new_promote,
    content,
    flags=re.DOTALL
)

with open(dash_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed parent context and promotion logic")
