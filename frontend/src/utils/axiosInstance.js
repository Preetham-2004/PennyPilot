import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Function to check if the token is expired
const isTokenExpired = (token) => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        return payload.exp * 1000 < Date.now(); // Compare expiration with current time
    } catch (error) {
        console.error("Error decoding token:", error);
        return true; // Assume expired if decoding fails
    }
};

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        console.log("Access Token:", accessToken);

        if (accessToken) {
            if (isTokenExpired(accessToken)) {
                console.warn("Token expired. Redirecting to login.");
                localStorage.removeItem("token");
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login"; // Redirect only if not already on login
                }
                return Promise.reject(new Error("Token expired"));
            }
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.warn("Unauthorized: Redirecting to login.");
                localStorage.removeItem("token"); // Clear invalid token
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }
            } else if (error.response.status === 500) {
                console.error("Server error. Please try again later.");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout. Please try again.");
        } else {
            console.error("Network error:", error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
