/**
 * CAMPUS CORE – DB.JS
 * Data Access Layer (DAL) with Supabase integration and local fallback.
 */

const DB = {
    /**
     * Generic fetcher with fallback.
     * @param {string} table - Supabase table name.
     * @param {string} fallbackVarName - Global variable name in data.js to fallback to.
     * @param {object} options - Optional query parameters (filter, order, etc.)
     */
    async fetch(table, fallbackVarName, options = {}) {
        if (window.supabase) {
            try {
                let query = window.supabase.from(table).select(options.select || '*');
                
                if (options.match) query = query.match(options.match);
                if (options.order) query = query.order(options.order.column, { ascending: options.order.ascending });
                if (options.limit) query = query.limit(options.limit);

                const { data, error } = await query;
                
                if (error) {
                    console.error(`[DB] Supabase error fetching ${table}:`, error);
                    return window[fallbackVarName] || [];
                }
                
                console.log(`[DB] Fetched ${data.length} records from Supabase:${table}`);
                return data;
            } catch (e) {
                console.error(`[DB] Unexpected error fetching ${table}:`, e);
            }
        }
        
        // Fallback
        console.log(`[DB] Using local fallback for ${table} (${fallbackVarName})`);
        return window[fallbackVarName] || [];
    },

    /**
     * Fetches announcements with fallback.
     */
    async getAnnouncements() {
        return await this.fetch('announcements', 'ANNOUNCEMENTS', { order: { column: 'date', ascending: false } });
    },

    /**
     * Fetches homework with fallback.
     */
    async getHomework() {
        return await this.fetch('homework', 'HOMEWORK');
    },

    /**
     * Fetches students with fallback.
     */
    async getStudents() {
        return await this.fetch('students', 'STUDENTS');
    },

    /**
     * Fetches teachers with fallback.
     */
    async getTeachers() {
        return await this.fetch('teachers', 'TEACHERS');
    },

    /**
     * Subscribes to realtime updates for a table.
     * @param {string} table - Table name.
     * @param {function} callback - Function to run on change.
     */
    subscribe(table, callback) {
        if (!window.supabase) return null;
        
        return window.supabase
            .channel(`public:${table}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: table }, (payload) => {
                console.log(`[Realtime] Change received on ${table}:`, payload);
                callback(payload);
            })
            .subscribe();
    }
};

// Export to window
window.DB = DB;
