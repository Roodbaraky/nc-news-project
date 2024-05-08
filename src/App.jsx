import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import { Header } from './components/Header/Header'
import { Home } from './components/Home/Home';
import { Articles } from './components/Articles/Articles';
import { Article } from './components/Article/Article';
import { Footer } from './components/Footer/Footer';
import { Navbar } from './components/Navbar/Navbar';
import { Error } from './components/Error/Error';


function App() {
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState({})
  const [user, setUser] = useState({})
  const [error, setError] = useState({})



  return (
    <>
      <Header
        Navbar={<Navbar
          user={user}
          setUser={setUser}
        />} />
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
              setArticle={setArticle}
              setError={setError}
            />
          }

        />
        <Route
          path='/articles/:article_id'
          element={
            <Article
              article={article}
              setArticle={setArticle}
              user={user}
              setError={setError}
            />
          }
        />


        <Route
          path='*'
          element={<Error
            error={error} />} />


      </Routes>
      <Footer />


    </>
  )
}

export default App
