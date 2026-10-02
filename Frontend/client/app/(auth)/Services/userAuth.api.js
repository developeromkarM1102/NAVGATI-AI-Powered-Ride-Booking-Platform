import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true
});

export async function UserRegister({ name, email, password, phone }) {
    try {
        const response = await api.post("api/auth/registerUser", {
            name,
            email,
            password,
            phone
        });

        return response.data;
    } catch (err) {
        // console.error("Registration Error:", err);

        return {
            success: false,
            error: err.response?.data?.message || "Registration failed"
        };
    }
}

export async function UserLogin({ email, password }) {
    try {
        const response = await api.post("api/auth/loginUser", {
            email,
            password
        });

        return response.data;
    } catch (err) {
        // console.error("Login Error:", err);

        return {
            success: false,
            error: err.response?.data?.message || "Login failed"
        };
    }
}

export function UserGoogleLogin() {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

    window.location.href = `${backendURL}/api/auth/google`;
}

export async function UserLogout() {
    try {
        const response = await api.get("api/auth/logoutUser");

        return response.data;
    } catch (err) {
        // console.error("Logout Error:", err);

        return {
            success: false,
            error: err.response?.data?.message || "Logout failed"
        };
    }
}

export async function UserGetMe() {
    try {
        const response = await api.get("api/auth/getmeUser");

        return response.data;
    } catch (err) {
        // console.error("Get Me Error:", err);

        return {
            success: false,
            error: err.response?.data?.message || "Unable to get user"
        };
    }
}