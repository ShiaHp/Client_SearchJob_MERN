import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import {FaHome,FaAlignLeft,FaUserCircle,FaCaretDown} from 'react-icons/fa'
import {useAppContext} from '../context/appContext';
import Logo from '../assets/images/logo.svg'
import Change from './Change'
import {
  FormattedMessage,
  FormattedDate,
  FormattedNumber,
  FormattedPlural, 
  FormattedTime
} from 'react-intl';
const Navbar = () => {
  const {toggleSideBar,logoutUser,user} = useAppContext();
  const [showLogout,setShowLogout] = useState(false)
 
  return (
    <Wrapper>

      <div className="nav-center">
        <button className="toggle-btn" type="button" onClick={toggleSideBar}>
          <FaAlignLeft/>
        </button>
        <div>
          {/* <img src={Logo} alt="logo" />   */}
          <h3 className="logo-text">
     
          <FormattedMessage
              id = "app.header"
              defaultMessage="Dashboard"
     
          />

            </h3>
        </div>
      <div className="avatar-container">
   
      <div className="btn-container" >
    
    <button type="button" className="btn"
    onClick={() => setShowLogout(!showLogout)}>
          <img src={user.avatar ?user.avatar : 'https://png.pngtree.com/png-clipart/20191120/original/pngtree-outline-user-icon-png-image_5045523.jpg' } alt="avatar" style={{ width: "40px", height: "30px"}} />
              {user?.name}
            <FaCaretDown/>
    </button>
   
    <button type="button" className="btn"><Change/></button>
    <div className={showLogout ? "dropdown show-dropdown" : "dropdown" }>
      <button type="button" className="dropdown-btn" 
        onClick={() =>logoutUser() }>
       <FormattedMessage
        id = "logout"
        defaultMessage="Log out"
     
    /></button>
    </div>
  </div>
      </div>
       
      </div>
    
    </Wrapper>
  )
}

export default Navbar