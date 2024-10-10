import Comment from "../modals/comment.modal.js";
import User from "../modals/user.modal.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const { postId, userId, content } = req.body;
    if (userId !== req.user.id) {
      return next(errorHandler(403, "Not allowed to create comment"));
    }
    const newComment = new Comment({
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
export const getPostComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ success: true, data: comments });
  } catch (error) {
    next(error);
  }
};

export const getAllComments = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const comments = await Comment.find()
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const processedComments = await Promise.all(
      comments.map(async (comment) => {
        const user = await User.findById(comment.userId);

        if (user) {
          return {
            ...comment._doc, // Copy comment fields
            user, // Attach the user object
          };
        } else {
          return {
            ...comment._doc, // Copy comment fields
            userId: comment.userId, // Keep userId as is
          };
        }
      })
    );
    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    return res.status(200).json({
      success: true,
      data: processedComments,
      totalComments,
      lastMonthComments,
    });
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId, {});
    if (!comment) {
      return next(errorHandler(400, "Comment not found"));
    }
    const userIndex = comment.likes?.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      if (comment.numberOfLikes > 0) {
        comment.numberOfLikes -= 1;
      }
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    return res.status(200).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId, {});
    if (!comment) {
      return next(errorHandler(400, "Comment not found"));
    }

    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed to edit"));
    }
    const updateComments = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      {
        new: true,
      }
    );
    await updateComments.save();
    return res.status(200).json({ success: true, data: updateComments });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId, {});
    if (!comment) {
      return next(errorHandler(400, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed to delete comment"));
    }
    await Comment.findByIdAndDelete(req.params?.commentId);
    return res.status(200).json({
      success: true,
      message: "Comment has been deleted",
    });
  } catch (error) {}
};
