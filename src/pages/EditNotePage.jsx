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
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function EditNotePage() {

    const categories = [
        { name: "Personal", value: "PERSONAL", icon: User, color: "text-personal dark:text-blue-400" },
        { name: "Business", value: "BUSINESS", icon: Briefcase, color: "text-business dark:text-green-400" },
        { name: "Important", value: "IMPORTANT", icon: Star, color: "text-important dark:text-yellow-400" },
    ]

    const [note, setNote] = useState({})
    const apiBaseURL = import.meta.env.VITE_API_URL
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetcNote = async () => {
            try {
                const response = await axios.get(`${apiBaseURL}/notes/${slug}/`)
                setNote(response.data)
            } catch (error) {
                toast.error('Failed to fetch note!', { autoClose: 4000 });
            }
        }
        fetcNote()
    }, [slug])

    const handleEditNote = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`${apiBaseURL}/notes/${slug}/`, note)
            navigate(`/notes/${slug}`, { state: { showUpdateToast: true } })

        } catch (error) {
            toast.error('Failed to update note!', {
                autoClose: 4000,
            })
            console.log(error.response);
        }

    }

    return (
        <div className='flex justify-center mx-4'>
            <div className='bg-white px-4 py-8 my-8 w-full max-w-xl rounded-lg shadow-md'>
                <h1 className='text-center text-xl font-bold mb-4'>Edit Note</h1>
                <form className='space-y-5' onSubmit={handleEditNote}>
                    <div className='space-y-1'>
                        <label htmlFor="title" className='font-semibold text-sm'>Title</label>
                        <Input type="text" placeholder="Enter note's title" required value={note.title || ''} onChange={(e) => setNote({ ...note, title: e.target.value })} />
                    </div>
                    <div className='space-y-1'>
                        <label htmlFor="content" className='font-semibold text-sm'>Content</label>
                        <Textarea placeholder="Enter note's content" required value={note.body || ''} onChange={(e) => setNote({ ...note, body: e.target.value })} />
                    </div>
                    <div className='space-y-1'>
                        <label htmlFor="category" className='font-semibold text-sm'>Select Category</label>
                        <Select required value={note.category} onValueChange={(value) => setNote({ ...note, category: value })}>
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
                    <Button className='w-full'>Update Note</Button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default EditNotePage