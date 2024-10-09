import Post from "../modals/post.modal.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) => {
  console.log(req.body, "post contoller");

  if (!req.user?.isAdmin) {
    return next(errorHandler(403, "Not allowed to create post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all requied filelss"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new Post({ ...req.body, slug, userId: req.user.userId });
  try {
    const savePost = await newPost.save();
    return res.status(201).json({ success: true, data: savePost });
  } catch (error) {
    next(error);
  }
};
