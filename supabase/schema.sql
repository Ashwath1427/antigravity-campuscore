-- CampusCore Supabase Schema
-- Project: antigravity-campuscore
-- URL: https://bzqqgurlqunpzgdavedz.supabase.co

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- SCHOOLS
-- =====================
CREATE TABLE IF NOT EXISTS schools (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  address text,
  phone text,
  email text,
  logo_url text,
  created_at timestamptz DEFAULT now()
);

-- =====================
-- USERS
-- =====================
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id uuid REFERENCES schools(id),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin','teacher','coordinator','parent','student')),
  phone text,
  avatar_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- =====================
-- CLASSES
-- =====================
CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id uuid REFERENCES schools(id),
  name text NOT NULL,
  grade text NOT NULL,
  section text,
  academic_year text,
  class_teacher_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- =====================
-- SUBJECTS
-- =====================
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id uuid REFERENCES schools(id),
  name text NOT NULL,
  code text,
  created_at timestamptz DEFAULT now()
);

-- =====================
-- CLASS SUBJECT TEACHERS (Junction)
-- =====================
CREATE TABLE IF NOT EXISTS class_subject_teachers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id uuid NOT NULL REFERENCES classes(id),
  subject_id uuid NOT NULL REFERENCES subjects(id),
  teacher_id uuid NOT NULL REFERENCES users(id)
);

-- =====================
-- STUDENTS
-- =====================
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id),
  school_id uuid REFERENCES schools(id),
  class_id uuid REFERENCES classes(id),
  roll_number text,
  admission_number text,
  date_of_birth date,
  gender text,
  created_at timestamptz DEFAULT now()
);

-- =====================
-- PARENT STUDENT (Junction)
-- =====================
CREATE TABLE IF NOT EXISTS parent_student (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id uuid NOT NULL REFERENCES users(id),
  student_id uuid NOT NULL REFERENCES students(id)
);

-- =====================
-- TIMETABLE
-- =====================
CREATE TABLE IF NOT EXISTS timetable (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id uuid NOT NULL REFERENCES classes(id),
  subject_id uuid NOT NULL REFERENCES subjects(id),
  teacher_id uuid NOT NULL REFERENCES users(id),
  day_of_week text,
  start_time time,
  end_time time,
  room text
);

-- =====================
-- ASSIGNMENTS
-- =====================
CREATE TABLE IF NOT EXISTS assignments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id uuid NOT NULL REFERENCES classes(id),
  subject_id uuid NOT NULL REFERENCES subjects(id),
  teacher_id uuid NOT NULL REFERENCES users(id),
  title text NOT NULL,
  description text,
  due_date timestamptz,
  max_marks numeric,
  attachment_url text,
  created_at timestamptz DEFAULT now()
);

-- =====================
-- ASSIGNMENT SUBMISSIONS
-- =====================
CREATE TABLE IF NOT EXISTS assignment_submissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id uuid NOT NULL REFERENCES assignments(id),
  student_id uuid NOT NULL REFERENCES students(id),
  submission_url text,
  submitted_at timestamptz DEFAULT now(),
  marks_given numeric,
  feedback text,
  status text
);

-- =====================
-- ATTENDANCE
-- =====================
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id uuid NOT NULL REFERENCES students(id),
  class_id uuid NOT NULL REFERENCES classes(id),
  subject_id uuid REFERENCES subjects(id),
  date date NOT NULL,
  status text NOT NULL CHECK (status IN ('present','absent','late')),
  marked_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- =====================
-- EXAMS
-- =====================
CREATE TABLE IF NOT EXISTS exams (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id uuid REFERENCES schools(id),
  class_id uuid REFERENCES classes(id),
  subject_id uuid REFERENCES subjects(id),
  title text NOT NULL,
  exam_date date,
  start_time time,
  end_time time,
  max_marks numeric,
  created_at timestamptz DEFAULT now()
);

-- =====================
-- MARKS
-- =====================
CREATE TABLE IF NOT EXISTS marks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id uuid NOT NULL REFERENCES exams(id),
  student_id uuid NOT NULL REFERENCES students(id),
  marks_obtained numeric,
  grade text,
  remarks text,
  created_at timestamptz DEFAULT now()
);

-- =====================
-- FEES
-- =====================
CREATE TABLE IF NOT EXISTS fees (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id uuid NOT NULL REFERENCES students(id),
  school_id uuid REFERENCES schools(id),
  fee_type text NOT NULL,
  amount numeric NOT NULL,
  due_date date,
  paid_date date,
  status text CHECK (status IN ('pending','paid','overdue')),
  created_at timestamptz DEFAULT now()
);

-- =====================
-- ANNOUNCEMENTS
-- =====================
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id uuid REFERENCES schools(id),
  author_id uuid REFERENCES users(id),
  title text NOT NULL,
  content text,
  target_role text,
  published_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- =====================
-- NOTIFICATIONS
-- =====================
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id),
  title text NOT NULL,
  message text,
  is_read boolean DEFAULT false,
  type text,
  created_at timestamptz DEFAULT now()
);
