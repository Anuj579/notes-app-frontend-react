import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import AuthenticatedNavbar from './AuthenticatedNavbar'
import UnauthentcatedNavbar from './UnauthentcatedNavbar'

function Navbar() {
  const { user } = useAuth()
  return (
    <nav className='p-4 md:px-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10'>
      <div className='md:container'>
        {user
          ? (<AuthenticatedNavbar />)
          : (<UnauthentcatedNavbar />)}
      </div>
    </nav>
  )
}

export default Navbar