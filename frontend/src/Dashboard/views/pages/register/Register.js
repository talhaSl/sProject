import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { registerFunc } from "../../../../services/Api";
import { toast } from "react-toastify";

const Register = () => {
  const [inputData, setInputData] = useState({
    user_name: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState("");
  const [cnic_picture, setImage] = useState("");
  const submitUserData = async (e) => {
    e.preventDefault();
    // console.log(inputData);
    const { user_name, email, password } = inputData;
    if (user_name === "") {
      toast.error("User Name is Required");
    } else if (email === "") {
      toast.error("EmailPhone Number is Required");
    } else if (password === "") {
      toast.error("Password is Required");
    } else {
      const config = {
        "Content-Type": "application/json",
      };
      const response = await registerFunc(
        {
          user_name: user_name,
          email: email,

          password: password,
          role: "buyer",
        },
        config
      );
      console.log(response.status);

      if (response.status === 200) {
        setInputData({
          ...inputData,
          user_name: "",
          email: "",
          password: "",
        });
      } else {
        toast.error("error accured");
      }
    }
  };
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
