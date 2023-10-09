const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const mongo = require("mongodb");

const client = new MongoClient(process.env.ATLAS_URI);

const getSettings = async (req, res) => {
  try {
    const data = await client
      .db("Electric-E-commerse")
      .collection("settings")
      .find()
      .toArray();

    res.send(data);
  } catch (error) {
    res.json({ error: error.message, message: "failed!" });
  }
};

const updateSettings = async (req, res) => {
  const { featured1, featured2, shipping, id, userId } = req.body;
  const query = { _id: new mongo.ObjectId(id) };

  try {
    await client
      .db("Electric-E-commerse")
      .collection("settings")
      .updateOne(query, {
        $set: {
          featured1,
          featured2,
          shipping,
        },
      });

    res.sendStatus(200);
  } catch (error) {
    res.json({ error: error.message, message: "failed!" });
  }
};

module.exports = { getSettings, updateSettings };
