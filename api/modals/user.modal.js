import mongoose, { Schema } from "mongoose";
const userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    photourl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userschema);

export default User;
