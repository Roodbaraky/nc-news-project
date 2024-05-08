import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getArticles, getCommentsByUser, getUser } from '../../../APIs'
import './User.css'
import { ArticleCard } from '../ArticleCard/ArticleCard'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import { CommentCard } from '../CommentCard/CommentCard'
import { ProfileCommentCard } from '../ProfileCommentCard/ProfileCommentCard'
export const User = ({ setError }) => {
    const [profileIsLoading, setProfileIsLoading] = useState(true)
    const [articlesAreLoading, setArticlesAreLoading] = useState(true)
    const [commentsAreLoading, setCommentsAreLoading] = useState(true)

    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const [userArticles, setUserArticles] = useState([])
    const [userComments, setUserComments] = useState([])
    const { username } = useParams()
    useEffect(() => {
        getUser(username)
            .then((user) => {
                setUserProfile(user)
                setProfileIsLoading(false)
                getArticles(null, null, null, null, null, user.username)
                    .then((articles) => {
                        setUserArticles(articles)
                        setArticlesAreLoading(false)
                    })
                    .catch((err) => {
                        setError(err)
                        navigate(`/error`)
                    })
                getCommentsByUser(user.username)
                .then((comments)=>{
                    setUserComments(comments)
                    setCommentsAreLoading(false)
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
                    : userArticles.toSorted((a,b)=> b.votes - a.votes).slice(0,4).map((article) => {
                        return <ArticleCard
                            key={article.article_id} article={article} />
                    })}
            </section>
            <h2>Comments</h2>
            <section className='user-comments'>
            {commentsAreLoading
                    ? <LoadingSpinner />
                    : userComments.toSorted((a,b)=> b.votes - a.votes).slice(0,4).map((comment) => {
                        return <ProfileCommentCard
                            key={comment.comment_id} comment={comment} user={userProfile}/>
                    })}
            </section>
        </section>
    )
}
