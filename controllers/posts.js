import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

const router = express.Router();
// ========================================================
//1
export const getPosts = async (req, res) => {
  try {
    // postMessage is from schema in model
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// ========================================================
//2
export const getPost = async (req, res) => {
  // { id } from _id routers
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// ========================================================
//3
export const createPost = async (req, res) => {
  const post = req.body;
  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
// ========================================================
//4
export const deletePost = async (req, res) => {
  const { id } = req.params;
  // checking if id is not valid in mongoose
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  // otherwise
  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully." });
};
export default router;
// we create the function and send it to route
// step 1
