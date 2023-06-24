/**
 * Created by Mb
 */
//import mongoose and models
const jwt = require('jsonwebtoken');
var mongoose = require("mongoose");
var Product = require("../models/product.model");
var Category = require("../models/category.model");
var Order = require("../models/billing.model");
var Booking = require("../models/booking.model");
var Rate = require("../models/rate.model");

// var filename = require('../../multerConfig/storageConfig/storage')
//helper functions
const responseHelper = require("../helpers/response.helper");
const { create } = require("lodash");
var category = async (req, res) => {
  try {
    const category = await Category.find();
    if (category) {
      var message = "Category Loaded";
      var responseData = { Category: category };
      return responseHelper.success(res, responseData, message);
    }
    let err = "Sorry no category found";
    return responseHelper.requestfailure(res, err);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  }
};



const product = async (req, res) => {
  try {
    const { id } = req.token_decoded;
    console.log(id);
    const product = await Product.find({ isActive: true, userId: id }).populate('cat_id');
    if (product) {
      var message = "product Loaded";
      var responseData = { product: product };
      return responseHelper.success(res, responseData, message);
    }
    let err = "Sorry no product found";
    return responseHelper.requestfailure(res, err);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  }
};
var allproduct = async (req, res) => {
  try {
    const product = await Product.find({ isActive: true }).populate('cat_id');
    if (product) {
      var message = "product Loaded";
      var responseData = { product: product };
      return responseHelper.success(res, responseData, message);
    }
    let err = "Sorry no product found";
    return responseHelper.requestfailure(res, err);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  }
};

var createCat = async (req, res) => {
  try {
    const { name } = req.body;
    if (name == "" || name == undefined) {
      let err = "Category name is required";
      return responseHelper.requestfailure(res, err);
    }
    let bodyData = req.body;
    const newCategory = await Category.create(bodyData);
    var message = "Category Created";
    var responseData = { category: newCategory };
    return responseHelper.success(res, responseData, message);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  }
};

var createProd = async (req, res) => {
  // const file = req.file.filename;
  try {
    const { name, price, qty, discription } = req.body;
    const { id } = req.token_decoded;
    console.log("hello", id);
    if (name == "" || name == undefined) {
      let err = "Product name is required";
      return responseHelper.requestfailure(res, err);
    }
    if (price == "" || price == undefined) {
      let err = "Product price is required";
      return responseHelper.requestfailure(res, err);
    }
    if (discription == "" || discription == undefined) {
      let err = "Product discription is required";
      return responseHelper.requestfailure(res, err);
    }
    if (qty == "" || qty == undefined) {
      let err = "Product qty is required";
      return responseHelper.requestfailure(res, err);
    }
    let bodyData = req.body;
    // bodyData.image = req.file.filename;
    bodyData.userId = id;
    console.log(bodyData)
    const newProduct = await Product.create(bodyData);
    var message = "product Loaded";
    var responseData = { product: newProduct };
    return responseHelper.success(res, responseData, message);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  }
};

var createorder = async (req, res) => {

  try {
    let bodyData = req.body;
    const newProduct = await Order.create(bodyData);
    var message = "take order";
    var responseData = { product: newProduct };
    return responseHelper.success(res, responseData, message);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  }
};
// var createorder = async (req, res) => {
//   try {
//     let { products } = req.body;

//     const populatedProducts = await Promise.all(products.map(async (productId) => {
//       // Perform the population logic for productId (e.g., using Mongoose's populate() method)
//       const populatedProduct = await Product.findById(productId).populate('productId');
//       return populatedProduct;
//     }));

//     const newOrders = await Promise.all(populatedProducts.map(async (product) => {
//       const orderData = {
//         userId: userId,
//         productId: product._id, // Assuming the product model has an _id field
//         // Add any other fields required for the order
//       };
//       const newOrder = await Order.create(orderData);
//       return newOrder;
//     }));

//     var message = "Orders created successfully";
//     var responseData = { orders: newOrders };
//     return responseHelper.success(res, responseData, message);
//   } catch (err) {
//     return responseHelper.requestfailure(res, err);
//   }
// };

/////
///////////
//////////////////
//////////////////////////////
//////////////////////////////
/////////////////
//////////
/////
///
//
const orders = async (req, res) => {
  try {
    const { id } = req.token_decoded;
    // console.log("ID ======>", id);

    const orders = await Order.find({});

    // console.log("Orders ======>", orders);

    if (orders.length > 0) {
      const responseData = { orders };
      return responseHelper.success(res, responseData, "Orders loaded");
    }

    const err = "No orders found for the specific user";
    return responseHelper.requestfailure(res, err);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  }
};

const orderDeatils = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const orders = await Order.findOne({ _id: id });

    // console.log("Orders ======>", orders);

    if (orders) {
      const responseData = { orders };
      return responseHelper.success(res, responseData, "Orders loaded");
    }

    const err = "No orders found for the specific user";
    return responseHelper.requestfailure(res, err);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  }
};

