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
        .get(`https://nc-news-solo-kr.onrender.com/api/articles`)
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

export const patchArticleVotes = (article_id, reqBody) => {
    return axios
        .patch(`https://nc-news-solo-kr.onrender.com/api/articles/${article_id}`, reqBody)
        .then(() => {

        })
        .catch((err) => {
            return Promise.reject({ status: err.status, msg: err.msg })
        })
}

export const postArticleComment = (article_id, reqBody) => {

    return axios
        .post(`https://nc-news-solo-kr.onrender.com/api/articles/${article_id}/comments`, reqBody)
        .then(({ data }) => {

        })
        .catch((err) => {
            return Promise.reject({ status: err.status, msg: err.msg })
        })

}

export const deleteArticleComment = (comment_id) => {
    return axios
        .delete(`https://nc-news-solo-kr.onrender.com/api/comments/${comment_id}`)
        .then(() => { })
        .catch((err) => {
            return Promise.reject({ status: err.status, msg: err.msg })
        })
}

