import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../services/Helper';
import jwtDecode from "jwt-decode";

function Index() {
  const role = localStorage.getItem('role')
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const decodeToken = () => {
    const token = getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded ===============>", decodedToken);

        return decodedToken;
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    }
    return null;
  };
  const userPic = decodeToken();
  console.log("ID=================>>>>", userPic);
  const navigate = useNavigate();

  const [token, setToken] = useState('');


  useEffect(() => {
    const gettoken = localStorage.getItem('token')
    setToken(gettoken)


  }, []);
  const Logout = () => {
    localStorage.removeItem('token')
    localStorage.setItem("productid", []);
    localStorage.setItem("product", []);

    navigate("/SignIn")

  }
  return (
    <div>
      <nav className="navbar navbar-light">
        <div className="container">
          <Link to='/' className="navbar-brand">
            <img src="/images/logo.svg" alt="logo" />
          </Link>
          <div className="menu">
            <ul className="navbar-nav d-flex flex-row align-items-center">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>

              <li className="nav-item">
                <Link to="/Service" className="nav-link">Services</Link>
              </li>
              <li className="nav-item">
                <Link to="/About" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/Policy" className="nav-link">Policy</Link>
              </li>
              <li className="nav-item">
                <Link to="/ContactUs" className="nav-link">Contact</Link>
              </li>
              <li className="nav-item">
                <Link to="/billingDetail" className="nav-link cart"><img src="/images/cart.svg" alt="cart" /></Link>
              </li>
              <li className="nav-item">
                <Link to="/SignIn" className="nav-link">
                  {token ? "" : (<button className='btn btn-primary'>Join Now</button>)}
                </Link>
              </li>
              <li className="nav-item">
                <Dropdown class="nav-link">
                  <Dropdown.Toggle id="dropdown-basic">
                    {token ? <img className='main_user_img' src={`${BASE_URL}/uploads/${userPic.cnic_picture}`} alt="user" /> : ""}

                  </Dropdown.Toggle>


                  {token ? (<Dropdown.Menu>
                    <Dropdown.Item href={`/Profile/${userPic.id}`}>View Profile</Dropdown.Item>

                    {role === 'buyer' ? "" : <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>}
                    <Dropdown.Item href="#" onClick={Logout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                  ) : ""}



                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Index
