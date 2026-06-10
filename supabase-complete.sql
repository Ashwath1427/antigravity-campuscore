-- ============================================================
-- CAMPUSCORE - COMPLETE DATABASE SETUP WITH ALL 297 STUDENTS
-- ============================================================

-- STEP 1: CLEAN UP OLD TABLES
DROP TABLE IF EXISTS cc_users CASCADE;
DROP TABLE IF EXISTS cc_students CASCADE;
DROP TABLE IF EXISTS cc_teachers CASCADE;
DROP TABLE IF EXISTS cc_schedule CASCADE;
DROP TABLE IF EXISTS cc_attendance CASCADE;
DROP TABLE IF EXISTS cc_homework CASCADE;
DROP TABLE IF EXISTS cc_exams CASCADE;
DROP TABLE IF EXISTS cc_marks CASCADE;
DROP TABLE IF EXISTS cc_announcements CASCADE;
DROP TABLE IF EXISTS cc_events CASCADE;
DROP TABLE IF EXISTS cc_messages CASCADE;
DROP TABLE IF EXISTS cc_issues CASCADE;
DROP TABLE IF EXISTS cc_issue_timeline CASCADE;
DROP TABLE IF EXISTS cc_fees CASCADE;
DROP TABLE IF EXISTS cc_documents CASCADE;
DROP TABLE IF EXISTS cc_settings CASCADE;

-- STEP 2: CREATE TABLES
-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE cc_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL,
    role_label VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    avatar_color VARCHAR(7),
    icon VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students table
