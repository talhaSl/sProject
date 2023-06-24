import React, { useState, useEffect } from 'react';
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from '@coreui/react';
import 'react-toastify/dist/ReactToastify.css';
import { booking, updateStatus } from '../../../services/Api';
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import jwtDecode from 'jwt-decode';
import { Link, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
const Booking = () => {
    const [prodData, setProdData] = useState([]);
    var srno = 1;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await booking();
                const book = response.data.data.bookings || [];
                console.log({ book });
                setProdData(book);
            } catch (error) {
                setProdData([]);
            }
        };
        fetchData();
    }, []);
    const getToken = () => {
        return localStorage.getItem('token');
    };
    const { id } = useParams();
    const decodeToken = () => {
        const token = getToken();
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                return decodedToken.role;
            } catch (error) {
                console.log('Error decoding token:', error);
            }
        }
        return null;
    };
    const userRole = decodeToken();
    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <>
                        <h4 className="mb-4">Bookings</h4>
                        <CRow>
                            <CCol xs>
                                <CCard className="mb-4">
                                    <CCardBody>
                                        <CTable align="middle" className="mb-0 border" hover responsive>
                                            <CTableHead color="light">
                                                <CTableRow>
                                                    <CTableHeaderCell className="text-center">Sr No.</CTableHeaderCell>
                                                    {userRole === 'serviceProvider' ? (
                                                        <CTableHeaderCell>Customer</CTableHeaderCell>
                                                    ) : (
                                                        <CTableHeaderCell>Merchant</CTableHeaderCell>
                                                    )}
                                                    <CTableHeaderCell className="text-center">Package</CTableHeaderCell>
                                                    <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                                                    <CTableHeaderCell className="text-center">Charges</CTableHeaderCell>
                                                    <CTableHeaderCell className="text-center">Phone Number</CTableHeaderCell>
                                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                                    <CTableHeaderCell>Details</CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody>
                                                {Array.isArray(prodData) ? (
                                                    prodData.map((item, index) => (
                                                        <CTableRow key={index}>
                                                            <CTableDataCell className="text-center">{srno++}</CTableDataCell>
                                                            <CTableDataCell>
                                                                {item.providerId.full_name || item.bookerId.full_name}
                                                            </CTableDataCell>
                                                            <CTableDataCell className="text-center">{item.package}</CTableDataCell>
                                                            <CTableDataCell className="text-center">{item.status}</CTableDataCell>
                                                            <CTableDataCell className="text-center">{item.price}</CTableDataCell>
                                                            <CTableDataCell className="text-center">
                                                                {item.providerId.phone_number || item.bookerId.phone_number}
                                                            </CTableDataCell>
                                                            <CTableDataCell>{item.message}</CTableDataCell>
                                                            <CTableDataCell className="text-center">
                                                                <Link to={`/dashboard/completeBooking/${item._id}`} rel="noreferrer">proceed</Link>
                                                            </CTableDataCell>

                                                        </CTableRow>
                                                    ))
                                                ) : (
                                                    <p>No user data available</p>
                                                )}
                                            </CTableBody>
                                        </CTable>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </>
                </div>
                <AppFooter />
            </div>
        </div>
    );
};

export default Booking;
