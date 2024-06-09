import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommentsById, postArticleComment } from "../services/api";
import { useParams } from "react-router-dom";
import { CommentModal } from "./CommentModal";
import { CommentCard } from "./CommentCard";
import { useState } from "react";

export const CommentsSection = (): JSX.Element | null => {
  const { article_id } = useParams<{ article_id: string }>();
  const queryClient = useQueryClient();
  const [error, setError] = useState<{ message: string } | null>(null);

  const commentsQuery = useQuery({
    queryKey: ["comments", article_id],
    queryFn: () => getCommentsById(Number(article_id)),
  });

  const commentsMutation = useMutation({
    mutationFn: async (commentBody: { username: string; body: string }) => {
      const response = await postArticleComment(Number(article_id), commentBody);
      return response;
    },
    onMutate: async (commentBody: { username: string; body: string }) => {
      await queryClient.cancelQueries(["comments", article_id]);

      const previousComments = queryClient.getQueryData<Comment[]>(["comments", article_id]);

      const newComment: Comment = {
        author: commentBody.username,
        body: commentBody.body,
        created_at: new Date().toISOString(),
        comment_id: Math.random(),
        article_id: Number(article_id),
        votes: 0,
      };

      queryClient.setQueryData<Comment[]>(["comments", article_id], (oldComments = []) => {
        return [...oldComments, newComment];
      });

      return { previousComments };
    },
    onError: (_, __, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData<Comment[]>(["comments", article_id], context.previousComments);
      }
      setError({ message: "Failed to post comment" });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["comments", article_id]);
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
      <CommentModal article_id={article_id} commentsMutation={commentsMutation} />
      {commentsQuery.data?.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </section>
  );
};
