import { Clock, Edit, Trash, User } from 'lucide-react'
import React from 'react'
import { Button } from '../components/ui/button'

function NoteDetailPage() {
    return (
        <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="md:flex">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">15</div>
                            <div className="text-xl">Oct</div>
                            <div className="text-sm mt-2">2024</div>
                        </div>
                    </div>
                    <div className="px-4 py-8 sm:p-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Buying Groceries Items</h1>
                            <div className={`flex items-center px-3 py-1 rounded-full w-max text-sm text-blue-500 bg-blue-500 bg-opacity-10 dark:bg-opacity-20`}>
                                <User className="h-4 w-4 mr-2" />
                                <span>Personal</span>
                            </div>
                        </div>
                        <div className="mb-6 text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Last updated: Oct 16, 2024 at 2:30 PM</span>
                        </div>
                        <div className="prose dark:prose-invert max-w-none mb-8">
                            <p className="text-gray-700 dark:text-gray-300">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae soluta et aliquam aliquid ut iure dolor, esse accusantium obcaecati quis maxime atque alias possimus odit quisquam debitis excepturi consequatur sed.</p>
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center sm:justify-normal">
                            <Button variant="outline" className="flex items-center transition-all duration-300 hover:bg-blue-100 dark:hover:bg-gray-700">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                            <Button variant="outline" className="flex items-center text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all duration-300 hover:bg-red-100 dark:hover:bg-gray-700">
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default NoteDetailPage