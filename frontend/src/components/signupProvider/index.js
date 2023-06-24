import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
// import navigate from "react-router-dom"
import { registerFunc } from '../../services/Api'
import { useNavigate } from 'react-router-dom';



import 'react-toastify/dist/ReactToastify.css';
import { uploadFile } from '../../services/ApiCall';

function Index() {
  const navigate = useNavigate();
  const field = ["Electrician", "Mechanic", "Plumber", "Painter", "Carpenter", "Tutor"];
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    uploadFile(selectedFile)
      .then(data => {
        console.log(data.fileName)
        toast.success("Image Uploaded Successfully")
        setInputData({ ...inputData, cnic_picture: data.fileName })
      });
  }

  // const [inputData, setInputData] = useState("")
  const [inputData, setInputData] = useState({
    full_name: "",
    phone_number: "",
    cnic: "",
    password: "",
    address: "",
    role: "Provider",
    store_name: "",
    profile: "",
    field: "",
  })
  const submitUserData = async (e) => {
    e.preventDefault();
    // console.log(inputData);
    const { full_name, phone_number, cnic, password, address, store_name, field, cnic_picture } = inputData
    if (full_name === "") {
      toast.error("Name is Required")
    } else if (phone_number === "") {
      toast.error("Phone Number is Required")
    } else if (cnic === "") {
      toast.error("Cnic is Required")
    } else if (password === "") {
      toast.error("Password is Required")
    } else if (address === "") {
      toast.error("Address is Required")
    } else if (store_name === "") {
      toast.error("Store Name is Required")
    } else if (field === "") {
      toast.error("Field is Required")
    }
    else if (cnic_picture === "") {
      toast.error("Image is Required")
    }
    else {

      const config = {
        "Content-Type": "application/json"
      }
      const response = await registerFunc({
        full_name: full_name,
        phone_number: phone_number,
        cnic: cnic,
        password: password,
        address: address,
        role: "serviceProvider",
        store_name: store_name,
        field: field,
        cnic_picture: cnic_picture,
      }, config);

      // console.log(response.status);
      toast.success("SignUp Successfully")
      if (response.status === 200) {
        setInputData({
          ...inputData,
          full_name: "",
          phone_number: "",
          cnic: "",
          password: "",
          address: "",
          store_name: "",
          field: "",
        });
        setTimeout(() => {
          navigate(`/SignIn`)
        }, 2000);

      } else {
        toast.error("error accured")
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
            <h2>Sign-Up As <br /> Sahulatgaar Service Provider</h2>
            <img src="/images/provider.svg" alt="provider" />
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-9 mx-auto">
                <h4>Sign Up</h4>
                <input type="text" onChange={setInputValue} className='form-control' value={inputData.full_name} placeholder='Enter Name' name='full_name' />
                <input type="text" onChange={setInputValue} className='form-control' value={inputData.phone_number} placeholder='Phone Number' name='phone_number' />
                <input type="text" onChange={setInputValue} className='form-control' value={inputData.cnic} placeholder='Enter CNIC' name="cnic" />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="form-control"
                  name="file"
                />
                <select
                  onChange={setInputValue}
                  className="form-control"
                  value={inputData.field}
                  name="field"
                ><option value="">Select Field</option>
                  {Array.isArray(field) ? field.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category}
                    </option>
                  )) : "Field not found"}
                </select>
                <input type="password" onChange={setInputValue} className='form-control' value={inputData.password} placeholder='Password' name="password" />

                {/* <input type="password" onChange={setInputValue} className='form-control' value={inputData.password} placeholder='Confirm Password' /> */}
                <input type="text" onChange={setInputValue} className='form-control' value={inputData.address} placeholder='Address' name="address" />
                <input type="text" onChange={setInputValue} className='form-control' value={inputData.store_name} placeholder='Store Name' name="store_name" />
                <button className='btn btn-primary' onClick={submitUserData}>Register</button>
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
