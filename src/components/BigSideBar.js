import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import NavLinks from './NavLinks'
import logo from '../assets/images/logo.svg'  
import {useAppContext} from '../context/appContext'
const BigSidebar = () => {
  const {showSidebar,toggleSideBar} = useAppContext();

  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className='content'>
          <header>
            <img src={logo} alt="logo"/>
          </header>
          <NavLinks toggleSideBar={toggleSideBar}/>
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar