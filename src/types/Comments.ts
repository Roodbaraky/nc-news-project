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
    setPostIndicator: Dispatch<SetStateAction<boolean>>,

}

export interface CommentModalProps {
    article_id: number,
    setPostIndicator: Dispatch<SetStateAction<boolean>>,
}

export interface CommentsSectionProps {
article_id: number,
comments: Comment[],
postIndicator: boolean,
setPostIndicator: Dispatch<SetStateAction<boolean>>,

}