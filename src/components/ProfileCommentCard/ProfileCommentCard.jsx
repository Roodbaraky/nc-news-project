import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

export const ProfileCommentCard = ({comment, user}) => {
   
  
          
    
      return (

        <Link to={`../../articles/${comment.article_id}`}>
            <div className='comment'>
              <p className='comment-body'>{comment.body}</p>
              <div>
                
                <p className='comment-buttons'>{comment.votes>0?'+':''}{comment.votes} votes</p>
              </div>
              <p className='comment-date'>{moment(comment.created_at).format('DD/MM/YY, h:mm:ss a')}</p>
            </div>
        </Link>
      )
    }
    

