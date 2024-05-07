import React from 'react'
import './CommentCard.css'
import moment from 'moment'

export const CommentCard = ({comment}) => {
  return (
    <div className='comment'>
        <p className='comment-body'>{comment.body}</p>
       <div>
            <p className='comment-author'>{comment.author}</p>
            <p className='comment-buttons'><button>UP</button>{comment.votes}<button>DOWN</button></p>
       </div>
        <p className='comment-date'>{moment(comment.created_at).format('DD/MM/YY, h:mm:ss a')}</p>

    </div>
  )
}
