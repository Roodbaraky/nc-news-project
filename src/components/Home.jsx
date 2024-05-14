import { useEffect, useState } from 'react'
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import { getArticles } from '../utils/APIs'
import { Carousel } from './Carousel'
import { LoadingSpinner } from './LoadingSpinner'
import ReactMarkdown from 'https://esm.sh/react-markdown@7'
import readMe from '../../README.md';
import remarkGfm from 'remark-gfm'



export const Home = () => {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [README, setREADME] = useState('')

  useEffect(() => {
    getArticles(null, 'created_at', 'DESC', '10', '1')
      .then(({ rows }) => {
        setArticles(rows)
        setIsLoading(false)
      })
    fetch(readMe)
      .then((res) => res.text())
      .then((text) => setREADME(text))
  }, [])

  return (
    <section id='home-container' className=' w-full h-full min-h-screen'>
      <section id='carousel-container' className="py-12 px-4 mt-20 container mx-auto p-5 flex flex-col items-center">
        <h2 id='carousel-title' className="text-3xl font-bold mb-8 self-start">Featured Articles</h2>
        {isLoading
          ? <div id='loading-spinner' className="flex justify-center">
            <LoadingSpinner />
          </div>
          : <div id='carousel' className='w-11/12 flex flex-col content-center'>
            <Carousel articles={articles} />
          </div>
        }
      </section>

      <section id='how-to-container' className='py-12 px-4 container mx-auto'>
        <h2 id='how-to-title' className='text-3xl font-bold mb-8'>How to use NC News:</h2>
        <article className='text-sm h-1/2 overflow-scroll bg-accent-1 rounded-lg'>
          <ReactMarkdown  children={README}  className='h-48 overflow-scroll  overwhitespace-nowrap' />
        </article>

      </section>
    </section>
  )
}
