import { useEffect, useState } from "react";
import { deleteRequest, getRequest } from "../utils/api";
import { Button, Modal, Table } from "flowbite-react";
import { HiOutlineExclamation } from "react-icons/hi";

const DashboardComments = () => {
  const [comment, setcomment] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deletecommentId, setdeletecommentId] = useState(null);

  const handleGetcomment = async () => {
    const data = await getRequest("comment/comments");
    if (data?.success) {
      setcomment(data?.data);
      if (data?.data?.length < 9) {
        setShowMore(false);
      }
    }
  };
  const handleShowMore = async () => {
    const start = comment.length;
    const data = await getRequest(`comment/comments?startIndex=${start}`);
    if (data?.success) {
      setcomment((prev) => [...prev, ...data.data]);
      if (data?.data?.length < 9) {
        setShowMore(false);
      }
    }
  };
  useEffect(() => {
    handleGetcomment();
  }, []);

  const handleDeletecomment = async () => {
    setShowModal(false);
    try {
      const data = await deleteRequest(
        `comment/delete-comment/${deletecommentId}`
      );
      if (data.success) {
        setcomment((prev) =>
          prev.filter((comment) => comment._id !== deletecommentId)
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
      {comment?.length > 0 ? (
        <>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Content</Table.HeadCell>
              <Table.HeadCell>Number of like</Table.HeadCell>
              <Table.HeadCell>Post</Table.HeadCell>
              <Table.HeadCell>User</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {comment?.map((item, idx) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={idx}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {new Date(item?.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{item?.content}</Table.Cell>
                  <Table.Cell>{item?.numberOfLikes}</Table.Cell>
                  <Table.Cell>{item?.postId}</Table.Cell>
                  <Table.Cell>{item?.user?.username}</Table.Cell>
                  <Table.Cell>
                    <span
                      className="text-red-500 font-medium hover:underline cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setdeletecommentId(item?._id);
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
        <p>No comments yet</p>
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
              Are you Sure you want to delete this comment ?{" "}
            </h3>
          </div>
          <div className="flex justify-center gap-5">
            <Button color="failure" onClick={handleDeletecomment}>
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
export default DashboardComments;
