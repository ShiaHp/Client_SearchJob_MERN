import React, {useState,useEffect,useContext,useReducer} from 'react';
import reducer from './reducer';
import { DISPLAY_ALERT , CLEAR_ALERT , 
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR} from './action';
import axios from 'axios'

// có thể dùng trong trường hợp user reload lại page thì có thể load lại info
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
    isLoading: false,
    showAlert : false,
    alertText :'',
    alertType :'',
    user : null,
    token : null,
    userLocation : userLocation || '',
    jobLocation :userLocation || '',
    user : user? JSON.parse(user) : null,
    token : token,


}

const AppContext = React.createContext();


const AppProvider = ({children}) =>{
    const [state,dispatch] = useReducer(reducer,initialState)
    // test 
    const displayAlert = ()=>{
        dispatch({type : DISPLAY_ALERT})
        clearAlert()
    }

    const clearAlert = ()=>{
        setTimeout(() =>{
            dispatch({type : CLEAR_ALERT})
        },3000)
    }


    const addUserToLocalStorage = ({user,token,location})=>{
        localStorage.setItem('user',JSON.stringify(user));
        localStorage.setItem('token',token);
        localStorage.setItem('location',location);
    }

    const removeUserFromLocalStorage = () =>{
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('location');
    }
const registerUser = async (currentUser)=>{
    dispatch({type : REGISTER_USER_BEGIN})
    try{
        const response = await axios.post('/api/v1/auth/register',currentUser);
        console.log(response);
        const { user,token} = response.data
        const location = response.data.user.location;
        console.log(location)
        dispatch({type : REGISTER_USER_SUCCESS,
             payload : {
            user,token,location 
        }})
        addUserToLocalStorage({user,token,location})
        // local storage
    } catch(e){
        console.log(e.response)
        dispatch({type : REGISTER_USER_ERROR , payload : {
            msg : e.response.data.msg 
        }})
      
    }
    clearAlert()
}

    return <AppContext.Provider value={{...state,displayAlert,registerUser}}>{children}</AppContext.Provider>

}

const useAppContext = () =>{
    return useContext(AppContext)
}

export {AppProvider,initialState,useAppContext}