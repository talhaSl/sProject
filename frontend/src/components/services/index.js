import React from "react";
import Header from "../Header/Index";
import Footer from "../Footer/Index";
import { Link } from "react-router-dom";
function index() {

  return (
    <div className="services">
      <Header />
      <div className="serviceBanner">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <ul>
                <li>
                  <Link to="/Electrician"><div className="card">
                    <img src="/images/bar.svg" alt="bar" />
                    <p>Electrician</p>
                  </div></Link>
                </li>
                <li>
                  <Link to="/Mechanic"><div className="card">
                    <img src="/images/bar.svg" alt="bar" />
                    <p>Mechanic</p>
                  </div></Link>
                </li>
                <li>
                  <Link to="/plumber"><div className="card">
                    <img src="/images/bar.svg" alt="bar" />
                    <p>Plumber</p>
                  </div></Link>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <img src="/images/man.png" alt="man" />
            </div>
            <div className="col-md-3">
              <ul>
                <li>
                  <Link to="/Painter"><div className="card">
                    <img src="/images/bar.svg" alt="bar" />
                    <p>Painter</p>
                  </div></Link>
                </li>
                <li>
                  <Link to="/Carpenter"><div className="card">
                    <img src="/images/bar.svg" alt="bar" />
                    <p>Carpenter</p>
                  </div></Link>
                </li>
                <li>
                  <Link to="/Tutor"><div className="card">
                    <img src="/images/bar.svg" alt="bar" />
                    <p>Tutor</p>
                  </div></Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="desiredService">
        <div className="container">
          <h4>CHOOSE YOUR <span>DESIRE</span> SERVICE</h4>
          <Link to=""><img src="/images/category.svg" alt="service" /></Link>
          <Link to=""><img src="/images/electrician.svg" alt="service" /></Link>
          <Link to=""><img src="/images/mechanic.svg" alt="service" /></Link>
          <Link to=""><img src="/images/plumber.svg" alt="service" /></Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default index;
