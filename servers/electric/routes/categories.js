const express = require("express");
const categoriesModel = require("../models/categories");
const router = express.Router();
const { MongoClient } = require("mongodb");
const mongo = require("mongodb");

const client = new MongoClient(process.env.ATLAS_URI);

const getCategories = async (req, res) => {
  try {
    const data = await client
      .db("Electric-E-commerse")
      .collection("categories")
      .find()
      .toArray();

    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const uploadCategory = async (req, res) => {
  const { name, parent, properties } = req.body;
  const categories = new categoriesModel({ name, parent, properties });

  try {
    await categories.save();
    res.send(200);
  } catch (error) {
    console.log(err);
  }
};

const updateCategory = async (req, res) => {
  const { name, parent, properties, id, userId } = req.body;
  const query = { _id: new mongo.ObjectId(id) };

  try {
    await client
      .db("Electric-E-commerse")
      .collection("categories")
      .updateOne(query, { $set: { name, parent, properties } });

    res.sendStatus(200);
  } catch (error) {
    res.json({ error: error.message, message: "failed!" });
  }
};

const deleteCategory = async (req, res) => {
  const { id, userId } = req.body;
  const query = { _id: new mongo.ObjectId(id) };

  try {
    await client
      .db("Electric-E-commerse")
      .collection("categories")
      .deleteOne(query);

    res.sendStatus(200);
  } catch (error) {
    res.json({ error: error.message, message: "failed!" });
  }
};

module.exports = {
  getCategories,
  uploadCategory,
  updateCategory,
  deleteCategory,
};
