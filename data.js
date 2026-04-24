/* ============================================================
   CAMPUS CORE – DATA.JS
   All hardcoded demo data matching DPS Nadergul prototype
   ============================================================ */

/**
 * Universal Translation Map for CampusCore
 * Supports: English, Telugu (te), Hindi (hi)
 */
window.CORE_TRANSLATIONS = {
    // Nav & Section Labels
    'home': { en: 'Home', te: 'హోమ్', hi: 'होम' },
    'profile': { en: 'Profile', te: 'ప్రొఫైల్', hi: 'प्रोफ़ाइल' },
    'attendance': { en: 'Attendance', te: 'హాజరు', hi: 'उपस्थिति' },
    'students': { en: 'Students', te: 'విద్యార్థులు', hi: 'छात्र' },
    'teachers': { en: 'Teachers', te: 'ఉపాధ్యాయులు', hi: 'शिक्षक' },
    'schedule': { en: 'Schedule', te: 'సమయపట్టిక', hi: 'समय सारणी' },
    'homework': { en: 'Homework', te: 'హోంవర్క్', hi: 'गृहकार्य' },
    'results': { en: 'Results', te: 'ఫలితాలు', hi: 'परिणाम' },
    'fees': { en: 'Fees', te: 'ఫీజులు', hi: 'फीस' },
    'announcements': { en: 'Notices', te: 'ప్రకటనలు', hi: 'सूचनाएं' },
    'events': { en: 'Events', te: 'ఈవెంట్స్', hi: 'कार्यक्रम' },
    'settings': { en: 'Settings', te: 'సెట్టింగులు', hi: 'सेटिंग्स' },
    'messages': { en: 'Messages', te: 'సందేశాలు', hi: 'संदेश' },
    'reports': { en: 'Reports', te: 'నివేదికలు', hi: 'रिपोर्ट' },
    'approvals': { en: 'Approvals', te: 'ఆమోదాలు', hi: 'स्वीकृति' },
    'logout': { en: 'Logout', te: 'లాగ్అవుట్', hi: 'लॉग आउट' },

    // Dashboard Banners & Greetings
    'welcome_back': { en: 'Welcome back', te: 'మళ్ళీ స్వాగతం', hi: 'वापस स्वागत है' },
    'quick_view': { en: "Here's a quick view of your campus today", te: 'ఈరోజు మీ క్యాంపస్ యొక్క సారాంశం ఇక్కడ ఉంది', hi: 'आज आपके कैंपस का संक्षिप्त विवरण यहां है' },
    'school_name': { en: 'DPS Nadergul', te: 'DPS నాడెర్గుల్', hi: 'DPS नाडेरगुल' },

    // Titles & Headers
    'quick_actions': { en: 'Quick Actions', te: 'త్వరిత చర్యలు', hi: 'त्वरित कार्रवाई' },
    'latest_notices': { en: 'Latest Announcements', te: 'తాజా ప్రకటనలు', hi: 'नवीनतम घोषणाएं' },
    'todays_schedule': { en: "Today's Schedule", te: 'నేటి షెడ్యూల్', hi: 'आज की समय सारणी' },
    'upcoming_events': { en: 'Upcoming Events', te: 'రాబోయే ఈవెంట్స్', hi: 'आगामी कार्यक्रम' },
    'attendance_summary': { en: 'Attendance Summary', te: 'హాజరు సారాంశం', hi: 'उपस्थिति सारांश' },
    'recent_activity': { en: 'Recent Activity', te: 'ఇటీవలి కార్యకలాపాలు', hi: 'हाल की गतिविधि' },
    
    // Buttons & Actions
    'view_all': { en: 'View All', te: 'అన్నీ చూడండి', hi: 'सभी देखें' },
    'add_student': { en: 'Add Student', te: 'విద్యార్థిని చేర్చు', hi: 'छात्र जोड़ें' },
    'edit_profile': { en: 'Edit Profile', te: 'ప్రొఫైల్ మార్చు', hi: 'प्रोफ़ाइल संपादित करें' },
    'save_changes': { en: 'Save Changes', te: 'మార్పులను సేవ్ చేయి', hi: 'परिवर्तन सहेजें' },
    'confirm': { en: 'Confirm', te: 'నిర్ధారించు', hi: 'पुष्टि करें' },
    'cancel': { en: 'Cancel', te: 'రద్దు చేయి', hi: 'रद्द करें' },
    'send': { en: 'Send Message', te: 'సందేశం పంపండి', hi: 'संदेश भेजें' },
    'apply_filter': { en: 'Apply Filter', te: 'ఫిల్టర్ వర్తింపజేయి', hi: 'फ़िल्टर लागू करें' },

    // Status & Misc
    'present': { en: 'Present', te: 'హాజరయ్యారు', hi: 'उपस्थित' },
    'absent': { en: 'Absent', te: 'గైర్హాజరు', hi: 'अनुपस्थित' },
    'late': { en: 'Late', te: 'ఆలస్యం', hi: 'देर से' },
    'on_leave': { en: 'On Leave', te: 'సెలవులో', hi: 'छुट्टी पर' },
    'active': { en: 'Active', te: 'క్రియాశీల', hi: 'सक्रिय' },
    'pending': { en: 'Pending', te: 'పెండింగ్', hi: 'लंबित' },
    'published': { en: 'Published', te: 'ప్రచురించబడింది', hi: 'प्रकाशित' },
    'archived': { en: 'Archived', te: 'ఆర్కైవ్ చేయబడింది', hi: 'संग्रहित' }
};

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
    email: "sneha@dpsnadergul.edu",
    joined: "Aug 2022",
    avatar_color: "#5ca870",
    icon: "fa-chalkboard-teacher",
    notifications: [
      { title: "Assignment Due Today", text: "Class 9B Quadratic Equations due by 3 PM", time: "1h ago", icon: "📝", color: "#f57c00" },
      { title: "Parent Query", text: "Parent sent a query about KASULA ASHWATH", time: "3h ago", icon: "💬", color: "#1976d2" },
      { title: "Marks Uploaded", text: "Mid-term marks for Class 10A uploaded successfully", time: "1d ago", icon: "✅", color: "#5ca870" },
    ]
  },
  // DATA RESET: id:3 (P_ASHWATH_TEST) permanently removed — was a legacy collision artifact.
  // Real parent for KASULA ASHWATH → id:107, username: P3180076A / parent123
  // PARENT LOGIN SCOPE: Only Class 9-C students (ids 101-127) have login-capable parent accounts.
  // All other class sections have a 'parent' display field but no corresponding DEMO_USERS entry.
  {
    id: 5,
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
      { title: "Timetable Updated", text: "Class 8 schedule revised for April", time: "1h ago", icon: "📅", color: "#1976d2" },
      { title: "Teacher On Leave", text: "Mr. Ramesh Sharma on leave tomorrow", time: "4h ago", icon: "👨‍🏫", color: "#f57c00" },
      { title: "CCA Event", text: "Science Exhibition registration deadline approaching", time: "1d ago", icon: "🔬", color: "#5ca870" },
    ]
  },
  {
    id: 6,
    username: "CT8B",
    password: "CLASS123",
    name: "Anita Pillai",
    role: "class_teacher",
    roleLabel: "Class Teacher",
    department: "Class Teacher – 8B (English Literature)",
    phone: "+91 43210 98765",
    email: "anita@dpsnadergul.edu",
    joined: "Jul 2020",
    avatar_color: "#8b5cf6",
    icon: "fa-user-graduate",
    assignedClass: "8-B",
    notifications: [
      { title: "Report Cards Due", text: "8B report cards need to be generated by April 10", time: "2h ago", icon: "📋", color: "#f57c00" },
      { title: "Attendance Marked", text: "Today's attendance for 8B recorded successfully", time: "5h ago", icon: "✅", color: "#5ca870" },
      { title: "Parent Meeting", text: "Meeting scheduled with Nanda S. on April 3", time: "1d ago", icon: "👥", color: "#1976d2" },
    ]
  },
  {
    id: 7,
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
  },
  {
    id: 8,
    username: "APAAAS",
    password: "APAAAS",
    name: "Admin",
    role: "super_admin",
    roleLabel: "Super Admin",
    department: "System Administration",
    phone: "+91 98765 00002",
    email: "admin@dpsnadergul.edu",
    joined: "Jan 2020",
    avatar_color: "#1b5e20",
    icon: "fa-user-cog",
    notifications: [
      { title: "System Health", text: "All systems operational", time: "30m ago", icon: "✅", color: "#5ca870" },
      { title: "New User Added", text: "CT8B class teacher account created", time: "2h ago", icon: "👤", color: "#1976d2" },
      { title: "Storage Usage", text: "localStorage usage at 45%", time: "1d ago", icon: "💾", color: "#f57c00" }
    ]
  },
  // ─── Generated Parent Users (Class 9-C) ───
  {
    id: 101,
    username: "P3160136A",
    password: "parent123",
    name: "Parent of PRANEETH BHUKYA",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of PRANEETH BHUKYA (Class 9-C)",
    phone: "+91 99999 01000",
    email: "parent3160136@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "PRANEETH BHUKYA",
    childId: "3160136",
    childClass: "9-C",
    childRoll: "01",
    notifications: []
  },
  {
    id: 102,
    username: "P3160417A",
    password: "parent123",
    name: "Parent of SATHWIK REDDY GANTA",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of SATHWIK REDDY GANTA (Class 9-C)",
    phone: "+91 99999 02000",
    email: "parent3160417@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "SATHWIK REDDY GANTA",
    childId: "3160417",
    childClass: "9-C",
    childRoll: "02",
    notifications: []
  },
  {
    id: 103,
    username: "P3160662A",
    password: "parent123",
    name: "Parent of KOTHA ASHVIK",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of KOTHA ASHVIK (Class 9-C)",
    phone: "+91 99999 03000",
    email: "parent3160662@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "KOTHA ASHVIK",
    childId: "3160662",
    childClass: "9-C",
    childRoll: "03",
    notifications: []
  },
  {
    id: 104,
    username: "P3170292A",
    password: "parent123",
    name: "Parent of BOPPARAJU ABHIRAM",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of BOPPARAJU ABHIRAM (Class 9-C)",
    phone: "+91 99999 04000",
    email: "parent3170292@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "BOPPARAJU ABHIRAM",
    childId: "3170292",
    childClass: "9-C",
    childRoll: "04",
    notifications: []
  },
  {
    id: 105,
    username: "P3170355A",
    password: "parent123",
    name: "Parent of BOYINI VIVEKANANDA MUDIRAJ",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of BOYINI VIVEKANANDA MUDIRAJ (Class 9-C)",
    phone: "+91 99999 05000",
    email: "parent3170355@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "BOYINI VIVEKANANDA MUDIRAJ",
    childId: "3170355",
    childClass: "9-C",
    childRoll: "05",
    notifications: []
  },
  {
    id: 106,
    username: "P3170390A",
    password: "parent123",
    name: "Parent of LOLLA ABHIRAM",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of LOLLA ABHIRAM (Class 9-C)",
    phone: "+91 99999 06000",
    email: "parent3170390@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "LOLLA ABHIRAM",
    childId: "3170390",
    childClass: "9-C",
    childRoll: "06",
    notifications: []
  },
  {
    id: 107,
    username: "P3180076A",
    password: "parent123",
    name: "Parent of KASULA ASHWATH",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of KASULA ASHWATH (Class 9-C)",
    phone: "+91 99999 07000",
    email: "parent3180076@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "KASULA ASHWATH",
    childId: "3180076",
    childClass: "9-C",
    childRoll: "07",
    notifications: []
  },
  {
    id: 108,
    username: "P3180133A",
    password: "parent123",
    name: "Parent of SNITHIK VENGALA",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of SNITHIK VENGALA (Class 9-C)",
    phone: "+91 99999 08000",
    email: "parent3180133@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "SNITHIK VENGALA",
    childId: "3180133",
    childClass: "9-C",
    childRoll: "08",
    notifications: []
  },
  {
    id: 109,
    username: "P3180183A",
    password: "parent123",
    name: "Parent of NIDHISH DUMALA",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of NIDHISH DUMALA (Class 9-C)",
    phone: "+91 99999 09000",
    email: "parent3180183@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "NIDHISH DUMALA",
    childId: "3180183",
    childClass: "9-C",
    childRoll: "09",
    notifications: []
  },
  {
    id: 110,
    username: "P3180184A",
    password: "parent123",
    name: "Parent of YAMMANURU HARITEJA",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of YAMMANURU HARITEJA (Class 9-C)",
    phone: "+91 99999 10000",
    email: "parent3180184@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "YAMMANURU HARITEJA",
    childId: "3180184",
    childClass: "9-C",
    childRoll: "10",
    notifications: []
  },
  {
    id: 111,
    username: "P3180286A",
    password: "parent123",
    name: "Parent of CHARAN BATTU",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of CHARAN BATTU (Class 9-C)",
    phone: "+91 99999 11000",
    email: "parent3180286@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "CHARAN BATTU",
    childId: "3180286",
    childClass: "9-C",
    childRoll: "11",
    notifications: []
  },
  {
    id: 112,
    username: "P3190472A",
    password: "parent123",
    name: "Parent of ATHUL M",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of ATHUL M (Class 9-C)",
    phone: "+91 99999 12000",
    email: "parent3190472@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "ATHUL M",
    childId: "3190472",
    childClass: "9-C",
    childRoll: "12",
    notifications: []
  },
  {
    id: 113,
    username: "P3200320A",
    password: "parent123",
    name: "Parent of SIDDHARTH REDDY SADIVILLA",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of SIDDHARTH REDDY SADIVILLA (Class 9-C)",
    phone: "+91 99999 13000",
    email: "parent3200320@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "SIDDHARTH REDDY SADIVILLA",
    childId: "3200320",
    childClass: "9-C",
    childRoll: "13",
    notifications: []
  },
  {
    id: 114,
    username: "P3200437A",
    password: "parent123",
    name: "Parent of SIDDALA RAMCHARAN",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of SIDDALA RAMCHARAN (Class 9-C)",
    phone: "+91 99999 14000",
    email: "parent3200437@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "SIDDALA RAMCHARAN",
    childId: "3200437",
    childClass: "9-C",
    childRoll: "14",
    notifications: []
  },
  {
    id: 115,
    username: "P3210447A",
    password: "parent123",
    name: "Parent of SAPAVATH JAHNAVI",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of SAPAVATH JAHNAVI (Class 9-C)",
    phone: "+91 99999 15000",
    email: "parent3210447@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "SAPAVATH JAHNAVI",
    childId: "3210447",
    childClass: "9-C",
    childRoll: "15",
    notifications: []
  },
  {
    id: 116,
    username: "P3210590A",
    password: "parent123",
    name: "Parent of K MOKSHA",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of K MOKSHA (Class 9-C)",
    phone: "+91 99999 16000",
    email: "parent3210590@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "K MOKSHA",
    childId: "3210590",
    childClass: "9-C",
    childRoll: "16",
    notifications: []
  },
  {
    id: 117,
    username: "P3230302A",
    password: "parent123",
    name: "Parent of BOJJA HARIKESH REDDY",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of BOJJA HARIKESH REDDY (Class 9-C)",
    phone: "+91 99999 17000",
    email: "parent3230302@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "BOJJA HARIKESH REDDY",
    childId: "3230302",
    childClass: "9-C",
    childRoll: "17",
    notifications: []
  },
  {
    id: 118,
    username: "P3230706A",
    password: "parent123",
    name: "Parent of EKADANTHA YADAV",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of EKADANTHA YADAV (Class 9-C)",
    phone: "+91 99999 18000",
    email: "parent3230706@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "EKADANTHA YADAV",
    childId: "3230706",
    childClass: "9-C",
    childRoll: "18",
    notifications: []
  },
  {
    id: 119,
    username: "P3240214A",
    password: "parent123",
    name: "Parent of NIMMAKAYALA PRATEEK REDDY",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of NIMMAKAYALA PRATEEK REDDY (Class 9-C)",
    phone: "+91 99999 19000",
    email: "parent3240214@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "NIMMAKAYALA PRATEEK REDDY",
    childId: "3240214",
    childClass: "9-C",
    childRoll: "19",
    notifications: []
  },
  {
    id: 120,
    username: "P3240504A",
    password: "parent123",
    name: "Parent of CHEEKOORI SAI CHARAN",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of CHEEKOORI SAI CHARAN (Class 9-C)",
    phone: "+91 99999 20000",
    email: "parent3240504@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "CHEEKOORI SAI CHARAN",
    childId: "3240504",
    childClass: "9-C",
    childRoll: "20",
    notifications: []
  },
  {
    id: 121,
    username: "P3240693A",
    password: "parent123",
    name: "Parent of VALLETI SAI HARSHITH",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of VALLETI SAI HARSHITH (Class 9-C)",
    phone: "+91 99999 21000",
    email: "parent3240693@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "VALLETI SAI HARSHITH",
    childId: "3240693",
    childClass: "9-C",
    childRoll: "21",
    notifications: []
  },
  {
    id: 122,
    username: "P3250112A",
    password: "parent123",
    name: "Parent of P SATHWIK REDDY",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of P SATHWIK REDDY (Class 9-C)",
    phone: "+91 99999 22000",
    email: "parent3250112@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "P SATHWIK REDDY",
    childId: "3250112",
    childClass: "9-C",
    childRoll: "22",
    notifications: []
  },
  {
    id: 123,
    username: "P3260066A",
    password: "parent123",
    name: "Parent of DEPA AARYAN REDDY",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of DEPA AARYAN REDDY (Class 9-C)",
    phone: "+91 99999 23000",
    email: "parent3260066@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "DEPA AARYAN REDDY",
    childId: "3260066",
    childClass: "9-C",
    childRoll: "23",
    notifications: []
  },
  {
    id: 124,
    username: "P3230719A",
    password: "parent123",
    name: "Parent of G MANASWINI",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of G MANASWINI (Class 9-C)",
    phone: "+91 99999 24000",
    email: "parent3230719@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "G MANASWINI",
    childId: "3230719",
    childClass: "9-C",
    childRoll: "24",
    notifications: []
  },
  {
    id: 125,
    username: "P3170068A",
    password: "parent123",
    name: "Parent of SHERI RITHIK REDDY",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of SHERI RITHIK REDDY (Class 9-C)",
    phone: "+91 99999 25000",
    email: "parent3170068@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "SHERI RITHIK REDDY",
    childId: "3170068",
    childClass: "9-C",
    childRoll: "25",
    notifications: []
  },
  {
    id: 126,
    username: "P3220915A",
    password: "parent123",
    name: "Parent of BHUKYA PRANAVI",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of BHUKYA PRANAVI (Class 9-C)",
    phone: "+91 99999 26000",
    email: "parent3220915@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "BHUKYA PRANAVI",
    childId: "3220915",
    childClass: "9-C",
    childRoll: "26",
    notifications: []
  },
  {
    id: 127,
    username: "P3190133A",
    password: "parent123",
    name: "Parent of TANABUDDI SRI BHAVESH REDDY",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of TANABUDDI SRI BHAVESH REDDY (Class 9-C)",
    phone: "+91 99999 27000",
    email: "parent3190133@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "TANABUDDI SRI BHAVESH REDDY",
    childId: "3190133",
    childClass: "9-C",
    childRoll: "27",
    notifications: []
  },
];

