import React, { useState } from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './Carousel.css'
import { Link } from 'react-router-dom'


export const Carousel = ({ articles }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2700,
    };
    return (

        <div className='slider-container'>
            <Slider {...settings}>
                {articles.map((article) => {
                    return (

                        <Link to={`/articles/${article.article_id}`} key={article.article_id} >
                            <div className='carousel-slide'>
                                <p>{article.title}</p>
                                <img src={article.article_img_url} alt="" />
                                <p>{article.votes} votes</p>
                            </div>

                        </Link>
                    )
                })}
            </Slider>
        </div>



    )
}
