import os

dash_path = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/dashboard.js"
with open(dash_path, "r", encoding="utf-8") as f:
    dash = f.read()

# Replace hardcoded child fetches in dashboard.js
dash = dash.replace(
    "const child = PARENT_CHILD;",
    "const child = getParentChildContext(user);"
)
dash = dash.replace(
    "const c = PARENT_CHILD;",
    "const c = getParentChildContext(user);"
)
dash = dash.replace(
    "PARENT_CHILD.class",
    "child.class"
)
dash = dash.replace(
    "PARENT_CHILD.name",
    "child.name"
)

helper_fn = """
function getParentChildContext(user) {
  if (!user.childId) return PARENT_CHILD;
  const s = STUDENTS.find(x => x.id === user.childId) || STUDENTS[0];
  return {
    ...s,
    parentName: user.name,
    parentContact: user.phone,
    parentEmail: user.email,
    bloodGroup: 'B+',
    house: 'Ruby',
    academicYear: '2025-26',
    classTeacher: 'Prasana Reddy'
  };
}
"""

if "function getParentChildContext" not in dash:
    dash = dash.replace("/* ━━━━ PARENT: CHILD PROFILE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */", helper_fn + "\n/* ━━━━ PARENT: CHILD PROFILE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */")

with open(dash_path, "w", encoding="utf-8") as f:
    f.write(dash)
