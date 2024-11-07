import { Button } from './ui/button'
import { Menu, Moon, NotebookPen, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
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
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { useTheme } from '../contexts/ThemeContext'

function UnauthentcatedNavbar() {
    const { theme, lightTheme, darkTheme } = useTheme()

    return (
        <div>
            <div className='flex justify-between'>
                <Link to="/">
                    <h1 className='text-2xl font-bold flex items-center gap-1 cursor-pointer dark:text-white'><NotebookPen className='text-blue-600 dark:text-blue-400 h-7 w-7' /> <span>NoteWorthy</span></h1></Link>
                <div className='sm:hidden'>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant='ghost' size='icon'>
                                <Menu size={20} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className=" bg-white dark:bg-gray-950 p-4">
                            <SheetHeader>
                                <SheetTitle className="text-left text-lg font-semibold text-gray-900 dark:text-white">
                                    <Link to="/">
                                        <h1 className='text-2xl font-bold flex items-center gap-1 cursor-pointer'><NotebookPen className='text-blue-600 dark:text-blue-400 h-7 w-7' /> <span>NoteWorthy</span></h1></Link>
                                </SheetTitle>
                                <SheetDescription className="sr-only">This is the description of the menu.</SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col space-y-5 mt-8">
                                <Link to='/login' className='transition-none'>
                                    <Button variant="ghost" className="justify-start w-full">Log In</Button>
                                </Link>
                                <Link to='/signup'>
                                    <Button className="justify-start w-full bg-blue-600 text-white hover:bg-blue-700 transition-all">Sign Up</Button>
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

                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className='hidden sm:flex gap-4'>
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
                    <Link to='/login'>
                        <Button variant="ghost" className="justify-start">Log In</Button>
                    </Link>
                    <Link to='/signup'>
                        <Button className="justify-start bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 text-white hover:bg-blue-700 transition-all">Sign Up</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UnauthentcatedNavbar