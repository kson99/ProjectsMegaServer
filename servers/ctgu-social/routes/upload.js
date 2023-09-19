const db = require("../config/db");

const upload = (req, res) => {
  const { caption, image, username } = req.body;

  try {
    db.query(
      "INSERT INTO Uploads (caption, image, username) VALUES (?, ?, ?)",
      [caption, image, username],
      (err, results) => {
        if (err) {
          console.log(err);
        }

        // res.send(results);
        db.query(
          "SELECT * FROM Users WHERE username = ?",
          username,
          (err2, results2) => {
            console.log.apply(err2);
            db.query(
              "UPDATE Uploads SET profilePicture = ? WHERE username = ?",
              [results2[0].profilePicture, username],
              (err3, results3) => {
                console.log(err3);
                res.send(results3);
              }
            );
          }
        );
      }
    );
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

const getUploads = (req, res) => {
  try {
    db.query("SELECT * FROM Uploads ORDER BY id DESC", (err, results) => {
      if (err) {
        console.log(err);
      }

      res.send(results);
    });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

const getLikes = async (person, id, type) => {
  let likes = [];

  return new Promise((resolve, reject) =>
    db.query("SELECT * FROM Uploads WHERE id = ?", id, (err, post) => {
      if (err) {
        console.log(err);
      }

      if (post[0].likes) {
        likes.push(...eval(post[0].likes));
      }

      if (type === "+") {
        likes.push(person);
      } else {
        let _likes = likes;
        likes = _likes.filter((p) => p != person);
      }

      resolve(likes);
    })
  );
};

const likeUpload = async (req, res) => {
  const { person, postId } = req.body;

  try {
    db.query(
      "UPDATE Uploads SET likes = ? WHERE id = ?",
      [JSON.stringify(await getLikes(person, postId, "+")), postId],
      (err, result) => {
        if (err) {
          res.send(err);
        }

        res.send(result);
      }
    );
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

const unlikeUpload = async (req, res) => {
  const { person, postId } = req.body;

  try {
    db.query(
      "UPDATE Uploads SET likes = ? WHERE id = ?",
      [JSON.stringify(await getLikes(person, postId, "-")), postId],
      (err, result) => {
        if (err) {
          res.send(err);
        }

        res.send(result);
      }
    );
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

const getComments = (person, comment, id) => {
  let comments = [];

  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM Uploads WHERE id = ?", id, (err, post) => {
      if (err) {
        console.log(err);
      }

      if (post[0].comments) {
        comments.push(...eval(post[0].comments));
      }

      comments.push({ username: person, comment: comment });

      resolve(comments);
    });
  });
};

const comment = async (req, res) => {
  const { person, comment, postId } = req.body;

  try {
    db.query(
      "UPDATE Uploads SET comments = ? WHERE id = ?",
      [JSON.stringify(await getComments(person, comment, postId)), postId],
      (err, result) => {
        if (err) {
          res.send(err);
        }

        res.send(result);
      }
    );
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

const uploadProPic = (req, res) => {
  const { image, username } = req.body;

  try {
    db.query(
      "UPDATE Users SET profilePicture = ? WHERE username = ?",
      [image, username],
      (err, results) => {
        if (err) {
          console.log(err);
        }

        db.query(
          "UPDATE Uploads SET profilePicture = ? WHERE username = ?",
          [image, username],
          (err2, results2) => {
            if (err) {
              console.log(err2);
            }

            res.send(results2);
          }
        );
      }
    );
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

const deletePost = (req, res) => {
  const { postId } = req.body;

  try {
    db.query("DELETE FROM Uploads WHERE id = ?", postId, (err, results) => {
      if (err) {
        console.log(err);
      }

      res.send(results);
    });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

module.exports = {
  upload,
  getUploads,
  likeUpload,
  unlikeUpload,
  comment,
  uploadProPic,
  deletePost,
};
