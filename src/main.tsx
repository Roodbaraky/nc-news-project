import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserContext } from './context/context.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContext.Provider value={null}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </UserContext.Provider>
  </React.StrictMode>,
)
