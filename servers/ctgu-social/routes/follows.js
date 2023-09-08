const db = require("../config/db");

const follow = (req, res) => {
  const follower = req.body.follower;
  const following = req.body.following;

  db.query(
    "INSERT INTO Follows (follower, following) VALUES (?, ?)",
    [follower, following],
    (err, results) => {
      if (err) {
        console.log(err);
      }

      res.send(results);
    }
  );
};

const getFollowers = (req, res) => {
  const username = req.query.foo;

  db.query(
    "SELECT * FROM Follows WHERE follower = ?",
    username,
    (err, results) => {
      if (err) {
        console.log(err);
      }

      res.send(results);
    }
  );
};

const getFollowing = (req, res) => {
  const username = req.query.foo;

  db.query(
    "SELECT * FROM Follows WHERE following = ?",
    username,
    (err, results) => {
      if (err) {
        console.log(err);
      }

      res.send(results);
    }
  );
};

module.exports = { follow, getFollowers, getFollowing };
