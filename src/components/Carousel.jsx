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
    pauseOnHover:true,

 
  };
  return (
    <Slider {...settings} className=" text-ellipsis">
      {articles.map((article) => {
        return (
          <Link
            to={`/articles/${article.article_id}`}
            key={article.article_id}
          >
            <h3 className=" text-nowrap whitespace-nowrap overflow-hidden text-ellipsis font-semibold">{article.title}</h3>
            <div className=''>
              <img
                id='slide-img'
                className=" h-100 object-fill rounded-lg"
                src={article.article_img_url}
                alt=""
              />
            </div>
            <p className="text-sm text-gray-500">{article.votes} votes</p>
          </Link>
        );
      })}
    </Slider>

  )
}
