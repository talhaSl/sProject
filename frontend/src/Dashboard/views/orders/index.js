import { CCard, CCardBody, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { getOrders } from "../../../services/Api";
import {
    AppSidebar,
    AppFooter,
    AppHeader,
} from "../../components/index";
import { Link } from "react-router-dom";

const Order = () => {
    const [filter, setFilter] = useState('all');
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [prodData, setProdData] = useState([]);
    var srno = 1;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getOrders();
                // console.log(response);
                const order = response.data.data.orders || [];
                console.log({ order });
                setProdData(order);
            } catch (error) {
                setProdData([]);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <>
                        <h4 className="mb-4">Orders</h4>
                        <CRow>
                            <CCol xs>
                                <CCard className="mb-4">
                                    <CCardBody>
                                        <CTable align="middle" className="mb-0 border" hover responsive>
                                            <CTableHead color="light">
                                                <CTableRow>
                                                    <CTableHeaderCell className="text-center">Sr No.</CTableHeaderCell>
                                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                                    <CTableHeaderCell className="text-center">Phone Number</CTableHeaderCell>
                                                    <CTableHeaderCell>Email</CTableHeaderCell>
                                                    <CTableHeaderCell>Order Status</CTableHeaderCell>
                                                    <CTableHeaderCell className="text-center">Total Order</CTableHeaderCell>
                                                    <CTableHeaderCell>Order Details</CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody>
                                                {Array.isArray(prodData) ? (
                                                    prodData.map((item, index) => (
                                                        <CTableRow key={index}>
                                                            <CTableDataCell className="text-center">
                                                                {srno++}
                                                            </CTableDataCell>
                                                            <CTableDataCell >
                                                                {item.first_name}
                                                            </CTableDataCell>
                                                            <CTableDataCell className="text-center">
                                                                {item.phone_number}
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                {item.email}
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                {item.status}
                                                            </CTableDataCell>
                                                            <CTableDataCell className="text-center">
                                                                Rs. {item.totalPrice}
                                                            </CTableDataCell>
                                                            <CTableDataCell className="text-center">
                                                                <Link to={`/dashboard/orderdetails/${item._id}`} rel="noreferrer">View Order Details</Link>
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

export default Order;
