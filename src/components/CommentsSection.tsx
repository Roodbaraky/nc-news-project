import { CommentModal } from "./CommentModal";
import { CommentCard } from "./CommentCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommentsById, postArticleComment } from "../services/api";
import { useParams } from "react-router-dom";
import { Comment } from "../types/Comments";

export const CommentsSection = () => {
  const { article_id } = useParams<{ article_id: string }>();
  const queryClient = useQueryClient();

  const commentsQuery = useQuery<Comment[], Error>({
    queryKey: ["comments", article_id],
    queryFn: () => getCommentsById(Number(article_id)),
  });

  const commentsMutation = useMutation<
    Comment,
    Error,
    { username: string; body: string },
    { previousComments?: Comment[] }
  >({
    mutationFn: async (commentBody: { username: string; body: string }) => {
      const response = await postArticleComment(Number(article_id), commentBody);
      return response;
    },
    onMutate: async (commentBody: { username: string; body: string }) => {
      await queryClient.cancelQueries({ queryKey: ["comments", article_id] });

      const previousComments = queryClient.getQueryData<Comment[]>([
        "comments",
        article_id,
      ]);

      const newComment: Comment = {
        author: commentBody.username,
        body: commentBody.body,
        created_at: new Date().toISOString(),
        comment_id: Math.random(),
        article_id: Number(article_id),
        votes: 0,
      };

      queryClient.setQueryData<Comment[]>(["comments", article_id], (oldComments = []) => {
        return [newComment, ...oldComments];
      });

      return { previousComments };
    },
    onError: (_, __, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData<Comment[]>(["comments", article_id], context.previousComments);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", article_id] });
    },
  });

  if (commentsQuery.isError) {
    return <div>Error</div>;
  }

  if (commentsQuery.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <section id="comments-section" className="mt-12 flex flex-col items-center">
      <CommentModal article_id={Number(article_id)} commentsMutation={commentsMutation} />
      {commentsQuery.data?.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </section>
  );
};
