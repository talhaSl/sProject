/**
 * Created by Mb
 */

//import mongoose and models
var mongoose = require("mongoose");
var AC = mongoose.model("AC");
var User = require("../models/users.model");
var config = require("dotenv").config();
const jwtHelper = require("../helpers/jwt.helper");
const { getHashValue } = require("../helpers/users.helper");
var seedrandom = require("seedrandom");
var crypto = require("crypto");
//async for async tasks
const clientHelper = require("../helpers/users.helper");
//helper functions
const responseHelper = require("../helpers/response.helper");

var AS = async (req, res) => {
  AC.findOne({})
    .then(async (ac) => {
      if (ac) {
        ac.as = !ac.as;
        await ac.save();
        responseHelper.success(res, ac, "ac done!");
      } else {
        let ac = new AC();
        await ac.save();
        responseHelper.success(res, ac, "ac done!");
      }
    })
    .catch((err) => responseHelper.systemfailure(res, err));
};

//@route    POST auth/login
//@desc     login user
//@access   Public
//@params   {email}, {password}
var login = async (req, res) => {
  const { phone_number, password } = req.body;
  try {
    if (phone_number == "" || phone_number == undefined) {
      let err = "phone number is required";
      return responseHelper.requestfailure(res, err);
    }
    if (password == "" || password == undefined) {
      let err = "Password is required";
      return responseHelper.requestfailure(res, err);
    }

    const exists = await User.findOne({ phone_number: phone_number });
    if (exists) {
      const isMatch = await clientHelper.comparePassword(
        password,
        exists.password
      );
      if (isMatch) {
        const token = await jwtHelper.signAccessToken(exists);
        var message = "Successfully Singed In ";
        delete exists.password;
        var responseData = { token: "Bearer " + token, user: exists };
        return responseHelper.success(res, responseData, message);
      } else {
        let err = "Invalid Password";
        return responseHelper.requestfailure(res, err);
      }
    } else {
      let err = "User doesn't exists";
      return responseHelper.requestfailure(res, err);
    }
  } catch (error) {
    responseHelper.requestfailure(res, error);
  }
};
//@route    POST auth/signup
//@desc     signup user
//@access   Public
//@params   {email, first_name, password}
var signup = async (req, res) => {
  const { full_name, phone_number, password } = req.body;
  try {
    // console.log(req.body)
    if (phone_number == "" || phone_number == undefined) {
      let err = "Phone number is required";
      return responseHelper.requestfailure(res, err);
    }
    if (password == "" || password == undefined) {
      let err = "Password is required";
      return responseHelper.requestfailure(res, err);
    }

    if (full_name == "" || full_name == undefined) {
      let err = "Full name is required";
      return responseHelper.requestfailure(res, err);
    }
    // console.log(req.body)

    const checkPhone = await User.findOne({ phone_number: phone_number });

    if (checkPhone) {
      let err = "Phone number already exists";
      return responseHelper.requestfailure(res, err);
    }
    let bodyData = req.body;
    // console.log(bodyData);
    const hashpassword = await getHashValue(password);
    bodyData["password"] = hashpassword;
    console.log('====>', bodyData);
    const newuser = await User.create(bodyData);
    // console.log(newuser);
    var message = "Account Signup successful";
    const token = await jwtHelper.signAccessToken(newuser);
    var responseData = { token: "Bearer " + token, user: newuser };
    // console.log(responseData);
    return responseHelper.success(res, responseData, message);
  } catch (error) {
    console.log('eeeee', error);
    responseHelper.requestfailure(res, error);
  }
};

//@route    GET profile
//@desc     get current login user
//@access   Public
const profile = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id================>", id);
    const user = await User.findById(id).select("-password");
    if (user) {
      const message = "User Loaded";
      const responseData = { user: user };
      return responseHelper.success(res, responseData, message);
    }
    const err = "Sorry, Your Profile Does Not Exist";
    return responseHelper.requestfailure(res, err);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  }
};



