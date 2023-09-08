const db = require("../config/db");

// add item to wishlist
const addToWishlist = (req, res) => {
  const itemId = req.body.itemId;
  const wishlister = req.body.wishlister;

  db.query(
    "INSERT INTO Wishlist (itemId, wishlister) VALUES (?, ?)",
    [itemId, wishlister],
    (err, result) => {
      if (err) {
        console.error("Error exec MySQL query: ", err);
        return;
      } else {
        res.json(result);
      }
    }
  );
};

// geting a list of user specific wishlist items
const getUserWishlist = (req, res) => {
  const userId = req.params.userId;

  db.query(
    "SELECT * FROM Wishlist WHERE wishlister = ?",
    userId,
    (err, result) => {
      if (err) {
        console.error("Error exec MySQL query: ", err);
        return;
      } else {
        res.json(result);
      }
    }
  );
};

// removing item from wishlist
const removeFromWishlist = (req, res) => {
  const itemId = req.body.itemId;
  const wishlister = req.body.wishlister;

  db.query(
    "DELETE FROM Wishlist WHERE itemId = ? AND wishlister = ?",
    [itemId, wishlister],
    (err, result) => {
      if (err) {
        console.error("Error exec MySQL query: ", err);
        return;
      } else {
        res.json(result);
      }
    }
  );
};

module.exports = { addToWishlist, getUserWishlist, removeFromWishlist };
