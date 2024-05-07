import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getArticleById } from '../../../APIs'
import './Article.css'
import { ArticleCard } from '../ArticleCard/ArticleCard'
import { Comments } from '../Comments/Comments'
export const Article = ({ article, setArticle, user }) => {
    let { article_id } = useParams()

    useEffect(() => {
        getArticleById(article_id)
            .then((article) => {

                setArticle(article)
            })
    }, [article_id])

    return (
        <article className='article'>
            {article &&
                <>

                    <p className='topic'>{article.topic}</p>
                    <p className='author'>{article.author}</p>
                    <h3 className='title'>{article.title}</h3>
                    {user.username === article.author && <div className='post-buttons'><button>Edit</button><button>Delete</button></div>}
                    <img src={article.article_img_url} alt={`image associated with ${article.title}`} />
                    <p>{article.body}</p>
                    <p>{article.created_at}</p>
                    <div className='vote-buttons'><button>UP</button>{article.votes}<button>DOWN</button></div>
                    <div className='comment-button'><button>Comment</button></div>

                    <Comments article_id={article_id} />
                </>}
        </article>
    )
}
