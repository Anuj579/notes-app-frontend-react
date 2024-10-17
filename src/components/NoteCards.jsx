import { Star, User } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

function NoteCards() {
    return (
        <div className='md:container px-4 my-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-indigo-300">
                <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900  truncate">Buying Groceries Items</h3>
                        <User className={`h-5 w-5 text-blue-500`} />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">15 Oct, 2024</p>
                    <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 line-clamp-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque accusantium quam eligendi deserunt cupiditate ullam, nesciunt nulla harum veritatis a illo, voluptate porro deleniti, possimus distinctio non reprehenderit sit consectetur.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium text-blue-500 bg-blue-500 bg-opacity-10 dark:bg-opacity-20`}>
                            Personal
                        </span>
                        <Button variant="ghost" size='sm'>Read More</Button>
                    </div>
                </div>
            </div>
            <div className="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-indigo-300">
                <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900  truncate">Project Titan Deadline</h3>
                        <Star className={`h-5 w-5 text-yellow-500`} />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">15 Oct, 2024</p>
                    <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 line-clamp-4">Critical: Submit the final report for Project Titan by Friday, 5 PM. Ensure all stakeholders have reviewed and approved the content. Schedule a final team meeting on Thursday.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium text-yellow-500 bg-yellow-500 bg-opacity-10 dark:bg-opacity-20`}>
                            Important
                        </span>
                        <Button variant="ghost" size='sm'>Read More</Button>
                    </div>
                </div>
            </div>
            <div className="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-indigo-300">
                <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900  truncate">Buying Groceries Items</h3>
                        <User className={`h-5 w-5 text-blue-500`} />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">15 Oct, 2024</p>
                    <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 line-clamp-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque accusantium quam eligendi deserunt cupiditate ullam, nesciunt nulla harum veritatis a illo, voluptate porro deleniti, possimus distinctio non reprehenderit sit consectetur.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium text-blue-500 bg-blue-500 bg-opacity-10 dark:bg-opacity-20`}>
                            Personal
                        </span>
                        <Button variant="ghost" size='sm'>Read More</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteCards