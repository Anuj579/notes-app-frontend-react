import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AuthenticatedNavbar from './AuthenticatedNavbar'
import UnauthentcatedNavbar from './UnauthentcatedNavbar'

function Navbar({ searchText, setSearchText, handleSearch, fetchAllNotes }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const handleSearchForm = (e) => {
    e.preventDefault()
    handleSearch()
    navigate(`/?search=${searchText}`)
  }

  return (
    <nav className='p-4 md:px-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10'>
      <div className='md:container'>
        {user
          ? (<AuthenticatedNavbar fetchAllNotes={fetchAllNotes} handleSearchForm={handleSearchForm} setSearchText={setSearchText} searchText={searchText} />)
          : (<UnauthentcatedNavbar fetchAllNotes={fetchAllNotes} />)}
      </div>
    </nav>
  )
}

export default Navbar