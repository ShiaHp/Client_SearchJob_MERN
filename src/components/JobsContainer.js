import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import PageBtnContainer from './PageBtnContainer'
import {
  FormattedMessage,
  FormattedDate,
  FormattedNumber,
  FormattedPlural, 
  FormattedTime
} from 'react-intl';
const JobsContainer = () => {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useAppContext()
  useEffect(() => {
    getJobs()
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort])
  if (isLoading) {
    return <Loading center />
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>< FormattedMessage id="display"/></h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} <FormattedMessage id="job-found"/>
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer