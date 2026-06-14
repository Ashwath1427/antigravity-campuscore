with open("live_dash.js", "r", encoding="utf-8") as f:
    text = f.read()
if "buildVPStudents" in text:
    print("Found buildVPStudents in live_dash.js")
else:
    print("NOT FOUND buildVPStudents in live_dash.js")
if "buildVPAttendance" in text:
    print("Found buildVPAttendance")
else:
    print("NOT FOUND buildVPAttendance")
