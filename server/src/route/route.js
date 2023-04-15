const express = require("express");
const route = express.Router();
const { userCreate, login } = require("../controller/userController");
const {
  memoriesCreate,
  memoriesUpdate,
  memoriesDelete,
  memoriesGet,
} = require("../controller/memoriesController");

const { authentication ,authorization } = require("../middleware/auth");

route.post("/api/accounts/register", userCreate);
route.post("/api/accounts/login", login);

route.post("/api/users/memories",authentication, authorization, memoriesCreate);
route.get("/api/users/memories",  authentication,  memoriesGet);


route.delete("/api/users/memories/:id", authentication,  authorization ,memoriesDelete);


module.exports = route;
