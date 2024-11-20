import { AlertCircle, FileSearch, RefreshCcw, RefreshCw } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useLocation, useNavigate } from 'react-router-dom';
import { useNotes } from '../contexts/NoteContext';

function Error() {
    const { handleReset, error } = useNotes()
    const location = useLocation();
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search');

    const handleResetSearch = () => {
        handleReset()
        navigate('/notes', { replace: true })
    }
    return (
        <div className="flex flex-col items-center justify-center mx-4 h-[calc(100vh-15rem)] md:h-[calc(100vh-8rem)]">
            {error === "apiError" && (
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-6 py-8 md:p-8 max-w-md w-full text-center">
                    <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Don't worry, it's not your fault. We're working on fixing the issue.</p>
                    <Button className="w-full" onClick={() => window.location.reload()}>
                        <RefreshCcw className="h-5 w-5 mr-2" />
                        Try Again
                    </Button>
                </div>
            )}

            {error === "noteNotFoundError" && (
                <div className='flex flex-col items-center justify-center'>
                    <div className="relative mb-6">
                        <FileSearch className="w-24 h-24 text-gray-300 dark:text-gray-600" />
                        <div className="absolute -bottom-2 -right-2 bg-blue-600 dark:bg-blue-500 rounded-full p-2">
                            <RefreshCw className="w-6 h-6 text-white animate-spin" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2 text-center">
                        No notes found
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
                        We couldn't find any notes matching "<span className="font-semibold">{searchTerm}</span>".
                        Try adjusting your search terms or explore other topics.
                    </p>
                    <Button onClick={handleResetSearch} className="group bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all">
                        <RefreshCw className="w-4 h-4 mr-2 group-hover:animate-spin" />
                        Reset Search
                    </Button>
                </div>
            )}

        </div>
    )
}

export default Error