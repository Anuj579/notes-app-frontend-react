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

    const updateProfilePic = async (croppedImage) => {
        if (!croppedImage) {
            console.error("No image provided for profile picture update");
            return;
        }

        // Extract the base64 string (remove the data URL prefix)
        const base64Data = croppedImage.split(',')[1];

        // Decode the base64 string into a byte array
        const byteString = atob(base64Data);

        // Get the MIME type from the base64 string
        const mimeString = croppedImage.split(',')[0].split(':')[1].split(';')[0];

        // Create an array buffer from the decoded string
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);

        // Populate the array buffer with the byte data
        for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i);
        }

        // Create a Blob from the byte array
        const blob = new Blob([uintArray], { type: mimeString });

        // Convert Blob to File (you can name the file whatever you want)
        const file = new File([blob], 'profile-pic.jpg', { type: mimeString });

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await api.put('/profile/', formData);
            setProfilePic(response.data.image)
        } catch (error) {
            console.error("Error updating profile picture:", error.response || error);
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
        <AuthContext.Provider value={{ user, register, login, userDetails, profilePic, fetchUserDetails, updateProfilePic, updateUserDetails, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}