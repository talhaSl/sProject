import { CCard, CCardBody, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { catogoryFunc, getProductCategoryFunc } from "../../../services/Api";
import {
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../../components/index";

const Category = () => {
  const [inputData, setInputData] = useState({
    name: ""
  });
  const [cateData, setCateData] = useState([]);
  var srno = 1;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductCategoryFunc();
        const categoryData = response.data.data.Category || [];
        console.log({ categoryData });
        setCateData(categoryData);
      } catch (error) {
        setCateData([]);
      }
    };
    fetchData();
  }, []);

  const submitUserData = async (e) => {
    e.preventDefault();
    const { name, qty, price, cat_id, discription, image } = inputData;

    if (name === "") {
      toast.error("Category name is Required");
    } else {
      const config = {
        "Content-Type": "application/json"
      }
      const data = {
        name: name
      };
      const response = await catogoryFunc(data, config);
      console.log(response.status);
      if (response.status === 200) {
        toast.success("Category Added Successfully")
        setInputData({
          ...inputData,
          name: ""
        });
      } else {
        toast.error(response.error);
      }
    }
  };
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <>
            <h4 >Category</h4>

            <div className="d-flex mb-3 mt-4">
              <input
                type="text"
                onChange={setInputValue}
                className="form-control me-2"
                value={inputData.name}
                placeholder="Category Name"
                name="name"
              />
              <button
                className="btn btn-primary"
                type="submit"
                onClick={submitUserData}
              >
                Submit
              </button>
            </div>
            <CRow>
              <CCol xs>
                <CCard className="mb-4">
                  <CCardBody>
                    <CTable align="middle" className="mb-0 border" hover responsive>
                      <CTableHead color="light">
                        <CTableRow>
                          <CTableHeaderCell>Sr. No</CTableHeaderCell>
                          <CTableHeaderCell>Name</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {Array.isArray(cateData) ? (
                          cateData.map((item, index) => (
                            <CTableRow key={index}>
                              <CTableDataCell >
                                {srno++}
                              </CTableDataCell>
                              <CTableDataCell>
                                {item.name}
                              </CTableDataCell>
                            </CTableRow>
                          ))
                        ) : (
                          <p>No Category available</p>
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

export default Category;
