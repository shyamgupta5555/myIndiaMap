const express = require("express");
const route = express.Router();
const { userCreate, login } = require("../controller/userController");
const {
  memoriesCreate,
  memoriesUpdate,
  memoriesDelete,
  memoriesGet,
} = require("../controller/memoriesController");
const { authentication } = require("../middleware/auth");

route.post("/api/accounts/register", userCreate);
route.post("/api/accounts/login", login);

route.post("/api/users/memories", authentication, memoriesCreate);
route.get("/api/users/memories",  memoriesGet);
route.put("/api/users/memories/:id", authentication, memoriesUpdate);

route.delete("/api/users/memories/:id", authentication, memoriesDelete);

module.exports = route;
