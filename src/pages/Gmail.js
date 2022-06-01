import {useState,useEffect} from 'react';
import logo from '../assets/images/logo.svg';
import Wrapper from '../assets/wrappers/RegisterPage'
import { Logo, FormRow,Alert } from '../components'
import {useAppContext} from '../context/appContext';
import {useNavigate} from 'react-router-dom'

const Gmail = () => {
    const navigate = useNavigate()
    const {user,isLoading,showAlert, displayAlert,registerUser,loginUser,loginWithGoogle} = useAppContext();
    useEffect(() => {
        const getUser =  async function () {
          let response = await fetch("http://localhost:2828/login/success", {
               method: "GET",
               credentials: "include",
               headers: {
                Accept: "application/json",
                 "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },
            })
            response = await response.json()
          
               const {email,facebookId} = response.user;
              const currentUser = {email,facebookId}
              loginWithGoogle(currentUser)
             

        }
        getUser()
      },[])
      useEffect(() =>{
        if(user){
          setTimeout(() =>{
            navigate('/')
          })
         
        }
      },[user,navigate])
  return (
    <div>Is loading...</div>
  )
}

export default Gmail