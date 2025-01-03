import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Mail, Lock, NotebookPen, User, Eye, EyeOff, CheckCircle, Loader } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog"
import AuthModal from "../components/AuthModal"

function SignupPage() {
  const { theme } = useTheme()
  const { register, login } = useAuth()
  const [userData, setUserData] = useState({ first_name: '', last_name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [inputType, setInputType] = useState('password')
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const toggleInputType = () => setInputType(prev => (prev === 'password' ? 'text' : 'password'));

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const errorMessage = await register(userData)
      if (errorMessage) {
        toast.error(errorMessage, {
          autoClose: 4000,
          theme: theme === "light" ? "light" : "dark"
        })
      } else {
        setOpenDialog(true)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const loginUser = async () => {
    setIsLoggingIn(true)
    try {
      await login({ 'email': userData.email, 'password': userData.password })
      setOpenDialog(false);
    } catch (error) {
      toast.error('Login failed. Please try again.', {
        autoClose: 4000,
        theme: theme === "light" ? "light" : "dark"
      })
    } finally {
      setIsLoggingIn(false)
    }
  }

  return (
    <div className="flex items-center justify-center mx-4 my-24">
      <Card className={`w-full max-w-md ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <NotebookPen className={`h-12 w-12 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Enter your details to create your NoteWorthy account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div className="space-y-2">
              <label htmlFor="firstname" className="text-sm">First Name</label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                <Input
                  id="firstname"
                  type="text"
                  placeholder="Anuj"
                  value={userData.first_name}
                  onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
                  disabled={loading}
                  autoComplete="username"
                  className={`pl-10 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 placeholder-gray-400 focus:border-gray-500' : 'bg-gray-50'}`}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="lastname" className="text-sm">Last Name</label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                <Input
                  id="lastname"
                  type="text"
                  placeholder="Chaudhary"
                  value={userData.last_name}
                  onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
                  disabled={loading}
                  autoComplete="username"
                  className={`pl-10 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 placeholder-gray-400 focus:border-gray-500' : 'bg-gray-50'}`}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm">Email</label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                <Input
                  id="email"
                  type="email"
                  placeholder="anujchaudhary3112@gmail.com"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  disabled={loading}
                  autoComplete="email"
                  className={`pl-10 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 placeholder-gray-400 focus:border-gray-500' : 'bg-gray-50'}`}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm">Password</label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                <Input
                  id="password"
                  type={inputType}
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  disabled={loading}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`pl-10 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 placeholder-gray-400 focus:border-gray-500' : 'bg-gray-50'}`}
                  required
                />
                <button className='absolute right-3 top-0 h-full' type='button' onClick={toggleInputType} aria-label={inputType === 'password' ? 'Show password' : 'Hide password'} title={inputType === 'password' ? 'Show password' : 'Hide password'}>
                  {inputType === 'password' ? <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" /> : <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
                </button>
              </div>
            </div>
            <Button disabled={loading} className="w-full mt-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white" type="submit">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <hr className="dark:border-gray-700 mb-4 mx-6" />
        <CardFooter>
          <p className={`text-sm text-center w-full ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?
            <Link to="/login" className={`font-semibold ml-1 hover:underline ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
              Log In
            </Link>
          </p>
        </CardFooter>
      </Card>
      <AuthModal isOpen={loading}
        title="Creating Your Account"
        description="We're setting up your NoteWorthy account. This may take a moment."
        actionText="Please don't close your browser during this process."
      />
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent >
          <AlertDialogHeader>
            <AlertDialogTitle className='text-green-600 dark:text-green-500'>
              <CheckCircle className="h-5 w-5 mr-2" />
              Welcome to NoteWorthy!
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your account has been successfully created. We're excited to have you on board!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button
                onClick={loginUser}
                className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-300"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Logging you in...
                  </>
                ) : (
                  'Continue to NoteWorthy'
                )}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ToastContainer />
    </div>
  )
}

export default SignupPage