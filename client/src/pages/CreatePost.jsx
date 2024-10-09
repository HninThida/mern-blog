import { Select, TextInput, FileInput, Button } from "flowbite-react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const CreatePost = () => {
  const handleChange = () => {};
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
          <FileInput type="file" accept="image/*" />
          <Button type="button" gradientDuoTone="purpleToBlue" size="sm" pill>
            Upload image
          </Button>
        </div>
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
