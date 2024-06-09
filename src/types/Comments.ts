import { UseMutationResult } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export interface Comment {
    votes: number,
    created_at: string,
    comment_id: number,
    author: string,
    body: string,
    article_id: number,
}

export interface CommentCardProps {
    comment: Comment,
   

}

export interface CommentModalProps {
    article_id: number,
    setPostIndicator: Dispatch<SetStateAction<boolean>>,
    commentsMutation: UseMutationResult<any, Error, void, {
        previousComments: any;
    }>
}

