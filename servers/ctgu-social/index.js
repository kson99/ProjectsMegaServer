const express = require("express");
const router = express.Router();

// Getting routes
const { postChats, getChats } = require("./routes/chats");
const { login, register, getUser, getUsers } = require("./routes/users");
const { sendMessage, getMessages } = require("./routes/message");
const { follow, unfollow } = require("./routes/follows");
const {
  upload,
  getUploads,
  likeUpload,
  unlikeUpload,
  comment,
  uploadProPic,
  deletePost,
} = require("./routes/upload");

// Users
router.post("/user/login", login);
router.post("/user/register", register);
router.get("/user/byUser/:username", getUser);
router.get("/user", getUsers);

// Chats
router.post("/chat", postChats);
router.get("/chat", getChats);

//Upload
router.post("/upload", upload);
router.get("/upload", getUploads);
router.post("/upload/like", likeUpload);
router.post("/upload/unlike", unlikeUpload);
router.post("/upload/proPic", uploadProPic);
router.post("/upload/delete", deletePost);
router.post("/upload/comment", comment);

// Messages
router.post("/message", sendMessage);
router.get("/message", getMessages);

// Follows
router.post("/follow", follow);
router.post("/unfollow", unfollow);

module.exports = router;
