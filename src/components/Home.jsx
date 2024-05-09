import { useEffect, useState } from 'react'
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import { getArticles } from '../utils/APIs'
import { Carousel } from './Carousel'
import { LoadingSpinner } from './LoadingSpinner'


export const Home = () => {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getArticles(null, 'created_at', 'DESC', '10', '1')
      .then(({ rows }) => {
        setArticles(rows)
        setIsLoading(false) 
      })
  }, [])

  return ( <>
    <section className="py-12 px-4 mt-20">
  <div className="container mx-auto p-5 flex flex-col items-center">
    <h2 className="text-3xl font-bold mb-8 text-left">Featured Articles</h2>
    {isLoading ? (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    ) : (
      <div className='w-11/12'><Carousel articles={articles} /></div>
    )}
  </div>
</section>

    <section className='py-12 px-4'>
      <div className='container mx-auto'>
        <h2 className='text-3xl font-bold mb-8'>How to use NC News:</h2>
        <p className='text-lg'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In dolor fuga cupiditate est maiores quam repellat cumque velit et magnam laudantium, natus autem aliquid. Nam enim rem ipsa ipsam iste.
        </p>
      </div>
    </section>
  </>
  )
}
