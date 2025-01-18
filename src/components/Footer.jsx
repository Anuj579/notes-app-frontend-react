import { Github, Linkedin } from 'lucide-react'
import React from 'react'

function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-md mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        © {new Date().getFullYear()} NoteWorthy. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                        <a href="https://github.com/Anuj579" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href="https://x.com/anujbuilds" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/anujchaudhary549/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 sm:mt-0">
                        Developed by <a href="https://anujchaudhary.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"><span className='font-medium'>AnujChaudhary</span></a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer