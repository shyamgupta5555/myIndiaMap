const mongoose = require("mongoose");
const memoriesModel = require("../model/memoriesModel");
const {
  Types: { ObjectId },
} = mongoose;
const { memoriesSchema, memoriesUp } = require("../validation/validation");
const { uploadFile } = require("../aws/fileUpload");
let validFile = (value) => /\.(jpe?g|png)$/i.test(value);

exports.memoriesCreate = async (req, res) => {
  try {
    let data = req.body;
    data.userId = req.id;
    const Image = req.files[0];

    if (Image && Image.length === 0) {
      return res.status(400).send({ message: "please insert profile image!" });
    }
    if (!validFile(Image.originalname))
      return res
        .status(400)
        .send({ message: "please select valid  image like jpeg , png ,jpg" });

    let uploadedFileURL = await uploadFile(req.files[0]);
    data.Image = uploadedFileURL;

    const create = await memoriesModel.create(data);
    return res.status(201).send({ data: create });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};


exports.memoriesGet = async (req, res) => {
  try {
    let id = req.id;
    const get = await memoriesModel.find({ userId: id, isDeleted: false });
    return res.status(200).send({ data: get });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};


exports.memoriesDelete = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return res.status(400).send({ message: "please send valid object id " });

    const memoriesDelete = await memoriesModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        isDeleted: true,
      },
      { new: true }
    );
    if (!memoriesDelete)
      return res
        .status(404)
        .send({ message: "this id not exist our data base" });
    return res.status(200).send({ message: "successfully deleted" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

