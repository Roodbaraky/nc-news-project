/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react'
import { CommentCard } from './CommentCard'
import { getCommentsById } from '../utils/APIs'
import { LoadingSpinner } from './LoadingSpinner'
import { useErrorHandler } from '../utils/errorHandler'
import { AltCommentCard } from './AltCommentCard'

export const Comments = ({
    article_id,
    postIndicator,
    comments,
    setComments,
    user,
    setPostIndicator,
    users,
}) => {
    const {triggerError, renderAlert} = useErrorHandler()

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        getCommentsById(article_id)
            .then((comments) => {
                setComments(comments)
                setIsLoading(false)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps, react/jsx-key
    }, [postIndicator, <CommentCard />])


    return (
        <section className='w-fit'>
            {isLoading ? (
                <div className="flex justify-center">
                    <LoadingSpinner />
                </div>
            ) : (<section className=' mx-auto'>
                 {renderAlert()}
                {comments.map((comment) => {
                    return <AltCommentCard
                        comment={comment}
                        key={comment.comment_id}
                        user={user}
                        setPostIndicator={setPostIndicator}
                        postIndicator={postIndicator}
                        triggerError={triggerError}
                        users={users}
                        

                    />
                })}
               
            </section>)}
            
        </section>
    )
}
