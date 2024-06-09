import { useContext, useState } from "react";
import { ErrorContext, UserContext } from "../context/context";
import { CommentModalProps } from "../types/Comments";

export const CommentModal = ({
  commentsMutation,
}: CommentModalProps): JSX.Element => {
  const { user } = useContext(UserContext) ?? { user: null };
  const { setError } = useContext(ErrorContext) ?? { setError: () => {} };

  const [posting, setPosting] = useState(false);

  const handleOpenComment = () => {
    if (!user) {
      setError({ message: "you need to be logged in to post a comment" });
      return;
    } else {
      (
        document.getElementById("comment-modal") as HTMLDialogElement
      ).showModal();
    }
  };

  const handlePostComment = async () => {
    if (!posting) {
      if (
        (document.getElementById("comment-input") as HTMLInputElement).value
          .length === 0
      ) {
        setError({ message: "you can't post an empty comment" });
      }
      if (!user) {
        setError({ message: "you need to be logged in to post a comment" });
      } else {
        setPosting(true);
        try {
          const commentBody = {
            username: user.username,
            body: (document.getElementById("comment-input") as HTMLInputElement)
              .value,
          };
          if (commentBody) {
            commentsMutation.mutate(commentBody);
          }

          setPosting(false);

          (document.getElementById("comment-input") as HTMLInputElement).value =
            "";
          (
            document.getElementById("comment-modal") as HTMLDialogElement
          ).close();
        } catch (err) {
          setError(err as Error);
        }
      }
    }
  };
if(commentsMutation.isPending){
    return <div>loading</div>
}

  return (
    <>
      <button className="btn" onClick={handleOpenComment}>
        Comment
      </button>
      <dialog id="comment-modal" className="modal">
        <div className="modal-box">
          <textarea
            id="comment-input"
            className="textarea w-full"
            placeholder="Enter a comment..."
          ></textarea>
          <div className="modal-action">
            <form method="dialog">
              <a className="btn" onClick={handlePostComment}>
                Post
              </a>
              <button className="btn btn-warning">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
