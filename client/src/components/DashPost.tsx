import React, { useEffect, useState } from "react";
import { getRequest } from "../utils/api";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

const DashPost = () => {
  const [post, setPost] = useState([]);
  const [showMore, setShowMore] = useState(true);

  const handleGetPost = async () => {
    const data = await getRequest("post?startIndex=0");
    if (data?.success) {
      setPost(data?.data);
      if (data?.data?.length < 9) {
        setShowMore(false);
      }
    }
  };
  const handleShowMore = async () => {
    const start = post.length;

    const data = await getRequest(`post?startIndex=${start}`);
    if (data?.success) {
      setPost((prev): any => [...prev, ...data?.data]);
      if (data?.data?.length < 9) {
        setShowMore(false);
      }
    }
  };
  useEffect(() => {
    handleGetPost();
  }, []);

  return (
    <div className="table-auto mx-auto overflow-x-scroll md:mx:auto p-3 scrollbar scrollbar-thumb-slate-300 scrollbar-track-slate-100 dark:scrollbar-thumb-slate-500 dark:scrollbar-track-slate-700">
      {post?.length > 0 ? (
        <>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {post?.map((item: any, idx) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={idx}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {new Date(item?.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${item?.slug}`}>
                      <img src={item?.image} className="w-20 h-10" />{" "}
                    </Link>{" "}
                  </Table.Cell>
                  <Table.Cell>{item?.title}</Table.Cell>
                  <Table.Cell>{item?.category}</Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/post/${item?.id}`}
                      className="text-teal-500 hover:underline"
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-red-500 font-medium hover:underline cursor-pointer">
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showMore && (
            <button
              className="w-full self-center text-teal-700 "
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p>No posts yet</p>
      )}
    </div>
  );
};
export default DashPost;
