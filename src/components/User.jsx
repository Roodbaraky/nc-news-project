import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getArticles, getCommentsByUser, getUser } from '../utils/APIs'
import { ArticleCard } from './ArticleCard'
import { LoadingSpinner } from './LoadingSpinner'
import { ProfileCommentCard } from './ProfileCommentCard'

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
                    .then((comments) => {
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
        <section className='mt-28 user-profile-container bg-bkg-1/90 rounded-lg shadow-md p-4 flex flex-col place-items-center'>
            {profileIsLoading ? (
                <LoadingSpinner />
            ) : (
                <section className='user-details flex flex-col place-items-center place-content-center center'>
                    <p className='text-2xl text-content font-bold'>{userProfile.username}</p>
                    <p className='text-xl text-content'>{userProfile.name}</p>
                    <img className='w-32 h-32 rounded-full' src={userProfile.avatar_url} alt='' />
                </section>
            )}

            <h2 className='text-content text-5xl font-bold my-6 '>Articles</h2>

            <section className='place-content-center user-articles flex flex-wrap mx-auto'>
                {articlesAreLoading ? (
                    <LoadingSpinner />
                ) : (
                    userArticles.sort((a, b) => b.votes - a.votes).slice(0, 4).map((article) => (
                        <ArticleCard key={article.article_id} article={article} />
                    ))
                )}
            </section>
            <h2 className='text-content font-bold mt-10 text-3xl'>Comments</h2>
            <section className='user-comments'>
                {commentsAreLoading ? (
                    <LoadingSpinner />
                ) : (
                    userComments.sort((a, b) => b.votes - a.votes).slice(0, 4).map((comment) => (
                        <ProfileCommentCard key={comment.comment_id} comment={comment} user={userProfile} />
                    ))
                )}
            </section>
        </section>

    )
}
