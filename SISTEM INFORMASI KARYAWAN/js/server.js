const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sistem_informasi",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected!");
});

app.get("/api/karyawan", (req, res) => {
  db.query("SELECT * FROM karyawan", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
