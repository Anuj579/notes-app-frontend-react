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
import { Briefcase, Star, User } from 'lucide-react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'

function AddNotePage() {
  const [note, setNote] = useState({
    title: "",
    body: "",
    category: ""
  })
  const [disabled, setDisabled] = useState(false)
  const apiBaseURL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setDisabled(true)
    try {
      const response = await axios.post(`${apiBaseURL}/notes/`, note)
      const newNoteSlug = response.data.slug;
      navigate(`/notes/${newNoteSlug}`, { state: { showAddToast: true } })
      setDisabled(false)
      setNote({ title: "", body: "", category: "" })
    } catch (error) {
      toast.error('Failed to add note!', {
        autoClose: 4000,
      });
      setDisabled(false)
    }
  }

  const categories = [
    { name: "Personal", value: "PERSONAL", icon: User, color: "text-personal dark:text-blue-400" },
    { name: "Business", value: "BUSINESS", icon: Briefcase, color: "text-business dark:text-green-400" },
    { name: "Important", value: "IMPORTANT", icon: Star, color: "text-important dark:text-yellow-400" },
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
              <Select required disabled={disabled} onValueChange={(value) => setNote({ ...note, category: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pick a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.name} value={category.value}>
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
      <ToastContainer />
    </div>
  )
}

export default AddNotePage