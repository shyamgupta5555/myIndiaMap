const mongoose = require("mongoose");

const userCreate = mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("user", userCreate);
