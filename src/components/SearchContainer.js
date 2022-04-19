import React from 'react'
import {FormRow,FormRowSelect} from '.';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer'
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
      <h4> Search Form</h4>
      <div className="form-center">
        {/* Search position */}
      <FormRow type="text" name="search" value={search} handleChange={handleSearch} />


      <FormRowSelect labelText='status' name="searchStatus" value={searchStatus} 
      handleChange={handleSearch} list={['all',...statusOptions]}
      />

  <FormRowSelect labelText='type' name="searchType" value={searchType} 
      handleChange={handleSearch} list={['all',...jobTypeOptions]}
      />
  <FormRowSelect  name="sort" value={sort} 
      handleChange={handleSearch} list={sortOptions}
      />
      <button className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>Submit</button>
      </div>
    </form>
    </Wrapper>
  )
}

export default SearchContainer
