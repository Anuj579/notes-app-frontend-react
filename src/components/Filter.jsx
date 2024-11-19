import { Briefcase, User, Star, FileText, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from './ui/button'
import { useNotes } from "../contexts/NoteContext"

const categories = [
    { name: "All Notes", icon: FileText, color: "text-gray-500" },
    { name: "Personal", icon: User, color: "text-personal" },
    { name: "Business", icon: Briefcase, color: "text-business" },
    { name: "Important", icon: Star, color: "text-important" },
]

function Filter() {
    const { selectedCategory, setSelectedCategory } = useNotes()

    return (
        <div className="my-9 md:container px-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-48 dark:bg-gray-900">
                        {selectedCategory}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='dark:bg-gray-900'>
                    {categories.map((category) => (
                        <DropdownMenuItem key={category.name} onSelect={() => setSelectedCategory(category.name)}>
                            <category.icon className={`mr-2 h-4 w-4 ${category.color}`} />
                            <span>{category.name}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Filter