import store from "./store";
import { showAlert } from "./slice/ui.slice";

/**
 * Handles errors from API responses and displays them using the Global Terminal HUD.
 * @param {any} error - The error object from Axios or other sources.
 */
const ErrorHandler = (error) => {
    let title = "System Error";
    let message = "An unexpected error occurred. Please try again.";
    const rawMessage = typeof error?.message === "string" ? error.message : "";

    // 1. Check for specific Axios Error types
    if (
        error?.code === "ECONNABORTED" ||
        rawMessage.toLowerCase().includes("timeout")
    ) {
        title = "Connection Timeout";
        message = "Server response timed out. Please check your connection.";
    }
    else if (rawMessage === "Network Error") {
        title = "Network Failure";
        message = "Unable to reach the server. Please verify your internet access.";
    }
    // 2. Extract structured errors from Response Data (if available)
    else if (error?.response?.data) {
        const data = error.response.data;
        
        // Handle Django/Common REST frameworks structures
        if (typeof data === 'string') {
            message = data;
        } else if (data.detail) {
            message = data.detail;
        } else if (data.message) {
            message = typeof data.message === "string"
                ? data.message
                : JSON.stringify(data.message);
        } else if (data.error) {
            message = typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
        } else if (data.errors) {
            // If it's a validation error object (key-value pairs)
            const errorList = Object.values(data.errors).flat();
            message = errorList.join(' | ');
        } else {
            // Fallback for objects - extract values but keep it flat
            const values = Object.values(data).filter(v => typeof v === 'string');
            if (values.length > 0) message = values.join(' | ');
        }
    }
    // 3. Handle app-level service responses that pass { success, message, data, errors }
    else if (error && typeof error === "object") {
        if (typeof error.message === "string") {
            message = error.message;
        } else if (error.errors && typeof error.errors === "object") {
            const errorList = Object.values(error.errors).flat().map((item) => String(item));
            if (errorList.length > 0) {
                message = errorList.join(" | ");
            }
        } else if (error.data && typeof error.data === "object") {
            const values = Object.values(error.data).filter((value) => typeof value === "string");
            if (values.length > 0) {
                message = values.join(" | ");
            }
        }
    }
    // 3. Last resort - use the raw error message if it's simple
    else if (rawMessage && rawMessage.length < 100) {
        message = error.message;
    }

    // DISPATCH TO GLOBAL TERMINAL HUD
    store.dispatch(showAlert({
        type: 'error',
        title: title,
        message: message
    }));

    return [message];
};

export default ErrorHandler;
