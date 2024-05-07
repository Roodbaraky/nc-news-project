import axios from "axios";

export const getUser = (username) => {
    return axios
        .get(`https://nc-news-solo-kr.onrender.com/api/users/${username}`)
        .then(({ data: { user } }) => {
            return user;
        });
};

export const getArticles = (arg) => {
    return axios
        .get(`https://nc-news-solo-kr.onrender.com/api/articles`, arg)
        .then(({ data: { articles } }) => {
            return articles;
        });
};

export const getArticleById = (article_id) => {
    return axios
        .get(`https://nc-news-solo-kr.onrender.com/api/articles/${article_id}`)
        .then(({ data }) => {
            return data;
        });
};

export const getCommentsById = (article_id) => {
    return axios
        .get(`https://nc-news-solo-kr.onrender.com/api/articles/${article_id}/comments`)
        .then(({ data: { comments } }) => {
            return comments
        })

} 