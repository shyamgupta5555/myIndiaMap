const jwt = require("jsonwebtoken");
const memoriesModel = require("../model/memoriesModel");

exports.authentication = async (req, res, next) => {
  try {
    
    let header = req.headers["authorization"];
    if (!header)
      return res
        .status(400)
        .send({ status: false, message: "jwt must be provided" });
    jwt.verify(header, "operationFrontend", (err, decoded) => {
      if (err)
        return res.status(401).send({ status: false, message: err.message });
      req.id = decoded.id;
      next();
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

exports.authorization = async (req, res, next) => {
  try {
    let user = req.id;
    
    let userId = req.body.userId;
    let memoriesId = req.params.id;
    if (userId) {
      if (userId !== user)
        return res
          .status(400)
          .send({ status: false, message: "user id not valid" });
      next();
    } else {
      let memories = await memoriesModel.findById(memoriesId);
      if (!memories)
        return res.status(400).send({ message: " memories  id not valid" });
      console.log(memories);
      if (memories.userId != user)
        return res.status(403).send({ message: "user id not valid" });
      next();
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
