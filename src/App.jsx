import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Article } from './components/Article';
import { Articles } from './components/Articles';
import { Error } from './components/Error';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { User } from './components/User';
import { Users } from './components/Users';
import { getUsers } from './utils/APIs';


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
      .catch((err)=>{
        
      })
  }, [])


  return (
    <div className='flex flex-col min-h-screen justify-items-center bg-bkg text-content'>
      <Header
        Navbar={
          <Navbar
            user={user}
            setUser={setUser}
            users={users}
            setError={setError}
          />
        }
      />
      <Routes>
        <Route path='/' element={<Home />} />
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
          element={<Users users={users} />}
        />
        <Route
          path='/users/:username'
          element={<User setError={setError} />}
        />
        <Route path='*' element={<Error error={error} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
