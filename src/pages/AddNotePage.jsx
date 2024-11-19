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
import { AlignLeft, Briefcase, NotebookPen, Plus, Star, Tag, Type, User } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import api from '../services/api'
import { Label } from '../components/ui/label'
import ActionLoader from '../components/ActionLoader'
import { useNotes } from '../contexts/NoteContext'

function AddNotePage() {
  const {fetchAllNotes} = useNotes()
  const [note, setNote] = useState({
    title: "",
    body: "",
    category: ""
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { theme } = useTheme()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.post('/notes/', note)
      const newNoteSlug = response.data.slug;
      fetchAllNotes()
      navigate(`/notes/${newNoteSlug}`, { state: { showAddToast: true } })
      setNote({ title: "", body: "", category: "" })
    } catch (error) {
      toast.error('Failed to add note.', {
        autoClose: 4000,
        theme: theme === "light" ? "light" : "dark"
      });
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { name: "Personal", value: "PERSONAL", icon: User, color: "text-personal dark:text-blue-400" },
    { name: "Business", value: "BUSINESS", icon: Briefcase, color: "text-business dark:text-green-400" },
    { name: "Important", value: "IMPORTANT", icon: Star, color: "text-important dark:text-yellow-400" },
  ]


  return (
    <div className='flex justify-center mx-4 my-16'>
      <Card className='bg-white dark:bg-gray-800 w-full max-w-xl'>
        <CardHeader className='md:p-0 md:pt-8 md:px-8'>
          <CardTitle className='flex items-center text-center dark:text-white text-xl font-bold'>
            <NotebookPen className={`h-6 w-6 mr-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            Create a New Note
          </CardTitle>
        </CardHeader>
        <CardContent className='md:p-8'>
          <fieldset disabled={loading}>
            <form onSubmit={handleSubmit} className='space-y-5'>
              <div className='space-y-1'>
                <Label htmlFor="title" className='flex items-center'>
                  <Type className="h-4 w-4 mr-1" />
                  Title
                </Label>
                <Input id="title" type="text" className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600 placeholder-gray-400 focus:border-gray-500' : 'bg-gray-50'}`} placeholder="Enter note title" required value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} />
              </div>
              <div className='space-y-1'>
                <Label htmlFor="content" className='flex items-center'>
                  <AlignLeft className="h-4 w-4 mr-1" />
                  Content
                </Label>
                <Textarea id="content" className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600 placeholder-gray-400 focus:border-gray-500' : 'bg-gray-50'}`} placeholder="Write your note here..." required value={note.body} onChange={(e) => setNote({ ...note, body: e.target.value })} />
              </div>
              <div className='space-y-1'>
                <Label htmlFor="category" className='flex items-center'>
                  <Tag className="h-4 w-4 mr-1" />
                  Category
                </Label>
                <Select required disabled={loading} onValueChange={(value) => setNote({ ...note, category: value })}>
                  <SelectTrigger id="category" className="w-full dark:bg-gray-900">
                    <SelectValue placeholder="Pick a category" />
                  </SelectTrigger>
                  <SelectContent className='dark:bg-gray-900'>
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
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors text-white">
                <Plus className="h-5 w-5 mr-2" />
                Add Note
              </Button>
            </form>
          </fieldset>
        </CardContent>
      </Card>
      <ActionLoader isOpen={loading} text="Adding your note..." />
      <ToastContainer />
    </div>
  )
}

export default AddNotePage