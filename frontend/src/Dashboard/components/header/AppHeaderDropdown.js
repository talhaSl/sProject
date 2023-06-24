import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilLockLocked,
  cilUser,
  cilHome,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/8.jpg'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { BASE_URL } from '../../../services/Helper'

const AppHeaderDropdown = () => {

  const navigate = useNavigate();
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const userRole = localStorage.getItem('role');
  const decodeToken = () => {
    const token = getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded ===============>", decodedToken);

        return decodedToken;
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    }
    return null;
  };
  const userPic = decodeToken();
  const Logout = () => {
    localStorage.removeItem('token')
    navigate("/SignIn")

  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={`${BASE_URL}/uploads/${userPic.cnic_picture}`} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {userRole !== "serviceProvider" ? <CDropdownItem href="/">
          <CIcon icon={cilHome} className="me-2" />
          HomePage
        </CDropdownItem> : ""}
        <CDropdownItem href={`/Profile/${userPic.id}`}>
          <CIcon icon={cilUser} className="me-2" />
          View Profile
        </CDropdownItem>
        <CDropdownItem onClick={Logout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
