import React from 'react'
import {useAppContext} from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import {Alert,FormRow,FormRowSelect} from '../../components'
import {
  FormattedMessage,
  FormattedDate,
  FormattedNumber,
  FormattedPlural, 
  FormattedTime
} from 'react-intl';
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
        <h3>{isEditing ? <FormattedMessage id="Edit"/>  : <FormattedMessage id="Add Job"/> }</h3>
        {showAlert && <Alert />}
        <div className="form-center"> 
          {/* position */}
          <FormRow type='text' labelText={ <FormattedMessage
          id = "position"
          defaultMessage="Interviews Scheduled"
        />} name="position" value={position} handleChange={handleJobInput}  />
          {/* Company */}
          <FormRow type='text'  labelText={ <FormattedMessage id="company" defaultMessage="Company"/>}   name="company" value={company} handleChange={handleJobInput}  />
          {/* Location */}
          <FormRow type='text' labelText={<FormattedMessage id="jobL" />} name="jobLocation" value={jobLocation} handleChange={handleJobInput}  />

      {/* job types */}

    <FormRowSelect name="status"  labelText={<FormattedMessage id="Status"/>} value={status} handleChange={handleJobInput} 
    list={statusOptions}
    />
     <FormRowSelect name="jobTypes" labelText={<FormattedMessage id="Type"/>}  value={jobTypeOptions} handleChange={handleJobInput} 
    list={jobTypeOptions}
    />

      {/* job status */}
      <div className="btn-container">
      <button type="submit" className="btn btn-block submit-btn"
       onClick={handleSubmit}
  
       ><FormattedMessage id="Submit"/></button>
       <button className="btn btn-block clear-btn" onClick={(e)=>{
         e.preventDefault();
         clearValues()
       
       }}><FormattedMessage id="Clear"/></button>
      </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
