import React, { useEffect, useState } from 'react'
import { getArticles, getTopics } from '../utils/APIs'
import { ArticleCard } from './ArticleCard'
import { LoadingSpinner } from './LoadingSpinner'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { pageCalculator } from '../utils/utils'

export const Articles = ({ articles, setArticles, setError }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [topics, setTopics] = useState([])
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchTopic, setSearchTopic] = useState('')
    const [sortBy, setSortBy] = useState('created_at')
    const [order, setOrder] = useState('DESC')
    const [limit, setLimit] = useState('10')
    const [p, setP] = useState('1')
    const [pArr, setPArr] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const topic = searchParams.get('topic')

    if (topic && (searchTopic !== topic)) {
        setSearchTopic(topic)
    }

    useEffect(() => {
        if (!topic) {
            setSearchTopic('')
        }
        getArticles(searchTopic, sortBy, order, limit, +p || '1')
            .then((articles) => {
                if (articles.hasOwnProperty('totalCount')) {
                    setTotalCount(articles.totalCount)
                    setArticles(articles.rows)
                } else {
                    setArticles(articles)
                    setIsLoading(false)
                }
            })
            .then(() => {
                setPArr(pageCalculator(totalCount, +limit))
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


    }, [searchTopic, sortBy, order, limit, p])

    return (
        <section id='articles-container' className=' mt-28 p-2 flex-col place-content-center place-items-center w-full h-screen'>
            <div className="sort-filter-bar flex flex-wrap justify-center gap-4 rounded-lg p-4 mb-3 bg-accent-1/40 shadow-md w-full">
                <label htmlFor="" className="flex items-center">
                    Topic:
                    <select
                        className="select-bg bg-transparent border border-gray-300 rounded-md px-2 py-1"
                        defaultValue={searchTopic || ""}
                        onChange={(e) => {
                            setSearchTopic(e.target.value);
                            if (e.target.value.length) {
                                setIsLoading(true);
                                navigate(`?topic=${e.target.value}`);
                            } else {
                                navigate("");
                            }
                        }}
                    >
                        <option value="">All</option>
                        {topics.map((topic) => (
                            <option key={topic.slug} value={topic.slug}>
                                {topic.slug}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="" className="flex items-center">
                    Sort by:
                    <select
                        className="select-bg bg-transparent border border-gray-300 rounded-md px-2 py-1"
                        defaultValue={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="created_at">date</option>
                        <option value="comment_count">comments</option>
                        <option value="votes">votes</option>
                    </select>
                </label>
                <label htmlFor="" className="flex items-center">
                    Sort:
                    <select
                        className="select-bg bg-transparent border border-gray-300 rounded-md px-2 py-1"
                        defaultValue={order}
                        onChange={(e) => setOrder(e.target.value)}
                    >
                        <option value="DESC">DESC</option>
                        <option value="ASC">ASC</option>
                    </select>
                </label>
                <label htmlFor="" className="flex items-center">
                    Limit:
                    <select
                        className="select-bg bg-transparent border border-gray-300 rounded-md px-2 py-1"
                        defaultValue={limit}
                        onChange={(e) => setLimit(e.target.value)}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value={totalCount || "100"}>ALL</option>
                    </select>
                </label>
                <label htmlFor="" className="flex items-center">
                    Page:
                    <select
                        className="select-bg bg-transparent border border-gray-300 rounded-md px-2 py-1"
                        defaultValue="1"
                        onChange={(e) => setP(e.target.value)}
                    >
                        <option value="1">1</option>
                        {pArr.length > 1
                            ? pArr.map((x) => <option key={x}>{x}</option>)
                            : ""}
                    </select>
                </label>
            </div>
            <div className="articles-container flex flex-wrap justify-center gap-4">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    articles.map((article) => (
                        <ArticleCard key={article.article_id} article={article} />
                    ))
                )}
            </div>
        </section>
    )
}
