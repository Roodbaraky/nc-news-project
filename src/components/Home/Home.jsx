import React, { useEffect, useState } from 'react'
import { getArticles } from '../../../APIs'
import { Carousel } from '../Carousel/Carousel'

export const Home = () => {
  const [articles, setArticles] = useState([])
  useEffect(() => {
    getArticles(null, 'created_at', 'DESC', '10', '1')
      .then(({rows}) => {
        setArticles(rows)
      })
  }, [])

  return (<>
    <section className='carousel'>
      <Carousel 
      articles={articles}/>
    </section>
    <section className='how-to'>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. In dolor fuga cupiditate est maiores quam repellat cumque velit et magnam laudantium, natus autem aliquid. Nam enim rem ipsa ipsam iste.
    </section>
  </>
  )
}
