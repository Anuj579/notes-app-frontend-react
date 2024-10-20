import { AlertCircle, Home, RefreshCcw } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

function Error() {

    return (
        <div className="flex flex-col items-center justify-center mx-4 h-[calc(100vh-8rem)]">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-6 py-8 md:p-8 max-w-md w-full text-center">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Don't worry, it's not your fault. We're working on fixing the issue.</p>
                <Button className="w-full" onClick={() => window.location.reload()}>
                    <RefreshCcw className="h-5 w-5 mr-2" />
                    Try Again
                </Button>
            </div>
        </div>
    )
}

export default Error