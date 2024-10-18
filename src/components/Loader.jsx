import React from 'react'
import { ClipLoader } from 'react-spinners'

function Loader({ loading }) {
    return (
        <div className='flex justify-center items-center h-[calc(100vh-15rem)]'>
            <ClipLoader size={40} loading={loading} color="#2563EB" />
        </div>
    )
}

export default Loader