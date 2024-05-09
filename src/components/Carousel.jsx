import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from 'react-router-dom'


export const Carousel = ({ articles }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2700,
    };
    return (

        <div className="flex justify-center items-center">
        <Slider {...settings} className="w-full max-w-lg">
          {articles.map((article) => {
            return (
              <Link
                to={`/articles/${article.article_id}`}
                key={article.article_id}
                className="flex flex-col items-center justify-center space-y-2"
              >
                <p className="text-lg font-semibold">{article.title}</p>
                <img
                  className="w-full rounded-lg"
                  src={article.article_img_url}
                  alt=""
                />
                <p className="text-sm text-gray-500">{article.votes} votes</p>
              </Link>
            );
          })}
        </Slider>
      </div>



    )
}
