# Supabase Database Setup Instructions

## 🎯 Overview
This guide will help you set up the complete CampusCore database in Supabase with all tables, data, and functionality.

## 📋 Prerequisites
- Supabase account (https://supabase.com)
- Your Supabase project URL: `https://bzqqgurlqunpzgdavedz.supabase.co`
- Your Supabase project API key

## 🚀 Step-by-Step Setup

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New query" to open a new SQL editor tab

### Step 2: Execute the Complete SQL Script
1. Open the `supabase-complete.sql` file from your project folder
2. Copy the entire content of the file
3. Paste it into the Supabase SQL editor
4. Click "Run" to execute the script

### Step 3: What the Script Does
The `supabase-complete.sql` script will:

#### 🗑️ **Clean Up Old Data**
- Drops all existing tables to start fresh
- Ensures no conflicts with previous installations

#### 🏗️ **Create All Tables**
- `cc_users` - User accounts (students, parents, teachers, admins)
- `cc_students` - Student profiles and academic data
- `cc_teachers` - Teacher information and assignments
- `cc_schedule` - Class timetables
- `cc_attendance` - Attendance records
- `cc_homework` - Homework assignments
- `cc_exams` - Examination schedules
- `cc_marks` - Student marks and grades
- `cc_announcements` - School notices
- `cc_events` - School events
- `cc_messages` - Internal messaging
- `cc_issues` - Student issues and escalations
- `cc_issue_timeline` - Issue tracking
- `cc_fees` - Fee records
- `cc_documents` - Document management
- `cc_settings` - System settings

#### 👥 **Insert Sample Data**
- **230 Students** - 10 students per section (6-A to 10-D)
- **7 Teachers** - All subject teachers with assignments
- **15 Users** - Admin, teacher, parent, and student accounts
- **Sample Data** - Attendance, homework, exams, announcements, etc.

### Step 4: Verify the Setup
After running the script, verify the setup:

1. **Check Tables**: In Supabase dashboard, click "Table Editor" to see all tables
2. **Check Data**: Click on any table to verify data was inserted
3. **Test Connection**: The website should now connect to your Supabase database

## 📊 Expected Data Counts

### Students: 230 Total
- **Class 6**: 40 students (10 per section A-D)
- **Class 7**: 40 students (10 per section A-D)  
- **Class 8**: 40 students (10 per section A-D)
- **Class 9**: 40 students (10 per section A-D)
- **Class 10**: 40 students (10 per section A-D)

### Teachers: 7 Total
- Prasana Reddy (Mathematics)
- Ramesh Sharma (Physics)
- Anita Pillai (English)
- Mohan Das (Chemistry)
- Sunita Verma (Social Studies)
- Venkat Iyer (Computer Science)
- Pooja Mehta (Biology)

### Users: 15 Total
- 1 Super Admin
- 1 Vice Principal
- 1 Principal
- 1 Coordinator
- 7 Teachers
- 1 Class Teacher
- 1 Parent
- 2 Students

## 🔧 Configuration Files

### Supabase Client Configuration
The `js/supabase-client.js` file is already configured with:
- Project URL: `https://bzqqgurlqunpzgdavedz.supabase.co`
- Anonymous key: Already set

### Data Synchronization
The `js/data.js` file contains synchronized data that matches the database structure.

## 🚨 Important Notes

### ⚠️ **Backup First**
If you have existing data in Supabase, back it up before running this script as it will drop all existing tables.

### 🔑 **Security**
- The script uses UUID for primary keys
- No sensitive passwords are included
- All user passwords are set to default values (change them after setup)

### 🔄 **Data Sync**
- The application will automatically sync with Supabase
- Local data arrays are synchronized with database structure
- Real-time updates will work for all features

## 🎉 After Setup

Once the script is successfully executed:

1. **Test Login**: Try logging in with different user accounts
2. **Verify Data**: Check that all 230 students are visible
3. **Test Features**: Test admin features like user registration, bulk upload
4. **Check Sync**: Verify data changes are reflected in real-time

## 🆘 Troubleshooting

### Common Issues:
1. **SQL Execution Error**: Check for syntax errors in the SQL editor
2. **Permission Denied**: Ensure you have admin rights in Supabase
3. **Connection Issues**: Verify the Supabase URL and keys in the client configuration
4. **Missing Data**: Check if the script completed successfully (no error messages)

### Support:
- Check the Supabase dashboard for any error messages
- Verify the SQL script executed completely
- Test the application connection to the database

## 📱 Next Steps

After database setup:
1. Deploy the updated code to your hosting
2. Test all user roles and features
3. Customize the data as needed for your school
4. Set up proper user authentication

---

**✅ Your CampusCore system is now ready with full database integration!**
