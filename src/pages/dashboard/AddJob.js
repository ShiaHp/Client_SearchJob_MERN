import React from 'react'
import {useAppContext} from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import {Alert,FormRow,FormRowSelect} from '../../components'

const AddJob = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob 
  } = useAppContext()


  const handleJobInput = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    handleChange({name : e.target.name, value : e.target.value})
  }


  const handleSubmit = (e) =>{
    e.preventDefault();

    if(!position || !company || !jobLocation){
      displayAlert()
      return
    }
    if(isEditing){
      editJob()
      return
    }
    createJob()
  }
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit job'  : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className="form-center"> 
          {/* position */}
          <FormRow type='text' name="position" value={position} handleChange={handleJobInput}  />
          {/* Company */}
          <FormRow type='text' name="company" value={company} handleChange={handleJobInput}  />
          {/* Location */}
          <FormRow type='text' name="jobLocation" value={jobLocation} handleChange={handleJobInput}  />

      {/* job types */}

    <FormRowSelect name="status"  value={status} handleChange={handleJobInput} 
    list={statusOptions}
    />
     <FormRowSelect name="jobTypes" labelText="Types"  value={jobTypeOptions} handleChange={handleJobInput} 
    list={jobTypeOptions}
    />

      {/* job status */}
      <div className="btn-container">
      <button type="submit" className="btn btn-block submit-btn"
       onClick={handleSubmit}
  
       >Submit</button>
       <button className="btn btn-block clear-btn" onClick={(e)=>{
         e.preventDefault();
         clearValues()
       
       }}>Clear</button>
      </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
