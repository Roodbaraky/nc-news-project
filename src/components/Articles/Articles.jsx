import React, { useEffect, useState } from 'react'
import { getArticles, getTopics } from '../../../APIs'
import { ArticleCard } from '../ArticleCard/ArticleCard'
import './Articles.css'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import { useNavigate, useSearchParams } from 'react-router-dom'







export const Articles = ({ articles, setArticles, setArticle }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [topics, setTopics] = useState([])
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchTopic, setSearchTopic] = useState('')

    const topic = searchParams.get('topic')

    if (topic && (searchTopic !== topic)) {
        setSearchTopic(topic)
    }

    useEffect(() => {
        

        if (!topic) {
            setSearchTopic('')
        }
        getArticles(searchTopic)
            .then((articles) => {
                setArticles(articles)
                setIsLoading(false)

            })
        getTopics()
            .then((topics) => {
                setTopics(topics)
            })


    }, [searchTopic])

    return (

        <>
            <div className='sort-filter-bar'>
                <label htmlFor="">
                    <select name="" id="" value={searchTopic || ''} onChange={(e) => {
                        setSearchTopic(e.target.value)
                        if (e.target.value.length) {
                            setIsLoading(true)
                            navigate(`?topic=${e.target.value}`)
                        }
                        else {
                            navigate(``)
                        }
                    }}>
                        <option value="">All</option>
                        {topics.map((topic) => {
                            return <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
                        })}

                    </select></label>
            </div>
            <div className='articles-container'>
                {isLoading
                    ? <LoadingSpinner />
                    : articles.map((article) => {
                        return <ArticleCard
                            key={article.article_id}
                            article={article}

                        />
                    })}
            </div>
        </>
    )
}
