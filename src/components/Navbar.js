import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import {FaHome,FaAlignLeft,FaUserCircle,FaCaretDown} from 'react-icons/fa'
import {useAppContext} from '../context/appContext';
import Logo from '../assets/images/logo.svg'

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
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container" >
          <button type="button" className="btn"
          onClick={() => setShowLogout(!showLogout)}>
                  <FaUserCircle/>
                    {user?.name}
                  <FaCaretDown/>
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown" }>
            <button type="button" className="dropdown-btn" 
              onClick={() =>logoutUser() }>
            Log out</button>
          </div>
        </div>
      </div>
    
    </Wrapper>
  )
}

export default Navbar