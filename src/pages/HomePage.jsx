import React, { useEffect, useMemo, useState } from 'react'
import Filter from '../components/Filter'
import NoteCards from '../components/NoteCards'
import axios from 'axios'
import Error from '../components/Error'
import { useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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

    useEffect(() => {
        if (location.state?.showDeleteToast) {
            toast.success('Note deleted successfully!', {
                autoClose: 4000,
            });
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
                    <ToastContainer />
                </div>
            }
        </>
    )
}

export default HomePage