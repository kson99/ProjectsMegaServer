const db = require("../config/db");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const stNumber = req.body.stNumber;
  const password = req.body.password;

  try {
    db.query(
      "SELECT * FROM Users WHERE stNumber = ?",
      stNumber,
      (err, users) => {
        if (err) {
          console.log(err.message);
        }

        if (users.length > 0) {
          if (password == users[0].password) {
            const user = {
              ...user[0],
              loggedIn: true,
            };

            const token = jwt.sign(
              { id: user.userId },
              process.env.CTGU_JWT_TOKEN
            );
            delete user.password;

            res.status(200).json({ token, user });
          } else {
            res.status(400).json({
              loggedIn: false,
              message: "! Wrong username or password",
            });
          }
        } else {
          res
            .status(400)
            .json({ loggeIn: false, message: "! User doesn't exist" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const register = (req, res) => {
  const username = req.body.username;
  const stNumber = req.body.stNumber;
  const college = req.body.college;
  const course = req.body.course;
  const password = req.body.password;
  const userId = req.body.userId;

  db.query(
    "INSERT INTO Users (username, stNumber, college, course, password, userId) VALUES (?, ?, ?, ?, ?, ?)",
    [username, stNumber, college, course, password, userId],
    (err, results) => {
      if (err) {
        console.log(err);
      }

      res.send(results);
    }
  );
};

const getUser = (req, res) => {
  const username = req.params.username;

  db.query(
    "SELECT * FROM Users WHERE username = ?",
    username,
    (err, results) => {
      if (err) {
        console.log(err);
      }

      res.send(results);
    }
  );
};

const getUsers = (req, res) => {
  db.query("SELECT * FROM Users", (err, results) => {
    if (err) {
      console.log(err);
    }

    res.send(results);
  });
};

module.exports = { login, register, getUser, getUsers };
