import { useContext, createContext, useState, useEffect, useMemo } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const NoteContext = createContext()

export const NoteProvider = ({ children }) => {
    const { user } = useAuth()
    const [notes, setNotes] = useState([])
    const [allNotes, setAllNotes] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [searchText, setSearchText] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All Notes")

    const fetchAllNotes = async () => {
        if (user) {
            setLoading(true);
            try {
                const response = await api.get('/notes/');
                setNotes(response.data);
                setAllNotes(response.data);
                setLoading(false);
                setError("");
                setSearchText("");
            } catch (error) {
                setLoading(false);
                setError("apiError");
            }
        }
    };

    useEffect(() => {
        fetchAllNotes()
    }, [user])

    const filteredNotes = useMemo(() => {
        return selectedCategory === "All Notes"
            ? notes
            : notes.filter(note => selectedCategory.toLowerCase() === note.category.toLowerCase())
    }, [selectedCategory, notes])

    // Search functionality
    const handleSearch = () => {
        setLoading(true)
        setError("")
        setNotes(allNotes);
        if (searchText.length > 2) {
            api.get(`/notes-search/?search=${searchText}`)
                .then(response => {
                    setNotes(response.data)
                    setLoading(false)
                    if (response.status === 204) {
                        setError("noteNotFoundError");
                    }
                })
                .catch(error => {
                    console.log(error)
                    setError("apiError");
                });
        }
    };

    // This function is for reseting notes when the search bar text length is smaller than 3
    const resetNotes = () => {
        if (searchText.length < 3) {
            setError("")
            setNotes(allNotes);
        }
    }

    // This function is for removing delted note from notes after a note is deleted
    const removeDeletedNoteFromState = (slug) => {
        setNotes(notes.filter(note => note.slug !== slug));
    }

    // This function is for the reset search button in error component when No Notes found error occur
    const handleReset = () => {
        setSearchText("");
        setNotes(allNotes);
        setError("");
    };
    return (
        <NoteContext.Provider value={{ notes, fetchAllNotes, filteredNotes, selectedCategory, setSelectedCategory, removeDeletedNoteFromState, searchText, setSearchText, loading, error, handleReset, handleSearch, resetNotes }}>
            {children}
        </NoteContext.Provider>
    )
}

export const useNotes = () => {
    return useContext(NoteContext)
}