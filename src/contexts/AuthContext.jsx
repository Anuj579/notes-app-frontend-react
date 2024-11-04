import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

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
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('access_token');
        return token ? { token } : null;
    });
    const [userDetails, setUserDetails] = useState({})

    const register = async (userData) => {
        try {
            const response = await api.post('/register/', userData);
            setUser(response.data)
            login({ 'email': userData.email, 'password': userData.password })
            return null
        } catch (error) {
            if (error.response?.status === 400) {
                return 'Email already exists.';
            }
            return 'Signup failed. Please try again.';
        }
    };

    const login = async (credentials) => {
        try {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            const response = await api.post('/login/', credentials);
            setUser(response.data)
            localStorage.setItem('access_token', response.data.access)
            localStorage.setItem('refresh_token', response.data.refresh)
            await fetchUserDetails();
            return null
        } catch (error) {
            if (error.response?.status === 400) {
                return 'Invalid credentials.';
            }
            return 'Login failed. Please try again.';
        }
    }

    const fetchUserDetails = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await api.get('/user-details/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUserDetails(response.data)
        } catch (error) {
            console.log("Failed  to fetch user details:", error.response?.data);
        }
    }

    useEffect(() => {
        if (user) {
            fetchUserDetails()
        }
    }, [user])

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token && !userDetails) {
            fetchUserDetails();
        }
    }, []);


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
        <AuthContext.Provider value={{ user, register, login, userDetails, fetchUserDetails, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}