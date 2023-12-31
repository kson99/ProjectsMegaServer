const mysql = require("mysql");

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.CTGU_HOST_KEY,
  user: process.env.CTGU_USER_NAME,
  password: process.env.CTGU_PASSWORD,
  database: process.env.CTGU_DATABASE,
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("Error connecting to CTGU-SOCIAL DB", err);
    return;
  }

  console.log("Connected to CTGU-SOCIAL DB!");

  //release connection
  connection.release();
});

module.exports = db;
