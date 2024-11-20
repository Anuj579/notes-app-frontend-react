import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import AddNotePage from "./pages/AddNotePage"
import NoteDetailPage from "./pages/NoteDetailPage";
import EditNotePage from "./pages/EditNotePage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DefaultHomePage from "./pages/DefaultHomePage";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  const { user } = useAuth()

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={user ? <Navigate to='/notes' /> : <DefaultHomePage />} />
        <Route path="/signup" element={user ? <Navigate to='/notes' /> : <SignupPage />} />
        <Route path="/login" element={user ? <Navigate to='/notes' /> : <LoginPage />} />
        <Route path="/forgot-password" element={user ? <Navigate to='/notes' /> : <ForgotPasswordPage />} />
        <Route path="/reset-password/:uid/:token" element={user ? <Navigate to='/notes' /> : <ResetPasswordPage />} />

        <Route path="/notes" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/add-note" element={
          <ProtectedRoute>
            <AddNotePage />
          </ProtectedRoute>
        } />
        <Route path="/notes/:slug" element={
          <ProtectedRoute>
            <NoteDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/notes/:slug/edit" element={
          <ProtectedRoute>
            <EditNotePage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/edit-profile" element={
          <ProtectedRoute>
            <EditProfilePage />
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
