import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('access_token');
        return token ? { token } : null;
    });
    const [userDetails, setUserDetails] = useState({})
    const [profilePic, setProfilePic] = useState(null)
    const [loading, setLoading] = useState(false)

    const register = async (userData) => {
        try {
            await api.post('/register/', userData);

            return null
        } catch (error) {
            if (error.response?.status === 400) {
                return 'Email already exists.';
            }
            return 'Signup failed. Please try again.';
        }
    };

    const login = async (credentials) => {
        setLoading(true)
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
        } finally {
            setLoading(false)
        }
    }

    const fetchUserDetails = async () => {
        try {
            const response = await api.get('/user-details/')
            setUserDetails(response.data)
        } catch (error) {
            console.log("Failed  to fetch user details:", error);
        } finally {
        }
    }

    const fetchProfilePic = async () => {
        try {
            const response = await api.get('/profile/')
            setProfilePic(response.data.image_url || null)
        } catch (error) {
            console.log("Failed to fetch user profile:", error);
        } finally {
        }
    }

    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem('access_token');
        if (token) {
            fetchUserDetails();
            fetchProfilePic()
        }
        setLoading(false)
    }, [user]);

    const updateUserDetails = async (details) => {
        try {
            const response = await api.put('/user-details/', details)
            setUserDetails(response.data)
        } catch (error) {
            console.log("Failed to update user details:", error);
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
            fetchProfilePic()
        } catch (error) {
            console.error("Error updating profile picture:", error.response || error);
        }
    }

    const removeProfilePic = async () => {
        try {
            await api.delete('/profile/')
            setProfilePic(null)
        } catch (error) {
            console.log("Error removing profile picture:", error);
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
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('access_token')
            setUser(null)
        }
    };

    const deleteUser = async (password) => {
        try {
            const response = await api.delete('/delete-user/', {
                data: { password }
            })
            if (response.status === 200) {
                localStorage.removeItem('refresh_token')
                localStorage.removeItem('access_token')
                setUser(null)
                setProfilePic(null)
                setUserDetails({})
                return null
            }
        } catch (error) {
            if (error.response?.status === 400) {
                return "Invalid Password."
            }
            return "Failed to delete user."
        }
    }

    return (
        <AuthContext.Provider value={{ user, register, login, loading, userDetails, profilePic, updateProfilePic, removeProfilePic, updateUserDetails, logout, deleteUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}