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

module.exports = { signUp, getUsers, updateUser };
