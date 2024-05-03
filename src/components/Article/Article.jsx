import React from 'react'
import { Link } from 'react-router-dom'
import './Article.css'

export const Article = ({ article }) => {
    return (
        <Link>
            <div className='article-card'>
                <h3>{article.title}</h3>
                <h4>{article.topic}</h4>
                <img src={article.article_img_url} alt="" />
                <p>{article.votes} votes</p>
                <p>{article.comment_count} comments</p>
            </div>
        </Link>
    )
}
