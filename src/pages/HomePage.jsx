import React, { useEffect, useMemo, useState } from 'react'
import Filter from '../components/Filter'
import NoteCards from '../components/NoteCards'
import Error from '../components/Error'
import { useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function HomePage({ notes, loading, error, handleResetSearch }) {
    const [selectedCategory, setSelectedCategory] = useState("All Notes")

    const filteredNotes = useMemo(() => {
        return selectedCategory === "All Notes"
            ? notes
            : notes.filter(note => selectedCategory.toLowerCase() === note.category.toLowerCase())
    }, [selectedCategory, notes])

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
                <Error error={error} handleResetSearch={handleResetSearch} />
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