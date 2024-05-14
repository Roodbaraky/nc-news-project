import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

export const ProfileCommentCard = ({ comment, user }) => {




  return (

    <Link to={`../../articles/${comment.article_id}` } href={`#${comment.comment_id}`}>
      <div className="article max-w-4xl mx-auto bg-bkg-1/40 rounded-lg shadow-md p-6 mb-6 mt-4">
        <h3 className="title text-xl mb-0">{comment.body}</h3>
        <div className="w-full flex justify-between gap-3 mx-auto">
          <div>
            <p className="topic text-accent-1 m-0">{comment.author}</p>
            <p className="author text-content mb-2">{moment(comment.created_at).format('DD/MM/YY, h:mm:ss a')}</p>
          </div>
          <div className="mt-5 text-sm flex flex-col items-center justify-center place-items-center sm:flex-row">
            
            <span className="text-sm">{comment.votes > 0 ? '+' : ''}{comment.votes} votes</span>
            
          </div>
        </div>
      </div>
    </Link>

  )
}


