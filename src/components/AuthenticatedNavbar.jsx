import { Button } from './ui/button'
import { Input } from './ui/input'
import { BookOpen, LogOut, Menu, Moon, NotebookPen, PlusIcon, Search, Settings, Sun, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

function AuthenticatedNavbar({ fetchAllNotes, handleSearchForm, setSearchText, searchText }) {
    const { theme, lightTheme, darkTheme } = useTheme()
    const { userDetails, logout } = useAuth()
    const navigate = useNavigate()

    return (
        <div>
            <div className='flex justify-between items-center md:gap-8'>
                <Link to="/notes" onClick={fetchAllNotes}>
                    <h1 className='text-2xl font-bold flex items-center gap-1 cursor-pointer dark:text-white'><NotebookPen className='text-blue-600 dark:text-blue-400 h-7 w-7' /> <span>NoteWorthy</span></h1></Link>
                <form onSubmit={handleSearchForm} className='w-full'>
                    <div className='hidden md:flex space-x-2 items-center'>
                        <Input type="text" className='bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:border-gray-600 focus:dark:border-gray-500' placeholder="Search notes..." minLength='3' required value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        <Button className='px-3 lg:px-4'><Search size={20} className='lg:mr-2' /><span className='hidden lg:block'>Search</span></Button>
                    </div>
                </form>
                <div className="md:hidden">
                    <Sheet >
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-700 dark:text-gray-300">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-white dark:bg-gray-950 p-5">
                            <SheetHeader>
                                <SheetTitle className="text-left text-lg font-semibold text-gray-900 dark:text-white">
                                    <Link to="/notes" onClick={fetchAllNotes}>
                                        <h1 className='text-2xl font-bold flex items-center gap-1 cursor-pointer'><NotebookPen className='text-blue-600 dark:text-blue-400 h-7 w-7' /> <span>NoteWorthy</span></h1></Link>
                                </SheetTitle>
                                <SheetDescription className="sr-only">This is the description of the menu.</SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col space-y-4 mt-8">
                                <Link to='/add-note'>
                                    <Button className="justify-start w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                                        <PlusIcon className="h-5 w-5 mr-2" />
                                        Add Note
                                    </Button>
                                </Link>
                                <Link to='/notes'>
                                    <Button variant="ghost" className="justify-start w-full text-gray-700 dark:text-gray-300">
                                        <BookOpen className="h-5 w-5 mr-2" />
                                        All Notes
                                    </Button>
                                </Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="text-gray-700 dark:text-gray-300 bg-transparent dark:border-gray-700 justify-start">
                                            {theme === 'light' ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="mr-2 h-4 w-4" />}
                                            {theme === 'light' ? 'Light' : 'Dark'}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className='dark:text-gray-100 dark:bg-gray-900'>
                                        <DropdownMenuItem onClick={lightTheme}>
                                            <Sun className="mr-2 h-4 w-4" />
                                            <span>Light</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={darkTheme}>
                                            <Moon className="mr-2 h-4 w-4" />
                                            <span>Dark</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button onClick={logout} variant="ghost" className="justify-start text-red-600 dark:text-red-400">
                                    <LogOut className="h-5 w-5 mr-2" />
                                    Log out
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className='hidden md:flex gap-4'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="text-gray-700 dark:text-gray-300 w-24 bg-transparent dark:border-gray-700">
                                {theme === 'light' ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="mr-2 h-4 w-4" />}
                                {theme === 'light' ? 'Light' : 'Dark'}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='dark:text-gray-100 dark:bg-gray-900'>
                            <DropdownMenuItem onClick={lightTheme}>
                                <Sun className="mr-2 h-4 w-4" />
                                <span>Light</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={darkTheme}>
                                <Moon className="mr-2 h-4 w-4" />
                                <span>Dark</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link to='/add-note'>
                        <Button className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all">
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Add Note
                        </Button>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback><User size={20} /></AvatarFallback>
                                </Avatar>
                                <span className="hidden lg:inline text-gray-900 dark:text-gray-200">{userDetails.first_name}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52 dark:text-gray-100 dark:bg-gray-900">
                            <DropdownMenuLabel>Welcome, {userDetails.first_name}</DropdownMenuLabel>
                            <DropdownMenuSeparator className='dark:bg-gray-800' />
                            <DropdownMenuItem onClick={() => navigate('/notes')} className='cursor-pointer'>
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    <span>All Notes</span>
                            </DropdownMenuItem >
                            <DropdownMenuItem className='cursor-pointer'>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className='dark:bg-gray-800' />
                            <DropdownMenuItem onClick={logout} className="text-red-600 dark:text-red-400 cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
            {/* search bar for mobile screens */}
            <div className='flex w-full space-x-2 items-center mt-4 md:hidden'>
                <Input className='bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:border-gray-600 focus:dark:border-gray-500' type="text" placeholder="Search notes..." />
                <Button type="submit"><Search size={20} className='mr-1' /> Search</Button>
            </div>
        </div >
    )
}

export default AuthenticatedNavbar