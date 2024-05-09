import moment from 'moment'
import React from 'react'
import { deleteArticleComment } from '../utils/APIs'

export const CommentCard = ({ comment, user, setPostIndicator, postIndicator }) => {
  const deleteComment = () => {

    deleteArticleComment(comment.comment_id)
      .then(() => {
        setPostIndicator(++postIndicator)
      })
      .catch(() => {
        alert('The comment no longer exists')
      }
      )
  }

  return (
    <div className="article max-w-4xl mx-auto bg-bkg-1/40 rounded-lg shadow-md p-6 mb-6 mt-20">


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
        <div className="post-buttons mb-4 text-end">
          <button className="bg-accent-1 text-content  hover:bg-accent-2 font-bold py-2 px-4 rounded mr-2">
            Edit
          </button>
          <button className="bg-accent-3 text-content hover:bg-accent-1 font-bold py-2 px-4 rounded" onClick={deleteComment}>
            Delete
          </button>
        </div>
      )}


    </div>


  )
}
