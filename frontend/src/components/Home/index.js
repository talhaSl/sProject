import React, { useEffect, useState } from "react";
import Header from "../Header/Index";
import { Link } from "react-router-dom";

import Card from "../cards";
import { getProductCategoryFunc } from "../../services/Api";

function Index() {

  const [token, setToken] = useState('');
  const [categoryData, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getProductCategoryFunc();
      const data = response.data.data.Category;
      setCategories(data);
    } catch (error) {
      console.log("Error fetching category data:", error);
    }
  };


  useEffect(() => {
    const gettoken = localStorage.getItem('token')
    setToken(gettoken)

    fetchData();

  }, []);

  return (
    <>
      <Header />
      <div className="banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="heading">
                <span>Best Pricing Ever </span>
                <h4>
                  YOUR <span>PROBLEM</span> <br /> WILL TELL <br />{" "}
                  <span>ABOUT</span> YOU
                </h4>
                <p>Check out best service providers</p>
              </div>
              <div>
                {token ? '' : (
                  <a className="btn btn-primary" href="/SignIn">Get Started</a>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <img src="/images/man.png" alt="man" />
            </div>
          </div>
          <div className="cards">
            <div className="row justify-content-between">
              <div className="card">
                <Link to="">
                  <img src="/images/man1.png" alt="man" />
                </Link>
              </div>
              <div className="card">
                <Link to="">
                  <img src="/images/man2.png" alt="man" />
                </Link>
              </div>
              <div className="card">
                <Link to="">
                  <img src="/images/man3.png" alt="man" />
                </Link>
              </div>
              <div className="card">
                <Link to="">
                  <img src="/images/man4.png" alt="man" />
                </Link>
              </div>
              <div className="card">
                <Link to="Service">Many More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="exclusiveShop">
        <div className="container">
          <div className="title">
            <span>Recomended</span>
            <h4>Explore Exclusive Shop</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
          </div>
          <ul className="nav nav-pills mb-3 mt-5" id="pills-tab" role="tablist">
            {categoryData.map(category => (
              <li className="nav-item" role="presentation" key={category._id}>
                <button
                  data-bs-target={`#pills-${category.name.toLowerCase()}`}
                  className={`nav-link ${category.name.toLowerCase() === 'electric' ? 'active' : ''}`}
                  id={`pills-${category.name.toLowerCase()}-tab`}
                  data-bs-toggle="pill"

                  type="button"
                  role="tab"
                  aria-controls={`pills-${category.name.toLowerCase()}`}
                  aria-selected={category.name.toLowerCase() === 'electric'}
                >
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)} Store
                </button>
              </li>
            ))}
            <li className="nav-item" role="presentation">
              <Link to="/Cart" style={{ textDecoration: "none" }}>
                <button
                  className="nav-link"
                  id="pills-view-all-tab"
                  data-bs-target="#pills-plumber"
                  type="button"
                  role="tab"
                  aria-controls="pills-plumber"
                  aria-selected="false"
                  style={{
                    width: "150px",
                    textDecoration: "none",
                    color: "#A63B32",
                  }}
                >
                  View All
                </button>
              </Link>
            </li>
          </ul>
          <Card categoryData={categoryData} />
        </div>
      </div>
      {/* <Card /> */}




      <div className="chooseUs">
        <div className="d-flex align-items-center justify-content-center">
          <div className="imgSection">
            <img src="/images/chooseUs.svg" alt="choose" />
          </div>
          <div className="content">
            <div className="innerSection">
              <span>Search for best</span>
              <h4>Why you <span>choose us ?</span></h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
              <Link to="">Read More</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="service">
        <div className="d-flex align-items-center justify-content-center">
          <div className="content">
            <div className="innerSection">
              <span>Service</span>
              <h4>The Services we provide for <span>our customer</span></h4>
              <ul>
                <li>
                  <div className="card">
                    <div class="d-flex align-items-center">
                      <div class="flex-shrink-0">
                        <img src="/images/service1.svg" alt="service" />
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <h5>Repair electric boards</h5>
                        <Link to="">Read More</Link>
                        <div className="text-end">
                          <p>Available Services <span>74</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="card">
                    <div class="d-flex align-items-center">
                      <div class="flex-shrink-0">
                        <img src="/images/service2.svg" alt="service" />
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <h5>Repair electric boards</h5>
                        <Link to="">Read More</Link>
                        <div className="text-end">
                          <p>Available Services <span>74</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="card">
                    <div class="d-flex align-items-center">
                      <div class="flex-shrink-0">
                        <img src="/images/service3.svg" alt="service" />
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <h5>Repair electric boards</h5>
                        <Link to="">Read More</Link>
                        <div className="text-end">
                          <p>Available Services <span>74</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="imgSection">
            <img src="/images/tool.svg" alt="tool" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
