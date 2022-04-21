import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'
import {
  FormattedMessage,
  FormattedDate,
  FormattedNumber,
  FormattedPlural, 
  FormattedTime
} from 'react-intl';

const StatsContainer = () => {
  const { stats } = useAppContext()

  const defaultStats = [
    {
      title:  <FormattedMessage
      id = "pending"
      defaultMessage="Dashboard"

  />,
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: <FormattedMessage
      id = "interviews"
      defaultMessage="Dashboard"

  />,
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: <FormattedMessage
      id = "Job"
      defaultMessage="Dashboard"

  />,
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />
      })}
    </Wrapper>
  )
}

export default StatsContainer