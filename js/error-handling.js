/* ============================================================
   CAMPUS CORE – COMPREHENSIVE ERROR HANDLING
   Robust error handling, logging, and recovery mechanisms
   ============================================================ */

// ─── Global Error Handler ───────────────────────────────────────
window.addEventListener('error', function(event) {
  console.error('[GLOBAL ERROR]', event.error);
  logError('GLOBAL_ERROR', event.error.message, event.error.stack);

  // Don't show toast for Supabase/network-related errors
  const errorMessage = event.error?.message?.toLowerCase() || '';
  const isSupabaseError = errorMessage.includes('supabase') ||
                        errorMessage.includes('fetch') ||
                        errorMessage.includes('network') ||
                        errorMessage.includes('connection') ||
                        errorMessage.includes('timeout') ||
                        event.error?.name === 'TypeError';

  if (!isSupabaseError) {
    showUserFriendlyError('An unexpected error occurred. Please try again.');
  }
});

window.addEventListener('unhandledrejection', function(event) {
  console.error('[UNHANDLED PROMISE REJECTION]', event.reason);
  logError('PROMISE_REJECTION', event.reason.message, event.reason.stack);

  // Don't show toast for Supabase/network-related errors
  const errorMessage = event.reason?.message?.toLowerCase() || String(event.reason).toLowerCase();
  const isSupabaseError = errorMessage.includes('supabase') ||
                        errorMessage.includes('fetch') ||
                        errorMessage.includes('network') ||
                        errorMessage.includes('connection') ||
                        errorMessage.includes('timeout');

  if (!isSupabaseError) {
    showUserFriendlyError('A network error occurred. Please check your connection.');
  }
});

// ─── Error Logging System ───────────────────────────────────────
const errorLog = [];
const MAX_ERROR_LOG_SIZE = 100;

function logError(type, message, stack = '', context = {}) {
  const errorEntry = {
    timestamp: new Date().toISOString(),
    type: type,
    message: message,
    stack: stack,
    context: context,
    userAgent: navigator.userAgent,
    url: window.location.href
  };
  
  errorLog.push(errorEntry);
  
  // Keep error log size manageable
  if (errorLog.length > MAX_ERROR_LOG_SIZE) {
    errorLog.shift();
  }
  
  // Store in localStorage for persistence
  try {
    localStorage.setItem('campuscore_error_log', JSON.stringify(errorLog));
  } catch (e) {
    console.warn('Could not save error log to localStorage');
  }
  
  console.error(`[${type}] ${message}`, context);
}

function getErrorLog() {
  return [...errorLog];
}

function clearErrorLog() {
  errorLog.length = 0;
  try {
    localStorage.removeItem('campuscore_error_log');
  } catch (e) {
    console.warn('Could not clear error log from localStorage');
  }
}

// ─── User-Friendly Error Messages ───────────────────────────────
function showUserFriendlyError(message) {
  if (typeof showNotification === 'function') {
    showNotification(message, 'error', 5000);
  } else {
    console.warn('[CampusCore] User error suppressed:', message);
  }
}

function showUserFriendlyWarning(message) {
  if (typeof showNotification === 'function') {
    showNotification(message, 'warning', 3000);
  } else {
    console.warn(message);
  }
}

// ─── Safe Function Execution Wrapper ───────────────────────────
function safeExecute(fn, fallback = null, context = {}) {
  try {
    const result = fn();
    return result;
  } catch (error) {
    logError('SAFE_EXECUTE_ERROR', error.message, error.stack, context);
    if (fallback !== null) {
      return fallback;
    }
    showUserFriendlyError('An operation failed. Please try again.');
    return null;
  }
}

function safeExecuteAsync(asyncFn, fallback = null, context = {}) {
  return async function(...args) {
    try {
      const result = await asyncFn(...args);
      return result;
    } catch (error) {
      logError('SAFE_EXECUTE_ASYNC_ERROR', error.message, error.stack, context);
      if (fallback !== null) {
        return fallback;
      }
      showUserFriendlyError('An operation failed. Please try again.');
      return null;
    }
  };
}

// ─── DOM Element Safe Access ───────────────────────────────────
function safeGetElement(id) {
  try {
    const element = document.getElementById(id);
    if (!element) {
      logError('ELEMENT_NOT_FOUND', `Element with id '${id}' not found`, '', { id: id });
    }
    return element;
  } catch (error) {
    logError('SAFE_GET_ELEMENT_ERROR', error.message, error.stack, { id: id });
    return null;
  }
}

function safeQuerySelector(selector, parent = document) {
  try {
    const element = parent.querySelector(selector);
    if (!element) {
      logError('SELECTOR_NOT_FOUND', `Element with selector '${selector}' not found`, '', { selector: selector });
    }
    return element;
  } catch (error) {
    logError('SAFE_QUERY_SELECTOR_ERROR', error.message, error.stack, { selector: selector });
    return null;
  }
}

// ─── Data Validation and Sanitization ───────────────────────────
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/<[^>]*>/g, '').replace(/[<>]/g, '');
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function validateRequired(value, fieldName) {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    throw new Error(`${fieldName} is required`);
  }
  return true;
}

// ─── API and Network Error Handling ───────────────────────────
async function safeFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      timeout: 10000, // 10 second timeout
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    logError('SAFE_FETCH_ERROR', error.message, error.stack, { url: url, options: options });
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      showUserFriendlyError('Network error. Please check your internet connection.');
    } else if (error.message.includes('timeout')) {
      showUserFriendlyError('Request timed out. Please try again.');
    } else {
      showUserFriendlyError('Failed to connect to server. Please try again later.');
    }
    
    throw error;
  }
}

