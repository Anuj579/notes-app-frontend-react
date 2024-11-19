import { AlertTriangle, Briefcase, Clock, Edit, Star, Trash2, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Error from '../components/Error'
import Loader from '../components/Loader'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../components/ui/alert-dialog"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from '../contexts/ThemeContext'
import api from '../services/api'
import ActionLoader from '../components/ActionLoader'

function NoteDetailPage({ removeDeletedNoteFromState }) {
    const [note, setNote] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const { slug } = useParams()
    const location = useLocation()
    const { theme } = useTheme()
    const [showAlert, setShowAlert] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [toastShown, setToastShown] = useState(false);

    useEffect(() => {
        const fetchNote = async () => {
            setError("")
            try {
                const response = await api.get(`/notes/${slug}/`)
                setNote(response.data)
            } catch (error) {
                setError("apiError")
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        fetchNote()

    }, [])

    const formatDateTime = (date) => {
        const format = new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        })
        const parts = format.split(' ')
        return `${parts[0]} ${parts[1]}, ${parts[2]} at ${parts[3]}${parts[4].toUpperCase()}`
    }

    const categoryStyles = {
        personal: { color: 'text-personal bg-personal', icon: <User className="h-4 w-4 mr-2" /> },
        important: { color: 'text-important bg-important', icon: <Star className="h-4 w-4 mr-2" /> },
        business: { color: 'text-business bg-business', icon: <Briefcase className="h-4 w-4 mr-2" /> }
    };

    const getCategoryStyle = (category) => {
        return categoryStyles[category.toLowerCase()] || { color: '', icon: null };
    };

    const navigate = useNavigate()
    const handleDelete = async () => {
        setDisabled(true)
        try {
            await api.delete(`/notes/${slug}/`)
            // reseting notes after successfuly deleted note and redirecting to homepage
            removeDeletedNoteFromState(slug)
            navigate('/notes', { state: { showDeleteToast: true } })
        } catch (error) {
            toast.error('Failed to delete note!', {
                autoClose: 4000,
                theme: theme === "light" ? "light" : "dark"
            })
        } finally {
            setDisabled(false)
        }
    }

    useEffect(() => {
        if (!toastShown && location.state) {
            if (location.state.showUpdateToast) {
                toast.success('Note updated successfully!', {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark",
                });
            } else if (location.state.showAddToast) {
                toast.success('Note added successfully!', {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark",
                });
            }
            setToastShown(true);

        }
    }, [location.state, toastShown]);

    if (error) {
        return <Error />
    }

    if (loading) {
        return <Loader loading={loading} />
    }
    const categoryStyle = getCategoryStyle(note.category);

    return (
        <main className="my-16 flex justify-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white max-w-5xl w-full dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="md:flex">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">
                                {new Date(note.created_at).toLocaleDateString('en-IN', { day: 'numeric' })}
                            </div>
                            <div className="text-xl">
                                {new Date(note.created_at).toLocaleDateString('en-IN', { month: 'short' })}
                            </div>
                            <div className="text-sm mt-2">
                                {new Date(note.created_at).toLocaleDateString('en-IN', { year: 'numeric' })}
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-8 sm:p-8 sm:w-full">
                        <div className="flex gap-4 flex-wrap justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{note.title}</h1>
                            <div className={`flex items-center px-3 py-1 rounded-full w-max text-sm ${categoryStyle.color} bg-opacity-10 dark:bg-opacity-20`}>
                                {categoryStyle.icon}
                                <span>{note.category.charAt(0).toUpperCase() + note.category.slice(1).toLowerCase()}</span>
                            </div>
                        </div>
                        <div className="mb-6 text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Last updated: {formatDateTime(note.updated_at)}</span>
                        </div>
                        <div className="prose dark:prose-invert max-w-none mb-8">
                            <p className="text-gray-700 dark:text-gray-300">
                                {note.body ? note.body : "This note has no content."}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                            <Link to={`/notes/${slug}/edit`}>
                                <Button variant="outline" className="flex items-center transition-all duration-300 hover:bg-blue-100 dark:hover:bg-gray-700">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </Link>
                            <Button variant="outline" className="flex items-center text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all duration-300 hover:bg-red-100 dark:hover:bg-gray-700"
                                onClick={() => setShowAlert(true)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                            <AlertDialogTrigger asChild>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className='text-red-600 dark:text-red-500'>
                                        <AlertTriangle className="h-5 w-5 mr-2" />
                                        Confirm Deletion
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to delete the note? This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel disabled={disabled}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction asChild><Button onClick={handleDelete} className='bg-red-600 hover:bg-red-700 dark:text-white' disabled={disabled}>Delete Note</Button></AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <ActionLoader isOpen={disabled} text="Deleting note..." />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </main>
    )
}

export default NoteDetailPage