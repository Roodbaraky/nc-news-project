import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserContext } from './context/context.ts'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
  const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContext.Provider value={null}>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </BrowserRouter>
    </UserContext.Provider>
  </React.StrictMode>,
)
