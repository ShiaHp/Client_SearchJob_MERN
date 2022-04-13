   import{ 
    DISPLAY_ALERT,CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    

} from './action';
   
   
   
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
            return {...state,isLoading : false
                ,token : action.payload.token,
                user : action.payload.user,
                userLocation : action.payload.location, jobLocation : action.payload.location,
                showAlert : true,
                alertType : 'success',alertText: 'User Created! Redirecting to ...'
            }
        }
        if(action.type === REGISTER_USER_ERROR){
            return {...state,isLoading : false,
                showAlert : true,alertType : 'danger'
                ,alertText : action.payload.msg}
        }
        throw new Error(`so suck action : ${action.type} `)
        
    }

    export default reducer