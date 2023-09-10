const db = require("../config/db");

const getFollowing = async (me, person, type) => {
  let following = [];

  return new Promise((resolve, reject) =>
    db.query("SELECT * FROM Users WHERE username = ?", me, (err, _user) => {
      if (err) {
        console.log(err);
      }

      if (_user[0].following) {
        following.push(...JSON.parse(_user[0].following));
      }

      if (type === "+") {
        following.push(person);
      } else {
        let _following = following;
        following = _following.filter((p) => p != person);
      }

      resolve(following);
    })
  );
};

const getFollowers = async (person, me, type) => {
  let followers = [];

  return new Promise((resolve, reject) =>
    db.query("SELECT * FROM Users WHERE username = ?", person, (err, _user) => {
      if (err) {
        console.log(err);
      }

      if (_user[0].followers) {
        followers.push(...JSON.parse(_user[0].followers));
      }

      if (type === "+") {
        followers.push(me);
      } else {
        let _followers = followers;
        followers = _followers.filter((p) => p != me);
      }

      resolve(followers);
    })
  );
};

const follow = async (req, res) => {
  const { me, person } = req.body;

  try {
    db.query(
      "UPDATE Users SET following = ? WHERE username = ?",
      [JSON.stringify(await getFollowing(me, person, "+")), me],
      async (err, results) => {
        if (err) {
          console.log(err);
        }

        db.query(
          "UPDATE Users SET followers = ? WHERE username = ?",
          [JSON.stringify(await getFollowers(person, me, "+")), person],
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

const unfollow = async (req, res) => {
  const { me, person } = req.body;

  try {
    db.query(
      "UPDATE Users SET following = ? WHERE username = ?",
      [JSON.stringify(await getFollowing(me, person, "-")), me],
      async (err, results) => {
        if (err) {
          console.log(err);
        }

        db.query(
          "UPDATE Users SET followers = ? WHERE username = ?",
          [JSON.stringify(await getFollowers(person, me, "-")), person],
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
