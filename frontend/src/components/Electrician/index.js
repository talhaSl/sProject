import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Index';
import StarRatings from 'react-star-ratings';
import { getAllUserTypeFuncPub, getrate } from '../../services/Api';
import { BASE_URL } from '../../services/Helper';

function Index() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await getAllUserTypeFuncPub();
      if (response.status === 200) {
        setUsers(response.data.data.reverse());
      } else {
        console.log('Error fetching user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Header />
      <div className="ele">
        <div className="container">
          <h1>Electricians</h1>
          <div className="row">
            {Array.isArray(users) ? (
              users.map((specificUser) => {
                if (specificUser.field === 'Electrician') {
                  return (
                    <div className="col-md-4" key={specificUser._id}>
                      <div className="card">
                        <img
                          src={`${BASE_URL}/uploads/${specificUser.cnic_picture}`}
                          className="card-img-top"
                          alt="join"
                        />
                        <div className="card-body">
                          <h6 className="card-title">

                            {specificUser.full_name} (Electrician)
                          </h6>
                          <StarRatings rating={2.403} starDimension="40px" starSpacing="15px" />
                          <Link to={`/Worker/${specificUser._id}`} className="btn btn-primary">
                            BOOK
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
