import React from 'react'
import { Button } from "../components/ui/button"
import { FileX, PenTool, FileQuestion, Home } from "lucide-react"
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <FileX className="h-72 w-72" />
          </div>
          <div className="relative">
            <div className="flex items-center justify-center space-x-4">
              <FileQuestion className="h-16 w-16 text-blue-600 dark:text-blue-400" />
              <PenTool className="h-12 w-12 text-blue-500 dark:text-blue-300" />
            </div>
            <h1 className="mt-6 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-purple-500">
              404
            </h1>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
              Page Not Found
            </p>
          </div>
        </div>
        <p className="pt-4 text-xl text-gray-600 dark:text-gray-300">
          Oops! It looks like this page has vanished from our notebook.
        </p>
        <div className="mt-8">
          <Button onClick={() => navigate('/')} size="lg" className="px-8 py-3 text-lg font-semibold ">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </div>
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Don't worry, your notes are safe. Try navigating back to your dashboard or checking the URL.
        </p>
      </div>
    </div>
  )
}