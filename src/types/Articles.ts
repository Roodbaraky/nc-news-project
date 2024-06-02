import { Dispatch, SetStateAction } from "react";
import { SetURLSearchParams } from "react-router-dom";


export interface IArticle {
    article_id: number,
    title: string,
    topic: string,
    author: string,
    body: string,
    votes: number,
    created_at: string,
    article_img_url?: string,
    comment_count: number,
    author_id: number,
}

export interface ArticlesProps {
    articles: IArticle[];
    setArticles: Dispatch<SetStateAction<IArticle[]>>;
    setSearchParams: SetURLSearchParams
}

export interface SearchParams {
    [key: string]: string;
}
export interface MySearchParams {
order_by?: string,
sort_by?: string,
limit?: string,
p?: string,
author?: string,
}

export interface ArticleTileProps {
    article: IArticle,
}