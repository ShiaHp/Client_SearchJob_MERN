   import{ 
    DISPLAY_ALERT,CLEAR_ALERT,
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
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    SHOW_STATS_ERROR,
    CLEAR_FILTERS ,
    CHANGE_PAGE,
    RESET_USER_BEGIN,
    RESET_USER_SUCCESS,
    FORGOT_PASSWORD_BEGIN ,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,
    CHANGE_LANG,
    CHANGE_MESSAGE,
    LOGIN_GOOGLE_BEGIN,
    LOGIN_GOOGLE_START,
    GET_USERS_BEGIN ,
    GET_USERS_SUCCESS,
    DELETE_USER_BEGIN


} from './action';
   
   import { initialState } from './appContext';
   
   const reducer = (state,action) =>{
       if(action.type === DISPLAY_ALERT) {
           return {...state,showAlert: true,alertType : 'danger',alertText: 'Please provider all values required'}
       }
       if(action.type === CLEAR_ALERT) {
        return {...state,showAlert: false,alertType : '',alertText: ''}
    }

        if(action.type === REGISTER_USER_BEGIN){
            return {...state,isLoading : true,alertType : '',alertText : ''}
        }
        if(action.type === REGISTER_USER_SUCCESS){
            return {...state,
                isLoading : false,
                token : action.payload.token,
                user : action.payload.user,
                userLocation : action.payload.location, jobLocation : action.payload.location,
                showAlert : true,
                alertType : 'success',alertText: 'User Created! Redirecting to ...'
            }
        }
        if(action.type === REGISTER_USER_ERROR){
            return {...state,
                isLoading : false,
                showAlert : true,alertType : 'danger'
                ,alertText : action.payload.msg}
        }
   
        if(action.type === DELETE_USER_BEGIN){
            return {...state,isLoading: true}
        }
        if(action.type === LOGIN_USER_BEGIN){
            return {...state,isLoading : true}
        }
        if(action.type === LOGIN_USER_SUCCESS){
            return {...state,
                isLoading : false,
                token : action.payload.token,
                user : action.payload.user,
                userLocation : action.payload.location,
                jobLocation : action.payload.location,
                isAdmin : action.payload.isAdmin,
                showAlert : true,
                alertType : 'success',
                alertText: 'User Login Successfully ! Redirecting to ...'
            }
        }
        if(action.type === LOGIN_GOOGLE_BEGIN){
            return {...state,isLoading : true}
        }
        if(action.type === LOGIN_GOOGLE_START){
            return {...state,
                isLoading : false,
                token : action.payload.token,
                user : action.payload.user,
                userLocation : action.payload.location,
                jobLocation : action.payload.location,
                showAlert : true,
                alertType : 'success',
                alertText: 'User Login Successfully ! Redirecting to ...'
            }
        }

        if(action.type === LOGIN_USER_ERROR){
            return {...state,
                isLoading : false,
                showAlert : true,
                alertType : 'danger'
                ,alertText : action.payload.msg}
        }
        if(action.type === FORGOT_PASSWORD_BEGIN){
            return { ...state,
          isLoading : true,
          }
        }
        if(action.type === FORGOT_PASSWORD_SUCCESS){
            return { ...state,
              isLoading : false,
              showAlert : true,
              alertType : 'success',
              alertText : action.payload.message
          }
        }
        if(action.type === FORGOT_PASSWORD_ERROR){
            return { ...state,
          isLoading : false,
          showAlert : true,
          alertType : 'danger',
          alertText : action.payload.msg
      
          }
        }





        if(action.type === TOGGLE_SIDEBAR){
            return {
                ...state,
                showSidebar : !state.showSidebar
                
        }
    }
    if(action.type === LOGOUT_USER){
        return {
            ...initialState,
            user : null,
            token : null,
            userLocation :  null,
            jobLocation : null,
            
    }
}
if(action.type === UPDATE_USER_BEGIN){
    return {...state,isLoading : true}
}
if(action.type === UPDATE_USER_SUCCESS){
    return {...state,
        isLoading : false,
        token : action.payload.token,
        user : action.payload.user,
        userLocation : action.payload.location,
        jobLocation : action.payload.location,  
        showAlert : true,
        alertType : 'success',
        alertText: 'User UPDATE Successfully ! '
    }
}
if(action.type === UPDATE_USER_ERROR){
    return {...state,
        isLoading : false,
        showAlert : true,
        alertType : 'danger'
        ,alertText : action.payload.msg}
}

if(action.type === HANDLE_CHANGE){
    return {...state,
        [action.payload.name]: action.payload.value   
    }
}
if(action.type === CLEAR_VALUE){
    const initialState ={
        isEditing : false,
        editJobId : '',
        position : '',
        company : '',
        jobLocation : state.userLocation || '',
        jobType : 'full-time',
        status : 'pending'
    }
    return {...state,
      ...initialState
    }
}
if(action.type === CREATE_JOB_BEGIN){
    return {...state,
      isLoading : true,
    
    }
}

if(action.type === CREATE_JOB_SUCCESS){
    return {...state,
      isLoading : true,
      showAlert : true,
      alertType : 'success'
      ,alertText : 'New Job Created!'
    }
}

if(action.type === CREATE_JOB_ERROR){
    return {...state,
      isLoading : true,
      showAlert : true,
      alertType : 'danger'
      ,alertText : action.payload.msg
    }
}

if (action.type === GET_JOBS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }
  if (action.type === GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages,
    }
  }