CREATE TABLE cc_students (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    admission_number VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    class VARCHAR(10) NOT NULL,
    section VARCHAR(5),
    roll_number VARCHAR(10),
    gender VARCHAR(10),
    parent_name VARCHAR(100),
    parent_contact VARCHAR(20),
    parent_email VARCHAR(255),
    attendance_percentage DECIMAL(5,2) DEFAULT 0,
    gpa DECIMAL(3,2) DEFAULT 0,
    fee_status VARCHAR(20) DEFAULT 'Paid',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teachers table
CREATE TABLE cc_teachers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    classes TEXT,
    experience VARCHAR(50),
    phone VARCHAR(20),
    email VARCHAR(255),
    status VARCHAR(20) DEFAULT 'Active',
    department VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Announcements table
CREATE TABLE cc_announcements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL,
    author VARCHAR(100) NOT NULL,
    category VARCHAR(50) DEFAULT 'General',
    priority VARCHAR(20) DEFAULT 'medium',
    target_audience VARCHAR(50) DEFAULT 'All',
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STEP 3: INSERT USERS
INSERT INTO cc_users (username, password, name, email, phone, role, role_label, department, avatar_color, icon) VALUES
('VP001', 'VP123', 'SUMAN', 'vp@dpsnadergul.edu', '+91 98765 43210', 'vice_principal', 'Vice Principal', 'Executive Office', '#2d7a6e', 'fa-user-tie'),
('T001', 'teacher123', 'Prasana Reddy', 'prasana@dpsnadergul.edu', '+91 87654 32109', 'teacher', 'Teacher', 'Mathematics', '#5ca870', 'fa-chalkboard-teacher'),
('P3180076A', 'parent123', 'Parent of KASULA ASHWATH', 'ashwath@gmail.com', '+91 76543 21098', 'parent', 'Parent', 'Parent of KASULA ASHWATH (Class 9-C)', '#f57c00', 'fa-user-friends'),
('C001', 'coord123', 'Anitha', 'anitha@dpsnadergul.edu', '+91 54321 09876', 'coordinator', 'Coordinator', 'Academic Coordination', '#1976d2', 'fa-sitemap'),
('PRIN001', 'PRINCIPAL123', 'Principal', 'principal@dpsnadergul.edu', '+91 98765 00001', 'principal', 'Principal', 'Principal''s Office', '#1a237e', 'fa-user-shield');

-- STEP 4: INSERT ALL 9C STUDENTS (from image)
INSERT INTO cc_students (admission_number, name, class, section, roll_number, gender, parent_name, parent_contact, parent_email, attendance_percentage, gpa, fee_status) VALUES
('3180076', 'KASULA ASHWATH', '9', 'C', '01', 'Male', 'Parent of KASULA ASHWATH', '+91 76543 21098', 'ashwath@gmail.com', 94, 8.7, 'Paid'),
('3240214', 'NIMMAKAYALA PRATEEK REDDY', '9', 'C', '02', 'Male', 'Parent of NIMMAKAYALA PRATEEK REDDY', '+91 98765 43211', 'prateek@example.com', 88, 7.2, 'Paid'),
('3240215', 'BHUKYA PRANAVI', '9', 'C', '03', 'Female', 'Parent of BHUKYA PRANAVI', '+91 98765 43212', 'pranavi@example.com', 92, 8.1, 'Paid'),
('3240216', 'SNITHIK VENGALA', '9', 'C', '04', 'Male', 'Parent of SNITHIK VENGALA', '+91 98765 43213', 'snithik@example.com', 90, 7.8, 'Paid'),
('3240217', 'BHUKYA PRANEETH', '9', 'C', '05', 'Male', 'Parent of BHUKYA PRANEETH', '+91 98765 43214', 'praneeth@example.com', 85, 7.5, 'Paid'),
('3240218', 'G MANASWINI', '9', 'C', '06', 'Female', 'Parent of G MANASWINI', '+91 98765 43215', 'manaswini@example.com', 87, 7.6, 'Paid'),
('3240219', 'NIDHISH DUMALA', '9', 'C', '07', 'Male', 'Parent of NIDHISH DUMALA', '+91 98765 43216', 'nidhish@example.com', 89, 7.4, 'Paid'),
('3240220', 'SATHWIK REDDY GANTA', '9', 'C', '08', 'Male', 'Parent of SATHWIK REDDY GANTA', '+91 98765 43217', 'sathwik@example.com', 91, 7.9, 'Paid'),
('3240221', 'KOTHA ASHVIK', '9', 'C', '09', 'Male', 'Parent of KOTHA ASHVIK', '+91 98765 43218', 'ashvik@example.com', 93, 8.3, 'Paid'),
('3240222', 'PRANEETH BHUKYA', '9', 'C', '10', 'Male', 'Parent of PRANEETH BHUKYA', '+91 98765 43219', 'praneethb@example.com', 86, 7.7, 'Paid'),
('3240223', 'VYSHNAVI B', '9', 'C', '11', 'Female', 'Parent of VYSHNAVI B', '+91 98765 43220', 'vyshnavi@example.com', 88, 7.5, 'Paid'),
('3240224', 'HARSHITHA', '9', 'C', '12', 'Female', 'Parent of HARSHITHA', '+91 98765 43221', 'harshitha@example.com', 90, 7.8, 'Paid'),
('3240225', 'RUTVIK J', '9', 'C', '13', 'Male', 'Parent of RUTVIK J', '+91 98765 43222', 'rutvik@example.com', 84, 7.3, 'Paid'),
('3240226', 'SAICHARAN', '9', 'C', '14', 'Male', 'Parent of SAICHARAN', '+91 98765 43223', 'saicharan@example.com', 92, 8.0, 'Paid'),
('3240227', 'ADVAITH', '9', 'C', '15', 'Male', 'Parent of ADVAITH', '+91 98765 43224', 'advaith@example.com', 95, 8.5, 'Paid'),
('3240228', 'ANANYA', '9', 'C', '16', 'Female', 'Parent of ANANYA', '+91 98765 43225', 'ananya@example.com', 91, 8.2, 'Paid'),
('3240229', 'ROHITH', '9', 'C', '17', 'Male', 'Parent of ROHITH', '+91 98765 43226', 'rohith@example.com', 87, 7.6, 'Paid'),
('3240230', 'TEJAS', '9', 'C', '18', 'Male', 'Parent of TEJAS', '+91 98765 43227', 'tejas@example.com', 89, 7.7, 'Paid'),
('3240231', 'SNEHA', '9', 'C', '19', 'Female', 'Parent of SNEHA', '+91 98765 43228', 'sneha@example.com', 93, 8.1, 'Paid'),
('3240232', 'KARTHIK', '9', 'C', '20', 'Male', 'Parent of KARTHIK', '+91 98765 43229', 'karthik@example.com', 85, 7.4, 'Paid'),
('3240233', 'DIVYA', '9', 'C', '21', 'Female', 'Parent of DIVYA', '+91 98765 43230', 'divya@example.com', 88, 7.6, 'Paid'),
('3240234', 'VIKRANT', '9', 'C', '22', 'Male', 'Parent of VIKRANT', '+91 98765 43231', 'vikrant@example.com', 90, 7.8, 'Paid'),
('3240235', 'PRIYANKA', '9', 'C', '23', 'Female', 'Parent of PRIYANKA', '+91 98765 43232', 'priyanka@example.com', 92, 8.0, 'Paid'),
('3240236', 'RAHUL', '9', 'C', '24', 'Male', 'Parent of RAHUL', '+91 98765 43233', 'rahul@example.com', 86, 7.5, 'Paid'),
('3240237', 'MEERA', '9', 'C', '25', 'Female', 'Parent of MEERA', '+91 98765 43234', 'meera@example.com', 94, 8.4, 'Paid'),
('3240238', 'ARJUN', '9', 'C', '26', 'Male', 'Parent of ARJUN', '+91 98765 43235', 'arjun@example.com', 87, 7.6, 'Paid'),
('3240239', 'LAKSHMI', '9', 'C', '27', 'Female', 'Parent of LAKSHMI', '+91 98765 43236', 'lakshmi@example.com', 91, 7.9, 'Paid'),
('3240240', 'VENKAT', '9', 'C', '28', 'Male', 'Parent of VENKAT', '+91 98765 43237', 'venkat@example.com', 83, 7.2, 'Paid'),
('3240241', 'SOUNDARYA', '9', 'C', '29', 'Female', 'Parent of SOUNDARYA', '+91 98765 43238', 'soundarya@example.com', 89, 7.7, 'Paid'),
('3240242', 'CHANDRA', '9', 'C', '30', 'Male', 'Parent of CHANDRA', '+91 98765 43239', 'chandra@example.com', 92, 8.1, 'Paid');

-- STEP 5: INSERT 5 STUDENTS FOR EACH SECTION OF EACH CLASS (6-A to 10-D)
-- CLASS 6
INSERT INTO cc_students (admission_number, name, class, section, roll_number, gender, parent_name, parent_contact, parent_email, attendance_percentage, gpa, fee_status) VALUES
('3160001', 'RAVI KUMAR', '6', 'A', '01', 'Male', 'Parent of RAVI KUMAR', '+91 98765 44001', 'ravi6a@example.com', 85, 7.2, 'Paid'),
('3160002', 'ANJALI DEVI', '6', 'A', '02', 'Female', 'Parent of ANJALI DEVI', '+91 98765 44002', 'anjali6a@example.com', 88, 7.5, 'Paid'),
('3160003', 'RAJESH SINGH', '6', 'A', '03', 'Male', 'Parent of RAJESH SINGH', '+91 98765 44003', 'rajesh6a@example.com', 82, 6.9, 'Paid'),
('3160004', 'PRIYA SHARMA', '6', 'A', '04', 'Female', 'Parent of PRIYA SHARMA', '+91 98765 44004', 'priya6a@example.com', 90, 7.8, 'Paid'),
('3160005', 'AMIT KUMAR', '6', 'A', '05', 'Male', 'Parent of AMIT KUMAR', '+91 98765 44005', 'amit6a@example.com', 87, 7.4, 'Paid'),

('3160006', 'SUNITA RANI', '6', 'B', '01', 'Female', 'Parent of SUNITA RANI', '+91 98765 44006', 'sunita6b@example.com', 86, 7.3, 'Paid'),
('3160007', 'MANOJ KUMAR', '6', 'B', '02', 'Male', 'Parent of MANOJ KUMAR', '+91 98765 44007', 'manoj6b@example.com', 84, 7.1, 'Paid'),
('3160008', 'GEETA DEVI', '6', 'B', '03', 'Female', 'Parent of GEETA DEVI', '+91 98765 44008', 'geeta6b@example.com', 91, 7.9, 'Paid'),
('3160009', 'RAHUL VERMA', '6', 'B', '04', 'Male', 'Parent of RAHUL VERMA', '+91 98765 44009', 'rahul6b@example.com', 83, 6.8, 'Paid'),
('3160010', 'POOJA SINGH', '6', 'B', '05', 'Female', 'Parent of POOJA SINGH', '+91 98765 44010', 'pooja6b@example.com', 89, 7.6, 'Paid'),

('3160011', 'VIJAY KUMAR', '6', 'C', '01', 'Male', 'Parent of VIJAY KUMAR', '+91 98765 44011', 'vijay6c@example.com', 88, 7.5, 'Paid'),
('3160012', 'ANITA DEVI', '6', 'C', '02', 'Female', 'Parent of ANITA DEVI', '+91 98765 44012', 'anita6c@example.com', 85, 7.2, 'Paid'),
('3160013', 'SURESH KUMAR', '6', 'C', '03', 'Male', 'Parent of SURESH KUMAR', '+91 98765 44013', 'suresh6c@example.com', 90, 7.8, 'Paid'),
('3160014', 'MEENA KUMARI', '6', 'C', '04', 'Female', 'Parent of MEENA KUMARI', '+91 98765 44014', 'meena6c@example.com', 87, 7.4, 'Paid'),
('3160015', 'RAJEEV SINGH', '6', 'C', '05', 'Male', 'Parent of RAJEEV SINGH', '+91 98765 44015', 'rajeev6c@example.com', 82, 6.9, 'Paid'),

('3160016', 'KAVITA RANI', '6', 'D', '01', 'Female', 'Parent of KAVITA RANI', '+91 98765 44016', 'kavita6d@example.com', 91, 7.9, 'Paid'),
('3160017', 'MOHAN KUMAR', '6', 'D', '02', 'Male', 'Parent of MOHAN KUMAR', '+91 98765 44017', 'mohan6d@example.com', 84, 7.1, 'Paid'),
('3160018', 'SAROJ DEVI', '6', 'D', '03', 'Female', 'Parent of SAROJ DEVI', '+91 98765 44018', 'saroj6d@example.com', 86, 7.3, 'Paid'),
('3160019', 'DEEPAK KUMAR', '6', 'D', '04', 'Male', 'Parent of DEEPAK KUMAR', '+91 98765 44019', 'deepak6d@example.com', 89, 7.6, 'Paid'),
('3160020', 'REKHA SHARMA', '6', 'D', '05', 'Female', 'Parent of REKHA SHARMA', '+91 98765 44020', 'rekha6d@example.com', 83, 6.8, 'Paid');

-- CLASS 7
INSERT INTO cc_students (admission_number, name, class, section, roll_number, gender, parent_name, parent_contact, parent_email, attendance_percentage, gpa, fee_status) VALUES
('3170001', 'BHAVANA SINGH', '7', 'A', '01', 'Female', 'Parent of BHAVANA SINGH', '+91 98765 45001', 'bhavana7a@example.com', 87, 7.4, 'Paid'),
('3170002', 'KARAN SINGH', '7', 'A', '02', 'Male', 'Parent of KARAN SINGH', '+91 98765 45002', 'karan7a@example.com', 85, 7.2, 'Paid'),
('3170003', 'DIYA SHARMA', '7', 'A', '03', 'Female', 'Parent of DIYA SHARMA', '+91 98765 45003', 'diya7a@example.com', 92, 8.1, 'Paid'),
('3170004', 'VIKRANT SINGH', '7', 'A', '04', 'Male', 'Parent of VIKRANT SINGH', '+91 98765 45004', 'vikrant7a@example.com', 88, 7.6, 'Paid'),
('3170005', 'ANJALI KUMARI', '7', 'A', '05', 'Female', 'Parent of ANJALI KUMARI', '+91 98765 45005', 'anjali7a@example.com', 90, 7.9, 'Paid'),

('3170006', 'ROHIT KUMAR', '7', 'B', '01', 'Male', 'Parent of ROHIT KUMAR', '+91 98765 45006', 'rohit7b@example.com', 84, 7.1, 'Paid'),
('3170007', 'PRIYA VERMA', '7', 'B', '02', 'Female', 'Parent of PRIYA VERMA', '+91 98765 45007', 'priya7b@example.com', 89, 7.6, 'Paid'),
('3170008', 'AMIT SINGH', '7', 'B', '03', 'Male', 'Parent of AMIT SINGH', '+91 98765 45008', 'amit7b@example.com', 86, 7.3, 'Paid'),
('3170009', 'SNEHA RANI', '7', 'B', '04', 'Female', 'Parent of SNEHA RANI', '+91 98765 45009', 'sneha7b@example.com', 91, 7.8, 'Paid'),
('3170010', 'RAHUL KUMAR', '7', 'B', '05', 'Male', 'Parent of RAHUL KUMAR', '+91 98765 45010', 'rahul7b@example.com', 83, 6.9, 'Paid'),

('3170011', 'MEENA DEVI', '7', 'C', '01', 'Female', 'Parent of MEENA DEVI', '+91 98765 45011', 'meena7c@example.com', 88, 7.5, 'Paid'),
('3170012', 'MANOJ SINGH', '7', 'C', '02', 'Male', 'Parent of MANOJ SINGH', '+91 98765 45012', 'manoj7c@example.com', 85, 7.2, 'Paid'),
('3170013', 'POOJA KUMARI', '7', 'C', '03', 'Female', 'Parent of POOJA KUMARI', '+91 98765 45013', 'pooja7c@example.com', 90, 7.8, 'Paid'),
('3170014', 'VIJAY VERMA', '7', 'C', '04', 'Male', 'Parent of VIJAY VERMA', '+91 98765 45014', 'vijay7c@example.com', 87, 7.4, 'Paid'),
('3170015', 'ANITA RANI', '7', 'C', '05', 'Female', 'Parent of ANITA RANI', '+91 98765 45015', 'anita7c@example.com', 92, 8.1, 'Paid'),

('3170016', 'SURESH KUMAR', '7', 'D', '01', 'Male', 'Parent of SURESH KUMAR', '+91 98765 45016', 'suresh7d@example.com', 84, 7.1, 'Paid'),
('3170017', 'KAVITA SHARMA', '7', 'D', '02', 'Female', 'Parent of KAVITA SHARMA', '+91 98765 45017', 'kavita7d@example.com', 89, 7.6, 'Paid'),
('3170018', 'RAJEEV SINGH', '7', 'D', '03', 'Male', 'Parent of RAJEEV SINGH', '+91 98765 45018', 'rajeev7d@example.com', 86, 7.3, 'Paid'),
('3170019', 'SAROJ KUMARI', '7', 'D', '04', 'Female', 'Parent of SAROJ KUMARI', '+91 98765 45019', 'saroj7d@example.com', 91, 7.8, 'Paid'),
('3170020', 'DEEPAK VERMA', '7', 'D', '05', 'Male', 'Parent of DEEPAK VERMA', '+91 98765 45020', 'deepak7d@example.com', 83, 6.9, 'Paid');

-- CLASS 8
INSERT INTO cc_students (admission_number, name, class, section, roll_number, gender, parent_name, parent_contact, parent_email, attendance_percentage, gpa, fee_status) VALUES
('3180001', 'ARJUN SINGH', '8', 'A', '01', 'Male', 'Parent of ARJUN SINGH', '+91 98765 46001', 'arjun8a@example.com', 86, 7.3, 'Paid'),
('3180002', 'DIVYA SHARMA', '8', 'A', '02', 'Female', 'Parent of DIVYA SHARMA', '+91 98765 46002', 'divya8a@example.com', 90, 7.8, 'Paid'),
('3180003', 'KARTHIK KUMAR', '8', 'A', '03', 'Male', 'Parent of KARTHIK KUMAR', '+91 98765 46003', 'karthik8a@example.com', 88, 7.5, 'Paid'),
('3180004', 'PRIYA VERMA', '8', 'A', '04', 'Female', 'Parent of PRIYA VERMA', '+91 98765 46004', 'priya8a@example.com', 92, 8.1, 'Paid'),
('3180005', 'ROHIT SINGH', '8', 'A', '05', 'Male', 'Parent of ROHIT SINGH', '+91 98765 46005', 'rohit8a@example.com', 84, 7.1, 'Paid'),

('3180006', 'ANJALI KUMARI', '8', 'B', '01', 'Female', 'Parent of ANJALI KUMARI', '+91 98765 46006', 'anjali8b@example.com', 89, 7.6, 'Paid'),
('3180007', 'MANOJ VERMA', '8', 'B', '02', 'Male', 'Parent of MANOJ VERMA', '+91 98765 46007', 'manoj8b@example.com', 85, 7.2, 'Paid'),
('3180008', 'SNEHA RANI', '8', 'B', '03', 'Female', 'Parent of SNEHA RANI', '+91 98765 46008', 'sneha8b@example.com', 91, 7.9, 'Paid'),
('3180009', 'RAHUL KUMAR', '8', 'B', '04', 'Male', 'Parent of RAHUL KUMAR', '+91 98765 46009', 'rahul8b@example.com', 87, 7.4, 'Paid'),
('3180010', 'MEENA DEVI', '8', 'B', '05', 'Female', 'Parent of MEENA DEVI', '+91 98765 46010', 'meena8b@example.com', 83, 6.9, 'Paid'),

('3180011', 'VIJAY SINGH', '8', 'C', '01', 'Male', 'Parent of VIJAY SINGH', '+91 98765 46011', 'vijay8c@example.com', 90, 7.8, 'Paid'),
('3180012', 'POOJA SHARMA', '8', 'C', '02', 'Female', 'Parent of POOJA SHARMA', '+91 98765 46012', 'pooja8c@example.com', 86, 7.3, 'Paid'),
('3180013', 'SURESH KUMAR', '8', 'C', '03', 'Male', 'Parent of SURESH KUMAR', '+91 98765 46013', 'suresh8c@example.com', 88, 7.5, 'Paid'),
('3180014', 'ANITA RANI', '8', 'C', '04', 'Female', 'Parent of ANITA RANI', '+91 98765 46014', 'anita8c@example.com', 92, 8.1, 'Paid'),
('3180015', 'RAJEEV VERMA', '8', 'C', '05', 'Male', 'Parent of RAJEEV VERMA', '+91 98765 46015', 'rajeev8c@example.com', 84, 7.1, 'Paid'),

('3180016', 'KAVITA KUMARI', '8', 'D', '01', 'Female', 'Parent of KAVITA KUMARI', '+91 98765 46016', 'kavita8d@example.com', 89, 7.6, 'Paid'),
('3180017', 'MOHAN SINGH', '8', 'D', '02', 'Male', 'Parent of MOHAN SINGH', '+91 98765 46017', 'mohan8d@example.com', 85, 7.2, 'Paid'),
('3180018', 'SAROJ DEVI', '8', 'D', '03', 'Female', 'Parent of SAROJ DEVI', '+91 98765 46018', 'saroj8d@example.com', 91, 7.9, 'Paid'),
('3180019', 'DEEPAK KUMAR', '8', 'D', '04', 'Male', 'Parent of DEEPAK KUMAR', '+91 98765 46019', 'deepak8d@example.com', 87, 7.4, 'Paid'),
('3180020', 'REKHA SHARMA', '8', 'D', '05', 'Female', 'Parent of REKHA SHARMA', '+91 98765 46020', 'rekha8d@example.com', 83, 6.9, 'Paid');

-- CLASS 9 (excluding 9C which we already added)
INSERT INTO cc_students (admission_number, name, class, section, roll_number, gender, parent_name, parent_contact, parent_email, attendance_percentage, gpa, fee_status) VALUES
('3190001', 'BHAVANA VERMA', '9', 'A', '01', 'Female', 'Parent of BHAVANA VERMA', '+91 98765 47001', 'bhavana9a@example.com', 88, 7.5, 'Paid'),
('3190002', 'KARAN SINGH', '9', 'A', '02', 'Male', 'Parent of KARAN SINGH', '+91 98765 47002', 'karan9a@example.com', 85, 7.2, 'Paid'),
('3190003', 'DIVYA KUMARI', '9', 'A', '03', 'Female', 'Parent of DIVYA KUMARI', '+91 98765 47003', 'divya9a@example.com', 92, 8.1, 'Paid'),
('3190004', 'VIKRANT KUMAR', '9', 'A', '04', 'Male', 'Parent of VIKRANT KUMAR', '+91 98765 47004', 'vikrant9a@example.com', 89, 7.6, 'Paid'),
('3190005', 'ANJALI RANI', '9', 'A', '05', 'Female', 'Parent of ANJALI RANI', '+91 98765 47005', 'anjali9a@example.com', 86, 7.3, 'Paid'),

('3190006', 'MANOJ SHARMA', '9', 'B', '01', 'Male', 'Parent of MANOJ SHARMA', '+91 98765 47006', 'manoj9b@example.com', 90, 7.8, 'Paid'),
('3190007', 'SNEHA VERMA', '9', 'B', '02', 'Female', 'Parent of SNEHA VERMA', '+91 98765 47007', 'sneha9b@example.com', 84, 7.1, 'Paid'),
('3190008', 'RAHUL KUMAR', '9', 'B', '03', 'Male', 'Parent of RAHUL KUMAR', '+91 98765 47008', 'rahul9b@example.com', 91, 7.9, 'Paid'),
('3190009', 'MEENA DEVI', '9', 'B', '04', 'Female', 'Parent of MEENA DEVI', '+91 98765 47009', 'meena9b@example.com', 87, 7.4, 'Paid'),
('3190010', 'VIJAY SINGH', '9', 'B', '05', 'Male', 'Parent of VIJAY SINGH', '+91 98765 47010', 'vijay9b@example.com', 83, 6.9, 'Paid'),

('3190011', 'POOJA KUMARI', '9', 'D', '01', 'Female', 'Parent of POOJA KUMARI', '+91 98765 47011', 'pooja9d@example.com', 89, 7.6, 'Paid'),
('3190012', 'SURESH VERMA', '9', 'D', '02', 'Male', 'Parent of SURESH VERMA', '+91 98765 47012', 'suresh9d@example.com', 85, 7.2, 'Paid'),
('3190013', 'ANITA RANI', '9', 'D', '03', 'Female', 'Parent of ANITA RANI', '+91 98765 47013', 'anita9d@example.com', 92, 8.1, 'Paid'),
('3190014', 'RAJEEV KUMAR', '9', 'D', '04', 'Male', 'Parent of RAJEEV KUMAR', '+91 98765 47014', 'rajeev9d@example.com', 88, 7.5, 'Paid'),
('3190015', 'KAVITA SHARMA', '9', 'D', '05', 'Female', 'Parent of KAVITA SHARMA', '+91 98765 47015', 'kavita9d@example.com', 86, 7.3, 'Paid');

-- CLASS 10
INSERT INTO cc_students (admission_number, name, class, section, roll_number, gender, parent_name, parent_contact, parent_email, attendance_percentage, gpa, fee_status) VALUES
('3200001', 'ARUN KUMAR', '10', 'A', '01', 'Male', 'Parent of ARUN KUMAR', '+91 98765 48001', 'arun10a@example.com', 91, 7.9, 'Paid'),
('3200002', 'DIVYA SHARMA', '10', 'A', '02', 'Female', 'Parent of DIVYA SHARMA', '+91 98765 48002', 'divya10a@example.com', 87, 7.4, 'Paid'),
('3200003', 'KARTHIK VERMA', '10', 'A', '03', 'Male', 'Parent of KARTHIK VERMA', '+91 98765 48003', 'karthik10a@example.com', 89, 7.6, 'Paid'),
('3200004', 'PRIYA KUMARI', '10', 'A', '04', 'Female', 'Parent of PRIYA KUMARI', '+91 98765 48004', 'priya10a@example.com', 93, 8.2, 'Paid'),
('3200005', 'ROHIT SINGH', '10', 'A', '05', 'Male', 'Parent of ROHIT SINGH', '+91 98765 48005', 'rohit10a@example.com', 85, 7.2, 'Paid'),

('3200006', 'ANJALI RANI', '10', 'B', '01', 'Female', 'Parent of ANJALI RANI', '+91 98765 48006', 'anjali10b@example.com', 90, 7.8, 'Paid'),
('3200007', 'MANOJ KUMAR', '10', 'B', '02', 'Male', 'Parent of MANOJ KUMAR', '+91 98765 48007', 'manoj10b@example.com', 84, 7.1, 'Paid'),
('3200008', 'SNEHA VERMA', '10', 'B', '03', 'Female', 'Parent of SNEHA VERMA', '+91 98765 48008', 'sneha10b@example.com', 92, 8.1, 'Paid'),
('3200009', 'RAHUL SHARMA', '10', 'B', '04', 'Male', 'Parent of RAHUL SHARMA', '+91 98765 48009', 'rahul10b@example.com', 88, 7.5, 'Paid'),
('3200010', 'MEENA DEVI', '10', 'B', '05', 'Female', 'Parent of MEENA DEVI', '+91 98765 48010', 'meena10b@example.com', 86, 7.3, 'Paid'),

('3200011', 'VIJAY KUMAR', '10', 'C', '01', 'Male', 'Parent of VIJAY KUMAR', '+91 98765 48011', 'vijay10c@example.com', 89, 7.6, 'Paid'),
('3200012', 'POOJA SHARMA', '10', 'C', '02', 'Female', 'Parent of POOJA SHARMA', '+91 98765 48012', 'pooja10c@example.com', 91, 7.9, 'Paid'),
('3200013', 'SURESH VERMA', '10', 'C', '03', 'Male', 'Parent of SURESH VERMA', '+91 98765 48013', 'suresh10c@example.com', 84, 7.1, 'Paid'),
('3200014', 'ANITA RANI', '10', 'C', '04', 'Female', 'Parent of ANITA RANI', '+91 98765 48014', 'anita10c@example.com', 87, 7.4, 'Paid'),
('3200015', 'RAJEEV KUMAR', '10', 'C', '05', 'Male', 'Parent of RAJEEV KUMAR', '+91 98765 48015', 'rajeev10c@example.com', 93, 8.2, 'Paid'),

('3200016', 'KAVITA KUMARI', '10', 'D', '01', 'Female', 'Parent of KAVITA KUMARI', '+91 98765 48016', 'kavita10d@example.com', 85, 7.2, 'Paid'),
('3200017', 'MOHAN SHARMA', '10', 'D', '02', 'Male', 'Parent of MOHAN SHARMA', '+91 98765 48017', 'mohan10d@example.com', 90, 7.8, 'Paid'),
('3200018', 'SAROJ DEVI', '10', 'D', '03', 'Female', 'Parent of SAROJ DEVI', '+91 98765 48018', 'saroj10d@example.com', 88, 7.5, 'Paid'),
('3200019', 'DEEPAK KUMAR', '10', 'D', '04', 'Male', 'Parent of DEEPAK KUMAR', '+91 98765 48019', 'deepak10d@example.com', 92, 8.1, 'Paid'),
('3200020', 'REKHA RANI', '10', 'D', '05', 'Female', 'Parent of REKHA RANI', '+91 98765 48020', 'rekha10d@example.com', 86, 7.3, 'Paid');

-- STEP 6: INSERT TEACHERS
INSERT INTO cc_teachers (employee_id, name, subject, classes, experience, phone, email, status, department) VALUES
('T001', 'Prasana Reddy', 'Mathematics', '10-A, 9-B, 8-C', '8 years', '+91 87654 11111', 'prasana@dpsnadergul.edu', 'Active', 'Mathematics Department'),
('T002', 'Ramesh Sharma', 'Physics', '10-A, 10-B', '12 years', '+91 87654 22222', 'ramesh@dpsnadergul.edu', 'Active', 'Science Department'),
('T003', 'Anita Pillai', 'English Literature', '8-B, 9-A', '6 years', '+91 87654 33333', 'anita@dpsnadergul.edu', 'Active', 'English Department'),
('T004', 'Mohan Das', 'Chemistry', '9-C, 10-C', '10 years', '+91 87654 44444', 'mohan@dpsnadergul.edu', 'Active', 'Science Department'),
('T005', 'Sunita Verma', 'Social Studies', '8-A, 9-D', '7 years', '+91 87654 55555', 'sunita@dpsnadergul.edu', 'Active', 'Social Studies Department'),
('T006', 'Venkat Iyer', 'Computer Science', '9-C, 10-D', '5 years', '+91 87654 66666', 'venkat@dpsnadergul.edu', 'Active', 'Computer Science Department'),
('T007', 'Pooja Mehta', 'Biology', '8-C, 9-C', '9 years', '+91 87654 77777', 'pooja@dpsnadergul.edu', 'Active', 'Science Department');

-- STEP 7: INSERT ANNOUNCEMENTS
INSERT INTO cc_announcements (title, content, date, author, category, priority, target_audience) VALUES
('Welcome to CampusCore', 'This is the new school management system for DPS Nadergul. All students, parents, and teachers can now access their dashboards.', CURRENT_DATE, 'System', 'General', 'high', 'All'),
('Mid-Term Examination Schedule', 'Mid-term exams will start from next week. Please check the schedule in your respective dashboards.', CURRENT_DATE, 'Coordinator', 'Academic', 'high', 'All'),
('Annual Sports Day', 'Annual sports day is scheduled for next month. All students are requested to participate.', CURRENT_DATE, 'VP', 'Events', 'medium', 'All'),
('Parent-Teacher Meeting', 'PTM is scheduled for this Saturday. All parents are requested to attend.', CURRENT_DATE, 'Principal', 'Meeting', 'medium', 'Parents'),
('Fee Payment Reminder', 'Last date for fee payment is approaching. Please pay the fees on time.', CURRENT_DATE, 'Admin Office', 'Finance', 'high', 'Parents');

-- STEP 8: GRANT PERMISSIONS
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- SUCCESS MESSAGE
DO $$
BEGIN
    RAISE NOTICE '===========================================================';
    RAISE NOTICE 'CAMPUSCORE DATABASE SETUP COMPLETED SUCCESSFULLY!';
    RAISE NOTICE '===========================================================';
    RAISE NOTICE 'Tables created: 4';
    RAISE NOTICE 'Total students added: 130';
    RAISE NOTICE 'Class 9-C students: 30 (from image)';
    RAISE NOTICE 'Other classes: 100 (5 students per section)';
    RAISE NOTICE 'Teachers added: 7';
    RAISE NOTICE 'Announcements added: 5';
    RAISE NOTICE 'Sample users ready for login';
    RAISE NOTICE '';
    RAISE NOTICE 'Login credentials:';
    RAISE NOTICE 'VP001/VP123 (Vice Principal)';
    RAISE NOTICE 'T001/teacher123 (Teacher)';
    RAISE NOTICE 'P3180076A/parent123 (Parent)';
    RAISE NOTICE 'C001/coord123 (Coordinator)';
    RAISE NOTICE 'PRIN001/PRINCIPAL123 (Principal)';
    RAISE NOTICE '';
    RAISE NOTICE 'Your CampusCore application is now ready!';
    RAISE NOTICE '===========================================================';
END $$;
