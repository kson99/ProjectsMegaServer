const db = require("../config/db");

const sendMessage = (req, res) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  const message = req.body.message;

  db.query(
    "INSERT INTO Messages (sender, receiver, message) VALUES (?, ?, ?)",
    [sender, receiver, message],
    (err, results) => {
      if (err) {
        console.log(err);
      }

      res.send(results);
    }
  );
};

const getMessages = (req, res) => {
  const username = req.query.foo;
  const username1 = req.query.foo;

  db.query(
    "SELECT * FROM Messages WHERE receiver = ? OR sender = ? ORDER BY id ASC",
    [username, username1],
    (err, results) => {
      if (err) {
        console.log(err);
      }

      res.send(results);
    }
  );
};

module.exports = { sendMessage, getMessages };
