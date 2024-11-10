import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { NotebookPen, Mail, User, Trash2, UserRoundPen, Calendar, AlertTriangle, Lock, EyeOff, Eye } from "lucide-react"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../components/ui/alert-dialog"
import { useTheme } from "../contexts/ThemeContext"
import { Link, useLocation } from "react-router-dom"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function ProfilePage() {
    const { theme } = useTheme()
    const { userDetails, profilePic } = useAuth()
    const baseUrl = import.meta.env.VITE_API_URL
    const location = useLocation()
    const [inputType, setInputType] = useState('password')
    const toggleInputType = () => setInputType(prev => (prev === 'password' ? 'text' : 'password'));

    const imageUrl = profilePic ? `${baseUrl}${profilePic}` : ''

    const dateJoined = userDetails.date_joined
    const date = new Date(dateJoined)
    const month = date.toLocaleString('default', { month: 'long' })
    const year = date.getFullYear()
    const formattedDate = `${month} ${year}`

    useEffect(() => {
        if (location.state?.showUserUpdateToast) {
            toast.success('Profile updated successfully!', {
                autoClose: 4000,
                theme: theme === "light" ? "light" : "dark"
            })
        }
    }, [])
    return (
        <main className="container mx-auto px-4 my-16">
            <Card className={`max-w-2xl mx-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center">
                        <NotebookPen className={`h-6 w-6 mr-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                        Profile
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={imageUrl || ''} />
                            <AvatarFallback><img src={`https://ui-avatars.com/api/?name=${userDetails.first_name}+${userDetails.last_name}&background=0D8ABC&color=fff&size=100`} alt="user-avatar" /></AvatarFallback>
                        </Avatar>
                        <div className="space-y-1 text-center sm:text-left">
                            <h2 className="text-2xl font-semibold">{userDetails.first_name} {userDetails.last_name}</h2>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>NoteWorthy User</p>
                            <p className={`text-sm flex items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                <Calendar className="inline-block w-4 h-4 mr-1" />
                                Member since {formattedDate}
                            </p>
                        </div>
                    </div>
                    <hr className="dark:border-gray-700" />
                    <div className="grid gap-4">
                        <div className="flex items-center space-x-2">
                            <User className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className="font-medium">First Name:</span>
                            <span>{userDetails.first_name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <User className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className="font-medium">Last Name:</span>
                            <span>{userDetails.last_name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Mail className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className="font-medium">Email:</span>
                            <span>{userDetails.email}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4 mt-1">
                    <Button asChild className="w-full sm:w-auto">
                        <Link to="/edit-profile">
                            <UserRoundPen className="h-4 w-4 mr-2" />
                            Edit Profile
                        </Link>
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 dark:text-white">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Account
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className='font-semibold flex items-center text-red-600 dark:text-red-500'>
                                    <AlertTriangle className="h-5 w-5 mr-2" />
                                    Delete Account
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <form>
                                <div className="space-y-4 py-4 mb-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        To confirm, please enter your password:
                                    </p>
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="sr-only">
                                            Password
                                        </Label>
                                        <div className="relative">
                                            <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                            <Input
                                                id="password"
                                                type={inputType}
                                                placeholder="••••••••"
                                                autoComplete="current-password"
                                                className={`pl-10 ${theme === 'dark' ? ' border-gray-600 placeholder-gray-400 focus:border-gray-500' : 'bg-gray-50'}`}
                                                required
                                            />
                                            <button className='absolute right-3 top-0 h-full' type='button' onClick={toggleInputType} aria-label={inputType === 'password' ? 'Show password' : 'Hide password'} title={inputType === 'password' ? 'Show password' : 'Hide password'}>
                                                {inputType === 'password' ? <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" /> : <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <Button className='bg-red-600 hover:bg-red-700 dark:text-white'>Delete Account</Button>
                                </AlertDialogFooter>
                            </form>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
            <ToastContainer />
        </main>
    )
}

export default ProfilePage