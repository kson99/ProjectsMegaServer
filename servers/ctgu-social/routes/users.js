const db = require("../config/db");

const login = (req, res) => {
  const stNumber = req.body.stNumber;
  const password = req.body.password;

  db.query(
    "SELECT * FROM Users WHERE stNumber = ?",
    stNumber,
    (err, results) => {
      if (err) {
        console.log(err);
      }

      if (results.length > 0) {
        console.log(results);
        if (password == results[0].password) {
          res.json({
            loggedIn: true,
            stNumber: stNumber,
            userId: results[0].userId,
            college: results[0].college,
            username: results[0].username,
          });
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
