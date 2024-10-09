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

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleChange = () => {};

  const handleUploadImage = async () => {
    console.log(file);

    try {
      if (!file) {
        setImageFileUploadError("Please select image first");
        return;
      } else {
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
          (error) => {
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
      }
    } catch (error) {
      setImageFileUploadError(error.message);
      setImageFileUploadProgress(null);
      console.log(error);
    }
  };
  return (
    <div className="p-e max-w-3xl min-h-screen mx-auto">
      <h1 className="text-center font-semibold text-3xl my-7">Create a post</h1>
      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="Text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={handleChange}
          />
          <Select>
            <option value="uncategories">Select category</option>
            <option value="javascript">JavaScript</option>
            <option value="flutter">flutter</option>
            <option value="nextjs">Nextjs</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-dotted  border-4 border-gray-200 p-3">
          <FileInput
            type="file"
            accept="image/*"
            onClick={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            pill
            onClick={handleUploadImage}
          >
            {imageFileUploadProgress ? (
              <div className="w-15 h-15">
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
        {formData?.image && <img src={formData?.image} alt="Images"></img>}
        <ReactQuill
          placeholder="Write something"
          theme="snow"
          className="h-72 mb-12"
          required
        />
        <Button gradientDuoTone="purpleToPink" type="submit" className="mb-10">
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
