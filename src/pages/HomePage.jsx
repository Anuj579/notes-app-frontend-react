import React, { useEffect, useMemo, useState } from 'react'
import Filter from '../components/Filter'
import NoteCards from '../components/NoteCards'
import axios from 'axios'
import Error from '../components/Error'

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

    return (
        <>
            {error ? (
                <Error isHomePage={true}/>
            ) :
                <div>
                    <Filter category={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    <NoteCards notes={filteredNotes} loading={loading} />
                </div>
            }
        </>
    )
}

export default HomePage