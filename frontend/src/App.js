import React, { useEffect } from "react";
import "./App.css";
import Index from "./components/Index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
// import "./scss/style.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import SignIn from "./components/signIn/index";
import JoinUs from "./components/joinUs/index";
import SignupBuyer from "./components/signupBuyer/index";
import SignupProvider from "./components/signupProvider/index";
import SignupSeller from "./components/signupSeller/index";
import Service from "./components/services/index";
import Cart from "./components/cart/index";
import ContactUs from "./components/contactUs/index";
import Booking from "./components/booking/index";

import About from "./components/about/index";
import Policy from "./components/policy/index";

import BillingDetail from "./components/billingDetail/index";
import DefaultLayout from "./Dashboard/layout/DefaultLayout";
import Login from "./Dashboard/views/pages/login/Login";
import Register from "./Dashboard/views/pages/register/Register";
import AddProduct from "./Dashboard/views/add-product/AddProduct";
import Product from "./Dashboard/views/products";
import Category from "./Dashboard/views/category";
import Electrician from "./components/Electrician/index";
import Plumber from "./components/plumber/index";
import Mechanic from "./components/mechanic/index";
import Tutor from "./components/Tutor/index";
import Carpenter from "./components/Carpenter/index";
import Painter from "./components/Painter/index";
import Worker from "./components/Worker/index";
import Order from "./Dashboard/views/orders";
import OrderDetails from "./Dashboard/views/orders copy";
import Bookings from "./Dashboard/views/bookings";
import SetRate from "./Dashboard/views/set-rate";
import Complete from "./Dashboard/views/complete"
import Profile from "./components/profile/index";



function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <Router>

      <Routes>
        <Route path="/" exact element={<Index />} />
        <Route path="/SignIn" exact element={<SignIn />} />
        <Route path="/JoinUs" exact element={<JoinUs />} />
        <Route path="/SignupBuyer" exact element={<SignupBuyer />} />
        <Route path="/SignupProvider" exact element={<SignupProvider />} />
        <Route path="/SignupSeller" exact element={<SignupSeller />} />
        <Route path="/Service" exact element={<Service />} />
        <Route path="/Cart" exact element={<Cart />} />
        <Route path="/BillingDetail" exact element={<BillingDetail />} />
        <Route path="/ContactUs" exact element={<ContactUs />} />
        <Route path="/Booking/:id" exact element={<Booking />} />
        <Route path="/About" exact element={<About />} />
        <Route path="/Policy" exact element={<Policy />} />
        <Route path="/Electrician" exact element={<Electrician />} />
        <Route path="/plumber" exact element={<Plumber />} />
        <Route path="/Mechanic" exact element={<Mechanic />} />
        <Route path="/Tutor" exact element={<Tutor />} />
        < Route path="/Carpenter" exact element={<Carpenter />} />
        < Route path="/Painter" exact element={<Painter />} />
        < Route path="/Worker/:id" exact element={<Worker />} />
        < Route path="/Profile/:id" exact element={<Profile />} />

        <Route
          path="/dashboard"
          exact
          name="Home"
          element={<DefaultLayout />}
        />
        <Route
          exact
          path="/dashboard/login"
          name="Login Page"
          element={<Login />}
        />
        <Route
          exact
          path="/dashboard/register"
          name="Register Page"
          element={<Register />}
        />
        <Route
          exact
          path="/dashboard/products"
          name="Product"
          element={<Product />}
        />
        <Route
          exact
          path="/dashboard/orders"
          name="Order"
          element={<Order />}
        />
        <Route
          exact
          path="/dashboard/orderdetails/:id"
          name="Order"
          element={<OrderDetails />}
        />
        <Route
          exact
          path="/dashboard/bookings"
          name="Booking"
          element={<Bookings />}
        />
        <Route
          exact
          path="/dashboard/addProduct"
          name="Add Product"
          element={<AddProduct />}
        />
        <Route
          exact
          path="/dashboard/completebooking/:id"
          name="Complete Booking"
          element={<Complete />}
        />
        <Route
          exact
          path="/dashboard/category"
          name="Category"
          element={<Category />}
        />
        <Route
          exact
          path="/dashboard/setrate"
          name="Set Rate"
          element={<SetRate />}
        />
      </Routes>
    </Router>
  );
}

export default App;
