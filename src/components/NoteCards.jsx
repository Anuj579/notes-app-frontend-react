import { Briefcase, Star, Tag, User } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import Loader from './Loader'

function NoteCards({ notes, loading }) {

    const getCategoryIcon = (category) => {
        switch (category.toLowerCase()) {
            case "personal":
                return <User className="h-5 w-5 text-personal" />;
            case "important":
                return <Star className="h-5 w-5 text-important" />;
            case "business":
                return <Briefcase className="h-5 w-5 text-business" />;
            default:
                return <User className="h-5 w-5 text-gray-500" />;
        }
    };

    const getCategoryColor = (category) => {
        switch (category.toLowerCase()) {
            case "personal":
                return 'text-personal bg-personal'
            case "important":
                return 'text-important bg-important'
            case "business":
                return 'text-business bg-business'
        }
    }

    const formatDate = (date) => {
        const d = new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })

        const parts = d.split(' ')
        return `${parts[0]} ${parts[1]}, ${parts[2]}`
    }

    if (loading) {
        return <Loader loading={loading} />
    }
    return (
        <div className='md:container px-4 my-6 mb-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {notes.map((note) => (
                <div key={note.id} className="flex flex-col bg-white overflow-hidden shadow-lg rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-gray-600/10 hover:border-blue-300 dark:hover:border-gray-500">
                    <div className="px-4 dark:bg-gray-800 py-5 sm:p-6">
                        <div className="flex justify-between items-center gap-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{note.title}</h3>
                            {getCategoryIcon(note.category)}
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-200">
                            {formatDate(note.updated_at)}
                        </p>
                        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{note.body}</p>
                    </div>
                    <div className="bg-gray-50 mt-auto dark:bg-gray-700 px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                            <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(note.category)} bg-opacity-10 dark:bg-opacity-20`}>
                                <Tag className='w-3.5 h-3.5' />
                                {note.category.charAt(0).toUpperCase() + note.category.slice(1).toLowerCase()}
                            </span>
                            <Link to={`/notes/${note.slug}`}>
                                <Button variant="ghost" size='sm'>Read More</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default NoteCards