if(action.type === GET_USERS_BEGIN){
    return { ...state, isLoading: true, showAlert: false }
}
if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      users: action.payload.users,
      totalUsers: action.payload.totalUsers,
      numOfPages: action.payload.numOfPages,
    }
  }
  if(action.type === SET_EDIT_JOB){
      const job = state.jobs.find(job => job._id === action.payload.id);
      console.log(job)
      const {_id,position,company,jobLocation,jobType,status } = job 
      return{
          ...state,
          isEditing : true,
          editJobId : _id,
          position,
          company,
          jobLocation,
          jobType,
          status

      }
  }
  if(action.type === DELETE_JOB_BEGIN){
      return {
          ...state,isLoading : true,
      }
  }

  if(action.type ===   EDIT_JOB_BEGIN){
    return {...state,isLoading : true}
  }
  if(action.type === EDIT_JOB_SUCCESS){
      return {
        ...state,
        isLoading :false,
        showAlert : true,
        alertType : 'success',
        alertText: 'Job updated successfully',
      }
     
  }

  if(action.type === EDIT_JOB_SUCCESS){
    return {
      ...state,
      isLoading :false,
      showAlert : true,
      alertType : 'danger',
      alertText: action.payload.msg
    }
}       

if(action.type === SHOW_STATS_BEGIN){
    return {
      ...state,
      isLoading :true,
      showAlert : false,
    }
}

if(action.type === SHOW_STATS_SUCCESS){
    return {
      ...state,
      isLoading :false,
      stats : action.payload.stats,
      monthlyApplication : action.payload.monthlyApplication,
    }
}       
if(action.type === SHOW_STATS_ERROR){
    return {
        ...state,
        isLoading :false,
        showAlert : true,
        alertText : action.payload.msg
    }
}
if(action.type === CLEAR_FILTERS ){
    return {...state,
    search :'',
    searchStatus : '',
    searchType : '',
    sort : 'latest',
    }
}

if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page }
  }

  if(action.type === RESET_USER_BEGIN){
      return { ...state, isLoading : true}
  }
  if(action.type === RESET_USER_SUCCESS){
      return { ...state, 
        showAlert : true,
        alertType : 'success'
        ,alertText : 'Successfully reset user'
    }
  }
 if(action.type === CHANGE_LANG){
     return { ...state, local : action.payload.local}
 }
  
 if(action.type === CHANGE_MESSAGE){
     return { ...state, messages : action.payload.newMessages}
 }
        throw new Error(`so suck action : ${action.type} `)
        
    }

    export default reducer