
import {useState,useEffect} from 'react';
import logo from '../assets/images/logo.svg';
import Wrapper from '../assets/wrappers/RegisterPage'
import { Logo, FormRow,Alert } from '../components'
import {useAppContext} from '../context/appContext';
import {useNavigate} from 'react-router-dom'
const initialState ={
  email: '',
}
const Forgot = () => {
  const navigate = useNavigate()
  const [values,setValues] = useState(initialState);
  const {isLoading,showAlert, displayAlert, forgotPassword} = useAppContext();
  // global state 
 


  const handleChange = (event) => {
    setValues({...values,[event.target.name]: event.target.value})
  }

  
  const onSubmit = (e) => {
    e.preventDefault();
    const {email} = values;
    const currentUser = {email}
    if(!email) {
      displayAlert();
      return;
    }
    forgotPassword(currentUser)
  }
  


  // mỗi lần user hoặc navigate thay đổi
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit} >
        <img src={logo} alt="logo" width={300} height={100} />
        <h3>Enter your Email Address</h3>
        {showAlert && <Alert/>}
    
        {/* email input */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
      
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>
   <p>
  

   </p>
      </form>

    </Wrapper>

  )
}

export default Forgot