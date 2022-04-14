import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import links from '../utils/link'
import {NavLink} from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import { useAppContext} from '../context/appContext';
import NavLinks from './NavLinks'

const SmallSidebar = () => {
  const { showSidebar, toggleSideBar} = useAppContext();
  return (
    <Wrapper>
      <div className={showSidebar ? "sidebar-container show-sidebar " : "sidebar-container"}>
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSideBar}>
            <FaTimes/>
          </button>
          <header>
            <img src={logo} alt="logo"/>
          </header>
          <NavLinks toggleSideBar={toggleSideBar}/>
        </div>
  
      </div>
    </Wrapper>
  )
}

export default SmallSidebar