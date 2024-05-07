import React, { useEffect, useState } from 'react'
import { CommentCard } from '../CommentCard/CommentCard'
import { getCommentsById } from '../../../APIs'

export const Comments = ({ article_id, postIndicator, comments, setComments, user, setPostIndicator}) => {

   
    useEffect(() => {
        
        getCommentsById(article_id)
            .then((comments) => {
                setComments(comments)
            })
    }, [postIndicator, <CommentCard/>])


    return (
        <>
            <section>
                {comments.map((comment) => {
                    return <CommentCard
                    comment={comment}
                    key={comment.comment_id}
                    user={user}
                    setPostIndicator={setPostIndicator}
                    postIndicator={postIndicator}
                                     
                    /> })}
            </section>
        </>
    )
}
