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

const likeUpload = (req, res) => {
  const { userLiking, postId } = req.body;

  try {
    db.query(
      "INSERT INTO Likes (userLiking, postId) VALUES (?, ?)",
      [userLiking, postId],
      (err, results) => {
        if (err) {
          console.log(err);
        }

        if (results !== undefined || results !== null) {
          db.query(
            "UPDATE Uploads SET likesNo = likesNo + 1 WHERE id = ?",
            postId,
            (err2, results2) => {
              res.send(results2);
            }
          );
        }
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

module.exports = { upload, getUploads, likeUpload, uploadProPic, deletePost };
