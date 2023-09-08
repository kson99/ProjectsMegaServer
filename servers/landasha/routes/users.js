const db = require("../config/db");

const signUp = (req, res) => {
  const entries = req.body.formEntries;

  db.query(
    "INSERT INTO Users (userUid, imageUrl, username, location, phoneNo) VALUES (?, ?, ?, ?, ?)",
    [
      entries.userUid,
      entries.imageUrl,
      entries.username,
      entries.location,
      entries.phoneNo,
    ],
    (err, result) => {
      if (err) {
        console.error("Error exec MySQL query: ", err);
      }

      res.json(result);
    }
  );
};

// get user information with userUid
const getUser = (req, res) => {
  const userUid = req.params.uid;

  db.query("SELECT * FROM Users WHERE userUid = ?", userUid, (err, result) => {
    if (err) {
      console.error("Error exec MySQL query: ", err);
    }

    res.json(result);
  });
};

// Update specific user information
const updateUser = (req, res) => {
  const data = req.body.userData;

  db.query(
    `UPDATE Users SET ? WHERE userUid = ?`,
    [
      {
        username: data.username,
        imageUrl: data.imageUrl,
        phoneNo: data.phoneNo,
        location: data.location,
      },
      data.userUid,
    ],
    (err, result) => {
      if (err) {
        console.error("Error exec MySQL query: ", err);
      }

      res.json(result);
    }
  );
};

module.exports = { signUp, getUser, updateUser };
