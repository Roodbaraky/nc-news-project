import { FocusEvent, MouseEvent, useContext, useEffect, useState } from "react";
import {
  getArticleById,
  getCommentsById,
  patchArticleVotes,
} from "../services/api";
import { useParams } from "react-router-dom";
import { ErrorContext, UserContext } from "../context/context";
import { CommentsSection } from "../components/CommentsSection";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { IArticle } from "../types/Articles";
import { convertToTimeAgo } from "../utils/timeAgo";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { FaEllipsis } from "react-icons/fa6";
import { Comment } from "../types/Comments";

export const Article = () => {
  const { user } = useContext(UserContext) ?? { user: null };
  const { setError } = useContext(ErrorContext) ?? { setError: () => {} };
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const [postIndicator, setPostIndicator] = useState(false);
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: article,
    error,
  } = useQuery({
    queryKey: ["article"],
    queryFn: () => getArticleById(Number(article_id)),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (voteBody: { inc_votes: number }) => {
      const response = await patchArticleVotes(Number(article_id), voteBody);
      return response;
    },
    onMutate: async (voteBody: { inc_votes: number }) => {
      await queryClient.cancelQueries({ queryKey: ["article"] });
      const previousArticle = queryClient.getQueryData<IArticle>(["article"]);
      queryClient.setQueryData<IArticle>(["article"], (oldArticle) => {
        return {
          ...oldArticle!,
          votes: oldArticle!.votes + voteBody.inc_votes,
        };
      });
      return { previousArticle };
    },
    onError: (_, __, context: { previousArticle: IArticle }) => {
      queryClient.setQueryData<IArticle>(["article"], context.previousArticle);
      setError({ message: "Failed to vote" });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["article"]);
    },
  });

  const commentsQuery = useQuery({
    queryKey: ["comments"],
    queryFn: () => getCommentsById(Number(article_id)),
  });



  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>{error.message}</span>;
  }

  async function sendVotes() {
    if (votes !== article!.votes) {
      const difference = votes - article!.votes;
      const voteBody = { inc_votes: difference };
      try {
        mutate(voteBody);
      } catch (err) {
        setDownVoted(false);
        setUpVoted(false);
        setError({ message: "Failed to vote" });
      }
    }
  }

  const voteOnArticle = (e: MouseEvent) => {
    if (!user) {
      setError({ message: "You must be logged in to vote" });
      return;
    }

    if (article!.author === user.username) {
      setError({ message: "You cannot vote on your own article" });
      return;
    }

    const target = e.target as HTMLButtonElement;

    if (target.id === "upvote") {
      if (!upVoted && !downVoted) {
        setUpVoted(true);
        mutate({ inc_votes: 1 });
      } else if (upVoted) {
        setUpVoted(false);
        mutate({ inc_votes: -1 });
      } else if (downVoted) {
        setUpVoted(true);
        setDownVoted(false);
        mutate({ inc_votes: 2 });
      }
    } else if (target.id === "downvote") {
      if (!downVoted && !upVoted) {
        setDownVoted(true);
        mutate({ inc_votes: -1 });
      } else if (downVoted) {
        setDownVoted(false);
        mutate({ inc_votes: 1 });
      } else if (upVoted) {
        setDownVoted(true);
        setUpVoted(false);
        mutate({ inc_votes: -2 });
      }
    }
  };

  const handleBlur = (e: FocusEvent) => {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        sendVotes();
      }
    }, 0);
  };

  if (article && article_id)
    return (
      <section id="article-container" className="self-center">
        <article className="border-t  bg-base-300 m-4 mt-20 p-2   w-11/12 max-w-4xl object-contain ">
          <h3 className="text-lg inline mr-2">{article.topic}</h3>
          <p className="inline">{convertToTimeAgo(article.created_at)}</p>
          <h2 className="font-semibold m-2 ">{article.title}</h2>
          <img src={article.article_img_url} className="self-center mx-auto" />
        </article>
        <section id="comment-vote" className="w=11/12 max-w-4xl mx-4">
          <div className="flex flex-wrap size-full">
            <div className="flex">
              <button id="upvote" onClick={voteOnArticle} className="btn">
                <BiSolidUpArrow className="pointer-events-none" />
              </button>
              <div className="text-center content-center items-center">
                {article.votes}
                {isPending && (
                  <FaEllipsis className="self-center text-center" />
                )}
              </div>
              <button id="downvote" onClick={voteOnArticle} className="btn">
                <BiSolidDownArrow className="pointer-events-none" />
              </button>
            </div>
          </div>
        </section>
        <CommentsSection
          article_id={+article_id}
          comments={commentsQuery.data}
          postIndicator={postIndicator}
          setPostIndicator={setPostIndicator}
        />
      </section>
    );
};
