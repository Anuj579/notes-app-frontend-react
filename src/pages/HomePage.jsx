import React, { useEffect, useMemo, useState } from 'react'
import Filter from '../components/Filter'
import NoteCards from '../components/NoteCards'
import axios from 'axios'
import Error from '../components/Error'
import { useOutletContext } from 'react-router-dom'

function HomePage() {
    const [notes, setNotes] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("All Notes")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const { setHasError } = useOutletContext()

    const filteredNotes = useMemo(() => {
        return selectedCategory === "All Notes"
            ? notes
            : notes.filter(note => selectedCategory.toLowerCase() === note.category.toLowerCase())
    }, [selectedCategory, notes])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/notes/')
            .then(data => {
                setNotes(data.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setError(true)
                setHasError(true)
            })
    }, [])

    return (
        <>
            {error ? (
                <Error />
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