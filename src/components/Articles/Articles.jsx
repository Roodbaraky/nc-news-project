import React, { useEffect } from 'react'
import { getArticles } from '../../../APIs'
import { Article } from '../Article/Article'
import './Articles.css'

export const Articles = ({ articles, setArticles }) => {
    useEffect(() => {
        getArticles()
            .then((articles) => {
                setArticles(articles)
            })
    }, [articles])

    return (
        <div className='articles-container'>
            {articles.map((article) => {
                return <Article
                    key={article.article_id}
                    article={article}
                />
            })}
        </div>
    )
}
