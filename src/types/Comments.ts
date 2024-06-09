import { UseMutationResult } from "@tanstack/react-query";


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
    commentsMutation: UseMutationResult<Comment, Error, { username: string; body: string; }, { previousComments?: Comment[] | undefined; }>


}