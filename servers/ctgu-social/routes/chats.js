const db = require("../config/db");

const postChats = (req, res) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;

  db.query(
    "INSERT IGNORE INTO Chats (sender, receiver, chatName) VALUES (?, ?, ?)",
    [sender, receiver, receiver],
    (err, results) => {
      if (err) {
        console.log(err);
      }

      res.send(results);
    }
  );
};

const getChats = (req, res) => {
  const username = req.query.foo;
  const username1 = req.query.foo;

  db.query(
    "SELECT * FROM Chats WHERE receiver = ? OR sender = ?",
    [username, username1],
    (err, results) => {
      if (err) {
        console.log(err);
      }

      res.send(results);
    }
  );
};

module.exports = { getChats, postChats };
