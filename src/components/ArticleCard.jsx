import React from 'react'
import { Link } from 'react-router-dom'

import moment from 'moment'

export const ArticleCard = ({ article, setArticle }) => {


    return (
        <Link to={`/articles/${article.article_id}`}>
            <div className="article-card bg-bkg rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center text-center w-72 h-96">
                <h3 className="text-xl font-semibold text-content">{article.title}</h3>
                <h4 className="text-accent-2">{article.topic}</h4>
                <img src={article.article_img_url} alt="" className="mt-2 rounded-lg w-full h-48 object-cover" />
                <p className="text-content">{article.votes} votes</p>
                <p className="text-content">{article.comment_count} comments</p>
                <p className="text-content">
                    {moment(article.created_at).format("DD/MM/YY, h:mm:ss a")}
                </p>
            </div>
        </Link>
    )
}
