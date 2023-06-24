import React, { useState, useEffect } from 'react'
import "./profile.css"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/esm/Row"
// import { singleUserFunc } from '../../services/Apis'
import { useParams } from 'react-router-dom'

// import moment from "moment"
const Profile = () => {
  const [userProfile, setUserProfile] = useState({})
  // const [showSpin, setShowSpin] = useState(true)
  const { id } = useParams();
  // const userProfileGet = async () => {
  //   const response = await singleUserFunc(id);
  //   if (response.status === 200) {
  //     setUserProfile(response.data)
  //   } else {
  //     console.log("Error to get the user data");
  //   }
  // }
  // useEffect(() => {
  //   userProfileGet()
  // }, [id])
  return (
    <>
      {
        <div className='container'>
          <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className='col'>
                  <div className='card-profile-stats d-flex justify-content-center'>
                    {/* <img src={`${BASE_URL}/uploads/${userProfile.profile}`} alt="" /> */}
                  </div>
                </div>
              </Row>
              {/* <div className='text-center'>
                <h3>{userProfile.fname.charAt(0).toUpperCase() + userProfile.fname.slice(1) + " " + userProfile.lname.charAt(0).toUpperCase() + userProfile.lname.slice(1)}</h3>

                <h4><i class="fa-sharp fa-solid fa-envelope email"></i>&nbsp;:- <span>{userProfile.email}</span></h4>
                <h4>
                  <i class="fa-sharp fa-solid fa-mobile mobile"></i>&nbsp;:- <span>{userProfile.mobile}</span>
                </h4>
                <h4>
                  <i class="fa-solid fa-person male"></i>&nbsp;:- <span>{userProfile.gender}</span>
                </h4>
                <h4>
                  <i class="fa-regular fa-toggle-on status"></i>&nbsp;:- <span>{userProfile.status}</span>
                </h4>
                <h4>
                  <i class="fa-solid fa-location-dot location"></i>&nbsp;:- <span>{userProfile.location}</span>
                </h4>
                <h5>
                  <i class="fa-solid fa-calendar-days calendar"></i>&nbsp;:-&nbsp;{moment(userProfile.datecreated).format("DD-MM-YYYY hh-mm-ss")} <span></span>
                </h5>
                <h5>
                  <i class="fa-solid fa-calendar-days calendar"></i>&nbsp;Date Updated&nbsp;:- <span></span>
                </h5>
              </div> */}
            </Card.Body>
          </Card>

        </div>
      }

    </>
  )
}
export default Profile