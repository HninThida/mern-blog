import dotenv from "dotenv";
import exprees from "express";
import mongoose from "mongoose";

dotenv.config();

mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("Complented"))
  .catch((err) => console.log(err));

const app = exprees();

app.listen(3000, () => {
  console.log("Server is running on 3000 !!");
});
