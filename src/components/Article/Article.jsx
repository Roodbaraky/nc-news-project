import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getArticleById } from '../../../APIs'
import './Article.css'
export const Article = ({ article, setArticle }) => {
    let { article_id } = useParams()

    useEffect(() => {
        getArticleById(article_id)
            .then((article) => {

                setArticle(article)
            })
    }, [article_id])

    return (
        <section>
            {article &&
                <>
                    <p>{article.topic}</p>
                    <p>{article.author}</p>
                    <h3>{article.title}</h3><button>Edit</button><button>Delete</button>
                    <img src={article.article_img_url} alt="" />
                    <p>{article.body}</p>
                    <div><button>UP</button>{article.votes}<button>DOWN</button></div>
                    <div><button>Comment</button></div>
                </>}
        </section>
    )
}
