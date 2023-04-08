const mongoose = require("mongoose");
const memoriesModel = require("../model/memoriesModel");
const {
  Types: { ObjectId },
} = mongoose;
const { memoriesSchema, memoriesUp } = require("../validation/validation");

exports.memoriesCreate = async (req, res) => {
  try {
    let data = req.body;
    await memoriesSchema.validateAsync(data);
    data.userId = req.id;
    console.log(data);

    const create = await memoriesModel.create(data);
    return res.status(201).send({ data: create });
  } catch (error) {
    if (error.isJoi == true) error.status = 400;
    return res.status(error.status).send({ message: error.message });
  }
};

exports.memoriesUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const { content, lat, lang } = data;

    await memoriesUp.validateAsync(data);

    if (!ObjectId.isValid(id))
      return res.status(400).send({ message: "please send valid object id " });

    const update = await memoriesModel.findOneAndUpdate(
      { _id: data.id },
      data,
      {
        new: true,
      }
    );
    return res.status(200).send({ data: update });
  } catch (error) {
    if (error.isJoi == true) error.status = 400;
    return res
      .status(error.status)
      .send({ status: false, message: error.message });
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

    const memoriesDelete = await memoriesModel.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
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
