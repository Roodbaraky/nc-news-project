import { FocusEvent, MouseEvent, useContext, useEffect, useState } from 'react'
import { deleteArticleComment, getUser, postCommentVote } from '../services/api'
import { ErrorContext, UserContext } from '../context/context'
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi'
import { CommentCardProps } from '../types/Comments'
import { convertToTimeAgo } from '../utils/timeAgo'

export const CommentCard = ({ comment }: CommentCardProps): JSX.Element => {
    const { user } = useContext(UserContext) ?? { user: null }
    const { setError } = useContext(ErrorContext) ?? { setError: () => { } }
    const [authorImgUrl, setAuthorImgUrl] = useState('')
    const [deleting, setDeleting] = useState(false)
    const [upVoted, setUpVoted] = useState(false)
    const [downVoted, setDownVoted] = useState(false)
    const [votes, setVotes] = useState(comment.votes)
    const timeAgo = convertToTimeAgo(comment.created_at)


    async function sendVotes() {
        if (votes !== comment.votes) {
            const voteBody = { inc_votes: votes - comment.votes }
            try {
                await postCommentVote(comment.comment_id, voteBody)
            } catch (err) {
                setDownVoted(false)
                setUpVoted(false)
                setError({ message: 'Failed to cast vote' })

            }
        }
    }
    const deleteComment = async () => {
        if (user?.username === comment.author) {
            setDeleting(true)
            if (!deleting) {
                try {
                    await deleteArticleComment(comment.comment_id)
                    setDeleting(false)
                } catch (err) {
                    setError({ message: 'The comment no longer exists' })
                }
            }
        }
    }


    const voteOnComment = (e:MouseEvent) => {
        if (!user) {
            setError({ message: 'You need to be logged in to vote' })

        }
        else if (comment.author !== user.username) {
            const target = e.target as HTMLButtonElement
            if (target.id === 'upvote') {
                if (!upVoted && !downVoted) {
                    setVotes(votes + 1)
                    setUpVoted(true)
                }
                if (upVoted) {
                    setUpVoted(false)
                    setVotes(votes - 1)
                }
                if (downVoted) {
                    setUpVoted(true)
                    setDownVoted(false)
                    setVotes(votes + 2)

                }
            }
            if (target.id === 'downvote') {
                if (!downVoted && !upVoted) {
                    setVotes(votes - 1)
                    setDownVoted(true)
                }
                if (downVoted) {
                    setVotes(votes + 1)
                    setDownVoted(false)
                }
                if (upVoted) {
                    setVotes(votes - 2)
                    setDownVoted(true)
                    setUpVoted(false)
                }
            }

        } else {
            setError({ message: 'You cannot vote on your own comment' })
        }

    }

    useEffect(() => {
        async function fetchAuthorImg(author: string) {
            try {
                const fetchedAuthorImg = await getUser(author)
                setAuthorImgUrl(fetchedAuthorImg.avatar_url)
            } catch (err) {
                setError(err as Error)
                // setError({ message: 'Failed to fetch author image' })
            }
        }
        fetchAuthorImg(comment.author)
    }, [comment.author, setError])

    const handleBlur = (e: FocusEvent) => {
        const currentTarget = e.currentTarget;
        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                sendVotes()
            }
        }, 0);
    };



    return (
        <article id={`comment-container ${comment.comment_id}`} onBlur={handleBlur} className='bg-base-200 border-l max-w-4xl w-5/6 my-4 p-4 flex flex-col'>
            <div className='flex gap-2'>
                <img className='w-10 h-10 object-cover rounded-full' src={authorImgUrl} alt="" />
                <p>{comment.author}</p>
                <p>{timeAgo}</p>
            </div>
            <p className='mx-12 my-2 p-2'>{comment.body}</p>
            <div id='buttons' className='flex flex-wrap self-end'>
                <button id='upvote' onClick={voteOnComment} className='btn'><BiSolidUpArrow className="pointer-events-none" /></button>
                <p>{votes}</p>
                <button id='downvote' onClick={voteOnComment} className='btn'><BiSolidDownArrow className="pointer-events-none" /></button>
                <button className='btn'>Reply</button>
                <button className='btn'>Share</button>
                {comment.author === user?.username &&
                    <div className='flex'>
                        <button className='btn'>Edit</button>
                        <button className='btn' onClick={deleteComment}>Delete</button>
                    </div>
                }

            </div>
        </article>
    )
}
