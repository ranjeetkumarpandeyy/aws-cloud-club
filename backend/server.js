const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 ROOT ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("AWS Cloud Club Backend is Live 🚀");
});

// OPTIONAL TEST API
app.get("/test", (req, res) => {
  res.json({ status: "API working" });
});

// SERVER START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
