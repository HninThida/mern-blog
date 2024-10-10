import { useEffect, useState } from "react";
import { getRequest } from "../utils/api";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function CommentBox({ comment, handleLike }) {
  const { currentUser } = useSelector((state) => state.user);

  const [user, setUser] = useState(null);
  const handleGetUser = async () => {
    const data = await getRequest(`user/${comment?.userId}`);
    if (data?.success) {
      setUser(data?.data);
    }
  };

  useEffect(() => {
    handleGetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex  mb-1 border-b-2 p-3">
      <div className="flex-shrink-0 ">
        <img src={user?.photourl} className="w-10 h-10 rounded-full"></img>
      </div>
      <div className="flex-1 ms-3">
        <div className="flex items-center mb-1">
          <span className="fw-bold mr-1 truncate font-bold">
            {user ? `@${user?.username}` : "Anonymous User"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment?.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500  ">{comment?.content}</p>
        <div className="flex items-center text-xs  dark:border-gray-700 max-w-fit gap-2 mt-3">
          <button
            className={` ${
              currentUser && !comment?.likes?.includes(currentUser?._id)
                ? " text-gray-500"
                : "text-blue-500"
            } `}
            type="button"
            onClick={() => handleLike(comment?._id)}
          >
            <FaThumbsUp />
          </button>
          <p className="text-gray-400">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
          </p>
        </div>
      </div>
    </div>
  );
}
