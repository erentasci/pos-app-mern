const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const PORT = 5000;

const categoryRoute = require("./routes/categories");

// Dotenv Config
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

// Routes
app.use("/api/categories", categoryRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  connect();
  console.log("Server is running on port: " + PORT);
});