//@route    GET users
//@desc     get all user
//@access   Public
var users = async (req, res) => {
  try {
    var query = { isActive: true };
    if (req.query.role) {
      query = { isActive: true, role: req.query.role }
    }
    console.log({ query })
    const user = await User.find({});
    delete user.password;
    if (user) {
      var message = "User Loaded";
      var responseData = { user: user };
      return responseHelper.success(res, responseData, message);
    }
    let err = "Sorry Your Profile Not Exist";
    return responseHelper.requestfailure(res, err);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  }
};
var allUser = async (req, res) => {
  try {

    const user = await User.find({});
    // console.log("User Data=====>");
    delete user.password;

    var message = "User Loaded";
    // var responseData = { user: user };
    return responseHelper.success(res, user, message);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  }
};


//@route    POST auth/checkemail
//@desc     check email before forgot password
//@access   Public
//@params   {email}
var sentForgotPinCodeViaEmail = async (req, res) => {
  const { email } = req.body;
  try {
    if (email == "" || email == undefined) {
      let err = "email is required";
      return responseHelper.requestfailure(res, err);
    }

    const user = await User.findOne({ email: email }).lean();
    if (!user) {
      let err = "User with this email not exist";
      return responseHelper.requestfailure(res, err);
    } else {
      delete user.password;
      const rng = seedrandom(crypto.randomBytes(64).toString("base64"), {
        entropy: true,
      });
      const code = rng().toString().substring(3, 9);
      // sendEmailForgotPassword(user, code);
      const token = await jwtHelper.forgotPasswordToken(user);
      await User.findByIdAndUpdate(user._id, { forgotPinCode: code });
      var responseData = {
        token: "Bearer " + token,
        data: true,
      };
      const message = "Email sent to you check your Mail box";
      return responseHelper.success(res, responseData, message);
    }
  } catch (error) {
    responseHelper.requestfailure(res, error);
  }
};

//@route    POST auth/verifyforgotpin
//@desc     verify forgot pin code in db
//@access   Public
//@params   {pin_code}
var verifyForgotPinCode = async (req, res) => {
  const { pinCode } = req.body;
  try {
    if (pinCode == "" || pinCode == undefined || pinCode == null) {
      let err = "Please enter six digit pin code ";
      return responseHelper.requestfailure(res, err);
    }
    const user = await User.findById(req.forgot_user.id).lean();
    if (user) {
      if (user.forgotPinCode == pinCode) {
        await User.findByIdAndUpdate(user._id, {
          forgotPinCode: "",
          changePassword: true,
        });
        var responseData = { data: true };
        const message = "Pin code is verified";
        return responseHelper.success(res, responseData, message);
      } else {
        let err = "Invalid pin code";
        return responseHelper.requestfailure(res, err);
      }
    } else {
      let err = "User not exist";
      return responseHelper.requestfailure(res, err);
    }
  } catch (error) {
    responseHelper.requestfailure(res, error);
  }
};

//@route    POST auth/resetpassword
//@desc     reset password
//@access   Public
//@params   {email}
var resetPassword = async (req, res) => {
  const { password } = req.body;
  try {
    if (password == "" || password == undefined) {
      let err = "password is required";
      return responseHelper.requestfailure(res, err);
    }
    //
    const user = await User.findById(req.forgot_user.id).lean();
    if (user) {
      if (!user.changePassword) {
        let err = "Pin code is not verified or already used";
        return responseHelper.requestfailure(res, err);
      }
      const hashpassword = await getHashValue(password);
      await User.findByIdAndUpdate(user._id, {
        changePassword: false,
        password: hashpassword,
      });
      delete user.password;
      const token = await jwtHelper.signAccessToken(user);
      var message = "Successfully Singed In ";
      var responseData = { token: "Bearer " + token, user: user };
      return responseHelper.success(res, responseData, message);
    } else {
      let err = "User not exist";
      return responseHelper.requestfailure(res, err);
    }
  } catch (error) {
    responseHelper.requestfailure(res, error);
  }
};

module.exports = {
  AS,
  login,
  signup,
  profile,
  users,
  allUser,
  sentForgotPinCodeViaEmail, //f
  verifyForgotPinCode, //f
  resetPassword, //f
};
