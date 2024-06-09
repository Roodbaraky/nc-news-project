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

export const Article = () => {
  const { user } = useContext(UserContext) ?? { user: null };
  const { setError } = useContext(ErrorContext) ?? { setError: () => {} };
  const { article_id } = useParams();
  //   const [article, setArticle] = useState<null | IArticle>(null);
  const [comments, setComments] = useState([]);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const [votes, setVotes] = useState(0);
  const [postIndicator, setPostIndicator] = useState(false);

  const queryClient = useQueryClient();

  

  const {
    isLoading,
    isError,
    data: article,
    error,
  } = useQuery({
    queryKey: ["article"],
    queryFn: () => {
      return getArticleById(Number(article_id));
    },
  });



  const { mutate, isPending } = useMutation({
    mutationFn: async (voteBody: { inc_votes: number }) => {
      const response = await patchArticleVotes(Number(article_id), voteBody);
      return response 
    },
    onMutate: async (voteBody: { inc_votes: number }) => {
      await queryClient.cancelQueries({queryKey:["article"]});
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
    onSettled: ()=>{
        queryClient.invalidateQueries(["article"]);
    }
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>{error.message}</span>;
  }
  //   useEffect(() => {
  //     async function fetchArticle(article_id: number) {
  //       try {
  //         const fetchedArticle = await getArticleById(article_id);
  //         setArticle(fetchedArticle);
  //         setVotes(fetchedArticle.votes);
  //         const fetchedComments = await getCommentsById(article_id);
  //         setComments(fetchedComments);
  //       } catch (err) {
  //         setError(err as Error);
  //       }
  //     }
  //     if (article_id) {
  //       fetchArticle(+article_id);
  //     }
  //   }, [article_id, postIndicator, setError]);

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
    const voteBody = { inc_votes: 0 };
    if (!user) {
      setError({ message: "You must be logged in to vote" });
    } else if (article!.author !== user.username) {
      const target = e.target as HTMLButtonElement;
      if (target.id === "upvote") {
        if (!upVoted && !downVoted) {
          voteBody.inc_votes = 1;
          setVotes(votes + 1);
          setUpVoted(true);
        }
        if (upVoted) {
          setUpVoted(false);
          setVotes(votes - 1);
        }
        if (downVoted) {
          setUpVoted(true);
          setDownVoted(false);
          setVotes(votes + 2);
        }
      }
      if (target.id === "downvote") {
        if (!downVoted && !upVoted) {
          setVotes(votes - 1);
          setDownVoted(true);
        }
        if (downVoted) {
          setVotes(votes + 1);
          setDownVoted(false);
        }
        if (upVoted) {
          setVotes(votes - 2);
          setDownVoted(true);
          setUpVoted(false);
        }
      }
    } else {
      setError({ message: "You cannot vote on your own article" });
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
      <section
        id="article-container"
      
        className="self-center"
      >
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
              <div>{votes}</div>
              <button id="downvote" onClick={voteOnArticle} className="btn">
                <BiSolidDownArrow className="pointer-events-none" />
              </button>
            </div>
          </div>
        </section>
        <CommentsSection
          article_id={+article_id}
          comments={comments}
          postIndicator={postIndicator}
          setPostIndicator={setPostIndicator}
        />
      </section>
    );
};
