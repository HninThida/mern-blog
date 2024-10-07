import User from "../modals/user.modal.js";
import bctyptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(
    !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
  );

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  } else {
    const hashpassword = bctyptjs.hashSync(password, 10);

    const newuser = new User({ username, email, password: hashpassword });

    try {
      await newuser.save();
      res.json("Signup successful");
    } catch (error) {
      next(error);
    }
  }
};

export default signup;
