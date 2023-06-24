import {
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";
import WidgetsDropdown from "../views/widgets/WidgetsDropdown";
import { getAllUserTypeFunc } from "../../services/Api";
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
import { cilCloudDownload } from "@coreui/icons";

const DefaultLayout = () => {

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <>
            <WidgetsDropdown />
          </>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
