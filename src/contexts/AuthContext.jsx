import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const register = async (userData) => {
        try {
            const response = await api.post('/register/', userData);
            setUser(response.data)
            login({ 'email': userData.email, 'password': userData.password })
        } catch (error) {
            console.log("Signup Error:", error.response.data);

        }
    };
    const login = async (credentials) => {
        try {
            const response = await api.post('/login/', credentials);
            setUser(response.data)
            localStorage.setItem('access_token', response.data.access)
            localStorage.setItem('refresh_token', response.data.refresh)
        } catch (error) {
            console.log("Login error:", error.response?.data);
        }
    }
    const logout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token')
            if (refreshToken) {
                await api.post('/logout/', { refresh: refreshToken });
            }
        } catch (error) {
            console.log("Logout error:", error.response.data);
        } finally {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            setUser(null)
        }
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}