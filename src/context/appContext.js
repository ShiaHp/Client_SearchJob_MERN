import React, {useState,useEffect,useContext,useReducer} from 'react';
import reducer from './reducer';
import { DISPLAY_ALERT , CLEAR_ALERT , 
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN ,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR
} from './action';
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
    showSidebar : false


}

const AppContext = React.createContext();


const AppProvider = ({children}) =>{
    const [state,dispatch] = useReducer(reducer,initialState)
    // test 


//    axios
    const autoFetch = axios.create({
        baseURL : '/api/v1',
    })
    // request 
    autoFetch.interceptors.request.use((config)=>{
        config.headers.common['Authorization'] =`Bearer ${state.token}`;
        return config
    },(err)=>{
        return Promise.reject(err)
    })

      // response
      autoFetch.interceptors.response.use((response)=>{
        return response
    },(err)=>{

        if(err.response.status === 401){
            logoutUser()
        }
        return Promise.reject(err)
    })

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

    const loginUser = async (currentUser)=>{
        dispatch({type : LOGIN_USER_BEGIN})
    try{
        const {data} = await axios.post('/api/v1/auth/login',currentUser);
        
        const { user,token,location} = data
   
        dispatch({type : LOGIN_USER_SUCCESS,
             payload : {
            user,token,location 
        }})
        addUserToLocalStorage({user,token,location})
        // local storage
    } catch(e){
     
        dispatch({type : LOGIN_USER_ERROR , payload : {
            msg : e.response.data.msg 
        }})
      
    }
    clearAlert()
    }
const toggleSideBar =() =>{
    dispatch({type :  TOGGLE_SIDEBAR })
}

const logoutUser = () =>{
        dispatch({type :     LOGOUT_USER    });
        removeUserFromLocalStorage();
    }   
const updateUser = async (currentUser) =>{

        dispatch({type : UPDATE_USER_BEGIN})
            try {
                const {data} = await autoFetch.patch('/auth/updateUser',currentUser);
                const {user,location,token} = data
                
              dispatch({type : UPDATE_USER_SUCCESS,payload :{user,location,token}});
              addUserToLocalStorage({user,location,token})

            } catch (error) {
                if(error.response.status !== 401){
                    dispatch({type :UPDATE_USER_ERROR, payload :{msg : error.response.data.msg}})
                }
                 
                }
            clearAlert()
    }
    return <AppContext.Provider value={{...state
        ,displayAlert,
        registerUser
        ,loginUser, 
        toggleSideBar,
        logoutUser,
        updateUser 
    }}>{children}</AppContext.Provider>

}

const useAppContext = () =>{
    return useContext(AppContext)
}

export {AppProvider,initialState,useAppContext}