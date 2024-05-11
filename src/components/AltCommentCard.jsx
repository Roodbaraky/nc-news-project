import { deleteArticleComment, postCommentVote } from '../utils/APIs'
import moment from 'moment'
import { useErrorHandler } from '../utils/errorHandler'
import { useState } from 'react'


export const AltCommentCard = ({ comment, user, users, setPostIndicator, postIndicator }) => {
    const { triggerError, renderAlert } = useErrorHandler()
    let [upVoted, setUpVoted] = useState(false)
    let [downVoted, setDownVoted] = useState(false)

    const deleteComment = () => {

        deleteArticleComment(comment.comment_id)
            .then(() => {
                setPostIndicator(++postIndicator)
            })
            .catch(() => {
                triggerError('The comment no longer exists')
            }
            )
    }
    const voteOnComment = (e) => {
        const voteBody = { inc_votes: 0 }

        if (comment.author !== user.username) {
            if (e.target.id === 'upvote' && !upVoted) {
                voteBody.inc_votes = 1
                setUpVoted(true)
                setDownVoted(false)
            }
            if (e.target.id === 'upvote' && upVoted) {
                voteBody.inc_votes = -1
                setUpVoted(false)
            }
            if (e.target.id === 'downvote' && downVoted) {
                voteBody.inc_votes = 1
                setDownVoted(false)
            }
            if (e.target.id === 'downvote' && !downVoted) {
                voteBody.inc_votes = -1
                setDownVoted(true)
                setUpVoted(false)
            }

            if (voteBody.inc_votes !== 0) {
                postCommentVote(comment.comment_id, voteBody)
                    .then(() => { })
                    .catch(() => {
                        setDownVoted(false)
                        setUpVoted(false)
                        triggerError('Failed to cast vote')
                    })
            }
        }else{
            triggerError('You can\'t vote on your own comment!')
        }

    }

    return (
        <>
            {renderAlert()}
            <article className="my-2 mx-auto rounded-xl border border-accent-2 bg-accent-1">
                <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                    <a href="#" className="block shrink-0">
                        <img
                            alt=""
                            src={users.filter((user) => user.username === comment.author)[0].avatar_url}
                            className="size-14 rounded-lg object-cover"
                        />
                    </a>

                    <div>
                        <h3 className="font-medium sm:text-lg">
                            {comment.body}
                        </h3>

                        <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                            <div className="flex items-center gap-1 text-accent-3">
                                <button id='upvote' onClick={voteOnComment} className="bg-accent-1 text-content hover:bg-accent-2  py-2 px-4 rounded-full mx-2 " >UP</button>
                                <p className="text-m">{comment.votes}</p>
                                <button id='downvote' onClick={voteOnComment} className="bg-accent-1 text-content hover:bg-accent-2  py-2 px-4 rounded-full w-fit mx-2" >DOWN</button>

                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-xs text-content flex gap-2 ms-5 flex-wrap">
                        Posted by
                        <a href="#" className="font-medium underline hover:text-gray-700"> {comment.author}</a>{moment(comment.created_at).format('DD/MM/YY, h:mm:ss a')}
                    </p>
                    {user.username === comment.author && <div id='delete-button' className="flex justify-end">
                        <strong
                            className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-bkg px-3 py-1.5 text-content"
                            onClick={deleteComment}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                />
                            </svg>

                            <span className="text-[10px] font-medium sm:text-xs">Delete</span>
                        </strong>
                    </div>}
                </div>
            </article>
        </>

    )
}