const completeOrder = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const orders = await Order.findOneAndUpdate(
      { _id: id }, // Filter to match the document by ID
      { $set: { status: 'complete' } }, // Update data
      { returnOriginal: false } // Return the updated document
    );

    // console.log("Orders ======>", orders);

    if (orders) {
      const responseData = { orders };
      return responseHelper.success(res, responseData, "Orders loaded");
    }

    const err = "No orders found for the specific user";
    return responseHelper.requestfailure(res, err);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  }
};




// const booking = async (req, res) => {
//   try {
//     const { id } = req.token_decoded;
//     console.log("ID ======>", id);

//     const bookings = await Booking.find({});

//     if (bookings.length > 0) {
//       const matchingBookings = bookings.filter(
//         booking => id === booking.bookerId || id === booking.providerId
//       );
//       const responseData = { bookings: matchingBookings };
//       return responseHelper.success(res, responseData, "Booking loaded");
//     }


//     const err = "No bookings found";
//     return responseHelper.requestfailure(res, err);
//   } catch (err) {
//     return responseHelper.requestfailure(res, err);
//   }
// };
const booking = async (req, res) => {
  try {
    const { id } = req.token_decoded;

    let bookings = await Booking.find({});

    if (bookings.length > 0) {
      const matchingBookings = bookings.filter(
        booking => String(booking.bookerId) === String(id) || String(booking.providerId) === String(id)
      );

      if (matchingBookings.length > 0) {
        let populatedBookings;

        if (String(matchingBookings[0].bookerId) === id) {
          populatedBookings = await Booking.populate(matchingBookings, [
            { path: "providerId" },
          ]);
        } else if (String(matchingBookings[0].providerId) === id) {
          populatedBookings = await Booking.populate(matchingBookings, [
            { path: "bookerId" },
          ]);
        }

        const responseData = { bookings: populatedBookings };
        return responseHelper.success(res, responseData, "Bookings loaded");
      }
    }

    const err = "No bookings found";
    return responseHelper.requestfailure(res, err);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  }
};

var createBooking = async (req, res) => {
  try {
    const { id } = req.token_decoded;
    // const { message } = req.body;
    // if (message == "" || message == undefined) {
    //   let err = "Message is required";
    //   return responseHelper.requestfailure(res, err);
    // }
    let bodyData = req.body;
    bodyData.bookerId = id;
    const newCategory = await Booking.create(bodyData);
    var message2 = "Booking Created";
    var responseData = { category: newCategory };
    return responseHelper.success(res, responseData, message2);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  }
};
const setRate = async (req, res) => {
  try {
    const { hourly, daily, contract, discription } = req.body;
    const { id } = req.token_decoded;
    console.log("hello", id);
    if (hourly == "" || hourly == undefined) {
      let err = "Hourly rate is required";
      return responseHelper.requestfailure(res, err);
    }
    if (daily == "" || daily == undefined) {
      let err = "Daily rate is required";
      return responseHelper.requestfailure(res, err);
    }
    if (contract == "" || contract == undefined) {
      let err = "Contract rate is required";
      return responseHelper.requestfailure(res, err);
    }
    if (discription == "" || discription == undefined) {
      let err = "Discription is required";
      return responseHelper.requestfailure(res, err);
    }
    let bodyData = req.body;
    bodyData.userId = id;
    console.log(bodyData)
    const newRate = await Rate.create(bodyData);
    var message = "Rate Loaded";
    var responseData = { rate: newRate };
    return responseHelper.success(res, responseData, message);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  } const rate = await Rate.create
}
const getRate = async (req, res) => {
  try {
    const rates = await Rate.find();
    if (rates) {
      var message = "Rate Loaded";
      var responseData = { Rates: rates };
      return responseHelper.success(res, responseData, message);
    }
    let err = "Sorry no rate found";
    return responseHelper.requestfailure(res, err);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  }
}
// const updateBooking = async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const { status } = req.body;
//     const updatedBooking = await Booking.findByIdAndUpdate(
//       bookingId,
//       { status },
//       { new: complete }
//     );

//     if (!updatedBooking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     return res.json({ message: 'Booking updated successfully', booking: updatedBooking });
//   } catch (error) {
//     console.log('Error updating booking:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };
const updateBooking = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const booking = await Booking.findOneAndUpdate(
      { _id: id }, // Filter to match the document by ID
      { $set: { status: 'complete' } }, // Update data
      { returnOriginal: false } // Return the updated document
    );
    if (booking) {
      const responseData = { booking };
      return responseHelper.success(res, responseData, "Bookings loaded");
    }
    const err = "No booking found for the specific user";
    return responseHelper.requestfailure(res, err);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  }
};
module.exports = {
  category,
  product,
  createCat,
  createProd,
  allproduct,
  createorder,
  orders,
  booking,
  createBooking,
  setRate,
  getRate,
  orderDeatils,
  completeOrder,
  updateBooking,
};
