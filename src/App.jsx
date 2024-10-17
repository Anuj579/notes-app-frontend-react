import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import AddNotePage from "./pages/AddNotePage"

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/add-note" element={<AddNotePage />} />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
