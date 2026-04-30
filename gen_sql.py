import re
import json

def extract_students():
    with open('js/data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract line by line and find student objects

    students = []
    lines = content.split('\n')
    for line in lines:
        if '{ id: "' in line and 'admNo:' in line:
            # Clean the line to be more like JSON but handle JS quirks
            # Example line: { id: "3180076", admNo: "3180076", name: "KASULA ASHWATH", ... },
            line = line.strip().strip('{},')
            obj = {}
            # Split by comma but be careful of commas inside quotes
            # Simplified split for this specific data format
            parts = re.findall(r'(\w+):\s*("(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\'|[^,]+)', line)
            for key, val in parts:
                key = key.strip()
                val = val.strip().strip('"\'')
                obj[key] = val
            if obj:
                students.append(obj)

    
    return students

def generate_sql(students):
    sql = "-- VERIFIED CAMPUSCORE DATABASE SETUP\n\n"
    sql += "DROP TABLE IF EXISTS cc_students CASCADE;\n"
    sql += "CREATE TABLE cc_students (\n"
    sql += "    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\n"
    sql += "    adm_no VARCHAR(20) UNIQUE NOT NULL,\n"
    sql += "    name VARCHAR(100) NOT NULL,\n"
    sql += "    class VARCHAR(10) NOT NULL,\n"
    sql += "    roll VARCHAR(10),\n"
    sql += "    gender VARCHAR(10),\n"
    sql += "    dob VARCHAR(20),\n"
    sql += "    attendance DECIMAL(5,2) DEFAULT 0,\n"
    sql += "    behavior VARCHAR(50),\n"
    sql += "    fee_status VARCHAR(20) DEFAULT 'Paid',\n"
    sql += "    gpa DECIMAL(3,2) DEFAULT 0,\n"
    sql += "    parent_name VARCHAR(100),\n"
    sql += "    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n"
    sql += ");\n\n"
    
    sql += "INSERT INTO cc_students (adm_no, name, class, roll, gender, dob, attendance, behavior, fee_status, gpa, parent_name) VALUES\n"
    
    values = []
    for s in students:
        v = "('{admNo}', '{name}', '{cls}', '{roll}', '{gender}', '{dob}', {attendance}, '{behavior}', '{fee_status}', {gpa}, '{parent}')".format(
            admNo=s.get('admNo', ''),
            name=s.get('name', '').replace("'", "''"),
            cls=s.get('class', ''),
            roll=s.get('roll', ''),
            gender=s.get('gender', 'Unknown'),
            dob=s.get('dob', ''),
            attendance=s.get('attendance', 0),
            behavior=s.get('behavior', 'Good'),
            fee_status=s.get('fee_status', 'Paid'),
            gpa=s.get('gpa', 0),
            parent=s.get('parent', '').replace("'", "''")
        )

        values.append(v)
    
    sql += ",\n".join(values) + ";\n"
    return sql

if __name__ == "__main__":
    students = extract_students()
    print(f"Extracted {len(students)} students")
    sql = generate_sql(students)
    with open('verified_students.sql', 'w', encoding='utf-8') as f:
        f.write(sql)
