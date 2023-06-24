import React, { useState } from 'react'
import { Link, Navigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { registerFunc } from '../../services/Api'
import { useNavigate } from 'react-router-dom';

function Index() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    password: "",
    role: "buyer",
  })
  // const [role, setRole] = useState("")
  // const [cnic_picture, setImage] = useState("");
  const submitUserData = async (e) => {
    e.preventDefault();
    // console.log(inputData);
    const { full_name, email, phone_number, password, address } = inputData
    if (full_name === "") {
      toast.error("Name is Required")
    }
    else if (email === "") {
      toast.error("Phone Number is Required")
    } else if (phone_number === "") {
      toast.error("Phone Number is Required")
    }
    else if (address === "") {
      toast.error("Address is Required")
    } else if (password === "") {
      toast.error("Password is Required")
    }
    // else if (cnic_picture === "") {
    //   toast.error("Image is Required")
    // } 
    else {

      const config = {
        "Content-Type": "application/json"
      }
      const response = await registerFunc({
        full_name: full_name,
        email: email,
        phone_number: phone_number,
        password: password,
        address: address,
        role: "buyer",

      }, config);

      console.log(response);

      if (response.status === 200) {
        toast.success("SignUp Successfully")
        setInputData({
          ...inputData,
          full_name: "",
          email: "",
          phone_number: "",
          cnic: "",
          password: "",
          address: "",

        });

        setTimeout(() => {
          navigate(`/SignIn`)
        }, 2000);

      } else {
        toast.error(response.response.data.message)
      }

    }
  }
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value })
  }

  return (
    <div className='signIn'>
      <div className="container">
        <div className="logo">
          <Link to="/"><h6>SAHULATGAAR</h6></Link>
        </div>
        <div className="row align-items-center mt-5">
          <div className="col-md-6">
            <h2>Sign-Up As <br /> Sahulatgaar Buyer</h2>
            <img src="/images/buyer.svg" alt="buyer" />
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-9 mx-auto">
                <h4>Sign Up</h4>
                <input type="text" className='form-control' onChange={setInputValue} placeholder='Enter Full Name' value={inputData.full_name} name="full_name" />
                {/* <input type="text" className='form-control' placeholder='Enter User Name' /> */}
                <input type="text" className='form-control' onChange={setInputValue} placeholder='Enter your email' value={inputData.email} name="email" />
                <input type="number" className='form-control' onChange={setInputValue} placeholder='Enter your Phone Number' value={inputData.phone_number} name="phone_number" />
                <input type="text" className='form-control' onChange={setInputValue} placeholder='Enter your Address' value={inputData.address} name="address" />
                <input type="password" className='form-control' onChange={setInputValue} placeholder='Password' value={inputData.password} name="password" />
                <button className='btn btn-primary' onClick={submitUserData} >Register</button>
                <div className="text-center mt-5 social_icons">
                  <div className="form-text mb-5">
                    or continue with
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link to=""><img src="/images/fb.svg" alt="social_icons" /></Link>
                    <Link to=""><img src="/images/apple.svg" alt="social_icons" /></Link>
                    <Link to=""><img src="/images/google.svg" alt="social_icons" /></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Index
