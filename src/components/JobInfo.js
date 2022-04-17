import React from 'react'
import { FaLocationArrow, FaBriefCase,FaCalendarAlt } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/JobInfo'
const JobInfo = ({icon,text}) => {
  return (
   <Wrapper>
     <span className="icon">{icon}</span>
     <span className="text">{text}</span>
   </Wrapper>
  )
}

export default JobInfo