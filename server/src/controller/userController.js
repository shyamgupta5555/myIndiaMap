const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const joi = require("joi");
const { userSchema, loginSchema } = require("../validation/validation");

exports.userCreate = async (req, res) => {
  try {
    let data = req.body;
    const { email, phone, password } = data;

    await userSchema.validateAsync(data);

    const check = await userModel.findOne({ email: email });
    if (check)
      return res.status(400).send({
        message: "This mail already exist try to next another mail",
      });

    const checkNumber = await userModel.findOne({ phone: phone });
    if (checkNumber)
      return res.status(400).send({
        message: "This phone number already exist try to next another number",
      });

    const passwordHas = await bcrypt.hash(password, 10);
    data.password = passwordHas;
    const create = await userModel.create(data);
    return res.status(201).send({ data: create });
  } catch (error) {
    if (error.isJoi == true) error.status = 400;
    return res
      .status(error.status)
      .send({ status: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = data;
    await loginSchema.validateAsync(data);

    const check = await userModel.findOne({ email: email });
    if (!check) return res.status(404).send({ message: "This mail wrong" });

    const matchPassword = await bcrypt.compare(password, check.password);
    if (!matchPassword)
      return res.status(400).send({ message: "password is wrong" });

    const token = jwt.sign(
      { id: check._id, phone: check.phone },
      "operationFrontend",
      { expiresIn: "1h" }
    );
    const obj = { id: check.id, token: token, expireToken: "1h" };
    return res.status(200).send(obj);
  } catch (error) {
    if (error.isJoi == true) error.status = 400;
    return res
      .status(error.status)
      .send({ status: false, message: error.message });
  }
};
