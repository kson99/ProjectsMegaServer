const db = require("../config/db");

// Getting a collection of all the items
const getItems = (req, res) => {
  db.query("SELECT * FROM Items ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("Error exec MySQL query: ", err);
    }

    res.json(results);
  });
};

//Uploading a new item
const uploadItem = (req, res) => {
  const { name, category, images, description, price, owner, itemId } =
    req.body;
  const timestamp = Date.now();

  db.query(
    "INSERT INTO Items (category, description, images, itemId, name, owner, price, timestamp) VALUES (?, ?, ?, ? ,? , ? , ?, ?)",
    [category, description, images, itemId, name, owner, price, timestamp],
    (err, results) => {
      if (err) {
        console.error("Error exec MySQL query: ", err);
      }

      res.send(results);
    }
  );
};

// Deleting an item from the collection
const deleteItem = (req, res) => {
  const itemId = req.body.itemId;

  db.query(`DELETE FROM Items WHERE itemId = ?`, itemId, (err, results) => {
    if (err) {
      console.error("Error exec MySQL query: ", err);
    }

    res.json(results);
  });
};

// Updating elements of an item in th colloction
const updateItem = (req, res) => {
  const data = req.body.itemData;

  db.query(
    `UPDATE Items SET ? WHERE itemId = ?`,
    [
      {
        name: data.name,
        price: data.price,
        imageUrl: data.imageUrl,
        description: data.description,
      },
      data.itemId,
    ],
    (err, results) => {
      if (err) {
        console.error("Error exec MySQL query: ", err);
      }

      res.json(results);
    }
  );
};

module.exports = { getItems, uploadItem, deleteItem, updateItem };
