import React from "react";
import CIcon from "@coreui/icons-react";
import { cilCart, cilSpeedometer, cilTruck, cilCalendarCheck, cilUserPlus, cilUser } from "@coreui/icons";
import { CNavGroup, CNavItem } from "@coreui/react";

const userRole = localStorage.getItem("role");
const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  
];
if (userRole === "seller") {
  _nav.push(
    {
      component: CNavGroup,
      name: "Product",
      to: "/dashboard",
      icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
      items: userRole !== "buyer" ? [
        {
          component: CNavItem,
          name: "View Product",
          to: "/dashboard/Products",
        },
        {
          component: CNavItem,
          name: "Category",
          to: "/dashboard/category",
        },
      ] : null,
    },
    {
      component: CNavGroup,
      name: "Orders",
      to: "/dashboard",
      icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: "View Orders",
          to: "/dashboard/Orders",
        },
      ],
    }
  )}
if (userRole === "serviceProvider") {
  _nav.push(
    {
      component: CNavItem,
      name: "Set Rate",
      to: "/dashboard/setrate",
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
    {
      component: CNavGroup,
      name: "Bookings",
      to: "/dashboard",
      icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: "View Bookings",
          to: "/dashboard/Bookings",
        },
      ],
    }
  )}

export default _nav;
