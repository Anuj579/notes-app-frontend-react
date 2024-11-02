import { Github, Linkedin, Twitter } from 'lucide-react'
import React from 'react'

function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-800 shadow-md mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        © 2024 NoteWorthy. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 sm:mt-0">
                        Developed by Anuj Chaudhary
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer