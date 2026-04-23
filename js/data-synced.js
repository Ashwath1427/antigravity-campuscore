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
let STUDENTS = [
  // CLASS 9-C - 30 STUDENTS (from image)
  { id: "3180076", admNo: "3180076", name: "KASULA ASHWATH", class: "9-C", roll: "01", gender: "Male", dob: "15 Jan 2011", attendance: 94, behavior: "Excellent", fee_status: "Paid", gpa: 8.7, parent: "Parent of KASULA ASHWATH" },
  { id: "3240214", admNo: "3240214", name: "NIMMAKAYALA PRATEEK REDDY", class: "9-C", roll: "02", gender: "Male", dob: "15 Jan 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of NIMMAKAYALA PRATEEK REDDY" },
  { id: "3240215", admNo: "3240215", name: "BHUKYA PRANAVI", class: "9-C", roll: "03", gender: "Female", dob: "15 Jan 2011", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of BHUKYA PRANAVI" },
  { id: "3240216", admNo: "3240216", name: "SNITHIK VENGALA", class: "9-C", roll: "04", gender: "Male", dob: "15 Jan 2011", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of SNITHIK VENGALA" },
  { id: "3240217", admNo: "3240217", name: "BHUKYA PRANEETH", class: "9-C", roll: "05", gender: "Male", dob: "15 Jan 2011", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of BHUKYA PRANEETH" },
  { id: "3240218", admNo: "3240218", name: "G MANASWINI", class: "9-C", roll: "06", gender: "Female", dob: "15 Jan 2011", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of G MANASWINI" },
  { id: "3240219", admNo: "3240219", name: "NIDHISH DUMALA", class: "9-C", roll: "07", gender: "Male", dob: "15 Jan 2011", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of NIDHISH DUMALA" },
  { id: "3240220", admNo: "3240220", name: "SATHWIK REDDY GANTA", class: "9-C", roll: "08", gender: "Male", dob: "15 Jan 2011", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of SATHWIK REDDY GANTA" },
  { id: "3240221", admNo: "3240221", name: "KOTHA ASHVIK", class: "9-C", roll: "09", gender: "Male", dob: "15 Jan 2011", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of KOTHA ASHVIK" },
  { id: "3240222", admNo: "3240222", name: "PRANEETH BHUKYA", class: "9-C", roll: "10", gender: "Male", dob: "15 Jan 2011", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of PRANEETH BHUKYA" },
  { id: "3240223", admNo: "3240223", name: "VYSHNAVI B", class: "9-C", roll: "11", gender: "Female", dob: "15 Jan 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of VYSHNAVI B" },
  { id: "3240224", admNo: "3240224", name: "HARSHITHA", class: "9-C", roll: "12", gender: "Female", dob: "15 Jan 2011", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of HARSHITHA" },
  { id: "3240225", admNo: "3240225", name: "RUTVIK J", class: "9-C", roll: "13", gender: "Male", dob: "15 Jan 2011", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of RUTVIK J" },
  { id: "3240226", admNo: "3240226", name: "SAICHARAN", class: "9-C", roll: "14", gender: "Male", dob: "15 Jan 2011", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of SAICHARAN" },
  { id: "3240227", admNo: "3240227", name: "ADVAITH", class: "9-C", roll: "15", gender: "Male", dob: "15 Jan 2011", attendance: 95, behavior: "Excellent", fee_status: "Paid", gpa: 8.5, parent: "Parent of ADVAITH" },
  { id: "3240228", admNo: "3240228", name: "ANANYA", class: "9-C", roll: "16", gender: "Female", dob: "15 Jan 2011", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of ANANYA" },
  { id: "3240229", admNo: "3240229", name: "ROHITH", class: "9-C", roll: "17", gender: "Male", dob: "15 Jan 2011", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of ROHITH" },
  { id: "3240230", admNo: "3240230", name: "TEJAS", class: "9-C", roll: "18", gender: "Male", dob: "15 Jan 2011", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of TEJAS" },
  { id: "3240231", admNo: "3240231", name: "SNEHA", class: "9-C", roll: "19", gender: "Female", dob: "15 Jan 2011", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of SNEHA" },
  { id: "3240232", admNo: "3240232", name: "KARTHIK", class: "9-C", roll: "20", gender: "Male", dob: "15 Jan 2011", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of KARTHIK" },
  { id: "3240233", admNo: "3240233", name: "DIVYA", class: "9-C", roll: "21", gender: "Female", dob: "15 Jan 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of DIVYA" },
  { id: "3240234", admNo: "3240234", name: "VIKRANT", class: "9-C", roll: "22", gender: "Male", dob: "15 Jan 2011", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of VIKRANT" },
  { id: "3240235", admNo: "3240235", name: "PRIYANKA", class: "9-C", roll: "23", gender: "Female", dob: "15 Jan 2011", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of PRIYANKA" },
  { id: "3240236", admNo: "3240236", name: "RAHUL", class: "9-C", roll: "24", gender: "Male", dob: "15 Jan 2011", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of RAHUL" },
  { id: "3240237", admNo: "3240237", name: "MEERA", class: "9-C", roll: "25", gender: "Female", dob: "15 Jan 2011", attendance: 94, behavior: "Excellent", fee_status: "Paid", gpa: 8.4, parent: "Parent of MEERA" },
  { id: "3240238", admNo: "3240238", name: "ARJUN", class: "9-C", roll: "26", gender: "Male", dob: "15 Jan 2011", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of ARJUN" },
  { id: "3240239", admNo: "3240239", name: "LAKSHMI", class: "9-C", roll: "27", gender: "Female", dob: "15 Jan 2011", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of LAKSHMI" },
  { id: "3240240", admNo: "3240240", name: "VENKAT", class: "9-C", roll: "28", gender: "Male", dob: "15 Jan 2011", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of VENKAT" },
  { id: "3240241", admNo: "3240241", name: "SOUNDARYA", class: "9-C", roll: "29", gender: "Female", dob: "15 Jan 2011", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of SOUNDARYA" },
  { id: "3240242", admNo: "3240242", name: "CHANDRA", class: "9-C", roll: "30", gender: "Male", dob: "15 Jan 2011", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of CHANDRA" },

  // CLASS 6 - 20 STUDENTS (5 per section)
  { id: "3160001", admNo: "3160001", name: "RAVI KUMAR", class: "6-A", roll: "01", gender: "Male", dob: "15 Jan 2012", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of RAVI KUMAR" },
  { id: "3160002", admNo: "3160002", name: "ANJALI DEVI", class: "6-A", roll: "02", gender: "Female", dob: "15 Jan 2012", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of ANJALI DEVI" },
  { id: "3160003", admNo: "3160003", name: "RAJESH SINGH", class: "6-A", roll: "03", gender: "Male", dob: "15 Jan 2012", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of RAJESH SINGH" },
  { id: "3160004", admNo: "3160004", name: "PRIYA SHARMA", class: "6-A", roll: "04", gender: "Female", dob: "15 Jan 2012", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of PRIYA SHARMA" },
  { id: "3160005", admNo: "3160005", name: "AMIT KUMAR", class: "6-A", roll: "05", gender: "Male", dob: "15 Jan 2012", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of AMIT KUMAR" },

  { id: "3160006", admNo: "3160006", name: "SUNITA RANI", class: "6-B", roll: "01", gender: "Female", dob: "15 Jan 2012", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of SUNITA RANI" },
  { id: "3160007", admNo: "3160007", name: "MANOJ KUMAR", class: "6-B", roll: "02", gender: "Male", dob: "15 Jan 2012", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of MANOJ KUMAR" },
  { id: "3160008", admNo: "3160008", name: "GEETA DEVI", class: "6-B", roll: "03", gender: "Female", dob: "15 Jan 2012", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of GEETA DEVI" },
  { id: "3160009", admNo: "3160009", name: "RAHUL VERMA", class: "6-B", roll: "04", gender: "Male", dob: "15 Jan 2012", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 6.8, parent: "Parent of RAHUL VERMA" },
  { id: "3160010", admNo: "3160010", name: "POOJA SINGH", class: "6-B", roll: "05", gender: "Female", dob: "15 Jan 2012", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of POOJA SINGH" },

  { id: "3160011", admNo: "3160011", name: "VIJAY KUMAR", class: "6-C", roll: "01", gender: "Male", dob: "15 Jan 2012", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of VIJAY KUMAR" },
  { id: "3160012", admNo: "3160012", name: "ANITA DEVI", class: "6-C", roll: "02", gender: "Female", dob: "15 Jan 2012", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of ANITA DEVI" },
  { id: "3160013", admNo: "3160013", name: "SURESH KUMAR", class: "6-C", roll: "03", gender: "Male", dob: "15 Jan 2012", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of SURESH KUMAR" },
  { id: "3160014", admNo: "3160014", name: "MEENA KUMARI", class: "6-C", roll: "04", gender: "Female", dob: "15 Jan 2012", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of MEENA KUMARI" },
  { id: "3160015", admNo: "3160015", name: "RAJEEV SINGH", class: "6-C", roll: "05", gender: "Male", dob: "15 Jan 2012", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of RAJEEV SINGH" },

  { id: "3160016", admNo: "3160016", name: "KAVITA RANI", class: "6-D", roll: "01", gender: "Female", dob: "15 Jan 2012", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of KAVITA RANI" },
  { id: "3160017", admNo: "3160017", name: "MOHAN KUMAR", class: "6-D", roll: "02", gender: "Male", dob: "15 Jan 2012", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of MOHAN KUMAR" },
  { id: "3160018", admNo: "3160018", name: "SAROJ DEVI", class: "6-D", roll: "03", gender: "Female", dob: "15 Jan 2012", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of SAROJ DEVI" },
  { id: "3160019", admNo: "3160019", name: "DEEPAK KUMAR", class: "6-D", roll: "04", gender: "Male", dob: "15 Jan 2012", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of DEEPAK KUMAR" },
  { id: "3160020", admNo: "3160020", name: "REKHA SHARMA", class: "6-D", roll: "05", gender: "Female", dob: "15 Jan 2012", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 6.8, parent: "Parent of REKHA SHARMA" },

  // CLASS 7 - 20 STUDENTS (5 per section)
  { id: "3170001", admNo: "3170001", name: "BHAVANA SINGH", class: "7-A", roll: "01", gender: "Female", dob: "15 Jan 2011", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of BHAVANA SINGH" },
  { id: "3170002", admNo: "3170002", name: "KARAN SINGH", class: "7-A", roll: "02", gender: "Male", dob: "15 Jan 2011", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of KARAN SINGH" },
  { id: "3170003", admNo: "3170003", name: "DIYA SHARMA", class: "7-A", roll: "03", gender: "Female", dob: "15 Jan 2011", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of DIYA SHARMA" },
  { id: "3170004", admNo: "3170004", name: "VIKRANT SINGH", class: "7-A", roll: "04", gender: "Male", dob: "15 Jan 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of VIKRANT SINGH" },
  { id: "3170005", admNo: "3170005", name: "ANJALI KUMARI", class: "7-A", roll: "05", gender: "Female", dob: "15 Jan 2011", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of ANJALI KUMARI" },

  { id: "3170006", admNo: "3170006", name: "ROHIT KUMAR", class: "7-B", roll: "01", gender: "Male", dob: "15 Jan 2011", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of ROHIT KUMAR" },
  { id: "3170007", admNo: "3170007", name: "PRIYA VERMA", class: "7-B", roll: "02", gender: "Female", dob: "15 Jan 2011", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of PRIYA VERMA" },
  { id: "3170008", admNo: "3170008", name: "AMIT SINGH", class: "7-B", roll: "03", gender: "Male", dob: "15 Jan 2011", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of AMIT SINGH" },
  { id: "3170009", admNo: "3170009", name: "SNEHA RANI", class: "7-B", roll: "04", gender: "Female", dob: "15 Jan 2011", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of SNEHA RANI" },
  { id: "3170010", admNo: "3170010", name: "RAHUL KUMAR", class: "7-B", roll: "05", gender: "Male", dob: "15 Jan 2011", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of RAHUL KUMAR" },

  { id: "3170011", admNo: "3170011", name: "MEENA DEVI", class: "7-C", roll: "01", gender: "Female", dob: "15 Jan 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of MEENA DEVI" },
  { id: "3170012", admNo: "3170012", name: "MANOJ SINGH", class: "7-C", roll: "02", gender: "Male", dob: "15 Jan 2011", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of MANOJ SINGH" },
  { id: "3170013", admNo: "3170013", name: "POOJA KUMARI", class: "7-C", roll: "03", gender: "Female", dob: "15 Jan 2011", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of POOJA KUMARI" },
  { id: "3170014", admNo: "3170014", name: "VIJAY VERMA", class: "7-C", roll: "04", gender: "Male", dob: "15 Jan 2011", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of VIJAY VERMA" },
  { id: "3170015", admNo: "3170015", name: "ANITA RANI", class: "7-C", roll: "05", gender: "Female", dob: "15 Jan 2011", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of ANITA RANI" },

  { id: "3170016", admNo: "3170016", name: "SURESH KUMAR", class: "7-D", roll: "01", gender: "Male", dob: "15 Jan 2011", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of SURESH KUMAR" },
  { id: "3170017", admNo: "3170017", name: "KAVITA SHARMA", class: "7-D", roll: "02", gender: "Female", dob: "15 Jan 2011", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of KAVITA SHARMA" },
  { id: "3170018", admNo: "3170018", name: "RAJEEV SINGH", class: "7-D", roll: "03", gender: "Male", dob: "15 Jan 2011", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of RAJEEV SINGH" },
  { id: "3170019", admNo: "3170019", name: "SAROJ KUMARI", class: "7-D", roll: "04", gender: "Female", dob: "15 Jan 2011", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of SAROJ KUMARI" },
  { id: "3170020", admNo: "3170020", name: "DEEPAK VERMA", class: "7-D", roll: "05", gender: "Male", dob: "15 Jan 2011", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of DEEPAK VERMA" },

  // CLASS 8 - 20 STUDENTS (5 per section)
  { id: "3180001", admNo: "3180001", name: "ARJUN SINGH", class: "8-A", roll: "01", gender: "Male", dob: "15 Jan 2010", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of ARJUN SINGH" },
  { id: "3180002", admNo: "3180002", name: "DIVYA SHARMA", class: "8-A", roll: "02", gender: "Female", dob: "15 Jan 2010", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of DIVYA SHARMA" },
  { id: "3180003", admNo: "3180003", name: "KARTHIK KUMAR", class: "8-A", roll: "03", gender: "Male", dob: "15 Jan 2010", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of KARTHIK KUMAR" },
  { id: "3180004", admNo: "3180004", name: "PRIYA VERMA", class: "8-A", roll: "04", gender: "Female", dob: "15 Jan 2010", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of PRIYA VERMA" },
  { id: "3180005", admNo: "3180005", name: "ROHIT SINGH", class: "8-A", roll: "05", gender: "Male", dob: "15 Jan 2010", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of ROHIT SINGH" },

  { id: "3180006", admNo: "3180006", name: "ANJALI KUMARI", class: "8-B", roll: "01", gender: "Female", dob: "15 Jan 2010", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of ANJALI KUMARI" },
  { id: "3180007", admNo: "3180007", name: "MANOJ VERMA", class: "8-B", roll: "02", gender: "Male", dob: "15 Jan 2010", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of MANOJ VERMA" },
  { id: "3180008", admNo: "3180008", name: "SNEHA RANI", class: "8-B", roll: "03", gender: "Female", dob: "15 Jan 2010", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of SNEHA RANI" },
  { id: "3180009", admNo: "3180009", name: "RAHUL KUMAR", class: "8-B", roll: "04", gender: "Male", dob: "15 Jan 2010", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of RAHUL KUMAR" },
  { id: "3180010", admNo: "3180010", name: "MEENA DEVI", class: "8-B", roll: "05", gender: "Female", dob: "15 Jan 2010", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of MEENA DEVI" },

  { id: "3180011", admNo: "3180011", name: "VIJAY SINGH", class: "8-C", roll: "01", gender: "Male", dob: "15 Jan 2010", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of VIJAY SINGH" },
  { id: "3180012", admNo: "3180012", name: "POOJA SHARMA", class: "8-C", roll: "02", gender: "Female", dob: "15 Jan 2010", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of POOJA SHARMA" },
  { id: "3180013", admNo: "3180013", name: "SURESH KUMAR", class: "8-C", roll: "03", gender: "Male", dob: "15 Jan 2010", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of SURESH KUMAR" },
  { id: "3180014", admNo: "3180014", name: "ANITA RANI", class: "8-C", roll: "04", gender: "Female", dob: "15 Jan 2010", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of ANITA RANI" },
  { id: "3180015", admNo: "3180015", name: "RAJEEV VERMA", class: "8-C", roll: "05", gender: "Male", dob: "15 Jan 2010", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of RAJEEV VERMA" },

  { id: "3180016", admNo: "3180016", name: "KAVITA KUMARI", class: "8-D", roll: "01", gender: "Female", dob: "15 Jan 2010", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of KAVITA KUMARI" },
  { id: "3180017", admNo: "3180017", name: "MOHAN SINGH", class: "8-D", roll: "02", gender: "Male", dob: "15 Jan 2010", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of MOHAN SINGH" },
  { id: "3180018", admNo: "3180018", name: "SAROJ DEVI", class: "8-D", roll: "03", gender: "Female", dob: "15 Jan 2010", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of SAROJ DEVI" },
  { id: "3180019", admNo: "3180019", name: "DEEPAK KUMAR", class: "8-D", roll: "04", gender: "Male", dob: "15 Jan 2010", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of DEEPAK KUMAR" },
  { id: "3180020", admNo: "3180020", name: "REKHA SHARMA", class: "8-D", roll: "05", gender: "Female", dob: "15 Jan 2010", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of REKHA SHARMA" },

  // CLASS 9 - 15 STUDENTS (5 per section, excluding 9-C which is above)
  { id: "3190001", admNo: "3190001", name: "BHAVANA VERMA", class: "9-A", roll: "01", gender: "Female", dob: "15 Jan 2009", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of BHAVANA VERMA" },
  { id: "3190002", admNo: "3190002", name: "KARAN SINGH", class: "9-A", roll: "02", gender: "Male", dob: "15 Jan 2009", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of KARAN SINGH" },
  { id: "3190003", admNo: "3190003", name: "DIVYA KUMARI", class: "9-A", roll: "03", gender: "Female", dob: "15 Jan 2009", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of DIVYA KUMARI" },
  { id: "3190004", admNo: "3190004", name: "VIKRANT KUMAR", class: "9-A", roll: "04", gender: "Male", dob: "15 Jan 2009", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of VIKRANT KUMAR" },
  { id: "3190005", admNo: "3190005", name: "ANJALI RANI", class: "9-A", roll: "05", gender: "Female", dob: "15 Jan 2009", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of ANJALI RANI" },

  { id: "3190006", admNo: "3190006", name: "MANOJ SHARMA", class: "9-B", roll: "01", gender: "Male", dob: "15 Jan 2009", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of MANOJ SHARMA" },
  { id: "3190007", admNo: "3190007", name: "SNEHA VERMA", class: "9-B", roll: "02", gender: "Female", dob: "15 Jan 2009", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of SNEHA VERMA" },
  { id: "3190008", admNo: "3190008", name: "RAHUL KUMAR", class: "9-B", roll: "03", gender: "Male", dob: "15 Jan 2009", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of RAHUL KUMAR" },
  { id: "3190009", admNo: "3190009", name: "MEENA DEVI", class: "9-B", roll: "04", gender: "Female", dob: "15 Jan 2009", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of MEENA DEVI" },
  { id: "3190010", admNo: "3190010", name: "VIJAY SINGH", class: "9-B", roll: "05", gender: "Male", dob: "15 Jan 2009", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of VIJAY SINGH" },

  { id: "3190011", admNo: "3190011", name: "POOJA KUMARI", class: "9-D", roll: "01", gender: "Female", dob: "15 Jan 2009", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of POOJA KUMARI" },
  { id: "3190012", admNo: "3190012", name: "SURESH VERMA", class: "9-D", roll: "02", gender: "Male", dob: "15 Jan 2009", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of SURESH VERMA" },
  { id: "3190013", admNo: "3190013", name: "ANITA RANI", class: "9-D", roll: "03", gender: "Female", dob: "15 Jan 2009", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of ANITA RANI" },
  { id: "3190014", admNo: "3190014", name: "RAJEEV KUMAR", class: "9-D", roll: "04", gender: "Male", dob: "15 Jan 2009", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of RAJEEV KUMAR" },
  { id: "3190015", admNo: "3190015", name: "KAVITA SHARMA", class: "9-D", roll: "05", gender: "Female", dob: "15 Jan 2009", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of KAVITA SHARMA" },

  // CLASS 10 - 20 STUDENTS (5 per section)
  { id: "3200001", admNo: "3200001", name: "ARUN KUMAR", class: "10-A", roll: "01", gender: "Male", dob: "15 Jan 2008", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of ARUN KUMAR" },
  { id: "3200002", admNo: "3200002", name: "DIVYA SHARMA", class: "10-A", roll: "02", gender: "Female", dob: "15 Jan 2008", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of DIVYA SHARMA" },
  { id: "3200003", admNo: "3200003", name: "KARTHIK VERMA", class: "10-A", roll: "03", gender: "Male", dob: "15 Jan 2008", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of KARTHIK VERMA" },
  { id: "3200004", admNo: "3200004", name: "PRIYA KUMARI", class: "10-A", roll: "04", gender: "Female", dob: "15 Jan 2008", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of PRIYA KUMARI" },
  { id: "3200005", admNo: "3200005", name: "ROHIT SINGH", class: "10-A", roll: "05", gender: "Male", dob: "15 Jan 2008", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of ROHIT SINGH" },

  { id: "3200006", admNo: "3200006", name: "ANJALI RANI", class: "10-B", roll: "01", gender: "Female", dob: "15 Jan 2008", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of ANJALI RANI" },
  { id: "3200007", admNo: "3200007", name: "MANOJ KUMAR", class: "10-B", roll: "02", gender: "Male", dob: "15 Jan 2008", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of MANOJ KUMAR" },
  { id: "3200008", admNo: "3200008", name: "SNEHA VERMA", class: "10-B", roll: "03", gender: "Female", dob: "15 Jan 2008", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of SNEHA VERMA" },
  { id: "3200009", admNo: "3200009", name: "RAHUL SHARMA", class: "10-B", roll: "04", gender: "Male", dob: "15 Jan 2008", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of RAHUL SHARMA" },
  { id: "3200010", admNo: "3200010", name: "MEENA DEVI", class: "10-B", roll: "05", gender: "Female", dob: "15 Jan 2008", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of MEENA DEVI" },

  { id: "3200011", admNo: "3200011", name: "VIJAY KUMAR", class: "10-C", roll: "01", gender: "Male", dob: "15 Jan 2008", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of VIJAY KUMAR" },
  { id: "3200012", admNo: "3200012", name: "POOJA SHARMA", class: "10-C", roll: "02", gender: "Female", dob: "15 Jan 2008", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of POOJA SHARMA" },
  { id: "3200013", admNo: "3200013", name: "SURESH VERMA", class: "10-C", roll: "03", gender: "Male", dob: "15 Jan 2008", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of SURESH VERMA" },
  { id: "3200014", admNo: "3200014", name: "ANITA RANI", class: "10-C", roll: "04", gender: "Female", dob: "15 Jan 2008", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of ANITA RANI" },
  { id: "3200015", admNo: "3200015", name: "RAJEEV KUMAR", class: "10-C", roll: "05", gender: "Male", dob: "15 Jan 2008", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of RAJEEV KUMAR" },

  { id: "3200016", admNo: "3200016", name: "KAVITA KUMARI", class: "10-D", roll: "01", gender: "Female", dob: "15 Jan 2008", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of KAVITA KUMARI" },
  { id: "3200017", admNo: "3200017", name: "MOHAN SHARMA", class: "10-D", roll: "02", gender: "Male", dob: "15 Jan 2008", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of MOHAN SHARMA" },
  { id: "3200018", admNo: "3200018", name: "SAROJ DEVI", class: "10-D", roll: "03", gender: "Female", dob: "15 Jan 2008", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of SAROJ DEVI" },
  { id: "3200019", admNo: "3200019", name: "DEEPAK KUMAR", class: "10-D", roll: "04", gender: "Male", dob: "15 Jan 2008", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of DEEPAK KUMAR" },
  { id: "3200020", admNo: "3200020", name: "REKHA RANI", class: "10-D", roll: "05", gender: "Female", dob: "15 Jan 2008", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of REKHA RANI" }
];

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
