import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getRequest, postRequest, putRequest } from "../utils/api";
import CommentBox from "./CommentBox";

const CommentSection = (postId) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const navigate = useNavigate();

  const handleGetComments = async () => {
    const data = await getRequest(`comment/getpostcomments/${postId.postId}`);
    if (data?.success) {
      setComments(data?.data);
    }
  };

  useEffect(() => {
    handleGetComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await postRequest(`comment/create`, {
        content: comment,
        userId: currentUser?._id,
        postId: postId.postId,
      });
      if (data.success) {
        setComment("");
        setComments([data?.data, ...comments]);

        console.log(data?.message);
      } else {
        setCommentError(data.message);
      }
    } catch (error) {
      console.log(error);
      setCommentError(error.message);
    }
  };

  const handleLike = async (commentId) => {
    console.log(commentId);

    if (!currentUser) {
      navigate("/sign-in");
      return;
    }
    try {
      const data = await putRequest(`comment/like-comment/${commentId}`);
      console.log(data);

      if (data.success) {
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  content: data?.data?.content,
                  likes: data?.data?.likes,
                  numberOfLikes: data?.data?.likes?.length,
                  userId: data?.data?.userId,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = async (commentId, editedComment) => {
    console.log(commentId);
    console.log(editedComment);

    setComments(
      comments.map((c) =>
        c._id === commentId._id ? { ...c, content: editedComment } : c
      )
    );
  };

  return (
    <div className="max-w-3xl w-full p-3 mx-auto">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as :</p>
          <img
            src={currentUser?.photourl}
            className="w-10 h-10 rounded-full"
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-400 hover:underline"
          >
            @ {currentUser?.username}
          </Link>
        </div>
      ) : (
        <>
          <div className="text-teal-500 flex gap-1">
            You must to login to commit
            <Link
              to={"/sign-in"}
              className="text-sm  mb-5 text-blue-500 underline"
            >
              {" "}
              Sign in
            </Link>
          </div>
        </>
      )}
      {currentUser && (
        <form
          className="border border-teal-500 rounded p-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            value={comment}
            className="p-3"
            rows="3"
            maxLength="200"
            placeholder="Add a comment"
            onChange={(e) => setComment(e.target.value)}
          ></Textarea>
          <div className="flex justify-between items-center gap-4 mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment?.length} characters remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5 mb-3">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments?.length > 0 ? (
        <>
          <div className="my-5 flex gap-2">
            <p>
              Comments{" "}
              <span className="border border-gray-500 py-1 px-2 rounded-sm">
                {comments.length}{" "}
              </span>
            </p>
          </div>
          {comments?.map((comment, idx) => (
            <div className="" key={idx}>
              <CommentBox
                comment={comment}
                handleLike={handleLike}
                handleEditComment={handleEditComment}
              />
            </div>
          ))}
        </>
      ) : (
        <p className="text-sm my-5">No comments</p>
      )}
    </div>
  );
};

export default CommentSection;
