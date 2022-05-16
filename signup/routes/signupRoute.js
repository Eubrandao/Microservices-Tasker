import express from "express";
import mongoose from "mongoose";
import Signup from "../signup.js";

const router = express.Router();

router
  .get("/users", Signup.listUsers)
  .get("/users/:id", Signup.listUser)
  .post("/users", Signup.newUser)
  .put("/users/:id", Signup.userUpdate)
  .delete("/users/:id", Signup.userDelete);

export default router;
