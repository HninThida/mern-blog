import { useEffect, useState } from "react";
import { getRequest } from "../utils/api";
import moment from "moment";

const CommentBox = (comment) => {
  console.log(comment);

  const [user, setUser] = useState(null);
  const handleGetUser = async () => {
    const data = await getRequest(`user/${comment?.comment?.userId}`);
    if (data?.success) {
      setUser(data?.data);
      console.log(data?.data);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <div>
      <div className="">
        <img src={user?.photourl} className="w-10 h-10 rounded-full"></img>
      </div>
      <div className="">
        <span className="fw-bold m-3 truncate font-bold">
          {user ? `@${user?.username}` : "Anonymous User"}
        </span>
        <span>{moment(comment?.comment?.createdAt).fromNow()}</span>
      </div>
    </div>
  );
};

export default CommentBox;
