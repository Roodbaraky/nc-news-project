import React, { useEffect, useState } from 'react'
import { CommentCard } from '../CommentCard/CommentCard'
import { getCommentsById } from '../../../APIs'

export const Comments = ({ article_id }) => {

    const [comments, setComments] = useState([])
    useEffect(() => {
        getCommentsById(article_id)
            .then((comments) => {
                setComments(comments)
            })
    }, [article_id])


    return (
        <>
            <section>
                {comments.map((comment) => {
                    return <CommentCard comment={comment} key={comment.comment_id} /> })}
            </section>
        </>
    )
}
