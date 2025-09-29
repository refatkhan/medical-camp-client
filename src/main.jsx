import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routes/Router.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from 'react-router'
import AuthContext from './provider/AuthProvider.jsx'
import ThemeProvider from './provider/ThemeProvider.jsx'
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthContext>
          <RouterProvider router={router} />
        </AuthContext>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);