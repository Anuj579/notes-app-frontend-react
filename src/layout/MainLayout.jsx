import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

function MainLayout({ searchText, setSearchText, handleSearch, resetNotes, fetchAllNotes }) {
    const navigate = useNavigate()
    useEffect(() => {
        if (searchText.length < 3) {
            resetNotes()
            if (window.location.pathname !== '/notes') {
                navigate('/notes', { replace: true });
            }

        }
    }, [searchText])

    return (
        <>
            <Navbar searchText={searchText} setSearchText={setSearchText} handleSearch={handleSearch} fetchAllNotes={fetchAllNotes} />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout