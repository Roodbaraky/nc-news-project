import React, { useEffect, useState } from 'react'
import { getArticles } from '../../../APIs'
import { ArticleCard } from '../ArticleCard/ArticleCard'
import './Articles.css'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'


export const Articles = ({ articles, setArticles, setArticle }) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getArticles()
            .then((articles) => {
                setArticles(articles)
                setIsLoading(false)

            })
    }, [articles])

    return (
        <div className='articles-container'>
            {isLoading
            ? <LoadingSpinner/>
            :articles.map((article) => {
                return <ArticleCard
                    key={article.article_id}
                    article={article}

                />
            })}
        </div>
    )
}
