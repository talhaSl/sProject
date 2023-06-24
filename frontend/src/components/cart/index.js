import React, { useEffect, useState } from "react";
import Header from "../Header/Index";
import Footer from "../Footer/Index";
import { ToastContainer, toast } from "react-toastify"

import { Link } from "react-router-dom";
import PopularProduct from "../popularProduct";
import { getProductFunc, getProductFuncPub } from "../../services/Api";
import CartFunction from "../billingDetail";
import { BASE_URL } from "../../services/Helper";

function Index() {
  const [filter, setFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [catFlag, setCatFlag] = useState(false)
  const [priceFlag, setPriceFlag] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const minfun = (event) => {
    setMin(event.target.value)
  }
  const maxfun = (event) => {
    setMax(event.target.value)
  }
  // const [token, setToken] = useState('');
  useEffect(() => {
    fetchDataPub();
  }, []);
  const handleAddToCart = (products) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, products];
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    setCartItems(updatedCart)
    toast.success('Product added to cart successfully!');
    
  }

  const fetchDataPub = async (categoryName) => {
    const response = await getProductFuncPub();
    const product = response.data.data.product;
    const filteredProducts = products.filter((product) => product.cat_id.name === categoryName);
    if (categoryName === 'electric') {
      setProducts(filteredProducts);
    } else if (categoryName === 'construction') {
      setProducts(filteredProducts);
    } else if (categoryName === 'plumber') {
      setProducts(filteredProducts);
    }
    else {
      setProducts(product);
    }
  };
  const filterApply = () => {
    const minValue = parseInt(min);
    const maxValue = parseInt(max);
    setPriceFlag(true)

    console.log("MIN Value: " + minValue);
    console.log("MAX Value: " + maxValue);

    if (minValue > maxValue) {
      toast.error("Max value should be greater than Min value");
    }
    else if (minValue === isNaN && maxValue === isNaN) {


    }
  }
  
  

  return (
    <>
      <Header />
      <div className="cart">
        <div className="cartSection">
          <div className="container">
            <div className="cartBanner">
              <img src="/images/cartbanner.svg" alt="cartbanner" />
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="accordion" id="accordionPanelsStayOpenExample">
                  <div className="accordion-item">
                    <p
                      className="accordion-header"
                      id="panelsStayOpen-headingFive"
                    >
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseFive"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseFive"
                      >
                        Categories
                      </button>
                    </p>
                    <div
                      id="panelsStayOpen-collapseFive"
                      className="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-headingFive"
                    >
                      <div className="accordion-body">
                        <ul className="list-none category">
                          {[...new Set(products.map((product) => product.cat_id.name))].map((categoryName) => {
                            const filteredProducts = products.filter((product) => product.cat_id.name === categoryName);
                            const productCount = filteredProducts.length;
                            return (
                              <li key={categoryName}>
                                <button onClick={() => {
                                  setFilter(categoryName);
                                  setCatFlag(true);
                                }} className="btn btn-link" style={{
                                  display: 'flex',
                                  width: '100%',
                                  justifyContent: 'space-between',
                                  textDecoration: 'none',
                                  color: '#000'
                                }}>
                                  <>
                                    {categoryName}
                                  </>
                                  <span className="badge rounded-pill bg-info text-dark">
                                    {productCount}
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>


                    </div>
                  </div>
                  {/* <div className="accordion-item">
                    <p
                      className="accordion-header"
                      id="panelsStayOpen-headingOne"
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        Brands
                      </button>
                    </p>
                    <div
                      id="panelsStayOpen-collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-headingOne"
                    >
                      <div className="accordion-body">
                        <ul className="list-none">
                          <li>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault1"
                              />
                              <label
                                className="form-check-label"
                                for="flexCheckDefault1"
                              >
                                Filtre by brand item
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault2"
                              />
                              <label
                                className="form-check-label"
                                for="flexCheckDefault2"
                              >
                                Filtre by brand item
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault3"
                              />
                              <label
                                className="form-check-label"
                                for="flexCheckDefault3"
                              >
                                Filtre by brand item
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault4"
                              />
                              <label
                                className="form-check-label"
                                for="flexCheckDefault4"
                              >
                                Filtre by brand item
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault5"
                              />
                              <label
                                className="form-check-label"
                                for="flexCheckDefault5"
                              >
                                Filtre by brand item
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault6"
                              />
                              <label
                                className="form-check-label"
                                for="flexCheckDefault6"
                              >
                                Filtre by brand item
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  <div className="accordion-item">
                    <p
                      className="accordion-header"
                      id="panelsStayOpen-headingTwo"
                    >
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        Rating
                      </button>
                    </p>
                    <div
                      id="panelsStayOpen-collapseTwo"
                      className="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-headingTwo"
                    >
                      <div className="accordion-body">
                        <ul className="list-none">
                          <li>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault7"
                              />
                              <label
                                className="form-check-label"
                                for="flexCheckDefault7"
                              >
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
                                    src="/images/ystar.svg"
                                    className="me-1"
                                    alt="star"
                                  />
                                </div>
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault8"
                              />
                              <label
                                className="form-check-label"
                                for="flexCheckDefault8"
                              >
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
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault9"
                              />
                              <label
                                className="form-check-label"
                                for="flexCheckDefault9"
                              >
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
                                <img
                                  src="/images/estar.svg"
                                  className="me-1"
                                  alt="star"
                                />
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault10"
                              />
                              <label
                                className="form-check-label"
                                for="flexCheckDefault10"
                              >
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
                                <img
                                  src="/images/estar.svg"
                                  className="me-1"
                                  alt="star"
                                />
                                <img
                                  src="/images/estar.svg"
                                  className="me-1"
                                  alt="star"
                                />
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault11"
                              />
                              <label
                                className="form-check-label"
                                for="flexCheckDefault11"
                              >
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
                                <img
                                  src="/images/estar.svg"
                                  className="me-1"
                                  alt="star"
                                />
                                <img
                                  src="/images/estar.svg"
                                  className="me-1"
                                  alt="star"
                                />
                                <img
                                  src="/images/estar.svg"
                                  className="me-1"
                                  alt="star"
                                />
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="range-slider">
                  <div className="filter">
                    <label for="customRange3" class="form-label">
                      Price
                    </label>
                    {/* <input
                      type="range"
                      class="form-range"
                      min="0"
                      max="5"
                      step="0.5"
                      id="customRange3"
                    /> */}
                    <div className="d-flex align-items-end justify-content-between inputs">
                      <div className="w-50">
                        <label>Min</label>
                        <input type="number" onChange={minfun} className="w-100" placeholder="From" />

                      </div>
                      <span className="mx-2 mb-2">-</span>
                      <div className="w-50">
                        <label>Max</label>
                        <input
                          // we can change event listener into 2 ways
                          onChange={maxfun}
                          id="maxValue"
                          type="number"
                          className="w-100"
                          placeholder="To"

                        />
                      </div>
                    </div>
                    <div className="d-flex buttons">
                      <button className="btn btn-primary" onClick={filterApply}>Apply</button>
                      <button className="btn btn-light">Cancel</button>

                    </div>
                    <p> Filter Apply on Old Price</p>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="cartCard">
                  {products.filter(product => {
                    if (filter === 'all') {
                      return product
                    } else {
                      if (product.cat_id.name === filter) {
                        return product
                      }
                    }
                  }).filter(product => {
                    if (!min || !max) {
                      return product
                    } else {
                      if (parseInt(product.price) >= min && parseInt(product.price) <= max) {
                        return product
                      }
                    }
                  }).reverse().sort((a, b) => {
                    // console.log(priceFlag)
                    if (priceFlag) {
                      return parseInt(a.price) - parseInt(b.price);
                    } else if (catFlag) {
                      return 0
                    }
                    else if (priceFlag && catFlag) {
                      return parseInt(a.price) - parseInt(b.price)
                    } else {
                      return 0
                    }
                  }).map((product) => (
                    <div key={product._id} class="card mb-3">
                      <div class="row g-0">
                        <div class="col-md-3">
                          <img
                            src={`${BASE_URL}/uploads/${product.image}`}
                            class="img-fluid rounded-start w-100"
                            alt={product.name}
                          />
                        </div>
                        <div class="col-md-9">
                          <div className="row">
                            <div className="col-md-6">
                              <div class="card-body">
                                <h5 class="card-title">{product.name}</h5>
                                <p class="card-text">
                                  {product.discription}
                                </p>
                                <div className="d-flex mb-4">
                                  <img
                                    src="/images/bstar.svg"
                                    className="me-1"
                                    alt="star"
                                  />
                                  <img
                                    src="/images/bstar.svg"
                                    className="me-1"
                                    alt="star"
                                  />
                                  <img
                                    src="/images/bstar.svg"
                                    className="me-1"
                                    alt="star"
                                  />
                                  <img
                                    src="/images/bstar.svg"
                                    className="me-1"
                                    alt="star"
                                  />
                                  <img
                                    src="/images/bestar.svg"
                                    className="me-1"
                                    alt="star"
                                  />
                                </div>
                                <div className="d-flex align-items-center justify-content-between list">
                                  <p class="card-text">Condition</p>
                                  <p class="card-text">
                                    <span>New</span>
                                  </p>
                                </div>
                                <div className="d-flex align-items-center justify-content-between list">
                                  <p class="card-text">Supplier</p>
                                  <p class="card-text">KJ Brothers</p>
                                </div>
                                <div className="d-flex align-items-center justify-content-between list">
                                  <p class="card-text">Delivery</p>
                                  <p class="card-text">pakistan</p>
                                </div>
                                <div className="d-flex align-items-center justify-content-between list">
                                  <p class="card-text">Stock</p>
                                  <p class="card-text">
                                    <span>{product.qty}pcs</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div class="card-body">
                                {/* <h5 class="card-title">{`${Math.floor(product.price - (product.price * 16 / 100))} PKR`}</h5> */}
                                <h5 class="card-title">{`${product.price} PKR`}</h5>
                                {/* <p class="price">{`${product.price} PKR`}</p> */}
                                <p className="shipping">Free Shipping</p>
                                <p class="card-text">Delivery in 4 day</p>
                                <Link to="" className="btn btn-primary rounded" onClick={() => handleAddToCart(product)} >
                                  Add To Cart
                                  <img
                                    className="ms-2"
                                    src="/images/warrow.svg"
                                    alt="arrow"
                                  />
                                </Link>
                                {/* <button className="btn btn-light rounded mt-3">
                                  Add to Wishlist
                                  <img
                                    className="ms-2"
                                    src="/images/heart.svg"
                                    alt="heart"
                                  />
                                </button> */}
                              </div>
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>
                  ))}

                </div>

              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-3">

              </div>
              <PopularProduct />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div >
      <Footer />
    </>
  );
}
export default Index;
