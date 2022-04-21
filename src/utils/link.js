import {IoBarChartSharp} from 'react-icons/io5';
import {MdQueryStats} from 'react-icons/md';
import { FaWpforms} from 'react-icons/fa';
import {ImProfile} from 'react-icons/im';
import {
    FormattedMessage,
    FormattedDate,
    FormattedNumber,
    FormattedPlural, 
    FormattedTime
  } from 'react-intl';

  
const links = [
    {id : 1,text : < FormattedMessage id="Status" />,path : '/' , icon :<IoBarChartSharp/>},
    {id : 2,text :  < FormattedMessage id="All" />,path : 'all-jobs' , icon :<MdQueryStats/>},
    {id : 3,text :  < FormattedMessage id="Add" />,path : 'add-job' , icon :<FaWpforms/>},
    {id : 4,text : < FormattedMessage id="Profile" />,path : 'profile' , icon :<ImProfile/>}
    
]

export default links