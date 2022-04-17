import React from 'react'
import moment from 'moment'
import { Link }  from 'react-router-dom';
import { FaLocationArrow, FaBriefcase,FaCalendarAlt } from 'react-icons/fa';
import JobInfo from './JobInfo'
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Job'

const Job = ({_id,position,jobLocation,status,jobType,company,createdAt}) => {
 
  const {setEditJob , setDeleteJob} = useAppContext();

  let date = moment(createdAt);
  date = date.format('MMM Do , YYYY');
  return (
    <Wrapper>
      <header>
      <div className="main-icon">{company.charAt(0)}</div>
      <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">

      <div className="content-center">
        <JobInfo icon={< FaLocationArrow/>} text={jobLocation} />
        <JobInfo icon={<FaBriefcase/>} text={date} />
        <JobInfo icon={< FaCalendarAlt/>} text={jobType} />

        <div className={`status  ${status}`}>{status}</div>
      </div>

        <footer>
          <div className="actions">
            <Link to="/add-job" className="btn edit-btn" onClick={()=>setEditJob(_id)}>
              Edit
            </Link>
            <button type="button" className="btn delete-btn" onClick={() => setDeleteJob(_id)}>
              Delete 
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  
  )
}

export default Job