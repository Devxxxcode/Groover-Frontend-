import store from "./store";
import { showAlert } from "./slice/ui.slice";

const extractMessage = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (Array.isArray(value)) {
        return value.map((item) => extractMessage(item)).filter(Boolean).join(" | ");
    }
    if (typeof value === "object") {
        const values = Object.values(value)
            .map((item) => extractMessage(item))
            .filter(Boolean);
        return values.join(" | ");
    }
    return String(value);
};

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
            message = extractMessage(data.message);
        } else if (data.error) {
            message = extractMessage(data.error);
        } else if (data.errors) {
            message = extractMessage(data.errors);
        } else {
            message = extractMessage(data);
        }
    }
    // 3. Handle app-level service responses that pass { success, message, data, errors }
    else if (error && typeof error === "object") {
        if (error.message) {
            message = extractMessage(error.message);
        } else if (error.errors) {
            message = extractMessage(error.errors);
        } else if (error.data) {
            message = extractMessage(error.data);
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
