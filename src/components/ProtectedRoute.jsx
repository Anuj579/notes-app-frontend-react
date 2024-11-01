import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

function ProtectedRoute({ children }) {
    const { user } = useAuth()
    return (
        user ? children : <Navigate to="/login" />
    )
}

export default ProtectedRoute