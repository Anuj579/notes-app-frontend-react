import React from 'react'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Button } from '../components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Briefcase, Star, User } from 'lucide-react'

function AddNotePage() {

  const categories = [
    { name: "Personal", icon: User, color: "text-blue-500 dark:text-blue-400" },
    { name: "Business", icon: Briefcase, color: "text-green-500 dark:text-green-400" },
    { name: "Important", icon: Star, color: "text-yellow-500 dark:text-yellow-400" },
  ]

  return (
    <div className='flex justify-center mx-4'>
      <div className='bg-white px-4 py-8 my-8 w-full max-w-xl rounded-lg shadow-md'>
        <h1 className='text-center text-xl font-bold mb-4'>Add New Note</h1>
        <form className='space-y-5'>
          <div className='space-y-1'>
            <label htmlFor="title" className='font-semibold text-sm'>Title</label>
            <Input type="text" placeholder="Enter note's title" required />
          </div>
          <div className='space-y-1'>
            <label htmlFor="content" className='font-semibold text-sm'>Content</label>
            <Textarea placeholder="Enter note's content" required />
          </div>
          <div className='space-y-1'>
            <label htmlFor="category" className='font-semibold text-sm'>Select Category</label>
            <Select required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pick a category" />
              </SelectTrigger>
              <SelectContent>
              {categories.map((category) => (
                    <SelectItem key={category.name} value={category.name}>
                      <div className="flex items-center">
                        <category.icon className={`mr-2 h-4 w-4 ${category.color}`} />
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <Button className='w-full'>Add Note</Button>
        </form>
      </div>
    </div>
  )
}

export default AddNotePage