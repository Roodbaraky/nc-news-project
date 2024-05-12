import React, { useEffect, useState } from 'react'
import { getArticles, getTopics } from '../utils/APIs'
import { ArticleCard } from './ArticleCard'
import { LoadingSpinner } from './LoadingSpinner'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { pageCalculator } from '../utils/utils'
import { Filters } from './Filters'

export const Articles = ({ articles, setArticles, setError }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [topics, setTopics] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchTopic, setSearchTopic] = useState('')
    const [sortBy, setSortBy] = useState('created_at')
    const [order, setOrder] = useState('DESC')
    const [limit, setLimit] = useState('10')
    const [p, setP] = useState(1)
    const [pArr, setPArr] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [isMoreResults, setIsMoreResults] = useState(true)
    const topic = searchParams.get('topic')


    useEffect(()=>{
        if (+p < Math.ceil(totalCount / limit)) {
            setIsMoreResults(true)
        }
        else{
            setIsMoreResults(false)
        }
    },[p, limit, totalCount])

    const showMore = () => {
        if (isMoreResults) {
            const nextPage = p + 1;
            setP(nextPage);
            getArticles(searchTopic, sortBy, order, limit, nextPage)
                .then((results) => {
                    if (results.hasOwnProperty('totalCount')) {
                        setArticles([...articles, ...results.rows])
                    } else {
                        setArticles([...results])
                        setIsLoading(false)
                    }
                })
                .catch((err) => {
                    setError(err);
                    navigate(`/error`);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }else{
            setIsMoreResults(false)
        }
    }

    useEffect(() => {
        setP(1)
        if (topic && (searchTopic !== topic)) {
            setSearchTopic(topic)
        }
    }, [topic, searchTopic])




    useEffect(() => {
        if (!topic) {
            setSearchTopic('')
        }

        getTopics()
            .then((topics) => {
                setTopics(topics)
            })
            .catch((err) => {
                setError(err)
                navigate(`/error`)
            })


        getArticles(searchTopic, sortBy, order, limit, 1)
            .then((results) => {
                if (results.hasOwnProperty('totalCount')) {
                    setTotalCount(results.totalCount)
                    setPArr(pageCalculator(totalCount, +limit))
                    setArticles(results.rows)
                } else {
                    setArticles(results)
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                setError(err)
                navigate(`/error`)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [searchTopic, topic, sortBy, order, limit, totalCount])

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
            {limit <= totalCount && isMoreResults && <button id='show-more' onClick={showMore} className="bg-accent-1 text-content hover:bg-accent-2  py-2 px-4 rounded-full w-fit mx-auto self-center">Show More</button>}
        </section>
    )
}
