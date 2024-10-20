import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function MainLayout() {

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default MainLayout