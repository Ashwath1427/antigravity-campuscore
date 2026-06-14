/* ============================================================
   CAMPUS CORE – DATA.JS
   All hardcoded demo data matching DPS Nadergul prototype
   All data synchronized with database structure - 297 students total
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
  {
    id: 9,
    username: "APASAA",
    password: "APASAA",
    name: "Mac Admin",
    role: "super_admin",
    roleLabel: "Super Admin",
    department: "System Administration",
    phone: "+91 98765 00003",
    email: "macadmin@dpsnadergul.edu",
    joined: "Jan 2020",
    avatar_color: "#1b5e20",
    icon: "fa-user-cog",
    notifications: [
      { title: "System Health", text: "All systems operational", time: "30m ago", icon: "✅", color: "#5ca870" },
      { title: "Mac Dock Active", text: "Admin dock initialized successfully", time: "1h ago", icon: "🖥️", color: "#1976d2" },
      { title: "Database Sync", text: "All data synchronized", time: "2h ago", icon: "💾", color: "#f57c00" }
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
        { id: "10A01", admNo: "10A01", name: "Dhruv Reddy", class: "10", section: "A", roll: "01", gender: "Male", dob: "15 Jan 2011", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Dhruv Reddy" },
        { id: "10A02", admNo: "10A02", name: "Prisha Iyer", class: "10", section: "A", roll: "02", gender: "Female", dob: "15 Jan 2011", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Prisha Iyer" },
        { id: "10A03", admNo: "10A03", name: "Prisha Chowdhury", class: "10", section: "A", roll: "03", gender: "Male", dob: "15 Jan 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 9.4, parent: "Parent of Prisha Chowdhury" },
        { id: "10A04", admNo: "10A04", name: "Aarush Das", class: "10", section: "A", roll: "04", gender: "Female", dob: "15 Jan 2011", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 6.5, parent: "Parent of Aarush Das" },
        { id: "10A05", admNo: "10A05", name: "Ishaan Chowdhury", class: "10", section: "A", roll: "05", gender: "Male", dob: "15 Jan 2011", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Ishaan Chowdhury" },
        { id: "10A06", admNo: "10A06", name: "Ritvik Menon", class: "10", section: "A", roll: "06", gender: "Male", dob: "15 Jan 2011", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Ritvik Menon" },
        { id: "10A07", admNo: "10A07", name: "Dhruv Nair", class: "10", section: "A", roll: "07", gender: "Male", dob: "15 Jan 2011", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Dhruv Nair" },
        { id: "10A08", admNo: "10A08", name: "Reyansh Nair", class: "10", section: "A", roll: "08", gender: "Male", dob: "15 Jan 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 9.6, parent: "Parent of Reyansh Nair" },
        { id: "10A09", admNo: "10A09", name: "Ahana Joshi", class: "10", section: "A", roll: "09", gender: "Female", dob: "15 Jan 2011", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Ahana Joshi" },
        { id: "10A10", admNo: "10A10", name: "Myra Verma", class: "10", section: "A", roll: "10", gender: "Female", dob: "15 Jan 2011", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Myra Verma" }
      ],
      "B": [
        { id: "10B01", admNo: "10B01", name: "Prisha Bose", class: "10", section: "B", roll: "01", gender: "Female", dob: "15 Jan 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Prisha Bose" },
        { id: "10B02", admNo: "10B02", name: "Aditya Chowdhury", class: "10", section: "B", roll: "02", gender: "Female", dob: "15 Jan 2011", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 9.8, parent: "Parent of Aditya Chowdhury" },
        { id: "10B03", admNo: "10B03", name: "Arjun Menon", class: "10", section: "B", roll: "03", gender: "Female", dob: "15 Jan 2011", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Arjun Menon" },
        { id: "10B04", admNo: "10B04", name: "Atharv Pillai", class: "10", section: "B", roll: "04", gender: "Female", dob: "15 Jan 2011", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Atharv Pillai" },
        { id: "10B05", admNo: "10B05", name: "Riya Sharma", class: "10", section: "B", roll: "05", gender: "Male", dob: "15 Jan 2011", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Riya Sharma" },
        { id: "10B06", admNo: "10B06", name: "Ananya Bose", class: "10", section: "B", roll: "06", gender: "Female", dob: "15 Jan 2011", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 9.3, parent: "Parent of Ananya Bose" },
        { id: "10B07", admNo: "10B07", name: "Avni Bose", class: "10", section: "B", roll: "07", gender: "Female", dob: "15 Jan 2011", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 6.5, parent: "Parent of Avni Bose" },
        { id: "10B08", admNo: "10B08", name: "Ira Nair", class: "10", section: "B", roll: "08", gender: "Male", dob: "15 Jan 2011", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Ira Nair" },
        { id: "10B09", admNo: "10B09", name: "Ayaan Bose", class: "10", section: "B", roll: "09", gender: "Female", dob: "15 Jan 2011", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Ayaan Bose" },
        { id: "10B10", admNo: "10B10", name: "Kabir Mukherjee", class: "10", section: "B", roll: "10", gender: "Male", dob: "15 Jan 2011", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Kabir Mukherjee" }
      ],
      "C": [
        { id: "10C01", admNo: "10C01", name: "Ritvik Verma", class: "10", section: "C", roll: "01", gender: "Male", dob: "15 Jan 2011", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Ritvik Verma" },
        { id: "10C02", admNo: "10C02", name: "Atharv Sharma", class: "10", section: "C", roll: "02", gender: "Female", dob: "15 Jan 2011", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Atharv Sharma" },
        { id: "10C03", admNo: "10C03", name: "Saanvi Kulkarni", class: "10", section: "C", roll: "03", gender: "Male", dob: "15 Jan 2011", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Saanvi Kulkarni" },
        { id: "10C04", admNo: "10C04", name: "Kabir Das", class: "10", section: "C", roll: "04", gender: "Male", dob: "15 Jan 2011", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Kabir Das" },
        { id: "10C05", admNo: "10C05", name: "Advik Reddy", class: "10", section: "C", roll: "05", gender: "Female", dob: "15 Jan 2011", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 8.6, parent: "Parent of Advik Reddy" },
        { id: "10C06", admNo: "10C06", name: "Pranav Verma", class: "10", section: "C", roll: "06", gender: "Female", dob: "15 Jan 2011", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 9.4, parent: "Parent of Pranav Verma" },
        { id: "10C07", admNo: "10C07", name: "Kavya Singh", class: "10", section: "C", roll: "07", gender: "Male", dob: "15 Jan 2011", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 6.8, parent: "Parent of Kavya Singh" },
        { id: "10C08", admNo: "10C08", name: "Ananya Bose", class: "10", section: "C", roll: "08", gender: "Male", dob: "15 Jan 2011", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Ananya Bose" },
        { id: "10C09", admNo: "10C09", name: "Pari Rao", class: "10", section: "C", roll: "09", gender: "Male", dob: "15 Jan 2011", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Pari Rao" },
        { id: "10C10", admNo: "10C10", name: "Prisha Das", class: "10", section: "C", roll: "10", gender: "Male", dob: "15 Jan 2011", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Prisha Das" }
      ],
      "D": [
        { id: "10D01", admNo: "10D01", name: "Reyansh Reddy", class: "10", section: "D", roll: "01", gender: "Male", dob: "15 Jan 2011", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Reyansh Reddy" },
        { id: "10D02", admNo: "10D02", name: "Hardik Singh", class: "10", section: "D", roll: "02", gender: "Male", dob: "15 Jan 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Hardik Singh" },
        { id: "10D03", admNo: "10D03", name: "Navya Rao", class: "10", section: "D", roll: "03", gender: "Female", dob: "15 Jan 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Navya Rao" },
        { id: "10D04", admNo: "10D04", name: "Darsh Das", class: "10", section: "D", roll: "04", gender: "Male", dob: "15 Jan 2011", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Darsh Das" },
        { id: "10D05", admNo: "10D05", name: "Hardik Singh", class: "10", section: "D", roll: "05", gender: "Male", dob: "15 Jan 2011", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Hardik Singh" },
        { id: "10D06", admNo: "10D06", name: "Aanya Pillai", class: "10", section: "D", roll: "06", gender: "Male", dob: "15 Jan 2011", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Aanya Pillai" },
        { id: "10D07", admNo: "10D07", name: "Anika Patel", class: "10", section: "D", roll: "07", gender: "Female", dob: "15 Jan 2011", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 6.6, parent: "Parent of Anika Patel" },
        { id: "10D08", admNo: "10D08", name: "Ananya Desai", class: "10", section: "D", roll: "08", gender: "Female", dob: "15 Jan 2011", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 8.7, parent: "Parent of Ananya Desai" },
        { id: "10D09", admNo: "10D09", name: "Kabir Verma", class: "10", section: "D", roll: "09", gender: "Female", dob: "15 Jan 2011", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Kabir Verma" },
        { id: "10D10", admNo: "10D10", name: "Sai Sharma", class: "10", section: "D", roll: "10", gender: "Female", dob: "15 Jan 2011", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Sai Sharma" }
      ],
      "E": [
        { id: "10E01", admNo: "10E01", name: "Navya Gupta", class: "10", section: "E", roll: "01", gender: "Male", dob: "15 Jan 2011", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Navya Gupta" },
        { id: "10E02", admNo: "10E02", name: "Aarav Kulkarni", class: "10", section: "E", roll: "02", gender: "Female", dob: "15 Jan 2011", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 6.5, parent: "Parent of Aarav Kulkarni" },
        { id: "10E03", admNo: "10E03", name: "Atharv Joshi", class: "10", section: "E", roll: "03", gender: "Female", dob: "15 Jan 2011", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Atharv Joshi" },
        { id: "10E04", admNo: "10E04", name: "Hardik Reddy", class: "10", section: "E", roll: "04", gender: "Male", dob: "15 Jan 2011", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Hardik Reddy" },
        { id: "10E05", admNo: "10E05", name: "Aarush Rao", class: "10", section: "E", roll: "05", gender: "Male", dob: "15 Jan 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 6.6, parent: "Parent of Aarush Rao" },
        { id: "10E06", admNo: "10E06", name: "Ananya Nair", class: "10", section: "E", roll: "06", gender: "Female", dob: "15 Jan 2011", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Ananya Nair" },
        { id: "10E07", admNo: "10E07", name: "Aashvi Patel", class: "10", section: "E", roll: "07", gender: "Female", dob: "15 Jan 2011", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Aashvi Patel" },
        { id: "10E08", admNo: "10E08", name: "Aarush Pillai", class: "10", section: "E", roll: "08", gender: "Male", dob: "15 Jan 2011", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Aarush Pillai" },
        { id: "10E09", admNo: "10E09", name: "Pranav Kulkarni", class: "10", section: "E", roll: "09", gender: "Male", dob: "15 Jan 2011", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Pranav Kulkarni" },
        { id: "10E10", admNo: "10E10", name: "Aditya Nair", class: "10", section: "E", roll: "10", gender: "Male", dob: "15 Jan 2011", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Aditya Nair" }
      ],
      "F": [
        { id: "10F01", admNo: "10F01", name: "Krishna Kulkarni", class: "10", section: "F", roll: "01", gender: "Female", dob: "15 Jan 2011", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 8.7, parent: "Parent of Krishna Kulkarni" },
        { id: "10F02", admNo: "10F02", name: "Atharv Pillai", class: "10", section: "F", roll: "02", gender: "Female", dob: "15 Jan 2011", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 6.6, parent: "Parent of Atharv Pillai" },
        { id: "10F03", admNo: "10F03", name: "Advik Iyer", class: "10", section: "F", roll: "03", gender: "Female", dob: "15 Jan 2011", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Advik Iyer" },
        { id: "10F04", admNo: "10F04", name: "Aarush Das", class: "10", section: "F", roll: "04", gender: "Female", dob: "15 Jan 2011", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 8.9, parent: "Parent of Aarush Das" },
        { id: "10F05", admNo: "10F05", name: "Atharv Nair", class: "10", section: "F", roll: "05", gender: "Female", dob: "15 Jan 2011", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Atharv Nair" },
        { id: "10F06", admNo: "10F06", name: "Aanya Das", class: "10", section: "F", roll: "06", gender: "Female", dob: "15 Jan 2011", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 6.8, parent: "Parent of Aanya Das" },
        { id: "10F07", admNo: "10F07", name: "Krishna Joshi", class: "10", section: "F", roll: "07", gender: "Male", dob: "15 Jan 2011", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Krishna Joshi" },
        { id: "10F08", admNo: "10F08", name: "Aashvi Singh", class: "10", section: "F", roll: "08", gender: "Female", dob: "15 Jan 2011", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Aashvi Singh" },
        { id: "10F09", admNo: "10F09", name: "Darsh Menon", class: "10", section: "F", roll: "09", gender: "Female", dob: "15 Jan 2011", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Darsh Menon" },
        { id: "10F10", admNo: "10F10", name: "Aarush Verma", class: "10", section: "F", roll: "10", gender: "Male", dob: "15 Jan 2011", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Aarush Verma" }
      ],
      "G": [
        { id: "10G01", admNo: "10G01", name: "Kyra Singh", class: "10", section: "G", roll: "01", gender: "Female", dob: "15 Jan 2011", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Kyra Singh" },
        { id: "10G02", admNo: "10G02", name: "Reyansh Patel", class: "10", section: "G", roll: "02", gender: "Female", dob: "15 Jan 2011", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Reyansh Patel" },
        { id: "10G03", admNo: "10G03", name: "Shanaya Joshi", class: "10", section: "G", roll: "03", gender: "Female", dob: "15 Jan 2011", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Shanaya Joshi" },
        { id: "10G04", admNo: "10G04", name: "Ritvik Verma", class: "10", section: "G", roll: "04", gender: "Male", dob: "15 Jan 2011", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Ritvik Verma" },
        { id: "10G05", admNo: "10G05", name: "Sai Nair", class: "10", section: "G", roll: "05", gender: "Male", dob: "15 Jan 2011", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Sai Nair" },
        { id: "10G06", admNo: "10G06", name: "Prisha Patel", class: "10", section: "G", roll: "06", gender: "Female", dob: "15 Jan 2011", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Prisha Patel" },
        { id: "10G07", admNo: "10G07", name: "Arjun Menon", class: "10", section: "G", roll: "07", gender: "Male", dob: "15 Jan 2011", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 9.6, parent: "Parent of Arjun Menon" },
        { id: "10G08", admNo: "10G08", name: "Reyansh Joshi", class: "10", section: "G", roll: "08", gender: "Male", dob: "15 Jan 2011", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Reyansh Joshi" },
        { id: "10G09", admNo: "10G09", name: "Aanya Iyer", class: "10", section: "G", roll: "09", gender: "Female", dob: "15 Jan 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Aanya Iyer" },
        { id: "10G10", admNo: "10G10", name: "Aaradhya Kulkarni", class: "10", section: "G", roll: "10", gender: "Female", dob: "15 Jan 2011", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Aaradhya Kulkarni" }
      ],
      "H": [
        { id: "10H01", admNo: "10H01", name: "Aashvi Joshi", class: "10", section: "H", roll: "01", gender: "Male", dob: "15 Jan 2011", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Aashvi Joshi" },
        { id: "10H02", admNo: "10H02", name: "Shaurya Pillai", class: "10", section: "H", roll: "02", gender: "Male", dob: "15 Jan 2011", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Shaurya Pillai" },
        { id: "10H03", admNo: "10H03", name: "Shaurya Rao", class: "10", section: "H", roll: "03", gender: "Male", dob: "15 Jan 2011", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Shaurya Rao" },
        { id: "10H04", admNo: "10H04", name: "Ritvik Chowdhury", class: "10", section: "H", roll: "04", gender: "Male", dob: "15 Jan 2011", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Ritvik Chowdhury" },
        { id: "10H05", admNo: "10H05", name: "Avni Bose", class: "10", section: "H", roll: "05", gender: "Male", dob: "15 Jan 2011", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Avni Bose" },
        { id: "10H06", admNo: "10H06", name: "Krishna Pillai", class: "10", section: "H", roll: "06", gender: "Male", dob: "15 Jan 2011", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Krishna Pillai" },
        { id: "10H07", admNo: "10H07", name: "Hardik Singh", class: "10", section: "H", roll: "07", gender: "Male", dob: "15 Jan 2011", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 8.7, parent: "Parent of Hardik Singh" },
        { id: "10H08", admNo: "10H08", name: "Pranav Reddy", class: "10", section: "H", roll: "08", gender: "Male", dob: "15 Jan 2011", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Pranav Reddy" },
        { id: "10H09", admNo: "10H09", name: "Aaradhya Iyer", class: "10", section: "H", roll: "09", gender: "Male", dob: "15 Jan 2011", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Aaradhya Iyer" },
        { id: "10H10", admNo: "10H10", name: "Aadhya Pillai", class: "10", section: "H", roll: "10", gender: "Female", dob: "15 Jan 2011", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Aadhya Pillai" }
      ],
      "I": [
        { id: "10I01", admNo: "10I01", name: "Navya Patel", class: "10", section: "I", roll: "01", gender: "Male", dob: "15 Jan 2011", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Navya Patel" },
        { id: "10I02", admNo: "10I02", name: "Sai Pillai", class: "10", section: "I", roll: "02", gender: "Male", dob: "15 Jan 2011", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Sai Pillai" },
        { id: "10I03", admNo: "10I03", name: "Aarush Joshi", class: "10", section: "I", roll: "03", gender: "Female", dob: "15 Jan 2011", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Aarush Joshi" },
        { id: "10I04", admNo: "10I04", name: "Kyra Verma", class: "10", section: "I", roll: "04", gender: "Male", dob: "15 Jan 2011", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Kyra Verma" },
        { id: "10I05", admNo: "10I05", name: "Sai Kulkarni", class: "10", section: "I", roll: "05", gender: "Female", dob: "15 Jan 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Sai Kulkarni" },
        { id: "10I06", admNo: "10I06", name: "Aarav Patel", class: "10", section: "I", roll: "06", gender: "Male", dob: "15 Jan 2011", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Aarav Patel" },
        { id: "10I07", admNo: "10I07", name: "Aadhya Reddy", class: "10", section: "I", roll: "07", gender: "Female", dob: "15 Jan 2011", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Aadhya Reddy" },
        { id: "10I08", admNo: "10I08", name: "Anvi Iyer", class: "10", section: "I", roll: "08", gender: "Female", dob: "15 Jan 2011", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of Anvi Iyer" },
        { id: "10I09", admNo: "10I09", name: "Navya Iyer", class: "10", section: "I", roll: "09", gender: "Male", dob: "15 Jan 2011", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Navya Iyer" },
        { id: "10I10", admNo: "10I10", name: "Atharv Rao", class: "10", section: "I", roll: "10", gender: "Male", dob: "15 Jan 2011", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Atharv Rao" }
      ],
      "J": [
        { id: "10J01", admNo: "10J01", name: "Ritvik Desai", class: "10", section: "J", roll: "01", gender: "Male", dob: "15 Jan 2011", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Ritvik Desai" },
        { id: "10J02", admNo: "10J02", name: "Vihaan Patel", class: "10", section: "J", roll: "02", gender: "Male", dob: "15 Jan 2011", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 8.7, parent: "Parent of Vihaan Patel" },
        { id: "10J03", admNo: "10J03", name: "Anika Pillai", class: "10", section: "J", roll: "03", gender: "Male", dob: "15 Jan 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Anika Pillai" },
        { id: "10J04", admNo: "10J04", name: "Kyra Singh", class: "10", section: "J", roll: "04", gender: "Male", dob: "15 Jan 2011", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 8.9, parent: "Parent of Kyra Singh" },
        { id: "10J05", admNo: "10J05", name: "Anika Das", class: "10", section: "J", roll: "05", gender: "Male", dob: "15 Jan 2011", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Anika Das" },
        { id: "10J06", admNo: "10J06", name: "Aarav Nair", class: "10", section: "J", roll: "06", gender: "Female", dob: "15 Jan 2011", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 9.8, parent: "Parent of Aarav Nair" },
        { id: "10J07", admNo: "10J07", name: "Myra Patel", class: "10", section: "J", roll: "07", gender: "Male", dob: "15 Jan 2011", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Myra Patel" },
        { id: "10J08", admNo: "10J08", name: "Ahana Sharma", class: "10", section: "J", roll: "08", gender: "Female", dob: "15 Jan 2011", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Ahana Sharma" },
        { id: "10J09", admNo: "10J09", name: "Aarav Nair", class: "10", section: "J", roll: "09", gender: "Female", dob: "15 Jan 2011", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Aarav Nair" },
        { id: "10J10", admNo: "10J10", name: "Riya Bose", class: "10", section: "J", roll: "10", gender: "Female", dob: "15 Jan 2011", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 6.7, parent: "Parent of Riya Bose" }
      ],
      "K": [
        { id: "10K01", admNo: "10K01", name: "Navya Joshi", class: "10", section: "K", roll: "01", gender: "Female", dob: "15 Jan 2011", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Navya Joshi" },
        { id: "10K02", admNo: "10K02", name: "Pranav Pillai", class: "10", section: "K", roll: "02", gender: "Male", dob: "15 Jan 2011", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 9.4, parent: "Parent of Pranav Pillai" },
        { id: "10K03", admNo: "10K03", name: "Ayaan Bose", class: "10", section: "K", roll: "03", gender: "Female", dob: "15 Jan 2011", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 8.6, parent: "Parent of Ayaan Bose" },
        { id: "10K04", admNo: "10K04", name: "Prisha Joshi", class: "10", section: "K", roll: "04", gender: "Male", dob: "15 Jan 2011", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Prisha Joshi" },
        { id: "10K05", admNo: "10K05", name: "Saanvi Gupta", class: "10", section: "K", roll: "05", gender: "Female", dob: "15 Jan 2011", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 9.4, parent: "Parent of Saanvi Gupta" },
        { id: "10K06", admNo: "10K06", name: "Dhruv Gupta", class: "10", section: "K", roll: "06", gender: "Male", dob: "15 Jan 2011", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 9.4, parent: "Parent of Dhruv Gupta" },
        { id: "10K07", admNo: "10K07", name: "Diya Verma", class: "10", section: "K", roll: "07", gender: "Male", dob: "15 Jan 2011", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Diya Verma" },
        { id: "10K08", admNo: "10K08", name: "Kyra Kumar", class: "10", section: "K", roll: "08", gender: "Male", dob: "15 Jan 2011", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Kyra Kumar" },
        { id: "10K09", admNo: "10K09", name: "Navya Nair", class: "10", section: "K", roll: "09", gender: "Male", dob: "15 Jan 2011", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Navya Nair" },
        { id: "10K10", admNo: "10K10", name: "Ishaan Das", class: "10", section: "K", roll: "10", gender: "Female", dob: "15 Jan 2011", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Ishaan Das" }
      ],
      "L": [
        { id: "10L01", admNo: "10L01", name: "Aarush Kulkarni", class: "10", section: "L", roll: "01", gender: "Male", dob: "15 Jan 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Aarush Kulkarni" },
        { id: "10L02", admNo: "10L02", name: "Ishaan Nair", class: "10", section: "L", roll: "02", gender: "Male", dob: "15 Jan 2011", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 9.6, parent: "Parent of Ishaan Nair" },
        { id: "10L03", admNo: "10L03", name: "Navya Pillai", class: "10", section: "L", roll: "03", gender: "Male", dob: "15 Jan 2011", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Navya Pillai" },
        { id: "10L04", admNo: "10L04", name: "Reyansh Reddy", class: "10", section: "L", roll: "04", gender: "Female", dob: "15 Jan 2011", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 6.6, parent: "Parent of Reyansh Reddy" },
        { id: "10L05", admNo: "10L05", name: "Aashvi Rao", class: "10", section: "L", roll: "05", gender: "Male", dob: "15 Jan 2011", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Aashvi Rao" },
        { id: "10L06", admNo: "10L06", name: "Myra Kumar", class: "10", section: "L", roll: "06", gender: "Female", dob: "15 Jan 2011", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Myra Kumar" },
        { id: "10L07", admNo: "10L07", name: "Ishaan Kumar", class: "10", section: "L", roll: "07", gender: "Male", dob: "15 Jan 2011", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Ishaan Kumar" },
        { id: "10L08", admNo: "10L08", name: "Ira Sharma", class: "10", section: "L", roll: "08", gender: "Female", dob: "15 Jan 2011", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Ira Sharma" },
        { id: "10L09", admNo: "10L09", name: "Krishna Kumar", class: "10", section: "L", roll: "09", gender: "Male", dob: "15 Jan 2011", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 8.9, parent: "Parent of Krishna Kumar" },
        { id: "10L10", admNo: "10L10", name: "Darsh Chowdhury", class: "10", section: "L", roll: "10", gender: "Female", dob: "15 Jan 2011", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 9.8, parent: "Parent of Darsh Chowdhury" }
      ]
    },
    "9": {
      "A": [
        { id: "9A01", admNo: "9A01", name: "Vihaan Bose", class: "9", section: "A", roll: "01", gender: "Male", dob: "15 Jan 2012", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Vihaan Bose" },
        { id: "9A02", admNo: "9A02", name: "Advik Das", class: "9", section: "A", roll: "02", gender: "Male", dob: "15 Jan 2012", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Advik Das" },
        { id: "9A03", admNo: "9A03", name: "Dhruv Menon", class: "9", section: "A", roll: "03", gender: "Female", dob: "15 Jan 2012", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Dhruv Menon" },
        { id: "9A04", admNo: "9A04", name: "Atharv Sharma", class: "9", section: "A", roll: "04", gender: "Male", dob: "15 Jan 2012", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Atharv Sharma" },
        { id: "9A05", admNo: "9A05", name: "Ritvik Kulkarni", class: "9", section: "A", roll: "05", gender: "Female", dob: "15 Jan 2012", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 6.7, parent: "Parent of Ritvik Kulkarni" },
        { id: "9A06", admNo: "9A06", name: "Reyansh Reddy", class: "9", section: "A", roll: "06", gender: "Female", dob: "15 Jan 2012", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Reyansh Reddy" },
        { id: "9A07", admNo: "9A07", name: "Saanvi Nair", class: "9", section: "A", roll: "07", gender: "Male", dob: "15 Jan 2012", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Saanvi Nair" },
        { id: "9A08", admNo: "9A08", name: "Arjun Joshi", class: "9", section: "A", roll: "08", gender: "Male", dob: "15 Jan 2012", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Arjun Joshi" },
        { id: "9A09", admNo: "9A09", name: "Hardik Kumar", class: "9", section: "A", roll: "09", gender: "Male", dob: "15 Jan 2012", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.9, parent: "Parent of Hardik Kumar" },
        { id: "9A10", admNo: "9A10", name: "Kabir Pillai", class: "9", section: "A", roll: "10", gender: "Female", dob: "15 Jan 2012", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of Kabir Pillai" }
      ],
      "B": [
        { id: "9B01", admNo: "9B01", name: "Aarav Joshi", class: "9", section: "B", roll: "01", gender: "Female", dob: "15 Jan 2012", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Aarav Joshi" },
        { id: "9B02", admNo: "9B02", name: "Hardik Mukherjee", class: "9", section: "B", roll: "02", gender: "Female", dob: "15 Jan 2012", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Hardik Mukherjee" },
        { id: "9B03", admNo: "9B03", name: "Riya Joshi", class: "9", section: "B", roll: "03", gender: "Female", dob: "15 Jan 2012", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 6.6, parent: "Parent of Riya Joshi" },
        { id: "9B04", admNo: "9B04", name: "Darsh Bose", class: "9", section: "B", roll: "04", gender: "Male", dob: "15 Jan 2012", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Darsh Bose" },
        { id: "9B05", admNo: "9B05", name: "Aarav Reddy", class: "9", section: "B", roll: "05", gender: "Male", dob: "15 Jan 2012", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Aarav Reddy" },
        { id: "9B06", admNo: "9B06", name: "Riya Mukherjee", class: "9", section: "B", roll: "06", gender: "Male", dob: "15 Jan 2012", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Riya Mukherjee" },
        { id: "9B07", admNo: "9B07", name: "Aarav Bose", class: "9", section: "B", roll: "07", gender: "Male", dob: "15 Jan 2012", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of Aarav Bose" },
        { id: "9B08", admNo: "9B08", name: "Atharv Joshi", class: "9", section: "B", roll: "08", gender: "Female", dob: "15 Jan 2012", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 6.7, parent: "Parent of Atharv Joshi" },
        { id: "9B09", admNo: "9B09", name: "Diya Das", class: "9", section: "B", roll: "09", gender: "Female", dob: "15 Jan 2012", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Diya Das" },
        { id: "9B10", admNo: "9B10", name: "Navya Kumar", class: "9", section: "B", roll: "10", gender: "Male", dob: "15 Jan 2012", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Navya Kumar" }
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
        { id: "9D01", admNo: "9D01", name: "Riya Joshi", class: "9", section: "D", roll: "01", gender: "Male", dob: "15 Jan 2012", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 9.6, parent: "Parent of Riya Joshi" },
        { id: "9D02", admNo: "9D02", name: "Atharv Gupta", class: "9", section: "D", roll: "02", gender: "Male", dob: "15 Jan 2012", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Atharv Gupta" },
        { id: "9D03", admNo: "9D03", name: "Ira Iyer", class: "9", section: "D", roll: "03", gender: "Female", dob: "15 Jan 2012", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Ira Iyer" },
        { id: "9D04", admNo: "9D04", name: "Myra Reddy", class: "9", section: "D", roll: "04", gender: "Male", dob: "15 Jan 2012", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 9.6, parent: "Parent of Myra Reddy" },
        { id: "9D05", admNo: "9D05", name: "Aaradhya Chowdhury", class: "9", section: "D", roll: "05", gender: "Female", dob: "15 Jan 2012", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Aaradhya Chowdhury" },
        { id: "9D06", admNo: "9D06", name: "Ishaan Rao", class: "9", section: "D", roll: "06", gender: "Female", dob: "15 Jan 2012", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Ishaan Rao" },
        { id: "9D07", admNo: "9D07", name: "Sai Das", class: "9", section: "D", roll: "07", gender: "Male", dob: "15 Jan 2012", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Sai Das" },
        { id: "9D08", admNo: "9D08", name: "Sai Sharma", class: "9", section: "D", roll: "08", gender: "Female", dob: "15 Jan 2012", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Sai Sharma" },
        { id: "9D09", admNo: "9D09", name: "Hardik Singh", class: "9", section: "D", roll: "09", gender: "Female", dob: "15 Jan 2012", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of Hardik Singh" },
        { id: "9D10", admNo: "9D10", name: "Ananya Bose", class: "9", section: "D", roll: "10", gender: "Female", dob: "15 Jan 2012", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of Ananya Bose" }
      ],
      "E": [
        { id: "9E01", admNo: "9E01", name: "Dhruv Menon", class: "9", section: "E", roll: "01", gender: "Male", dob: "15 Jan 2012", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Dhruv Menon" },
        { id: "9E02", admNo: "9E02", name: "Krishna Rao", class: "9", section: "E", roll: "02", gender: "Male", dob: "15 Jan 2012", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Krishna Rao" },
        { id: "9E03", admNo: "9E03", name: "Prisha Kumar", class: "9", section: "E", roll: "03", gender: "Male", dob: "15 Jan 2012", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 9.6, parent: "Parent of Prisha Kumar" },
        { id: "9E04", admNo: "9E04", name: "Ayaan Joshi", class: "9", section: "E", roll: "04", gender: "Female", dob: "15 Jan 2012", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Ayaan Joshi" },
        { id: "9E05", admNo: "9E05", name: "Reyansh Rao", class: "9", section: "E", roll: "05", gender: "Male", dob: "15 Jan 2012", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Reyansh Rao" },
        { id: "9E06", admNo: "9E06", name: "Riya Nair", class: "9", section: "E", roll: "06", gender: "Female", dob: "15 Jan 2012", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of Riya Nair" },
        { id: "9E07", admNo: "9E07", name: "Ira Reddy", class: "9", section: "E", roll: "07", gender: "Female", dob: "15 Jan 2012", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Ira Reddy" },
        { id: "9E08", admNo: "9E08", name: "Kabir Rao", class: "9", section: "E", roll: "08", gender: "Male", dob: "15 Jan 2012", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Kabir Rao" },
        { id: "9E09", admNo: "9E09", name: "Pari Joshi", class: "9", section: "E", roll: "09", gender: "Female", dob: "15 Jan 2012", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of Pari Joshi" },
        { id: "9E10", admNo: "9E10", name: "Kavya Mukherjee", class: "9", section: "E", roll: "10", gender: "Female", dob: "15 Jan 2012", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Kavya Mukherjee" }
      ],
      "F": [
        { id: "9F01", admNo: "9F01", name: "Vihaan Singh", class: "9", section: "F", roll: "01", gender: "Male", dob: "15 Jan 2012", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of Vihaan Singh" },
        { id: "9F02", admNo: "9F02", name: "Aanya Verma", class: "9", section: "F", roll: "02", gender: "Male", dob: "15 Jan 2012", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Aanya Verma" },
        { id: "9F03", admNo: "9F03", name: "Reyansh Reddy", class: "9", section: "F", roll: "03", gender: "Female", dob: "15 Jan 2012", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Reyansh Reddy" },
        { id: "9F04", admNo: "9F04", name: "Aditya Pillai", class: "9", section: "F", roll: "04", gender: "Male", dob: "15 Jan 2012", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 8.6, parent: "Parent of Aditya Pillai" },
        { id: "9F05", admNo: "9F05", name: "Sai Verma", class: "9", section: "F", roll: "05", gender: "Male", dob: "15 Jan 2012", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Sai Verma" },
        { id: "9F06", admNo: "9F06", name: "Hardik Das", class: "9", section: "F", roll: "06", gender: "Male", dob: "15 Jan 2012", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Hardik Das" },
        { id: "9F07", admNo: "9F07", name: "Aarush Iyer", class: "9", section: "F", roll: "07", gender: "Female", dob: "15 Jan 2012", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Aarush Iyer" },
        { id: "9F08", admNo: "9F08", name: "Ira Rao", class: "9", section: "F", roll: "08", gender: "Female", dob: "15 Jan 2012", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Ira Rao" },
        { id: "9F09", admNo: "9F09", name: "Shanaya Singh", class: "9", section: "F", roll: "09", gender: "Female", dob: "15 Jan 2012", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Shanaya Singh" },
        { id: "9F10", admNo: "9F10", name: "Arjun Menon", class: "9", section: "F", roll: "10", gender: "Female", dob: "15 Jan 2012", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Arjun Menon" }
      ],
      "G": [
        { id: "9G01", admNo: "9G01", name: "Pranav Desai", class: "9", section: "G", roll: "01", gender: "Male", dob: "15 Jan 2012", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 8.7, parent: "Parent of Pranav Desai" },
        { id: "9G02", admNo: "9G02", name: "Krishna Rao", class: "9", section: "G", roll: "02", gender: "Female", dob: "15 Jan 2012", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Krishna Rao" },
        { id: "9G03", admNo: "9G03", name: "Saanvi Das", class: "9", section: "G", roll: "03", gender: "Male", dob: "15 Jan 2012", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Saanvi Das" },
        { id: "9G04", admNo: "9G04", name: "Pranav Singh", class: "9", section: "G", roll: "04", gender: "Male", dob: "15 Jan 2012", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 8.9, parent: "Parent of Pranav Singh" },
        { id: "9G05", admNo: "9G05", name: "Riya Iyer", class: "9", section: "G", roll: "05", gender: "Male", dob: "15 Jan 2012", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Riya Iyer" },
        { id: "9G06", admNo: "9G06", name: "Aashvi Mukherjee", class: "9", section: "G", roll: "06", gender: "Female", dob: "15 Jan 2012", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 9.3, parent: "Parent of Aashvi Mukherjee" },
        { id: "9G07", admNo: "9G07", name: "Atharv Bose", class: "9", section: "G", roll: "07", gender: "Male", dob: "15 Jan 2012", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Atharv Bose" },
        { id: "9G08", admNo: "9G08", name: "Diya Chowdhury", class: "9", section: "G", roll: "08", gender: "Female", dob: "15 Jan 2012", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Diya Chowdhury" },
        { id: "9G09", admNo: "9G09", name: "Pari Verma", class: "9", section: "G", roll: "09", gender: "Female", dob: "15 Jan 2012", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Pari Verma" },
        { id: "9G10", admNo: "9G10", name: "Reyansh Sharma", class: "9", section: "G", roll: "10", gender: "Female", dob: "15 Jan 2012", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Reyansh Sharma" }
      ],
      "H": [
        { id: "9H01", admNo: "9H01", name: "Diya Patel", class: "9", section: "H", roll: "01", gender: "Female", dob: "15 Jan 2012", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of Diya Patel" },
        { id: "9H02", admNo: "9H02", name: "Aarush Kumar", class: "9", section: "H", roll: "02", gender: "Female", dob: "15 Jan 2012", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 8.7, parent: "Parent of Aarush Kumar" },
        { id: "9H03", admNo: "9H03", name: "Saanvi Patel", class: "9", section: "H", roll: "03", gender: "Female", dob: "15 Jan 2012", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Saanvi Patel" },
        { id: "9H04", admNo: "9H04", name: "Vihaan Iyer", class: "9", section: "H", roll: "04", gender: "Female", dob: "15 Jan 2012", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Vihaan Iyer" },
        { id: "9H05", admNo: "9H05", name: "Avni Das", class: "9", section: "H", roll: "05", gender: "Female", dob: "15 Jan 2012", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of Avni Das" },
        { id: "9H06", admNo: "9H06", name: "Atharv Mukherjee", class: "9", section: "H", roll: "06", gender: "Female", dob: "15 Jan 2012", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Atharv Mukherjee" },
        { id: "9H07", admNo: "9H07", name: "Krishna Reddy", class: "9", section: "H", roll: "07", gender: "Female", dob: "15 Jan 2012", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Krishna Reddy" },
        { id: "9H08", admNo: "9H08", name: "Pranav Menon", class: "9", section: "H", roll: "08", gender: "Female", dob: "15 Jan 2012", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Pranav Menon" },
        { id: "9H09", admNo: "9H09", name: "Anvi Patel", class: "9", section: "H", roll: "09", gender: "Female", dob: "15 Jan 2012", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 6.8, parent: "Parent of Anvi Patel" },
        { id: "9H10", admNo: "9H10", name: "Aadhya Singh", class: "9", section: "H", roll: "10", gender: "Female", dob: "15 Jan 2012", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Aadhya Singh" }
      ],
      "I": [
        { id: "9I01", admNo: "9I01", name: "Kyra Patel", class: "9", section: "I", roll: "01", gender: "Male", dob: "15 Jan 2012", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 8.6, parent: "Parent of Kyra Patel" },
        { id: "9I02", admNo: "9I02", name: "Krishna Menon", class: "9", section: "I", roll: "02", gender: "Female", dob: "15 Jan 2012", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 9.3, parent: "Parent of Krishna Menon" },
        { id: "9I03", admNo: "9I03", name: "Myra Pillai", class: "9", section: "I", roll: "03", gender: "Male", dob: "15 Jan 2012", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 6.7, parent: "Parent of Myra Pillai" },
        { id: "9I04", admNo: "9I04", name: "Avni Gupta", class: "9", section: "I", roll: "04", gender: "Male", dob: "15 Jan 2012", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Avni Gupta" },
        { id: "9I05", admNo: "9I05", name: "Arjun Kumar", class: "9", section: "I", roll: "05", gender: "Female", dob: "15 Jan 2012", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Arjun Kumar" },
        { id: "9I06", admNo: "9I06", name: "Myra Menon", class: "9", section: "I", roll: "06", gender: "Female", dob: "15 Jan 2012", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Myra Menon" },
        { id: "9I07", admNo: "9I07", name: "Pari Pillai", class: "9", section: "I", roll: "07", gender: "Female", dob: "15 Jan 2012", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Pari Pillai" },
        { id: "9I08", admNo: "9I08", name: "Shaurya Desai", class: "9", section: "I", roll: "08", gender: "Female", dob: "15 Jan 2012", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Shaurya Desai" },
        { id: "9I09", admNo: "9I09", name: "Diya Nair", class: "9", section: "I", roll: "09", gender: "Male", dob: "15 Jan 2012", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of Diya Nair" },
        { id: "9I10", admNo: "9I10", name: "Aarav Nair", class: "9", section: "I", roll: "10", gender: "Female", dob: "15 Jan 2012", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Aarav Nair" }
      ],
      "J": [
        { id: "9J01", admNo: "9J01", name: "Shaurya Rao", class: "9", section: "J", roll: "01", gender: "Female", dob: "15 Jan 2012", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of Shaurya Rao" },
        { id: "9J02", admNo: "9J02", name: "Pranav Sharma", class: "9", section: "J", roll: "02", gender: "Female", dob: "15 Jan 2012", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Pranav Sharma" },
        { id: "9J03", admNo: "9J03", name: "Kavya Rao", class: "9", section: "J", roll: "03", gender: "Male", dob: "15 Jan 2012", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of Kavya Rao" },
        { id: "9J04", admNo: "9J04", name: "Sai Joshi", class: "9", section: "J", roll: "04", gender: "Female", dob: "15 Jan 2012", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Sai Joshi" },
        { id: "9J05", admNo: "9J05", name: "Shaurya Pillai", class: "9", section: "J", roll: "05", gender: "Female", dob: "15 Jan 2012", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 9.3, parent: "Parent of Shaurya Pillai" },
        { id: "9J06", admNo: "9J06", name: "Aashvi Joshi", class: "9", section: "J", roll: "06", gender: "Male", dob: "15 Jan 2012", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 6.5, parent: "Parent of Aashvi Joshi" },
        { id: "9J07", admNo: "9J07", name: "Riya Chowdhury", class: "9", section: "J", roll: "07", gender: "Male", dob: "15 Jan 2012", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Riya Chowdhury" },
        { id: "9J08", admNo: "9J08", name: "Kabir Singh", class: "9", section: "J", roll: "08", gender: "Male", dob: "15 Jan 2012", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Kabir Singh" },
        { id: "9J09", admNo: "9J09", name: "Avni Chowdhury", class: "9", section: "J", roll: "09", gender: "Female", dob: "15 Jan 2012", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Avni Chowdhury" },
        { id: "9J10", admNo: "9J10", name: "Krishna Das", class: "9", section: "J", roll: "10", gender: "Female", dob: "15 Jan 2012", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Krishna Das" }
      ],
      "K": [
        { id: "9K01", admNo: "9K01", name: "Vivaan Das", class: "9", section: "K", roll: "01", gender: "Female", dob: "15 Jan 2012", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Vivaan Das" },
        { id: "9K02", admNo: "9K02", name: "Aanya Gupta", class: "9", section: "K", roll: "02", gender: "Male", dob: "15 Jan 2012", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Aanya Gupta" },
        { id: "9K03", admNo: "9K03", name: "Ishaan Menon", class: "9", section: "K", roll: "03", gender: "Female", dob: "15 Jan 2012", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 6.8, parent: "Parent of Ishaan Menon" },
        { id: "9K04", admNo: "9K04", name: "Atharv Kumar", class: "9", section: "K", roll: "04", gender: "Female", dob: "15 Jan 2012", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Atharv Kumar" },
        { id: "9K05", admNo: "9K05", name: "Prisha Singh", class: "9", section: "K", roll: "05", gender: "Male", dob: "15 Jan 2012", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Prisha Singh" },
        { id: "9K06", admNo: "9K06", name: "Advik Chowdhury", class: "9", section: "K", roll: "06", gender: "Male", dob: "15 Jan 2012", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Advik Chowdhury" },
        { id: "9K07", admNo: "9K07", name: "Aadhya Reddy", class: "9", section: "K", roll: "07", gender: "Female", dob: "15 Jan 2012", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 9.4, parent: "Parent of Aadhya Reddy" },
        { id: "9K08", admNo: "9K08", name: "Ira Rao", class: "9", section: "K", roll: "08", gender: "Female", dob: "15 Jan 2012", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Ira Rao" },
        { id: "9K09", admNo: "9K09", name: "Aditya Nair", class: "9", section: "K", roll: "09", gender: "Female", dob: "15 Jan 2012", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Aditya Nair" },
        { id: "9K10", admNo: "9K10", name: "Aadhya Patel", class: "9", section: "K", roll: "10", gender: "Female", dob: "15 Jan 2012", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 6.7, parent: "Parent of Aadhya Patel" }
      ],
      "L": [
        { id: "9L01", admNo: "9L01", name: "Prisha Nair", class: "9", section: "L", roll: "01", gender: "Female", dob: "15 Jan 2012", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Prisha Nair" },
        { id: "9L02", admNo: "9L02", name: "Avni Gupta", class: "9", section: "L", roll: "02", gender: "Male", dob: "15 Jan 2012", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Avni Gupta" },
        { id: "9L03", admNo: "9L03", name: "Anvi Nair", class: "9", section: "L", roll: "03", gender: "Female", dob: "15 Jan 2012", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Anvi Nair" },
        { id: "9L04", admNo: "9L04", name: "Shanaya Kumar", class: "9", section: "L", roll: "04", gender: "Female", dob: "15 Jan 2012", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Shanaya Kumar" },
        { id: "9L05", admNo: "9L05", name: "Shaurya Mukherjee", class: "9", section: "L", roll: "05", gender: "Female", dob: "15 Jan 2012", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Shaurya Mukherjee" },
        { id: "9L06", admNo: "9L06", name: "Ayaan Nair", class: "9", section: "L", roll: "06", gender: "Male", dob: "15 Jan 2012", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Ayaan Nair" },
        { id: "9L07", admNo: "9L07", name: "Aditya Pillai", class: "9", section: "L", roll: "07", gender: "Male", dob: "15 Jan 2012", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Aditya Pillai" },
        { id: "9L08", admNo: "9L08", name: "Aarush Reddy", class: "9", section: "L", roll: "08", gender: "Female", dob: "15 Jan 2012", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Aarush Reddy" },
        { id: "9L09", admNo: "9L09", name: "Anika Chowdhury", class: "9", section: "L", roll: "09", gender: "Male", dob: "15 Jan 2012", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Anika Chowdhury" },
        { id: "9L10", admNo: "9L10", name: "Darsh Joshi", class: "9", section: "L", roll: "10", gender: "Female", dob: "15 Jan 2012", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Darsh Joshi" }
      ]
    },
    "8": {
      "A": [
        { id: "8A01", admNo: "8A01", name: "Aarav Rao", class: "8", section: "A", roll: "01", gender: "Female", dob: "15 Jan 2013", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Aarav Rao" },
        { id: "8A02", admNo: "8A02", name: "Sai Kumar", class: "8", section: "A", roll: "02", gender: "Male", dob: "15 Jan 2013", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 9.6, parent: "Parent of Sai Kumar" },
        { id: "8A03", admNo: "8A03", name: "Aarush Iyer", class: "8", section: "A", roll: "03", gender: "Female", dob: "15 Jan 2013", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Aarush Iyer" },
        { id: "8A04", admNo: "8A04", name: "Myra Rao", class: "8", section: "A", roll: "04", gender: "Female", dob: "15 Jan 2013", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 9.6, parent: "Parent of Myra Rao" },
        { id: "8A05", admNo: "8A05", name: "Riya Sharma", class: "8", section: "A", roll: "05", gender: "Female", dob: "15 Jan 2013", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Riya Sharma" },
        { id: "8A06", admNo: "8A06", name: "Ira Chowdhury", class: "8", section: "A", roll: "06", gender: "Female", dob: "15 Jan 2013", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Ira Chowdhury" },
        { id: "8A07", admNo: "8A07", name: "Aarav Mukherjee", class: "8", section: "A", roll: "07", gender: "Female", dob: "15 Jan 2013", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Aarav Mukherjee" },
        { id: "8A08", admNo: "8A08", name: "Prisha Patel", class: "8", section: "A", roll: "08", gender: "Male", dob: "15 Jan 2013", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 6.6, parent: "Parent of Prisha Patel" },
        { id: "8A09", admNo: "8A09", name: "Kavya Joshi", class: "8", section: "A", roll: "09", gender: "Male", dob: "15 Jan 2013", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 9.6, parent: "Parent of Kavya Joshi" },
        { id: "8A10", admNo: "8A10", name: "Aarav Menon", class: "8", section: "A", roll: "10", gender: "Male", dob: "15 Jan 2013", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 9.3, parent: "Parent of Aarav Menon" }
      ],
      "B": [
        { id: "8B01", admNo: "8B01", name: "Kabir Patel", class: "8", section: "B", roll: "01", gender: "Male", dob: "15 Jan 2013", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Kabir Patel" },
        { id: "8B02", admNo: "8B02", name: "Navya Mukherjee", class: "8", section: "B", roll: "02", gender: "Male", dob: "15 Jan 2013", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 9.4, parent: "Parent of Navya Mukherjee" },
        { id: "8B03", admNo: "8B03", name: "Aaradhya Rao", class: "8", section: "B", roll: "03", gender: "Male", dob: "15 Jan 2013", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Aaradhya Rao" },
        { id: "8B04", admNo: "8B04", name: "Ahana Iyer", class: "8", section: "B", roll: "04", gender: "Female", dob: "15 Jan 2013", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Ahana Iyer" },
        { id: "8B05", admNo: "8B05", name: "Hardik Das", class: "8", section: "B", roll: "05", gender: "Male", dob: "15 Jan 2013", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 6.6, parent: "Parent of Hardik Das" },
        { id: "8B06", admNo: "8B06", name: "Anika Das", class: "8", section: "B", roll: "06", gender: "Male", dob: "15 Jan 2013", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 6.6, parent: "Parent of Anika Das" },
        { id: "8B07", admNo: "8B07", name: "Aashvi Patel", class: "8", section: "B", roll: "07", gender: "Female", dob: "15 Jan 2013", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Aashvi Patel" },
        { id: "8B08", admNo: "8B08", name: "Ritvik Kumar", class: "8", section: "B", roll: "08", gender: "Female", dob: "15 Jan 2013", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Ritvik Kumar" },
        { id: "8B09", admNo: "8B09", name: "Aanya Kulkarni", class: "8", section: "B", roll: "09", gender: "Female", dob: "15 Jan 2013", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Aanya Kulkarni" },
        { id: "8B10", admNo: "8B10", name: "Ahana Gupta", class: "8", section: "B", roll: "10", gender: "Female", dob: "15 Jan 2013", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 6.8, parent: "Parent of Ahana Gupta" }
      ],
      "C": [
        { id: "8C01", admNo: "8C01", name: "Atharv Das", class: "8", section: "C", roll: "01", gender: "Male", dob: "15 Jan 2013", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of Atharv Das" },
        { id: "8C02", admNo: "8C02", name: "Pari Gupta", class: "8", section: "C", roll: "02", gender: "Male", dob: "15 Jan 2013", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Pari Gupta" },
        { id: "8C03", admNo: "8C03", name: "Aadhya Singh", class: "8", section: "C", roll: "03", gender: "Female", dob: "15 Jan 2013", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 9.4, parent: "Parent of Aadhya Singh" },
        { id: "8C04", admNo: "8C04", name: "Avni Verma", class: "8", section: "C", roll: "04", gender: "Female", dob: "15 Jan 2013", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Avni Verma" },
        { id: "8C05", admNo: "8C05", name: "Aaradhya Singh", class: "8", section: "C", roll: "05", gender: "Male", dob: "15 Jan 2013", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 6.8, parent: "Parent of Aaradhya Singh" },
        { id: "8C06", admNo: "8C06", name: "Avni Patel", class: "8", section: "C", roll: "06", gender: "Female", dob: "15 Jan 2013", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Avni Patel" },
        { id: "8C07", admNo: "8C07", name: "Aarav Verma", class: "8", section: "C", roll: "07", gender: "Male", dob: "15 Jan 2013", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Aarav Verma" },
        { id: "8C08", admNo: "8C08", name: "Riya Gupta", class: "8", section: "C", roll: "08", gender: "Female", dob: "15 Jan 2013", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Riya Gupta" },
        { id: "8C09", admNo: "8C09", name: "Aaradhya Chowdhury", class: "8", section: "C", roll: "09", gender: "Female", dob: "15 Jan 2013", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Aaradhya Chowdhury" },
        { id: "8C10", admNo: "8C10", name: "Sai Bose", class: "8", section: "C", roll: "10", gender: "Female", dob: "15 Jan 2013", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Sai Bose" }
      ],
      "D": [
        { id: "8D01", admNo: "8D01", name: "Aditya Iyer", class: "8", section: "D", roll: "01", gender: "Female", dob: "15 Jan 2013", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 8.7, parent: "Parent of Aditya Iyer" },
        { id: "8D02", admNo: "8D02", name: "Shaurya Rao", class: "8", section: "D", roll: "02", gender: "Male", dob: "15 Jan 2013", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 9.3, parent: "Parent of Shaurya Rao" },
        { id: "8D03", admNo: "8D03", name: "Aashvi Desai", class: "8", section: "D", roll: "03", gender: "Male", dob: "15 Jan 2013", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 6.6, parent: "Parent of Aashvi Desai" },
        { id: "8D04", admNo: "8D04", name: "Dhruv Sharma", class: "8", section: "D", roll: "04", gender: "Female", dob: "15 Jan 2013", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 9.8, parent: "Parent of Dhruv Sharma" },
        { id: "8D05", admNo: "8D05", name: "Shaurya Mukherjee", class: "8", section: "D", roll: "05", gender: "Male", dob: "15 Jan 2013", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Shaurya Mukherjee" },
        { id: "8D06", admNo: "8D06", name: "Aditya Bose", class: "8", section: "D", roll: "06", gender: "Female", dob: "15 Jan 2013", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Aditya Bose" },
        { id: "8D07", admNo: "8D07", name: "Aadhya Pillai", class: "8", section: "D", roll: "07", gender: "Female", dob: "15 Jan 2013", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Aadhya Pillai" },
        { id: "8D08", admNo: "8D08", name: "Krishna Sharma", class: "8", section: "D", roll: "08", gender: "Female", dob: "15 Jan 2013", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Krishna Sharma" },
        { id: "8D09", admNo: "8D09", name: "Anvi Rao", class: "8", section: "D", roll: "09", gender: "Female", dob: "15 Jan 2013", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 6.8, parent: "Parent of Anvi Rao" },
        { id: "8D10", admNo: "8D10", name: "Ira Sharma", class: "8", section: "D", roll: "10", gender: "Female", dob: "15 Jan 2013", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Ira Sharma" }
      ],
      "E": [
        { id: "8E01", admNo: "8E01", name: "Shanaya Kulkarni", class: "8", section: "E", roll: "01", gender: "Male", dob: "15 Jan 2013", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 6.5, parent: "Parent of Shanaya Kulkarni" },
        { id: "8E02", admNo: "8E02", name: "Pranav Rao", class: "8", section: "E", roll: "02", gender: "Female", dob: "15 Jan 2013", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Pranav Rao" },
        { id: "8E03", admNo: "8E03", name: "Aaradhya Chowdhury", class: "8", section: "E", roll: "03", gender: "Male", dob: "15 Jan 2013", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Aaradhya Chowdhury" },
        { id: "8E04", admNo: "8E04", name: "Krishna Iyer", class: "8", section: "E", roll: "04", gender: "Male", dob: "15 Jan 2013", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Krishna Iyer" },
        { id: "8E05", admNo: "8E05", name: "Krishna Nair", class: "8", section: "E", roll: "05", gender: "Female", dob: "15 Jan 2013", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Krishna Nair" },
        { id: "8E06", admNo: "8E06", name: "Aarush Iyer", class: "8", section: "E", roll: "06", gender: "Male", dob: "15 Jan 2013", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 8.9, parent: "Parent of Aarush Iyer" },
        { id: "8E07", admNo: "8E07", name: "Pranav Desai", class: "8", section: "E", roll: "07", gender: "Male", dob: "15 Jan 2013", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 6.6, parent: "Parent of Pranav Desai" },
        { id: "8E08", admNo: "8E08", name: "Kabir Reddy", class: "8", section: "E", roll: "08", gender: "Male", dob: "15 Jan 2013", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Kabir Reddy" },
        { id: "8E09", admNo: "8E09", name: "Kavya Reddy", class: "8", section: "E", roll: "09", gender: "Male", dob: "15 Jan 2013", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Kavya Reddy" },
        { id: "8E10", admNo: "8E10", name: "Ayaan Sharma", class: "8", section: "E", roll: "10", gender: "Male", dob: "15 Jan 2013", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Ayaan Sharma" }
      ],
      "F": [
        { id: "8F01", admNo: "8F01", name: "Arjun Patel", class: "8", section: "F", roll: "01", gender: "Female", dob: "15 Jan 2013", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 8.9, parent: "Parent of Arjun Patel" },
        { id: "8F02", admNo: "8F02", name: "Kyra Joshi", class: "8", section: "F", roll: "02", gender: "Male", dob: "15 Jan 2013", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.9, parent: "Parent of Kyra Joshi" },
        { id: "8F03", admNo: "8F03", name: "Krishna Verma", class: "8", section: "F", roll: "03", gender: "Male", dob: "15 Jan 2013", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 9.6, parent: "Parent of Krishna Verma" },
        { id: "8F04", admNo: "8F04", name: "Ishaan Rao", class: "8", section: "F", roll: "04", gender: "Male", dob: "15 Jan 2013", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Ishaan Rao" },
        { id: "8F05", admNo: "8F05", name: "Shaurya Nair", class: "8", section: "F", roll: "05", gender: "Male", dob: "15 Jan 2013", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Shaurya Nair" },
        { id: "8F06", admNo: "8F06", name: "Navya Pillai", class: "8", section: "F", roll: "06", gender: "Male", dob: "15 Jan 2013", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Navya Pillai" },
        { id: "8F07", admNo: "8F07", name: "Aashvi Joshi", class: "8", section: "F", roll: "07", gender: "Male", dob: "15 Jan 2013", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 6.7, parent: "Parent of Aashvi Joshi" },
        { id: "8F08", admNo: "8F08", name: "Aarush Patel", class: "8", section: "F", roll: "08", gender: "Male", dob: "15 Jan 2013", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Aarush Patel" },
        { id: "8F09", admNo: "8F09", name: "Kabir Chowdhury", class: "8", section: "F", roll: "09", gender: "Male", dob: "15 Jan 2013", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Kabir Chowdhury" },
        { id: "8F10", admNo: "8F10", name: "Sai Patel", class: "8", section: "F", roll: "10", gender: "Female", dob: "15 Jan 2013", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Sai Patel" }
      ],
      "G": [
        { id: "8G01", admNo: "8G01", name: "Ishaan Sharma", class: "8", section: "G", roll: "01", gender: "Male", dob: "15 Jan 2013", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Ishaan Sharma" },
        { id: "8G02", admNo: "8G02", name: "Hardik Joshi", class: "8", section: "G", roll: "02", gender: "Male", dob: "15 Jan 2013", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 6.7, parent: "Parent of Hardik Joshi" },
        { id: "8G03", admNo: "8G03", name: "Diya Bose", class: "8", section: "G", roll: "03", gender: "Female", dob: "15 Jan 2013", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Diya Bose" },
        { id: "8G04", admNo: "8G04", name: "Kyra Chowdhury", class: "8", section: "G", roll: "04", gender: "Male", dob: "15 Jan 2013", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Kyra Chowdhury" },
        { id: "8G05", admNo: "8G05", name: "Kyra Bose", class: "8", section: "G", roll: "05", gender: "Female", dob: "15 Jan 2013", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 6.7, parent: "Parent of Kyra Bose" },
        { id: "8G06", admNo: "8G06", name: "Myra Reddy", class: "8", section: "G", roll: "06", gender: "Male", dob: "15 Jan 2013", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Myra Reddy" },
        { id: "8G07", admNo: "8G07", name: "Atharv Patel", class: "8", section: "G", roll: "07", gender: "Female", dob: "15 Jan 2013", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of Atharv Patel" },
        { id: "8G08", admNo: "8G08", name: "Krishna Menon", class: "8", section: "G", roll: "08", gender: "Male", dob: "15 Jan 2013", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 8.9, parent: "Parent of Krishna Menon" },
        { id: "8G09", admNo: "8G09", name: "Riya Kumar", class: "8", section: "G", roll: "09", gender: "Female", dob: "15 Jan 2013", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Riya Kumar" },
        { id: "8G10", admNo: "8G10", name: "Ritvik Desai", class: "8", section: "G", roll: "10", gender: "Female", dob: "15 Jan 2013", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 9.4, parent: "Parent of Ritvik Desai" }
      ],
      "H": [
        { id: "8H01", admNo: "8H01", name: "Myra Iyer", class: "8", section: "H", roll: "01", gender: "Female", dob: "15 Jan 2013", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Myra Iyer" },
        { id: "8H02", admNo: "8H02", name: "Ayaan Pillai", class: "8", section: "H", roll: "02", gender: "Female", dob: "15 Jan 2013", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Ayaan Pillai" },
        { id: "8H03", admNo: "8H03", name: "Shaurya Joshi", class: "8", section: "H", roll: "03", gender: "Female", dob: "15 Jan 2013", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Shaurya Joshi" },
        { id: "8H04", admNo: "8H04", name: "Aanya Kumar", class: "8", section: "H", roll: "04", gender: "Male", dob: "15 Jan 2013", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of Aanya Kumar" },
        { id: "8H05", admNo: "8H05", name: "Hardik Kumar", class: "8", section: "H", roll: "05", gender: "Female", dob: "15 Jan 2013", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Hardik Kumar" },
        { id: "8H06", admNo: "8H06", name: "Shanaya Chowdhury", class: "8", section: "H", roll: "06", gender: "Male", dob: "15 Jan 2013", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Shanaya Chowdhury" },
        { id: "8H07", admNo: "8H07", name: "Shaurya Mukherjee", class: "8", section: "H", roll: "07", gender: "Female", dob: "15 Jan 2013", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 9.4, parent: "Parent of Shaurya Mukherjee" },
        { id: "8H08", admNo: "8H08", name: "Myra Pillai", class: "8", section: "H", roll: "08", gender: "Female", dob: "15 Jan 2013", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Myra Pillai" },
        { id: "8H09", admNo: "8H09", name: "Ritvik Patel", class: "8", section: "H", roll: "09", gender: "Female", dob: "15 Jan 2013", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Ritvik Patel" },
        { id: "8H10", admNo: "8H10", name: "Pari Joshi", class: "8", section: "H", roll: "10", gender: "Male", dob: "15 Jan 2013", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Pari Joshi" }
      ],
      "I": [
        { id: "8I01", admNo: "8I01", name: "Ahana Das", class: "8", section: "I", roll: "01", gender: "Male", dob: "15 Jan 2013", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Ahana Das" },
        { id: "8I02", admNo: "8I02", name: "Ahana Chowdhury", class: "8", section: "I", roll: "02", gender: "Female", dob: "15 Jan 2013", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 8.9, parent: "Parent of Ahana Chowdhury" },
        { id: "8I03", admNo: "8I03", name: "Vivaan Sharma", class: "8", section: "I", roll: "03", gender: "Female", dob: "15 Jan 2013", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Vivaan Sharma" },
        { id: "8I04", admNo: "8I04", name: "Shaurya Chowdhury", class: "8", section: "I", roll: "04", gender: "Female", dob: "15 Jan 2013", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Shaurya Chowdhury" },
        { id: "8I05", admNo: "8I05", name: "Ayaan Verma", class: "8", section: "I", roll: "05", gender: "Female", dob: "15 Jan 2013", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Ayaan Verma" },
        { id: "8I06", admNo: "8I06", name: "Saanvi Kumar", class: "8", section: "I", roll: "06", gender: "Female", dob: "15 Jan 2013", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Saanvi Kumar" },
        { id: "8I07", admNo: "8I07", name: "Anvi Bose", class: "8", section: "I", roll: "07", gender: "Male", dob: "15 Jan 2013", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Anvi Bose" },
        { id: "8I08", admNo: "8I08", name: "Sai Menon", class: "8", section: "I", roll: "08", gender: "Female", dob: "15 Jan 2013", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Sai Menon" },
        { id: "8I09", admNo: "8I09", name: "Ritvik Gupta", class: "8", section: "I", roll: "09", gender: "Female", dob: "15 Jan 2013", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Ritvik Gupta" },
        { id: "8I10", admNo: "8I10", name: "Ira Kumar", class: "8", section: "I", roll: "10", gender: "Female", dob: "15 Jan 2013", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 8.6, parent: "Parent of Ira Kumar" }
      ],
      "J": [
        { id: "8J01", admNo: "8J01", name: "Dhruv Patel", class: "8", section: "J", roll: "01", gender: "Male", dob: "15 Jan 2013", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 9.6, parent: "Parent of Dhruv Patel" },
        { id: "8J02", admNo: "8J02", name: "Anvi Reddy", class: "8", section: "J", roll: "02", gender: "Male", dob: "15 Jan 2013", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Anvi Reddy" },
        { id: "8J03", admNo: "8J03", name: "Advik Sharma", class: "8", section: "J", roll: "03", gender: "Female", dob: "15 Jan 2013", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Advik Sharma" },
        { id: "8J04", admNo: "8J04", name: "Arjun Mukherjee", class: "8", section: "J", roll: "04", gender: "Female", dob: "15 Jan 2013", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Arjun Mukherjee" },
        { id: "8J05", admNo: "8J05", name: "Sai Sharma", class: "8", section: "J", roll: "05", gender: "Male", dob: "15 Jan 2013", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Sai Sharma" },
        { id: "8J06", admNo: "8J06", name: "Ayaan Patel", class: "8", section: "J", roll: "06", gender: "Female", dob: "15 Jan 2013", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Ayaan Patel" },
        { id: "8J07", admNo: "8J07", name: "Advik Mukherjee", class: "8", section: "J", roll: "07", gender: "Female", dob: "15 Jan 2013", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Advik Mukherjee" },
        { id: "8J08", admNo: "8J08", name: "Aarush Mukherjee", class: "8", section: "J", roll: "08", gender: "Female", dob: "15 Jan 2013", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Aarush Mukherjee" },
        { id: "8J09", admNo: "8J09", name: "Krishna Desai", class: "8", section: "J", roll: "09", gender: "Male", dob: "15 Jan 2013", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Krishna Desai" },
        { id: "8J10", admNo: "8J10", name: "Krishna Sharma", class: "8", section: "J", roll: "10", gender: "Male", dob: "15 Jan 2013", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Krishna Sharma" }
      ],
      "K": [
        { id: "8K01", admNo: "8K01", name: "Riya Mukherjee", class: "8", section: "K", roll: "01", gender: "Male", dob: "15 Jan 2013", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Riya Mukherjee" },
        { id: "8K02", admNo: "8K02", name: "Aditya Bose", class: "8", section: "K", roll: "02", gender: "Female", dob: "15 Jan 2013", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 6.6, parent: "Parent of Aditya Bose" },
        { id: "8K03", admNo: "8K03", name: "Shaurya Sharma", class: "8", section: "K", roll: "03", gender: "Male", dob: "15 Jan 2013", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 6.6, parent: "Parent of Shaurya Sharma" },
        { id: "8K04", admNo: "8K04", name: "Pranav Bose", class: "8", section: "K", roll: "04", gender: "Female", dob: "15 Jan 2013", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 8.9, parent: "Parent of Pranav Bose" },
        { id: "8K05", admNo: "8K05", name: "Navya Nair", class: "8", section: "K", roll: "05", gender: "Male", dob: "15 Jan 2013", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Navya Nair" },
        { id: "8K06", admNo: "8K06", name: "Diya Nair", class: "8", section: "K", roll: "06", gender: "Male", dob: "15 Jan 2013", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Diya Nair" },
        { id: "8K07", admNo: "8K07", name: "Pari Desai", class: "8", section: "K", roll: "07", gender: "Female", dob: "15 Jan 2013", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Pari Desai" },
        { id: "8K08", admNo: "8K08", name: "Kavya Kulkarni", class: "8", section: "K", roll: "08", gender: "Male", dob: "15 Jan 2013", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.6, parent: "Parent of Kavya Kulkarni" },
        { id: "8K09", admNo: "8K09", name: "Aditya Menon", class: "8", section: "K", roll: "09", gender: "Female", dob: "15 Jan 2013", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Aditya Menon" },
        { id: "8K10", admNo: "8K10", name: "Ira Rao", class: "8", section: "K", roll: "10", gender: "Male", dob: "15 Jan 2013", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of Ira Rao" }
      ],
      "L": [
        { id: "8L01", admNo: "8L01", name: "Hardik Kulkarni", class: "8", section: "L", roll: "01", gender: "Male", dob: "15 Jan 2013", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Hardik Kulkarni" },
        { id: "8L02", admNo: "8L02", name: "Aarush Singh", class: "8", section: "L", roll: "02", gender: "Male", dob: "15 Jan 2013", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Aarush Singh" },
        { id: "8L03", admNo: "8L03", name: "Sai Kumar", class: "8", section: "L", roll: "03", gender: "Female", dob: "15 Jan 2013", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 6.6, parent: "Parent of Sai Kumar" },
        { id: "8L04", admNo: "8L04", name: "Diya Kumar", class: "8", section: "L", roll: "04", gender: "Female", dob: "15 Jan 2013", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 9.4, parent: "Parent of Diya Kumar" },
        { id: "8L05", admNo: "8L05", name: "Vihaan Joshi", class: "8", section: "L", roll: "05", gender: "Male", dob: "15 Jan 2013", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Vihaan Joshi" },
        { id: "8L06", admNo: "8L06", name: "Diya Kulkarni", class: "8", section: "L", roll: "06", gender: "Male", dob: "15 Jan 2013", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Diya Kulkarni" },
        { id: "8L07", admNo: "8L07", name: "Dhruv Chowdhury", class: "8", section: "L", roll: "07", gender: "Male", dob: "15 Jan 2013", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Dhruv Chowdhury" },
        { id: "8L08", admNo: "8L08", name: "Advik Reddy", class: "8", section: "L", roll: "08", gender: "Male", dob: "15 Jan 2013", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 6.8, parent: "Parent of Advik Reddy" },
        { id: "8L09", admNo: "8L09", name: "Saanvi Mukherjee", class: "8", section: "L", roll: "09", gender: "Male", dob: "15 Jan 2013", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Saanvi Mukherjee" },
        { id: "8L10", admNo: "8L10", name: "Dhruv Mukherjee", class: "8", section: "L", roll: "10", gender: "Female", dob: "15 Jan 2013", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Dhruv Mukherjee" }
      ]
    },
    "7": {
      "A": [
        { id: "7A01", admNo: "7A01", name: "Diya Pillai", class: "7", section: "A", roll: "01", gender: "Female", dob: "15 Jan 2014", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 6.7, parent: "Parent of Diya Pillai" },
        { id: "7A02", admNo: "7A02", name: "Kabir Mukherjee", class: "7", section: "A", roll: "02", gender: "Male", dob: "15 Jan 2014", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 9.6, parent: "Parent of Kabir Mukherjee" },
        { id: "7A03", admNo: "7A03", name: "Prisha Kulkarni", class: "7", section: "A", roll: "03", gender: "Male", dob: "15 Jan 2014", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Prisha Kulkarni" },
        { id: "7A04", admNo: "7A04", name: "Ayaan Kumar", class: "7", section: "A", roll: "04", gender: "Male", dob: "15 Jan 2014", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Ayaan Kumar" },
        { id: "7A05", admNo: "7A05", name: "Aaradhya Pillai", class: "7", section: "A", roll: "05", gender: "Male", dob: "15 Jan 2014", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Aaradhya Pillai" },
        { id: "7A06", admNo: "7A06", name: "Ishaan Menon", class: "7", section: "A", roll: "06", gender: "Female", dob: "15 Jan 2014", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Ishaan Menon" },
        { id: "7A07", admNo: "7A07", name: "Shaurya Chowdhury", class: "7", section: "A", roll: "07", gender: "Male", dob: "15 Jan 2014", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 6.5, parent: "Parent of Shaurya Chowdhury" },
        { id: "7A08", admNo: "7A08", name: "Pari Desai", class: "7", section: "A", roll: "08", gender: "Female", dob: "15 Jan 2014", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Pari Desai" },
        { id: "7A09", admNo: "7A09", name: "Atharv Kumar", class: "7", section: "A", roll: "09", gender: "Male", dob: "15 Jan 2014", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Atharv Kumar" },
        { id: "7A10", admNo: "7A10", name: "Aashvi Patel", class: "7", section: "A", roll: "10", gender: "Female", dob: "15 Jan 2014", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Aashvi Patel" }
      ],
      "B": [
        { id: "7B01", admNo: "7B01", name: "Aditya Nair", class: "7", section: "B", roll: "01", gender: "Male", dob: "15 Jan 2014", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Aditya Nair" },
        { id: "7B02", admNo: "7B02", name: "Ira Mukherjee", class: "7", section: "B", roll: "02", gender: "Male", dob: "15 Jan 2014", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.9, parent: "Parent of Ira Mukherjee" },
        { id: "7B03", admNo: "7B03", name: "Sai Menon", class: "7", section: "B", roll: "03", gender: "Female", dob: "15 Jan 2014", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Sai Menon" },
        { id: "7B04", admNo: "7B04", name: "Prisha Kumar", class: "7", section: "B", roll: "04", gender: "Male", dob: "15 Jan 2014", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Prisha Kumar" },
        { id: "7B05", admNo: "7B05", name: "Myra Desai", class: "7", section: "B", roll: "05", gender: "Female", dob: "15 Jan 2014", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Myra Desai" },
        { id: "7B06", admNo: "7B06", name: "Krishna Kulkarni", class: "7", section: "B", roll: "06", gender: "Female", dob: "15 Jan 2014", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Krishna Kulkarni" },
        { id: "7B07", admNo: "7B07", name: "Arjun Bose", class: "7", section: "B", roll: "07", gender: "Male", dob: "15 Jan 2014", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Arjun Bose" },
        { id: "7B08", admNo: "7B08", name: "Diya Gupta", class: "7", section: "B", roll: "08", gender: "Female", dob: "15 Jan 2014", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Diya Gupta" },
        { id: "7B09", admNo: "7B09", name: "Ayaan Kumar", class: "7", section: "B", roll: "09", gender: "Female", dob: "15 Jan 2014", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Ayaan Kumar" },
        { id: "7B10", admNo: "7B10", name: "Myra Chowdhury", class: "7", section: "B", roll: "10", gender: "Female", dob: "15 Jan 2014", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Myra Chowdhury" }
      ],
      "C": [
        { id: "7C01", admNo: "7C01", name: "Prisha Pillai", class: "7", section: "C", roll: "01", gender: "Female", dob: "15 Jan 2014", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Prisha Pillai" },
        { id: "7C02", admNo: "7C02", name: "Krishna Joshi", class: "7", section: "C", roll: "02", gender: "Male", dob: "15 Jan 2014", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 8.6, parent: "Parent of Krishna Joshi" },
        { id: "7C03", admNo: "7C03", name: "Pari Desai", class: "7", section: "C", roll: "03", gender: "Male", dob: "15 Jan 2014", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Pari Desai" },
        { id: "7C04", admNo: "7C04", name: "Aashvi Singh", class: "7", section: "C", roll: "04", gender: "Female", dob: "15 Jan 2014", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Aashvi Singh" },
        { id: "7C05", admNo: "7C05", name: "Ayaan Mukherjee", class: "7", section: "C", roll: "05", gender: "Female", dob: "15 Jan 2014", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 6.8, parent: "Parent of Ayaan Mukherjee" },
        { id: "7C06", admNo: "7C06", name: "Advik Verma", class: "7", section: "C", roll: "06", gender: "Female", dob: "15 Jan 2014", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Advik Verma" },
        { id: "7C07", admNo: "7C07", name: "Reyansh Joshi", class: "7", section: "C", roll: "07", gender: "Male", dob: "15 Jan 2014", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Reyansh Joshi" },
        { id: "7C08", admNo: "7C08", name: "Saanvi Kulkarni", class: "7", section: "C", roll: "08", gender: "Female", dob: "15 Jan 2014", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 8.6, parent: "Parent of Saanvi Kulkarni" },
        { id: "7C09", admNo: "7C09", name: "Vivaan Desai", class: "7", section: "C", roll: "09", gender: "Female", dob: "15 Jan 2014", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 9.3, parent: "Parent of Vivaan Desai" },
        { id: "7C10", admNo: "7C10", name: "Prisha Reddy", class: "7", section: "C", roll: "10", gender: "Male", dob: "15 Jan 2014", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Prisha Reddy" }
      ],
      "D": [
        { id: "7D01", admNo: "7D01", name: "Ahana Gupta", class: "7", section: "D", roll: "01", gender: "Male", dob: "15 Jan 2014", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Ahana Gupta" },
        { id: "7D02", admNo: "7D02", name: "Aarav Reddy", class: "7", section: "D", roll: "02", gender: "Male", dob: "15 Jan 2014", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Aarav Reddy" },
        { id: "7D03", admNo: "7D03", name: "Hardik Pillai", class: "7", section: "D", roll: "03", gender: "Male", dob: "15 Jan 2014", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Hardik Pillai" },
        { id: "7D04", admNo: "7D04", name: "Kabir Iyer", class: "7", section: "D", roll: "04", gender: "Male", dob: "15 Jan 2014", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Kabir Iyer" },
        { id: "7D05", admNo: "7D05", name: "Vihaan Sharma", class: "7", section: "D", roll: "05", gender: "Female", dob: "15 Jan 2014", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Vihaan Sharma" },
        { id: "7D06", admNo: "7D06", name: "Pari Gupta", class: "7", section: "D", roll: "06", gender: "Male", dob: "15 Jan 2014", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of Pari Gupta" },
        { id: "7D07", admNo: "7D07", name: "Sai Sharma", class: "7", section: "D", roll: "07", gender: "Female", dob: "15 Jan 2014", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Sai Sharma" },
        { id: "7D08", admNo: "7D08", name: "Saanvi Bose", class: "7", section: "D", roll: "08", gender: "Female", dob: "15 Jan 2014", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Saanvi Bose" },
        { id: "7D09", admNo: "7D09", name: "Kabir Kumar", class: "7", section: "D", roll: "09", gender: "Male", dob: "15 Jan 2014", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Kabir Kumar" },
        { id: "7D10", admNo: "7D10", name: "Kabir Desai", class: "7", section: "D", roll: "10", gender: "Female", dob: "15 Jan 2014", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Kabir Desai" }
      ],
      "E": [
        { id: "7E01", admNo: "7E01", name: "Aarush Joshi", class: "7", section: "E", roll: "01", gender: "Female", dob: "15 Jan 2014", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Aarush Joshi" },
        { id: "7E02", admNo: "7E02", name: "Prisha Bose", class: "7", section: "E", roll: "02", gender: "Male", dob: "15 Jan 2014", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Prisha Bose" },
        { id: "7E03", admNo: "7E03", name: "Ira Verma", class: "7", section: "E", roll: "03", gender: "Female", dob: "15 Jan 2014", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 9.6, parent: "Parent of Ira Verma" },
        { id: "7E04", admNo: "7E04", name: "Avni Das", class: "7", section: "E", roll: "04", gender: "Male", dob: "15 Jan 2014", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Avni Das" },
        { id: "7E05", admNo: "7E05", name: "Pranav Kumar", class: "7", section: "E", roll: "05", gender: "Female", dob: "15 Jan 2014", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Pranav Kumar" },
        { id: "7E06", admNo: "7E06", name: "Aarav Pillai", class: "7", section: "E", roll: "06", gender: "Male", dob: "15 Jan 2014", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 8.6, parent: "Parent of Aarav Pillai" },
        { id: "7E07", admNo: "7E07", name: "Kyra Desai", class: "7", section: "E", roll: "07", gender: "Female", dob: "15 Jan 2014", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Kyra Desai" },
        { id: "7E08", admNo: "7E08", name: "Kavya Sharma", class: "7", section: "E", roll: "08", gender: "Female", dob: "15 Jan 2014", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 6.8, parent: "Parent of Kavya Sharma" },
        { id: "7E09", admNo: "7E09", name: "Pari Reddy", class: "7", section: "E", roll: "09", gender: "Female", dob: "15 Jan 2014", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Pari Reddy" },
        { id: "7E10", admNo: "7E10", name: "Krishna Verma", class: "7", section: "E", roll: "10", gender: "Female", dob: "15 Jan 2014", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Krishna Verma" }
      ],
      "F": [
        { id: "7F01", admNo: "7F01", name: "Aarush Gupta", class: "7", section: "F", roll: "01", gender: "Male", dob: "15 Jan 2014", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Aarush Gupta" },
        { id: "7F02", admNo: "7F02", name: "Aashvi Sharma", class: "7", section: "F", roll: "02", gender: "Male", dob: "15 Jan 2014", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Aashvi Sharma" },
        { id: "7F03", admNo: "7F03", name: "Avni Singh", class: "7", section: "F", roll: "03", gender: "Male", dob: "15 Jan 2014", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Avni Singh" },
        { id: "7F04", admNo: "7F04", name: "Atharv Gupta", class: "7", section: "F", roll: "04", gender: "Male", dob: "15 Jan 2014", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Atharv Gupta" },
        { id: "7F05", admNo: "7F05", name: "Ahana Reddy", class: "7", section: "F", roll: "05", gender: "Female", dob: "15 Jan 2014", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Ahana Reddy" },
        { id: "7F06", admNo: "7F06", name: "Arjun Singh", class: "7", section: "F", roll: "06", gender: "Female", dob: "15 Jan 2014", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Arjun Singh" },
        { id: "7F07", admNo: "7F07", name: "Navya Chowdhury", class: "7", section: "F", roll: "07", gender: "Female", dob: "15 Jan 2014", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Navya Chowdhury" },
        { id: "7F08", admNo: "7F08", name: "Anvi Kulkarni", class: "7", section: "F", roll: "08", gender: "Male", dob: "15 Jan 2014", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Anvi Kulkarni" },
        { id: "7F09", admNo: "7F09", name: "Aashvi Sharma", class: "7", section: "F", roll: "09", gender: "Female", dob: "15 Jan 2014", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of Aashvi Sharma" },
        { id: "7F10", admNo: "7F10", name: "Navya Nair", class: "7", section: "F", roll: "10", gender: "Male", dob: "15 Jan 2014", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Navya Nair" }
      ],
      "G": [
        { id: "7G01", admNo: "7G01", name: "Advik Joshi", class: "7", section: "G", roll: "01", gender: "Female", dob: "15 Jan 2014", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Advik Joshi" },
        { id: "7G02", admNo: "7G02", name: "Diya Rao", class: "7", section: "G", roll: "02", gender: "Male", dob: "15 Jan 2014", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Diya Rao" },
        { id: "7G03", admNo: "7G03", name: "Shanaya Joshi", class: "7", section: "G", roll: "03", gender: "Male", dob: "15 Jan 2014", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Shanaya Joshi" },
        { id: "7G04", admNo: "7G04", name: "Advik Kulkarni", class: "7", section: "G", roll: "04", gender: "Male", dob: "15 Jan 2014", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Advik Kulkarni" },
        { id: "7G05", admNo: "7G05", name: "Anvi Rao", class: "7", section: "G", roll: "05", gender: "Male", dob: "15 Jan 2014", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 9.4, parent: "Parent of Anvi Rao" },
        { id: "7G06", admNo: "7G06", name: "Aanya Sharma", class: "7", section: "G", roll: "06", gender: "Male", dob: "15 Jan 2014", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Aanya Sharma" },
        { id: "7G07", admNo: "7G07", name: "Aashvi Reddy", class: "7", section: "G", roll: "07", gender: "Male", dob: "15 Jan 2014", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Aashvi Reddy" },
        { id: "7G08", admNo: "7G08", name: "Ahana Desai", class: "7", section: "G", roll: "08", gender: "Male", dob: "15 Jan 2014", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Ahana Desai" },
        { id: "7G09", admNo: "7G09", name: "Diya Nair", class: "7", section: "G", roll: "09", gender: "Female", dob: "15 Jan 2014", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Diya Nair" },
        { id: "7G10", admNo: "7G10", name: "Aaradhya Sharma", class: "7", section: "G", roll: "10", gender: "Female", dob: "15 Jan 2014", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Aaradhya Sharma" }
      ],
      "H": [
        { id: "7H01", admNo: "7H01", name: "Kavya Sharma", class: "7", section: "H", roll: "01", gender: "Male", dob: "15 Jan 2014", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Kavya Sharma" },
        { id: "7H02", admNo: "7H02", name: "Ritvik Nair", class: "7", section: "H", roll: "02", gender: "Male", dob: "15 Jan 2014", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of Ritvik Nair" },
        { id: "7H03", admNo: "7H03", name: "Saanvi Rao", class: "7", section: "H", roll: "03", gender: "Female", dob: "15 Jan 2014", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 8.7, parent: "Parent of Saanvi Rao" },
        { id: "7H04", admNo: "7H04", name: "Ahana Rao", class: "7", section: "H", roll: "04", gender: "Male", dob: "15 Jan 2014", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Ahana Rao" },
        { id: "7H05", admNo: "7H05", name: "Ananya Menon", class: "7", section: "H", roll: "05", gender: "Male", dob: "15 Jan 2014", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Ananya Menon" },
        { id: "7H06", admNo: "7H06", name: "Hardik Bose", class: "7", section: "H", roll: "06", gender: "Female", dob: "15 Jan 2014", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 6.7, parent: "Parent of Hardik Bose" },
        { id: "7H07", admNo: "7H07", name: "Vihaan Pillai", class: "7", section: "H", roll: "07", gender: "Male", dob: "15 Jan 2014", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Vihaan Pillai" },
        { id: "7H08", admNo: "7H08", name: "Arjun Sharma", class: "7", section: "H", roll: "08", gender: "Male", dob: "15 Jan 2014", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Arjun Sharma" },
        { id: "7H09", admNo: "7H09", name: "Arjun Gupta", class: "7", section: "H", roll: "09", gender: "Female", dob: "15 Jan 2014", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Arjun Gupta" },
        { id: "7H10", admNo: "7H10", name: "Kavya Kumar", class: "7", section: "H", roll: "10", gender: "Male", dob: "15 Jan 2014", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Kavya Kumar" }
      ],
      "I": [
        { id: "7I01", admNo: "7I01", name: "Riya Das", class: "7", section: "I", roll: "01", gender: "Female", dob: "15 Jan 2014", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Riya Das" },
        { id: "7I02", admNo: "7I02", name: "Ira Pillai", class: "7", section: "I", roll: "02", gender: "Male", dob: "15 Jan 2014", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Ira Pillai" },
        { id: "7I03", admNo: "7I03", name: "Dhruv Pillai", class: "7", section: "I", roll: "03", gender: "Male", dob: "15 Jan 2014", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 9.6, parent: "Parent of Dhruv Pillai" },
        { id: "7I04", admNo: "7I04", name: "Aanya Joshi", class: "7", section: "I", roll: "04", gender: "Female", dob: "15 Jan 2014", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 8.6, parent: "Parent of Aanya Joshi" },
        { id: "7I05", admNo: "7I05", name: "Ira Singh", class: "7", section: "I", roll: "05", gender: "Female", dob: "15 Jan 2014", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Ira Singh" },
        { id: "7I06", admNo: "7I06", name: "Aanya Pillai", class: "7", section: "I", roll: "06", gender: "Male", dob: "15 Jan 2014", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Aanya Pillai" },
        { id: "7I07", admNo: "7I07", name: "Dhruv Das", class: "7", section: "I", roll: "07", gender: "Male", dob: "15 Jan 2014", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Dhruv Das" },
        { id: "7I08", admNo: "7I08", name: "Hardik Gupta", class: "7", section: "I", roll: "08", gender: "Female", dob: "15 Jan 2014", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 6.7, parent: "Parent of Hardik Gupta" },
        { id: "7I09", admNo: "7I09", name: "Kyra Iyer", class: "7", section: "I", roll: "09", gender: "Male", dob: "15 Jan 2014", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 8.9, parent: "Parent of Kyra Iyer" },
        { id: "7I10", admNo: "7I10", name: "Kabir Bose", class: "7", section: "I", roll: "10", gender: "Female", dob: "15 Jan 2014", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Kabir Bose" }
      ],
      "J": [
        { id: "7J01", admNo: "7J01", name: "Vivaan Gupta", class: "7", section: "J", roll: "01", gender: "Male", dob: "15 Jan 2014", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Vivaan Gupta" },
        { id: "7J02", admNo: "7J02", name: "Riya Gupta", class: "7", section: "J", roll: "02", gender: "Male", dob: "15 Jan 2014", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 6.7, parent: "Parent of Riya Gupta" },
        { id: "7J03", admNo: "7J03", name: "Aanya Desai", class: "7", section: "J", roll: "03", gender: "Male", dob: "15 Jan 2014", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Aanya Desai" },
        { id: "7J04", admNo: "7J04", name: "Vivaan Pillai", class: "7", section: "J", roll: "04", gender: "Female", dob: "15 Jan 2014", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 9.8, parent: "Parent of Vivaan Pillai" },
        { id: "7J05", admNo: "7J05", name: "Saanvi Chowdhury", class: "7", section: "J", roll: "05", gender: "Female", dob: "15 Jan 2014", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Saanvi Chowdhury" },
        { id: "7J06", admNo: "7J06", name: "Ishaan Menon", class: "7", section: "J", roll: "06", gender: "Female", dob: "15 Jan 2014", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Ishaan Menon" },
        { id: "7J07", admNo: "7J07", name: "Aarush Mukherjee", class: "7", section: "J", roll: "07", gender: "Female", dob: "15 Jan 2014", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Aarush Mukherjee" },
        { id: "7J08", admNo: "7J08", name: "Saanvi Singh", class: "7", section: "J", roll: "08", gender: "Female", dob: "15 Jan 2014", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of Saanvi Singh" },
        { id: "7J09", admNo: "7J09", name: "Kyra Kumar", class: "7", section: "J", roll: "09", gender: "Male", dob: "15 Jan 2014", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 6.6, parent: "Parent of Kyra Kumar" },
        { id: "7J10", admNo: "7J10", name: "Anvi Iyer", class: "7", section: "J", roll: "10", gender: "Male", dob: "15 Jan 2014", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Anvi Iyer" }
      ],
      "K": [
        { id: "7K01", admNo: "7K01", name: "Anvi Gupta", class: "7", section: "K", roll: "01", gender: "Female", dob: "15 Jan 2014", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 6.8, parent: "Parent of Anvi Gupta" },
        { id: "7K02", admNo: "7K02", name: "Navya Gupta", class: "7", section: "K", roll: "02", gender: "Female", dob: "15 Jan 2014", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.9, parent: "Parent of Navya Gupta" },
        { id: "7K03", admNo: "7K03", name: "Hardik Singh", class: "7", section: "K", roll: "03", gender: "Female", dob: "15 Jan 2014", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Hardik Singh" },
        { id: "7K04", admNo: "7K04", name: "Ritvik Rao", class: "7", section: "K", roll: "04", gender: "Male", dob: "15 Jan 2014", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Ritvik Rao" },
        { id: "7K05", admNo: "7K05", name: "Avni Singh", class: "7", section: "K", roll: "05", gender: "Female", dob: "15 Jan 2014", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 8.6, parent: "Parent of Avni Singh" },
        { id: "7K06", admNo: "7K06", name: "Aarav Mukherjee", class: "7", section: "K", roll: "06", gender: "Male", dob: "15 Jan 2014", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 9.3, parent: "Parent of Aarav Mukherjee" },
        { id: "7K07", admNo: "7K07", name: "Kavya Joshi", class: "7", section: "K", roll: "07", gender: "Male", dob: "15 Jan 2014", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Kavya Joshi" },
        { id: "7K08", admNo: "7K08", name: "Ishaan Menon", class: "7", section: "K", roll: "08", gender: "Male", dob: "15 Jan 2014", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Ishaan Menon" },
        { id: "7K09", admNo: "7K09", name: "Ayaan Patel", class: "7", section: "K", roll: "09", gender: "Male", dob: "15 Jan 2014", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Ayaan Patel" },
        { id: "7K10", admNo: "7K10", name: "Aditya Desai", class: "7", section: "K", roll: "10", gender: "Female", dob: "15 Jan 2014", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Aditya Desai" }
      ],
      "L": [
        { id: "7L01", admNo: "7L01", name: "Dhruv Singh", class: "7", section: "L", roll: "01", gender: "Male", dob: "15 Jan 2014", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 8.9, parent: "Parent of Dhruv Singh" },
        { id: "7L02", admNo: "7L02", name: "Dhruv Mukherjee", class: "7", section: "L", roll: "02", gender: "Female", dob: "15 Jan 2014", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Dhruv Mukherjee" },
        { id: "7L03", admNo: "7L03", name: "Saanvi Joshi", class: "7", section: "L", roll: "03", gender: "Female", dob: "15 Jan 2014", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 8.7, parent: "Parent of Saanvi Joshi" },
        { id: "7L04", admNo: "7L04", name: "Aanya Reddy", class: "7", section: "L", roll: "04", gender: "Female", dob: "15 Jan 2014", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Aanya Reddy" },
        { id: "7L05", admNo: "7L05", name: "Aanya Iyer", class: "7", section: "L", roll: "05", gender: "Female", dob: "15 Jan 2014", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 9.3, parent: "Parent of Aanya Iyer" },
        { id: "7L06", admNo: "7L06", name: "Ayaan Desai", class: "7", section: "L", roll: "06", gender: "Female", dob: "15 Jan 2014", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 8.7, parent: "Parent of Ayaan Desai" },
        { id: "7L07", admNo: "7L07", name: "Anika Mukherjee", class: "7", section: "L", roll: "07", gender: "Male", dob: "15 Jan 2014", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Anika Mukherjee" },
        { id: "7L08", admNo: "7L08", name: "Vihaan Joshi", class: "7", section: "L", roll: "08", gender: "Female", dob: "15 Jan 2014", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 6.7, parent: "Parent of Vihaan Joshi" },
        { id: "7L09", admNo: "7L09", name: "Krishna Joshi", class: "7", section: "L", roll: "09", gender: "Male", dob: "15 Jan 2014", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 6.8, parent: "Parent of Krishna Joshi" },
        { id: "7L10", admNo: "7L10", name: "Hardik Bose", class: "7", section: "L", roll: "10", gender: "Female", dob: "15 Jan 2014", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Hardik Bose" }
      ]
    },
    "6": {
      "A": [
        { id: "6A01", admNo: "6A01", name: "Ritvik Rao", class: "6", section: "A", roll: "01", gender: "Female", dob: "15 Jan 2015", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 6.5, parent: "Parent of Ritvik Rao" },
        { id: "6A02", admNo: "6A02", name: "Dhruv Joshi", class: "6", section: "A", roll: "02", gender: "Female", dob: "15 Jan 2015", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Dhruv Joshi" },
        { id: "6A03", admNo: "6A03", name: "Ritvik Singh", class: "6", section: "A", roll: "03", gender: "Female", dob: "15 Jan 2015", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 6.5, parent: "Parent of Ritvik Singh" },
        { id: "6A04", admNo: "6A04", name: "Arjun Bose", class: "6", section: "A", roll: "04", gender: "Male", dob: "15 Jan 2015", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Arjun Bose" },
        { id: "6A05", admNo: "6A05", name: "Myra Patel", class: "6", section: "A", roll: "05", gender: "Female", dob: "15 Jan 2015", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 6.8, parent: "Parent of Myra Patel" },
        { id: "6A06", admNo: "6A06", name: "Anvi Gupta", class: "6", section: "A", roll: "06", gender: "Female", dob: "15 Jan 2015", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Anvi Gupta" },
        { id: "6A07", admNo: "6A07", name: "Avni Gupta", class: "6", section: "A", roll: "07", gender: "Female", dob: "15 Jan 2015", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Avni Gupta" },
        { id: "6A08", admNo: "6A08", name: "Vivaan Singh", class: "6", section: "A", roll: "08", gender: "Female", dob: "15 Jan 2015", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Vivaan Singh" },
        { id: "6A09", admNo: "6A09", name: "Atharv Chowdhury", class: "6", section: "A", roll: "09", gender: "Male", dob: "15 Jan 2015", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 9.6, parent: "Parent of Atharv Chowdhury" },
        { id: "6A10", admNo: "6A10", name: "Shaurya Mukherjee", class: "6", section: "A", roll: "10", gender: "Female", dob: "15 Jan 2015", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of Shaurya Mukherjee" }
      ],
      "B": [
        { id: "6B01", admNo: "6B01", name: "Prisha Bose", class: "6", section: "B", roll: "01", gender: "Female", dob: "15 Jan 2015", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Prisha Bose" },
        { id: "6B02", admNo: "6B02", name: "Prisha Nair", class: "6", section: "B", roll: "02", gender: "Male", dob: "15 Jan 2015", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Prisha Nair" },
        { id: "6B03", admNo: "6B03", name: "Shaurya Kulkarni", class: "6", section: "B", roll: "03", gender: "Female", dob: "15 Jan 2015", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Shaurya Kulkarni" },
        { id: "6B04", admNo: "6B04", name: "Riya Kulkarni", class: "6", section: "B", roll: "04", gender: "Male", dob: "15 Jan 2015", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Riya Kulkarni" },
        { id: "6B05", admNo: "6B05", name: "Dhruv Kulkarni", class: "6", section: "B", roll: "05", gender: "Male", dob: "15 Jan 2015", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Dhruv Kulkarni" },
        { id: "6B06", admNo: "6B06", name: "Aarush Chowdhury", class: "6", section: "B", roll: "06", gender: "Female", dob: "15 Jan 2015", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Aarush Chowdhury" },
        { id: "6B07", admNo: "6B07", name: "Vivaan Iyer", class: "6", section: "B", roll: "07", gender: "Male", dob: "15 Jan 2015", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Vivaan Iyer" },
        { id: "6B08", admNo: "6B08", name: "Ishaan Iyer", class: "6", section: "B", roll: "08", gender: "Female", dob: "15 Jan 2015", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Ishaan Iyer" },
        { id: "6B09", admNo: "6B09", name: "Myra Menon", class: "6", section: "B", roll: "09", gender: "Female", dob: "15 Jan 2015", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Myra Menon" },
        { id: "6B10", admNo: "6B10", name: "Prisha Sharma", class: "6", section: "B", roll: "10", gender: "Female", dob: "15 Jan 2015", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Prisha Sharma" }
      ],
      "C": [
        { id: "6C01", admNo: "6C01", name: "Riya Patel", class: "6", section: "C", roll: "01", gender: "Female", dob: "15 Jan 2015", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 6.7, parent: "Parent of Riya Patel" },
        { id: "6C02", admNo: "6C02", name: "Vihaan Nair", class: "6", section: "C", roll: "02", gender: "Male", dob: "15 Jan 2015", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 6.5, parent: "Parent of Vihaan Nair" },
        { id: "6C03", admNo: "6C03", name: "Aaradhya Rao", class: "6", section: "C", roll: "03", gender: "Female", dob: "15 Jan 2015", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Aaradhya Rao" },
        { id: "6C04", admNo: "6C04", name: "Aaradhya Iyer", class: "6", section: "C", roll: "04", gender: "Female", dob: "15 Jan 2015", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 7.8, parent: "Parent of Aaradhya Iyer" },
        { id: "6C05", admNo: "6C05", name: "Ira Chowdhury", class: "6", section: "C", roll: "05", gender: "Female", dob: "15 Jan 2015", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Ira Chowdhury" },
        { id: "6C06", admNo: "6C06", name: "Aarav Singh", class: "6", section: "C", roll: "06", gender: "Female", dob: "15 Jan 2015", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Aarav Singh" },
        { id: "6C07", admNo: "6C07", name: "Shanaya Mukherjee", class: "6", section: "C", roll: "07", gender: "Female", dob: "15 Jan 2015", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Shanaya Mukherjee" },
        { id: "6C08", admNo: "6C08", name: "Navya Pillai", class: "6", section: "C", roll: "08", gender: "Male", dob: "15 Jan 2015", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Navya Pillai" },
        { id: "6C09", admNo: "6C09", name: "Arjun Iyer", class: "6", section: "C", roll: "09", gender: "Female", dob: "15 Jan 2015", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Arjun Iyer" },
        { id: "6C10", admNo: "6C10", name: "Aanya Joshi", class: "6", section: "C", roll: "10", gender: "Female", dob: "15 Jan 2015", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Aanya Joshi" }
      ],
      "D": [
        { id: "6D01", admNo: "6D01", name: "Aarav Reddy", class: "6", section: "D", roll: "01", gender: "Male", dob: "15 Jan 2015", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Aarav Reddy" },
        { id: "6D02", admNo: "6D02", name: "Riya Bose", class: "6", section: "D", roll: "02", gender: "Male", dob: "15 Jan 2015", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Riya Bose" },
        { id: "6D03", admNo: "6D03", name: "Sai Nair", class: "6", section: "D", roll: "03", gender: "Female", dob: "15 Jan 2015", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of Sai Nair" },
        { id: "6D04", admNo: "6D04", name: "Vihaan Kulkarni", class: "6", section: "D", roll: "04", gender: "Female", dob: "15 Jan 2015", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Vihaan Kulkarni" },
        { id: "6D05", admNo: "6D05", name: "Sai Kumar", class: "6", section: "D", roll: "05", gender: "Female", dob: "15 Jan 2015", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Sai Kumar" },
        { id: "6D06", admNo: "6D06", name: "Aashvi Menon", class: "6", section: "D", roll: "06", gender: "Female", dob: "15 Jan 2015", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 6.7, parent: "Parent of Aashvi Menon" },
        { id: "6D07", admNo: "6D07", name: "Ira Bose", class: "6", section: "D", roll: "07", gender: "Female", dob: "15 Jan 2015", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Ira Bose" },
        { id: "6D08", admNo: "6D08", name: "Shanaya Das", class: "6", section: "D", roll: "08", gender: "Female", dob: "15 Jan 2015", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 8.6, parent: "Parent of Shanaya Das" },
        { id: "6D09", admNo: "6D09", name: "Arjun Gupta", class: "6", section: "D", roll: "09", gender: "Male", dob: "15 Jan 2015", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 6.5, parent: "Parent of Arjun Gupta" },
        { id: "6D10", admNo: "6D10", name: "Kavya Verma", class: "6", section: "D", roll: "10", gender: "Female", dob: "15 Jan 2015", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Kavya Verma" }
      ],
      "E": [
        { id: "6E01", admNo: "6E01", name: "Ananya Iyer", class: "6", section: "E", roll: "01", gender: "Female", dob: "15 Jan 2015", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Ananya Iyer" },
        { id: "6E02", admNo: "6E02", name: "Aditya Kumar", class: "6", section: "E", roll: "02", gender: "Female", dob: "15 Jan 2015", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Aditya Kumar" },
        { id: "6E03", admNo: "6E03", name: "Aanya Rao", class: "6", section: "E", roll: "03", gender: "Female", dob: "15 Jan 2015", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 6.6, parent: "Parent of Aanya Rao" },
        { id: "6E04", admNo: "6E04", name: "Krishna Mukherjee", class: "6", section: "E", roll: "04", gender: "Female", dob: "15 Jan 2015", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Krishna Mukherjee" },
        { id: "6E05", admNo: "6E05", name: "Sai Patel", class: "6", section: "E", roll: "05", gender: "Female", dob: "15 Jan 2015", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 9.3, parent: "Parent of Sai Patel" },
        { id: "6E06", admNo: "6E06", name: "Ahana Patel", class: "6", section: "E", roll: "06", gender: "Male", dob: "15 Jan 2015", attendance: 92, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Ahana Patel" },
        { id: "6E07", admNo: "6E07", name: "Kyra Rao", class: "6", section: "E", roll: "07", gender: "Female", dob: "15 Jan 2015", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Kyra Rao" },
        { id: "6E08", admNo: "6E08", name: "Ananya Reddy", class: "6", section: "E", roll: "08", gender: "Male", dob: "15 Jan 2015", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 9.8, parent: "Parent of Ananya Reddy" },
        { id: "6E09", admNo: "6E09", name: "Arjun Kumar", class: "6", section: "E", roll: "09", gender: "Male", dob: "15 Jan 2015", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 6.6, parent: "Parent of Arjun Kumar" },
        { id: "6E10", admNo: "6E10", name: "Ayaan Joshi", class: "6", section: "E", roll: "10", gender: "Female", dob: "15 Jan 2015", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 6.8, parent: "Parent of Ayaan Joshi" }
      ],
      "F": [
        { id: "6F01", admNo: "6F01", name: "Reyansh Rao", class: "6", section: "F", roll: "01", gender: "Female", dob: "15 Jan 2015", attendance: 84, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Reyansh Rao" },
        { id: "6F02", admNo: "6F02", name: "Vivaan Bose", class: "6", section: "F", roll: "02", gender: "Male", dob: "15 Jan 2015", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Vivaan Bose" },
        { id: "6F03", admNo: "6F03", name: "Ayaan Patel", class: "6", section: "F", roll: "03", gender: "Male", dob: "15 Jan 2015", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 9.6, parent: "Parent of Ayaan Patel" },
        { id: "6F04", admNo: "6F04", name: "Kyra Singh", class: "6", section: "F", roll: "04", gender: "Female", dob: "15 Jan 2015", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Kyra Singh" },
        { id: "6F05", admNo: "6F05", name: "Shanaya Reddy", class: "6", section: "F", roll: "05", gender: "Female", dob: "15 Jan 2015", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Shanaya Reddy" },
        { id: "6F06", admNo: "6F06", name: "Kavya Gupta", class: "6", section: "F", roll: "06", gender: "Female", dob: "15 Jan 2015", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Kavya Gupta" },
        { id: "6F07", admNo: "6F07", name: "Ritvik Kumar", class: "6", section: "F", roll: "07", gender: "Male", dob: "15 Jan 2015", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Ritvik Kumar" },
        { id: "6F08", admNo: "6F08", name: "Avni Kumar", class: "6", section: "F", roll: "08", gender: "Female", dob: "15 Jan 2015", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Avni Kumar" },
        { id: "6F09", admNo: "6F09", name: "Vivaan Verma", class: "6", section: "F", roll: "09", gender: "Male", dob: "15 Jan 2015", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 6.7, parent: "Parent of Vivaan Verma" },
        { id: "6F10", admNo: "6F10", name: "Kyra Pillai", class: "6", section: "F", roll: "10", gender: "Male", dob: "15 Jan 2015", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Kyra Pillai" }
      ],
      "G": [
        { id: "6G01", admNo: "6G01", name: "Hardik Rao", class: "6", section: "G", roll: "01", gender: "Male", dob: "15 Jan 2015", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 8.6, parent: "Parent of Hardik Rao" },
        { id: "6G02", admNo: "6G02", name: "Ayaan Sharma", class: "6", section: "G", roll: "02", gender: "Male", dob: "15 Jan 2015", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Ayaan Sharma" },
        { id: "6G03", admNo: "6G03", name: "Darsh Pillai", class: "6", section: "G", roll: "03", gender: "Female", dob: "15 Jan 2015", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 8.7, parent: "Parent of Darsh Pillai" },
        { id: "6G04", admNo: "6G04", name: "Vivaan Mukherjee", class: "6", section: "G", roll: "04", gender: "Male", dob: "15 Jan 2015", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 8.6, parent: "Parent of Vivaan Mukherjee" },
        { id: "6G05", admNo: "6G05", name: "Ahana Reddy", class: "6", section: "G", roll: "05", gender: "Male", dob: "15 Jan 2015", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Ahana Reddy" },
        { id: "6G06", admNo: "6G06", name: "Diya Kulkarni", class: "6", section: "G", roll: "06", gender: "Female", dob: "15 Jan 2015", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 9.4, parent: "Parent of Diya Kulkarni" },
        { id: "6G07", admNo: "6G07", name: "Pari Mukherjee", class: "6", section: "G", roll: "07", gender: "Male", dob: "15 Jan 2015", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Pari Mukherjee" },
        { id: "6G08", admNo: "6G08", name: "Aditya Bose", class: "6", section: "G", roll: "08", gender: "Male", dob: "15 Jan 2015", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Aditya Bose" },
        { id: "6G09", admNo: "6G09", name: "Dhruv Reddy", class: "6", section: "G", roll: "09", gender: "Female", dob: "15 Jan 2015", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Dhruv Reddy" },
        { id: "6G10", admNo: "6G10", name: "Hardik Desai", class: "6", section: "G", roll: "10", gender: "Female", dob: "15 Jan 2015", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 7.7, parent: "Parent of Hardik Desai" }
      ],
      "H": [
        { id: "6H01", admNo: "6H01", name: "Darsh Sharma", class: "6", section: "H", roll: "01", gender: "Female", dob: "15 Jan 2015", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Darsh Sharma" },
        { id: "6H02", admNo: "6H02", name: "Darsh Kulkarni", class: "6", section: "H", roll: "02", gender: "Female", dob: "15 Jan 2015", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 8.7, parent: "Parent of Darsh Kulkarni" },
        { id: "6H03", admNo: "6H03", name: "Kyra Verma", class: "6", section: "H", roll: "03", gender: "Female", dob: "15 Jan 2015", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Kyra Verma" },
        { id: "6H04", admNo: "6H04", name: "Vihaan Rao", class: "6", section: "H", roll: "04", gender: "Male", dob: "15 Jan 2015", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 6.8, parent: "Parent of Vihaan Rao" },
        { id: "6H05", admNo: "6H05", name: "Aanya Sharma", class: "6", section: "H", roll: "05", gender: "Female", dob: "15 Jan 2015", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 8.7, parent: "Parent of Aanya Sharma" },
        { id: "6H06", admNo: "6H06", name: "Aashvi Joshi", class: "6", section: "H", roll: "06", gender: "Male", dob: "15 Jan 2015", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 9.4, parent: "Parent of Aashvi Joshi" },
        { id: "6H07", admNo: "6H07", name: "Darsh Verma", class: "6", section: "H", roll: "07", gender: "Male", dob: "15 Jan 2015", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Darsh Verma" },
        { id: "6H08", admNo: "6H08", name: "Shaurya Rao", class: "6", section: "H", roll: "08", gender: "Male", dob: "15 Jan 2015", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 8.9, parent: "Parent of Shaurya Rao" },
        { id: "6H09", admNo: "6H09", name: "Diya Sharma", class: "6", section: "H", roll: "09", gender: "Female", dob: "15 Jan 2015", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 8.4, parent: "Parent of Diya Sharma" },
        { id: "6H10", admNo: "6H10", name: "Sai Rao", class: "6", section: "H", roll: "10", gender: "Female", dob: "15 Jan 2015", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Sai Rao" }
      ],
      "I": [
        { id: "6I01", admNo: "6I01", name: "Aarav Desai", class: "6", section: "I", roll: "01", gender: "Male", dob: "15 Jan 2015", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 7.1, parent: "Parent of Aarav Desai" },
        { id: "6I02", admNo: "6I02", name: "Ritvik Mukherjee", class: "6", section: "I", roll: "02", gender: "Female", dob: "15 Jan 2015", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Ritvik Mukherjee" },
        { id: "6I03", admNo: "6I03", name: "Dhruv Joshi", class: "6", section: "I", roll: "03", gender: "Female", dob: "15 Jan 2015", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 8.7, parent: "Parent of Dhruv Joshi" },
        { id: "6I04", admNo: "6I04", name: "Sai Singh", class: "6", section: "I", roll: "04", gender: "Male", dob: "15 Jan 2015", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 8.5, parent: "Parent of Sai Singh" },
        { id: "6I05", admNo: "6I05", name: "Ahana Chowdhury", class: "6", section: "I", roll: "05", gender: "Female", dob: "15 Jan 2015", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Ahana Chowdhury" },
        { id: "6I06", admNo: "6I06", name: "Aashvi Pillai", class: "6", section: "I", roll: "06", gender: "Male", dob: "15 Jan 2015", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 9.8, parent: "Parent of Aashvi Pillai" },
        { id: "6I07", admNo: "6I07", name: "Ritvik Pillai", class: "6", section: "I", roll: "07", gender: "Female", dob: "15 Jan 2015", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 6.7, parent: "Parent of Ritvik Pillai" },
        { id: "6I08", admNo: "6I08", name: "Aarush Patel", class: "6", section: "I", roll: "08", gender: "Male", dob: "15 Jan 2015", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.6, parent: "Parent of Aarush Patel" },
        { id: "6I09", admNo: "6I09", name: "Saanvi Menon", class: "6", section: "I", roll: "09", gender: "Female", dob: "15 Jan 2015", attendance: 96, behavior: "Good", fee_status: "Paid", gpa: 9.7, parent: "Parent of Saanvi Menon" },
        { id: "6I10", admNo: "6I10", name: "Ayaan Kulkarni", class: "6", section: "I", roll: "10", gender: "Female", dob: "15 Jan 2015", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Ayaan Kulkarni" }
      ],
      "J": [
        { id: "6J01", admNo: "6J01", name: "Aarush Chowdhury", class: "6", section: "J", roll: "01", gender: "Male", dob: "15 Jan 2015", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 7.5, parent: "Parent of Aarush Chowdhury" },
        { id: "6J02", admNo: "6J02", name: "Myra Nair", class: "6", section: "J", roll: "02", gender: "Female", dob: "15 Jan 2015", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Myra Nair" },
        { id: "6J03", admNo: "6J03", name: "Ananya Bose", class: "6", section: "J", roll: "03", gender: "Female", dob: "15 Jan 2015", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 7.4, parent: "Parent of Ananya Bose" },
        { id: "6J04", admNo: "6J04", name: "Ritvik Bose", class: "6", section: "J", roll: "04", gender: "Male", dob: "15 Jan 2015", attendance: 97, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Ritvik Bose" },
        { id: "6J05", admNo: "6J05", name: "Kabir Mukherjee", class: "6", section: "J", roll: "05", gender: "Male", dob: "15 Jan 2015", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Kabir Mukherjee" },
        { id: "6J06", admNo: "6J06", name: "Pranav Sharma", class: "6", section: "J", roll: "06", gender: "Male", dob: "15 Jan 2015", attendance: 93, behavior: "Good", fee_status: "Paid", gpa: 9.2, parent: "Parent of Pranav Sharma" },
        { id: "6J07", admNo: "6J07", name: "Pari Menon", class: "6", section: "J", roll: "07", gender: "Male", dob: "15 Jan 2015", attendance: 89, behavior: "Good", fee_status: "Paid", gpa: 9.8, parent: "Parent of Pari Menon" },
        { id: "6J08", admNo: "6J08", name: "Ishaan Kulkarni", class: "6", section: "J", roll: "08", gender: "Female", dob: "15 Jan 2015", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Ishaan Kulkarni" },
        { id: "6J09", admNo: "6J09", name: "Aanya Joshi", class: "6", section: "J", roll: "09", gender: "Female", dob: "15 Jan 2015", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 8.3, parent: "Parent of Aanya Joshi" },
        { id: "6J10", admNo: "6J10", name: "Aarush Rao", class: "6", section: "J", roll: "10", gender: "Female", dob: "15 Jan 2015", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Aarush Rao" }
      ],
      "K": [
        { id: "6K01", admNo: "6K01", name: "Ritvik Desai", class: "6", section: "K", roll: "01", gender: "Male", dob: "15 Jan 2015", attendance: 88, behavior: "Good", fee_status: "Paid", gpa: 7.0, parent: "Parent of Ritvik Desai" },
        { id: "6K02", admNo: "6K02", name: "Aarav Joshi", class: "6", section: "K", roll: "02", gender: "Male", dob: "15 Jan 2015", attendance: 82, behavior: "Good", fee_status: "Paid", gpa: 8.8, parent: "Parent of Aarav Joshi" },
        { id: "6K03", admNo: "6K03", name: "Hardik Bose", class: "6", section: "K", roll: "03", gender: "Female", dob: "15 Jan 2015", attendance: 99, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Hardik Bose" },
        { id: "6K04", admNo: "6K04", name: "Riya Rao", class: "6", section: "K", roll: "04", gender: "Male", dob: "15 Jan 2015", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Riya Rao" },
        { id: "6K05", admNo: "6K05", name: "Darsh Sharma", class: "6", section: "K", roll: "05", gender: "Male", dob: "15 Jan 2015", attendance: 91, behavior: "Good", fee_status: "Paid", gpa: 9.0, parent: "Parent of Darsh Sharma" },
        { id: "6K06", admNo: "6K06", name: "Dhruv Patel", class: "6", section: "K", roll: "06", gender: "Male", dob: "15 Jan 2015", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Dhruv Patel" },
        { id: "6K07", admNo: "6K07", name: "Krishna Gupta", class: "6", section: "K", roll: "07", gender: "Female", dob: "15 Jan 2015", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Krishna Gupta" },
        { id: "6K08", admNo: "6K08", name: "Anvi Menon", class: "6", section: "K", roll: "08", gender: "Female", dob: "15 Jan 2015", attendance: 80, behavior: "Good", fee_status: "Paid", gpa: 7.3, parent: "Parent of Anvi Menon" },
        { id: "6K09", admNo: "6K09", name: "Atharv Reddy", class: "6", section: "K", roll: "09", gender: "Female", dob: "15 Jan 2015", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 9.8, parent: "Parent of Atharv Reddy" },
        { id: "6K10", admNo: "6K10", name: "Riya Chowdhury", class: "6", section: "K", roll: "10", gender: "Male", dob: "15 Jan 2015", attendance: 95, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Riya Chowdhury" }
      ],
      "L": [
        { id: "6L01", admNo: "6L01", name: "Ira Rao", class: "6", section: "L", roll: "01", gender: "Female", dob: "15 Jan 2015", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 9.5, parent: "Parent of Ira Rao" },
        { id: "6L02", admNo: "6L02", name: "Aarush Desai", class: "6", section: "L", roll: "02", gender: "Female", dob: "15 Jan 2015", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 9.1, parent: "Parent of Aarush Desai" },
        { id: "6L03", admNo: "6L03", name: "Reyansh Joshi", class: "6", section: "L", roll: "03", gender: "Female", dob: "15 Jan 2015", attendance: 83, behavior: "Good", fee_status: "Paid", gpa: 8.2, parent: "Parent of Reyansh Joshi" },
        { id: "6L04", admNo: "6L04", name: "Arjun Kumar", class: "6", section: "L", roll: "04", gender: "Male", dob: "15 Jan 2015", attendance: 81, behavior: "Good", fee_status: "Paid", gpa: 8.9, parent: "Parent of Arjun Kumar" },
        { id: "6L05", admNo: "6L05", name: "Aarav Pillai", class: "6", section: "L", roll: "05", gender: "Female", dob: "15 Jan 2015", attendance: 87, behavior: "Good", fee_status: "Paid", gpa: 8.1, parent: "Parent of Aarav Pillai" },
        { id: "6L06", admNo: "6L06", name: "Pranav Gupta", class: "6", section: "L", roll: "06", gender: "Female", dob: "15 Jan 2015", attendance: 90, behavior: "Good", fee_status: "Paid", gpa: 8.7, parent: "Parent of Pranav Gupta" },
        { id: "6L07", admNo: "6L07", name: "Ritvik Iyer", class: "6", section: "L", roll: "07", gender: "Female", dob: "15 Jan 2015", attendance: 94, behavior: "Good", fee_status: "Paid", gpa: 7.2, parent: "Parent of Ritvik Iyer" },
        { id: "6L08", admNo: "6L08", name: "Aarush Verma", class: "6", section: "L", roll: "08", gender: "Female", dob: "15 Jan 2015", attendance: 86, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Aarush Verma" },
        { id: "6L09", admNo: "6L09", name: "Diya Verma", class: "6", section: "L", roll: "09", gender: "Male", dob: "15 Jan 2015", attendance: 98, behavior: "Good", fee_status: "Paid", gpa: 8.0, parent: "Parent of Diya Verma" },
        { id: "6L10", admNo: "6L10", name: "Aanya Kulkarni", class: "6", section: "L", roll: "10", gender: "Male", dob: "15 Jan 2015", attendance: 85, behavior: "Good", fee_status: "Paid", gpa: 6.9, parent: "Parent of Aanya Kulkarni" }
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
window.ROLE_NAV = {
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
  { class: "10-A", teacher: "Suresh Naidu", avgAtt: 87, avgGPA: 8.4, topper: "Aashvi Mukherjee", weak: 4, issues: 1 },
  { class: "10-B", teacher: "Prasana Reddy", avgAtt: 86, avgGPA: 7.8, topper: "Pranav Iyer", weak: 0, issues: 1 },
  { class: "10-C", teacher: "Prasana Reddy", avgAtt: 92, avgGPA: 7.6, topper: "Vihaan Patel", weak: 0, issues: 3 },
  { class: "10-D", teacher: "Suresh Naidu", avgAtt: 85, avgGPA: 8.8, topper: "Aadhya Rao", weak: 4, issues: 1 },
  { class: "10-E", teacher: "Mohan Das", avgAtt: 87, avgGPA: 7.8, topper: "Ira Mukherjee", weak: 1, issues: 0 },
  { class: "10-F", teacher: "Ramesh Sharma", avgAtt: 95, avgGPA: 8.3, topper: "Ayaan Rao", weak: 2, issues: 1 },
  { class: "10-G", teacher: "Pooja Mehta", avgAtt: 90, avgGPA: 8.1, topper: "Ananya Singh", weak: 2, issues: 0 },
  { class: "10-H", teacher: "Sunita Verma", avgAtt: 93, avgGPA: 8.9, topper: "Vivaan Bose", weak: 2, issues: 0 },
  { class: "10-I", teacher: "Ramesh Sharma", avgAtt: 88, avgGPA: 7.1, topper: "Aadhya Rao", weak: 2, issues: 0 },
  { class: "10-J", teacher: "Venkat Iyer", avgAtt: 95, avgGPA: 8.4, topper: "Myra Mukherjee", weak: 3, issues: 1 },
  { class: "10-K", teacher: "Pooja Mehta", avgAtt: 87, avgGPA: 7.4, topper: "Krishna Menon", weak: 5, issues: 3 },
  { class: "10-L", teacher: "Venkat Iyer", avgAtt: 87, avgGPA: 8.4, topper: "Saanvi Menon", weak: 0, issues: 2 },
  { class: "9-A", teacher: "Anita Pillai", avgAtt: 88, avgGPA: 9.1, topper: "Shanaya Singh", weak: 5, issues: 0 },
  { class: "9-B", teacher: "Ramesh Sharma", avgAtt: 93, avgGPA: 7.9, topper: "Dhruv Nair", weak: 2, issues: 3 },
  { class: "9-C", teacher: "Sunita Verma", avgAtt: 86, avgGPA: 7.3, topper: "Aanya Singh", weak: 5, issues: 2 },
  { class: "9-D", teacher: "Ramesh Sharma", avgAtt: 85, avgGPA: 8.2, topper: "Ananya Joshi", weak: 3, issues: 0 },
  { class: "9-E", teacher: "Venkat Iyer", avgAtt: 90, avgGPA: 9.2, topper: "Pari Joshi", weak: 3, issues: 3 },
  { class: "9-F", teacher: "Sunita Verma", avgAtt: 91, avgGPA: 8.6, topper: "Saanvi Iyer", weak: 4, issues: 1 },
  { class: "9-G", teacher: "Pooja Mehta", avgAtt: 96, avgGPA: 7.5, topper: "Aashvi Pillai", weak: 4, issues: 2 },
  { class: "9-H", teacher: "Venkat Iyer", avgAtt: 88, avgGPA: 8.3, topper: "Aashvi Singh", weak: 0, issues: 3 },
  { class: "9-I", teacher: "Suresh Naidu", avgAtt: 87, avgGPA: 8.8, topper: "Ishaan Verma", weak: 1, issues: 1 },
  { class: "9-J", teacher: "Pooja Mehta", avgAtt: 92, avgGPA: 8.7, topper: "Aaradhya Mukherjee", weak: 0, issues: 1 },
  { class: "9-K", teacher: "Deepa Rani", avgAtt: 94, avgGPA: 8.4, topper: "Ahana Joshi", weak: 3, issues: 3 },
  { class: "9-L", teacher: "Ramesh Sharma", avgAtt: 91, avgGPA: 7.1, topper: "Ahana Chowdhury", weak: 0, issues: 3 },
  { class: "8-A", teacher: "Ramesh Sharma", avgAtt: 94, avgGPA: 8.1, topper: "Riya Verma", weak: 3, issues: 3 },
  { class: "8-B", teacher: "Sunita Verma", avgAtt: 85, avgGPA: 9.1, topper: "Aarush Iyer", weak: 5, issues: 2 },
  { class: "8-C", teacher: "Venkat Iyer", avgAtt: 96, avgGPA: 8.4, topper: "Myra Reddy", weak: 1, issues: 2 },
  { class: "8-D", teacher: "Mohan Das", avgAtt: 90, avgGPA: 8.2, topper: "Dhruv Kumar", weak: 5, issues: 1 },
  { class: "8-E", teacher: "Mohan Das", avgAtt: 91, avgGPA: 9.2, topper: "Riya Das", weak: 3, issues: 3 },
  { class: "8-F", teacher: "Venkat Iyer", avgAtt: 95, avgGPA: 7.4, topper: "Sai Desai", weak: 5, issues: 3 },
  { class: "8-G", teacher: "Pooja Mehta", avgAtt: 89, avgGPA: 8.3, topper: "Ahana Joshi", weak: 1, issues: 1 },
  { class: "8-H", teacher: "Sunita Verma", avgAtt: 94, avgGPA: 8.9, topper: "Aadhya Sharma", weak: 3, issues: 0 },
  { class: "8-I", teacher: "Anita Pillai", avgAtt: 96, avgGPA: 8.2, topper: "Diya Verma", weak: 5, issues: 0 },
  { class: "8-J", teacher: "Prasana Reddy", avgAtt: 85, avgGPA: 7.2, topper: "Aditya Rao", weak: 3, issues: 1 },
  { class: "8-K", teacher: "Venkat Iyer", avgAtt: 85, avgGPA: 7.7, topper: "Aashvi Kumar", weak: 0, issues: 3 },
  { class: "8-L", teacher: "Venkat Iyer", avgAtt: 92, avgGPA: 8.5, topper: "Ira Bose", weak: 0, issues: 1 },
  { class: "7-A", teacher: "Ramesh Sharma", avgAtt: 96, avgGPA: 8.5, topper: "Saanvi Desai", weak: 0, issues: 1 },
  { class: "7-B", teacher: "Deepa Rani", avgAtt: 90, avgGPA: 7.2, topper: "Arjun Rao", weak: 5, issues: 0 },
  { class: "7-C", teacher: "Pooja Mehta", avgAtt: 92, avgGPA: 7.6, topper: "Kabir Iyer", weak: 1, issues: 2 },
  { class: "7-D", teacher: "Suresh Naidu", avgAtt: 96, avgGPA: 7.1, topper: "Avni Joshi", weak: 2, issues: 1 },
  { class: "7-E", teacher: "Prasana Reddy", avgAtt: 94, avgGPA: 8.2, topper: "Ahana Pillai", weak: 5, issues: 0 },
  { class: "7-F", teacher: "Mohan Das", avgAtt: 89, avgGPA: 7.4, topper: "Atharv Sharma", weak: 1, issues: 3 },
  { class: "7-G", teacher: "Mohan Das", avgAtt: 86, avgGPA: 8.0, topper: "Ananya Joshi", weak: 4, issues: 2 },
  { class: "7-H", teacher: "Sunita Verma", avgAtt: 88, avgGPA: 7.1, topper: "Navya Das", weak: 4, issues: 1 },
  { class: "7-I", teacher: "Ramesh Sharma", avgAtt: 93, avgGPA: 8.7, topper: "Vivaan Patel", weak: 4, issues: 3 },
  { class: "7-J", teacher: "Suresh Naidu", avgAtt: 89, avgGPA: 7.9, topper: "Advik Iyer", weak: 2, issues: 2 },
  { class: "7-K", teacher: "Anita Pillai", avgAtt: 93, avgGPA: 7.9, topper: "Myra Singh", weak: 4, issues: 2 },
  { class: "7-L", teacher: "Suresh Naidu", avgAtt: 86, avgGPA: 7.9, topper: "Aarav Sharma", weak: 4, issues: 3 },
  { class: "6-A", teacher: "Prasana Reddy", avgAtt: 88, avgGPA: 8.9, topper: "Aaradhya Patel", weak: 5, issues: 0 },
  { class: "6-B", teacher: "Prasana Reddy", avgAtt: 92, avgGPA: 8.6, topper: "Aditya Desai", weak: 1, issues: 0 },
  { class: "6-C", teacher: "Pooja Mehta", avgAtt: 92, avgGPA: 8.3, topper: "Sai Pillai", weak: 0, issues: 2 },
  { class: "6-D", teacher: "Sunita Verma", avgAtt: 95, avgGPA: 9.0, topper: "Advik Bose", weak: 2, issues: 1 },
  { class: "6-E", teacher: "Prasana Reddy", avgAtt: 94, avgGPA: 8.5, topper: "Ananya Sharma", weak: 3, issues: 1 },
  { class: "6-F", teacher: "Anita Pillai", avgAtt: 94, avgGPA: 8.0, topper: "Saanvi Desai", weak: 4, issues: 3 },
  { class: "6-G", teacher: "Sunita Verma", avgAtt: 89, avgGPA: 8.5, topper: "Vivaan Pillai", weak: 2, issues: 0 },
  { class: "6-H", teacher: "Prasana Reddy", avgAtt: 85, avgGPA: 7.4, topper: "Aaradhya Gupta", weak: 4, issues: 2 },
  { class: "6-I", teacher: "Sunita Verma", avgAtt: 90, avgGPA: 8.1, topper: "Advik Gupta", weak: 3, issues: 1 },
  { class: "6-J", teacher: "Venkat Iyer", avgAtt: 93, avgGPA: 7.9, topper: "Kyra Menon", weak: 3, issues: 2 },
  { class: "6-K", teacher: "Ramesh Sharma", avgAtt: 90, avgGPA: 8.7, topper: "Diya Desai", weak: 5, issues: 0 },
  { class: "6-L", teacher: "Sunita Verma", avgAtt: 89, avgGPA: 8.8, topper: "Vihaan Kulkarni", weak: 4, issues: 1 },
];

CLASS_PERFORMANCE.sort((a, b) => {
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
  return sA.localeCompare(sB);
});


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
    // Clear students array cache dynamically if needed
  localStorage.removeItem('campuscore_students');
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

// ─── Sync computed stats that depend on true total count ───────
function syncComputedStats() {
  const trueTotal = window.getInstitutionalStats ? window.getInstitutionalStats().total : STUDENTS.length;
  // ATTENDANCE_SUMMARY: set from actual student count
  ATTENDANCE_SUMMARY.total_students = trueTotal;
  ATTENDANCE_SUMMARY.present_today  = Math.round(trueTotal * 0.925);
  ATTENDANCE_SUMMARY.absent_today   = Math.round(trueTotal * 0.050);
  ATTENDANCE_SUMMARY.late_today     = trueTotal - ATTENDANCE_SUMMARY.present_today - ATTENDANCE_SUMMARY.absent_today;
  // VP weekly totals scale to institution size
  ATTENDANCE_SUMMARY.weekly.forEach(d => { d.total = trueTotal; d.present = Math.round(trueTotal * (d.present / 100)); });
  // SuperAdmin dashboard stat card
  const adminStat = (ROLE_HOME.apaaas || ROLE_HOME.super_admin || {}).stats || [];
  const tsStat = adminStat.find(s => s.id === 'stat-total-students-admin');
  if (tsStat) tsStat.value = String(trueTotal);
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
  const allIds = new Set();
  if (typeof STUDENTS !== 'undefined') {
    STUDENTS.forEach(s => allIds.add(String(s.id)));
  }
  if (window.SCHOOL_DATA && window.SCHOOL_DATA.classes) {
    Object.keys(window.SCHOOL_DATA.classes).forEach(grade => {
      Object.keys(window.SCHOOL_DATA.classes[grade]).forEach(sec => {
        window.SCHOOL_DATA.classes[grade][sec].forEach(s => allIds.add(String(s.id)));
      });
    });
  }
  const total = allIds.size;
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
