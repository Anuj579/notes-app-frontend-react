import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Mail, Lock, NotebookPen, Eye, EyeOff } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useRef, useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AuthModal from "../components/AuthModal"

function LoginPage() {
  const { theme } = useTheme()
  const { loading, login } = useAuth()

  const [inputType, setInputType] = useState('password')
  const toggleInputType = () => setInputType(prev => (prev === 'password' ? 'text' : 'password'));

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const errorMessage = await login({
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
      if (errorMessage) {
        toast.error(errorMessage, {
          autoClose: 4000,
          theme: theme === "light" ? "light" : "dark"
        })
      }
    } catch (error) {
      console.log("Login Error:", error);
    }
  }
  return (
    <div className="flex items-center justify-center mx-4 my-24">
      <Card className={`w-full max-w-md ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <NotebookPen className={`h-12 w-12 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome back to NoteWorthy</CardTitle>
          <CardDescription className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm">Email</label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                <Input
                  id="email"
                  type="email"
                  placeholder="anujchaudhary3112@gmail.com"
                  disabled={loading}
                  autoComplete="email"
                  ref={emailRef}
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
                  placeholder="••••••••"
                  disabled={loading}
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
            <Button disabled={loading} className="w-full mt-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white" type="submit">
              Log In
            </Button>
          </form>
        </CardContent>
        <hr className="dark:border-gray-700 mb-4 mx-6" />
        <CardFooter>
          <p className={`text-sm text-center w-full ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Don't have an account?
            <Link to="/signup" className={`font-semibold ml-1 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
      <AuthModal isOpen={loading}
        title="Logging In"
        description="Please wait while we securely log you in..."
        actionText="Please wait while we authenticate your credentials. Do not close your browser."
      />
      <ToastContainer />
    </div>
  )
}

export default LoginPage