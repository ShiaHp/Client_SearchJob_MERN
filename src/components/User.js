import React from 'react'
import moment from 'moment'
import { Link }  from 'react-router-dom';
import { FaLocationArrow, FaBriefcase,FaCalendarAlt } from 'react-icons/fa';
import JobInfo from './JobInfo'
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Job'

const User = ({_id,name,lastName,email,isAdmin,avatar}) => {
 
  const {deleteUser} = useAppContext();

  return (
    <Wrapper>
      <header>
      {/* <div className="main-icon">{name}</div> */}
      <div className="info">
        <img src={avatar} alt="avatar" style={{width: '20%', height: '20%'}} />
          <h5>{name}</h5> {lastName}
          <p>{email}</p>

        </div>
      </header>
      <div className="content">

      {/* <div className="content-center">
        <JobInfo icon={< FaLocationArrow/>} text={jobLocation} />
        <JobInfo icon={<FaBriefcase/>} text={date} />
        <JobInfo icon={< FaCalendarAlt/>} text={jobType} />

        <div className={`status  ${status}`}>{status}</div>
      </div> */}

        <footer>
          <div className="actions">
            {/* <Link to="/add-job" className="btn edit-btn" onClick={()=>setEditJob(_id)}>
              Edit
            </Link> */}
            <button type="button" className="btn delete-btn" onClick={() => deleteUser(_id)}>
              Delete 
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  
  )
}

export default User