import { BiDownArrow, BiUpArrow } from 'react-icons/bi'
import { ArticleTile } from './ArticleTile'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { IArticle, ArticlesProps} from '../types/Articles'



export const Articles = ({ articles, setSearchParams }:ArticlesProps):JSX.Element => {
    //ideally: endless scroll for pagination
    //leave author null, just for use on user profile page
    //leave limit outside of user control too ...
    //this just leaves order by and sort_by in user control
    // const [orderBy, setOrderBy] = useState('DESC')
    const [isOrderByDefault, setIsOrderByDefaut] = useState(true)

    const handleFilterChange = (e:MouseEvent|ChangeEvent) => {
        let orderBy
        const target = e.target as HTMLButtonElement
        if (target.id === 'ASC') {
            orderBy = 'ASC'
            setIsOrderByDefaut(false)
        }
        if (target.id === 'DESC') {
            orderBy = 'DESC'
            setIsOrderByDefaut(true)
        }
        if (target.id !== 'ASC' && target.id !== 'DESC') {
            orderBy = isOrderByDefault ? 'DESC' : 'ASC'
        }

        const sortBy = (document.getElementById('sort-by')as HTMLSelectElement).value
        refreshSearch(orderBy, sortBy)
    }

    async function refreshSearch(order_by:string|undefined, sort_by:string|undefined = 'created_at') {
        setSearchParams((searchParams) => {
            return { ...searchParams, sort_by, order_by }

        }
        )
    }
    useEffect(() => {

    },[setSearchParams])
    return (
        <section id='articles-container' className='flex flex-col w-full items-center mt-20'>
            <section id='filters selector' className='flex place-content-center gap-28 size-full'>
                <label htmlFor="">{'Sort by: '}
                    <select name="" id="sort-by" onChange={handleFilterChange}>
                        <option value="created_at">Date created</option>
                        <option value="comment_count">Comments</option>
                        <option value="votes">Votes</option>
                    </select>
                </label>
                <label className="swap">
                    <input type="checkbox" id='order-by' />
                    <div className="swap-on" onClick={handleFilterChange} id='ASC'><BiUpArrow className='pointer-events-none' /></div>
                    <div className="swap-off" onClick={handleFilterChange} id='DESC' ><BiDownArrow className='pointer-events-none' /></div>
                </label>
            </section>
            {/* Conditional for loading component */}
            {/* Filters - Push queries to URL */}
            {/* articles.map --> ArticleCard */}
            {/* Unlimited scroll */}
            {articles?.map((article: IArticle) => <ArticleTile key={article.article_id} article={article} />)}
        </section>
    )
}
