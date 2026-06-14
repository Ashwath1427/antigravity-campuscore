import json
import re
import random

def main():
    with open('js/data.js', 'r', encoding='utf-8') as f:
        text = f.read()

    # Extract 9C students
    match_9c = re.search(r'"C":\s*\[(.*?)\]', text[text.find('"9":'):], re.DOTALL)
    original_9c = match_9c.group(1) if match_9c else ''
    
    classes = [10, 9, 8, 7, 6]
    sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
    
    # Generate SCHOOL_DATA
    school_data_str = "window.SCHOOL_DATA = {\n  classes: {\n"
    
    names = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan",
             "Shaurya", "Atharv", "Advik", "Pranav", "Kabir", "Ritvik", "Aarush", "Darsh", "Dhruv", "Hardik",
             "Saanvi", "Aanya", "Aadhya", "Aaradhya", "Ananya", "Pari", "Anika", "Navya", "Diya", "Avni",
             "Myra", "Ira", "Ahana", "Anvi", "Prisha", "Riya", "Kavya", "Aashvi", "Shanaya", "Kyra"]
             
    surnames = ["Sharma", "Verma", "Gupta", "Patel", "Singh", "Reddy", "Rao", "Das", "Kumar", "Iyer",
                "Menon", "Pillai", "Nair", "Bose", "Chowdhury", "Mukherjee", "Desai", "Joshi", "Kulkarni"]
    
    for cls in classes:
        school_data_str += f'    "{cls}": {{\n'
        for sec in sections:
            school_data_str += f'      "{sec}": [\n'
            
            if cls == 9 and sec == 'C':
                school_data_str += f'        {original_9c}\n'
            else:
                # Add exactly 10 students
                for roll in range(1, 11):
                    id_val = f"{cls}{sec}{roll:02d}"
                    gender = random.choice(["Male", "Female"])
                    name = f"{random.choice(names)} {random.choice(surnames)}"
                    attendance = random.randint(80, 99)
                    gpa = round(random.uniform(6.5, 9.8), 1)
                    
                    school_data_str += f'        {{ id: "{id_val}", admNo: "{id_val}", name: "{name}", class: "{cls}", section: "{sec}", roll: "{roll:02d}", gender: "{gender}", dob: "15 Jan {2026-cls-5}", attendance: {attendance}, behavior: "Good", fee_status: "Paid", gpa: {gpa}, parent: "Parent of {name}" }},\n'
                school_data_str = school_data_str.rstrip(',\n') + '\n'
            
            school_data_str += '      ],\n'
            
        school_data_str = school_data_str.rstrip(',\n') + '\n'
        school_data_str += '    },\n'
        
    school_data_str = school_data_str.rstrip(',\n') + '\n'
    school_data_str += '  }\n};'
    
    # Replace SCHOOL_DATA in data.js
    start = text.find('window.SCHOOL_DATA = {')
    end = text.find('};', start) + 2
    
    new_text = text[:start] + school_data_str + text[end:]
    
    # Now generate CLASS_PERFORMANCE array for all 60 classes
    cp_str = "const CLASS_PERFORMANCE = [\n"
    for cls in classes:
        for sec in sections:
            teacher = random.choice(["Prasana Reddy", "Ramesh Sharma", "Anita Pillai", "Mohan Das", "Sunita Verma", "Venkat Iyer", "Pooja Mehta", "Suresh Naidu", "Deepa Rani"])
            cp_str += f'  {{ class: "{cls}-{sec}", teacher: "{teacher}", avgAtt: {random.randint(85,96)}, avgGPA: {round(random.uniform(7.0, 9.2),1)}, topper: "{random.choice(names)} {random.choice(surnames)}", weak: {random.randint(0,5)}, issues: {random.randint(0,3)} }},\n'
    cp_str += "];\n\nCLASS_PERFORMANCE.sort"
    
    # Replace CLASS_PERFORMANCE in data.js
    cp_start = new_text.find('const CLASS_PERFORMANCE = [')
    cp_end = new_text.find('CLASS_PERFORMANCE.sort', cp_start)
    new_text = new_text[:cp_start] + cp_str + new_text[cp_end+len('CLASS_PERFORMANCE.sort'):]
    
    # Force localStorage cache bust inside initDataStore
    # Let's find: if (!localStorage.getItem('campuscore_students')) {
    ls_fix = """  // Clear students array cache dynamically if needed
  localStorage.removeItem('campuscore_students');
  if (!localStorage.getItem('campuscore_students')) {"""
    new_text = new_text.replace("if (!localStorage.getItem('campuscore_students')) {", ls_fix)
    
    with open('js/data.js', 'w', encoding='utf-8') as f:
        f.write(new_text)
        
    # Also we need to sync STUDENTS in data-synced.js
    with open('js/data-synced.js', 'r', encoding='utf-8') as f:
        ds_text = f.read()
        
    ds_start = ds_text.find('let STUDENTS = [')
    ds_end = ds_text.find('STUDENTS.sort(', ds_start)
    
    ds_new = ds_text[:ds_start] + 'let STUDENTS = [];\n// Built in data.js\n\n' + ds_text[ds_end:]
    
    with open('js/data-synced.js', 'w', encoding='utf-8') as f:
        f.write(ds_new)
        
    print("Done generating mock data for 60 classes (6A to 10L)!")

if __name__ == '__main__':
    main()
