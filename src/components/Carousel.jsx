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
    adaptiveHeight: false,
    autoplay: true,
    autoplaySpeed: 2700,
    pauseOnHover: true,


  };
  return (
    <Slider {...settings} className=" text-ellipsis">
      {articles.map((article) => {
        return (
          <Link
            to={`/articles/${article.article_id}`}
            key={article.article_id}
          >

            <div id="slide-content" className='flex flex-col w-4/5 mx-auto self-center'>
              <h3 id='slide-title' className=" text-nowrap whitespace-nowrap overflow-hidden text-ellipsis font-semibold">{article.title}</h3>
              <img
                id='slide-img'
                className=" h-100 object-fill rounded-lg"
                src={article.article_img_url}
                alt=""
              />
              <p className="text-sm text-content ml-auto">{article.votes} votes</p>
            </div>

          </Link>
        );
      })}
    </Slider>

  )
}
