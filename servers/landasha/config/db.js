const mysql = require("mysql");

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.LANDASHA_HOST_NAME,
  user: process.env.LANDASHA_USER_NAME,
  password: process.env.LANDASHA_PASSWORD,
  database: process.env.LANDASHA_DATABASE,
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("Error connecting to Landasha DB", err);
    return;
  }

  console.log("Connected to Landasha DB!");

  //release connection
  connection.release();
});

module.exports = db;
