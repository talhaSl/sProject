/**
 * Created by Mb
 */

const express = require("express");
const router = express.Router();


const controller = require("../../controllers").product;

var permit = require("../../middlewares").permit;

//@route    GET users
//@desc     current user data
//@access   Private
router.get("/", controller.product);
// router.get("/category", controller.category);
router.post("/category/add", controller.createCat);
router.post("/create", controller.createProd);
router.post("/createbooking", controller.createBooking);
router.post("/setrate", controller.setRate);

router.get("/completebooking/:id", controller.updateBooking);


router.get("/booking", controller.booking);
router.get("/orders", controller.orders);
router.get("/orderDetails/:id", controller.orderDeatils);
router.get("/completeOrder/:id", controller.completeOrder);
router.get("/getrate", controller.getRate);



module.exports = router;
