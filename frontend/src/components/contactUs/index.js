import React from "react";
import Header from "../Header/Index";
import Footer from "../Footer/Index";
function index() {
  return (
    <>
    <Header/>
    <div className="contactUs">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4>Get in touch!</h4>
            <p>
              Contact us for a quate, <br /> get solved service
            </p>
            <ul className="list-none">
              <li>
                <a href="tel:+923086363181">+92 308 6363 181</a>
              </li>
              <li>12 street Punjab, Pakistan</li>
              <li>Sahulatgaar.co</li>
            </ul>
          </div>
          <div className="col-md-6">
            <div className="card">
              <form action="">
                <div className="row">
                  <div className="col-md-6">
                    <label>Name*</label>
                    <input className="form-control" type="text" />
                    <label>Email*</label>
                    <input className="form-control" type="email" />
                    <label>Phone*</label>
                    <input className="form-control" type="number" />
                  </div>
                  <div className="col-md-6">
                    <label>Message</label>
                    <textarea className="form-control" cols="30" rows="7"></textarea>
                  </div>
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary w-50">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default index;
