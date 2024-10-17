import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { NotebookPen, PlusIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='p-4 md:px-0 bg-white shadow-md sticky top-0'>
      <div className='md:container'>
        <div className='flex justify-between items-center md:space-x-14'>
          <Link to="/">
            <h1 className='text-2xl font-bold flex items-center gap-1 cursor-pointer'><NotebookPen className='text-blue-600 h-7 w-7' /> <span>NoteWorthy</span></h1></Link>
          <div className='hidden md:flex w-full space-x-2 items-center'>
            <Input type="text" placeholder="Search notes..." />
            <Button type="submit">Search</Button>
          </div>
          <Link to="/add-note" className='bg-blue-600 active:bg-blue-700 p-2 rounded-md md:hidden'><PlusIcon className='w-5 h-5 text-white' /></Link>
          <Link to="/add-note" className='bg-blue-600 hover:bg-blue-700 active:bg-blue-600 px-3 transition-all text-white text-sm font-medium py-2 rounded-md hidden md:inline-flex items-center min-w-max'>
            <PlusIcon className='w-5 h-5 mr-2' /> <span>Add Note</span></Link>
        </div>
        <div className='flex w-full space-x-2 items-center mt-4 md:hidden'>
          <Input className='' type="text" placeholder="Search notes..." />
          <Button type="submit">Search</Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar