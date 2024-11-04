import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import AddNotePage from "./pages/AddNotePage"
import NoteDetailPage from "./pages/NoteDetailPage";
import EditNotePage from "./pages/EditNotePage";
import { useEffect, useState } from "react";
import NotFoundPage from "./pages/NotFoundPage";
import axios from "axios";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DefaultHomePage from "./pages/DefaultHomePage";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user } = useAuth()
  const [notes, setNotes] = useState([])
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchText, setSearchText] = useState("")

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  })

  const fetchAllNotes = async () => {
    if (user) {
      setLoading(true);

      try {
        const token = localStorage.getItem('access_token');
        const response = await api.get('/notes/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotes(response.data);
        setAllNotes(response.data);
        setLoading(false);
        setError("");
        setSearchText("");
      } catch (error) {
        setLoading(false);
        if (error.response?.status === 401) {
          refreshToken()
        } else {
          setError("apiError");
        }
      }
    }
  };

  const refreshToken = async () => {
    try {
      const response = await api.post('/token/refresh/', {
        refresh: localStorage.getItem('refresh_token'),
      });
      localStorage.setItem('access_token', response.data.access);
      return response.data.access;
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  };

  useEffect(() => {
    fetchAllNotes()
  }, [])

  // Search functionality
  const handleSearch = () => {
    setLoading(true)
    setError("")
    setNotes(allNotes);
    if (searchText.length > 2) {
      const token = localStorage.getItem('access_token');
      api.get(`/notes-search/?search=${searchText}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
        <Route index element={user ? <Navigate to='/notes' /> : <DefaultHomePage />} />
        <Route path="/signup" element={user ? <Navigate to='/notes' /> : <SignupPage />} />
        <Route path="/login" element={user ? <Navigate to='/notes' /> : <LoginPage />} />

        <Route path="/notes" element={
          <ProtectedRoute>
            <HomePage notes={notes} loading={loading} error={error} handleResetSearch={handleResetSearch} />
          </ProtectedRoute>
        } />
        <Route path="/add-note" element={
          <ProtectedRoute>
            <AddNotePage />
          </ProtectedRoute>
        } />
        <Route path="/notes/:slug" element={
          <ProtectedRoute>
            <NoteDetailPage removeDeletedNoteFromState={removeDeletedNoteFromState} />
          </ProtectedRoute>
        } />
        <Route path="/notes/:slug/edit" element={
          <ProtectedRoute>
            <EditNotePage />
          </ProtectedRoute>
        } />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
