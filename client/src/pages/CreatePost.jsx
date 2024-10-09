import { Select, TextInput, FileInput, Button, Alert } from "flowbite-react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { postRequest } from "../utils/api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishErrror, setPublishErrror] = useState(null);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUploadImage = async () => {
    console.log(file);

    try {
      if (!file) {
        setImageFileUploadError("Please select image first");
        return;
      }
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setImageFileUploadProgress(progress.toFixed(0));
        },
        () => {
          setImageFileUploadError(
            "Could not upload image (File must be less than 2MB)"
          );
          setImageFileUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUploadProgress(null);
            setImageFileUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageFileUploadError(error.message);
      setImageFileUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const data = await postRequest(`post/create`, formData);
    if (data.success) {
      navigate(`/post/${data?.data?.slug}`);
      setPublishErrror(data?.message);
    } else {
      setPublishErrror(data.message);
    }
  };

  return (
    <div className="p-e max-w-3xl min-h-screen mx-auto">
      <h1 className="text-center font-semibold text-3xl my-7">Create a post</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="Text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={handleChange}
          />
          <Select id="category" onChange={handleChange}>
            <option value="uncategorized">Select category</option>
            <option value="javascript">JavaScript</option>
            <option value="flutter">flutter</option>
            <option value="nextjs">Nextjs</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-dotted  border-4 border-gray-200 p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            disabled={imageFileUploadProgress}
            pill
            onClick={handleUploadImage}
          >
            {imageFileUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageFileUploadProgress || 0}
                  text={`${imageFileUploadProgress}%`}
                />
              </div>
            ) : (
              "Upload image"
            )}
          </Button>
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          placeholder="Write something"
          theme="snow"
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button gradientDuoTone="purpleToPink" type="submit" className="mb-10">
          Publish
        </Button>
        {publishErrror && (
          <Alert color="failure" className="my-5">
            {publishErrror}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
