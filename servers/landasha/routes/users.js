const db = require("../config/db");

// register / Signup
const signUp = (req, res) => {
  const { userUid, imageUrl, username, shopName, location, phoneNo } = req.body;

  try {
    db.query(
      "INSERT INTO Users (userUid, imageUrl, username, shopName, location, phoneNo) VALUES (?, ?, ?, ?, ?, ?)",
      [userUid, imageUrl, username, shopName, location, phoneNo],
      (err, result) => {
        if (err) {
          console.error("Error exec MySQL query: ", err);
        }

        res.json(result);
      }
    );
  } catch (error) {
    res.send({ status: "failed", error: error });
  }
};

// Update user imageUrl
const updateImageUrl = (req, res) => {
  const { imageUrl, userUid } = req.body;

  try {
    db.query(
      "UPDATE Users SET ? Where userUid = ?",
      [{ imageUrl }, userUid],
      (err, result) => {
        if (err) {
          console.error("Error exec MySQL query: ", err);
        }

        res.json(result);
      }
    );
  } catch (error) {
    res.send({ status: "failed", error: error });
  }
};

// get users
const getUsers = (req, res) => {
  try {
    db.query("SELECT * FROM Users", (err, users) => {
      if (err) {
        console.error("Error exec MySQL query: ", err);
      }

      res.send(users);
    });
  } catch (error) {
    res.send({ status: "failed", error: error });
  }
};

// Update specific user information
const updateUser = (req, res) => {
  const { username, imageUrl, phoneNo, location, shopName, userUid } = req.body;

  try {
    db.query(
      "UPDATE Users SET ? WHERE userUid = ?",
      [
        {
          username,
          imageUrl,
          phoneNo,
          location,
          shopName,
        },
        userUid,
      ],
      (err, result) => {
        if (err) {
          console.error("Error exec MySQL query: ", err);
        }

        res.json(result);
      }
    );
  } catch (error) {
    res.send({ status: "failed", error: error });
  }
};

module.exports = { signUp, getUsers, updateUser, updateImageUrl };
