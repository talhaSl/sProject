import React, { useState, useEffect } from "react";
import { CCard, CCol, CRow, CCardBody } from "@coreui/react";
import { productFunc, getProductCategoryFunc } from "../../../services/Api";
import { ToastContainer, toast } from "react-toastify";
import { uploadFile } from "../../../services/ApiCall";
import "react-toastify/dist/ReactToastify.css";
import {
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../../components/index";

const AddProduct = () => {
  const [token, setToken] = useState('');


  const [categories, setCategories] = useState([]);
  // const
  const [inputData, setInputData] = useState({
    name: "",
    qty: "",
    price: "",
    cat_id: "",
    discription: "",
    image: ""
  });


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    uploadFile(selectedFile)
      .then(data => {
        toast.success("Image Uploaded Successfully")
        console.log(data.fileName);
        setInputData({ ...inputData, image: data.fileName })
      });
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getProductCategoryFunc();
        const categoryData = response.data.data.Category || [];
        console.log(categoryData); // Set an empty array as the default value
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const submitUserData = async (e) => {
    e.preventDefault();
    const { name, qty, price, cat_id, discription, image } = inputData;

    if (name === "") {
      toast.error("Name is Required");
    } else if (price === "") {
      toast.error("Price is Required");
    } else if (discription === "") {
      toast.error("Discription is Required");
    } else {
      const config = {
        "Content-Type": "application/json"
      }
      const data = {
        name: name,
        qty: qty,
        price: price,
        cat_id: cat_id,
        discription: discription,
        image: image
      };
      const response = await productFunc(data, config);
      console.log(response.status);
      if (response.status === 200) {
        toast.success("Product Added Successfully")
        setInputData({
          ...inputData,
          name: "",
          qty: "",
          price: "",
          cat_id: "",
          discription: "",
          image: "",
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
            <CRow>
              <CCol xs={12}>
                <h4 className="mb-3">Add Product</h4>
                <CCard className="mb-4">
                  <CCardBody>
                    <br />
                    <input
                      type="text"
                      onChange={setInputValue}
                      className="form-control mb-3"
                      value={inputData.name}
                      placeholder="Product Name"
                      name="name"
                    />
                    <input
                      type="text"
                      onChange={setInputValue}
                      className="form-control mb-3"
                      value={inputData.qty}
                      placeholder="Quantity"
                      name="qty"
                    />
                    <input
                      type="text"
                      onChange={setInputValue}
                      className="form-control mb-3"
                      value={inputData.price}
                      placeholder="Enter Price"
                      name="price"
                    />
                    <select
                      onChange={setInputValue}
                      className="form-control mb-3"
                      value={inputData.cat_id}
                      name="cat_id"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="form-control mb-3"
                      name="file"
                    />
                    <input
                      type="text"
                      onChange={setInputValue}
                      className="form-control mb-3"
                      value={inputData.discription}
                      placeholder="Discription"
                      name="discription"
                    />
                    <div className="text-end">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={submitUserData}
                      >
                        Submit
                      </button>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <ToastContainer />
          </>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default AddProduct;
