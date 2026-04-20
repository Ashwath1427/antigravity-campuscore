/**
 * campuscore ::= storage-util.js
 * Namespaced localStorage helpers for CampusCore
 */

const STORAGE_PREFIX = 'campuscore';
const STORAGE_ENV = 'dev'; // can be 'prod'
const STORAGE_SCHOOL = 'dps_nadergul';

window.CCStorage = {
    /**
     * Build a namespaced key
     * @param {string} feature - feature name (e.g. 'settings', 'timetable')
     * @param {string} role - user role (optional)
     * @param {string} userId - unique user ID (optional)
     */
    _k: function(feature, role = '', userId = '') {
        const parts = [STORAGE_PREFIX, STORAGE_ENV, STORAGE_SCHOOL];
        if (role) parts.push(role.toLowerCase());
        if (userId) parts.push(userId);
        parts.push(feature);
        return parts.join('::');
    },

    getItem: function(feature, role = '', userId = '', defaultVal = null) {
        const key = this._k(feature, role, userId);
        try {
            const val = localStorage.getItem(key);
            if (val === null) return defaultVal;
            return JSON.parse(val);
        } catch (e) {
            console.warn(`[CCStorage] Error reading ${key}`, e);
            return defaultVal;
        }
    },

    setItem: function(feature, val, role = '', userId = '') {
        const key = this._k(feature, role, userId);
        try {
            localStorage.setItem(key, JSON.stringify(val));
            return true;
        } catch (e) {
            console.warn(`[CCStorage] Error writing ${key}`, e);
            return false;
        }
    },

    removeItem: function(feature, role = '', userId = '') {
        const key = this._k(feature, role, userId);
        localStorage.removeItem(key);
    },

    /**
     * Compatibility helper: Maps old keys to new if needed, 
     * but we are doing a "clean slate" as per user request.
     */
};
