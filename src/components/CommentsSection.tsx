import  { useEffect } from 'react'
import { CommentModal } from './CommentModal'
import { CommentCard } from './CommentCard'
import { CommentsSectionProps } from '../types/Comments'

export const CommentsSection = ({article_id, comments, postIndicator, setPostIndicator}:CommentsSectionProps):JSX.Element => {
useEffect(() => {

},[postIndicator])
    return (
    <section id="comments-section" className="mt-12 flex flex-col items-center">
                        <CommentModal article_id={article_id} setPostIndicator = {setPostIndicator}/>
                {comments.map((comment) => <CommentCard key={comment?.comment_id} comment={comment} setPostIndicator={setPostIndicator}/>)}
            </section>
  )
}
