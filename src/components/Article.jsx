import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../src/spinkit.min.css'
import { Comments } from './Comments'
import { LoadingSpinner } from './LoadingSpinner'
import { getArticleById, patchArticleVotes, postArticleComment } from '../utils/APIs'
import { useErrorHandler } from '../utils/errorHandler'

import moment from 'moment'
export const Article = ({ article, setArticle, user, setError }) => {
    let { article_id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [leaveComment, setLeaveComment] = useState(false)
    const [posting, setPosting] = useState(false)
    let [postIndicator, setPostIndicator] = useState(0)
    let [votes, setVotes] = useState(0)
    const [comments, setComments] = useState([])
    let [upVoted, setUpVoted] = useState(false)
    let [downVoted, setDownVoted] = useState(false)
    const navigate = useNavigate()
    const {renderAlert, triggerError} = useErrorHandler()



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

        let voteBody
        if (e.target.innerText === 'UP' && !upVoted) {
            voteBody = { inc_votes: 1 }
            setUpVoted(true)
            setDownVoted(false)
            setVotes(++votes)
        }
        if (e.target.innerText === 'DOWN' && !downVoted) {
            voteBody = { inc_votes: -1 }
            setDownVoted(true)
            setUpVoted(false)
            setVotes(--votes)
        }
        if (voteBody) {
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
        <article className="article max-w-4xl mx-auto bg-bkg-1/40 rounded-lg shadow-md p-6 mb-6 mt-20">
            
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <h3 className="title text-xl font-bold mb-0">{article.title}</h3>
                    <div className=' w-full flex flex-wrap gap-3 mx-auto '>
                        <p className="topic text-accent-1 font-bold m-0">{article.topic}</p>
                        <p className="author text-content mb-2">{article.author}</p>
                    </div>

                    {user.username === article.author && (
                        <div className="post-buttons mb-4 text-end">
                            <button className="bg-accent-1 text-content hover:bg-accent-2 font-bold py-2 px-4 rounded mr-2">
                                Edit
                            </button>
                            <button className="bg-accent-3 text-content hover:bg-accent-1 font-bold py-2 px-4 rounded">
                                Delete
                            </button>
                        </div>
                    )}
                    <img src={article.article_img_url} alt={`image associated with ${article.title}`} className=" w-full mb-4 rounded-lg" />
                    <p className="mb-4 text-content">{article.body}</p>
                    <p className="text-content">{moment(article.created_at).format('DD/MM/YY, h:mm:ss a')}</p>
                    <div className="vote-buttons  items-center text-end mb-4 mt-3">
                        <button className="bg-accent-1 text-content hover:bg-accent-2 font-bold py-2 px-4 rounded mr-2" onClick={vote}>UP</button>
                        <span className="text-xl font-bold">{votes}</span>
                        <button className="bg-accent-1 text-content hover:bg-accent-2 font-bold py-2 px-4 rounded ml-2" onClick={vote}>DOWN</button>
                    </div>
                    <div className="comment-button text-center">
                        <button className="bg-bkg text-content underline underline-offset-4 hover:bg-accent-2 font-bold py-2 px-4 rounded" onClick={comment}>Leave a comment</button>
                    </div>
                    
                    {leaveComment && (
                        <section className="comment-container mt-4 block text-end">
                            {renderAlert()}
                            <textarea name="comment-box" id="comment-box" rows={5} className="w-full bg-bkg rounded-lg p-2 mb-2" placeholder="Write your comment here...">
                            
                            </textarea>

                            <button className="post-comment-button bg-accent-1 text-content hover:bg-accent-2 font-bold py-2 px-4 rounded text-center" onClick={postComment}>Post</button>
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
                    />
                </>
            )}
            
        </article>

    )
}
