const jwt = require("jsonwebtoken");

exports.authentication = async (req, res, next) => {
  try {
    let header = req.headers["authorization"];
    if (!header)
      return res
        .status(400)
        .send({ status: false, message: "jwt must be provided" });
    jwt.verify(header, "operationFrontend", (err, decoded) => {
      if (err)
        return res.status(400).send({ status: false, message: err.message });
      req.id = decoded.id;
      next();
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

// exports.authorization = async (req, res, next) => {
//   try {
//     console.log(req.id)
//     let user = req.id;
//     if (id !== user)
//       return res
//         .status(400)
//         .send({ status: false, message: "user id not valid" });
//     next();
//   } catch (err) {
//     return res.status(500).send({ status: false, message: err.message });
//   }
// };
