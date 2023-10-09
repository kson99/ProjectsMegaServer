const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
dotenv.config();

const ctgu = require("./servers/ctgu-social/index");
const landasha = require("./servers/landasha/index");
const electric = require("./servers/electric/index");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));

app.use("/ctgu-social", ctgu);
app.use("/landasha", landasha);
app.use("/electric", electric);

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
