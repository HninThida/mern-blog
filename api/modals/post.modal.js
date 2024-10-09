import mongoose from "mongoose";
const postschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      default: "uncategorized",
    },
    image: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWjPJ_O0S5btxCavEVpCk-Q9YhYUXCrFTmaA&s",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postschema);

export default Post;
