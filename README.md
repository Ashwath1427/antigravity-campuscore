# antigravity-campuscore

> CampusCore - Digital Campus Management System with Supabase backend. Dashboards for Admin, Teacher, Coordinator, Parent & Student.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript (Vite / React)
- **Backend/Database:** [Supabase](https://supabase.com) (PostgreSQL)
- **Auth:** Supabase Auth

## Supabase Project
- **Project URL:** `https://bzqqgurlqunpzgdavedz.supabase.co`
- **Region:** Primary Database

## Database Tables (16 total)
| Table | Description |
|-------|-------------|
| `schools` | School info |
| `users` | All users (admin, teacher, coordinator, parent, student) |
| `classes` | Class/grade sections |
| `subjects` | Subjects per school |
| `class_subject_teachers` | Maps classes, subjects & teachers |
| `students` | Student profiles |
| `parent_student` | Parent-student relationships |
| `timetable` | Class schedules |
| `assignments` | Homework/assignments by teachers |
| `assignment_submissions` | Student submissions |
| `attendance` | Daily attendance records |
| `exams` | Exam schedule |
| `marks` | Student exam marks |
| `fees` | Fee records & payment status |
| `announcements` | School announcements |
| `notifications` | User notifications |

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/Ashwath1427/antigravity-campuscore.git
cd antigravity-campuscore
```

### 2. Install dependencies
```bash
npm install
npm install @supabase/supabase-js
```

### 3. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` and fill in your Supabase anon key:
```
VITE_SUPABASE_URL=https://bzqqgurlqunpzgdavedz.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Set up the database
Run the SQL in `supabase/schema.sql` in the [Supabase SQL Editor](https://supabase.com/dashboard/project/bzqqgurlqunpzgdavedz/sql).

### 5. Start the dev server
```bash
npm run dev
```

## Usage in Code
```js
import { supabase } from './src/lib/supabaseClient';

// Example: fetch all students
const { data, error } = await supabase.from('students').select('*');
```

## Roles
- **Admin / VP** - Full access
- **Teacher** - Classes, assignments, attendance, marks
- **Coordinator** - Scheduling, timetables
- **Parent** - View child's attendance, marks, fees
- **Student** - View own data, submit assignments

## License
MIT
