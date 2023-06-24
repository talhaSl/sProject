import { CCard, CCardBody, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { getProductFunc } from "../../../services/Api";
import {
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../../components/index";

const Product = () => {
  const [prodData, setProdData] = useState([]);
  var srno = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductFunc();
        const product = response.data.data.product || [];
        console.log({ product });
        setProdData(product);
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
            <h4 >View Product</h4>

            <div className="text-end">
              <a className="btn btn-primary mb-3" href="/dashboard/AddProduct">Add Product</a>
            </div>
            <CRow>
              <CCol xs>
                <CCard className="mb-4">
                  <CCardBody>
                    <CTable align="middle" className="mb-0 border" hover responsive>
                      <CTableHead color="light">
                        <CTableRow>
                          <CTableHeaderCell className="text-center">Sr No.</CTableHeaderCell>
                          <CTableHeaderCell>Name</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Price</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Quantity</CTableHeaderCell>
                          <CTableHeaderCell>Category</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {Array.isArray(prodData) ? (
                          prodData.map((item, index) => (
                            <CTableRow key={index}>
                              <CTableDataCell className="text-center">
                                {srno++}
                              </CTableDataCell>
                              <CTableDataCell>
                                {item.name}
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                {item.price}
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                {item.qty}
                              </CTableDataCell>
                              <CTableDataCell>
                                {item.cat_id.name}
                              </CTableDataCell>
                            </CTableRow>
                          ))
                        ) : (
                          <p>No product data available</p>
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

export default Product;
