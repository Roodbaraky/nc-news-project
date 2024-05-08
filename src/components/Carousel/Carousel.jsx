import React, { useState } from 'react'
import ReactSimplyCarousel from 'react-simply-carousel';


export const Carousel = ({articles}) => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    console.log(articles)
  return (
    <div>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{

            style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{

            style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 2,
            itemsToScroll: 2,
            minWidth: 768,
          },
        ]}
        speed={400}
        easing="linear"
      >

        {articles.map((article)=>{
            return(
                
                   <div>
                    <p>{article.title}</p>
                    <img src={article.article_img_url} alt="" />
                    <p>{article.votes}</p>
                    
                    </div>
                
            )
        })}
      </ReactSimplyCarousel>
    </div>

  )
}
