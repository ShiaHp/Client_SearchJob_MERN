
import {useState,useEffect} from 'react';
import logo from '../assets/images/logo.svg';
import Wrapper from '../assets/wrappers/RegisterPage'
import { Logo, FormRow,Alert } from '../components'
import {useAppContext} from '../context/appContext';

const initialState ={
  name: '',
  email: '',
  password: '',
  isMember: true,
}
const Register = () => {
  const [values,setValues] = useState(initialState);
  // global state 

  const {isLoading,showAlert, displayAlert} = useAppContext();
 


  const toggleMember = () =>{
    setValues({...values,isMember:!values.isMember})
    // true or false
  }
  const handleChange = (event) => {
    setValues({...values,[event.target.name]: event.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const {name,email,password,isMember} = values;
    if(!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    console.log(values)
  }
  
  return (
    <Wrapper className="full-page">
      <form className="form"onSubmit={onSubmit} >
        <img src={logo} alt="logo" />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert/>}
        {!values.isMember && (
           <FormRow
           type='text'
           name='name'
           value={values.name}
           handleChange={handleChange}
         />
        )}
        {/* input */}
       
  

        {/* email input */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block'>
          submit
        </button>
   <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
     <button type="button" onClick={toggleMember} className="member-btn">
          {values.isMember ? 'Register' : 'Login'}

     </button>
   </p>
      </form>

    </Wrapper>

  )
}

export default Register