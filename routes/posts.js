import express from "express";
import { getPosts, createPost, deletePost } from "../controllers/posts.js";
const router = express.Router();
import auth from "../middleware/auth.js";
// get post coming from controllers
router.get("/", getPosts);
// auth => to get permisstion from the middleware
router.post("/", auth, createPost);
router.delete("/:id", auth, deletePost);
export default router;
// taking the method name from controllers and send it to the frontend api folder
// step 2
