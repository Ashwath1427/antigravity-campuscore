/* ============================================================
   CAMPUS CORE – DATABASE MANAGEMENT FEATURES
   Comprehensive database tools, monitoring, and synchronization
   ============================================================ */

// ─── Database Connection Status ────────────────────────────────
let dbStatus = {
  connected: false,
  lastSync: null,
  connectionType: 'supabase',
  errorCount: 0,
  syncInProgress: false
};

// Database connection status indicator
function createDatabaseStatusIndicator() {
  const statusHtml = `
    <div id="db-status-indicator" class="db-status-indicator">
      <div class="db-status-icon" id="db-status-icon">
        <i class="fas fa-database"></i>
      </div>
      <div class="db-status-info">
        <div class="db-status-text" id="db-status-text">Connecting...</div>
        <div class="db-status-details" id="db-status-details">
          <span id="db-connection-type">Supabase</span> • 
          <span id="db-last-sync">Never synced</span>
        </div>
      </div>
      <div class="db-status-actions">
        <button class="btn-sm btn-primary" onclick="testDatabaseConnection()">Test</button>
        <button class="btn-sm btn-secondary" onclick="syncDatabase()">Sync</button>
      </div>
    </div>
  `;
  
  const banner = document.querySelector('.banner-right');
  if (banner) {
    banner.insertAdjacentHTML('afterbegin', statusHtml);
  }
  
  updateDatabaseStatus();
}

// Update database status display
function updateDatabaseStatus() {
  const icon = document.getElementById('db-status-icon');
  const text = document.getElementById('db-status-text');
  const details = document.getElementById('db-status-details');
  const lastSync = document.getElementById('db-last-sync');
  
  if (!icon || !text) return;
  
  if (dbStatus.connected) {
    icon.className = 'db-status-icon connected';
    text.textContent = 'Connected';
    icon.innerHTML = '<i class="fas fa-check-circle"></i>';
  } else {
    icon.className = 'db-status-icon disconnected';
    text.textContent = 'Disconnected';
    icon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
  }
  
  if (dbStatus.lastSync) {
    lastSync.textContent = `Last sync: ${new Date(dbStatus.lastSync).toLocaleTimeString()}`;
  }
  
  if (dbStatus.syncInProgress) {
    text.textContent = 'Syncing...';
    icon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  }
}

// Test database connection
async function testDatabaseConnection() {
  const icon = document.getElementById('db-status-icon');
  const text = document.getElementById('db-status-text');
  
  if (!icon || !text) return;
  
  icon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  text.textContent = 'Testing...';
  
  try {
    if (typeof supabase !== 'undefined') {
      const { data, error } = await supabase.from('cc_students').select('count').single();
      if (error) throw error;
      
      dbStatus.connected = true;
      dbStatus.errorCount = 0;
      showNotification('Database connection successful', 'success');
    } else {
      // Fallback to local storage mode
      dbStatus.connected = false;
      showNotification('Using local storage mode', 'info');
    }
  } catch (error) {
    dbStatus.connected = false;
    dbStatus.errorCount++;
    showNotification(`Database connection failed: ${error.message}`, 'error');
  }
  
  updateDatabaseStatus();
}

// ─── Real-time Data Synchronization ───────────────────────────
function syncDatabase() {
  if (dbStatus.syncInProgress) {
    showNotification('Sync already in progress', 'warning');
    return;
  }
  
  dbStatus.syncInProgress = true;
  updateDatabaseStatus();
  
  // Simulate sync process
  setTimeout(() => {
    try {
      // Sync students
      if (typeof STUDENTS !== 'undefined') {
        localStorage.setItem('campuscore_students_sync', JSON.stringify(STUDENTS));
      }
      
      // Sync teachers
      if (typeof TEACHERS !== 'undefined') {
        localStorage.setItem('campuscore_teachers_sync', JSON.stringify(TEACHERS));
      }
      
      // Sync users
      if (typeof DEMO_USERS !== 'undefined') {
        localStorage.setItem('campuscore_users_sync', JSON.stringify(DEMO_USERS));
      }
      
      dbStatus.lastSync = Date.now();
      dbStatus.syncInProgress = false;
      showNotification('Data synchronized successfully', 'success');
    } catch (error) {
      dbStatus.syncInProgress = false;
      showNotification(`Sync failed: ${error.message}`, 'error');
    }
    
    updateDatabaseStatus();
  }, 2000);
}

