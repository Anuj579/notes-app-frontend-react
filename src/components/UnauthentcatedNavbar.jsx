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

function UnauthentcatedNavbar({ fetchAllNotes }) {
    return (
        <div>
            <div className='flex justify-between'>
                <Link to="/" onClick={fetchAllNotes}>
                    <h1 className='text-2xl font-bold flex items-center gap-1 cursor-pointer'><NotebookPen className='text-blue-600 h-7 w-7' /> <span>NoteWorthy</span></h1></Link>
                <div className='sm:hidden'>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant='ghost' size='icon'>
                                <Menu size={20} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className=" bg-white dark:bg-gray-900 p-4">
                            <SheetHeader>
                                <SheetTitle className="text-left text-lg font-semibold text-gray-900 dark:text-white">
                                    <Link to="/" onClick={fetchAllNotes}>
                                        <h1 className='text-2xl font-bold flex items-center gap-1 cursor-pointer'><NotebookPen className='text-blue-600 h-7 w-7' /> <span>NoteWorthy</span></h1></Link>
                                </SheetTitle>
                                <SheetDescription className="sr-only">This is the description of the menu.</SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col space-y-4 mt-8">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="text-gray-700 dark:text-gray-300 justify-start">
                                            <Sun className="h-5 w-5 mr-2" />
                                            Light Mode
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Sun className="mr-2 h-4 w-4" />
                                            <span>Light</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem >
                                            <Moon className="mr-2 h-4 w-4" />
                                            <span>Dark</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Link to='/login'>
                                    <Button variant="ghost" className="justify-start w-full">Log In</Button>
                                </Link>
                                <Link to='/signup'>
                                    <Button className="justify-start w-full bg-blue-600 text-white hover:bg-blue-700 transition-all">Sign Up</Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className='hidden sm:flex gap-4'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="text-gray-700 dark:text-gray-300 justify-start">
                                <Sun className="h-5 w-5 mr-2" />
                                Light
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Sun className="mr-2 h-4 w-4" />
                                <span>Light</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem >
                                <Moon className="mr-2 h-4 w-4" />
                                <span>Dark</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link to='/login'>
                        <Button variant="ghost" className="justify-start">Log In</Button>
                    </Link>
                    <Link to='/signup'>
                        <Button className="justify-start bg-blue-600 text-white hover:bg-blue-700 transition-all">Sign Up</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UnauthentcatedNavbar