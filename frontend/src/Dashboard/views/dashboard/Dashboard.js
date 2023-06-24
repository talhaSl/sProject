import React, { useEffect, useState } from "react";

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import {
  cilCloudDownload,
} from "@coreui/icons";


import WidgetsDropdown from "../widgets/WidgetsDropdown";
import { getAllUserTypeFunc } from "../../../services/Api";
import jwtDecode from "jwt-decode";

const getToken = () => {
  return localStorage.getItem("token");
};

const decodeToken = () => {
  const token = getToken();
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.role;
    } catch (error) {
      console.log("Error decoding token:", error);
    }
  }
  return null;
};
const userRole = decodeToken();
console.log("Decoded user role:", userRole);
const Dashboard = () => {
  const [userData, setUserData] = useState([]);

  const [active, setActive] = useState();
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  const userGet = async () => {
    const user = await getAllUserTypeFunc();

    if (user.status === 200) {
      setUserData(user.data.data.user.reverse());
    } else {
      console.log("Error to get the user data");
    }
  };
  useEffect(() => {
    userGet();
  }, []);
  const convertDuration = (durationInMilliseconds) => {
    const seconds = Math.floor(durationInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const weeks = Math.floor(hours / 168);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);

    return {
      seconds: seconds % 60,
      minutes: minutes % 60,
      hours: hours % 24,
      weeks,
      months,
      years,
    };
  };

  return (
    <>
     
    </>
  );
};

export default Dashboard;
