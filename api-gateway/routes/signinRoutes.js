import express from "express";
import Signin from "../signin.js";

const router = express.Router();

router.post("/authenticate", Signin.signin);

export default router;
