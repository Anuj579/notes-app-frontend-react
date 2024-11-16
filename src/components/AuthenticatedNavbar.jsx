import { Button } from './ui/button'
import { Input } from './ui/input'
import { BookOpen, LogOut, Menu, Moon, NotebookPen, PlusIcon, Search, Sun, UserCog2 } from 'lucide-react'
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
import { useState } from 'react'

function AuthenticatedNavbar({ handleSearchForm, setSearchText, searchText }) {
    const { theme, lightTheme, darkTheme } = useTheme()
    const { userDetails, profilePic, logout } = useAuth()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const closeSheet = () => {
        setOpen(false)
    }

    const handleLogoClick = () => {
        setSearchText('');
    };

    return (
        <div>
            <div className='flex justify-between items-center md:gap-8'>
                <Link to="/notes" onClick={handleLogoClick}>
                    <h1 className='text-2xl font-bold flex items-center gap-1 cursor-pointer dark:text-white'><NotebookPen className='text-blue-600 dark:text-blue-400 h-7 w-7' /> <span>NoteWorthy</span></h1></Link>
                <form onSubmit={handleSearchForm} className='w-full hidden md:block'>
                    <div className="relative w-full flex">
                        <Input
                            type="text"
                            placeholder="Search notes..."
                            minLength={3}
                            required
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className={`w-full pl-10 pr-16 rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 placeholder-gray-400 focus:border-gray-500' : 'bg-gray-50'} `}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#94a3b8]" />
                        <Button className="absolute right-0 rounded-l-none bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors text-white">
                            Search
                        </Button>
                    </div>
                </form>
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
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={profilePic || ''} />
                                    <AvatarFallback><img src={`https://ui-avatars.com/api/?name=${userDetails.first_name}+${userDetails.last_name}&background=0D8ABC&color=fff&size=100`} alt="user-avatar" /></AvatarFallback>
                                </Avatar>
                                <span className="hidden lg:inline text-gray-900 dark:text-gray-200">{userDetails.first_name || 'Guest'}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52 dark:text-gray-100 dark:bg-gray-900">
                            <DropdownMenuLabel>Welcome, {userDetails.first_name || 'Guest'}</DropdownMenuLabel>
                            <DropdownMenuSeparator className='dark:bg-gray-800' />
                            <DropdownMenuItem onClick={() => navigate('/notes')} className='cursor-pointer'>
                                <BookOpen className="h-4 w-4 mr-2" />
                                <span>All Notes</span>
                            </DropdownMenuItem >
                            <DropdownMenuItem onClick={() => navigate('/profile')} className='cursor-pointer'>
                                <UserCog2 className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className='dark:bg-gray-800' />
                            <DropdownMenuItem onClick={logout} className="text-red-600 dark:text-red-400 cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
                <div className="md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-700 dark:text-gray-300" onClick={() => setOpen(true)}>
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-white dark:bg-gray-950 p-5">
                            <SheetHeader>
                                <SheetTitle className="text-left text-lg font-semibold text-gray-900 dark:text-white">
                                    <Link to="/notes" onClick={handleLogoClick}>
                                        <h1 className='text-2xl font-bold flex items-center gap-1 cursor-pointer'><NotebookPen className='text-blue-600 dark:text-blue-400 h-7 w-7' /> <span>NoteWorthy</span></h1></Link>
                                </SheetTitle>
                                <SheetDescription className="sr-only">This is the description of the menu.</SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col space-y-4 mt-8">
                                <p variant="ghost" className="flex items-center justify-start space-x-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={profilePic || ''} />
                                        <AvatarFallback><img src={`https://ui-avatars.com/api/?name=${userDetails.first_name}+${userDetails.last_name}&background=0D8ABC&color=fff&size=100`} alt="user-avatar" /></AvatarFallback>
                                    </Avatar>
                                    <span className="text-gray-900 dark:text-white text-sm font-medium">Welcome, {userDetails.first_name || 'Guest'}</span>
                                </p>
                                <Link to='/add-note' onClick={closeSheet}>
                                    <Button className="justify-start w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                                        <PlusIcon className="h-5 w-5 mr-2" />
                                        Add Note
                                    </Button>
                                </Link>
                                <Link to='/notes' onClick={closeSheet}>
                                    <Button variant="ghost" className="justify-start w-full text-gray-700 dark:text-gray-300">
                                        <BookOpen className="h-5 w-5 mr-2" />
                                        All Notes
                                    </Button>
                                </Link>
                                <Link to='/profile' onClick={closeSheet}>
                                    <Button variant="ghost" className="justify-start w-full text-gray-700 dark:text-gray-300">
                                        <UserCog2 className="mr-2 h-5 w-5" />
                                        Profile
                                    </Button>
                                </Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="text-gray-700 dark:text-gray-300 bg-transparent dark:border-gray-700 justify-start">
                                            {theme === 'light' ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="mr-2 h-4 w-4" />}
                                            {theme === 'light' ? 'Light' : 'Dark'} Mode
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
            </div>
            {/* search bar for mobile screens */}
            <form onSubmit={handleSearchForm} className='w-full mt-4 md:hidden'>
                <div className="relative w-full flex">
                    <Input
                        type="text"
                        placeholder="Search notes..."
                        minLength={3}
                        required
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className={`w-full pl-10 pr-16 rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 placeholder-gray-400 focus:border-gray-500' : 'bg-gray-50'} `}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#94a3b8]" />
                    <Button className="absolute right-0 rounded-l-none bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors text-white">
                        Search
                    </Button>
                </div>
            </form>
        </div >
    )
}

export default AuthenticatedNavbar