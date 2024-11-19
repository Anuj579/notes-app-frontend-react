import React from 'react'
import { ClipLoader } from 'react-spinners'
import { useTheme } from '../contexts/ThemeContext'
import { useNotes } from '../contexts/NoteContext'

function Loader() {
    const { loading } = useNotes()
    const { theme } = useTheme()
    return (
        <div className='flex justify-center items-center h-[calc(100vh-15rem)] md:h-[calc(100vh-10rem)]'>
            <ClipLoader size={40} loading={loading} color={theme === "light" ? "#2563EB" : "#60A5FA"} />
        </div>
    )
}

export default Loader