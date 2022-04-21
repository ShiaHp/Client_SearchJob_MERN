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

const Test = (props) => {
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
    <div className="container page">
        {/* info */}
        <header className="App-header">
        <select value = {locale} onChange={selectLanguage}>
        <option value= 'vi'>Vietnamese</option>
        <option value= 'en'>English</option>
        </select>
        <p>
          <FormattedMessage
              id = "app.header"
              defaultMessage="Dashboard"
              values = {{fileName: 'src/App.js', code: (word)=> <strong>{word}</strong>}}
          />
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage
            id = "pending"
            defaultMessage="Pending"
          />

        </a>
        <FormattedMessage
          id = "interviews"
          defaultMessage="Interviews Scheduled"
        />
           <FormattedMessage
          id = "Job"
          defaultMessage="Job Scheduled"
        />
        <br/>
        <FormattedPlural
            id = "app.plural"
            defaultMessage="{amount, plural, =0 {no languages} one {# one language} few {# several languages} many {# lots of languages} other {# wrong fromat}}"
            values = {{amount: 90}}
        />
        <br/>
        <FormattedDate
            value={props.date}
            year = 'numeric'
            month= 'long'
            day = 'numeric'
            weekday = 'long'
        />
        <br/>
        <FormattedNumber
            value={20.42}
            style="currency"
            currencyDisplay="symbol"
            currency="USD"
        /><br/>
        <FormattedNumber
            value={10000}
        />
        <br/>
        <FormattedTime
            value={new Date()}
            hour="numeric"
            minute="numeric"
            second="numeric"
            timeZoneName="long"
        />
      </header>
        {/*  */}
    </div>
    </main>
    </Wrapper>
  )
}


export default Test
