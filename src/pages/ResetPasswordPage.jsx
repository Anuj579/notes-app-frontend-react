import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { NotebookPen, Eye, EyeOff, Lock, MailPlus, AlertCircle } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import { useEffect, useRef, useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../components/Loader"
import ActionLoader from "../components/ActionLoader"

function ResetPasswordPage() {
    const { theme } = useTheme()
    const baseURL = import.meta.env.VITE_API_URL
    const { uid, token } = useParams()
    const [inputType, setInputType] = useState('password')
    const toggleInputType = () => setInputType(prev => (prev === 'password' ? 'text' : 'password'));
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [disabled, setDisabled] = useState(false)
    const passwordRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        const validateToken = async () => {
            try {
                await axios.get(`${baseURL}/validate-token/${uid}/${token}/`)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        validateToken()
    }, [])

    const handleSetNewPassword = async (e) => {
        e.preventDefault()
        setDisabled(true)
        try {
            const response = await axios.post(`${baseURL}/reset-password/${uid}/${token}/`, {
                new_password: passwordRef.current.value
            })
            if (response.status === 200) {
                navigate('/login', {state: {showPasswordResetToast: true}})
            }
        } catch (error) {
            toast.error('Failed to set password.', {
                autoClose: 4000,
                theme: theme === "light" ? "light" : "dark"
            })
        } finally {
            setDisabled(false)
        }
    }

    if (loading) return <Loader loading={loading} />

    if (!loading && error) {
        return (
            <div className="flex flex-col items-center justify-center mx-4 h-[calc(100vh-15rem)] sm:h-[calc(100vh-10rem)]">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-6 py-8 md:p-8 max-w-md w-full text-center">
                    <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Invalid or Expired Link</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">The reset link is either invalid or has expired. Please request a new one to reset your password.</p>
                    <Button className="w-full" onClick={() => navigate('/forgot-password')}>
                        <MailPlus className="h-5 w-5 mr-2" />
                        Request New Link
                    </Button>
                </div>
            </div>
        )
    }

    if (!loading)
        return (
            <div className="flex items-center justify-center mx-4 my-24">
                <Card className={`w-full max-w-md ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}>
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-center mb-4">
                            <NotebookPen className={`h-12 w-12 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">Set New Password</CardTitle>
                        <CardDescription className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Enter your new password to regain access to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSetNewPassword} className="flex flex-col gap-4">
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm">Password</label>
                                <div className="relative">
                                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <Input
                                        id="password"
                                        type={inputType}
                                        placeholder="••••••••"
                                        disabled={disabled}
                                        autoComplete="off"
                                        ref={passwordRef}
                                        className={`pl-10 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 placeholder-gray-400 focus:border-gray-500' : 'bg-gray-50'}`}
                                        required
                                    />
                                    <button className='absolute right-3 top-0 h-full' type='button' onClick={toggleInputType} aria-label={inputType === 'password' ? 'Show password' : 'Hide password'} title={inputType === 'password' ? 'Show password' : 'Hide password'}>
                                        {inputType === 'password' ? <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" /> : <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
                                    </button>
                                </div>
                            </div>
                            <Button disabled={disabled} className="w-full mt-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white" type="submit">
                                Set New Password
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <ActionLoader isOpen={disabled} text="Setting new password..." />
                <ToastContainer />
            </div>
        )
}

export default ResetPasswordPage