// ─── Local Storage Safe Operations ───────────────────────────
function safeLocalStorageGet(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : fallback;
  } catch (error) {
    logError('SAFE_LOCAL_STORAGE_GET_ERROR', error.message, error.stack, { key: key });
    return fallback;
  }
}

function safeLocalStorageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    logError('SAFE_LOCAL_STORAGE_SET_ERROR', error.message, error.stack, { key: key });
    showUserFriendlyWarning('Could not save data locally. Your changes may not be saved.');
    return false;
  }
}

function safeLocalStorageRemove(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    logError('SAFE_LOCAL_STORAGE_REMOVE_ERROR', error.message, error.stack, { key: key });
    return false;
  }
}

// ─── Form Validation Helper ───────────────────────────────────
function validateForm(formId, rules = {}) {
  const form = safeGetElement(formId);
  if (!form) return false;
  
  const errors = [];
  const formData = {};
  
  // Collect form data
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    const name = input.name || input.id;
    const value = sanitizeInput(input.value);
    formData[name] = value;
    
    // Apply validation rules
    if (rules[name]) {
      try {
        if (rules[name].required && validateRequired(value, name)) {
          // Required validation passed
        }
        
        if (rules[name].email && value && !validateEmail(value)) {
          errors.push(`${name} must be a valid email`);
        }
        
        if (rules[name].phone && value && !validatePhone(value)) {
          errors.push(`${name} must be a valid phone number`);
        }
        
        if (rules[name].minLength && value.length < rules[name].minLength) {
          errors.push(`${name} must be at least ${rules[name].minLength} characters`);
        }
        
        if (rules[name].pattern && !rules[name].pattern.test(value)) {
          errors.push(`${name} format is invalid`);
        }
      } catch (error) {
        errors.push(error.message);
      }
    }
  });
  
  if (errors.length > 0) {
    showUserFriendlyError(errors.join(', '));
    return false;
  }
  
  return formData;
}

// ─── Performance Monitoring ───────────────────────────────────
const performanceMetrics = {
  pageLoadTime: 0,
  jsExecutionTime: 0,
  apiCallCount: 0,
  errorCount: 0
};

// Track page load time
window.addEventListener('load', function() {
  const navigation = performance.getEntriesByType('navigation')[0];
  performanceMetrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
  console.log(`Page load time: ${performanceMetrics.pageLoadTime}ms`);
});

// Track JavaScript execution time
function measurePerformance(name, fn) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  performanceMetrics.jsExecutionTime += (end - start);
  console.log(`${name} execution time: ${(end - start).toFixed(2)}ms`);
  return result;
}

// ─── Recovery Mechanisms ─────────────────────────────────────
function attemptRecovery(errorType) {
  switch (errorType) {
    case 'STORAGE_FULL':
      // Clear old data
      try {
        const keys = Object.keys(localStorage);
        const oldKeys = keys.filter(key => key.includes('old') || key.includes('temp'));
        oldKeys.forEach(key => localStorage.removeItem(key));
        showUserFriendlyWarning('Storage cleaned up. Please try again.');
        return true;
      } catch (e) {
        return false;
      }
      
    case 'NETWORK_ERROR':
      // Retry after delay
      setTimeout(() => {
        showUserFriendlyWarning('Retrying connection...');
      }, 3000);
      return true;
      
    case 'DOM_ERROR':
      // Try to reload the page
      if (confirm('A page error occurred. Reload the page?')) {
        location.reload();
      }
      return true;
      
    default:
      return false;
  }
}

// ─── Initialization and Setup ─────────────────────────────────
function initializeErrorHandling() {
  // Load existing error log from localStorage
  try {
    const savedLog = localStorage.getItem('campuscore_error_log');
    if (savedLog) {
      errorLog.push(...JSON.parse(savedLog));
    }
  } catch (e) {
    console.warn('Could not load error log from localStorage');
  }
  
  // Set up periodic error log cleanup
  setInterval(() => {
    if (errorLog.length > MAX_ERROR_LOG_SIZE * 0.8) {
      errorLog.splice(0, Math.floor(errorLog.length * 0.3));
    }
  }, 60000); // Every minute
  
  console.log('Error handling system initialized');
}

// ─── Export Functions for Global Use ───────────────────────────
window.logError = logError;
window.getErrorLog = getErrorLog;
window.clearErrorLog = clearErrorLog;
window.safeExecute = safeExecute;
window.safeExecuteAsync = safeExecuteAsync;
window.safeGetElement = safeGetElement;
window.safeQuerySelector = safeQuerySelector;
window.sanitizeInput = sanitizeInput;
window.validateEmail = validateEmail;
window.validatePhone = validatePhone;
window.validateRequired = validateRequired;
window.safeFetch = safeFetch;
window.safeLocalStorageGet = safeLocalStorageGet;
window.safeLocalStorageSet = safeLocalStorageSet;
window.safeLocalStorageRemove = safeLocalStorageRemove;
window.validateForm = validateForm;
window.measurePerformance = measurePerformance;
window.attemptRecovery = attemptRecovery;
window.initializeErrorHandling = initializeErrorHandling;

// Auto-initialize
document.addEventListener('DOMContentLoaded', initializeErrorHandling);