// ─── Hierarchical School Data ───────────────────────────────
window.SCHOOL_DATA = {
  classes: {
    "10": {
      "A": [
        { id: "10A01", admNo: "10A01", name: "Karan Johar", class: "10", section: "A", roll: "01", gender: "Male", dob: "05 Mar 2010", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Karan Johar" },
        { id: "10A02", admNo: "10A02", name: "Ananya Sharma", class: "10", section: "A", roll: "02", gender: "Female", dob: "12 Apr 2010", attendance: 98, behavior: "Excellent", fee_status: "Paid", gpa: 9.8, parent: "Parent of Ananya Sharma" },
        { id: "10A03", admNo: "10A03", name: "Rohan Das", class: "10", section: "A", roll: "03", gender: "Male", dob: "20 May 2010", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 9.6, parent: "Parent of Rohan Das" },
        { id: "10A04", admNo: "10A04", name: "Priya Patel", class: "10", section: "A", roll: "04", gender: "Female", dob: "15 Jun 2010", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Priya Patel" },
        { id: "10A05", admNo: "10A05", name: "Vikram Singh", class: "10", section: "A", roll: "05", gender: "Male", dob: "10 Jul 2010", attendance: 45, behavior: "Needs Improvement", fee_status: "Due", gpa: 6.2, parent: "Parent of Vikram Singh" }
      ],
      "B": [
        { id: "10B01", admNo: "10B01", name: "Amit Kumar", class: "10", section: "B", roll: "01", gender: "Male", dob: "05 Mar 2010", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Amit Kumar" },
        { id: "10B02", admNo: "10B02", name: "Suresh Raina", class: "10", section: "B", roll: "02", gender: "Male", dob: "12 Apr 2010", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Suresh Raina" },
        { id: "10B03", admNo: "10B03", name: "Meena Gupta", class: "10", section: "B", roll: "03", gender: "Female", dob: "20 May 2010", attendance: 88, behavior: "Excellent", fee_status: "Paid", gpa: 9.1, parent: "Parent of Meena Gupta" },
        { id: "10B04", admNo: "10B04", name: "Rajesh V", class: "10", section: "B", roll: "04", gender: "Male", dob: "15 Jun 2010", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Rajesh V" },
        { id: "10B05", admNo: "10B05", name: "Pooja Hegde", class: "10", section: "B", roll: "05", gender: "Female", dob: "10 Jul 2010", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Pooja Hegde" }
      ],
      "C": [
        { id: "10C01", admNo: "10C01", name: "Rahul G.", class: "10", section: "C", roll: "01", gender: "Male", dob: "10 Jan 2010", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Rahul G." },
        { id: "10C02", admNo: "10C02", name: "Sneha P.", class: "10", section: "C", roll: "02", gender: "Female", dob: "15 Feb 2010", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Sneha P." },
        { id: "10C03", admNo: "10C03", name: "Tariq Ali", class: "10", section: "C", roll: "03", gender: "Male", dob: "20 Mar 2010", attendance: 85, behavior: "Fair", fee_status: "Paid", gpa: 7.2, parent: "Parent of Tariq Ali" },
        { id: "10C04", admNo: "10C04", name: "Deepa K", class: "10", section: "C", roll: "04", gender: "Female", dob: "25 Apr 2010", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of Deepa K" },
        { id: "10C05", admNo: "10C05", name: "Manish R", class: "10", section: "C", roll: "05", gender: "Male", dob: "30 May 2010", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Manish R" }
      ],
      "D": [
        { id: "10D01", admNo: "10D01", name: "Simran K.", class: "10", section: "D", roll: "01", gender: "Female", dob: "05 Jun 2010", attendance: 90, behavior: "Excellent", fee_status: "Paid", gpa: 8.1, parent: "Parent of Simran K." },
        { id: "10D02", admNo: "10D02", name: "Varun D.", class: "10", section: "D", roll: "02", gender: "Male", dob: "12 Jul 2010", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of Varun D." },
        { id: "10D03", admNo: "10D03", name: "Kiara A.", class: "10", section: "D", roll: "03", gender: "Female", dob: "20 Aug 2010", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Kiara A." },
        { id: "10D04", admNo: "10D04", name: "Sid M.", class: "10", section: "D", roll: "04", gender: "Male", dob: "15 Sep 2010", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Sid M." },
        { id: "10D05", admNo: "10D05", name: "Alia B.", class: "10", section: "D", roll: "05", gender: "Female", dob: "10 Oct 2010", attendance: 95, behavior: "Excellent", fee_status: "Paid", gpa: 9.3, parent: "Parent of Alia B." }
      ]
    },
    "9": {
      "A": [
        { id: "9A01", admNo: "9A01", name: "Aryan K.", class: "9", section: "A", roll: "01", gender: "Male", dob: "05 Jan 2011", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of Aryan K." },
        { id: "9A02", admNo: "9A02", name: "Suhana S.", class: "9", section: "A", roll: "02", gender: "Female", dob: "12 Feb 2011", attendance: 93, behavior: "Excellent", fee_status: "Paid", gpa: 9.1, parent: "Parent of Suhana S." },
        { id: "9A03", admNo: "9A03", name: "Shanaya K.", class: "9", section: "A", roll: "03", gender: "Female", dob: "20 Mar 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Shanaya K." },
        { id: "9A04", admNo: "9A04", name: "Abram K.", class: "9", section: "A", roll: "04", gender: "Male", dob: "15 Apr 2011", attendance: 85, behavior: "Fair", fee_status: "Paid", gpa: 7.9, parent: "Parent of Abram K." },
        { id: "9A05", admNo: "9A05", name: "Taimur P.", class: "9", section: "A", roll: "05", gender: "Male", dob: "10 May 2011", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Taimur P." }
      ],
      "B": [
        { id: "9B01", admNo: "9B01", name: "Ibrahim A.", class: "9", section: "B", roll: "01", gender: "Male", dob: "05 Jun 2011", attendance: 81, behavior: "Fair", fee_status: "Paid", gpa: 7.1, parent: "Parent of Ibrahim A." },
        { id: "9B02", admNo: "9B02", name: "Sara A.", class: "9", section: "B", roll: "02", gender: "Female", dob: "12 Jul 2011", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of Sara A." },
        { id: "9B03", admNo: "9B03", name: "Janhvi K.", class: "9", section: "B", roll: "03", gender: "Female", dob: "20 Aug 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Janhvi K." },
        { id: "9B04", admNo: "9B04", name: "Khushi K.", class: "9", section: "B", roll: "04", gender: "Female", dob: "15 Sep 2011", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Khushi K." },
        { id: "9B05", admNo: "9B05", name: "Ishaan K.", class: "9", section: "B", roll: "05", gender: "Male", dob: "10 Oct 2011", attendance: 95, behavior: "Excellent", fee_status: "Paid", gpa: 9.3, parent: "Parent of Ishaan K." }
      ],
      "C": [
        { id: "3160136", admNo: "3160136", name: "PRANEETH BHUKYA", class: "9", section: "C", roll: "01", gender: "Male", dob: "15 Jan 2011", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of PRANEETH BHUKYA" },
        { id: "3160417", admNo: "3160417", name: "SATHWIK REDDY GANTA", class: "9", section: "C", roll: "02", gender: "Male", dob: "22 Feb 2011", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of SATHWIK REDDY GANTA" },
        { id: "3160662", admNo: "3160662", name: "KOTHA ASHVIK", class: "9", section: "C", roll: "03", gender: "Male", dob: "10 Mar 2011", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of KOTHA ASHVIK" },
        { id: "3170292", admNo: "3170292", name: "BOPPARAJU ABHIRAM", class: "9", section: "C", roll: "04", gender: "Male", dob: "05 Apr 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of BOPPARAJU ABHIRAM" },
        { id: "3170355", admNo: "3170355", name: "BOYINI VIVEKANANDA MUDIRAJ", class: "9", section: "C", roll: "05", gender: "Male", dob: "12 May 2011", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of BOYINI VIVEKANANDA MUDIRAJ" },
        { id: "3170390", admNo: "3170390", name: "LOLLA ABHIRAM", class: "9", section: "C", roll: "06", gender: "Male", dob: "20 Jun 2011", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of LOLLA ABHIRAM" },
        { id: "3180076", admNo: "3180076", name: "KASULA ASHWATH", class: "9", section: "C", roll: "07", gender: "Male", dob: "12 Apr 2009", attendance: 94, behavior: "Excellent", fee_status: "Paid", gpa: 8.7, parent: "Parent of KASULA ASHWATH" },
        { id: "3180133", admNo: "3180133", name: "SNITHIK VENGALA", class: "9", section: "C", roll: "08", gender: "Male", dob: "30 Jul 2011", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of SNITHIK VENGALA" },
        { id: "3180183", admNo: "3180183", name: "NIDHISH DUMALA", class: "9", section: "C", roll: "09", gender: "Male", dob: "15 Aug 2011", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of NIDHISH DUMALA" },
        { id: "3180184", admNo: "3180184", name: "YAMMANURU HARITEJA", class: "9", section: "C", roll: "10", gender: "Male", dob: "25 Sep 2011", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of YAMMANURU HARITEJA" },
        { id: "3180286", admNo: "3180286", name: "CHARAN BATTU", class: "9", section: "C", roll: "11", gender: "Male", dob: "05 Oct 2011", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of CHARAN BATTU" },
        { id: "3190472", admNo: "3190472", name: "ATHUL M", class: "9", section: "C", roll: "12", gender: "Male", dob: "18 Nov 2011", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 8.6, parent: "Parent of ATHUL M" },
        { id: "3200320", admNo: "3200320", name: "SIDDHARTH REDDY SADIVILLA", class: "9", section: "C", roll: "13", gender: "Male", dob: "22 Dec 2011", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 8.7, parent: "Parent of SIDDHARTH REDDY SADIVILLA" },
        { id: "3200437", admNo: "3200437", name: "SIDDALA RAMCHARAN", class: "9", section: "C", roll: "14", gender: "Male", dob: "08 Jan 2012", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of SIDDALA RAMCHARAN" },
        { id: "3210447", admNo: "3210447", name: "SAPAVATH JAHNAVI", class: "9", section: "C", roll: "15", gender: "Female", dob: "14 Feb 2012", attendance: 99, behavior: "Excellent", fee_status: "Paid", gpa: 9.2, parent: "Parent of SAPAVATH JAHNAVI" },
        { id: "3210590", admNo: "3210590", name: "K MOKSHA", class: "9", section: "C", roll: "16", gender: "Female", dob: "20 Mar 2012", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of K MOKSHA" },
        { id: "3230302", admNo: "3230302", name: "BOJJA HARIKESH REDDY", class: "9", section: "C", roll: "17", gender: "Male", dob: "11 Apr 2012", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of BOJJA HARIKESH REDDY" },
        { id: "3230706", admNo: "3230706", name: "EKADANTHA YADAV", class: "9", section: "C", roll: "18", gender: "Male", dob: "22 May 2012", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of EKADANTHA YADAV" },
        { id: "3240214", admNo: "3240214", name: "NIMMAKAYALA PRATEEK REDDY", class: "9", section: "C", roll: "19", gender: "Male", dob: "30 Jun 2012", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 9.3, parent: "Parent of NIMMAKAYALA PRATEEK REDDY" },
        { id: "3240504", admNo: "3240504", name: "CHEEKOORI SAI CHARAN", class: "9", section: "C", roll: "20", gender: "Male", dob: "15 Jul 2012", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 9.4, parent: "Parent of CHEEKOORI SAI CHARAN" },
        { id: "3240693", admNo: "3240693", name: "VALLETI SAI HARSHITH", class: "9", section: "C", roll: "21", gender: "Male", dob: "20 Aug 2012", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of VALLETI SAI HARSHITH" },
        { id: "3250112", admNo: "3250112", name: "P SATHWIK REDDY", class: "9", section: "C", roll: "22", gender: "Male", dob: "05 Sep 2012", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of P SATHWIK REDDY" },
        { id: "3260066", admNo: "3260066", name: "DEPA AARYAN REDDY (NA)", class: "9", section: "C", roll: "23", gender: "Male", dob: "12 Oct 2012", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of DEPA AARYAN REDDY (NA)" },
        { id: "3230719", admNo: "3230719", name: "G MANASWINI", class: "9", section: "C", roll: "24", gender: "Female", dob: "22 Nov 2012", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of G MANASWINI" },
        { id: "3170068", admNo: "3170068", name: "SHERI RITHIK REDDY", class: "9", section: "C", roll: "25", gender: "Male", dob: "30 Dec 2012", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of SHERI RITHIK REDDY" },
        { id: "3220915", admNo: "3220915", name: "BHUKYA PRANAVI", class: "9", section: "C", roll: "26", gender: "Female", dob: "14 Jan 2013", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of BHUKYA PRANAVI" },
        { id: "3190133", admNo: "3190133", name: "TANABUDDI SRI BHAVESH REDDY", class: "9", section: "C", roll: "27", gender: "Male", dob: "22 Feb 2013", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of TANABUDDI SRI BHAVESH REDDY" }
      ],
      "D": [
        { id: "9D01", admNo: "9D01", name: "Vikram R.", class: "9", section: "D", roll: "01", gender: "Male", dob: "05 Jun 2011", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Vikram R." },
        { id: "9D02", admNo: "9D02", name: "Nisha R.", class: "9", section: "D", roll: "02", gender: "Female", dob: "12 Jul 2011", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of Nisha R." },
        { id: "9D03", admNo: "9D03", name: "Aditya S.", class: "9", section: "D", roll: "03", gender: "Male", dob: "20 Aug 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Aditya S." },
        { id: "9D04", admNo: "9D04", name: "Riya S.", class: "9", section: "D", roll: "04", gender: "Female", dob: "15 Sep 2011", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Riya S." },
        { id: "9D05", admNo: "9D05", name: "Kabir S.", class: "9", section: "D", roll: "05", gender: "Male", dob: "10 Oct 2011", attendance: 95, behavior: "Excellent", fee_status: "Paid", gpa: 9.3, parent: "Parent of Kabir S." }
      ]
    },
    "8": {
      "A": [
        { id: "8A01", admNo: "8A01", name: "Akash Mehra", class: "8", section: "A", roll: "01", gender: "Male", dob: "05 Mar 2012", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Akash Mehra" },
        { id: "8A02", admNo: "8A02", name: "Mehul K.", class: "8", section: "A", roll: "02", gender: "Male", dob: "12 Apr 2012", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Mehul K." },
        { id: "8A03", admNo: "8A03", name: "Tanvi S.", class: "8", section: "A", roll: "03", gender: "Female", dob: "20 May 2012", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Tanvi S." },
        { id: "8A04", admNo: "8A04", name: "Yash R.", class: "8", section: "A", roll: "04", gender: "Male", dob: "15 Jun 2012", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Yash R." },
        { id: "8A05", admNo: "8A05", name: "Kriti S.", class: "8", section: "A", roll: "05", gender: "Female", dob: "10 Jul 2012", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Kriti S." }
      ],
      "B": [
        { id: "8B01", admNo: "8B01", name: "Rahul G.", class: "8", section: "B", roll: "01", gender: "Male", dob: "10 Jan 2012", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Rahul G." },
        { id: "8B02", admNo: "8B02", name: "Sneha P.", class: "8", section: "B", roll: "02", gender: "Female", dob: "15 Feb 2012", attendance: 94, behavior: "Excellent", fee_status: "Paid", gpa: 9.1, parent: "Parent of Sneha P." },
        { id: "8B03", admNo: "8B03", name: "Aman K.", class: "8", section: "B", roll: "03", gender: "Male", dob: "20 Mar 2012", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Aman K." },
        { id: "8B04", admNo: "8B04", name: "Juhi C.", class: "8", section: "B", roll: "04", gender: "Female", dob: "25 Apr 2012", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of Juhi C." },
        { id: "8B05", admNo: "8B05", name: "Nitin R.", class: "8", section: "B", roll: "05", gender: "Male", dob: "30 May 2012", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Nitin R." }
      ],
      "C": [
        { id: "8C01", admNo: "8C01", name: "Deepika V.", class: "8", section: "C", roll: "01", gender: "Female", dob: "05 Jun 2012", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of Deepika V." },
        { id: "8C02", admNo: "8C02", name: "Varun K.", class: "8", section: "C", roll: "02", gender: "Male", dob: "12 Jul 2012", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Varun K." },
        { id: "8C03", admNo: "8C03", name: "Kiara S.", class: "8", section: "C", roll: "03", gender: "Female", dob: "20 Aug 2012", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Kiara S." },
        { id: "8C04", admNo: "8C04", name: "Sid G.", class: "8", section: "C", roll: "04", gender: "Male", dob: "15 Sep 2012", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Sid G." },
        { id: "8C05", admNo: "8C05", name: "Alia K.", class: "8", section: "C", roll: "05", gender: "Female", dob: "10 Oct 2012", attendance: 95, behavior: "Excellent", fee_status: "Paid", gpa: 9.3, parent: "Parent of Alia K." }
      ],
      "D": [
        { id: "8D01", admNo: "8D01", name: "Kunal J.", class: "8", section: "D", roll: "01", gender: "Male", dob: "05 Jun 2012", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Kunal J." },
        { id: "8D02", admNo: "8D02", name: "Mahesh B.", class: "8", section: "D", roll: "02", gender: "Male", dob: "12 Jul 2012", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Mahesh B." },
        { id: "8D03", admNo: "8D03", name: "Nina K.", class: "8", section: "D", roll: "03", gender: "Female", dob: "20 Aug 2012", attendance: 92, behavior: "Excellent", fee_status: "Paid", gpa: 8.8, parent: "Parent of Nina K." },
        { id: "8D04", admNo: "8D04", name: "Om P.", class: "8", section: "D", roll: "04", gender: "Male", dob: "15 Sep 2012", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Om P." },
        { id: "8D05", admNo: "8D05", name: "Pooja D.", class: "8", section: "D", roll: "05", gender: "Female", dob: "10 Oct 2012", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Pooja D." }
      ]
    },
    "7": {
      "A": [
        { id: "7A01", admNo: "7A01", name: "Kavya Iyer", class: "7", section: "A", roll: "01", gender: "Female", dob: "05 Jan 2013", attendance: 96, behavior: "Excellent", fee_status: "Paid", gpa: 9.1, parent: "Parent of Kavya Iyer" },
        { id: "7A02", admNo: "7A02", name: "Ishaan S.", class: "7", section: "A", roll: "02", gender: "Male", dob: "12 Feb 2013", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Ishaan S." },
        { id: "7A03", admNo: "7A03", name: "Shanaya S.", class: "7", section: "A", roll: "03", gender: "Female", dob: "20 Mar 2013", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Shanaya S." },
        { id: "7A04", admNo: "7A04", name: "Abram S.", class: "7", section: "A", roll: "04", gender: "Male", dob: "15 Apr 2013", attendance: 85, behavior: "Fair", fee_status: "Paid", gpa: 7.9, parent: "Parent of Abram S." },
        { id: "7A05", admNo: "7A05", name: "Taimur S.", class: "7", section: "A", roll: "05", gender: "Male", dob: "10 May 2013", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Taimur S." }
      ],
      "B": [
        { id: "7B01", admNo: "7B01", name: "Arjun M.", class: "7", section: "B", roll: "01", gender: "Male", dob: "05 Jun 2013", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Arjun M." },
        { id: "7B02", admNo: "7B02", name: "Tara B.", class: "7", section: "B", roll: "02", gender: "Female", dob: "12 Jul 2013", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of Tara B." },
        { id: "7B03", admNo: "7B03", name: "Kabir B.", class: "7", section: "B", roll: "03", gender: "Male", dob: "20 Aug 2013", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Kabir B." },
        { id: "7B04", admNo: "7B04", name: "Riya B.", class: "7", section: "B", roll: "04", gender: "Female", dob: "15 Sep 2013", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Riya B." },
        { id: "7B05", admNo: "7B05", name: "Aryan B.", class: "7", section: "B", roll: "05", gender: "Male", dob: "10 Oct 2013", attendance: 95, behavior: "Excellent", fee_status: "Paid", gpa: 9.3, parent: "Parent of Aryan B." }
      ],
      "C": [
        { id: "7C01", admNo: "7C01", name: "Deepak R.", class: "7", section: "C", roll: "01", gender: "Male", dob: "05 Jan 2013", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Deepak R." },
        { id: "7C02", admNo: "7C02", name: "Meera K.", class: "7", section: "C", roll: "02", gender: "Female", dob: "12 Feb 2013", attendance: 92, behavior: "Excellent", fee_status: "Paid", gpa: 8.8, parent: "Parent of Meera K." },
        { id: "7C03", admNo: "7C03", name: "Nitin B.", class: "7", section: "C", roll: "03", gender: "Male", dob: "20 Mar 2013", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Nitin B." },
        { id: "7C04", admNo: "7C04", name: "Ojas S.", class: "7", section: "C", roll: "04", gender: "Male", dob: "15 Apr 2013", attendance: 80, behavior: "Fair", fee_status: "Paid", gpa: 6.8, parent: "Parent of Ojas S." },
        { id: "7C05", admNo: "7C05", name: "Priti G.", class: "7", section: "C", roll: "05", gender: "Female", dob: "10 May 2013", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Priti G." }
      ],
      "D": [
        { id: "7D01", admNo: "7D01", name: "Quasim A.", class: "7", section: "D", roll: "01", gender: "Male", dob: "05 Jun 2013", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Quasim A." },
        { id: "7D02", admNo: "7D02", name: "Rashi P.", class: "7", section: "D", roll: "02", gender: "Female", dob: "12 Jul 2013", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Rashi P." },
        { id: "7D03", admNo: "7D03", name: "Sohal K.", class: "7", section: "D", roll: "03", gender: "Male", dob: "20 Aug 2013", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Sohal K." },
        { id: "7D04", admNo: "7D04", name: "Tanya M.", class: "7", section: "D", roll: "04", gender: "Female", dob: "15 Sep 2013", attendance: 89, behavior: "Excellent", fee_status: "Paid", gpa: 8.2, parent: "Parent of Tanya M." },
        { id: "7D05", admNo: "7D05", name: "Uma R.", class: "7", section: "D", roll: "05", gender: "Female", dob: "10 Oct 2013", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Uma R." }
      ]
    },
    "6": {
      "A": [
        { id: "6A01", admNo: "6A01", name: "Ravi K.", class: "6", section: "A", roll: "01", gender: "Male", dob: "05 Jan 2014", attendance: 92, behavior: "Excellent", fee_status: "Paid", gpa: 8.5, parent: "Parent of Ravi K." },
        { id: "6A02", admNo: "6A02", name: "Mehul S.", class: "6", section: "A", roll: "02", gender: "Male", dob: "12 Feb 2014", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Mehul S." },
        { id: "6A03", admNo: "6A03", name: "Tanvi K.", class: "6", section: "A", roll: "03", gender: "Female", dob: "20 Mar 2014", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Tanvi K." },
        { id: "6A04", admNo: "6A04", name: "Yash S.", class: "6", section: "A", roll: "04", gender: "Male", dob: "15 Apr 2014", attendance: 85, behavior: "Fair", fee_status: "Paid", gpa: 7.5, parent: "Parent of Yash S." },
        { id: "6A05", admNo: "6A05", name: "Kriti K.", class: "6", section: "A", roll: "05", gender: "Female", dob: "10 May 2014", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Kriti K." }
      ],
      "B": [
        { id: "6B01", admNo: "6B01", name: "Tanya S.", class: "6", section: "B", roll: "01", gender: "Female", dob: "05 Jun 2014", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Tanya S." },
        { id: "6B02", admNo: "6B02", name: "Ishaan R.", class: "6", section: "B", roll: "02", gender: "Male", dob: "12 Jul 2014", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Ishaan R." },
        { id: "6B03", admNo: "6B03", name: "Sara R.", class: "6", section: "B", roll: "03", gender: "Female", dob: "20 Aug 2014", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Sara R." },
        { id: "6B04", admNo: "6B04", name: "Kabir R.", class: "6", section: "B", roll: "04", gender: "Male", dob: "15 Sep 2014", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Kabir R." },
        { id: "6B05", admNo: "6B05", name: "Riya R.", class: "6", section: "B", roll: "05", gender: "Female", dob: "10 Oct 2014", attendance: 95, behavior: "Excellent", fee_status: "Paid", gpa: 9.3, parent: "Parent of Riya R." }
      ],
      "C": [
        { id: "6C01", admNo: "6C01", name: "Vinay K.", class: "6", section: "C", roll: "01", gender: "Male", dob: "05 Jan 2014", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of Vinay K." },
        { id: "6C02", admNo: "6C02", name: "Wafa S.", class: "6", section: "C", roll: "02", gender: "Female", dob: "12 Feb 2014", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Wafa S." },
        { id: "6C03", admNo: "6C03", name: "Xavier P.", class: "6", section: "C", roll: "03", gender: "Male", dob: "20 Mar 2014", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Xavier P." },
        { id: "6C04", admNo: "6C04", name: "Yutika D.", class: "6", section: "C", roll: "04", gender: "Female", dob: "15 Apr 2014", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Yutika D." },
        { id: "6C05", admNo: "6C05", name: "Zeba Q.", class: "6", section: "C", roll: "05", gender: "Female", dob: "10 May 2014", attendance: 94, behavior: "Excellent", fee_status: "Paid", gpa: 9.2, parent: "Parent of Zeba Q." }
      ],
      "D": [
        { id: "6D01", admNo: "6D01", name: "Aman V.", class: "6", section: "D", roll: "01", gender: "Male", dob: "05 Jun 2014", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Aman V." },
        { id: "6D02", admNo: "6D02", name: "Brijesh G.", class: "6", section: "D", roll: "02", gender: "Male", dob: "12 Jul 2014", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Brijesh G." },
        { id: "6D03", admNo: "6D03", name: "Chitra S.", class: "6", section: "D", roll: "03", gender: "Female", dob: "20 Aug 2014", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Chitra S." },
        { id: "6D04", admNo: "6D04", name: "Dinesh K.", class: "6", section: "D", roll: "04", gender: "Male", dob: "15 Sep 2014", attendance: 85, behavior: "Fair", fee_status: "Paid", gpa: 6.9, parent: "Parent of Dinesh K." },
        { id: "6D05", admNo: "6D05", name: "Esha P.", class: "6", section: "D", roll: "05", gender: "Female", dob: "10 Oct 2014", attendance: 95, behavior: "Excellent", fee_status: "Paid", gpa: 9.3, parent: "Parent of Esha P." }
      ]
    }
  }
};

// ─── Programmatic Expansion to A-K Sections ─────────────────
// Sections A-D for each class are explicitly named above.
// Sections E-K are generated with realistic Indian placeholder names (not "Student X-1" labels).
// Names are deterministic — they do not change on refresh.
(function expandSchoolStructure() {
  const grades = ["6","7","8","9","10"];
  const sections = ["A","B","C","D","E","F","G","H","I","J","K"];
  // 30 first names × 20 last names = 600 unique combinations for generated sections
  const GEN_F = ['Aryan','Priya','Rahul','Sneha','Amit','Kavya','Rohan','Ananya','Vikram','Pooja',
    'Kiran','Divya','Suresh','Meena','Aditya','Swati','Rajesh','Nisha','Deepak','Sunita',
    'Harish','Sonal','Ganesh','Uma','Prakash','Rekha','Krishna','Gita','Ravi','Lakshmi'];
  const GEN_L = ['Kumar','Sharma','Reddy','Singh','Patel','Gupta','Rao','Nair','Iyer','Verma',
    'Mehta','Shah','Das','Pillai','Naidu','Goud','Chauhan','Tiwari','Mishra','Pandey'];

  grades.forEach((g, gi) => {
    if (!window.SCHOOL_DATA.classes[g]) window.SCHOOL_DATA.classes[g] = {};
    sections.forEach((sec, si) => {
      if (!window.SCHOOL_DATA.classes[g][sec] || window.SCHOOL_DATA.classes[g][sec].length < 2) {
        window.SCHOOL_DATA.classes[g][sec] = Array.from({ length: 5 }, (_, i) => {
          const ni = gi * 55 + si * 5 + i; // unique deterministic index per student
          const firstName = GEN_F[ni % GEN_F.length];
          const lastName  = GEN_L[(ni * 7 + 3) % GEN_L.length];
          const fullName  = firstName + ' ' + lastName;
          const id = `${g}${sec}${String(i + 1).padStart(2, '0')}`;
          return {
            id, admNo: id,
            name: fullName,
            class: g, section: sec,
            roll: String(i + 1).padStart(2, '0'),
            gender: i % 2 === 0 ? 'Male' : 'Female',
            dob: '01 Jan 201' + (15 - parseInt(g)),
            attendance: 78 + (ni * 13) % 18,   // deterministic range 78-95
            behavior: 'Good',
            fee_status: 'Paid',
            gpa: ((70 + (ni * 7 + 11) % 26) / 10).toFixed(1), // deterministic range 7.0-9.5
            parent: 'Parent of ' + fullName
          };
        });
      }
    });
  });

  // Expand CLASS_PERFORMANCE matrix — toppers derived from actual student data
  if (window.CLASS_PERFORMANCE) {
    const CP_TEACHERS = ['Prasana Reddy','Ramesh Sharma','Anita Pillai','Mohan Das','Sunita Verma',
      'Venkat Iyer','Pooja Mehta','Suresh Naidu','Aruna Krishnan','Deepa Rani','Prasana Reddy'];
    grades.forEach((g, gi) => {
      sections.forEach((sec, si) => {
        const clsKey = `${g}-${sec}`;
        if (!window.CLASS_PERFORMANCE.find(c => c.class === clsKey)) {
          const ni = gi * 11 + si;
          const secStudents = window.SCHOOL_DATA.classes[g] && window.SCHOOL_DATA.classes[g][sec];
          const topper = secStudents
            ? secStudents.reduce((a, b) => (+a.gpa >= +b.gpa ? a : b)).name
            : 'Unknown';
          window.CLASS_PERFORMANCE.push({
            class: clsKey,
            teacher: CP_TEACHERS[si % CP_TEACHERS.length],
            avgAtt: 78 + (ni * 13) % 17,
            avgGPA: ((75 + (ni * 7 + 11) % 20) / 10).toFixed(1),
            topper,
            weak: (ni * 3) % 5,
            issues: (ni * 5) % 3
          });
        }
      });
    });
  }
})();


// Derived flat array for compatibility
let STUDENTS = Object.values(window.SCHOOL_DATA.classes).flatMap(cls => 
  Object.values(cls).flatMap(sec => sec)
);
STUDENTS.forEach(s => { 
  if (!s.class.includes('-')) s.class = s.class + '-' + s.section; 
});

// ─── Teachers ────────────────────────────────────────────────
window.TEACHERS = [
  { id: "T001", name: "Prasana Reddy",  subject: "Mathematics",       classes: "10-A, 9-C",     exp: "8 years",  phone: "+91 87654 11111", status: "Active",   email: "prasana@dpsnadergul.edu",  avatar_color: "#5ca870" },
  { id: "T002", name: "Ramesh Sharma",  subject: "Physics",           classes: "10-A, 10-B",    exp: "12 years", phone: "+91 87654 22222", status: "Active",   email: "ramesh@dpsnadergul.edu",   avatar_color: "#1976d2" },
  { id: "T003", name: "Anita Pillai",   subject: "English Literature", classes: "8-B, 9-A",      exp: "6 years",  phone: "+91 87654 33333", status: "On Leave", email: "anita@dpsnadergul.edu",    avatar_color: "#8b5cf6" },
  { id: "T004", name: "Mohan Das",      subject: "Chemistry",         classes: "10-C, 9-D",     exp: "15 years", phone: "+91 87654 44444", status: "Active",   email: "mohan@dpsnadergul.edu",    avatar_color: "#f57c00" },
  { id: "T005", name: "Sunita Verma",   subject: "History",           classes: "7-A, 6-B",      exp: "9 years",  phone: "+91 87654 55555", status: "Active",   email: "sunita@dpsnadergul.edu",   avatar_color: "#00bcd4" },
  { id: "T006", name: "Venkat Iyer",    subject: "Computer Science",  classes: "8-A, 9-C",      exp: "5 years",  phone: "+91 87654 66666", status: "Active",   email: "venkat@dpsnadergul.edu",   avatar_color: "#e53935" },
  { id: "T007", name: "Pooja Mehta",    subject: "Biology",           classes: "9-B, 8-C",      exp: "7 years",  phone: "+91 87654 77777", status: "Active",   email: "pooja@dpsnadergul.edu",    avatar_color: "#4caf50" },
  { id: "T008", name: "Suresh Naidu",   subject: "Physical Education", classes: "All Classes",   exp: "11 years", phone: "+91 87654 88888", status: "Active",   email: "suresh@dpsnadergul.edu",   avatar_color: "#ff5722" },
  { id: "T009", name: "Aruna Krishnan", subject: "Social Studies",    classes: "10-D, 7-B",     exp: "10 years", phone: "+91 87654 99999", status: "Active",   email: "aruna@dpsnadergul.edu",    avatar_color: "#9c27b0" },
  { id: "T010", name: "Deepa Rani",     subject: "Telugu Language",   classes: "6-A, 7-C",      exp: "14 years", phone: "+91 87654 10000", status: "Active",   email: "deepa@dpsnadergul.edu",    avatar_color: "#607d8b" },
];


// ─── Class Schedule ──────────────────────────────────────────
const SCHEDULE = [
  { time: "8:00 – 8:45", subject: "Mathematics", class: "10-A", teacher: "Prasana Reddy", room: "Room 101", color: "#5ca870" },
  { time: "8:50 – 9:35", subject: "Physics", class: "10-A", teacher: "Ramesh Sharma", room: "Physics Lab", color: "#1976d2" },
  { time: "9:40 – 10:25", subject: "English Literature", class: "8-B", teacher: "Anita Pillai", room: "Room 204", color: "#8b5cf6" },
  { time: "10:30 – 10:45", subject: "☕ Break", class: "—", teacher: "—", room: "—", color: "#999" },
  { time: "10:45 – 11:30", subject: "Chemistry", class: "10-C", teacher: "Mohan Das", room: "Chem Lab", color: "#f57c00" },
  { time: "11:35 – 12:20", subject: "History", class: "7-A", teacher: "Sunita Verma", room: "Room 305", color: "#e53935" },
  { time: "12:25 – 13:10", subject: "🍱 Lunch Break", class: "—", teacher: "—", room: "Cafeteria", color: "#999" },
  { time: "13:15 – 14:00", subject: "Computer Science", class: "9-C", teacher: "Venkat Iyer", room: "Comp Lab", color: "#00bcd4" },
  { time: "14:05 – 14:50", subject: "Biology", class: "8-E", teacher: "Pooja Mehta", room: "Bio Lab", color: "#4caf50" },
  { time: "14:55 – 15:40", subject: "Physical Education", class: "All", teacher: "Suresh Naidu", room: "Ground", color: "#ff5722" },
];

const WEEKLY_SCHEDULE = {
  "9:00 AM": { Mon: "Math", Tue: "English", Wed: "Science", Thu: "Math", Fri: "Social" },
  "10:00 AM": { Mon: "Physics", Tue: "Chemistry", Wed: "Math", Thu: "Science", Fri: "Social" },
  "11:00 AM": { Mon: "Sanskrit", Tue: "Tamil/Telugu", Wed: "Hindi", Thu: "English", Fri: "Library" },
  "12:00 PM": { Mon: "LUNCH", Tue: "LUNCH", Wed: "LUNCH", Thu: "LUNCH", Fri: "LUNCH" },
  "01:00 PM": { Mon: "Lab", Tue: "Yoga", Wed: "Arts", Thu: "Music", Fri: "Civics" },
  "02:00 PM": { Mon: "Geog", Tue: "Biology", Wed: "Comp Sci", Thu: "Games", Fri: "Values" }
};

const ANNOUNCEMENTS = [
  { 
    id: 1, 
    title: "Annual Sports Day – April 12, 2026", 
    title_te: "వార్షిక క్రీడా దినోత్సవం – ఏప్రిల్ 12, 2026",
    title_hi: "वार्षिक खेल दिवस – 12 अप्रैल, 2026",
    date: "28 Mar 2026", author: "Vice Principal", category: "Events", priority: "high" 
  },
  { 
    id: 2, 
    title: "Mid-Term Examination Schedule Released", 
    title_te: "మిడ్-టర్మ్ పరీక్షల షెడ్యూల్ విడుదలయ్యింది",
    title_hi: "मिड-टर्म परीक्षा कार्यक्रम जारी",
    date: "26 Mar 2026", author: "Coordinator", category: "Academic", priority: "high" 
  },
  { 
    id: 3, 
    title: "Parent-Teacher Meeting – April 5", 
    title_te: "తల్లిదండ్రుల-ఉపాధ్యాయుల సమావేశం – ఏప్రిల్ 5",
    title_hi: "अभिभावक-शिक्षक बैठक – 5 अप्रैल",
    date: "24 Mar 2026", author: "Vice Principal", category: "Meeting", priority: "medium" 
  },
  { 
    id: 4, 
    title: "Fee Payment Deadline – March 31", 
    title_te: "ఫీజు చెల్లింపు గడువు – మార్చి 31",
    title_hi: "फीस भुगतान की समय सीमा – 31 मार्च",
    date: "22 Mar 2026", author: "Accounts Dept", category: "Finance", priority: "high" 
  },
  { 
    id: 5, 
    title: "Library Hours Extended for Board Students", 
    title_te: "బోర్డు విద్యార్థుల కోసం లైబ్రరీ పని వేళలు పొడిగించబడ్డాయి",
    title_hi: "बोर्ड के छात्रों के लिए लाइब्रेरी का समय बढ़ाया गया",
    date: "20 Mar 2026", author: "Librarian", category: "Academic", priority: "low" 
  },
  { 
    id: 6, 
    title: "School Closed on April 14 (Ambedkar Jayanti)", 
    title_te: "ఏప్రిల్ 14న పాఠశాల సెలవు (అంబేద్కర్ జయంతి)",
    title_hi: "14 अप्रैल को स्कूल बंद (अम्बेडकर जयंती)",
    date: "19 Mar 2026", author: "Admin", category: "Holiday", priority: "low" 
  },
  { 
    id: 7, 
    title: "Science Exhibition Registration Open", 
    title_te: "సైన్స్ ఎగ్జిబిషన్ రిజిస్ట్రేషన్ ప్రారంభం",
    title_hi: "विज्ञान प्रदर्शनी पंजीकरण खुला",
    date: "18 Mar 2026", author: "Coordinator", category: "CCA", priority: "medium" 
  },
];

// ─── Homework / Assignments ──────────────────────────────────
const HOMEWORK = [
  { id: 1, title: "Quadratic Equations – Practice Set A", subject: "Mathematics", class: "10-A", teacher: "Prasana Reddy", due: "31 Mar 2026", submitted: 28, total: 35, status: "Active" },
  { id: 2, title: "Newton's Laws – Lab Report", subject: "Physics", class: "10-A", teacher: "Ramesh Sharma", due: "2 Apr 2026", submitted: 20, total: 35, status: "Active" },
  { id: 3, title: "The Tempest – Character Analysis Essay", subject: "English", class: "8-B", teacher: "Anita Pillai", due: "5 Apr 2026", submitted: 18, total: 32, status: "Active" },
  { id: 4, title: "Periodic Table Quiz", subject: "Chemistry", class: "10-C", teacher: "Mohan Das", due: "28 Mar 2026", submitted: 33, total: 33, status: "Completed" },
  { id: 5, title: "World War II Summary", subject: "History", class: "7-A", teacher: "Sunita Verma", due: "7 Apr 2026", submitted: 5, total: 28, status: "Active" },
  { id: 6, title: "Python Basics – Program Set 1", subject: "Comp. Sci", class: "9-C", teacher: "Venkat Iyer", due: "10 Apr 2026", submitted: 0, total: 32, status: "Active" },
];

// ─── Exam Results / Marks ────────────────────────────────────
const MARKS = [
  { subject: "Mathematics", marks: 87, max: 100, grade: "A" },
  { subject: "Physics", marks: 79, max: 100, grade: "B+" },
  { subject: "English", marks: 92, max: 100, grade: "A+" },
  { subject: "Chemistry", marks: 74, max: 100, grade: "B" },
  { subject: "History", marks: 83, max: 100, grade: "A-" },
  { subject: "Computer Science", marks: 96, max: 100, grade: "A+" },
  { subject: "Physical Education", marks: 90, max: 100, grade: "A+" },
];

// ─── Fee Summary ─────────────────────────────────────────────
const FEE_DATA = {
  total_due: 45000,
  paid: 35000,
  pending: 10000,
  last_paid: "15 Mar 2026",
  next_due: "5 Apr 2026",
  breakdown: [
    { label: "Tuition Fee", amount: 30000, status: "Paid" },
    { label: "Lab Fee", amount: 5000, status: "Paid" },
    { label: "Library Fee", amount: 2000, status: "Pending" },
    { label: "Sports Fee", amount: 3000, status: "Pending" },
    { label: "Transport Fee", amount: 5000, status: "Paid" },
  ]
};

// ─── Events ──────────────────────────────────────────────────
const EVENTS = [
  { 
    title: "Annual Sports Day", 
    title_te: "వార్షిక క్రీడా దినోత్సవం",
    title_hi: "वार्षिक खेल दिवस",
    date: "Apr 12, 2026", 
    desc: "Inter-class athletics, team sports, and prize ceremony.", 
    desc_te: "తరగతుల మధ్య అథ్లెటిక్స్, జట్టు క్రీడలు మరియు బహుమతి ప్రదానోత్సవం.",
    desc_hi: "अंतर-कक्षा एथलेटिक्स, टीम खेल और पुरस्कार समारोह।",
    color: "#5ca870" 
  },
  { 
    title: "Science Exhibition", 
    title_te: "సైన్స్ ఎగ్జిబిషన్",
    title_hi: "विज्ञान प्रदर्शनी",
    date: "Apr 18, 2026", 
    desc: "Students showcase innovative science projects and experiments.", 
    desc_te: "విద్యార్థులు వినూత్న సైన్స్ ప్రాజెక్టులు మరియు ప్రయోగాలను ప్రదర్శిస్తారు.",
    desc_hi: "छात्र अभिनव विज्ञान परियोजनाओं और प्रयोगों का प्रदर्शन करते हैं।",
    color: "#1976d2" 
  },
  { 
    title: "Parent-Teacher Meeting", 
    title_te: "తల్లిదండ్రుల-ఉపాధ్యాయుల సమావేశం",
    title_hi: "अभिभावक-शिक्षक बैठक",
    date: "Apr 5, 2026", 
    desc: "Quarterly academic progress discussion with parents.", 
    desc_te: "తల్లిదండ్రులతో త్రైమాసిక విద్యా పురోగతి చర్చ.",
    desc_hi: "अभिभावकों के साथ त्रैमासिक शैक्षणिक प्रगति चर्चा।",
    color: "#f57c00" 
  },
  { 
    title: "Cultural Fest – Utsav 2026", 
    title_te: "సాంస్కృతిక ఉత్సవం – ఉత్సవ్ 2026",
    title_hi: "सांस्कृतिक उत्सव – उत्सव 2026",
    date: "May 3, 2026", 
    desc: "Annual cultural event featuring music, dance & drama.", 
    desc_te: "సంగీతం, నృత్యం మరియు నాటకాలతో కూడిన వార్షిక సాంస్కృతిక కార్యక్రమం.",
    desc_hi: "संगीत, नृत्य और नाटक की विशेषता वाला वार्षिक सांस्कृतिक कार्यक्रम।",
    color: "#8b5cf6" 
  },
  { 
    title: "Career Guidance Workshop", 
    title_te: "కెరీర్ గైడెన్స్ వర్క్‌షాప్",
    title_hi: "कैरियर मार्गदर्शन कार्यशाला",
    date: "May 10, 2026", 
    desc: "Expert guidance for Class 9 & 10 on career choices.", 
    desc_te: "కెరీర్ ఎంపికలపై 9 మరియు 10 తరగతుల విద్యార్థులకు నిపుణుల మార్గదర్శకత్వం.",
    desc_hi: "कैरियर विकल्पों पर कक्षा 9 और 10 के लिए विशेषज्ञ मार्गदर्शन।",
    color: "#00bcd4" 
  },
  { 
    title: "Summer Vacation Begins", 
    title_te: "వేసవి సెలవుల ప్రారంభం",
    title_hi: "गर्मी की छुट्टियां शुरू",
    date: "May 20, 2026", 
    desc: "School closes for summer break 2026.", 
    desc_te: "2026 వేసవి సెలవుల కోసం పాఠశాల మూసివేయబడుతుంది.",
    desc_hi: "स्कूल 2026 की गर्मियों की छुट्टियों के लिए बंद होगा।",
    color: "#e53935" 
  },
  { 
    title: "Mega PTM - Term 3", 
    title_te: "మెగా పి.టి.ఎం - టర్మ్ 3",
    title_hi: "मेगा पीटीएम - टर्म 3",
    date: "April 28, 2026", 
    desc: "Interactive session for student progress review.", 
    desc_te: "విద్యార్థి పురోగతి సమీక్ష కోసం ఇంటరాక్టివ్ సెషన్.",
    desc_hi: "छात्र प्रगति समीक्षा के लिए इंटरैक्टिव सत्र।",
    color: "#8b5cf6" 
  },
  { 
    title: "Inter-House Sports Meet", 
    title_te: "ఇంటర్-హౌస్ స్పోర్ట్స్ మీట్",
    title_hi: "इंटर-हाउस स्पोर्ट्स मीट",
    date: "May 5, 2026", 
    desc: "Annual sports finals for all houses.", 
    desc_te: "అన్ని హౌస్‌ల వార్షిక క్రీడల ఫైనల్స్.",
    desc_hi: "सभी हाउसों के लिए वार्षिक खेल फाइनल।",
    color: "#5ca870" 
  },
  { 
    title: "Library Digitization Drive", 
    title_te: "లైబ్రరీ డిజిటలైజేషన్ డ్రైవ్",
    title_hi: "लाइब्रेरी डिजिटलीकरण अभियान",
    date: "April 25, 2026", 
    desc: "New e-book resources now available in portal.", 
    desc_te: "కొత్త ఇ-బుక్ వనరులు ఇప్పుడు పోర్టల్‌లో అందుబాటులో ఉన్నాయి.",
    desc_hi: "नए ई-बुक संसाधन अब पोर्टल में उपलब्ध हैं।",
    color: "#f57c00" 
  },
];

// ─── Attendance Data ─────────────────────────────────────────
// total_students, present_today, absent_today, late_today are set dynamically in initDataStore()
// after STUDENTS flat array is built from SCHOOL_DATA, so counts always match reality.
const ATTENDANCE_SUMMARY = {
  total_students: 0,
  present_today: 0,
  absent_today: 0,
  late_today: 0,
  weekly: [
    { day: "Mon", present: 92, total: 100 },
    { day: "Tue", present: 88, total: 100 },
    { day: "Wed", present: 95, total: 100 },
    { day: "Thu", present: 78, total: 100 },
    { day: "Fri", present: 91, total: 100 },
    { day: "Sat", present: 70, total: 100 },
  ],
};

// ─── Recent Activity ────────────────────────────────────────
const RECENT_ACTIVITY = [
  { text: "New student Priya S. enrolled in Class 10-A", time: "2 min ago", color: "#5ca870", icon: "🎓" },
  { text: "Prasana Reddy submitted marks for Class 10-A", time: "15 min ago", color: "#1976d2", icon: "📝" },
  { text: "Fee payment received from Mohan Menon – ₹5,000", time: "1 hr ago", color: "#f57c00", icon: "💰" },
  { text: "Homework 'Periodic Table Quiz' marked complete", time: "2 hr ago", color: "#4caf50", icon: "✅" },
  { text: "G MANASWINI attendance flagged – 79% (below 80%)", time: "3 hr ago", color: "#d32f2f", icon: "⚠️" },
  { text: "Annual Sports Day notice published by VP", time: "5 hr ago", color: "#8b5cf6", icon: "📢" },
  { text: "Timetable updated for Class 8-B by coordinator", time: "6 hr ago", color: "#00bcd4", icon: "📅" },
];

// ─── Role Navigation Config ──────────────────────────────────
const ROLE_NAV = {
  vice_principal: [
    {
      label: "Main", items: [
        { id: "home", icon: "fa-tachometer-alt", label: "Dashboard" },
        { id: "profile", icon: "fa-user-circle", label: "My Profile" },
      ]
    },
    {
      label: "Academic Ops", items: [
        { id: "vp_attendance", icon: "fa-clipboard-check", label: "Attendance Overview" },
        { id: "vp_class_perf", icon: "fa-chart-pie", label: "Class Performance" },
        { id: "vp_students", icon: "fa-chart-line", label: "Student Analysis" },
        { id: "vp_student_issues", icon: "fa-exclamation-triangle", label: "Student Issues", badge: "2" },
        { id: "vp_approvals", icon: "fa-check-double", label: "Approvals", badge: "5" },
        { id: "document_upload", icon: "fa-upload", label: "Upload Document" },
        { id: "helpdesk_staff", icon: "fa-headset", label: "Helpdesk Tickets" },
      ]
    },
    {
      label: "Staff Ops", items: [
        { id: "vp_teachers", icon: "fa-chalkboard-teacher", label: "Teacher Monitoring" },
        { id: "vp_schedule", icon: "fa-calendar-alt", label: "Timetable Review", badge: "1" },
      ]
    },
    {
      label: "Examination", items: [
        { id: "vp_exams", icon: "fa-file-signature", label: "Exams & Results" },
        { id: "vp_reports", icon: "fa-chart-bar", label: "Reports" },
      ]
    },
    {
      label: "Logistics & Comms", items: [
        { id: "vp_approvals", icon: "fa-check-circle", label: "Approvals", badge: "5" },
        { id: "announcements", icon: "fa-bullhorn", label: "Notices" },
        { id: "events", icon: "fa-calendar-star", label: "Events" },
        { id: "vp_messages", icon: "fa-envelope", label: "Messages", badge: "3" },
      ]
    },
    {
      label: "System", items: [
        { id: "registration", icon: "fa-user-plus", label: "User Registration" },
        { id: "settings", icon: "fa-cog", label: "Settings" },
      ]
    },
  ],
  teacher: [
    {
      label: "Main", items: [
        { id: "home", icon: "fa-tachometer-alt", label: "Dashboard" },
        { id: "teacher_classes", icon: "fa-chalkboard", label: "My Classes" },
      ]
    },
    {
      label: "Academics", items: [
        { id: "teacher_attendance", icon: "fa-clipboard-check", label: "Attendance" },
        { id: "teacher_homework", icon: "fa-book-open", label: "Homework" },
        { id: "teacher_schedule", icon: "fa-calendar-alt", label: "Timetable" },
        { id: "teacher_results", icon: "fa-chart-bar", label: "Marks & Results" },
        { id: "teacher_performance", icon: "fa-chart-line", label: "Student Performance" },
      ]
    },
    {
      label: "School", items: [
        { id: "announcements", icon: "fa-bullhorn", label: "Notices" },
        { id: "teacher_messages", icon: "fa-envelope", label: "Messages", badge: "2" },
      ]
    },
    {
      label: "Account", items: [
        { id: "settings", icon: "fa-cog", label: "Profile & Settings" },
      ]
    },
  ],
  parent: [
    {
      label: "Main", items: [
        { id: "home", icon: "fa-home", label: "Dashboard" },
        { id: "parent_child", icon: "fa-user-graduate", label: "Child Profile" },
      ]
    },
    {
      label: "Academics", items: [
        { id: "parent_attendance", icon: "fa-clipboard-check", label: "Attendance" },
        { id: "parent_homework", icon: "fa-book-open", label: "Homework" },
        { id: "parent_exams", icon: "fa-calendar-alt", label: "Exam Schedule" },
        { id: "parent_results", icon: "fa-chart-bar", label: "Results" },
      ]
    },
    {
      label: "Finance", items: [
        { id: "parent_fees", icon: "fa-rupee-sign", label: "Fees & Payments" },
      ]
    },
    {
      label: "School & Help", items: [
        { id: "announcements", icon: "fa-bullhorn", label: "Notices" },
        { id: "events", icon: "fa-calendar-star", label: "Events" },
        { id: "parent_messages", icon: "fa-envelope", label: "Messages & Concerns" },
      ]
    },
    {
      label: "Account", items: [
        { id: "settings", icon: "fa-cog", label: "Portal Settings" },
      ]
    },
  ],
  coordinator: [
    {
      label: "Main", items: [
        { id: "home", icon: "fa-tachometer-alt", label: "Dashboard" },
        { id: "profile", icon: "fa-user-circle", label: "My Profile" },
      ]
    },
    {
      label: "Academic", items: [
        { id: "teachers", icon: "fa-chalkboard-teacher", label: "Teachers" },
        { id: "schedule", icon: "fa-calendar-alt", label: "Timetable" },
        { id: "attendance", icon: "fa-clipboard-check", label: "Attendance" },
        { id: "homework", icon: "fa-book-open", label: "Homework" },
      ]
    },
    {
      label: "Communication", items: [
        { id: "announcements", icon: "fa-bullhorn", label: "Notices" },
        { id: "events", icon: "fa-calendar-star", label: "Events & CCA" },
        { id: "results", icon: "fa-chart-bar", label: "Reports" },
        { id: "settings", icon: "fa-cog", label: "Settings" },
      ]
    },
  ],
  class_teacher: [
    {
      label: "Main", items: [
        { id: "home", icon: "fa-tachometer-alt", label: "Dashboard" },
        { id: "profile", icon: "fa-user-circle", label: "My Profile" },
      ]
    },
    {
      label: "My Class", items: [
        { id: "students", icon: "fa-user-graduate", label: "Class Students" },
        { id: "attendance", icon: "fa-clipboard-check", label: "Attendance" },
        { id: "homework", icon: "fa-book-open", label: "Homework" },
        { id: "results", icon: "fa-chart-bar", label: "Report Cards" },
        { id: "schedule", icon: "fa-calendar-alt", label: "Timetable" },
        { id: "document_upload", icon: "fa-upload", label: "Upload Document" },
      ]
    },
    {
      label: "Communication/Support", items: [
        { id: "announcements", icon: "fa-bullhorn", label: "Notices" },
        { id: "events", icon: "fa-calendar-star", label: "Events" },
        { id: "helpdesk_staff", icon: "fa-headset", label: "Helpdesk Tickets" },
        { id: "settings", icon: "fa-cog", label: "Settings" },
      ]
    },
  ],
  principal: [
    {
      label: "Main", items: [
        { id: "home", icon: "fa-tachometer-alt", label: "Principal Dashboard" },
        { id: "profile", icon: "fa-user-circle", label: "My Profile" },
      ]
    },
    {
      label: "Institution Ops", items: [
        { id: "attendance_reports", icon: "fa-clipboard-check", label: "Attendance Reports" },
        { id: "exam_results", icon: "fa-file-signature", label: "Exam Results" },
        { id: "class_performance", icon: "fa-chart-pie", label: "Class Performance" },
        { id: "approvals", icon: "fa-check-circle", label: "Approvals", badge: "5" },
        { id: "document_upload", icon: "fa-upload", label: "Upload Document" },
      ]
    },
    {
      label: "Comms & Support", items: [
        { id: "notices", icon: "fa-bullhorn", label: "Notices" },
        { id: "events", icon: "fa-calendar-star", label: "Events" },
        { id: "messages", icon: "fa-envelope", label: "Messages", badge: "3" },
        { id: "helpdesk_staff", icon: "fa-headset", label: "Helpdesk Tickets" },
      ]
    },
    {
      label: "System Management", items: [
        { id: "registration", icon: "fa-user-plus", label: "User Registration" },
        { id: "settings", icon: "fa-cog", label: "Settings" },
      ]
    },
  ],
  apaaas: [
    {
      label: "Main", items: [
        { id: "master_dashboard", icon: "fa-tachometer-alt", label: "Master Dashboard" },
        { id: "role_views", icon: "fa-users-cog", label: "Role Views" },
      ]
    },
    {
      label: "System-wide Logs", items: [
        { id: "all_issues", icon: "fa-exclamation-triangle", label: "All Issues", badge: "2" },
        { id: "all_notices", icon: "fa-bullhorn", label: "All Notices" },
        { id: "all_approvals", icon: "fa-check-circle", label: "All Approvals", badge: "5" },
        { id: "all_accounts", icon: "fa-users", label: "System Audit" },
        { id: "manage_documents", icon: "fa-folder-open", label: "Manage Documents" },
        { id: "removed_bin", icon: "fa-trash-alt", label: "Removed Bin" },
      ]
    },
    {
      label: "Activity & System", items: [
        { id: "all_attendance", icon: "fa-clipboard-check", label: "All Attendance" },
        { id: "all_results", icon: "fa-file-signature", label: "All Results" },
        { id: "all_messages", icon: "fa-envelope", label: "All Messages" },
        { id: "all_helpdesk", icon: "fa-headset", label: "Full Helpdesk" },
      ]
    },
    {
      label: "System & Governance", items: [
        { id: "registration", icon: "fa-user-plus", label: "User Registration" },
        { id: "settings", icon: "fa-cog", label: "Settings" },
      ]
    },
  ],
};
ROLE_NAV.super_admin = ROLE_NAV.apaaas;
ROLE_NAV.superadmin = ROLE_NAV.apaaas;

// ─── Dashboard Home Config Per Role ──────────────────────────
const ROLE_HOME = {
  vice_principal: {
    greeting: "Welcome back, Suman!",
    subtitle: "School operations, academic tracking, and staff monitoring overview.",
    stats: [
      { label: "School Attendance", value: "92.5%", icon: "📋", color: "#4caf50" },
      { label: "Teacher Presence", value: "31/32", icon: "👨‍🏫", color: "#1976d2" },
      { label: "Pending Approvals", value: "5", icon: "✅", color: "#f57c00" },
      { label: "Low Att. Classes", value: "3", icon: "📉", color: "#d32f2f" },
      { label: "Pending Marks", value: "2", icon: "📝", color: "#8b5cf6" },
      { label: "Discipline Cases", value: "2", icon: "⚠️", color: "#ff5722" },
      { label: "Upcoming Exams", value: "3", icon: "📅", color: "#00bcd4" },
      { label: "Active Notices", value: "12", icon: "📢", color: "#8b5cf6" },
    ]
  },
  teacher: {
    greeting: "Good Morning, Prasana!",
    subtitle: "Your classes and tasks for today.",
    stats: [
      { label: "Classes Today", value: "4", icon: "📚", color: "#1976d2" },
      { label: "Pending Attendance", value: "2", icon: "📋", color: "#f57c00" },
      { label: "Assignments to Grade", value: "15", icon: "📝", color: "#d32f2f" },
      { label: "Upcoming Tests", value: "1", icon: "📅", color: "#8b5cf6" },
      { label: "Average Class Perf", value: "82%", icon: "🌟", color: "#5ca870" },
    ]
  },
  parent: {
    greeting: "Welcome back!",
    subtitle: "Fetching personalized child overview...",
    stats: [
      { label: "Attendance", value: "...", icon: "📋", color: "#5ca870", id: "p-stat-att" },
      { label: "Average Score", value: "...", icon: "📊", color: "#1976d2", id: "p-stat-gpa" },
      { label: "Pending Homework", value: "...", icon: "📝", color: "#f57c00", id: "p-stat-hw" },
      { label: "Upcoming Exams", value: "...", icon: "📅", color: "#8b5cf6", id: "p-stat-exams" },
    ]
  },
  student: {
    greeting: "Welcome!",
    subtitle: "Review your academic progress.",
    stats: [
      { label: "Attendance", value: "...", icon: "📋", color: "#5ca870" },
      { label: "Current GPA", value: "...", icon: "🌟", color: "#1976d2" },
      { label: "Homework", value: "...", icon: "📝", color: "#f57c00" },
      { label: "Upcoming Exams", value: "...", icon: "📅", color: "#8b5cf6" },
    ]
  },
  coordinator: {
    greeting: "Hello, Anitha!",
    subtitle: "Academic coordination dashboard.",
    stats: [
      { label: "Classes Managed", value: "18", icon: "🏫", color: "#5ca870" },
      { label: "Teaching Staff", value: "32", icon: "👨‍🏫", color: "#1976d2" },
      { label: "Notices Published", value: "12", icon: "📢", color: "#8b5cf6" },
      { label: "Open Issues", value: "5", icon: "⚠️", color: "#f57c00" },
    ]
  },
  class_teacher: {
    greeting: "Hello, Ms. Anita!",
    subtitle: "Class 8-B dashboard and attendance.",
    stats: [
      { label: "Class Strength", value: "35", icon: "🎓", color: "#5ca870" },
      { label: "Present Today", value: "32", icon: "✅", color: "#4caf50" },
      { label: "Absent Today", value: "3", icon: "❌", color: "#d32f2f" },
      { label: "Class Average", value: "78%", icon: "📊", color: "#1976d2" },
    ]
  },
  principal: {
    greeting: "Good Day, Principal Sir!",
    subtitle: "Institution-wide health, performance, and strategic overview.",
    stats: [
      { label: "Overall Attendance", value: "92.5%", icon: "📋", color: "#4caf50" },
      { label: "Academic Standing", value: "8.4 avg", icon: "🌟", color: "#1976d2" },
      { label: "Teacher Fulfillment", value: "31/32", icon: "👩‍🏫", color: "#f57c00" },
      { label: "Strategic Approvals", value: "5", icon: "⏱️", color: "#d32f2f" },
    ]
  },
  apaaas: {
    greeting: "Welcome, SuperAdmin!",
    subtitle: "Full-system audit and administrative control center.",
    stats: [
      { label: "Uptime Status", value: "99.9%", icon: "⚡", color: "#4caf50" },
      { label: "Total Students", value: "...", icon: "🎓", color: "#1976d2", id: "stat-total-students-admin" },
      { label: "Active Sessions", value: "14", icon: "💻", color: "#f57c00" },
      { label: "Unresolved Issues", value: "2", icon: "🚨", color: "#d32f2f" },
    ]
  }
};
ROLE_HOME.super_admin = ROLE_HOME.apaaas;
ROLE_HOME.superadmin = ROLE_HOME.apaaas;

// ─── Vice Principal Specific Mock Data ───────────────────────
const VP_APPROVALS = [
  { id: "AP01", type: "Leave Request", desc: "Medical leave for 3 days - Anita Pillai", date: "Today", status: "Pending" },
  { id: "AP02", type: "Timetable Swap", desc: "Swap P3 with Prasana Reddy for Class 10-A", date: "Today", status: "Pending" },
  { id: "AP03", type: "Event Fund", desc: "₹15,000 for Science Exhibition materials", date: "Yesterday", status: "Pending" },
  { id: "AP04", type: "Result Release", desc: "Release Mid-Term results for Class 8-B", date: "Yesterday", status: "Approved" },
  { id: "AP05", type: "Notice Draft", desc: "Summer Vacation Schedule Review", date: "2 Days Ago", status: "Pending" },
  { id: "AP06", type: "Procurement", desc: "Digital Podium purchase for Auditorium", date: "3 Days Ago", status: "Pending" },
  { id: "AP07", type: "Staff Request", desc: "Work-from-home (Grading Day) - Ramesh Sharma", date: "4 Days Ago", status: "Pending" },
  { id: "AP08", type: "Fee Waiver", desc: "Siddharth (9-C) - 20% scholarship application", date: "5 Days Ago", status: "Pending" },
  { id: "AP09", type: "Field Trip", desc: "Authorization for Planetarium Visit (Class 9)", date: "Today", status: "Approved" },
  { id: "AP10", type: "Security Patch", desc: "CCTV maintenance & vendor contract renewal", date: "Yesterday", status: "Pending" },
  { id: "AP11", type: "ICT Upgrade", desc: "50 New high-end workstations for Lab 1", date: "1 Week Ago", status: "Approved" },
  { id: "AP12", type: "Resource Hire", desc: "Contract for Part-time Drama Instructor", date: "Today", status: "Pending" },
];

const VP_MESSAGES = [
  { sender: "Anitha (Coord)", subject: "Class 9-B timetable clash resolved", time: "10:30 AM", unread: true, content: "The clash for period 3 science has been handled by swapping with Venkat Iyer." },
  { sender: "Prasana Reddy", subject: "Math syllabus completion report", time: "09:15 AM", unread: true, content: "Syllabus is on track. We are slightly behind in Trigonometry but covering up." },
  { sender: "Admin Office", subject: "Transport issue reported for Route 4", time: "Yesterday", unread: false, content: "Route 4 had a delay of 20 mins due to traffic." },
  { sender: "Nanda S. (Parent)", subject: "Meeting confirmation regarding Siddharth", time: "Yesterday", unread: false, content: "I'll be there at 10 AM tomorrow to discuss Siddharth's performance." },
];

const DISCIPLINE_CASES = [
  { student: "KASULA ASHWATH", class: "9-C", issue: "Continuous absence without notice", reporter: "Anitha", status: "Action Required", urgency: "High" },
  { student: "SATHWIK REDDY GANTA", class: "9-C", issue: "Disruptive behavior in Science Lab", reporter: "Pooja Mehta", status: "Under Observation", urgency: "Medium" },
  { student: "G MANASWINI", class: "9-C", issue: "Using mobile phone in classroom", reporter: "Ramesh Sharma", status: "Resolved", urgency: "Low" },
];

const CLASS_PERFORMANCE = [
  { class: "10-A", teacher: "Prasana Reddy",   avgAtt: 95, avgGPA: 8.9, topper: "Ananya Sharma",        weak: 1, issues: 1 },
  { class: "10-B", teacher: "Ramesh Sharma",   avgAtt: 92, avgGPA: 8.2, topper: "Meena Gupta",           weak: 3, issues: 0 },
  { class: "10-C", teacher: "Mohan Das",       avgAtt: 88, avgGPA: 7.6, topper: "Alia B.",               weak: 5, issues: 2 },
  { class: "10-D", teacher: "Aruna Krishnan",  avgAtt: 90, avgGPA: 8.1, topper: "Alia B.",               weak: 2, issues: 1 },
  { class: "9-A",  teacher: "Anita Pillai",    avgAtt: 91, avgGPA: 8.4, topper: "Suhana S.",             weak: 2, issues: 0 },
  { class: "9-B",  teacher: "Pooja Mehta",     avgAtt: 81, avgGPA: 7.1, topper: "Ishaan K.",             weak: 7, issues: 3 },
  { class: "9-C",  teacher: "Prasana Reddy",   avgAtt: 94, avgGPA: 8.7, topper: "CHEEKOORI SAI CHARAN",  weak: 1, issues: 2 },
  { class: "9-D",  teacher: "Mohan Das",       avgAtt: 87, avgGPA: 7.9, topper: "Kabir S.",              weak: 4, issues: 2 },
  { class: "8-A",  teacher: "Venkat Iyer",     avgAtt: 93, avgGPA: 8.0, topper: "Tanvi S.",              weak: 2, issues: 1 },
  { class: "8-B",  teacher: "Anita Pillai",    avgAtt: 85, avgGPA: 7.4, topper: "Sneha P.",              weak: 4, issues: 2 },
  { class: "8-C",  teacher: "Pooja Mehta",     avgAtt: 89, avgGPA: 7.8, topper: "Alia K.",               weak: 3, issues: 0 },
  { class: "8-D",  teacher: "Ramesh Sharma",   avgAtt: 90, avgGPA: 8.1, topper: "Pooja D.",              weak: 2, issues: 1 },
  { class: "7-A",  teacher: "Sunita Verma",    avgAtt: 96, avgGPA: 9.1, topper: "Kavya Iyer",            weak: 0, issues: 0 },
  { class: "7-B",  teacher: "Aruna Krishnan",  avgAtt: 90, avgGPA: 8.2, topper: "Aryan B.",              weak: 2, issues: 1 },
  { class: "7-C",  teacher: "Deepa Rani",      avgAtt: 88, avgGPA: 7.7, topper: "Priti G.",              weak: 4, issues: 1 },
  { class: "7-D",  teacher: "Suresh Naidu",    avgAtt: 89, avgGPA: 7.9, topper: "Uma R.",                weak: 3, issues: 0 },
  { class: "6-A",  teacher: "Deepa Rani",      avgAtt: 92, avgGPA: 8.5, topper: "Kriti K.",              weak: 1, issues: 0 },
  { class: "6-B",  teacher: "Sunita Verma",    avgAtt: 88, avgGPA: 7.9, topper: "Riya R.",               weak: 3, issues: 2 },
  { class: "6-C",  teacher: "Venkat Iyer",     avgAtt: 85, avgGPA: 7.5, topper: "Zeba Q.",               weak: 5, issues: 1 },
  { class: "6-D",  teacher: "Suresh Naidu",    avgAtt: 91, avgGPA: 8.2, topper: "Esha P.",               weak: 2, issues: 0 },
];


// ─── Parent Specific Mock Data ───────────────────────────────
const PARENT_CHILD = {
  name: "KASULA ASHWATH",
  class: "9-C",
  roll: "07",
  admNo: "3180076",
  dob: "12 Apr 2009",
  gender: "Male",
  bloodGroup: "B+",
  classTeacher: "Prasana Reddy",
  house: "Ganga House",
  academicYear: "2025-2026",
  parentContact: "+91 76543 21098",
  parentEmail: "ashwath@gmail.com",
  parentName: "Parent of KASULA ASHWATH",
  attendance: 94,
  gpa: 8.7,
};

const PARENT_ATTENDANCE_LOG = [
  { date: "27 Mar 2026", status: "Absent", reason: "Fever" },
  { date: "26 Mar 2026", status: "Present", reason: "" },
  { date: "25 Mar 2026", status: "Present", reason: "" },
  { date: "24 Mar 2026", status: "Present", reason: "" },
  { date: "21 Mar 2026", status: "Late", reason: "Transport delay" },
  { date: "20 Mar 2026", status: "Present", reason: "" },
  { date: "19 Mar 2026", status: "Present", reason: "" },
  { date: "18 Mar 2026", status: "Absent", reason: "Family function" },
  { date: "17 Mar 2026", status: "Present", reason: "" },
  { date: "14 Mar 2026", status: "Present", reason: "" },
];

const PARENT_MONTHLY_ATT = [
  { month: "Oct", pct: 96 }, { month: "Nov", pct: 92 },
  { month: "Dec", pct: 90 }, { month: "Jan", pct: 94 },
  { month: "Feb", pct: 97 }, { month: "Mar", pct: 94 },
];

const PARENT_HOMEWORK = [
  { subject: "Mathematics", title: "Quadratic Equations – Practice Set A", due: "31 Mar 2026", teacher: "Prasana Reddy", status: "Pending" },
  { subject: "Physics", title: "Newton's Laws – Lab Report", due: "2 Apr 2026", teacher: "Ramesh Sharma", status: "Pending" },
  { subject: "Chemistry", title: "Periodic Table Quiz", due: "28 Mar 2026", teacher: "Mohan Das", status: "Completed" },
  { subject: "English", title: "Essay – My Future Goals", due: "25 Mar 2026", teacher: "Anita Pillai", status: "Completed" },
  { subject: "History", title: "Timeline of Indian Independence", due: "5 Apr 2026", teacher: "Sunita Verma", status: "Pending" },
  { subject: "Comp. Sci", title: "Python Basics – Program Set 1", due: "10 Apr 2026", teacher: "Venkat Iyer", status: "Not Started" },
  { subject: "Geography", title: "Map Pointing – South America", due: "15 Apr 2026", teacher: "Anitha (Coord)", status: "Pending" },
  { subject: "Fine Arts", title: "Landscape Sketching", due: "22 Apr 2026", teacher: "Aruna", status: "In Progress" },
];

const PARENT_EXAMS = [
  { exam: "Final Evaluation (2026)", subject: "Mathematics", date: "14 May 2026", time: "9:00 AM – 12:00 PM", room: "Hall A" },
  { exam: "Final Evaluation (2026)", subject: "Physics", date: "16 May 2026", time: "9:00 AM – 12:00 PM", room: "Hall B" },
  { exam: "Final Evaluation (2026)", subject: "Chemistry", date: "18 May 2026", time: "9:00 AM – 12:00 PM", room: "Chem Lab" },
  { exam: "Final Evaluation (2026)", subject: "English", date: "20 May 2026", time: "9:00 AM – 11:30 AM", room: "Hall A" },
  { exam: "Final Evaluation (2026)", subject: "History", date: "22 May 2026", time: "9:00 AM – 11:30 AM", room: "Room 305" },
  { exam: "Final Evaluation (2026)", subject: "Computer Science", date: "24 May 2026", time: "0:00 AM – 11:00 AM", room: "Comp Lab" },
];

const PARENT_RESULTS = {
  examName: "Unit Test 3 (Feb 2026)",
  subjects: [
    { subject: "Mathematics", marks: 87, max: 100, grade: "A", remarks: "Good analytical skills" },
    { subject: "Physics", marks: 79, max: 100, grade: "B+", remarks: "Needs more lab practice" },
    { subject: "English", marks: 92, max: 100, grade: "A+", remarks: "Excellent creative writing" },
    { subject: "Chemistry", marks: 74, max: 100, grade: "B", remarks: "Improve organic concepts" },
    { subject: "History", marks: 83, max: 100, grade: "A-", remarks: "Consistent performance" },
    { subject: "Computer Science", marks: 96, max: 100, grade: "A+", remarks: "Outstanding" },
    { subject: "Physical Education", marks: 90, max: 100, grade: "A+", remarks: "Very active" },
  ],
  terms: [
    { term: "Term 1", pct: 82 },
    { term: "Unit Test 2", pct: 84 },
    { term: "Unit Test 3", pct: 86 },
  ]
};

const PARENT_MESSAGES = [
  { sender: "Prasana Reddy (Class Teacher)", subject: "KASULA ASHWATH's Math improvement", time: "Today 10:30 AM", unread: true, content: "KASULA ASHWATH has shown remarkable improvement in quadratic equations. Keep encouraging at home." },
  { sender: "School Admin", subject: "Parent-Teacher Meeting – April 5", time: "Yesterday", unread: true, content: "You are invited to the Q3 PTM on April 5, 2026 at 10 AM. Please confirm your attendance." },
  { sender: "Ramesh Sharma (Physics)", subject: "Lab report pending", time: "2 days ago", unread: false, content: "KASULA ASHWATH has not submitted the Newton's Laws lab report. Kindly ensure timely submission." },
  { sender: "Accounts Dept", subject: "Fee reminder – April installment", time: "3 days ago", unread: false, content: "A reminder that ₹10,000 is due by 5th April 2026. Ignore if already paid." },
];

const PARENT_FEE_HISTORY = [
  { date: "15 Mar 2026", desc: "Tuition Fee (Q3)", amount: 30000, mode: "Online", status: "Paid" },
  { date: "15 Mar 2026", desc: "Lab Fee", amount: 5000, mode: "Online", status: "Paid" },
  { date: "15 Mar 2026", desc: "Transport Fee (Q3)", amount: 5000, mode: "Online", status: "Paid" },
  { date: "Pending", desc: "Library Fee", amount: 2000, mode: "—", status: "Due" },
  { date: "Pending", desc: "Tuition Fee (Q4)", amount: 8000, mode: "—", status: "Due" },
];

// ─── Teacher Specific Mock Data ───────────────────────────────

const TEACHER_MY_CLASSES = [
  { class: "10-A", section: "Senior Secondary", subject: "Mathematics", students: 35, avgAtt: 95, avgPerf: "8.9 GPA", role: "Class Teacher" },
  { class: "9-B", section: "Senior Secondary", subject: "Mathematics", students: 32, avgAtt: 91, avgPerf: "8.1 GPA", role: "Subject Teacher" },
  { class: "8-C", section: "Middle School", subject: "Mathematics", students: 28, avgAtt: 94, avgPerf: "8.5 GPA", role: "Subject Teacher" },
  { class: "10-B", section: "Senior Secondary", subject: "Substitution", students: 30, avgAtt: 88, avgPerf: "—", role: "Substitute" },
];

const TEACHER_ATT_MARKING = [
  { roll: 1, name: "KASULA ASHWATH", status: "Present", last5: ["Present", "Present", "Absent", "Present", "Present"] },
  { roll: 2, name: "PRANEETH BHUKYA", status: "Present", last5: ["Present", "Present", "Present", "Present", "Present"] },
  { roll: 3, name: "Karan Johar", status: "Present", last5: ["Late", "Present", "Present", "Present", "Present"] },
  { roll: 4, name: "SATHWIK REDDY GANTA", status: "", last5: ["Present", "Absent", "Absent", "Present", "Present"] },
  { roll: 5, name: "G MANASWINI", status: "", last5: ["Absent", "Absent", "Present", "Absent", "Late"] },
  { roll: 6, name: "BHUKYA PRANAVI", status: "", last5: ["Present", "Present", "Present", "Present", "Present"] },
  { roll: 7, name: "SNITHIK VENGALA", status: "", last5: ["Present", "Present", "Present", "Present", "Present"] },
  { roll: 8, name: "NIDHISH DUMALA", status: "", last5: ["Absent", "Delayed", "Present", "Present", "Present"] },
];

const TEACHER_HOMEWORK_TRACKING = [
  { id: "HW01", title: "Quadratic Equations – Practice Set", class: "10-A", dueDate: "Today", status: "Submission Open", submitted: 28, pending: 7 },
  { id: "HW02", title: "Trigonometry Basics – Worksheet", class: "9-B", dueDate: "Tomorrow", status: "Submission Open", submitted: 15, pending: 17 },
  { id: "HW03", title: "Linear Equations Unit Test Prep", class: "10-A", dueDate: "Yesterday", status: "Grading", submitted: 34, pending: 1 },
  { id: "HW04", title: "Polynomials Case Study", class: "8-C", dueDate: "25 Mar", status: "Graded", submitted: 28, pending: 0 },
];

const TEACHER_RESULT_TRACKING = [
  { exam: "Unit Test 3", class: "10-A", subject: "Mathematics", totalStudents: 35, marksEntered: 35, avgScore: 88, status: "Submitted to VP" },
  { exam: "Unit Test 3", class: "9-B", subject: "Mathematics", totalStudents: 32, marksEntered: 15, avgScore: 74, status: "Draft (In Progress)" },
  { exam: "Mid-Term", class: "10-A", subject: "Mathematics", totalStudents: 35, marksEntered: 0, avgScore: 0, status: "Pending Entry" },
];

const TEACHER_STUDENT_PERF = [
  { name: "KASULA ASHWATH", class: "9-C", att: 94, gpa: 8.7, trend: "up", remark: "Consistent improvement." },
  { name: "PRANEETH BHUKYA", class: "9-C", att: 98, gpa: 9.8, trend: "flat", remark: "Exceptional." },
  { name: "G MANASWINI", class: "9-C", att: 74, gpa: 6.2, trend: "down", remark: "Needs extra support." },
  { name: "BHUKYA PRANAVI", class: "9-C", att: 92, gpa: 8.8, trend: "up", remark: "Good participation." },
  { name: "SNITHIK VENGALA", class: "9-C", att: 82, gpa: 7.1, trend: "flat", remark: "Needs pushing in Algebra." },
];

const TEACHER_MESSAGES = [
  { sender: "Suman (VP)", subject: "Class 10-A Unit Test 3 results approved", time: "1h ago", unread: true, content: "The marks for 10-A have been authorized and published to parents." },
  { sender: "Anitha (Coord)", subject: "Substitution for Period 4 today", time: "3h ago", unread: true, content: "Please cover Ramesh's physics class (10-B) in period 4." },
  { sender: "Parent", subject: "Absence on 27th", time: "Yesterday", unread: false, content: "Student was unwell. Medical note shared via portal." },
  { sender: "Admin Office", subject: "Update on Smartboard in Rm 101", time: "2 days ago", unread: false, content: "The interactive display has been serviced and is operational." },
];


// ─── Global State & LocalStorage Persistence ───────────────
let GLOBAL_ISSUES = [];
const EXCLUDED_STUDENTS = new Set([
  // Array emptied. Students are no longer missing from tabs!
]);

function isExcludedStudentRecord(s) {
  const name = String((s && s.name) || "").trim().toUpperCase();
  return EXCLUDED_STUDENTS.has(name);
}
function isExcludedIssueRecord(i) {
  const n1 = String((i && i.studentName) || "").trim().toUpperCase();
  const n2 = String((i && i.student) || "").trim().toUpperCase();
  return EXCLUDED_STUDENTS.has(n1) || EXCLUDED_STUDENTS.has(n2);
}

const DEFAULT_GLOBAL_ISSUES = [
  {
    id: "ISS-1001",
    title: "Bus route 4 arriving late",
    desc: "The bus driver has been arriving 15 minutes late for the past week, making the student late for morning assembly.",
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
      { date: "2026-03-26T10:00:00Z", actor: "Prasana Reddy", role: "Teacher", note: "I have also noticed the student arriving late. Escalated to Transport/Coordinator." },
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
  },
  {
    id: "ISS-1003",
    title: "Projector failure in ICT Lab 2",
    desc: "The main interactive projector in Lab 2 has blurred output. Practical sessions are being disrupted.",
    status: "Open",
    stage: "Teacher",
    studentId: "ALL",
    studentName: "ICT Resources",
    class: "Multiple",
    reporterId: "T001",
    reporterName: "Venkat Iyer",
    reporterRole: "Teacher",
    category: "Facilities",
    priority: "High",
    severity: "Normal",
    assignedTo: "ICT Dept",
    attachments: [],
    created: "2026-04-18T09:00:00Z",
    updated: "2026-04-18T09:00:00Z",
    timeline: [
      { date: "2026-04-18T09:00:00Z", actor: "Venkat Iyer", role: "Teacher", note: "Issue logged during 1st period." }
    ]
  },
  {
    id: "ISS-1004",
    title: "Bullying concern - Playground",
    desc: "Parent reported that student was teased during lunch break regarding their academic performance.",
    status: "Reviewing",
    stage: "VP",
    studentId: "3230719",
    studentName: "G MANASWINI",
    class: "9-C",
    reporterId: "P3230719A",
    reporterName: "Parent of G MANASWINI",
    reporterRole: "Parent",
    category: "Discipline",
    priority: "High",
    severity: "Critical",
    assignedTo: "VP Suman",
    attachments: [],
    created: "2026-04-19T16:20:00Z",
    updated: "2026-04-20T08:45:00Z",
    timeline: [
      { date: "2026-04-19T16:20:00Z", actor: "Parent of G MANASWINI", role: "Parent", note: "Concern submitted via mobile portal." },
      { date: "2026-04-20T08:45:00Z", actor: "VP Suman", role: "VP", note: "Checking CCTV logs and interviewing floor supervisors." }
    ]
  }
];

function initDataStore() {
  if (!localStorage.getItem('campuscore_issues')) {
    localStorage.setItem('campuscore_issues', JSON.stringify(DEFAULT_GLOBAL_ISSUES));
  }
  GLOBAL_ISSUES = JSON.parse(localStorage.getItem('campuscore_issues'));
  if (Array.isArray(GLOBAL_ISSUES)) {
    const filteredIssues = GLOBAL_ISSUES.filter(i => !isExcludedIssueRecord(i));
    if (filteredIssues.length !== GLOBAL_ISSUES.length) {
      GLOBAL_ISSUES = filteredIssues;
      localStorage.setItem('campuscore_issues', JSON.stringify(GLOBAL_ISSUES));
    }
  }

  if (!localStorage.getItem('campuscore_settings')) {
    localStorage.setItem('campuscore_settings', JSON.stringify({}));
  }

  // Persist STUDENTS to support Promote feature
  if (!localStorage.getItem('campuscore_students')) {
    localStorage.setItem('campuscore_students', JSON.stringify(STUDENTS));
  } else {
    STUDENTS = JSON.parse(localStorage.getItem('campuscore_students'));
  }
  const sanitizedStudents = (Array.isArray(STUDENTS) ? STUDENTS : []).filter(s => !isExcludedStudentRecord(s));
  if (sanitizedStudents.length !== (Array.isArray(STUDENTS) ? STUDENTS.length : 0)) {
    STUDENTS = sanitizedStudents;
    localStorage.setItem('campuscore_students', JSON.stringify(STUDENTS));
  }
  const escRaw = JSON.parse(localStorage.getItem('campuscore_escalations') || '{}');
  const escKeys = ['teacherInbox', 'coordinatorInbox', 'vpEscalated', 'resolvedIssues'];
  let escChanged = false;
  escKeys.forEach(k => {
    if (Array.isArray(escRaw[k])) {
      const next = escRaw[k].filter(i => !isExcludedIssueRecord(i));
      if (next.length !== escRaw[k].length) escChanged = true;
      escRaw[k] = next;
    }
  });
  if (escChanged) {
    localStorage.setItem('campuscore_escalations', JSON.stringify(escRaw));
  }

  // --- NEW FEATURE INITIALIZATION ---
  if (!localStorage.getItem('campuscore_documents')) {
    localStorage.setItem('campuscore_documents', JSON.stringify([
      { id: 'DOC-001', title: 'Annual Day Circular', class: 'All Classes', subject: 'General', type: 'Circular', date: '2026-03-20', author: 'Principal' },
      { id: 'DOC-002', title: 'Maths Unit Test Notes', class: '9C', subject: 'Mathematics', type: 'Notes', date: '2026-04-01', author: 'Ramesh Sharma' }
    ]));
  }
  if (!localStorage.getItem('campuscore_student_requests')) {
    localStorage.setItem('campuscore_student_requests', JSON.stringify([
      { id: 'REQ-882', title: 'Leave Application', studentId: '3180076', studentName: 'KASULA ASHWATH', type: 'Leave', status: 'Pending', stage: 'Teacher', date: '2026-04-10' }
    ]));
  }
  if (!localStorage.getItem('campuscore_helpdesk_tickets')) {
    localStorage.setItem('campuscore_helpdesk_tickets', JSON.stringify([
      { id: 'TKT-101', studentName: 'KASULA ASHWATH', subject: 'Library Book Missing', status: 'Open', priority: 'Medium', lastUpdate: '2026-04-09', assignedTo: 'Librarian' },
      { id: 'TKT-102', studentName: 'PRANEETH BHUKYA', subject: 'Login Issue', status: 'Open', priority: 'High', lastUpdate: '2026-04-10', assignedTo: 'IT Dept' },
      { id: 'TKT-103', studentName: 'G MANASWINI', subject: 'Transport Fee Query', status: 'Open', priority: 'Low', lastUpdate: '2026-04-11', assignedTo: 'Accounts' }
    ]));
  }
  window.HELPDESK_TICKETS = [
    { id: 'TKT-101', studentName: 'KASULA ASHWATH', subject: 'Library Book Missing', status: 'Open', priority: 'Medium', lastUpdate: '2026-04-09', assignedTo: 'Librarian' },
    { id: 'TKT-102', studentName: 'PRANEETH BHUKYA', subject: 'Login Issue', status: 'Open', priority: 'High', lastUpdate: '2026-04-10', assignedTo: 'IT Dept' },
    { id: 'TKT-103', studentName: 'G MANASWINI', subject: 'Transport Fee Query', status: 'Open', priority: 'Low', lastUpdate: '2026-04-11', assignedTo: 'Accounts' }
  ];

  // --- UNIVERSAL STUDENT DATA SEEDING ---
  // Ensure all students in SCHOOL_DATA have a "rich" profile by default
  const seedStudents = [];
  if (window.SCHOOL_DATA && window.SCHOOL_DATA.classes) {
      Object.keys(window.SCHOOL_DATA.classes).forEach(grade => {
          Object.keys(window.SCHOOL_DATA.classes[grade]).forEach(sec => {
              window.SCHOOL_DATA.classes[grade][sec].forEach(s => seedStudents.push(s));
          });
      });
  }

  seedStudents.forEach(s => {
    const key = 'campuscore_student_data_' + s.id;
    const existingRaw = localStorage.getItem(key);
    let existing = existingRaw ? JSON.parse(existingRaw) : null;
    
    // Initialize or Repair if name is missing/Unknown
    if (!existing || existing.name === 'Unknown' || !existing.name) {
      const demoData = {
        id: s.id,
        name: s.name,
        currentClass: s.class,
        currentSection: s.section,
        roll: s.roll,
        admNo: s.admNo || s.id,
        homework: JSON.parse(JSON.stringify(PARENT_HOMEWORK)),
        exams: JSON.parse(JSON.stringify(PARENT_EXAMS)),
        results: JSON.parse(JSON.stringify(PARENT_RESULTS)),
        fees: {
          total: 85000,
          paid: 75000,
          pending: 10000,
          next_due: "05 Apr 2026",
          breakdown: [
            { label: "Tuition Fee (Q3)", amount: 30000, status: "Paid" },
            { label: "Transport Fee (Q3)", amount: 5000, status: "Paid" },
            { label: "Tuition Fee (Q4)", amount: 10000, status: "Pending" }
          ],
          history: [
            { id: "TXN-" + (100000 + String(s.id).split('').reduce((a,c)=>a+c.charCodeAt(0),0) * 997 % 900000), date: "15 Mar 2026", method: "Online", amount: 35000, status: "Success", receipt: "RCPT-" + (1000 + String(s.id).split('').reduce((a,c)=>a+c.charCodeAt(0),0) * 7 % 9000) }
          ]
        },
        messages: [
          { id: 'M1', sender: "Anita Pillai (Teacher)", subject: "Welcome to New Session", ts: "1 Week Ago", body: "Welcome to class! Please ensure you have all textbooks ready by Monday.", unread: false },
          { id: 'M2', sender: "Accounts Office", subject: "Term 4 Fee Invoice", ts: "Yesterday", body: "The fee invoice for the final quarter has been generated. Please check the fees section.", unread: true }
        ],
        attendance_logs: [
          { date: "15 Apr 2026", status: "Present" },
          { date: "14 Apr 2026", status: "Present" },
          { date: "13 Apr 2026", status: "Late" }
        ],
        attendancePct: 85 + (String(s.id).split('').reduce((a,c) => a + c.charCodeAt(0), 0)) % 13
      };
      localStorage.setItem(key, JSON.stringify(demoData));
    }
  });
  // Sync all computed counts (ATTENDANCE_SUMMARY, admin stat card) after STUDENTS is settled
  syncComputedStats();
}

function saveStudents() {
  localStorage.setItem('campuscore_students', JSON.stringify(STUDENTS));
}

// ─── Sync computed stats that depend on STUDENTS.length ───────
function syncComputedStats() {
  // ATTENDANCE_SUMMARY: set from actual student count
  ATTENDANCE_SUMMARY.total_students = STUDENTS.length;
  ATTENDANCE_SUMMARY.present_today  = Math.round(STUDENTS.length * 0.925);
  ATTENDANCE_SUMMARY.absent_today   = Math.round(STUDENTS.length * 0.050);
  ATTENDANCE_SUMMARY.late_today     = STUDENTS.length - ATTENDANCE_SUMMARY.present_today - ATTENDANCE_SUMMARY.absent_today;
  // VP weekly totals scale to institution size
  ATTENDANCE_SUMMARY.weekly.forEach(d => { d.total = STUDENTS.length; d.present = Math.round(STUDENTS.length * (d.present / 100)); });
  // SuperAdmin dashboard stat card
  const adminStat = (ROLE_HOME.apaaas || ROLE_HOME.super_admin || {}).stats || [];
  const tsStat = adminStat.find(s => s.id === 'stat-total-students-admin');
  if (tsStat) tsStat.value = String(STUDENTS.length);
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

window.registerDynamicUser = function(userData) {
  const users = JSON.parse(localStorage.getItem('campuscore_dynamic_users') || '[]');
  users.push(userData);
  localStorage.setItem('campuscore_dynamic_users', JSON.stringify(users));
  console.log(`[DATA] Registered dynamic user: ${userData.username}`);
};

window.getUnifiedAccounts = function() {
  const dynamicUsers = JSON.parse(localStorage.getItem('campuscore_dynamic_users') || '[]');
  const excludedUids = JSON.parse(localStorage.getItem('campuscore_excluded_uids') || '[]');
  
  // Merge Demo and Dynamic
  let all = [...DEMO_USERS, ...dynamicUsers];
  
  // Filter out excluded (deleted)
  return all.filter(u => !excludedUids.includes(u.username) && !excludedUids.includes(u.id));
};

window.getInstitutionalStats = function() {
  const all = STUDENTS;
  const total = all.length;
  const present = Math.floor(total * 0.92);
  const absent = Math.floor(total * 0.05);
  const late = total - present - absent;
  return { total, present, absent, late };
};

/* ================================================================
   CAMPUSCORE ─ POST-BUILD INTEGRITY CHECK
   Run window.runIntegrityCheck() in the browser console any time
   to verify the dataset is self-consistent.
   ================================================================
   PARENT LOGIN SCOPE (enforced by design):
   ───────────────────────────
   Only Class 9-C students (27 students, DEMO_USERS ids 101–127)
   have login-capable parent accounts in DEMO_USERS.
   Credentials: username = P{studentId}A, password = parent123
   Students in all other classes have a 'parent' display field
   on their SCHOOL_DATA record but NO corresponding login entry.
   This is intentional — adding full parent logins for 297 students
   would create 297 dummy accounts with no differentiated data.
   To test any parent flow, use one of the 9-C parent accounts.
================================================================ */
window.runIntegrityCheck = function() {
  const log = { passed: [], failed: [] };
  const ok   = m => log.passed.push('✅ ' + m);
  const fail = m => log.failed.push('❌ ' + m);

  // 1. Unique DEMO_USERS usernames
  const uns = DEMO_USERS.map(u => u.username);
  const dupU = uns.filter((u, i) => uns.indexOf(u) !== i);
  dupU.length ? fail('Duplicate DEMO_USER usernames: ' + dupU) : ok('DEMO_USERS usernames unique (' + DEMO_USERS.length + ' users)');

  // 2. P_ASHWATH_TEST absent
  DEMO_USERS.some(u => u.username === 'P_ASHWATH_TEST')
    ? fail('Stale P_ASHWATH_TEST still present in DEMO_USERS')
    : ok('P_ASHWATH_TEST removed ✓');

  // 3. Unique student IDs
  const sids = STUDENTS.map(s => String(s.id));
  const dupS = sids.filter((id, i) => sids.indexOf(id) !== i);
  dupS.length ? fail('Duplicate student IDs: ' + dupS.slice(0,5).join(',')) : ok('Student IDs unique (' + STUDENTS.length + ' students)');

  // 4. Parent → student reference validity
  const sidSet = new Set(sids);
  const parents = DEMO_USERS.filter(u => u.role === 'parent');
  const badP = parents.filter(p => p.childId && !sidSet.has(String(p.childId)));
  badP.length
    ? fail('Broken parent→student links: ' + badP.map(p => p.username + '→' + p.childId).join(', '))
    : ok('All ' + parents.length + ' parent→student links valid (all in 9-C)');

  // 5. CLASS_PERFORMANCE toppers exist in correct class
  const badToppers = CLASS_PERFORMANCE.filter(cp => {
    const [g, s] = cp.class.split('-');
    const sec = window.SCHOOL_DATA.classes[g] && window.SCHOOL_DATA.classes[g][s];
    return sec && !sec.some(st => st.name === cp.topper);
  });
  badToppers.length
    ? fail('Toppers not in their class: ' + badToppers.map(c => c.class + ':' + c.topper).join(', '))
    : ok('All CLASS_PERFORMANCE toppers valid');

  // 6. ATTENDANCE_SUMMARY reconciled with STUDENTS.length
  ATTENDANCE_SUMMARY.total_students === STUDENTS.length
    ? ok('ATTENDANCE_SUMMARY.total_students = ' + STUDENTS.length + ' ✓')
    : fail('ATTENDANCE_SUMMARY.total_students (' + ATTENDANCE_SUMMARY.total_students + ') ≠ STUDENTS.length (' + STUDENTS.length + ')');

  // 7. No stale "Student X-1" generated names
  const stale = STUDENTS.filter(s => /^Student \d+[A-K]-\d+$/.test(s.name)).length;
  stale ? fail('Stale \'Student X-1\' names still present: ' + stale) : ok('No stale generated placeholder names');

  // 8. TEACHERS count
  ok('TEACHERS: ' + (window.TEACHERS || []).length + ' teachers loaded');

  console.group('[CampusCore] Integrity Check');
  log.passed.forEach(m => console.log(m));
  log.failed.forEach(m => console.error(m));
  console.log(log.failed.length === 0 ? '🎉 All checks passed!' : '⚠️ ' + log.failed.length + ' check(s) failed');
  console.groupEnd();
  return log;
};

// Auto-run silently on load (results visible in console)
console.log('[CampusCore] Data loaded. Run window.runIntegrityCheck() to validate dataset.');


initDataStore();
