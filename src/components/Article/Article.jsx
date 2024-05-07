import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArticleById, patchArticleVotes, postArticleComment } from '../../../APIs'
import './Article.css'
import '../../../src/spinkit.min.css'
import { Comments } from '../Comments/Comments'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import moment from 'moment'
export const Article = ({ article, setArticle, user }) => {
    let { article_id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [leaveComment, setLeaveComment] = useState(false)
    const [posting, setPosting] = useState(false)
    let [postIndicator, setPostIndicator] = useState(0)
    let [votes, setVotes] = useState(0)
    const [comments, setComments] = useState([])

    useEffect(() => {
        getArticleById(article_id)
            .then((article) => {
                setIsLoading(false)
                setArticle(article)
                setVotes(article.votes)

            })
    }, [postIndicator])


    const vote = (e) => {
        let voteBody
        if (e.target.innerText === 'UP') {
            voteBody = { inc_votes: 1 }
            setVotes(++votes)
        }
        if (e.target.innerText === 'DOWN') {
            voteBody = { inc_votes: -1 }
            setVotes(--votes)
        }
        patchArticleVotes(article_id, voteBody)
            .then(() => { })
            .catch(() => {
                alert('Error contacting the server')
            })
    }

    const comment = (e) => {
        setLeaveComment(!leaveComment)

    }
    const postComment = (e) => {
        if (!posting) {
            const commentBody = {
                username: user.username || 'jessjelly',
                body: e.target.parentElement.children[0].value
            }
            if (commentBody.body.length) {
                postArticleComment(article_id, commentBody).then(() => {
                    setPostIndicator(++postIndicator)
                    setPosting(false)

                })

                setLeaveComment(!leaveComment)
                setPosting(true)

            }
        }
    }

    return (
        <article className='article'>
            {isLoading
                ? <LoadingSpinner />
                : <>
                    <p className='topic'>{article.topic}</p>
                    <p className='author'>{article.author}</p>
                    <h3 className='title'>{article.title}</h3>
                    {user.username === article.author && <div className='post-buttons'><button>Edit</button><button>Delete</button></div>}
                    <img src={article.article_img_url} alt={`image associated with ${article.title}`} />
                    <p>{article.body}</p>
                    <p>{moment(article.created_at).format('DD/MM/YY, h:mm:ss a')}</p>
                    <div className='vote-buttons'><button onClick={vote}>UP</button>{votes}<button onClick={vote}>DOWN</button></div>
                    <div className='comment-button'><button onClick={comment}>Comment</button></div>
                    {leaveComment && <>
                        <section className='comment-container'>
                            <textarea name="comment-box" id="comment-box" rows={5}></textarea>


                            <button className='post-comment-button' onClick={postComment}>Post</button>
                        </section>
                    </>}
                    {!leaveComment && posting && <LoadingSpinner />}
                    <Comments
                        article_id={article_id}
                        comments={comments}
                        setComments={setComments}
                        postIndicator={postIndicator} />
                </>}
        </article>
    )
}
