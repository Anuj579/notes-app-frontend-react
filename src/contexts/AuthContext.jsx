import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('access_token');
        return token ? { token } : null;
    });
    const [userDetails, setUserDetails] = useState({})
    const [profilePic, setProfilePic] = useState({})

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

    const fetchProfilePic = async () => {
        try {
            const response = await api.get('/profile/')
            setProfilePic(response.data.image)
        } catch (error) {
            console.log("Failed to fetch user profile:", error);
        }
    }
    console.log(profilePic);
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (user || token) {
            fetchUserDetails();
            fetchProfilePic()
        }
    }, [user]);

    const updateUserDetails = async (details) => {
        try {
            const response = await api.put('/user-details/', details)
            setUserDetails(response.data)
            return null
        } catch (error) {
            console.log("Failed to update user details:", error);
            return 'Failed to update user details.';
        }
    }

    const updateProfilePic = async (file) => {
        if (!file) {
            console.error("No file provided for profile picture update");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await api.put('/profile/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setProfilePic(response.data.image)

            console.log("Profile picture updated successfully");
        } catch (error) {
            console.error("Error updating profile picture:", error);
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
            localStorage.clear()
            setUser(null)
        }
    };

    return (
        <AuthContext.Provider value={{ user, register, login, userDetails, profilePic, fetchUserDetails, updateProfilePic, fetchProfilePic, updateUserDetails, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}