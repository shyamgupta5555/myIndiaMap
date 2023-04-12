const mongoose = require("mongoose");

const memoriesCreate = mongoose.Schema(
  {
    content: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    lat: { type: String, required: true },
    lng: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("memories", memoriesCreate);
