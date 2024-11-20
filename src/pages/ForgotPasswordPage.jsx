import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Mail, NotebookPen, ArrowLeft } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AuthModal from "../components/AuthModal"
import axios from "axios"
import ActionLoader from "../components/ActionLoader"

function ForgotPasswordPage() {
    const { theme } = useTheme()
    const baseURL = import.meta.env.VITE_API_URL
    const emailRef = useRef()
    const [loading, setLoading] = useState(false)

    const handleSendEmail = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post(`${baseURL}/send-password-reset-email/`, {
                email: emailRef.current.value
            })
            if (response.status === 200) {
                toast.success('Reset link sent to your email.', {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark"
                })
            } else {
                throw new Error(response.statusText)
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error('Email does not exist.', {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark"
                })
            } else {
                toast.error('Failed to send password reset link.', {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark"
                })
                console.log("Error in sending email:", error);
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex items-center justify-center mx-4 my-24">
            <Card className={`w-full max-w-md ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}>
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <NotebookPen className={`h-12 w-12 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Reset Your Password</CardTitle>
                    <CardDescription className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Enter your email and we'll send you a password reset link
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSendEmail} className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm">Email</label>
                            <div className="relative">
                                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    disabled={loading}
                                    autoComplete="email"
                                    ref={emailRef}
                                    className={`pl-10 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 placeholder-gray-400 focus:border-gray-500' : 'bg-gray-50'}`}
                                    required
                                />
                            </div>
                        </div>
                        <Button disabled={loading} className="w-full mt-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white" type="submit">
                            Send Reset Link
                        </Button>
                    </form>
                    <p className="text-center mt-5">
                        <Link to="/login" className={`inline-flex items-center font-semibold text-sm ml-1 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Login
                        </Link>
                    </p>
                </CardContent>
            </Card>
            <ActionLoader isOpen={loading} text="Sending password reset link..." />
            <ToastContainer />
        </div>
    )
}

export default ForgotPasswordPage