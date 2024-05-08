import React, { useEffect, useState } from 'react'
import { getArticles, getTopics } from '../../../APIs'
import { ArticleCard } from '../ArticleCard/ArticleCard'
import './Articles.css'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { pageCalculator } from '../../../utils'







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
        getArticles(searchTopic, sortBy, order, limit, +p||'1')
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
                <label htmlFor="">Limit:
                    <select defaultValue={limit} name="" id="" onChange={(e) => {
                        setLimit(e.target.value)
                    }}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value={totalCount || '100'}>ALL</option>

                    </select>
                </label>
                <label htmlFor="">Page:
                    <select name="" id=""  defaultValue='1' onChange={(e) => {
                        setP(e.target.value)
                    }}>
                        <option value="1">1</option>
                        {/* {console.log('length:',pArr.length)}  */}
                        {pArr.length>1
                        ?pArr.map((x) => { return <option key={x}>{x}</option> })
                        :''}
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
