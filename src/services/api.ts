import axios from "axios";
import { User } from "../types/User";

export const getUser = (username: string) => {
    return axios
        .get(`https://nc-news-solo.onrender.com/api/users/${username}`)
        .then(({ data: { user } }) => {
            return user;
        });
};

export const getUsers = () => {
    return axios
        .get(`https://nc-news-solo.onrender.com/api/users`)
        .then(({ data: { users } }) => {
            return users
        })
}

export const getArticles = (searchTerm: string | undefined, sort_by: string, order: string, limit: string, p: string, author: string) => {
    return axios
        .get(`https://nc-news-solo.onrender.com/api/articles`, {
            params: {
                topic: searchTerm,
                sort_by: sort_by,
                order: order,
                limit: limit,
                p: p,
                author: author
            }
        })
        .then(({ data: { articles } }) => {
            return articles;
        })
        .catch((err) => {

            return Promise.reject({ status: err.response.status, msg: err.message })
        })
}

export const getArticleById = (article_id: number) => {
    return axios
        .get(`https://nc-news-solo.onrender.com/api/articles/${article_id}`)
        .then(({ data }) => {
            return data;
        })
        .catch((err) => {
            return Promise.reject({ status: err.response.status, msg: err.message })
        })

};

export const getCommentsById = (article_id: number) => {
    return axios
        .get(`https://nc-news-solo.onrender.com/api/articles/${article_id}/comments`)
        .then(({ data: { comments } }) => {
            return comments
        })
        .catch((err) => {
            return Promise.reject({ status: err.response.status, msg: err.message })
        })
}

export const patchArticleVotes = (article_id: number | undefined, reqBody: { inc_votes: number; }) => {
    return axios
        .patch(`https://nc-news-solo.onrender.com/api/articles/${article_id}`, reqBody)
        .then(() => {

        })
        .catch((err) => {
            return Promise.reject({ status: err.response.status, msg: err.message })
        })
}

export const postArticleComment = (article_id: number, reqBody: { username: string; body: string; }) => {
    return axios
        .post(`https://nc-news-solo.onrender.com/api/articles/${article_id}/comments`, reqBody)
        .then(({ data }) => {
            return data
        })
        .catch((err) => {
            return Promise.reject({ status: err.response.status, msg: err.message })
        })

}

export const deleteArticleComment = (comment_id: number) => {
    return axios
        .delete(`https://nc-news-solo.onrender.com/api/comments/${comment_id}`)
        .then(() => { })
        .catch((err) => {
            return Promise.reject({ status: err.response.status, msg: err.message })
        })
}

export const getTopics = () => {
    return axios
        .get(`https://nc-news-solo.onrender.com/api/topics`)
        .then(({ data: { topics } }) => {
            return topics;
        });
}

export const getCommentsByUser = (user: User) => {
    return axios
        .get(`https://nc-news-solo.onrender.com/api/comments/by/${user}`)
        .then(({ data: { comments } }) => {
            return comments;
        });
}

export const postCommentVote = (comment_id: number, reqBody: { inc_votes: number; }) => {
    return axios
        .patch(`https://nc-news-solo.onrender.com/api/comments/${comment_id}`,
            reqBody)
}