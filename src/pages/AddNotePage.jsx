import { useState } from 'react'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Button } from '../components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { AlertCircle, Briefcase, CheckCircle, Star, User } from 'lucide-react'
import axios from 'axios'
import { useToast } from '../components/hooks/use-toast'
import { Toaster } from '../components/ui/toaster'

function AddNotePage() {
  const [note, setNote] = useState({
    title: "",
    body: "",
    category: ""
  })
  const [disabled, setDisabled] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setDisabled(true)
    try {
      const response = await axios.post('http://127.0.0.1:8000/notes/', note)
      toast({
        variant: 'success',
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>Note Added Successfully</span>
          </div>
        ),
        description: (
          <p className='ml-7'>Your note has been added successfully.</p>
        ),
      })
      e.target.reset();
      setDisabled(false)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: (
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>Failed to add note</span>
          </div>
        ),
        description: (
          <p className='ml-7'>There was an error saving your note. Please try again.</p>
        ),
      })
      setDisabled(false)
      console.log(error.message);
    }
  }

  const categories = [
    { name: "Personal", icon: User, color: "text-personal dark:text-blue-400" },
    { name: "Business", icon: Briefcase, color: "text-business dark:text-green-400" },
    { name: "Important", icon: Star, color: "text-important dark:text-yellow-400" },
  ]

  return (
    <div className='flex justify-center mx-4'>
      <div className='bg-white px-4 py-8 my-8 w-full max-w-xl rounded-lg shadow-md'>
        <h1 className='text-center text-xl font-bold mb-4'>Add New Note</h1>
        <fieldset disabled={disabled}>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='space-y-1'>
              <label htmlFor="title" className='font-semibold text-sm'>Title</label>
              <Input type="text" placeholder="Enter note's title" required value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} />
            </div>
            <div className='space-y-1'>
              <label htmlFor="content" className='font-semibold text-sm'>Content</label>
              <Textarea placeholder="Enter note's content" required value={note.body} onChange={(e) => setNote({ ...note, body: e.target.value })} />
            </div>
            <div className='space-y-1'>
              <label htmlFor="category" className='font-semibold text-sm'>Select Category</label>
              <Select required disabled={disabled} onValueChange={(value) => setNote({ ...note, category: value.toUpperCase() })}>
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
        </fieldset>
      </div>
      <Toaster />
    </div>
  )
}

export default AddNotePage