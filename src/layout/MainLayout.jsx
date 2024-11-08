import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext'

function MainLayout({ searchText, setSearchText, handleSearch, resetNotes }) {
    const { user } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (searchText.length < 3) {
            resetNotes()
            if (window.location.pathname !== '/notes' && user) {
                navigate('/notes', { replace: true });
            }

        }
    }, [searchText])

    return (
        <>
            <Navbar searchText={searchText} setSearchText={setSearchText} handleSearch={handleSearch} />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout