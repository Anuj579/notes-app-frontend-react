import { AlertCircle, Home, RefreshCcw } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

function Error({ isHomePage = false }) {

    return (
        <div className="flex flex-col items-center justify-center mx-4 h-screen">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-6 py-8 md:p-8 max-w-md w-full text-center">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Don't worry, it's not your fault. We're working on fixing the issue.</p>
                <Button className="w-full" onClick={() => window.location.reload()}>
                    <RefreshCcw className="h-5 w-5 mr-2" />
                    Try Again
                </Button>
                {!isHomePage && (
                    <Button variant="outline" className="w-full mt-4" onClick={() => window.location.href = '/'}>
                        <Home className="h-5 w-5 mr-2" />
                        Go to Homepage
                    </Button>
                )}
            </div>
            <div className="mt-8 text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">NoteWorthy</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your favorite note-taking app</p>
            </div>
        </div>
    )
}

export default Error