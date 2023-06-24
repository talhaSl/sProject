import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Header from "../Header/Index";
import StarRatings from "react-star-ratings";
import { getAllUserTypeFuncPub } from '../../services/Api';
import { BASE_URL } from '../../services/Helper';
function Index() {
  const [user, setUser] = useState("");
  // console.log(user);
  const userGet = async () => {
    const user = await getAllUserTypeFuncPub();
    // console.log("my user====>", user);
    if (user.status === 200) {
      setUser(user.data.data.reverse());
    } else {
      console.log("Error to get the user data");
    }
  };
  useEffect(() => {
    userGet();
  }, []);

  return (
    <>
      <Header />
      <div className="ele">
        <div className="container">
          <h1>Plumbers</h1>
          <div className="row">
            {Array.isArray(user) ? (
              user.map((specificUser) =>

                specificUser.field === "Plumber" ? (
                  <div className="col-md-4">
                    <div className="card">
                      <img
                        src={`${BASE_URL}/uploads/${specificUser.cnic_picture}`}
                        className="card-img-top"
                        alt="join"
                      />
                      <div className="card-body">
                        <h6 className="card-title">{specificUser.full_name} (Plumber)</h6>
                        <StarRatings
                          rating={2.403}
                          starDimension="40px"
                          starSpacing="15px"
                        />
                        {/* <Link to="/Worker" className="btn btn-primary"> */}
                        <Link to={`/Worker/${specificUser._id}`} className="btn btn-primary" >
                          BOOK
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null
              )
            ) : (
              <p> </p>
            )}


          </div>
        </div>
      </div>
    </>
  );
}

export default Index