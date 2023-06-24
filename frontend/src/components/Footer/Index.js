import React from 'react'
import { Link } from 'react-router-dom'

function Index() {
  return (
    <div className='footer'>
     <div className="container">
      <div className="footerbanner">
        <div className="row align-items-center">
          <div className="col-md-6">
            <p>Ready to get started?</p>
            <h4>Talk to us today</h4>
          </div>
          <div className="col-md-6">
           <div className="text-end">
           <button className='btn btn-primary'>
              Get Started
            </button>
           </div>
          </div>
        </div>
      </div>
      <div className="row align-items-center mt-5">
        <div className="col-md-2">
          <div className="logo">
            <img src="/images/logo.svg" alt="logo" />
          </div>
        </div>
        <div className="col-md-3">
          <ul>
            <li><Link to="">About Sahulatgar</Link></li>
            <li><Link to="">Services</Link></li>
            <li><Link to="">Policy</Link></li>
            <li><Link to="">Get Paid</Link></li>
          </ul>
        </div>
        <div className="col-md-3">
        <ul>
            <li><Link to="">Exclusive Shop</Link></li>
            <li><Link to="">Testimonials</Link></li>
            <li><Link to="">How it Works</Link></li>
            <li><Link to="">Member Discount</Link></li>
          </ul>
        </div>
        <div className="col-md-4">
          <ul>
            <li><h6>BE READY TO GET BEST SERVICES</h6></li>
            <li><p>Join our no-code community for free. No Spam. Ever. </p></li>
            <li className='d-flex'><input type="text" placeholder='Enter e-mail to subscribe' /> <button className='btn btn-primary'>Subscribe</button></li>
          </ul>
        </div>
      </div>
     </div>
    </div>
  )
}

export default Index
