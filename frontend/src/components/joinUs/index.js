import React from "react";
import {Link} from "react-router-dom"

function index() {
  return (
    <div className="joinUs">
      <div className="container">
        <h1>Join Sahulatgaar Today and become a part of ourselves</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img
                src="/images/join1.svg"
                className="card-img-top"
                alt="join"
              />
              <div className="card-body">
                <h5 className="card-title">
                  Become a Sahulatgaar Service Provider
                </h5>
               <Link to="/SignupProvider" className="btn btn-primary">Join Now</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src="/images/join2.svg"
                className="card-img-top"
                alt="join"
              />
              <div className="card-body">
                <h5 className="card-title">Become a Sahulatgaar Buyer</h5>
                <Link to="/SignupBuyer" className="btn btn-primary">Join Now</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src="/images/join3.svg"
                className="card-img-top"
                alt="join"
              />
              <div className="card-body">
                <h5 className="card-title">Become a Sahulatgaar Seller</h5>
                <Link to="/SignupSeller" className="btn btn-primary">Join Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
