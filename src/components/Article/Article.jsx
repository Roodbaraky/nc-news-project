import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArticleById } from '../../../APIs'
import './Article.css'
import '../../../src/spinkit.min.css'
import { Comments } from '../Comments/Comments'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import moment from 'moment'
export const Article = ({ article, setArticle, user }) => {
    let { article_id } = useParams()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getArticleById(article_id)
            .then((article) => {
                setIsLoading(false)
                setArticle(article)

            })
    }, [article_id])

    return (
        <article className='article'>
            {isLoading
                ? <LoadingSpinner/>
                : <>
                    <p className='topic'>{article.topic}</p>
                    <p className='author'>{article.author}</p>
                    <h3 className='title'>{article.title}</h3>
                    {user.username === article.author && <div className='post-buttons'><button>Edit</button><button>Delete</button></div>}
                    <img src={article.article_img_url} alt={`image associated with ${article.title}`} />
                    <p>{article.body}</p>
                    <p>{moment(article.created_at).format('DD/MM/YY, h:mm:ss a')}</p>
                    <div className='vote-buttons'><button>UP</button>{article.votes}<button>DOWN</button></div>
                    <div className='comment-button'><button>Comment</button></div>
                    <Comments article_id={article_id} />
                </>}
        </article>
    )
}
