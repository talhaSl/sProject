import React, { useState, useEffect } from "react";
import Header from "../Header/Index";
import Footer from "../Footer/Index";
import { toast, ToastContainer } from "react-toastify"
import { orderPlaced, registerFunc } from "../../services/Api";
import { BASE_URL } from "../../services/Helper";
import { useNavigate } from "react-router-dom";
function CartFunction() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
  const [quantity, setQuantities] = useState([])
  const [priceVal, setPriceVal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const handleItemClick = (productId, value, userId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: value
    }));
    // Save the userId along with the productId in the cart
    const updatedCart = cart.map(item => {
      if (item._id === productId) {
        return { ...item, orderQty: value };
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };


  const product = cart ? cart : cart;

  // console.log(alpha);
  const removeProduct = (productId) => {
    const updatedProduct = product.filter((product) => product._id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedProduct));
    setCart(updatedProduct);
    const subtotalValue = updatedProduct.reduce((total, item) => {
      const itemPrice = parseInt(item.price) * (quantity[item._id] || 1);
      return total + itemPrice;
    }, 0);
    setSubtotal(subtotalValue);
    // const discountValue = Math.round(subtotalValue * 16 / 100);
    const discountValue = 0;
    setDiscount(discountValue);
  };
  useEffect(() => {
    if (product) {
      const subtotalValue = product.reduce((total, item) => {
        const itemPrice = parseInt(item.price) * (quantity[item._id] || 1);
        return total + itemPrice;
      }, 0);
      setSubtotal(subtotalValue);
    }
  }, [quantity]);

  // Calculate and update discount
  useEffect(() => {
    // const discountValue = Math.round(subtotal * 16 / 100);
    const discountValue = 0;
    setDiscount(discountValue);
  }, [subtotal]);
  const [orderData, setorderData] = useState({
    Fname: "",
    Lname: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    country: "",
    postal_code: "",
    payment_method: "",
    card_number: "",
    card_holder: "",
    date: "",
    cvc: "",
    notes: ""
  });
  const setorderValue = (e) => {
    const { name, value } = e.target;
    setorderData({ ...orderData, [name]: value });
    console.log({ orderData })
  };

  const submitorderData = async (e) => {
    e.preventDefault();

    const { first_name, last_name, email, address, phone_number, city, state, postal_code, payment_method } = orderData;

    if (first_name === "") {
      toast.error("Name is Required");
    } else if (email === "") {
      toast.error("Email Address is Required");
    } else if (address === "") {
      toast.error("Address is Required");
    } else if (phone_number === "") {
      toast.error("Phone Number is Required");
    } else {
      const config = {
        "Content-Type": "application/json"
      }
      const data = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
        address: address,
        city: city,
        state: state,
        postal_code: postal_code,
        products: cart,
        totalPrice: subtotal - discount,
        payment_method: payment_method,
      };
      const response = await orderPlaced(data, config);
      console.log(response.status);
      if (response.status === 200) {
        toast.success(" Order is Placed Successfully")
        setorderData({
          ...orderData,
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          address: "",
          city: "",
          state: "",
          postal_code: "",
          country: "",
          postal_code: "",
          payment_method: "",
          card_number: "",
          card_holder: "",
          data: "",
          cvc: "",
          notes: "",
        });
        localStorage.removeItem('cart')
        setTimeout(() => {
          navigate(`/`)
        }, 2000);
      } else {
        toast.error(response.error);
      }
    }
  };

  return (
    <>

      <Header />
      <div className="billingDetail">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="billingInfo">
                <h4>Billing info</h4>
                <div className="d-flex align-items-center justify-content-between">
                  <p>Please enter your billing info</p>
                  <p>Step 1 of 4</p>
                </div>
                <form action="">
                  <div className="row mb-5">
                    <div className="col-md-6">
                      <label>First name</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="First name"
                        name="first_name"
                        onChange={setorderValue}
                        value={orderData.first_name}
                      />


                      <label>Email address</label>
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Email address"
                        name="email"
                        onChange={setorderValue}
                        value={orderData.email}
                      />
                      <label>Address</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Address"
                        name="address"
                        onChange={setorderValue}
                        value={orderData.address}

                      />
                      <label>State / Country</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="State / Country"
                        name="state"
                        onChange={setorderValue}
                        value={orderData.state}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Last name</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Last name"
                        name="last_name"
                        onChange={setorderValue}
                        value={orderData.last_name}
                      />

                      <label>Phone number</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Phone number"
                        name="phone_number"
                        onChange={setorderValue}
                        value={orderData.phone_number}
                      />
                      <label>Town / City</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Town / City"
                        name="city"
                        onChange={setorderValue}
                        value={orderData.city}
                      />
                      <label>ZIP / Postal code</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="ZIP/Postal code"
                        name="postal_code"
                        onChange={setorderValue}
                        value={orderData.postal_code}
                      />
                    </div>
                  </div>
                </form>

                <h4>Payment method</h4>
                <div className="d-flex align-items-center justify-content-between">
                  <p>Please enter your payment method</p>
                  <p>Step 2 of 4</p>
                </div>
                <div className="backWrapper mb-3">
                  <form action="">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="payment_method"
                          id="flexRadioDefault3"
                          onChange={setorderValue}
                          value="card"
                          checked={orderData.payment_method === 'card'}
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault3"
                        >
                          Credit card
                        </label>
                      </div>
                      <img src="/images/visa.svg" alt="visa" />
                    </div>
                    <label>Card Number</label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Card Number"
                      name="card_number"
                      onChange={setorderValue}
                      value={orderData.card_number}
                    />
                    <div className="row">
                      <div className="col-md-7">
                        <label>Card holder</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Card holder"
                          name="card_holder"
                          onChange={setorderValue}
                          value={orderData.card_holder}
                        />
                      </div>
                      <div className="col-md-3">
                        <label>Expiration date</label>
                        <input
                          className="form-control"
                          type="number"
                          placeholder="DD/MM/YY"
                          name="date"
                          onChange={setorderValue}
                          value={orderData.date}
                        />
                      </div>
                      <div className="col-md-2">
                        <label>CVC</label>
                        <input
                          className="form-control"
                          type="number"
                          placeholder="CVC"
                          name="cvc"
                          onChange={setorderValue}
                          value={orderData.cvc}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="backWrapper mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment_method"
                        id="flexRadioDefault4"
                        onChange={setorderValue}
                        value="cod"
                        checked={orderData.payment_method === 'cod'}
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault4"
                      >
                        Cash on Delivery
                      </label>
                    </div>
                  </div>
                </div>

                <h4>Additional informations</h4>
                <div className="d-flex align-items-center justify-content-between">
                  <p>Need something else? We will make it for you!</p>
                  <p>Step 3 of 4</p>
                </div>
                <div className="mb-5">
                  <label>Order notes</label>
                  <textarea
                    placeholder="Need a specific delivery day? Sending a gitf? Let’s say ..."
                    className="form-control"
                    cols="30"
                    rows="4"
                    name="notes"
                    onChange={setorderValue}
                    value={orderData.notes}
                  ></textarea>
                </div>
                <h4>Confirmation</h4>
                <div className="d-flex align-items-center justify-content-between">
                  <p>
                    We are getting to the end. Just few clicks and your order si
                    ready!
                  </p>
                  <p>Step 4 of 4</p>
                </div>
                <div className="backWrapper mt-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked7"
                    />
                    <label className="form-check-label" for="flexCheckChecked7">
                      I agree with sending an Marketing and newsletter emails.
                      No spam, promissed!
                    </label>
                  </div>
                </div>
                <div className="backWrapper mt-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked8"
                    />
                    <label className="form-check-label" for="flexCheckChecked8">
                      I agree with our terms and conditions and privacy policy.
                    </label>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="btn btn-primary"
                    onClick={submitorderData}
                  >Complete Order</button>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="summary">

                <div className="card">
                  <h4>Order Summary</h4>
                  <p>
                    Price can change depending on shipping method and taxes of
                    your state.
                  </p>

                  {product && product.length !== 0 ?
                    product.map((products) => (

                      <>

                        <div className="d-flex align-items-center product">

                          <div className="flex-shrink-0" >

                            <img
                              src={`${BASE_URL}/uploads/${products.image}`}
                              alt="productplaceholder"
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6>{products.name}</h6>
                            <p>The product is New</p>
                            <p>Can be delivered in 4 Days</p>
                          </div>
                        </div>
                        <div className="wish">
                          <div className="row align-items-center">
                            <div className="col-md-8">
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <p>
                                  <img src="/images/rheart.svg" alt="heart" className="me-2" /> Wishlist
                                </p>
                                <div className="d-flex">
                                  <img
                                    src="/images/ystar.svg"
                                    className="me-1"
                                    alt="star"
                                  />
                                  <img
                                    src="/images/ystar.svg"
                                    className="me-1"
                                    alt="star"
                                  />
                                  <img
                                    src="/images/ystar.svg"
                                    className="me-1"
                                    alt="star"
                                  />
                                  <img
                                    src="/images/ystar.svg"
                                    className="me-1"
                                    alt="star"
                                  />
                                  <img
                                    src="/images/estar.svg"
                                    className="me-1"
                                    alt="star"
                                  />
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <p><img src="/images/compare.svg" alt="compare" className="me-2" /> Unit Price</p>
                                {/* <h6>{Math.round(products.price - (products.price * 16 / 100)) * (quantity[products._id] || 1)} PKR</h6> */}
                                <h6>{Math.round(products.price)} PKR</h6>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <p><img src="/images/compare.svg" alt="compare" className="me-2" /> Total Price</p>
                                {/* <h6>{Math.round(products.price - (products.price * 16 / 100)) * (quantity[products._id] || 1)} PKR</h6> */}
                                <span>{products.price * quantity[products._id] || products.price}PKR</span>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <p onClick={() => removeProduct(products._id)} style={{ cursor: 'pointer' }} className="clickable-text"><img src="/images/cross.svg" alt="cross" className="me-2" /> Remove</p>
                                <span></span>

                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-group w-75 ms-auto">
                                <input type="text" className="form-control" placeholder="1" onChange={(e) => handleItemClick(products._id, e.target.value)} value={quantity[products._id]} aria-label="Text input with dropdown button" />
                                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Pcs</button>
                                <ul className="dropdown-menu dropdown-menu-end" >
                                  {Array.from({ length: products.qty > 10 ? 10 : products.qty }).map((_, index) => (
                                    <li key={index}>
                                      <a className="dropdown-item" href="#" onClick={() => handleItemClick(products._id, index + 1)}>{index + 1}</a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))
                    : <h4 >Your Cart is Empty</h4>}
                  <hr />
                  <div className="total">
                    <ul className="list-none">
                      <li>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>Subtotal</h5>
                          <h5>{subtotal} PKR</h5>

                        </div>
                      </li>
                      <li>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>Discount</h5>
                          <h5>{discount} PKR</h5>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>Shipping</h5>
                          <h5>0 PKR</h5>
                        </div>
                      </li>

                    </ul>
                  </div>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Apply promo code" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2">Apply now</button>
                  </div>
                  <div className="totalOrder">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6>Total Order</h6>
                        <p>Guaranteed delivery day: {(() => {
                          const currentDate = new Date();
                          currentDate.setDate(currentDate.getDate() + 5);
                          return currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                        })()}</p>
                      </div>
                      <h3>{subtotal - discount} PKR</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}

export default CartFunction;
