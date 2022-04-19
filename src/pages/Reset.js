import React, {useEffect, useState} from 'react'
import logo from '../assets/images/logo.svg'
import main1 from '../assets/images/main1.svg'
import { Alert } from '../components'
import Wrapper from '../assets/wrappers/Testing'
import FormRow from '../components/FormRow'
import {Link,Navigate , useNavigate, useParams} from 'react-router-dom'
import {useAppContext} from '../context/appContext';
const initialState ={
  password: '',
  passwordConfirm: '',
}

const Landing = () => {
  const navigate = useNavigate()
  let params = useParams();

  let key = Object.keys(params)[0]

  const newParams = params[key];
  console.log(newParams)
  const [values,setValues] = useState(initialState);
  const {user,isLoading, displayAlert, resetPass,showAlert,alertText} = useAppContext();
  const handleChange = (event) => {
    setValues({...values,[event.target.name]: event.target.value})
    console.log(values.password)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const {password, passwordConfirm} = values;
    if(!passwordConfirm || !password ) {
      displayAlert();
      return;
    }
    const Info = {password, passwordConfirm};

    resetPass(newParams , Info)
    
  }
  useEffect(() =>{
    if(user){
      setTimeout(() =>{
        navigate('/')
      },3000)
     
    }
  },[user,navigate])

  return (
      <Wrapper>
      <main>
        <nav>
            <img src={logo} height={200} width={200}  style={{margin : '50px'}} alt="logo"  className="logo"/>
    </nav>
    <div className="container page">
        {/* info */}
        <div className="info">
        {showAlert && <Alert/>}
            <h1>Reset Password</h1>
            <form className="form" onSubmit={onSubmit} >
            <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />

<FormRow
          type='password'
          name='passwordConfirm'
          value={values.passwordConfirm}
          handleChange={handleChange}
        />
          <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>
        <button onClick={() => navigate('/')}  className='btn btn-danger btn-block' >
            Back
        </button>
            </form>

        </div>
        
        {/*  */}
        <img src={main1} alt="job hunt" className="img main-img" />
    </div>
    </main>
    </Wrapper>
  )
}


export default Landing