// Auto-sync every 5 minutes
function startAutoSync() {
  setInterval(() => {
    if (dbStatus.connected && !dbStatus.syncInProgress) {
      syncDatabase();
    }
  }, 300000); // 5 minutes
}

// ─── Database Backup and Restore ───────────────────────────────
function createDatabaseBackup() {
  const backup = {
    timestamp: new Date().toISOString(),
    version: '1.0',
    data: {
      students: STUDENTS || [],
      teachers: TEACHERS || [],
      users: DEMO_USERS || [],
      announcements: ANNOUNCEMENTS || [],
      homework: HOMEWORK || [],
      events: EVENTS || []
    }
  };
  
  const backupBlob = new Blob([JSON.stringify(backup, null, 2)], {
    type: 'application/json'
  });
  
  const url = URL.createObjectURL(backupBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `campuscore_backup_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showNotification('Database backup created successfully', 'success');
}

function restoreDatabaseBackup(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const backup = JSON.parse(e.target.result);
      
      // Validate backup structure
      if (!backup.data || !backup.data.students) {
        throw new Error('Invalid backup file');
      }
      
      // Restore data with confirmation
      if (confirm('This will replace all current data. Continue?')) {
        if (backup.data.students) STUDENTS = backup.data.students;
        if (backup.data.teachers) TEACHERS = backup.data.teachers;
        if (backup.data.users) DEMO_USERS = backup.data.users;
        if (backup.data.announcements) ANNOUNCEMENTS = backup.data.announcements;
        if (backup.data.homework) HOMEWORK = backup.data.homework;
        if (backup.data.events) EVENTS = backup.data.events;
        
        // Save to localStorage
        localStorage.setItem('campuscore_students', JSON.stringify(STUDENTS));
        localStorage.setItem('campuscore_teachers', JSON.stringify(TEACHERS));
        localStorage.setItem('campuscore_users', JSON.stringify(DEMO_USERS));
        
        showNotification('Database restored successfully', 'success');
        
        // Refresh dashboard if needed
        if (typeof updateDashboardCounts === 'function') {
          updateDashboardCounts();
        }
      }
    } catch (error) {
      showNotification(`Restore failed: ${error.message}`, 'error');
    }
  };
  
  reader.readAsText(file);
}

// ─── Data Validation and Error Handling ───────────────────────
function validateStudentData(student) {
  const errors = [];
  
  if (!student.id || typeof student.id !== 'string') {
    errors.push('Student ID is required');
  }
  
  if (!student.name || typeof student.name !== 'string') {
    errors.push('Student name is required');
  }
  
  if (!student.class || !/^\d+[A-D]$/.test(student.class)) {
    errors.push('Invalid class format (should be like "6-A")');
  }
  
  if (!student.roll || !/^\d+$/.test(student.roll)) {
    errors.push('Roll number must be numeric');
  }
  
  if (!student.gender || !['Male', 'Female'].includes(student.gender)) {
    errors.push('Gender must be Male or Female');
  }
  
  return errors;
}

function validateTeacherData(teacher) {
  const errors = [];
  
  if (!teacher.id || typeof teacher.id !== 'string') {
    errors.push('Teacher ID is required');
  }
  
  if (!teacher.name || typeof teacher.name !== 'string') {
    errors.push('Teacher name is required');
  }
  
  if (!teacher.subject || typeof teacher.subject !== 'string') {
    errors.push('Subject is required');
  }
  
  return errors;
}

// ─── Database Performance Monitoring ─────────────────────────
let performanceMetrics = {
  queryCount: 0,
  errorCount: 0,
  avgResponseTime: 0,
  lastQueryTime: 0
};

function trackQueryPerformance(startTime, success) {
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  
  performanceMetrics.queryCount++;
  performanceMetrics.lastQueryTime = responseTime;
  
  if (!success) {
    performanceMetrics.errorCount++;
  }
  
  // Calculate average response time
  performanceMetrics.avgResponseTime = 
    (performanceMetrics.avgResponseTime * (performanceMetrics.queryCount - 1) + responseTime) / 
    performanceMetrics.queryCount;
}

function getPerformanceReport() {
  return {
    totalQueries: performanceMetrics.queryCount,
    errorRate: performanceMetrics.queryCount > 0 ? 
      (performanceMetrics.errorCount / performanceMetrics.queryCount * 100).toFixed(2) + '%' : '0%',
    avgResponseTime: performanceMetrics.avgResponseTime.toFixed(2) + 'ms',
    lastQueryTime: performanceMetrics.lastQueryTime + 'ms'
  };
}

// ─── Data Export/Import Features ───────────────────────────────
function exportDataToCSV(data, filename) {
  if (!data || data.length === 0) {
    showNotification('No data to export', 'warning');
    return;
  }
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showNotification(`${filename} exported successfully`, 'success');
}

function importDataFromCSV(event, dataType) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const text = e.target.result;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const data = [];
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;
        
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        const row = {};
        
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        
        data.push(row);
      }
      
      // Validate and import based on data type
      if (dataType === 'students') {
        const errors = data.flatMap(student => validateStudentData(student));
        if (errors.length > 0) {
          showNotification(`Validation errors: ${errors.join(', ')}`, 'error');
          return;
        }
        STUDENTS.push(...data);
      } else if (dataType === 'teachers') {
        const errors = data.flatMap(teacher => validateTeacherData(teacher));
        if (errors.length > 0) {
          showNotification(`Validation errors: ${errors.join(', ')}`, 'error');
          return;
        }
        TEACHERS.push(...data);
      }
      
      showNotification(`${data.length} ${dataType} imported successfully`, 'success');
      
      // Save to localStorage
      localStorage.setItem(`campuscore_${dataType}`, JSON.stringify(
        dataType === 'students' ? STUDENTS : TEACHERS
      ));
      
    } catch (error) {
      showNotification(`Import failed: ${error.message}`, 'error');
    }
  };
  
  reader.readAsText(file);
}

// ─── Database Management UI ───────────────────────────────────
function createDatabaseManagementModal() {
  const modalHtml = `
    <div id="database-modal" class="modal hidden">
      <div class="modal-content database-modal">
        <div class="modal-header">
          <h3>Database Management</h3>
          <button class="modal-close" onclick="closeDatabaseModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="db-section">
            <h4>Connection Status</h4>
            <div id="db-connection-info" class="db-info">
              <p>Status: <span id="modal-db-status">Checking...</span></p>
              <p>Type: <span id="modal-db-type">Supabase</span></p>
              <p>Last Sync: <span id="modal-db-sync">Never</span></p>
            </div>
            <div class="db-actions">
              <button class="btn-primary" onclick="testDatabaseConnection()">Test Connection</button>
              <button class="btn-secondary" onclick="syncDatabase()">Sync Now</button>
            </div>
          </div>
          
          <div class="db-section">
            <h4>Backup & Restore</h4>
            <div class="db-actions">
              <button class="btn-primary" onclick="createDatabaseBackup()">Create Backup</button>
              <label class="btn-secondary">
                Restore Backup
                <input type="file" accept=".json" onchange="restoreDatabaseBackup(event)" style="display:none;">
              </label>
            </div>
          </div>
          
          <div class="db-section">
            <h4>Data Export</h4>
            <div class="db-actions">
              <button class="btn-secondary" onclick="exportDataToCSV(STUDENTS, 'students.csv')">Export Students</button>
              <button class="btn-secondary" onclick="exportDataToCSV(TEACHERS, 'teachers.csv')">Export Teachers</button>
              <button class="btn-secondary" onclick="exportDataToCSV(DEMO_USERS, 'users.csv')">Export Users</button>
            </div>
          </div>
          
          <div class="db-section">
            <h4>Data Import</h4>
            <div class="db-actions">
              <label class="btn-secondary">
                Import Students
                <input type="file" accept=".csv" onchange="importDataFromCSV(event, 'students')" style="display:none;">
              </label>
              <label class="btn-secondary">
                Import Teachers
                <input type="file" accept=".csv" onchange="importDataFromCSV(event, 'teachers')" style="display:none;">
              </label>
            </div>
          </div>
          
          <div class="db-section">
            <h4>Performance Metrics</h4>
            <div id="db-performance" class="db-info">
              <p>Total Queries: <span id="db-total-queries">0</span></p>
              <p>Error Rate: <span id="db-error-rate">0%</span></p>
              <p>Avg Response Time: <span id="db-avg-response">0ms</span></p>
              <p>Last Query Time: <span id="db-last-query">0ms</span></p>
            </div>
            <button class="btn-secondary" onclick="updatePerformanceMetrics()">Refresh</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function openDatabaseModal() {
  const modal = document.getElementById('database-modal');
  if (modal) {
    modal.classList.remove('hidden');
    updateModalDatabaseInfo();
    updatePerformanceMetrics();
  }
}

function closeDatabaseModal() {
  const modal = document.getElementById('database-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function updateModalDatabaseInfo() {
  const status = document.getElementById('modal-db-status');
  const sync = document.getElementById('modal-db-sync');
  
  if (status) {
    status.textContent = dbStatus.connected ? 'Connected' : 'Disconnected';
    status.className = dbStatus.connected ? 'status-good' : 'status-bad';
  }
  
  if (sync && dbStatus.lastSync) {
    sync.textContent = new Date(dbStatus.lastSync).toLocaleString();
  }
}

function updatePerformanceMetrics() {
  const metrics = getPerformanceReport();
  
  const totalQueries = document.getElementById('db-total-queries');
  const errorRate = document.getElementById('db-error-rate');
  const avgResponse = document.getElementById('db-avg-response');
  const lastQuery = document.getElementById('db-last-query');
  
  if (totalQueries) totalQueries.textContent = metrics.totalQueries;
  if (errorRate) errorRate.textContent = metrics.errorRate;
  if (avgResponse) avgResponse.textContent = metrics.avgResponseTime;
  if (lastQuery) lastQuery.textContent = metrics.lastQueryTime;
}

// ─── Initialize Database Features ─────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    createDatabaseStatusIndicator();
    createDatabaseManagementModal();
    startAutoSync();
    testDatabaseConnection();
  }, 1000);
});

// Add database management button to admin menu
function addDatabaseManagementToMenu() {
  const adminNav = document.querySelector('.menu');
  if (adminNav && currentUser && ['super_admin', 'superadmin', 'principal', 'vice_principal'].includes(currentUser.role)) {
    const dbMenuItem = `
      <div class="menu-item">
        <a href="#" onclick="openDatabaseModal()" class="menu-link">
          <span class="menu-icon"><i class="fas fa-database"></i></span>
          Database Management
        </a>
      </div>
    `;
    adminNav.insertAdjacentHTML('beforeend', dbMenuItem);
  }
}

// Export functions for global use
window.createDatabaseStatusIndicator = createDatabaseStatusIndicator;
window.testDatabaseConnection = testDatabaseConnection;
window.syncDatabase = syncDatabase;
window.createDatabaseBackup = createDatabaseBackup;
window.restoreDatabaseBackup = restoreDatabaseBackup;
window.exportDataToCSV = exportDataToCSV;
window.importDataFromCSV = importDataFromCSV;
window.openDatabaseModal = openDatabaseModal;
window.closeDatabaseModal = closeDatabaseModal;
window.addDatabaseManagementToMenu = addDatabaseManagementToMenu;
