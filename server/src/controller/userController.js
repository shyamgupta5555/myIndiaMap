const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const joi = require("joi");
const { uploadFile } = require("../aws/fileUpload");
const { userSchema, loginSchema } = require("../validation/validation");
let validFile = (value) => /\.(jpe?g|png)$/i.test(value);

exports.userCreate = async (req, res) => {
  try {
    let data = req.body;
    const { email, phone, password, name } = data;
    const profileImage =req.files[0]
   console.log(profileImage)
    data.name = name.toUpperCase();

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

    if (profileImage && profileImage.length === 0) {
      return res.status(400).send({ message: "please insert profile image!" });
    }
    if (!validFile(profileImage.originalname))
      return res
        .status(400)
        .send({ message: "please select valid  image like jpeg , png ,jpg" });

    let uploadedFileURL = await uploadFile(req.files[0]);
    data.profileImage = uploadedFileURL;
    
    console.log(uploadFile);

    const passwordHas = await bcrypt.hash(password, 10);
    data.password = passwordHas;
    const create = await userModel.create(data);

    return res.status(201).send({ data: create });
  } catch (error) {
    if (error.isJoi == true) error.status = 400;
    return res.status(500).send({ message: error.message });
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
      { id: check._id, name: check.name ,profileImage :check.profileImage },
      "operationFrontend",
      { expiresIn: "1h" }
    );
    const obj = { id: check.id, token: token, expireToken: "1h" };
    return res.status(200).send(obj);
  } catch (error) {
    if (error.isJoi == true) error.status = 400;
    return res.status(500).send({ status: false, message: error.message });
  }
};
