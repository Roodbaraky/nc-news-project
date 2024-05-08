import React, { useEffect, useState } from 'react'
import { getArticles, getTopics } from '../../../APIs'
import { ArticleCard } from '../ArticleCard/ArticleCard'
import './Articles.css'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import { useNavigate, useSearchParams } from 'react-router-dom'







export const Articles = ({ articles, setArticles, setError }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [topics, setTopics] = useState([])
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchTopic, setSearchTopic] = useState('')
    const [sortBy, setSortBy] = useState('created_at')
    const [order, setOrder] = useState('DESC')

    const topic = searchParams.get('topic')

    if (topic && (searchTopic !== topic)) {
        setSearchTopic(topic, sortBy, order)
    }

    useEffect(() => {
        if (!topic) {
            setSearchTopic('')
        }
        getArticles(searchTopic, sortBy, order)
            .then((articles) => {
                setArticles(articles)
                setIsLoading(false)

            })
            .catch((err) => {
                setError(err)
                navigate(`/error`)
            })
        getTopics()
            .then((topics) => {
                setTopics(topics)
            })
            .catch((err) => {
                setError(err)
                navigate(`/error`)
            })


    }, [searchTopic, sortBy, order])

    return (

        <>
            <div className='sort-filter-bar'>
                <label htmlFor="">Topic:
                    <select name="" id="" defaultValue={searchTopic || ''} onChange={(e) => {
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
                            return <option key={topic.slug} value={topic.slug}>
                                {topic.slug}
                            </option>
                        })}

                    </select>
                </label>
                <label htmlFor="">Sort by:
                    <select name="" defaultValue={sortBy} onChange={(e) => {
                        setSortBy(e.target.value)
                    }}>
                        <option value="created_at">date</option>
                        <option value="comment_count">comments</option>
                        <option value="votes">votes</option>
                    </select>
                </label>
                <label htmlFor="">Sort:
                    <select name="" defaultValue={order} onChange={(e) => {
                        setOrder(e.target.value)
                    }}>
                        <option value="DESC">DESC</option>
                        <option value="ASC">ASC</option>
                    </select>
                </label>
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
