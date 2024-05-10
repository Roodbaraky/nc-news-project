import { deleteArticleComment } from '../utils/APIs'


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
            {/* <div className="article max-w-4xl mx-auto bg-bkg-1/40 rounded-lg shadow-md p-6 mb-6 mt-20">


                <h3 className="title text-xl  mb-0">{comment.body}</h3>
                <div className="w-full flex justify-between gap-3 mx-auto">
                    <div>
                        <p className="topic text-accent-1  m-0">{comment.author}</p>
                        <p className="author text-content mb-2">{moment(comment.created_at).format('DD/MM/YY, h:mm:ss a')}</p>
                    </div>

                    <div className='mt-5 text-sm flex flex-col items-center justify-center place-items-center  sm:flex-row'>
                        <button className="bg-accent-1 text-content hover:bg-accent-2  py-2 px-4 rounded-full mx-2 " >UP</button>
                        <span className="text-sm ">{comment.votes}</span>
                        <button className="bg-accent-1 text-content hover:bg-accent-2  py-2 px-4 rounded-full w-fit mx-2" >DOWN</button>
                    </div>
                </div>

                {user.username === comment.author && (
                    <div className="post-buttons mt-3 flex place-content-end justify-around">
                        <button className="bg-accent-1 text-content  hover:bg-accent-2 font-bold py-2 px-4 rounded-full ">
                            Edit
                        </button>
                        <button className="bg-accent-3 text-content hover:bg-accent-1 font-bold py-2 px-4 rounded-full" onClick={deleteComment}>
                            Delete
                        </button>
                    </div>
                )}


            </div>
             */}
            <article className="my-2 mx-auto rounded-xl border border-accent-2 bg-accent-1">
                <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                    <a href="#" className="block shrink-0">
                        <img
                            alt=""
                            src={users.filter((user)=>user.username === comment.author)[0].avatar_url}
                            className="size-14 rounded-lg object-cover"
                        />
                    </a>

                    <div>
                        <h3 className="font-medium sm:text-lg">
                            {comment.body}
                        </h3>



                        <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                            <div className="flex items-center gap-1 text-accent-3">
                               
                                

                            <p className="text-xs">{comment.votes}↕️</p>
                            </div>

                            <span className="hidden sm:block" aria-hidden="true">&middot;</span>

                            <p className="hidden sm:block sm:text-xs sm:text-content">
                                Posted by
                                <a href="#" className="font-medium underline hover:text-gray-700"> {comment.author} </a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <strong
                        className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-bkg px-3 py-1.5 text-content"
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
                </div>
            </article>
        </>

    )
}
