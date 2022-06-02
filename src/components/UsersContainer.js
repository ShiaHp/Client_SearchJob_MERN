import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import User from './User'
import Wrapper from '../assets/wrappers/JobsContainer'
import PageBtnContainer from './PageBtnContainer'
import {
  FormattedMessage
} from 'react-intl';
const JobsContainer = () => {
  const {
    getUsers,
    users,
    isLoading,
    page,
    totalUsers,
    search,
    numOfPages,
    isAdmin
  } = useAppContext()
  console.log(users,totalUsers)
  useEffect(() => {
    getUsers()
    // eslint-disable-next-line
  }, [page, search])
  if (isLoading) {
    return <Loading center />
  }

  if (users.length === 0) {
    return (
      <Wrapper>
        <h2>< FormattedMessage id="display"/></h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalUsers} User-Found
      </h5>
      <div className='jobs'>
        {users.map((user) => {
          return <User key={user._id} {...user} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer