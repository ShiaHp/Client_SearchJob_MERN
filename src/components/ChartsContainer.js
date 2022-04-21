import React, { useState } from 'react'
import BarChartComponent from './BarChart';
import AreaChartComponent from './AreaChart';
import {useAppContext} from '../context/appContext';
import Wrapper from '../assets/wrappers/ChartsContainer'
import {
    FormattedMessage,
    FormattedDate,
    FormattedNumber,
    FormattedPlural, 
    FormattedTime
  } from 'react-intl';
const ChartsContainer = () => {

  const {monthlyApplication: data} = useAppContext();
  const [barChart,setBarChart] = useState(true);
  return (
    <Wrapper>
      <h4> <  FormattedMessage id="month"/></h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? <FormattedMessage id="Area" /> : <FormattedMessage id="Bar" />}
      </button>
      {barChart ?  <BarChartComponent data={data}/> : <AreaChartComponent data={data}/> }
    
    
    </Wrapper>
  )
}

export default ChartsContainer