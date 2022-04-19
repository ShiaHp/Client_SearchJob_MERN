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
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUE,
    CREATE_JOB_BEGIN ,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOBS_BEGIN ,
    GET_JOBS_SUCCESS,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    SHOW_STATS_ERROR,
    CLEAR_FILTERS ,
    CHANGE_PAGE,
    RESET_USER_BEGIN,
    RESET_USER_SUCCESS,
    FORGOT_PASSWORD_BEGIN ,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR
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
    userLocation : userLocation || '',
    user : user? JSON.parse(user) : null,
    token : token,
    showSidebar : false,
    isEditing : false,
    editJobId : '',
    position : '',
    company : '',
    jobLocation :userLocation || '',
    jobTypeOptions : ['full-time','part-time','remote','internship'],
    jobType : 'full-time',
    statusOptions :['interview','declined','pending'] ,
    status : 'pending',

    jobs : [],
    totalJobs : 0,
    page :  1,
    numOfPages : 1,
    stats : {},
    monthlyApplication : []
    ,
    search : '',
    searchStatus : 'all',
    searchType : 'all',
    sort : 'latest',
    sortOptions  :['latest','oldest','a-z','z-a']
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
    } catch(e){
        dispatch({type : LOGIN_USER_ERROR , payload : {
            msg : e.response.data.msg 
        }})
      
    }
    clearAlert()
    }
    const forgotPassword = async (currentUser) =>{
        dispatch({ type:  FORGOT_PASSWORD_BEGIN })
        try {
            const {data} = await autoFetch.post('/auth/forgotPassword',currentUser);
            const {message } = data
            dispatch({ type: FORGOT_PASSWORD_SUCCESS ,
                payload :{
                message 
            }})
        } catch (error) {
                console.log(error)
                dispatch({ type: FORGOT_PASSWORD_ERROR , payload: { msg : error.response.data.msg}})
        }
        clearAlert()
    }
    const toggleSideBar =() =>{
    dispatch({type :  TOGGLE_SIDEBAR })
}   
    const resetPass = async (params,Info) =>{
  


      
            dispatch({type : RESET_USER_BEGIN})
            try {
                const {data} = await axios.post(`/api/v1/auth/resetPassword/${params}`,Info);
    
                const {password,passwordConfirm} = data
                dispatch({type : RESET_USER_SUCCESS,
                     payload : {
                        password,passwordConfirm
                }})
            } catch (error) {
                console.log(error)
                if(error.response.status !== 401){
                    dispatch({type :REGISTER_USER_ERROR, payload :{msg : error.response.data.msg}})
                }
            }
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


    const handleChange = ({name, value}) => {
        dispatch({type :HANDLE_CHANGE, payload:{name,value}})
    }

    const clearValues = ()=>{
        dispatch({type : CLEAR_VALUE})
    }

    const createJob = async () => {
        dispatch({type : CREATE_JOB_BEGIN})
        try{
            const {position ,company,jobLocation,jobType,status} = state;
            await autoFetch.post('/jobs',{
                position,
                company,
                jobLocation,
                jobType,
                status,
            })
            dispatch({type : CREATE_JOB_SUCCESS})
            dispatch({type : CLEAR_VALUE})
        } catch(e){
            if(e.response.status === 401) return
            dispatch({type : CREATE_JOB_ERROR, payload : {msg : e.response.data.msg}})
        }
        clearAlert()
    }

        const getJobs = async () =>{

            const {search,searchStatus,searchType,sort,page} = state;
            console.log(page)
            let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`

            if(search){
                url = url + `&search=${search}`
            }
            dispatch({type :GET_JOBS_BEGIN})
            try {
                const {data} = await autoFetch(url);
                const {jobs,totalJobs,numOfPages} = data;
                dispatch({type :GET_JOBS_SUCCESS, payload : {jobs,totalJobs, numOfPages}})
            } catch (error) {
                 console.log(error);
                logoutUser()
            }
                clearAlert()
        }

        const setEditJob = (id) =>{
            dispatch({type : SET_EDIT_JOB , payload  :{
                id
            }})
        }

        const editJob = async () =>{
           dispatch({type : EDIT_JOB_BEGIN})
           try {
                const {position,company,jobLocation,jobType,status} = state;
                await autoFetch.patch(`/jobs/${state.editJobId}`,{
                    position,company,jobLocation,jobType,status
                })
                dispatch({type : EDIT_JOB_SUCCESS})
                dispatch({type :CLEAR_VALUE})
           } catch (error) {
               if(error.response.status ===401) return
            dispatch({type :   EDIT_JOB_ERROR , payload : {msg : error.response.data.msg}})
           }
        }
        
        const deleteJob = async (idJob) =>{
            dispatch({type :DELETE_JOB_BEGIN})
            try {
                await autoFetch.delete(`/jobs/${idJob}`)
                getJobs()
            } catch (error) {
                console.log(error.message)
            }
        }

        const showStats = async () => {
            dispatch({type : SHOW_STATS_BEGIN});
            try {
                const {data} = await autoFetch('/jobs/stats');
                dispatch({type :SHOW_STATS_SUCCESS , payload :{
                    stats : data.defaultStats,
                    monthlyApplication : data.monthlyApplication
                }})
            } catch (error) {
                dispatch({type :SHOW_STATS_ERROR, payload :{ msg: error.response.data.msg}})
            }
        }
        const clearFilters= () => {
           dispatch({type :CLEAR_FILTERS})
        }
        const changePage = (page) => {
                
            dispatch({ type: CHANGE_PAGE, payload: { page } })
        }

       
    return <AppContext.Provider value={{...state
        ,displayAlert,
        registerUser
        ,loginUser, 
        toggleSideBar,
        logoutUser,
        updateUser ,
        handleChange,
        clearValues ,
        createJob,
        getJobs,
        showStats,
        setEditJob,
        editJob ,
        deleteJob,
        changePage,
        clearFilters,
        resetPass,
        forgotPassword
        
    }}>{children}</AppContext.Provider>

}

const useAppContext = () =>{
    return useContext(AppContext)
}

export {AppProvider,initialState,useAppContext}