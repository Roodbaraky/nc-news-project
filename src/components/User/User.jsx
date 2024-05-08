import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getArticles, getUser } from '../../../APIs'
import './User.css'
import { ArticleCard } from '../ArticleCard/ArticleCard'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
export const User = () => {
    const [profileIsLoading, setProfileIsLoading] = useState(true)
    const [articlesAreLoading, setArticlesAreLoading] = useState(true)

    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const [userArticles, setUserArticles] = useState([])
    const { username } = useParams()
    useEffect(() => {
        getUser(username)
            .then((user) => {
                setUserProfile(user)
                setProfileIsLoading(false)
                getArticles(null, null, null, user.username)
                    .then((articles) => {
                        setUserArticles(articles)
                        setArticlesAreLoading(false)
                    })
                    .catch((err) => {
                        setError(err)
                        navigate(`/error`)
                    })
            })
            .catch((err) => {
                setError(err)
                navigate(`/error`)
            })
    }, [username])
    return (

        <section className='user-profile-container'>
            {profileIsLoading
                ? <LoadingSpinner />
                : <section className='user-details'>
                    <p className='user-username'>{userProfile.username}</p>
                    <p className='user-name'>{userProfile.name}</p>
                    <img className='user-profile-img' src={userProfile.avatar_url} alt="" />
                </section>}
            <h2>Articles</h2>
            <section className='user-articles'>
                {articlesAreLoading
                    ? <LoadingSpinner />
                    : userArticles.map((article) => {
                        return <ArticleCard
                            key={article.article_id} article={article} />
                    })}
            </section>
            <h2>Comments</h2>
            <section className='user-comments'>

            </section>
        </section>
    )
}
