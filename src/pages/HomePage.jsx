import React, { useEffect, useMemo, useState } from 'react'
import Filter from '../components/Filter'
import NoteCards from '../components/NoteCards'
import axios from 'axios'
import Error from '../components/Error'
import { useLocation } from 'react-router-dom'
import { useToast } from '../components/hooks/use-toast'
import { Toaster } from '../components/ui/toaster'
import { CheckCircle } from 'lucide-react'

function HomePage() {
    const [notes, setNotes] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("All Notes")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const apiBaseURL = import.meta.env.VITE_API_URL

    const filteredNotes = useMemo(() => {
        return selectedCategory === "All Notes"
            ? notes
            : notes.filter(note => selectedCategory.toLowerCase() === note.category.toLowerCase())
    }, [selectedCategory, notes])

    useEffect(() => {
        axios.get(`${apiBaseURL}/notes`)
            .then(data => {
                setNotes(data.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setError(true)
            })
    }, [])

    const location = useLocation()
    const { toast } = useToast()

    useEffect(() => {
        if (location.state?.showDeleteToast) {
            toast({
                variant: 'success',
                title: (
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        <span>Note deleted successfully</span>
                    </div>
                )
            })
        }
    }, [location.state, toast])


    return (
        <>
            {error ? (
                <Error />
            ) :
                <div>
                    <Filter category={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    <NoteCards notes={filteredNotes} loading={loading} />
                    <Toaster />
                </div>
            }
        </>
    )
}

export default HomePage