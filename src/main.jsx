import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { NoteProvider } from './contexts/NoteContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <NoteProvider>
          <App />
        </NoteProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
