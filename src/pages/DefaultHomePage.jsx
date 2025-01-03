import { CheckCircle, Cloud, Lock, NotebookPen } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from '../contexts/ThemeContext';

function DefaultHomePage() {
  const { theme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.state?.showUserDeletedToast) {
      toast.success('Your account has been deleted successfully!', {
        autoClose: 4000,
        theme: theme === "light" ? "light" : "dark"
      })
      navigate('/', { replace: true, state: {} })
    }
  }, [location.state, navigate])
  return (
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center">
          <NotebookPen className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Welcome to NoteWorthy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Your personal space for capturing ideas, organizing thoughts, and boosting productivity.
          </p>
          <div className="flex justify-center mb-12">
            <Link to='/signup'>
              <Button size="lg" className="text-lg justify-start bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 text-white hover:bg-blue-700 transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg  dark:hover:shadow-blue-500/10 transition-all duration-300">
            <CheckCircle className="h-12 w-12 text-green-500 dark:text-green-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Easy to Use</h2>
            <p className="text-gray-600 dark:text-gray-300">Intuitive interface for seamless note-taking and organization.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg  dark:hover:shadow-blue-500/10 transition-all duration-300">
            <Lock className="h-12 w-12 text-blue-500 dark:text-blue-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Secure</h2>
            <p className="text-gray-600 dark:text-gray-300">Your notes are encrypted and protected with industry-standard security.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg  dark:hover:shadow-blue-500/10 transition-all duration-300">
            <Cloud className="h-12 w-12 text-purple-500 dark:text-purple-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Cloud-Powered</h2>
            <p className="text-gray-600 dark:text-gray-300">Access your notes from any device with secure cloud synchronization.</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  )
}

export default DefaultHomePage