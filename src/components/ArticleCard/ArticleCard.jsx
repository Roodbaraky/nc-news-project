import React from 'react'
import { Link } from 'react-router-dom'
import './ArticleCard.css'
import moment from 'moment'

export const ArticleCard = ({ article, setArticle }) => {


    return (
        <Link to={`/articles/${article.article_id}`}>
            <div className='article-card' id={article.article_id} >
                <h3>{article.title}</h3>
                <h4>{article.topic}</h4>
                <img src={article.article_img_url} alt="" />
                <p>{article.votes} votes</p>
                <p>{article.comment_count} comments</p>
                <p>{moment(article.created_at).format('DD/MM/YY, h:mm:ss a')}</p>
            </div>
        </Link>
    )
}
