import React, { useEffect, useState } from "react";
import { deleteRequest, getRequest } from "../utils/api";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamation } from "react-icons/hi";

const DashPost = () => {
  const [post, setPost] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deletePostId, setdeletePostId] = useState(null);

  const handleGetPost = async () => {
    const data = await getRequest("post?");
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

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const data = await deleteRequest(`post/delete/${deletePostId}`);
      if (data.success) {
        setPost((prev): any =>
          prev.filter((post: any) => post._id !== deletePostId)
        );
      } else {
        console.log(data?.messsage);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                    <span
                      className="text-red-500 font-medium hover:underline cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setdeletePostId(item?._id);
                      }}
                    >
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
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamation className="h-16 w-16 text-gray-400 dark:text-gray-200 mx-auto mb-4" />
            <h3 className="mb-5 text-gray-500 dark:text-gray-200">
              {" "}
              Are you Sure you want to delete this post ?{" "}
            </h3>
          </div>
          <div className="flex justify-center gap-5">
            <Button color="failure" onClick={handleDeletePost}>
              Sure
            </Button>
            <Button color="gray" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default DashPost;
