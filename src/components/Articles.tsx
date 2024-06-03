import { BiDownArrow, BiUpArrow } from 'react-icons/bi'
import { ArticleTile } from './ArticleTile'
import { ChangeEvent, MouseEvent, useEffect } from 'react'
import { IArticle, ArticlesProps } from '../types/Articles'




export const Articles = ({ articles, searchParams, setSearchParams }: ArticlesProps): JSX.Element => {
    //ideally: endless scroll for pagination

    const handleFilterChange = (e: MouseEvent | ChangeEvent) => {
        let orderBy
        const target = e.target as HTMLButtonElement
        if (e.type === 'click') {
            orderBy = target.id
        }
        else {
            orderBy = searchParams.get('order_by')
        }

        const sortBy = (document.getElementById('sort-by') as HTMLSelectElement).value
        if (orderBy && sortBy) {
            refreshSearch(orderBy, sortBy)
        }
    }

    async function refreshSearch(order_by: string | undefined, sort_by: string | undefined = 'created_at') {
        setSearchParams((searchParams) => {
            return { ...searchParams, sort_by, order_by }

        }
        )
    }
    useEffect(() => {

    }, [setSearchParams])
    return (
        <section id='articles-container' className='flex flex-col w-full items-center mt-20'>
            <section id='filters selector' className='flex place-content-center gap-32 size-full'>
                <label htmlFor="" className=''>{ }
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
            {articles?.map((article: IArticle) => <ArticleTile key={article.article_id} article={article} />)}
        </section>
    )
}
