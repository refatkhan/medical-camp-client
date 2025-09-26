import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routes/Router.jsx'
import { RouterProvider } from 'react-router'
import AuthContext from './provider/AuthProvider.jsx'
import ThemeProvider from './provider/ThemeProvider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>
    </ThemeProvider>
  </StrictMode>,
)
