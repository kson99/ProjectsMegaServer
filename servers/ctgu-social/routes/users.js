const db = require("../config/db");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { stNumber, password } = req.body;

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
              ...users[0],
              loggedIn: true,
            };

            const token = jwt.sign(
              { id: user.userId },
              process.env.CTGU_JWT_TOKEN
            );
            delete user.password;

            res.json({ token, user });
          } else {
            res.json({
              loggedIn: false,
              message: "! Wrong username or password",
            });
          }
        } else {
          res.json({ loggeIn: false, message: "! User doesn't exist" });
        }
      }
    );
  } catch (error) {
    res.json({ error: error.message });
  }
};

const register = (req, res) => {
  const { username, stNumber, college, course, nationality, password, userId } =
    req.body;

  db.query(
    "INSERT INTO Users (username, stNumber, college, course, nationality, password, userId) VALUES (?, ?, ?, ?, ?, ?)",
    [username, stNumber, college, course, nationality, password, userId],
    (err, results) => {
      if (err) {
        console.log(err);
      }

      res.send(results);
    }
  );
};

const getUser = (req, res) => {
  const { username } = req.params;

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
