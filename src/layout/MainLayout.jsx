import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function MainLayout() {
    const [hasError, setHasError] = useState(false)

    return (
        <>
            {!hasError && <Navbar />}
            <Outlet context={{ setHasError }} />
        </>
    )
}

export default MainLayout