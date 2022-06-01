
import {useState,useEffect} from 'react';
import logo from '../assets/images/logo.svg';
import Wrapper from '../assets/wrappers/RegisterPage'
import { Logo, FormRow,Alert } from '../components'
import {useAppContext} from '../context/appContext';
import {useNavigate} from 'react-router-dom'
const initialState ={
  name: '',
  email: '',
  password: '',
  passwordConfirm : '',
  isMember: true,
}
const Register = () => {
  const navigate = useNavigate()
  const [values,setValues] = useState(initialState);
  const [trueButton,setTrueButton] = useState(false)
  // const [userFb,setUserFb] = useState('');

  const [authenticated,setAuthenticated] = useState(false);
  // const [error,setError] = useState('');

    // global state 
  const {user,isLoading,showAlert, displayAlert,registerUser,loginUser,loginWithGoogle} = useAppContext();


  








  const toggleMember = () =>{
    setValues({...values,isMember:!values.isMember})
    // true or false
  }
  const handleChange = (event) => {
    setValues({...values,[event.target.name]: event.target.value})
  }

  
  const onSubmit = (e) => {
    e.preventDefault();
    const {name,email,password,isMember,  passwordConfirm } = values;
    if(!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = {name,email,password , passwordConfirm };

    if(isMember) {
      loginUser(currentUser);
    } else{
      registerUser(currentUser);
    }
    
  }
 const buttonLoginWithGoogle = (ev) => {
    ev.preventDefault();
    window.open("http://localhost:2828/auth/google", "_self");

 }

  useEffect(() =>{
    if(user){
      setTimeout(() =>{
        navigate('/')
      },3000)
     
    }
  },[user,navigate])
  // mỗi lần user hoặc navigate thay đổi
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit} >
        <img src={logo} alt="logo" width={300} height={100} />
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
          <FormRow
          type='password'
          name='passwordConfirm'
          value={values.passwordConfirm}
          handleChange={handleChange}
        />
      
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>
   <p>
          {values.isMember ? "Not a member yet?"  : "Already a member?"}
     <button type="button" onClick={toggleMember} className="member-btn">
          {values.isMember ? 'Register' : 'Login' } 
    
     </button>
     <button type="button"  className="member-btn" onClick={() => navigate('/forgot')}>
           'Forgot your password ?'  
     </button>
     <button type="button"  className="member-btn" onClick={buttonLoginWithGoogle}>
           'Login with Gmail'
     </button>
   </p>
      </form>

    </Wrapper>

  )
}

export default Register