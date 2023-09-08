const db = require("../config/db");

const upload = (req, res) => {
  const caption = req.body.caption;
  const image = req.body.image;
  const username = req.body.username;

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
};

const getUploads = (req, res) => {
  db.query("SELECT * FROM Uploads ORDER BY id DESC", (err, results) => {
    if (err) {
      console.log(err);
    }

    res.send(results);
  });
};

const likeUpload = (req, res) => {
  const userLiking = req.body.userLiking;
  const postId = req.body.postId;

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
};

const uploadProPic = (req, res) => {
  const image = req.body.image;
  const username = req.body.username;

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
};

module.exports = { upload, getUploads, likeUpload, uploadProPic };
