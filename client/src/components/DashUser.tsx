import React, { useEffect, useState } from "react";
import { deleteRequest, getRequest } from "../utils/api";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiCheck, HiOutlineExclamation, HiX } from "react-icons/hi";

const DashUser = () => {
  const [user, setuser] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setdeleteUserId] = useState(null);

  const handleGetUser = async () => {
    const data = await getRequest("user/get-users");
    if (data?.success) {
      setuser(data?.data);
      if (data?.data?.length < 9) {
        setShowMore(false);
      }
    }
  };
  const handleShowMore = async () => {
    const start = user.length;

    const data = await getRequest(`user/get-users?startIndex=${start}`);
    if (data?.success) {
      setuser((prev): any => [...prev, ...data?.data]);
      if (data?.data?.length < 9) {
        setShowMore(false);
      }
    }
  };
  useEffect(() => {
    handleGetUser();
  }, []);

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const data = await deleteRequest(`user/delete/${deleteUserId}`);
      if (data.success) {
        setuser((prev): any =>
          prev.filter((user: any) => user._id !== deleteUserId)
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
      {user?.length > 0 ? (
        <>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Date CReated</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {user?.map((item: any, idx) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={idx}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {new Date(item?.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={item?.photourl}
                      className="w-10 h-10 object-cover rounded-full"
                    />{" "}
                  </Table.Cell>
                  <Table.Cell>{item?.username}</Table.Cell>
                  <Table.Cell>
                    <span className="self-center">
                      {item?.isAdmin ? (
                        <HiCheck color="green" />
                      ) : (
                        <HiX color="text-rd" />
                      )}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <span
                      className="text-red-500 font-medium hover:underline cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setdeleteUserId(item?._id);
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
        <p>No Users yet</p>
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
              Are you Sure you want to delete this user ?{" "}
            </h3>
          </div>
          <div className="flex justify-center gap-5">
            <Button color="failure" onClick={handleDeleteUser}>
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
export default DashUser;
