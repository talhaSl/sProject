import { CCard, CCardBody, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getOrderDetails, completeOrderAPI } from "../../../services/Api";
import {
    AppSidebar,
    AppFooter,
    AppHeader,
} from "../../components/index";

const OrderDetails = () => {
    const [prodData, setProdData] = useState([]);
    let srno = 1;
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            console.log(id)
            try {
                const response = await getOrderDetails(id);
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

    const completeOrder = async () => {
        console.log(id)
        try {
            const response = await completeOrderAPI(id);
            // console.log(response);
            const order = response.data.data.orders || [];
            console.log({ order });
            toast.success("Order Process successfully")
            setProdData(order);
        } catch (error) {
            setProdData([]);
        }
    };

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <>
                        <h4 className="mb-4">Order Details</h4>
                        <div style={{ textAlign: 'right' }} >
                            {prodData.status == 'open' ? <button className="btn btn-primary" onClick={completeOrder}>Proceed</button> : ""}
                        </div>
                        <CRow>
                            <CCol xs>
                                <CCard className="mb-4">
                                    <CCardBody>
                                        <CTable align="middle" className="mb-0 border" hover responsive>
                                            <CTableHead color="light">
                                                <CTableRow>
                                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                                    <CTableHeaderCell className="text-center">Phone Number</CTableHeaderCell>
                                                    <CTableHeaderCell>Email</CTableHeaderCell>
                                                    <CTableHeaderCell className="text-center">Total Order</CTableHeaderCell>
                                                    <CTableHeaderCell>Order Details</CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody>
                                                        <CTableRow>
                                                            <CTableDataCell >
                                                                {prodData.first_name}
                                                            </CTableDataCell>
                                                            <CTableDataCell className="text-center">
                                                                {prodData.phone_number}
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                {prodData.email}
                                                            </CTableDataCell>
                                                            <CTableDataCell className="text-center">
                                                               Rs. {prodData.totalPrice}
                                                            </CTableDataCell>
                                                        </CTableRow>
                                            </CTableBody>
                                            <CTableRow>
                                                    <CTableHeaderCell>Product</CTableHeaderCell>
                                            </CTableRow>
                                            <CTableHead color="light">
                                                <CTableRow>
                                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                                    <CTableHeaderCell className="text-center">Unit Price</CTableHeaderCell>
                                                    <CTableHeaderCell>Quantity</CTableHeaderCell>
                                                    <CTableHeaderCell className="text-center">Total Price</CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody>
                                            {Array.isArray(prodData.products) ? (
                                                    prodData.products.map((item, index) => (
                                                        <CTableRow key={index}>
                                                            <CTableDataCell className="text-center">
                                                                {srno++}
                                                            </CTableDataCell>
                                                            <CTableDataCell >
                                                                {item.name}
                                                            </CTableDataCell>
                                                            <CTableDataCell className="text-center">
                                                                {item.price}
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                {item.orderQty}
                                                            </CTableDataCell>
                                                            <CTableDataCell className="text-center">
                                                               Rs. {item.price * item.orderQty}
                                                            </CTableDataCell>
                                                        </CTableRow>
                                                    ))
                                                ) : (
                                                    <p>No user data available</p>
                                                )}
                                            </CTableBody>
                                            <CTableRow>
                                                    <CTableHeaderCell>Total</CTableHeaderCell>
                                                    <CTableHeaderCell></CTableHeaderCell>
                                                    <CTableHeaderCell></CTableHeaderCell>
                                                    <CTableHeaderCell></CTableHeaderCell>
                                                    <CTableHeaderCell className="text-center">{prodData.totalPrice}</CTableHeaderCell>
                                            </CTableRow>
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

export default OrderDetails;
