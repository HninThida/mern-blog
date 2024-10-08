import { now } from "mongoose";
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
export const updatePost = async (req, res, next) => {
  if (!req.user?.isAdmin) {
    return next(errorHandler(403, "Not allowed to update post"));
  }
  try {
    const updatePosts = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    return res.status(201).json({ success: true, data: updatePosts });
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    return res.status(200).json({
      success: true,
      data: posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  if (!req.user?.isAdmin || req.user?._id !== req.params.userId) {
    return next(errorHandler(400, "Not allowed to delete post"));
  }
  try {
    await Post.findByIdAndDelete(req.params?.postId);
    return res.status(200).json({
      success: true,
      message: "Post has been deleted",
    });
  } catch (error) {}
};
