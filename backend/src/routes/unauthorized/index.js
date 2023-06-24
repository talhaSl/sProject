/**
 * Created by Mb
 */

const express = require("express");
const uploadFile = require('./../../helpers/upload.helper');
const allProducts = require('./../../routes/unauthorized/product.route');
const category = require('./../../routes/unauthorized/product.route');
const router = express.Router();
const allUser = require('./../../routes/unauthorized/users.route');

const usersRoutes = require("./users.route");

//@route     auth
//@desc     inital route
//@access   Public
router.use("/auth", usersRoutes);
router.use("/common", allProducts);
router.use("/product", category)
router.use("/", allUser);
router.post('/uploadFile', uploadFile);
// router.post('/common', allproduicts);

module.exports = router;
