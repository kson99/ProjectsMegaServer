const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.ATLAS_URI, {
      dbName: "Electric-E-commerse",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected Electric DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const ctgu = require("./servers/ctgu-social/index");
const landasha = require("./servers/landasha/index");
const electric = require("./servers/electric/index");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));

app.use("/ctgu-social", ctgu);
app.use("/landasha", landasha);
app.use("/electric", electric);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`);
  });
});
