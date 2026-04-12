/* ============================================================
   CAMPUS CORE – MASTER STUDENT REGISTRY BRIDGE
   Synchronizes identity data across VP and Student dashboards.
   ============================================================ */

window.CAMPUSCORE_REGISTRY = {

  getStudent: function(studentId) {
    const key = 'campuscore_student_data_' + studentId;
    const data = JSON.parse(localStorage.getItem(key) || '{}');
    return data;
  },

  getAllStudents: function() {
    const ids = [
      '3160136','3160417','3160662','3170292','3170355',
      '3170390','3180076','3180133','3180183','3180184',
      '3180286','3190472','3200320','3200437','3210447',
      '3210590','3230302','3230706','3240214','3240504',
      '3240693','3250112','3260066','3230719','3170068',
      '3220915','3190133'
    ];
    return ids.map(id => {
      const data = JSON.parse(
        localStorage.getItem('campuscore_student_data_' + id) || '{}'
      );
      return {
        id: id,
        name: data.name || 'Unknown',
        currentClass: data.currentClass || '9',
        currentSection: data.currentSection || 'C',
        roll: data.roll || 0,
        attendance: data.attendancePct || 0,
        gpa: data.gpa || 0,
        status: data.suspensionStatus === 'suspended'
          ? 'Suspended'
          : (data.status || 'Active'),
        sno: data.sno || 0
      };
    });
  },

  updateStudentClass: function(studentId, newClass, newSection) {
    const key = 'campuscore_student_data_' + studentId;
    const data = JSON.parse(localStorage.getItem(key) || '{}');
    data.currentClass = newClass;
    data.currentSection = newSection;
    localStorage.setItem(key, JSON.stringify(data));
    
    // Also push a record to activity log for the student
    if (data.activityLog) {
      data.activityLog.unshift({
        note: `Class updated to ${newClass}${newSection} by VP`,
        date: new Date().toISOString(),
        actor: 'SUMAN (VP)'
      });
      data.activityLog = data.activityLog.slice(0, 50);
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
};
