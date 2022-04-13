import React from 'react'
import {Outlet,Link} from 'react-router-dom'
import Wrapper from '../../assets/wrappers/RegisterPage'
const SharedLayout = () => {
  return (
    < Wrapper>
    <nav><Link to ="add-job"> add job</Link></nav>
    <nav><Link to ="all-jobs">all jobs</Link></nav>
    <Outlet />
    </Wrapper>
  
  )
}

export default SharedLayout