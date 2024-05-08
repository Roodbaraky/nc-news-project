import { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import { Header } from './components/Header/Header'
import { Home } from './components/Home/Home';
import { Articles } from './components/Articles/Articles';
import { Article } from './components/Article/Article';
import { Footer } from './components/Footer/Footer';
import { Navbar } from './components/Navbar/Navbar';
import { Error } from './components/Error/Error';
import { getUsers } from '../APIs';
import { Users } from './components/Users/Users';
import { User } from './components/User/User';


function App() {
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState({})
  const [user, setUser] = useState({})
  const [error, setError] = useState({})
  const [users, setUsers] = useState([])


  useEffect(() => {
    getUsers()
      .then((users) => {
        setUsers(users)
      })
  }, [])


  return (
    <>
      <Header
        Navbar={<Navbar
          user={user}
          setUser={setUser}
          users={users}
          setError={setError}


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
          path='/users'
          element={
            <Users
              users={users}
              
            />}
        />

        <Route
          path='/users/:username'
          element={
            <User 
            setError={setError}/>
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
