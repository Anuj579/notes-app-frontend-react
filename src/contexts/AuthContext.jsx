import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

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
            const response = await api.get('/user-details/')
            setUserDetails(response.data)
        } catch (error) {
            console.log("Failed  to fetch user details:", error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (user || token) {
            fetchUserDetails();
        }
    }, [user]);

    const logout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token')
            if (refreshToken) {
                await api.post('/logout/', { refresh: refreshToken });
            }
        } catch (error) {
            console.log("Logout error:", error.response.data);
        } finally {
            localStorage.clear()
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