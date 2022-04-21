import React from 'react'
import {FormRow,FormRowSelect} from '.';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer'
import {
  FormattedMessage,
  FormattedDate,
  FormattedNumber,
  FormattedPlural, 
  FormattedTime
} from 'react-intl';
const SearchContainer = () => {

const {
  isLoading,
  search ,
  searchStatus ,
  searchType ,
  sort ,
  sortOptions,
  statusOptions,
  jobTypeOptions,
  handleChange,
  clearFilters
} = useAppContext()


const handleSubmit = (e)=>{
  e.preventDefault();
  clearFilters()
}
const handleSearch = (event) => {
  if(isLoading) return 
 handleChange({name : event.target.name,value : event.target.value})
}
  return (
    <Wrapper>
    <form className="form">
      <h4> <FormattedMessage id="Search-form" /></h4>
      <div className="form-center">
        {/* Search position */}
      <FormRow type="text" labelText={<FormattedMessage id="Search"/>} name="search" value={search} handleChange={handleSearch} />


      <FormRowSelect labelText={<FormattedMessage id="Status"/>} name="searchStatus" value={searchStatus} 
      handleChange={handleSearch} list={['all',...statusOptions]}
      />

  <FormRowSelect labelText='type' name="searchType" value={searchType} 
      handleChange={handleSearch} list={['all',...jobTypeOptions]}
      />
  <FormRowSelect labelText={<FormattedMessage id="Sort" />}  name="sort" value={sort} 
      handleChange={handleSearch} list={sortOptions}
      />
      <button className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}><FormattedMessage id="Submit"/></button>
      </div>
    </form>
    </Wrapper>
  )
}

export default SearchContainer
