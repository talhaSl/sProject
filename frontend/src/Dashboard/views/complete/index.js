import { CCard, CCardBody, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { booking, updateStatus } from "../../../services/Api";
import {
    AppSidebar,
    AppFooter,
    AppHeader,
} from "../../components/index";

const BookingDetails = () => {
    const [prodData, setProdData] = useState([]);
    const [bookData, setBookData] = useState("")
    let srno = 1;
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await booking();

                const bookings = response.data.data.bookings || [];
                const filteredBooking = bookings.filter((item) => item._id === id);
                console.log("Bookings=========>>>>", filteredBooking);

                setBookData(filteredBooking[0]);
            } catch (error) {
                setBookData([]);
            }
        };

        fetchData();
    }, [id]);

    const completeBooking = async () => {
        try {
            const response = await updateStatus(id);
            console.log("Response===============>>>>", response);
            const booking = response.data.data.booking || [];
            console.log(booking);
            toast.success("Booking Process successfully")
            navigate(-1)
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <>
                        <h4 className="mb-4">Booking Details</h4>
                        <div style={{ textAlign: 'right' }}>
                            {bookData.status === 'open' ? (
                                <button className="btn btn-primary" onClick={() => completeBooking()}>
                                    Complete
                                </button>
                            ) : <h6>Service has been completed</h6>}
                        </div>

                    </>
                </div>
                <AppFooter />
            </div>
        </div >
    );
};

export default BookingDetails;
