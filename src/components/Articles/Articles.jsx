import React, { useEffect } from 'react'
import { getArticles } from '../../../APIs'
import { ArticleCard } from '../ArticleCard/ArticleCard'
import './Articles.css'

export const Articles = ({ articles, setArticles, setArticle }) => {
    useEffect(() => {
        getArticles()
            .then((articles) => {
                setArticles(articles)
                
            })
    }, [articles])

    return (
        <div className='articles-container'>
            {articles.map((article) => {
                return <ArticleCard
                    key={article.article_id}
                    article={article}
                    
                />
            })}
        </div>
    )
}
