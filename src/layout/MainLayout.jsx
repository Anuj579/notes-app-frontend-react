import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext'
import { useNotes } from '../contexts/NoteContext'

function MainLayout() {
    const { user } = useAuth()
    const { searchText, resetNotes } = useNotes()
    const navigate = useNavigate()
    useEffect(() => {
        if (searchText && searchText.length < 3) {
            resetNotes()
            if (window.location.pathname !== '/notes' && user) {
                navigate('/notes', { replace: true });
            }

        }
    }, [searchText])

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout