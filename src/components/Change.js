import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/Testing'
import English from '../lang/en.json'
import Vietnamese from '../lang/vi.json'

import {
    FormattedMessage,
    FormattedDate,
    FormattedNumber,
    FormattedPlural, 
    FormattedTime
  } from 'react-intl';
import { useAppContext } from '../context/appContext'

const Change = (props) => {
    const {local,changeLanguage , changeMessage ,messages} =  useAppContext();
    const [locale, setLocale] = useState(local);
    const [newMessages, setMessages] = useState(messages);
    
   const selectLanguage = (e)=> {
        const newLocale = e.target.value;
        setLocale(newLocale);
        changeLanguage(newLocale);
        if (newLocale === 'vi') {
            setMessages(English);
            const newMess = newMessages
            changeMessage(newMess);
        } else if (newLocale === 'en') {
                setMessages(Vietnamese);
                changeMessage(newMessages);
            } 
        }
      return (
      <Wrapper>
      <main>
    <div className=" nav">
        <select value = {locale} onChange={selectLanguage}>
        <option value= 'vi'>Vietnamese</option>
        <option value= 'en'>English</option>
        </select>
     
    </div>
    </main>
    </Wrapper>
  )
}


export default Change
