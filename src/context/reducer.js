   import { DISPLAY_ALERT,CLEAR_ALERT } from './action';

   
   
   const reducer = (state,action) =>{
       if(action.type === DISPLAY_ALERT) {
           return {...state,showAlert: true,alertType : 'danger',alertText: 'Please provider all values required'}
       }
       if(action.type === CLEAR_ALERT) {
        return {...state,showAlert: false,alertType : '',alertText: ''}
    }
        throw new Error(`so suck action : ${action.type} `)
        
    }

    export default reducer