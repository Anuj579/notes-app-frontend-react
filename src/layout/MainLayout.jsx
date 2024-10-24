import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'

function MainLayout({ searchText, setSearchText, handleSearch, resetNotes, fetchAllNotes }) {
    const navigate = useNavigate()
    useEffect(() => {
        if (searchText.length < 3) {
            resetNotes()
            if (window.location.pathname !== '/') {
                navigate('/', { replace: true });
            }

        }
    }, [searchText])

    return (
        <>
            <Navbar searchText={searchText} setSearchText={setSearchText} handleSearch={handleSearch} fetchAllNotes={fetchAllNotes} />
            <Outlet />
        </>
    )
}

export default MainLayout