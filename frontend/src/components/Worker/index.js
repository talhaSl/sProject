import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"

import Header from "../Header/Index";
import { bookingPlaced, getProfileFunc, getrate } from '../../services/Api';
import { BASE_URL } from '../../services/Helper';
import { ToastContainer, toast } from "react-toastify";

function Index() {
  const [userData, setUserData] = useState(null);
  const [bookData, setBookData] = useState({});
  const [selectedService, setSelectedService] = useState('hourly');
  const [serviceData, setServiceData] = useState(null);
  const [selectedRate, setSelectedRate] = useState(serviceData?.hourly || 0);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfileFunc(id);
        setUserData(response.data.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchDataPub = async () => {
      try {
        const response = await getrate(id);
        const rates = response.data.data.Rates;
        console.log("Response============================>>>>>", rates);
        const filteredResponse = rates.filter((item) => item.userId === id);
        setServiceData(filteredResponse[0]);
      } catch (error) {
        console.error('Error fetching service data:', error);
      }
    };

    fetchDataPub();
    fetchData();
  }, [id]);
  const submitUserData = async (e) => {
    e.preventDefault();
    const { price, message } = bookData;

    if (price === "") {
      toast.error("Price is Required");
    } else if (message === "") {
      toast.error("Description is Required");
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = {
        providerId: userData._id,
        price: selectedRate !== 0 || selectedRate ? selectedRate : price,
        message: message,
        package: selectedService,
      };

      try {
        const response = await bookingPlaced(data, config);
        console.log(response.status);
        if (response.status === 200) {
          setBookData({
            ...bookData,
            price: "",
            message: "",
          });
          toast.success("Booking Added Successfully");
        }
      } catch (error) {
        console.error("Error placing:", error);
      }
    }
  };
  // const role = decodeToken()?.role;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  return (
    <>
      <Header />
      <div className="App">
        {
          userData ? (<div className='profile'>
            <div className='dp'>
              <img src={`${BASE_URL}/uploads/${userData.cnic_picture}`} alt='Profile Pic'></img>
            </div>
            <div className='detail'>
              <h1 >{userData.full_name}</h1>
              <p>{userData.field}</p>
            </div>
          </div>) : ""
        }
        <div className="deals">
          {serviceData ? (
            <>
              <div className="deal1">
                <h2 className="pkg">Hourly Pack</h2>
                <h2 className="price">Starting From <b>{serviceData.hourly}</b></h2>
                <p className="dcp">{serviceData.discription}</p>
                <button
                  className="bton"
                  onClick={() => {
                    setSelectedService('hourly');
                    setSelectedRate(serviceData.hourly);
                  }}
                >
                  Select
                </button>

              </div>
              <div className="deal2">
                <h2 className="pkg">Daily Pack</h2>
                <h2 className="price">Starting From <b>{serviceData.daily}</b></h2>
                <p className="dcp">{serviceData.discription}</p>
                <button
                  className="bton"
                  onClick={() => {
                    setSelectedService('daily');
                    setSelectedRate(serviceData.daily);
                  }}
                >
                  Select
                </button>

              </div>
              <div className="deal3">
                <h2 className="pkg">Contract Pack</h2>
                <h2 className="price">Starting From <b>{serviceData.contract}</b></h2>
                <p className="dcp">{serviceData.discription}</p>
                <button
                  className="bton"
                  onClick={() => {
                    setSelectedService('contract');
                    setSelectedRate(serviceData.contract);
                  }}
                >
                  Select
                </button>

              </div>
            </>
          ) : null}
        </div>
        <div className='info'>
          <div className='table'>
            <div className='problem'>
              <h1 className='pdcp'>Problem Description</h1>
              <input
                type="text"
                className='pdetail form-control'
                onChange={handleChange}
                placeholder="Description"
                name="message"
                value={bookData.message}
              />
            </div>
            <div className='prate'>
              {/* <h3 className='offer'>Offer Rate</h3> */}
              <input
                type="text"
                className="value form-control"
                placeholder={`${selectedRate} PKR`}
                onChange={handleChange}
                name="price"
                value={bookData.price}
              />
              <h3
                type="text"
                className=""
                name="package">Rate per : {selectedService}</h3>
            </div>
          </div>
          <button className='sendreq' onClick={submitUserData}><h3>Send Request</h3>
          </button>
        </div>
        <div className='reviews'>
          <h1>Client Reviews</h1>
          <div className='review1'>
            <h2 className='name'>Hamza Tariq</h2>
            <h4 className='rrate'>5.0</h4>
            <p className='review'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>

          </div>
          <div className='review2'>
            <h2 className='name'>Hamza Tariq</h2>
            <h4 className='rrate'>5.0</h4>
            <p className='review'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>

          </div>
          <div className='review3'>

          </div>
        </div>
        <ToastContainer />

      </div>
    </>
  );
}

export default Index