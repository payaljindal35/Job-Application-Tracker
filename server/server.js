const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("===== FULL ERROR =====");
    console.log(err);
  });
app.use("/api/jobs", require("./routes/jobs"));

app.listen(process.env.PORT, () =>
  console.log("Server running")
);