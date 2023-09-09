const db = require("../config/db");

const getFollowing = (me) => {
  let following = [];

  db.query("SELECT * FROM Users WHERE username = ?", me, (err, _user) => {
    if (err) {
      console.log(err);
    }

    following = _user.following != null && JSON.parse(_user.following);
  });

  return following;
};

const getFollowers = (person) => {
  let followers = [];

  db.query("SELECT * FROM Users WHERE username = ?", person, (err, _user) => {
    if (err) {
      console.log(err);
    }

    followers = _user.followers != null && JSON.parse(_user.followers);
  });

  return followers;
};

const follow = (req, res) => {
  const { me, person } = req.body;

  console.log(getFollowing(me));

  try {
    db.query(
      "UPDATE Users SET following = ? WHERE username = ?",
      [JSON.stringify([...getFollowing(me), person]), me],
      (err, results) => {
        if (err) {
          console.log(err);
        }

        db.query(
          "UPDATE Users SET followers = ? WHERE username = ?",
          [JSON.stringify([...getFollowers(person), me]), person],
          (err, results1) => {
            if (err) {
              console.log(err);
            }

            res.send({ results, results1 });
          }
        );
      }
    );
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

const unfollow = (req, res) => {
  const { me, person } = req.body;

  try {
    db.query(
      "UPDATE Users SET following = ? WHERE username = ?",
      [JSON.stringify([...getFollowing(me).filter((p) => p != person)]), me],
      (err, results) => {
        if (err) {
          console.log(err);
        }

        db.query(
          "UPDATE Users SET followers = ? WHERE username = ?",
          [
            JSON.stringify([...getFollowers(person).filter((p) => p != me)]),
            person,
          ],
          (err, results1) => {
            if (err) {
              console.log(err);
            }

            res.send({ results, results1 });
          }
        );
      }
    );
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

module.exports = { follow, unfollow };
