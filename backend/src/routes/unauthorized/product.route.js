const express = require("express");
const router = express.Router();

const { allproduct, createorder, category } = require("../../controllers").product;


router.get("/product", allproduct);
router.get("/category", category);
router.post("/createorder", createorder);



module.exports = router;
