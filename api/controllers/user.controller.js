import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../modals/user.modal.js";

export const test = (req, res) => {
  res.json({ message: "Api test" });
};
export const getusers = async (req, res, next) => {
  if (!req.user?.isAdmin) {
    return next(errorHandler(403, "Not allowed to see users"));
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const users = await User.find()
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const userWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    return res.status(200).json({
      success: true,
      data: userWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};
export const getuserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const { password, ...rest } = user._doc;
    return res.status(200).json({ success: true, data: rest });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.userId) {
    return next(errorHandler("400", "UnAuthorized user"));
  }
  if (req.body.password) {
    console.log("fksjdflkjkl");

    if (req.body.password.length < 6) {
      return next(
        errorHandler("400", "Password must be at least 6 characters")
      );
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username > 20) {
      return next(
        errorHandler("400", "Username must be at between 7 and 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler("400", "Username cannot contatin spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler("400", "Username must be lower case"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]*$/)) {
      return next(
        errorHandler("400", "Username can only conatain character and number")
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          photourl: req.body.photourl,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    return res.status(200).json({ success: true, data: rest });
  } catch (error) {}
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id != req.params.userId) {
    return next(
      errorHandler("403", "You are not allow to delete this account")
    );
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    return res
      .status(200)
      .json({ success: true, message: "User has been deleted" });
  } catch (error) {}
};
export const singOut = async (req, res, next) => {
  try {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ success: true, message: "User has been signout" });
  } catch (error) {}
};
