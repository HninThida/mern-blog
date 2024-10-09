import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  DeleteUserFail,
  DeleteUserStart,
  DeleteUserSuccess,
  SignOutSuccess,
  UserFail,
  UserSuccess,
} from "../redux/user/userSllce";
import { deleteRequest, postRequest, putRequest } from "../utils/api";
import { HiOutlineExclamation } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashProfile() {
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [imagefileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setupdateUserSuccess] = useState(null);
  const [updateUserErrror, setupdateUserErrror] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filePickerRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    setImageFileUploading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, photourl: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (Object.keys(formData)?.length == 0) {
      setImageFileUploadError("No changes made");
      return;
    }
    if (imagefileUploading) {
      setImageFileUploadError("Please image to upload");
      return;
    }
    try {
      const data = await putRequest(`user/update/${currentUser._id}`, formData);
      if (data.success) {
        dispatch(UserSuccess(data?.data));
        setupdateUserSuccess("User profiile updated successfully");
      } else {
        dispatch(UserFail(data.message));
        setupdateUserErrror(data.message);
      }
    } catch (error) {
      dispatch(UserFail(error.message));
    }
  };

  const handleDeleteAccount = async () => {
    setShowModal(false);
    try {
      dispatch(DeleteUserStart());
      const data = await deleteRequest(`user/delete/${currentUser._id}`);
      if (data.success) {
        dispatch(DeleteUserSuccess(data?.message));
      } else {
        dispatch(DeleteUserFail(data?.error));
      }
    } catch (error) {
      dispatch(DeleteUserFail(error?.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const data = await postRequest("user/sign-out");
      if (data.success) {
        dispatch(SignOutSuccess(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.photourl}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          onChange={handleChange}
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          onChange={handleChange}
          defaultValue={currentUser.email}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading || imagefileUploading}
        >
          {loading ? "Loading ..." : "Update"}
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={() => setShowModal(true)}>
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-3">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserErrror && (
        <Alert className="mt-3" color="failure">
          {updateUserErrror}
        </Alert>
      )}
      {currentUser.isAdmin && (
        <Link to="/create-post">
          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            className="w-full mt-4"
          >
            Create a post
          </Button>
        </Link>
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
              Are you Sure you want to delete this account ?{" "}
            </h3>
          </div>
          <div className="flex justify-center gap-5">
            <Button color="failure" onClick={handleDeleteAccount}>
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
}
