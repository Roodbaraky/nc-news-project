import axios, { AxiosResponse } from "axios";
import { User } from "../types/User";

interface ErrorResponse {
    status: number;
    message: string;
}

export const getUser = async (username: string): Promise<User> => {
    try {
        const response: AxiosResponse<{ user: User }> = await axios.get(`https://nc-news-solo.onrender.com/api/users/${username}`);
        return response.data.user;
    } catch (error) {
        const axiosError = error as ErrorResponse;
        if (axiosError && axiosError.status && axiosError.message) {
            throw { status: axiosError.status, msg: axiosError.message };
        } else {
            throw { status: 500, msg: "Unknown error occurred" };
        }
    }
};

export const getUsers = async (): Promise<User[]> => {
    try {
        const response: AxiosResponse<{ users: User[] }> = await axios.get(`https://nc-news-solo.onrender.com/api/users`);
        return response.data.users;
    } catch (error) {
        const axiosError = error as ErrorResponse;
        if (axiosError && axiosError.status && axiosError.message) {
            throw { status: axiosError.status, msg: axiosError.message };
        } else {
            throw { status: 500, msg: "Unknown error occurred" };
        }
    }
};

export const getArticles = async (searchTerm: string | undefined, sort_by: string, order: string, limit: string, p: string, author: string) => {
    try {
        const response = await axios.get(`https://nc-news-solo.onrender.com/api/articles`, {
            params: {
                topic: searchTerm,
                sort_by: sort_by,
                order: order,
                limit: limit,
                p: p,
                author: author
            }
        });
        return response.data.articles;
    } catch (error) {
        const axiosError = error as ErrorResponse;
        if (axiosError && axiosError.status && axiosError.message) {
            throw { status: axiosError.status, msg: axiosError.message };
        } else {
            throw { status: 500, msg: "Unknown error occurred" };
        }
    }
};

export const getArticleById = async (article_id: number) => {
    try {
        const response = await axios.get(`https://nc-news-solo.onrender.com/api/articles/${article_id}`);
        return response.data;
    } catch (error) {
        const axiosError = error as ErrorResponse;
        if (axiosError && axiosError.status && axiosError.message) {
            throw { status: axiosError.status, msg: axiosError.message };
        } else {
            throw { status: 500, msg: "Unknown error occurred" };
        }
    }
};

export const getCommentsById = async (article_id: number) => {
    try {
        const response = await axios.get(`https://nc-news-solo.onrender.com/api/articles/${article_id}/comments`);
        return response.data.comments;
    } catch (error) {
        const axiosError = error as ErrorResponse;
        if (axiosError && axiosError.status && axiosError.message) {
            throw { status: axiosError.status, msg: axiosError.message };
        } else {
            throw { status: 500, msg: "Unknown error occurred" };
        }
    }
};

export const patchArticleVotes = async (article_id: number | undefined, reqBody: { inc_votes: number; }) => {
    try {
        await axios.patch(`https://nc-news-solo.onrender.com/api/articles/${article_id}`, reqBody);
    } catch (error) {
        const axiosError = error as ErrorResponse;
        if (axiosError && axiosError.status && axiosError.message) {
            throw { status: axiosError.status, msg: axiosError.message };
        } else {
            throw { status: 500, msg: "Unknown error occurred" };
        }
    }
};

export const postArticleComment = async (article_id: number, reqBody: { username: string; body: string; }) => {
    try {
        const response = await axios.post(`https://nc-news-solo.onrender.com/api/articles/${article_id}/comments`, reqBody);
        return response.data;
    } catch (error) {
        const axiosError = error as ErrorResponse;
        if (axiosError && axiosError.status && axiosError.message) {
            throw { status: axiosError.status, msg: axiosError.message };
        } else {
            throw { status: 500, msg: "Unknown error occurred" };
        }
    }
};

export const deleteArticleComment = async (comment_id: number) => {
    try {
        await axios.delete(`https://nc-news-solo.onrender.com/api/comments/${comment_id}`);
    } catch (error) {
        const axiosError = error as ErrorResponse;
        if (axiosError && axiosError.status && axiosError.message) {
            throw { status: axiosError.status, msg: axiosError.message };
        } else {
            throw { status: 500, msg: "Unknown error occurred" };
        }
    }
};

export const getTopics = async () => {
    try {
        const response = await axios.get(`https://nc-news-solo.onrender.com/api/topics`);
        return response.data.topics;
    } catch (error) {
        const axiosError = error as ErrorResponse;
        if (axiosError && axiosError.status && axiosError.message) {
            throw { status: axiosError.status, msg: axiosError.message };
        } else {
            throw { status: 500, msg: "Unknown error occurred" };
        }
    }
};

export const getCommentsByUser = async (user: User) => {
    try {
        const response = await axios.get(`https://nc-news-solo.onrender.com/api/comments/by/${user}`);
        return response.data.comments;
    } catch (error) {
        const axiosError = error as ErrorResponse;
        if (axiosError && axiosError.status && axiosError.message) {
            throw { status: axiosError.status, msg: axiosError.message };
        } else {
            throw { status: 500, msg: "Unknown error occurred" };
        }
    }
};

export const postCommentVote = async (comment_id: number, reqBody: { inc_votes: number; }) => {
    try {
        await axios.patch(`https://nc-news-solo.onrender.com/api/comments/${comment_id}`, reqBody);
    } catch (error) {
        const axiosError = error as ErrorResponse;
        if (axiosError && axiosError.status && axiosError.message) {
            throw { status: axiosError.status, msg: axiosError.message };
        } else {
            throw { status: 500, msg: "Unknown error occurred" };
        }
    }
};
