import React from 'react'
import { Briefcase, User, Star, FileText, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from './ui/button'

const categories = [
    { name: "All Notes", icon: FileText, color: "text-gray-500" },
    { name: "Personal", icon: User, color: "text-blue-500" },
    { name: "Business", icon: Briefcase, color: "text-green-500" },
    { name: "Important", icon: Star, color: "text-yellow-500" },
]

function Filter() {
    const [selectedCategory, setSelectedCategory] = React.useState("All Notes")

    return (
        <div className="my-6 md:container px-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-48">
                        {selectedCategory}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
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