const db = require("../config/db");

// Getting a collection of all the items
const getItems = (req, res) => {
  try {
    db.query("SELECT * FROM Items ORDER BY id DESC", (err, results) => {
      if (err) {
        console.error("Error exec MySQL query: ", err);
      }

      res.json(results);
    });
  } catch (error) {
    res.json({ error: err.message, message: "failed!" });
  }
};

//Uploading a new item
const uploadItem = (req, res) => {
  const { name, category, subCategory, images, description, price, owner, itemId } =
    req.body;
  const timestamp = Date.now();

  try {
    db.query(
      "INSERT INTO Items (category, subCategory, description, images, itemId, name, owner, price, timestamp) VALUES (?, ?, ?, ?, ? ,? , ? , ?, ?)",
      [category, subCategory, description, images, itemId, name, owner, price, timestamp],
      (err, results) => {
        if (err) {
          console.error("Error exec MySQL query: ", err);
        }

        res.send(results);
      }
    );
  } catch (error) {
    res.json({ error: err.message, message: "failed!" });
  }
};

// Deleting an item from the collection
const deleteItem = (req, res) => {
  const { itemId } = req.body;

  try {
    db.query(`DELETE FROM Items WHERE itemId = ?`, itemId, (err, results) => {
      if (err) {
        console.error("Error exec MySQL query: ", err);
      }

      res.json(results);
    });
  } catch (error) {
    res.json({ error: err.message, message: "failed!" });
  }
};

// Updating elements of an item in th colloction
const updateItem = (req, res) => {
  const { name, price, images, description, itemId, category, subCategory } = req.body;

  try {
    db.query(
      `UPDATE Items SET ? WHERE itemId = ?`,
      [
        {
          name,
          price,
          images,
          description,
          category,
          subCategory
        },
        itemId,
      ],
      (err, results) => {
        if (err) {
          console.error("Error exec MySQL query: ", err);
        }

        res.json(results);
      }
    );
  } catch (error) {
    res.json({ error: err.message, message: "failed!" });
  }
};

module.exports = { getItems, uploadItem, deleteItem, updateItem };
