import React, { useEffect, useState } from 'react'
import { getArticles, getTopics } from '../utils/APIs'
import { ArticleCard } from './ArticleCard'
import { LoadingSpinner } from './LoadingSpinner'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { pageCalculator } from '../utils/utils'
import { Filters } from './Filters'

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
        <section id='articles-container' className=' mt-28 p-2 flex-col place-content-center place-items-center w-full h-full min-h-screen'>
            <Filters
                topics={topics}
                searchTopic={searchTopic}
                sortBy={sortBy}
                order={order}
                limit={limit}
                p={p}
                pArr={pArr}
                setIsLoading={setIsLoading}
                setSearchTopic={setSearchTopic}
                setSortBy={setSortBy}
                setOrder={setOrder}
                setLimit={setLimit}
                setP={setP}
                
            />
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
