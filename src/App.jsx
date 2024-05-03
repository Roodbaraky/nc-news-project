import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import { Header } from './components/Header/Header'
import { Home } from './components/Home/Home';
import { Articles } from './components/Articles/Articles';

function App() {
  const [articles, setArticles] = useState([])

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home />
          }
        />
        <Route
          path='/articles'
          element={
            <Articles
              articles={articles}
              setArticles={setArticles}
            />
          }
        />

      </Routes>


    </>
  )
}

export default App
