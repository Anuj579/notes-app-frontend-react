import React, { useEffect } from 'react'
import Filter from '../components/Filter'
import NoteCards from '../components/NoteCards'
import Error from '../components/Error'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import EmptyState from '../components/EmptyState'
import { useTheme } from '../contexts/ThemeContext'
import Loader from '../components/Loader'
import { useNotes } from '../contexts/NoteContext'

function HomePage() {
    const { theme } = useTheme()
    const { notes, loading, error } = useNotes()

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.state) {
            if (location.state?.showDeleteToast && notes.length > 0) {
                toast.success('Note deleted successfully!', {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark"
                });
            }
            navigate('/notes', { replace: true, state: {} });
        }
    }, []);

    if (loading) return <Loader />;

    if (error) return <Error />

    return (
        <div>
            {notes && notes.length === 0 && !loading ? (
                <EmptyState />
            ) : (
                <>
                    <Filter />
                    <NoteCards />
                </>
            )}
            <ToastContainer />
        </div>
    );
};

export default HomePage