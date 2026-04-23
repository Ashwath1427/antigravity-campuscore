/**
 * CampusCore – Institutional Bulk Upload Processor
 * Uses SheetJS (XLSX) for high-fidelity data extraction.
 */

window.BulkUploadProcessor = {
    /**
     * Generates and downloads a CSV template for Student Registration
     */
    downloadStudentTemplate: function() {
        const headers = ["Name", "Class", "Section", "Roll No", "Gender", "DOB", "ParentName", "Username", "Password"];
        const rows = [
            ["PRANEETH BHUKYA", "9", "C", "01", "Male", "2011-01-15", "Parent of PRANEETH", "P3160136", "parent123"],
            ["SATHWIK REDDY", "9", "C", "02", "Male", "2011-02-22", "Parent of SATHWIK", "P3160417", "parent123"]
        ];
        
        this._downloadCSV("student_bulk_upload_template.csv", [headers, ...rows]);
        if (window.simulateAction) simulateAction("Student template downloaded successfully.");
    },

    /**
     * Processes student Excel/CSV file
     */
    processStudents: async function(file) {
        if (!file) return;
        if (window.simulateAction) simulateAction(`Processing ${file.name}...`);

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);

                if (json.length === 0) {
                    if (window.simulateAction) simulateAction("Error: File is empty.");
                    return;
                }

                console.log("[CampusCore] Parsed Student Data:", json);
                
                // Map to CampusCore internal format
                const newStudents = json.map(row => ({
                    id: String(row["Roll No"] || Math.floor(Math.random() * 1000000)),
                    name: row["Name"],
                    class: row["Class"],
                    section: row["Section"],
                    roll: String(row["Roll No"]),
                    gender: row["Gender"] || "Male",
                    dob: row["DOB"] || "2010-01-01",
                    parent: row["ParentName"],
                    username: row["Username"] || ("S" + row["Roll No"]),
                    password: row["Password"] || "student123",
                    attendance: 100,
                    gpa: 0,
                    role: 'student'
                }));

                this._saveImportedStudents(newStudents);

                if (window.simulateAction) {
                    simulateAction(`Success: ${newStudents.length} students integrated into registry.`);
                }
                
                if (window.triggerLiveReRender) window.triggerLiveReRender();
                
            } catch (err) {
                console.error("[CampusCore] Import Error:", err);
                if (window.simulateAction) simulateAction("Error parsing Excel file. Ensure headers match template.");
            }
        };
        reader.readAsArrayBuffer(file);
    },

    /**
     * Internal: Save to localStorage and update SCHOOL_DATA
     */
    _saveImportedStudents: function(students) {
        const dynamicUsers = JSON.parse(localStorage.getItem('campuscore_dynamic_users') || '[]');
        
        students.forEach(s => {
            // Add to SCHOOL_DATA if available
            if (window.SCHOOL_DATA && window.SCHOOL_DATA.classes[s.class]) {
                const sec = window.SCHOOL_DATA.classes[s.class][s.section] || [];
                // Prevent duplicates
                if (!sec.find(x => x.id === s.id)) {
                    sec.push({
                        id: s.id, admNo: s.id, name: s.name, class: s.class, section: s.section,
                        roll: s.roll, gender: s.gender, dob: s.dob, attendance: s.attendance,
                        behavior: "Good", fee_status: "Paid", gpa: s.gpa, parent: s.parent
                    });
                    window.SCHOOL_DATA.classes[s.class][s.section] = sec;
                }
            }

            // Create login credentials
            const loginUser = {
                id: s.id,
                username: s.username,
                password: s.password,
                name: s.name,
                role: 'student',
                roleLabel: 'Student',
                department: `Class ${s.class}-${s.section}`,
                phone: "+91 00000 00000",
                email: "student@campuscore.edu",
                joined: "Apr 2024",
                avatar_color: "#1976d2",
                icon: "fa-graduation-cap"
            };

            if (!dynamicUsers.find(u => u.username === s.username)) {
                dynamicUsers.push(loginUser);
            }
        });

        localStorage.setItem('campuscore_dynamic_users', JSON.stringify(dynamicUsers));
    },

    _downloadCSV: function(filename, rows) {
        const content = rows.map(r => r.join(",")).join("\n");
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
