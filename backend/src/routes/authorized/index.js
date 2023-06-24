/**
 * Created by Mb
 */

const express = require("express");
const router = express.Router();
var auth = require("../../middlewares").auth;

const usersRoutes = require("./users.route");
const prodRoutes = require("./product.route");
//call appropriate routes

//@route     users
//@desc     inital route
//@access   private
router.use("/users", auth.authenticate, usersRoutes);
router.use("/product", auth.authenticate, prodRoutes);

module.exports = router;
