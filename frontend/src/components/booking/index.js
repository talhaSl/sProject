import React, { useEffect, useState } from "react";
import Header from "../Header/Index";
import Footer from "../Footer/Index";
import { useParams } from "react-router-dom";
import { bookingPlaced, getProfileFunc } from "../../services/Api";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";

function Index() {
    const [userData, setUserData] = useState(null);
    const { id } = useParams();
    const getToken = () => {
        return localStorage.getItem("token");
    };

    const decodeToken = () => {
        const token = getToken();
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                return decodedToken;
            } catch (error) {
                console.log("Error decoding token:", error);
            }
        }
        return null;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProfileFunc(id);
                // console.log("Data================>", response.data.data);

                setUserData(response.data.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, [id]);
    const data1 = decodeToken();
    console.log("data is ==================>", data1);
    const submitUserData = async (e) => {
        e.preventDefault();
        const { _id, price, message } = userData;

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
                // name: data1?.full_name,
                bookerId: data1?.id,
                // user_phone: data1?.phone_number,
                providerId: _id,
                price: price,
                message: message,
            };

            try {
                const response = await bookingPlaced(data, config);
                console.log(response.status);

                if (response.status === 200) {

                    setUserData({
                        ...userData,
                        price: "",
                        message: "",
                    });
                    toast.success("Booking Added Successfully");
                }
            } catch (error) {
                console.error("Error placing booking:", error);
            }
        }
    };

    const role = decodeToken()?.role;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    return (
        <>
            <Header />
            <div className="contactUs">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h4>Enter your Booking Details</h4>
                            <p>Contact us for a quote, get solved service</p>
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
                                        {userData ? (
                                            <>
                                                <div className="col-md-6">
                                                    <label>Name*</label>
                                                    <span className="form-control">
                                                        {userData.full_name}
                                                    </span>

                                                    <label>Phone*</label>
                                                    <span className="form-control">
                                                        {userData.phone_number}
                                                    </span>
                                                    <label>Price*</label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name="price"
                                                        value={userData.price}
                                                        placeholder="800 rs inspection fee"
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className="col-md-6">
                                                    <label>Problem Description</label>
                                                    <textarea
                                                        className="form-control"
                                                        cols="30"
                                                        rows="7"
                                                        name="message"
                                                        value={userData.message}
                                                        onChange={handleChange}
                                                    ></textarea>
                                                </div>
                                            </>
                                        ) : (
                                            <p>Loading user data...</p>
                                        )}
                                    </div>
                                    <div className="text-center mt-4">
                                        {role === "buyer" && role ? (
                                            <button
                                                onClick={submitUserData}
                                                className="btn btn-primary w-50"
                                            >
                                                Book Now
                                            </button>
                                        ) : (
                                            <p>Login First as a buyer</p>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Footer />
        </>
    );
}

export default Index;
