const express = require("express");
const router = express.Router();

// Getting routes
const { signUp, getUsers, updateUser } = require("./routes/users");
const {
  getItems,
  uploadItem,
  deleteItem,
  updateItem,
} = require("./routes/items");
const {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
} = require("./routes/wishlist");

// Users
router.post("/Users/signUp", signUp);
router.post("/Users/update", updateUser);
router.get("/Users", getUsers);

// Items
router.get("/Items", getItems);
router.post("/Items/upload", uploadItem);
router.post("/Items/delete", deleteItem);
router.post("/Items/update", updateItem);

// Whishlist
router.post("/Wishlist/add", addToWishlist);
router.get("/Wishlist/:userId", getUserWishlist);
router.post("/Wishlist/remove", removeFromWishlist);

module.exports = router;
