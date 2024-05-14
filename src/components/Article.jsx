import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../src/spinkit.min.css'
import { Comments } from './Comments'
import { LoadingSpinner } from './LoadingSpinner'
import { getArticleById, patchArticleVotes, postArticleComment } from '../utils/APIs'
import { useErrorHandler } from '../utils/errorHandler'

import moment from 'moment'
export const Article = ({ article, setArticle, user, setError, users }) => {
    let { article_id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [leaveComment, setLeaveComment] = useState(false)
    const [posting, setPosting] = useState(false)
    let [postIndicator, setPostIndicator] = useState(0)
    let [votes, setVotes] = useState(0)
    const [comments, setComments] = useState([])
    const [upVoted, setUpVoted] = useState(false)
    const [downVoted, setDownVoted] = useState(false)
    const navigate = useNavigate()
    const { renderAlert, triggerError } = useErrorHandler()



    useEffect(() => {
        getArticleById(article_id)
            .then((article) => {

                setArticle(article)
                setVotes(article.votes)
                setIsLoading(false)
            })
            .catch((err) => {
                setError(err)
                navigate(`/error`)
            })
    }, [postIndicator])


    const vote = (e) => {
        const voteBody = { inc_votes: 0 }

        if (article.author !== user.username) {
            if (e.target.id === 'upvote') {
                if (!upVoted && !downVoted) {
                    voteBody.inc_votes = 1
                    setVotes(++votes)
                    setUpVoted(true)
                }
                if (upVoted) {
                    setUpVoted(false)
                    setVotes(--votes)
                    voteBody.inc_votes = -1
                }
                if (downVoted) {
                    setUpVoted(true)
                    setDownVoted(false)
                    setVotes(votes + 2)
                    voteBody.inc_votes = 2
                }
            }
            if (e.target.id === 'downvote') {
                if (!downVoted && !upVoted) {
                    voteBody.inc_votes = -1
                    setVotes(--votes)
                    setDownVoted(true)
                }
                if (downVoted) {
                    voteBody.inc_votes = 1
                    setVotes(++votes)
                    setDownVoted(false)
                }
                if (upVoted) {
                    voteBody.inc_votes = -2
                    setVotes(votes - 2)
                    setDownVoted(true)
                    setUpVoted(false)
                }
            }

        }
        if (voteBody.inc_votes !== 0) {
            patchArticleVotes(article_id, voteBody)
                .then(() => { })
                .catch(() => {
                    triggerError('Error contacting the server')
                })
        }
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
            if (commentBody.body) {
                postArticleComment(article_id, commentBody).then(() => {
                    setPostIndicator(++postIndicator)
                    setPosting(false)

                })

                setLeaveComment(!leaveComment)
                setPosting(true)

            }
            else {
                if (commentBody.username) {
                    triggerError('You can\'t post an empty comment')
                } else {
                    triggerError('You must be signed in to post a comment')
                }

            }
        }
    }

    return (
        <section id='article-container' className='h-full min-h-screen'>
            {isLoading
                ? <LoadingSpinner />
                : <article id='article' className="flex flex-col items-center w-4/5 mx-auto bg-bkg-1/40 rounded-lg shadow-md  mb-6 mt-32 h-full">
                    <h3 id='article-title' className="self-start title text-2xl sm:text-3xl font-bold mb-0">{article.title}
                    </h3>

                    <div id='author-and-options' className='self-start flex gap-2'>
                        <p id='article-topic' className=" text-accent-1 font-bold m-0">
                            {article.topic}
                        </p>
                        <p id='article-author' className="text-content mb-2">
                            {article.author}
                        </p>
                    </div>


                    {user.username === article.author &&
                        <div id='article-buttons' className="mb-2 self-end">
                            <button id='edit-button' className="bg-accent-1 text-content hover:bg-accent-2 font-bold py-2 px-4 rounded-full mr-2">
                                Edit
                            </button>
                            <button id='delete-button' className="bg-accent-3 text-content hover:bg-accent-1 font-bold py-2 px-4 rounded-full">
                                Delete
                            </button>
                        </div>
                    }
                    <img id='article-img' src={article.article_img_url} alt={`image associated with ${article.title}`} className=" w-full mb-4 rounded-lg" />
                    <p id='article-body' className="mb-4 text-content">
                        {article.body}
                    </p>
                    <p id='article-date' className="self-end text-content">
                        {moment(article.created_at).format('DD/MM/YY, h:mm:ss a')}
                    </p>
                    <div id='vote-buttons' className="self-end text-end mb-4 mt-3">
                        <button id='upvote' className="bg-accent-1 text-content hover:bg-accent-2 font-bold py-2 px-4 rounded-full mr-2" onClick={vote}>
                            UP
                        </button>
                        <span id='votes' className="text-xl ">
                            {votes}
                        </span>
                        <button id='downvote' className="bg-accent-1 text-content hover:bg-accent-2 font-bold py-2 px-4 rounded-full ml-2" onClick={vote}>
                            DOWN
                        </button>
                    </div>
                    <div id='comment-button' className="text-center">
                        <button className="bg-bkg text-content underline underline-offset-4 hover:no-underline font-bold py-2 px-4 rounded" onClick={comment}>
                            Leave a comment
                        </button>
                    </div>

                    {leaveComment && (
                        <section id='comment-container' className=" mt-4 block text-end">
                            {renderAlert()}
                            <textarea name="comment-box" id="comment-box" rows={5} className="w-full bg-bkg rounded-lg p-2 mb-2" placeholder="Write your comment here...">
                            </textarea>

                            <button id='post-comment-button' className="bg-accent-1 text-content hover:bg-accent-2 font-bold py-2 px-4 rounded-full text-center" onClick={postComment}>
                                Post
                            </button>
                        </section>
                    )}
                    {!leaveComment && posting && <LoadingSpinner />}
                    <Comments
                        article_id={article_id}
                        comments={comments}
                        setComments={setComments}
                        setPostIndicator={setPostIndicator}
                        article={article}
                        user={user}
                        users={users}
                    />
                </article >
            }
        </section>
    )
}
