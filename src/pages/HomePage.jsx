import React, { useEffect, useMemo, useState } from 'react'
import Filter from '../components/Filter'
import NoteCards from '../components/NoteCards'
import Error from '../components/Error'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import EmptyState from '../components/EmptyState'
import { useTheme } from '../contexts/ThemeContext'
import Loader from '../components/Loader'

function HomePage({ notes, loading, error, handleResetSearch }) {
    const [selectedCategory, setSelectedCategory] = useState("All Notes")
    const { theme } = useTheme()

    const filteredNotes = useMemo(() => {
        return selectedCategory === "All Notes"
            ? notes
            : notes.filter(note => selectedCategory.toLowerCase() === note.category.toLowerCase())
    }, [selectedCategory, notes])

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.state) {
            if (location.state.showDeleteToast && notes.length > 0) {
                toast.success('Note deleted successfully!', {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark"
                });
            } else if (location.state.showUserCreatedToast) {
                toast.success('Account created successfully!', {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark"
                });
            }

            // Clear the state to prevent the toast from showing again on refresh
            navigate('/notes', { replace: true, state: {} });
        }
    }, [location.state, navigate]);


    if (loading) return <Loader loading={loading} />;

    if (error) return <Error error={error} handleResetSearch={handleResetSearch} />

    return (
        <div>
            {notes.length === 0 && !loading ? (
                <EmptyState />
            ) : (
                <>
                    <Filter category={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    <NoteCards notes={filteredNotes} />
                </>
            )}
            <ToastContainer />
        </div>
    );
};

export default HomePage