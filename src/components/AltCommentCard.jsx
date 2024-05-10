import { deleteArticleComment } from '../utils/APIs'
import moment from 'moment'

export const AltCommentCard = ({ comment, user, users, setPostIndicator, postIndicator, triggerError }) => {

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

    return (
        <>
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

                                <p className="text-m">{comment.votes}</p>
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
