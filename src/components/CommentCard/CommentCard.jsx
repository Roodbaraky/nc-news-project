import React from 'react'
import './CommentCard.css'
import moment from 'moment'
import { deleteArticleComment } from '../../../APIs'


export const CommentCard = ({ comment, user, setPostIndicator, postIndicator }) => {
  const deleteComment = () => {

    deleteArticleComment(comment.comment_id)
      .then(() => {
      setPostIndicator(++postIndicator)
      })
      .catch(()=>{
        alert('The comment no longer exists')}
      )
  }

  return (
    <div className='comment'>
      <p className='comment-body'>{comment.body}</p>
      <div>
        <p className='comment-author'>{comment.author}</p>
        <p className='comment-buttons'><button>UP</button>{comment.votes}<button>DOWN</button></p>
      </div>
      <p className='comment-date'>{moment(comment.created_at).format('DD/MM/YY, h:mm:ss a')}</p>
      {user.username === comment.author && <div className='post-buttons'><button>Edit</button><button onClick={deleteComment}>Delete</button></div>}

    </div>
  )
}
