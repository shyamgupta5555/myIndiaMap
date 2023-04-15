const express = require("express");
const mongoose = require("mongoose");
const route = require("./route/route");
const cors = require("cors");
const multer = require("multer")
const app = express();
app.use(express.json());

app.use(cors());
app.use(multer().any())
mongoose
  .connect(
    "mongodb+srv://shyamgupta:.T!8NRrzf6FyMYc@cluster0.dbdyccj.mongodb.net/mapproject"
  )
  .then(() => {
    console.log("MONGO DB is connect");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/", route);

app.listen(5000, console.log("Application is running", 5000));
