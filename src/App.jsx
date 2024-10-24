import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import AddNotePage from "./pages/AddNotePage"
import NoteDetailPage from "./pages/NoteDetailPage";
import EditNotePage from "./pages/EditNotePage";
import { useEffect, useState } from "react";
import NotFoundPage from "./pages/NotFoundPage";
import axios from "axios";

function App() {
  const apiBaseURL = import.meta.env.VITE_API_URL
  const [notes, setNotes] = useState([])
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchText, setSearchText] = useState("")

  const fetchAllNotes = () => {
    setLoading(true)
    axios.get(`${apiBaseURL}/notes`)
      .then(data => {
        setNotes(data.data)
        setAllNotes(data.data)
        setLoading(false)
        setError("")
        setSearchText("")
      })
      .catch(error => {
        setError("apiError")
      })
  }

  useEffect(() => {
    fetchAllNotes()
  }, [])

  // Search functionality
  const handleSearch = () => {
    setLoading(true)
    setError("")
    setNotes(allNotes);
    if (searchText.length > 2) {
      axios.get(`${apiBaseURL}/notes-search/?search=${searchText}`)
        .then(response => {
          setNotes(response.data)
          setLoading(false)
          if (response.status === 204) {
            setError("noteNotFoundError");
          }
        })
        .catch(error => {
          console.log(error)
          setError("apiError");
        });
    }
  };

  // This function is for reseting notes when the search bar text length is smaller than 3
  const resetNotes = () => {
    if (searchText.length < 3) {
      setError("")
      setNotes(allNotes);
    }
  }

  // This function is for removing delted note from notes after a note is deleted
  const removeDeletedNoteFromState = (slug) => {
    setNotes(notes.filter(note => note.slug !== slug));
  }

  // This function is for the reset search button in error component when No Notes found error occur
  const handleResetSearch = () => {
    setSearchText("");
    setNotes(allNotes);
    setError("");
  };

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout searchText={searchText} setSearchText={setSearchText} handleSearch={handleSearch} resetNotes={resetNotes} fetchAllNotes={fetchAllNotes} />}>
        <Route index element={<HomePage notes={notes} loading={loading} error={error} handleResetSearch={handleResetSearch} />} />
        <Route path="/add-note" element={<AddNotePage />} />
        <Route path="/notes/:slug" element={<NoteDetailPage removeDeletedNoteFromState={removeDeletedNoteFromState} />} />
        <Route path="/notes/:slug/edit" element={<EditNotePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
