const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
dotenv.config();

const ctguRoute = require("./servers/ctgu-social/index");
const landashaRoute = require("./servers/landasha/index");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));

app.use("/ctgu-social", ctguRoute);
app.use("/landasha", landashaRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
