import Comment from "../modals/comment.modal.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const { postId, userId, content } = req.body;
    if (userId !== req.user.id) {
      return next(errorHandler(403, "Not allowed to create comment"));
    }
    const newComment = await new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    return res.status(201).json({ success: true, data: newComment });
  } catch (error) {
    next(error);
  }
};
