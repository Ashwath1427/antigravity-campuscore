/* ============================================================
   CAMPUS CORE – MAC DOCK JS
   Logic for rendering and managing the floating dock
   ============================================================ */

function initMacDock() {
    // Only show for super_admin (APAAAS)
    if (!currentUser || !['super_admin', 'apaaas', 'superadmin'].includes(currentUser.role)) {
        removeMacDock();
        return;
    }

    // Check if dock already exists
    if (document.getElementById('mac-dock-container')) return;

    const dockHtml = `
        <div id="mac-dock-container" class="mac-dock-container">
            <div class="mac-dock">
                <div class="dock-item home active" data-label="Dashboard" onclick="handleDockClick('home')">
                    <i class="fas fa-th-large"></i>
                </div>
                <div class="dock-item admin" data-label="User Management" onclick="handleDockClick('user_management')">
                    <i class="fas fa-users-cog"></i>
                </div>
                <div class="dock-item notices" data-label="System Notices" onclick="handleDockClick('notices')">
                    <i class="fas fa-bullhorn"></i>
                </div>
                <div class="dock-separator"></div>
                <div class="dock-item help" data-label="Help Desk" onclick="handleDockClick('help_desk')">
                    <i class="fas fa-headset"></i>
                </div>
                <div class="dock-item" data-label="Database" onclick="handleDockClick('database')">
                    <i class="fas fa-database"></i>
                </div>
                <div class="dock-item settings" data-label="Settings" onclick="handleDockClick('settings')">
                    <i class="fas fa-cog"></i>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', dockHtml);

    // Fade in animation
    setTimeout(() => {
        document.getElementById('mac-dock-container').classList.add('visible');
    }, 500);
}

function handleDockClick(sectionId) {
    // Update active state in dock
    document.querySelectorAll('.dock-item').forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Handle special cases
    if (sectionId === 'database') {
        if (typeof openDatabaseModal === 'function') {
            openDatabaseModal();
        } else {
            showNotification('Database management not available', 'warning');
        }
        return;
    }

    // Use global navigation if available
    if (typeof navigateTo === 'function') {
        navigateTo(sectionId);
    } else if (typeof showPage === 'function') {
        showPage(sectionId);
    }
}

function removeMacDock() {
    const dock = document.getElementById('mac-dock-container');
    if (dock) {
        dock.classList.remove('visible');
        setTimeout(() => dock.remove(), 600);
    }
}

// Integration with login/logout
const _originalInitDashboard = window.initDashboard;
window.initDashboard = function(user) {
    if (typeof _originalInitDashboard === 'function') _originalInitDashboard(user);
    initMacDock();
};

// Check on page load if already logged in
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure currentUser is populated from session
    setTimeout(() => {
        if (typeof currentUser !== 'undefined' && currentUser) {
            initMacDock();
        }
    }, 1000);
});

// Export functions
window.initMacDock = initMacDock;
window.handleDockClick = handleDockClick;
window.removeMacDock = removeMacDock;
