import json

raw = """
1\t9C\t3160136\tPRANEETH BHUKYA
2\t9C\t3160417\tSATHWIK REDDY GANTA
3\t9C\t3160662\tKOTHA ASHVIK
4\t9C\t3170292\tBOPPARAJU ABHIRAM
5\t9C\t3170355\tBOYINI VIVEKANANDA MUDIRAJ
6\t9C\t3170390\tLOLLA ABHIRAM
7\t9C\t3180076\tKASULA ASHWATH
8\t9C\t3180133\tSNITHIK VENGALA
9\t9C\t3180183\tNIDHISH DUMALA
10\t9C\t3180184\tYAMMANURU HARITEJA
11\t9C\t3180286\tCHARAN BATTU
12\t9C\t3190472\tATHUL M
13\t9C\t3200320\tSIDDHARTH REDDY SADIVILLA
14\t9C\t3200437\tSIDDALA RAMCHARAN
15\t9C\t3210447\tSAPAVATH JAHNAVI
16\t9C\t3210590\tK MOKSHA
17\t9C\t3230302\tBOJJA HARIKESH REDDY
18\t9C\t3230706\tEKADANTHA YADAV
19\t9C\t3240214\tNIMMAKAYALA PRATEEK REDDY
20\t9C\t3240504\tCHEEKOORI SAI CHARAN
21\t9C\t3240693\tVALLETI SAI HARSHITH
22\t9C\t3250112\tP SATHWIK REDDY
23\t9C\t3260066\tDEPA AARYAN REDDY (NA)
24\t9C\t3230719\tG MANASWINI
25\t9C\t3170068\tSHERI RITHIK REDDY
26\t9C\t3220915\tBHUKYA PRANAVI
27\t9C\t3190133\tTANABUDDI SRI BHAVESH REDDY
"""

users_str = "// ─── Generated Parent Users (Class 9-C) ───\n"
students_str = "// ─── Generated Students (Class 9-C) ───\n"

for i, line in enumerate(raw.strip().split('\n')):
    parts = line.split('\t')
    if len(parts) != 4: continue
    sno, sec, adm, name = parts
    clean_name = name.replace(" (NA)", "")
    roll = str(sno).zfill(2)
    id_num = 100 + int(sno)
    
    users_str += f"""  {{
    id: {id_num},
    username: "P{adm}A",
    password: "PARENT123",
    name: "Parent of {clean_name}",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of {clean_name} (Class 9-C)",
    phone: "+91 99999 {roll}000",
    email: "parent{adm}@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "{clean_name}",
    childId: "{adm}",
    childClass: "9-C",
    childRoll: "{roll}",
    notifications: []
  }},
"""
    att = 85 + (i % 15)
    gpa = round(7.5 + (i % 20) * 0.1, 1)
    students_str += f'  {{ id: "S{id_num}", admNo: "{adm}", name: "{clean_name}", class: "9-C", roll: "{roll}", gender: "Unknown", dob: "15 Jan 2011", attendance: {att}, behavior: "Good", fee_status: "Paid", gpa: {gpa}, parent: "Parent of {clean_name}" }},\n'

with open("gen_output.txt", "w", encoding="utf-8") as f:
    f.write(users_str + "\n\n" + students_str)
