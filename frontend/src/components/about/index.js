import React from 'react';

import Header from "../Header/Index";

function index() {
  return (
   <>
   <Header/>
    <div className="aboutUs">
    <div className="d-flex align-items-center justify-content-center">
      <div className="imgSection">
        <img src="/images/about.jpg" alt="about" />
      </div>
      <div className="content">
        <div className="innerSection">
         
          <h4>About Us</h4>
          <p>
            Welcome to Sahulatgaar! We are your one-stop online platform for convenient and reliable booking of electricians, plumbers, and mechanics. Our goal is to make your life easier by providing efficient solutions for your home maintenance needs.
            With increasing demand of online services in the industry, we take pride in offering top-notch services delivered by a team of highly skilled professionals. Our electricians, plumbers, and mechanics are well-trained in their respective fields. We have carefully handpicked our experts to ensure that you receive the highest quality service.
            At Sahulatgaar, customer satisfaction is our utmost priority. We are dedicated to providing prompt and reliable service, ensuring that your needs are met with professionalism and efficiency. We understand the importance of having trustworthy professionals at your doorstep, and that's exactly what we deliver.
            Thank you for choosing Sahulatgaar. We look forward to serving you and exceeding your expectations!
.</p>
         
        </div>
      </div>
    </div>
  </div>
  </>
  )
}


export default index